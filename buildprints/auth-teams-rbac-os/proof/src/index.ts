export type Role = 'owner' | 'admin' | 'member' | 'viewer';
export type MembershipStatus = 'active' | 'removed' | 'suspended' | 'pending';
export type Permission =
  | 'team.read'
  | 'team.update'
  | 'members.read'
  | 'members.invite'
  | 'members.remove'
  | 'members.role.update'
  | 'billing.manage'
  | 'settings.update'
  | 'api_keys.manage'
  | 'audit.read';

export interface Membership {
  userId: string;
  teamId: string;
  role: Role;
  status: MembershipStatus;
}

export interface ActorContext {
  userId: string;
  memberships: Membership[];
}

export interface ResourceContext {
  teamId: string;
  targetUserId?: string;
  targetRole?: Role;
  activeOwnerCount?: number;
}

export type Decision = { allow: true } | { allow: false; reason: string };

export const rolePermissions: Record<Role, Permission[]> = {
  owner: ['team.read', 'team.update', 'members.read', 'members.invite', 'members.remove', 'members.role.update', 'billing.manage', 'settings.update', 'api_keys.manage', 'audit.read'],
  admin: ['team.read', 'team.update', 'members.read', 'members.invite', 'members.remove', 'members.role.update', 'settings.update'],
  member: ['team.read', 'members.read'],
  viewer: ['team.read']
};

const knownPermissions = new Set<Permission>(Object.values(rolePermissions).flat());
const roleRank: Record<Role, number> = { viewer: 1, member: 2, admin: 3, owner: 4 };

export function can(actor: ActorContext, permission: Permission | string, context: ResourceContext): Decision {
  if (!knownPermissions.has(permission as Permission)) return deny('unknown_permission');
  const membership = actor.memberships.find((m) => m.teamId === context.teamId);
  if (!membership) return deny('missing_membership');
  if (membership.status !== 'active') return deny(`membership_${membership.status}`);
  if (!rolePermissions[membership.role].includes(permission as Permission)) return deny('permission_missing');

  if ((permission === 'members.remove' || permission === 'members.role.update') && context.targetUserId) {
    if (context.targetUserId === actor.userId && context.targetRole && roleRank[context.targetRole] > roleRank[membership.role]) {
      return deny('self_escalation');
    }
    if (context.activeOwnerCount === 1 && context.targetRole !== 'owner') {
      return deny('last_owner_protected');
    }
  }

  if (permission === 'members.role.update' && context.targetRole) {
    if (membership.role !== 'owner' && context.targetRole === 'owner') return deny('grant_ceiling');
    if (roleRank[context.targetRole] > roleRank[membership.role]) return deny('grant_ceiling');
  }

  return { allow: true };
}

export function requirePermission(actor: ActorContext, permission: Permission, context: ResourceContext): void {
  const decision = can(actor, permission, context);
  if (!decision.allow) throw new AuthzError(decision.reason);
}

export class AuthzError extends Error {
  constructor(readonly code: string) {
    super(`Authorization denied: ${code}`);
    this.name = 'AuthzError';
  }
}

export interface Invite {
  id: string;
  teamId: string;
  email: string;
  role: Role;
  invitedByUserId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt?: Date;
  acceptedAt?: Date;
}

export class InviteService {
  private invites = new Map<string, Invite>();
  constructor(private readonly now = () => new Date()) {}

  create(actor: ActorContext, input: { teamId: string; email: string; role: Role; token: string; ttlMs: number }): Invite {
    requirePermission(actor, 'members.invite', { teamId: input.teamId, targetRole: input.role });
    const grant = can(actor, 'members.role.update', { teamId: input.teamId, targetRole: input.role });
    if (!grant.allow && input.role !== 'member' && input.role !== 'viewer') throw new AuthzError('invite_role_ceiling');
    const invite: Invite = {
      id: `inv_${this.invites.size + 1}`,
      teamId: input.teamId,
      email: normalizeEmail(input.email),
      role: input.role,
      invitedByUserId: actor.userId,
      tokenHash: hashToken(input.token),
      expiresAt: new Date(this.now().getTime() + input.ttlMs)
    };
    this.invites.set(invite.id, invite);
    return cloneInvite(invite);
  }

  revoke(actor: ActorContext, inviteId: string): void {
    const invite = this.getStored(inviteId);
    requirePermission(actor, 'members.invite', { teamId: invite.teamId });
    invite.revokedAt = this.now();
  }

  accept(user: { userId: string; email: string }, rawToken: string): Membership {
    const tokenHash = hashToken(rawToken);
    const invite = [...this.invites.values()].find((candidate) => candidate.tokenHash === tokenHash);
    if (!invite) throw new AuthzError('invite_not_found');
    if (invite.revokedAt) throw new AuthzError('invite_revoked');
    if (invite.acceptedAt) throw new AuthzError('invite_used');
    if (invite.expiresAt.getTime() <= this.now().getTime()) throw new AuthzError('invite_expired');
    if (normalizeEmail(user.email) !== invite.email) throw new AuthzError('invite_email_mismatch');
    invite.acceptedAt = this.now();
    return { userId: user.userId, teamId: invite.teamId, role: invite.role, status: 'active' };
  }

  private getStored(inviteId: string): Invite {
    const invite = this.invites.get(inviteId);
    if (!invite) throw new AuthzError('invite_not_found');
    return invite;
  }
}

export interface AuditEvent {
  actorId: string;
  teamId: string;
  action: string;
  targetType: string;
  targetId: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

export class AuditLog {
  readonly events: AuditEvent[] = [];
  record(event: Omit<AuditEvent, 'metadata' | 'createdAt'> & { metadata?: Record<string, unknown> }): void {
    this.events.push({ ...event, metadata: redact(event.metadata ?? {}), createdAt: new Date() });
  }
}

export function assertSameTeamResource(actor: ActorContext, resource: { teamId: string }, permission: Permission): void {
  requirePermission(actor, permission, { teamId: resource.teamId });
}

function deny(reason: string): Decision { return { allow: false, reason }; }
function normalizeEmail(email: string): string { return email.trim().toLowerCase(); }
function hashToken(token: string): string { return `hash:${token.split('').reverse().join('')}`; }
function cloneInvite(invite: Invite): Invite { return { ...invite, expiresAt: new Date(invite.expiresAt), revokedAt: invite.revokedAt ? new Date(invite.revokedAt) : undefined, acceptedAt: invite.acceptedAt ? new Date(invite.acceptedAt) : undefined }; }
function redact(input: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    out[key] = /token|secret|password|apiKey|credential/i.test(key) ? '[REDACTED]' : value;
  }
  return out;
}
