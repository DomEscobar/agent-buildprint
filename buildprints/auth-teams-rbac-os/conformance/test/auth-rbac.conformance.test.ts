import { beforeEach, describe, it } from 'node:test';
import { equal, ok } from 'node:assert/strict';
import { isDenied, isSuccess, type Actor, type AuthRbacConformanceAdapter, type Team, type TeamResource } from '../src/adapter-contract.js';
import { loadAdapter } from '../src/load-adapter.js';

let adapter: AuthRbacConformanceAdapter;
let ownerA: Actor;
let adminA: Actor;
let memberA: Actor;
let viewerA: Actor;
let outsider: Actor;
let teamA: Team;
let teamB: Team;
let resourceA: TeamResource;

async function request(actor: Actor | null, method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', path: string, body?: unknown) {
  return adapter.requestApi({ actor, method, path, body });
}

beforeEach(async () => {
  adapter = await loadAdapter();
  await adapter.reset();

  ownerA = await adapter.createUser({ email: 'owner-a@example.test' });
  adminA = await adapter.createUser({ email: 'admin-a@example.test' });
  memberA = await adapter.createUser({ email: 'member-a@example.test' });
  viewerA = await adapter.createUser({ email: 'viewer-a@example.test' });
  outsider = await adapter.createUser({ email: 'outsider@example.test' });

  teamA = await adapter.createTeam({ name: 'Team A', owner: ownerA });
  teamB = await adapter.createTeam({ name: 'Team B', owner: outsider });

  await adapter.addMembership({ teamId: teamA.id, user: adminA, role: 'admin' });
  await adapter.addMembership({ teamId: teamA.id, user: memberA, role: 'member' });
  await adapter.addMembership({ teamId: teamA.id, user: viewerA, role: 'viewer' });

  resourceA = await adapter.createTeamResource({ teamId: teamA.id, createdBy: ownerA });
});

describe('Auth, Teams & RBAC conformance', () => {
  it('denies unauthenticated and non-member direct API access to team resources', async () => {
    const path = adapter.routes.readResource(resourceA);
    ok(isDenied(await request(null, 'GET', path)), 'anonymous direct API read must deny');
    ok(isDenied(await request(outsider, 'GET', path)), 'authenticated non-member direct API read must deny');
  });

  it('prevents cross-tenant access even when the actor belongs to another team', async () => {
    const resourceB = await adapter.createTeamResource({ teamId: teamB.id, createdBy: outsider });
    ok(isDenied(await request(memberA, 'GET', adapter.routes.readResource(resourceB))), 'Team A member must not read Team B resource');
  });

  it('blocks frontend-bypass invite attempts through direct API calls', async () => {
    const path = adapter.routes.inviteMember(teamA);
    ok(isDenied(await request(viewerA, 'POST', path, { email: 'new@example.test', role: 'member' })), 'viewer direct invite must deny');
    ok(isDenied(await request(memberA, 'POST', path, { email: 'new@example.test', role: 'member' })), 'member direct invite must deny');
    ok(isSuccess(await request(adminA, 'POST', path, { email: 'new@example.test', role: 'member' })), 'admin invite for member should succeed unless product policy is stricter');
  });

  it('prevents self-escalation and above-ceiling role grants', async () => {
    const selfPath = adapter.routes.updateMemberRole(teamA, adminA);
    ok(isDenied(await request(adminA, 'PATCH', selfPath, { role: 'owner' })), 'admin must not self-escalate to owner');

    const targetPath = adapter.routes.updateMemberRole(teamA, memberA);
    ok(isDenied(await request(adminA, 'PATCH', targetPath, { role: 'owner' })), 'admin must not grant owner above ceiling');
  });

  it('protects the last owner from removal or demotion', async () => {
    ok(isDenied(await adapter.removeMembership({ teamId: teamA.id, actor: ownerA, target: ownerA })), 'last owner removal must deny');
    ok(isDenied(await adapter.setMembershipRole({ teamId: teamA.id, actor: ownerA, target: ownerA, role: 'admin' })), 'last owner demotion must deny');
  });

  it('enforces invite expiry, revoke, exact-email, and single-use semantics', async () => {
    const invited = await adapter.createUser({ email: 'invited@example.test' });
    const wrongUser = await adapter.createUser({ email: 'wrong@example.test' });
    const expired = await adapter.createInvite({ teamId: teamA.id, actor: ownerA, email: invited.email, role: 'member', expiresAt: '2000-01-01T00:00:00.000Z' });
    ok(isDenied(await adapter.acceptInvite({ inviteId: expired.id, actor: invited })), 'expired invite must deny');

    const revoked = await adapter.createInvite({ teamId: teamA.id, actor: ownerA, email: invited.email, role: 'member' });
    ok(isSuccess(await adapter.revokeInvite({ teamId: teamA.id, actor: ownerA, inviteId: revoked.id })), 'owner revoke should succeed');
    ok(isDenied(await adapter.acceptInvite({ inviteId: revoked.id, actor: invited })), 'revoked invite must deny');

    const exact = await adapter.createInvite({ teamId: teamA.id, actor: ownerA, email: invited.email, role: 'member' });
    ok(isDenied(await adapter.acceptInvite({ inviteId: exact.id, actor: wrongUser })), 'wrong email must deny');
    ok(isSuccess(await adapter.acceptInvite({ inviteId: exact.id, actor: invited })), 'first exact-email accept should succeed');
    ok(isDenied(await adapter.acceptInvite({ inviteId: exact.id, actor: invited })), 'second accept must deny');
  });

  it('keeps billing permission separate from generic admin unless explicitly configured', async () => {
    const billingPath = adapter.routes.billingPortal(teamA);
    ok(isDenied(await request(adminA, 'POST', billingPath)), 'generic admin must not manage billing without billing.manage');
    ok(isSuccess(await request(ownerA, 'POST', billingPath)), 'owner billing action should succeed if owner maps to billing.manage');
  });

  it('protects audit logs and records redacted privileged events', async () => {
    const invite = await adapter.createInvite({ teamId: teamA.id, actor: ownerA, email: 'audit-target@example.test', role: 'member' });
    await adapter.revokeInvite({ teamId: teamA.id, actor: ownerA, inviteId: invite.id });

    ok(isDenied(await request(memberA, 'GET', adapter.routes.auditLog(teamA))), 'member audit read must deny');
    const events = await adapter.readAuditEvents({ teamId: teamA.id, actor: ownerA });
    ok(events.some((event) => event.action.includes('invite')), 'invite lifecycle should emit audit events');

    const serialized = JSON.stringify(events).toLowerCase();
    equal(serialized.includes('token'), false, 'audit events must not include invite/session/token secrets');
    equal(serialized.includes('password'), false, 'audit events must not include passwords');
    equal(serialized.includes('cookie'), false, 'audit events must not include cookies');
  });
});
