import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { AuditLog, AuthzError, InviteService, assertSameTeamResource, can, requirePermission, type ActorContext } from '../src/index.js';

const owner: ActorContext = { userId: 'u_owner', memberships: [{ userId: 'u_owner', teamId: 'team_a', role: 'owner', status: 'active' }] };
const admin: ActorContext = { userId: 'u_admin', memberships: [{ userId: 'u_admin', teamId: 'team_a', role: 'admin', status: 'active' }] };
const member: ActorContext = { userId: 'u_member', memberships: [{ userId: 'u_member', teamId: 'team_a', role: 'member', status: 'active' }] };
const viewer: ActorContext = { userId: 'u_viewer', memberships: [{ userId: 'u_viewer', teamId: 'team_a', role: 'viewer', status: 'active' }] };

describe('auth teams rbac proof', () => {
  it('denies unknown permissions and missing memberships by default', () => {
    assert.deepEqual(can(owner, 'made.up.permission', { teamId: 'team_a' }), { allow: false, reason: 'unknown_permission' });
    assert.deepEqual(can(member, 'team.read', { teamId: 'team_b' }), { allow: false, reason: 'missing_membership' });
  });

  it('enforces the default role permission matrix', () => {
    assert.equal(can(owner, 'billing.manage', { teamId: 'team_a' }).allow, true);
    assert.equal(can(admin, 'members.invite', { teamId: 'team_a' }).allow, true);
    assert.deepEqual(can(member, 'members.invite', { teamId: 'team_a' }), { allow: false, reason: 'permission_missing' });
    assert.deepEqual(can(viewer, 'members.read', { teamId: 'team_a' }), { allow: false, reason: 'permission_missing' });
  });

  it('rejects removed or suspended memberships', () => {
    const removed: ActorContext = { userId: 'u_old', memberships: [{ userId: 'u_old', teamId: 'team_a', role: 'admin', status: 'removed' }] };
    assert.deepEqual(can(removed, 'team.read', { teamId: 'team_a' }), { allow: false, reason: 'membership_removed' });
  });

  it('blocks self escalation and role grant ceilings', () => {
    assert.deepEqual(can(admin, 'members.role.update', { teamId: 'team_a', targetUserId: 'u_admin', targetRole: 'owner', activeOwnerCount: 2 }), { allow: false, reason: 'self_escalation' });
    assert.deepEqual(can(admin, 'members.role.update', { teamId: 'team_a', targetUserId: 'u_member', targetRole: 'owner', activeOwnerCount: 2 }), { allow: false, reason: 'grant_ceiling' });
    assert.equal(can(owner, 'members.role.update', { teamId: 'team_a', targetUserId: 'u_member', targetRole: 'admin', activeOwnerCount: 2 }).allow, true);
  });

  it('protects the last owner from demotion/removal', () => {
    assert.deepEqual(can(owner, 'members.role.update', { teamId: 'team_a', targetUserId: 'u_owner', targetRole: 'admin', activeOwnerCount: 1 }), { allow: false, reason: 'last_owner_protected' });
  });

  it('prevents cross-team direct API access by resolving resource team server-side', () => {
    assert.throws(() => assertSameTeamResource(member, { teamId: 'team_b' }, 'team.read'), (error) => error instanceof AuthzError && error.code === 'missing_membership');
    assertSameTeamResource(member, { teamId: 'team_a' }, 'team.read');
  });

  it('validates invite lifecycle: exact email, expiry, revoke and single-use', () => {
    let now = new Date('2026-01-01T00:00:00Z');
    const invites = new InviteService(() => now);
    const invite = invites.create(admin, { teamId: 'team_a', email: 'New@Example.test', role: 'member', token: 'tok1', ttlMs: 1000 });
    assert.equal(invite.tokenHash.includes('tok1'), false);
    assert.throws(() => invites.accept({ userId: 'u_new', email: 'other@example.test' }, 'tok1'), /invite_email_mismatch/);
    const membership = invites.accept({ userId: 'u_new', email: 'new@example.test' }, 'tok1');
    assert.equal(membership.role, 'member');
    assert.throws(() => invites.accept({ userId: 'u_new2', email: 'new@example.test' }, 'tok1'), /invite_used/);

    const expired = invites.create(admin, { teamId: 'team_a', email: 'late@example.test', role: 'viewer', token: 'tok2', ttlMs: 1 });
    now = new Date('2026-01-01T00:00:01Z');
    assert.throws(() => invites.accept({ userId: 'u_late', email: 'late@example.test' }, 'tok2'), /invite_expired/);

    now = new Date('2026-01-01T00:00:00Z');
    const revoked = invites.create(admin, { teamId: 'team_a', email: 'no@example.test', role: 'viewer', token: 'tok3', ttlMs: 1000 });
    invites.revoke(admin, revoked.id);
    assert.throws(() => invites.accept({ userId: 'u_no', email: 'no@example.test' }, 'tok3'), /invite_revoked/);
    assert.equal(expired.role, 'viewer');
  });

  it('rejects above-ceiling invite roles for admins', () => {
    const invites = new InviteService();
    assert.throws(() => invites.create(admin, { teamId: 'team_a', email: 'boss@example.test', role: 'owner', token: 'tok', ttlMs: 1000 }), /invite_role_ceiling|grant_ceiling/);
  });

  it('records redacted audit events for privileged mutations', () => {
    requirePermission(owner, 'members.role.update', { teamId: 'team_a', targetUserId: 'u_member', targetRole: 'admin', activeOwnerCount: 2 });
    const audit = new AuditLog();
    audit.record({ actorId: owner.userId, teamId: 'team_a', action: 'members.role.update', targetType: 'membership', targetId: 'u_member', metadata: { newRole: 'admin', rawToken: 'secret-token', apiKey: 'sk_live_x' } });
    assert.equal(audit.events.length, 1);
    assert.equal(audit.events[0].metadata.rawToken, '[REDACTED]');
    assert.equal(audit.events[0].metadata.apiKey, '[REDACTED]');
    assert.equal(audit.events[0].metadata.newRole, 'admin');
  });
});
