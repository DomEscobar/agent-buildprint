# Auth, Teams & RBAC OS Contracts

## Auth Adapter

```ts
interface AuthAdapter {
  requireUser(request: RequestLike): Promise<AuthUser>;
  getUser(userId: string): Promise<AuthUser | null>;
}
```

The adapter wraps existing auth. It must not force a provider migration unless approved.

## Team Context Resolver

```ts
interface TeamContextResolver {
  resolve(request: RequestLike, resource?: TeamResourceRef): Promise<TeamContext>;
}
```

Resolution must check membership server-side. A request-selected team id is only an input candidate.

## Permission Engine

```ts
type Permission =
  | 'team.read' | 'team.update'
  | 'members.read' | 'members.invite' | 'members.remove' | 'members.role.update'
  | 'billing.manage' | 'settings.update' | 'api_keys.manage' | 'audit.read';

interface PermissionEngine {
  can(actor: ActorContext, permission: Permission, context: ResourceContext): Decision;
  require(actor: ActorContext, permission: Permission, context: ResourceContext): void;
}
```

Decision shape:

```ts
type Decision = { allow: true } | { allow: false; reason: string };
```

Deny unknown permissions, missing memberships, removed/suspended memberships, cross-team resources, and stale role data.

## Invite Service

```ts
interface InviteService {
  createInvite(actor: ActorContext, input: CreateInviteInput): Promise<InviteView>;
  revokeInvite(actor: ActorContext, inviteId: string): Promise<void>;
  acceptInvite(user: AuthUser, rawToken: string): Promise<MembershipView>;
}
```

Raw tokens are never stored. Acceptance is single-use.

## Membership Service

```ts
interface MembershipService {
  removeMember(actor: ActorContext, teamId: string, memberUserId: string): Promise<void>;
  updateRole(actor: ActorContext, teamId: string, memberUserId: string, role: Role): Promise<void>;
  leaveTeam(actor: ActorContext, teamId: string): Promise<void>;
}
```

All mutations check last-owner safety and role grant ceilings.

## Audit Service

```ts
interface AuditService {
  record(event: AuditEventInput): Promise<void>;
  list(actor: ActorContext, teamId: string, cursor?: string): Promise<AuditEventPage>;
}
```

`list` requires `audit.read`. `record` redacts metadata.
