# Phase 00 — Auth Forensics + Tenant Research + Decision Gate

Phase 00 is a research phase. Do not write migrations or UI until these artifacts exist.

## 00.1 Repo/Auth Census → AUTH_CENSUS.md

Find and cite:

- auth provider: Clerk, Supabase, Auth.js, Firebase, custom, etc.;
- session source: cookies, JWT, server sessions, middleware;
- user table/model and identity ids;
- login/register/reset flows;
- protected routes and APIs;
- existing admin checks;
- existing org/team/workspace concepts.

## 00.2 Data Ownership Map → TENANT_BOUNDARY_MAP.md

Inventory every entity that may need tenant scoping: projects, files, messages, invoices, settings, API keys, integrations, jobs, logs, audit records. For each, decide global/user/team/hybrid, owner, move policy, soft-delete policy, migration risk.

## 00.3 Existing Authorization Audit → AUTHZ_AUDIT.md

Search for `isAdmin`, `role`, `owner`, `userId`, middleware guards, frontend-only hides, DB queries without tenant filters, and API routes that trust client `teamId`. Classify safe, unsafe, missing, unknown.

## 00.4 Threat Model → THREAT_MODEL.md

Cover cross-team access, billing abuse, last-owner deletion, self-escalation, invite replay, wrong-email invite accept, removed-user stale session, stale JWT permissions, frontend-only bypass, and team switcher leakage.

## 00.5 Product Policy Decisions → DECISION_GATE.md

Ask only blockers: naming, multi-team membership, team creation, personal workspace, domain invites, fixed/custom roles, billing manager, owner invite policy, owner leave policy, deleted-user audit retention, API-key scope.

## 00.6 Permission Vocabulary Draft → RBAC_DRAFT.md

Draft action strings before schema. Roles map to permissions only after the vocabulary is approved.

## 00.7 Migration Risk Plan → MIGRATION_RISK.md

Decide first-team creation, existing record backfill, rollback, recovery, feature flag need.

## Exit Criteria

Proceed only when all artifacts exist, high-risk unknowns are blockers, and the initial permission vocabulary is approved.
