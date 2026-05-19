# Auth, Teams & RBAC OS Spec

## Domain Model

Core entities:

- `User`: existing authenticated principal. Do not replace unless approved.
- `Team`: org/workspace/company container. Naming is configurable.
- `Membership`: `(userId, teamId, role, status)` relationship.
- `Role`: named bundle of permissions. Defaults: owner, admin, member, viewer.
- `Permission`: atomic action string such as `members.invite`.
- `Invite`: email-bound or domain-bound invitation token with expiry and role ceiling.
- `AuditEvent`: append-only privileged action record.

Recommended constraints:

- unique membership per `(userId, teamId)`;
- unique active invite per `(teamId, normalizedEmail)` unless duplicate policy says otherwise;
- invite token hash stored, raw token shown/sent once;
- team-scoped resources include `teamId` or an explicit join path;
- audit events preserve deleted actor/target display snapshots when policy requires.

## Tenant Boundary

Every included resource must be classified:

- `global`: safe across all teams, e.g. public product metadata;
- `user-scoped`: belongs to one user independent of team;
- `team-scoped`: must be filtered through team membership;
- `hybrid`: requires documented rules, e.g. personal workspace migrated into first team.

A team-scoped request must derive authorization from server-side membership plus resource ownership. Client-provided `teamId` can select context, but it cannot prove access.

## Default Roles

- owner: full team governance plus last-owner responsibility.
- admin: member/invite/settings management except owner-only operations.
- member: normal product usage.
- viewer: read-only product access where supported.

Permissions are the source of truth. Roles are presets.

## Invite Lifecycle

An invite has:

- `teamId`, `email` or domain policy, `role`, `invitedByUserId`;
- `tokenHash`, `expiresAt`, optional `revokedAt`, optional `acceptedAt`;
- single-use acceptance;
- role ceiling based on inviter permissions;
- exact-email match by default unless domain policy is approved.

## Role Lifecycle

Role mutation must prevent:

- self-promotion;
- cross-team changes;
- demoting/removing the last active owner;
- assigning roles the actor cannot grant;
- stale permission claim usage for privileged changes.

## Audit Log

Audit privileged mutations:

- invite created/revoked/accepted;
- member removed;
- role changed;
- team settings changed;
- billing/admin/API-key actions if included.

Audit metadata must not include secrets. Redact invite tokens, session tokens, API keys, passwords, and raw OAuth credentials.
