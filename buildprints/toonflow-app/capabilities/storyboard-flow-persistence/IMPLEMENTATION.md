# Implementation: Storyboard And Flow Data Persistence

## First Slice

- Implement UI/API/domain/persistence/provider path needed for: Users persist per-episode production flow data, hydrate flow workspaces from scripts/assets/storyboards, order storyboard frames, and create storyboard records linked to tracks.
- Preserve later full-suite work in the readiness map.
- Record safe defaults from `PRE_IMPLEMENTATION_QUESTIONS.md` if answers are unavailable.

## Milestones

1. Define contract tests for success, empty/loading if UI, and negative branch: Malformed flow payload rejected; restart retains order.
2. Implement topology: Flow editor UI, REST persistence, schema validation, storyboard/asset join tables, restart/readback tests.
3. Add runtime/browser/provider/persistence proof hooks: Save/read/restart/readback contract test
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

- Needs restart/readback/delete/reorder proof and browser canvas screenshots.
- Any implementation that relies on a fake success state, no-op control, or unproven provider path must stop and downgrade to `CONTRACT_SEAM_ONLY`.

