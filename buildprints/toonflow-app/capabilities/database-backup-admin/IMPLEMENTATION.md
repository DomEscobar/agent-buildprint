# Implementation: Database Backup, Import, And Destructive Admin Operations

## First Slice

- Implement UI/API/domain/persistence/provider path needed for: Authenticated operators can export all non-internal SQLite tables, import backup table data, clear/reinitialize tables, and trigger destructive data reset only behind explicit confirmation and audit controls.
- Preserve later full-suite work in the readiness map.
- Record safe defaults from `PRE_IMPLEMENTATION_QUESTIONS.md` if answers are unavailable.

## Milestones

1. Define contract tests for success, empty/loading if UI, and negative branch: Invalid import rejected; destructive reset requires explicit confirmation and auth.
2. Implement topology: Admin settings UI, export/import/reset APIs, confirmation UX, authorization, audit logging, backup validation, restore tests.
3. Add runtime/browser/provider/persistence proof hooks: Export/import/clear roundtrip in isolated temp DB
4. Update root and capability verification ledgers with artifact paths.

## Repair Loop

- Failed check: capture command, API/browser path, and observed failure.
- Structured feedback: map failure to UI/API/domain/persistence/provider layer.
- Focused fix: repair only the failing layer and adjacent contract.
- Rerun: repeat the exact proof command plus relevant negative test.
- Pass or blocker: either attach artifact or downgrade with blocker.

## Fresh Review

Required when touching auth, uploads, provider code, destructive operations, persistence migration, socket streaming, Electron/Docker runtime, or user data.

## Stop Conditions

- Requires security/admin hardening, audit/confirmation design, and isolated DB proof before implementation promotion.
- Any implementation that relies on a fake success state, no-op control, or unproven provider path must stop and downgrade to `CONTRACT_SEAM_ONLY`.

