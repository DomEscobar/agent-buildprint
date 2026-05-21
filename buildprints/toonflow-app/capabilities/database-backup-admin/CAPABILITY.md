# Database Backup, Import, And Destructive Admin Operations

Status: `INCLUDED_RISKY_REQUIRES_HARDENING`
Depth status: `BLOCKED_WITH_REASON`

## Agent Brief

Goal: Authenticated operators can export all non-internal SQLite tables, import backup table data, clear/reinitialize tables, and trigger destructive data reset only behind explicit confirmation and audit controls.
Status: INCLUDED_RISKY_REQUIRES_HARDENING; BLOCKED_WITH_REASON.
Dependencies: Admin settings UI, export/import/reset APIs, confirmation UX, authorization, audit logging, backup validation, restore tests.
Stable behavior: Table enumeration, drop/reinit/import in batches, backup JSON contract.
Implementation freedom: internal framework, module names, and storage library are free if observable behavior and proof obligations are met.
Forbidden substitutions: static labels, no-op controls, route-shaped endpoints, deterministic providers, or in-memory-only state may not count as production behavior.
First implementation slice: build the smallest vertical path that exercises this capability through UI/API/domain/persistence/provider layers as applicable.
First verification gate: Export/import/clear roundtrip in isolated temp DB
Required evidence: artifacts/db-backup-roundtrip.log; BLOCKED_WITH_REASON: destructive operations not run.
No-fake checks: prove state changes, negative branch, and runtime/browser/provider evidence where applicable.
Stop or escalate when: Requires security/admin hardening, audit/confirmation design, and isolated DB proof before implementation promotion.

## Behavior Contract

- User/system action: Authenticated operators can export all non-internal SQLite tables, import backup table data, clear/reinitialize tables, and trigger destructive data reset only behind explicit confirmation and audit controls.
- Accepted inputs: see API/UI/domain contracts below; validate required fields and reject malformed input.
- Observable outputs: successful state mutation, returned data/file/socket stream, or explicit error reason.
- Important state: Whole SQLite database.
- Failure/empty/loading/blocked states: Invalid import format, partial import failure, unauthorized destructive action.
- Provider/persistence/runtime/operational boundary: Local database runtime.

## Stable vs Free

| Stable | Free |
|---|---|
| Authenticated operators can export all non-internal SQLite tables, import backup table data, clear/reinitialize tables, and trigger destructive data reset only behind explicit confirmation and audit controls. | Implementation framework/component/database abstraction. |
| Invalid import format, partial import failure, unauthorized destructive action. | Exact internal error class names. |
| Export/import/clear roundtrip in isolated temp DB | Test runner and artifact naming, if equivalent evidence is produced. |

## Source Evidence

- OBSERVED source-real/src/routes/setting/dbConfig/exportData.ts:7-29; source-real/src/routes/setting/dbConfig/importData.ts:8-55; source-real/src/routes/setting/dbConfig/clearData.ts:8-29; source-real/src/routes/other/deleteAllData.ts:7-14

