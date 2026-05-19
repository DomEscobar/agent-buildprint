export type Role = 'owner' | 'admin' | 'member' | 'viewer';

export type Actor = {
  id: string;
  email: string;
};

export type Team = {
  id: string;
  name: string;
};

export type TeamResource = {
  id: string;
  teamId: string;
};

export type Invite = {
  id: string;
  teamId: string;
  email: string;
  role: Role;
};

export type HttpResponse = {
  status: number;
  body?: unknown;
  headers?: Record<string, string>;
};

export type AuditEvent = {
  teamId: string;
  actorUserId: string | 'system';
  action: string;
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
};

export type ApiRequest = {
  actor: Actor | null;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  path: string;
  body?: unknown;
  headers?: Record<string, string>;
};

export type AuthRbacConformanceAdapter = {
  reset(): Promise<void>;

  createUser(input: { email: string }): Promise<Actor>;
  createTeam(input: { name: string; owner: Actor }): Promise<Team>;
  addMembership(input: { teamId: string; user: Actor; role: Role; status?: 'active' | 'suspended' | 'removed' | 'pending' }): Promise<void>;
  setMembershipRole(input: { teamId: string; actor: Actor; target: Actor; role: Role }): Promise<HttpResponse>;
  removeMembership(input: { teamId: string; actor: Actor; target: Actor }): Promise<HttpResponse>;

  createTeamResource(input: { teamId: string; createdBy: Actor }): Promise<TeamResource>;
  requestApi(input: ApiRequest): Promise<HttpResponse>;

  createInvite(input: { teamId: string; actor: Actor; email: string; role: Role; expiresAt?: string }): Promise<Invite>;
  revokeInvite(input: { teamId: string; actor: Actor; inviteId: string }): Promise<HttpResponse>;
  acceptInvite(input: { inviteId: string; actor: Actor }): Promise<HttpResponse>;

  readAuditEvents(input: { teamId: string; actor: Actor }): Promise<AuditEvent[]>;

  routes: {
    readResource(resource: TeamResource): string;
    inviteMember(team: Team): string;
    updateMemberRole(team: Team, target: Actor): string;
    billingPortal(team: Team): string;
    auditLog(team: Team): string;
  };
};

export function isDenied(response: HttpResponse): boolean {
  return [401, 403, 404].includes(response.status);
}

export function isSuccess(response: HttpResponse): boolean {
  return response.status >= 200 && response.status < 300;
}
