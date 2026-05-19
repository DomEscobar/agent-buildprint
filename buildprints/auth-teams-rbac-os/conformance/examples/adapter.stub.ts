import type { AuthRbacConformanceAdapter } from '../src/adapter-contract.js';

const notImplemented = async () => {
  throw new Error('Replace conformance/examples/adapter.stub.ts with a target-app adapter before running conformance tests.');
};

const adapter: AuthRbacConformanceAdapter = {
  reset: notImplemented,
  createUser: notImplemented,
  createTeam: notImplemented,
  addMembership: notImplemented,
  setMembershipRole: notImplemented,
  removeMembership: notImplemented,
  createTeamResource: notImplemented,
  requestApi: notImplemented,
  createInvite: notImplemented,
  revokeInvite: notImplemented,
  acceptInvite: notImplemented,
  readAuditEvents: notImplemented,
  routes: {
    readResource: () => notImplemented() as never,
    inviteMember: () => notImplemented() as never,
    updateMemberRole: () => notImplemented() as never,
    billingPortal: () => notImplemented() as never,
    auditLog: () => notImplemented() as never,
  },
};

export default adapter;
