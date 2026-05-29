# Phase 01 — Data Model & Tenant Boundary

This phase turns the Phase 00 research into a concrete ownership model. Do not build permissions, invites, or UI until the tenant boundary is explicit for every included entity.

## Goal

Create the minimum durable data model required for teams/RBAC while preserving the existing auth provider and user identity source.

The model must answer:

- What is the canonical user identifier from the existing auth system?
- What is the tenant object called in this product: team, organization, workspace, account, project, or something else?
- Which records are global, user-scoped, team-scoped, or system-scoped?
- Which team-scoped records need a non-null `teamId` / `organizationId` / tenant key?
- Which existing rows require backfill before enforcement can turn on?

## Required model concepts

Implement or map equivalents for:

- `User` / auth identity reference — do not replace the auth provider by default.
- `Team` / `Organization` / tenant root.
- `Membership` — joins auth users to teams with status and role.
- `Role` — canonical built-in roles plus optional custom roles if explicitly in scope.
- `Permission` / permission vocabulary — source of truth for authorization checks.
- `Invite` — pending membership grant with expiry, single-use, and exact-email semantics.
- `AuditEvent` — privileged mutation history.

## Tenant ownership classification

Before schema changes, produce a table like:

| Entity | Scope | Tenant key | Backfill source | Enforcement point | Notes |
| --- | --- | --- | --- | --- | --- |
| users | global/auth | none | existing auth | auth adapter | do not duplicate secrets |
| projects | team | `teamId` | owner/user mapping | service + DB query | must reject cross-team reads |
| billingCustomer | team | `teamId` | Stripe metadata/customer map | billing service | billing perms separate |

Every included team-scoped entity must have an owner tenant key or be explicitly excluded. `unknown` is a blocker, not an acceptable value.

## Schema requirements

- Memberships must include `userId`, `teamId`, `role`, `status`, timestamps, and optionally `invitedByUserId` / `joinedAt` / `removedAt`.
- Enforce unique active membership per user/team.
- Enforce at least one owner per team through transaction/service logic; DB constraints alone are usually insufficient.
- Prefer stable IDs and indexed tenant keys for every team-scoped query.
- Do not store provider secrets, session tokens, or password hashes in new RBAC tables.
- If custom roles are supported, model them as permission sets, not ad-hoc booleans spread through UI code.

## Migration/backfill plan

Required before marking done:

1. Snapshot current auth/user/team state.
2. Define how existing solo users map to default teams if needed.
3. Backfill `teamId` for existing team-scoped rows.
4. Identify rows that cannot be safely mapped.
5. Add read-side compatibility if rollout is staged.
6. Define rollback behavior for partial backfill.
7. Record every assumption in the phase proof notes.

## Abuse and edge cases

Test or explicitly block:

- orphaned team-scoped rows with null/missing `teamId`;
- user-owned rows accidentally exposed as team-owned rows;
- duplicate active memberships;
- deleted/suspended membership still authorizing access;
- team deletion leaving active memberships/invites;
- cross-tenant query missing tenant predicate;
- client-supplied `teamId` overriding server-resolved team context.

## Required tests

- Schema/invariant tests for membership uniqueness and required tenant keys.
- Migration/backfill dry-run or fixture test.
- Query tests proving team-scoped reads include tenant predicates.
- Negative test for cross-team record access.
- Test that missing membership denies access even if the user is authenticated.

## Acceptance gate

This phase is done only when:

- every included data entity has a scope classification;
- every team-scoped entity has an explicit tenant key and index plan;
- backfill and rollback are documented;
- cross-tenant fixture tests fail before guards and pass after guards;
- blockers are listed instead of guessed.
