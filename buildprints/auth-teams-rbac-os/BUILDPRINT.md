---
title: Auth, Teams & RBAC OS
slug: auth-teams-rbac-os
category: Feature / Extension
stack: [Auth, Teams, RBAC, Multi-tenant SaaS, Audit logs]
difficulty: Advanced
status: publishable-draft
agentFile: true
---

# Buildprint: Auth, Teams & RBAC OS

## Agent Operating Contract

Add or harden a multi-user SaaS authorization layer around an existing application without replacing the existing auth provider unless the human explicitly asks. The target system supports users, teams/orgs/workspaces, memberships, roles, permissions, invites, server-side guards, audit logs, tenant isolation, and safe migration/backfill from existing solo-user data.

`BUILDPRINT.md` is the authority spine. `SPEC.md`, `CONTRACTS.md`, `RBAC_MATRIX.md`, `UI_FLOWS.md`, `API_ROUTES.md`, `MIGRATION_GUIDE.md`, `SECURITY_POLICY.md`, phase files, phase proof rules support this contract but do not override it.

Required constants:

```txt
TARGET_SHAPE = existing auth provider + team/membership/permission layer + tenant-scoped data + server guards + invite lifecycle + audit log + validation suite
DEFAULT_POSTURE = deny by default
AUTH_PROVIDER_RULE = reuse existing auth by default; do not rip/replace auth unless approved
AUTHZ_SOURCE_OF_TRUTH = server-side permission checks, not UI visibility
TENANT_RULE = every team-scoped read/write resolves team membership server-side
TEST_RULE = every team-scoped route needs direct server/API authorization tests
```

## Binding Implementation Slice

The accepted first implementation must include:

1. Phase 00 forensic research artifacts before schema/code changes.
2. A tenant boundary map for all existing or planned team-scoped resources.
3. A permission vocabulary and role-to-permission matrix.
4. Data model/migration plan for teams, memberships, invites, audit events, and tenant ownership.
5. A permission engine: `can(actor, action, resource/context)` with deny-by-default semantics.
6. Server-side route/API guards that do not trust client-provided `teamId` without membership resolution.
7. Invite lifecycle with expiry, revoke, single-use accept, email policy, and role ceiling.
8. Role lifecycle with self-escalation prevention and last-owner protection.
9. Audit events for privileged mutations with no secrets in metadata.
10. UI flows that reflect permissions but do not enforce security by themselves.
11. Migration/backfill and rollback/recovery instructions.
12. Validation chapter covering permission, tenant isolation, invite, role, API, UI, audit, migration, and threat regression proof.
13. Target-app authorization proof wired to the real DB/API/service authorization path, or blockers recorded.

## Non-Goals / Unsafe Claims

Do not claim or implement as included behavior:

- replacing a working auth provider by default;
- frontend-only authorization;
- trusting a request body/query `teamId` as authorization proof;
- global `isAdmin` as a substitute for team-scoped permissions;
- owners/admins allowed to remove the last owner;
- stale JWT/session claims accepted without server reconciliation for privileged actions;
- invites that never expire or can be reused;
- audit metadata containing tokens, passwords, API keys, or raw PII beyond explicit policy;
- billing permissions merged into generic admin without a product decision;
- proof marked done if any team-scoped route lacks direct server/API authorization coverage.

## Required Read Order

1. `BUILDPRINT.md`
2. `plans/00-auth-forensics-tenant-research.md`
3. `questions.md`
4. `SPEC.md`
5. `RBAC_MATRIX.md`
6. `CONTRACTS.md`
7. `API_ROUTES.md`
8. `UI_FLOWS.md`
9. `MIGRATION_GUIDE.md`
10. `SECURITY_POLICY.md`
11. `PLAN.md`
12. `plans/*.md` in numeric order

## Phase Gate Summary

- Phase 00: auth forensics, tenant research, authorization audit, threat model, decision gate.
- Phase 01: data model and tenant boundary.
- Phase 02: permission vocabulary and engine.
- Phase 03: server guards and team context resolution.
- Phase 04: invite and membership lifecycle.
- Phase 05: role mutation and owner safety.
- Phase 06: UI flows.
- Phase 07: audit log.
- Phase 08: billing/admin/API-key boundary.
- Phase 09: full security and product validation chapter.
- Phase 10: migration, backfill, rollout, rollback, and recovery.

## Completion Rule

This Buildprint is not complete if any team-scoped route lacks direct server/API authorization proof, if Phase 00 artifacts are missing, if tenant ownership is not explicit for every included data entity, or if target-app authorization proof is not wired to the real authorization path. Target-app completion requires phase proof records or concrete blockers.
