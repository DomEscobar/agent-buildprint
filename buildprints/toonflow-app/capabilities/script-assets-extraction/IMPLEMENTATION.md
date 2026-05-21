# Implementation: Script Asset Extraction

## First Slice

- Implement UI/API/domain/persistence/provider path needed for: Users create scripts, export selected scripts as text files in a zip, and run AI extraction of roles/scenes/props with deduped script-asset links and extraction state tracking.
- Preserve later full-suite work in the readiness map.
- Record safe defaults from `PRE_IMPLEMENTATION_QUESTIONS.md` if answers are unavailable.

## Milestones

1. Define contract tests for success, empty/loading if UI, and negative branch: AI returns empty result sets extractState to failure.
2. Implement topology: Script CRUD/export API, AI extraction service, asset persistence, script-asset join table, task/status UI.
3. Add runtime/browser/provider/persistence proof hooks: Contract test for extraction result persistence with sandbox model
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

- Needs provider fixture/sandbox, zip export verification, and status polling proof.
- Any implementation that relies on a fake success state, no-op control, or unproven provider path must stop and downgrade to `CONTRACT_SEAM_ONLY`.

