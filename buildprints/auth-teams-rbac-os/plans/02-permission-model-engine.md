# Phase 02 — Permission Model & Engine

This phase defines authorization semantics before server guards or UI use them. Roles are convenience labels; permissions are the source of truth.

## Goal

Build a small, testable permission engine that answers one question consistently:

> Can actor X perform permission Y within team/resource context Z?

The engine must deny by default and must be usable from server routes, service functions, jobs, and tests.

## Required permission vocabulary

Start with the canonical permissions unless Phase 00 proves the product needs different names:

- `team.read`
- `team.update`
- `members.invite`
- `members.remove`
- `members.role.update`
- `billing.manage`
- `settings.update`
- `audit.read`

Add product-specific permissions only after mapping them to concrete server actions. Avoid vague permissions like `admin` or `manage_everything` unless they are aliases to explicit permission sets.

## Default role matrix

The built-in roles should be boring and predictable:

| Role | Intent |
| --- | --- |
| `owner` | full team control, owner transfer, destructive admin, billing if configured |
| `admin` | operational team management, usually not last-owner or billing override |
| `member` | normal product usage |
| `viewer` | read-only product usage |

Rules:

- Permission checks resolve role → permissions at runtime/server-side.
- Billing/admin permissions must not be collapsed into generic admin unless explicitly configured.
- Unknown roles and unknown permissions deny.
- Removed, suspended, expired, or pending memberships deny.
- Custom roles, if enabled, must have explicit permission sets and tests.

## Engine contract

Implement an adapter equivalent to:

```ts
type AuthzInput = {
  actorUserId: string;
  teamId: string;
  permission: Permission;
  resource?: { id: string; teamId: string; type: string };
};

type AuthzDecision = {
  allowed: boolean;
  reason: 'allowed' | 'missing_membership' | 'inactive_membership' | 'missing_permission' | 'tenant_mismatch' | 'unknown_permission' | 'blocked_by_policy';
};
```

The exact language can vary, but the implementation must return structured denial reasons for logging/tests without exposing sensitive details to end users.

## Tenant binding

If a resource is involved, the engine must compare the resource’s server-loaded tenant key with the actor’s membership team. Never trust a `teamId` sent by the client as the final authority.

Required flow:

1. authenticate actor through existing auth;
2. load membership server-side;
3. load resource server-side when applicable;
4. compare tenant boundary;
5. resolve permissions;
6. deny or allow with structured reason.

## Abuse and edge cases

Test or explicitly block:

- unknown permission string;
- unknown/custom role with no permission set;
- authenticated user with no membership;
- pending/removed/suspended membership;
- client sends Team B id while accessing Team A resource;
- stale session/JWT still claims an old role;
- admin attempts billing action when billing is owner-only;
- custom role accidentally inherits owner-only actions.

## Required tests

- Full role × permission matrix.
- Missing membership denies every team permission.
- Inactive membership denies every team permission.
- Unknown permission denies.
- Tenant mismatch denies even if actor has the permission in a different team.
- Billing/admin boundary tests.
- Optional custom role fixture tests if custom roles are in scope.

## Acceptance gate

This phase is done only when:

- the permission vocabulary is explicit and documented;
- the role matrix maps to permissions, not UI booleans;
- the engine is pure/testable or has a pure core;
- all negative cases above are covered;
- server code can import one canonical authorization path instead of duplicating role checks.
