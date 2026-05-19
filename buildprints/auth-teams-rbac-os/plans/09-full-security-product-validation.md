# Phase 09 — Full Security & Product Validation

This is a large validation chapter, not a thin checklist.

## 09.1 Permission Engine Unit Tests

Cover default roles, unknown permissions, missing membership, removed/suspended membership, custom roles if enabled.

## 09.2 Tenant Isolation Tests

Team A cannot read/write Team B resources. Client-provided `teamId` cannot override server-resolved membership. List endpoints return only current team data. Global records are explicitly marked. Soft-deleted records do not leak.

## 09.3 Invite Lifecycle Tests

Valid invite accepts once. Expired/revoked invite fails. Email mismatch fails unless policy says otherwise. Duplicate invite behavior is defined. Invite cannot grant above inviter ceiling.

## 09.4 Role Mutation Abuse Tests

Block member/admin self-promotion, last-owner demotion/removal, cross-team role edits, stale session permission after demotion.

## 09.5 Server Guard / API Tests

Every privileged route gets direct-call tests: no session -> 401, no membership -> 403, missing permission -> 403, valid permission -> success, malformed ids -> safe failure.

## 09.6 UI Permission Tests

Hidden/disabled actions match permissions. Role dropdown only shows allowed transitions. Team switcher clears stale state. Audit page requires `audit.read`.

## 09.7 Audit Log Tests

Assert audit events for invite create/revoke/accept, role change, member removal, settings change, billing/API-key actions if included. Verify actor, team, action, target, timestamp, redacted metadata.

## 09.8 Migration / Backfill Tests

Existing solo user gets first team. Records receive `teamId`. Orphans are flagged. Rollback does not corrupt memberships. Unique constraints prevent duplicates. Recovery path exists.

## 09.9 Threat Regression Suite

Encode the threat model: cross-tenant access, privilege escalation, invite replay, stale permissions, missing tenant filter, last-owner deletion, frontend-only bypass, billing permission confusion.

## 09.10 Manual QA / Browser Flows

Owner invites admin; admin invites member; member attempts forbidden action; owner changes role; removed user loses access; team switcher works; audit reflects actions.

## 09.11 Target-App Conformance Suite

Run the non-illustrative conformance kit against the target app:

```bash
npm --prefix .buildprint/snapshots/conformance run typecheck
AUTH_RBAC_CONFORMANCE_ADAPTER=file:///absolute/path/to/adapter.js npm --prefix .buildprint/snapshots/conformance test
```

The adapter must call the real DB/API/service authorization path. Hard-coded allow/deny responses, in-memory-only fake routes, or adapters that bypass the actual guards do not count.

Required conformance coverage:

- anonymous and non-member direct API denial;
- cross-tenant resource denial;
- frontend-bypass invite attempts;
- self-escalation and above-ceiling role grants;
- last-owner removal/demotion protection;
- invite expiry, revoke, exact-email, and single-use semantics;
- billing permission separation;
- audit log read protection and redaction.

## 09.12 Evidence Requirements

Output test command, pass/fail counts, skipped tests with reason, screenshots for key UI flows if UI exists, every route/permission covered, conformance adapter path, proof that the adapter calls real target-app authorization code, and uncovered routes as blockers.
