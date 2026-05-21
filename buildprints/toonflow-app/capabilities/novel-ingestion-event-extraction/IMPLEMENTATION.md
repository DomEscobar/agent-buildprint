# Implementation: Novel Import And Chapter Event Extraction

## First Slice

- Implement UI/API/domain/persistence/provider path needed for: Users import chapter batches, list/search chapter text, and trigger AI chapter-event extraction that updates per-chapter event state and error reason.
- Preserve later full-suite work in the readiness map.
- Record safe defaults from `PRE_IMPLEMENTATION_QUESTIONS.md` if answers are unavailable.

## Milestones

1. Define contract tests for success, empty/loading if UI, and negative branch: Empty novelIds returns failure response and does not mutate unrelated chapters.
2. Implement topology: Novel import UI, API routes, clean-novel worker/service, AI text provider, SQLite chapter/event state, polling/status UI.
3. Add runtime/browser/provider/persistence proof hooks: API import + generate event using sandbox text provider
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

- Needs provider sandbox, asynchronous state proof, and malformed AI-output handling evidence.
- Any implementation that relies on a fake success state, no-op control, or unproven provider path must stop and downgrade to `CONTRACT_SEAM_ONLY`.

