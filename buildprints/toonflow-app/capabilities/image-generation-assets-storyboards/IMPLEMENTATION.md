# Implementation: Image Generation For Assets And Storyboards

## First Slice

- Implement UI/API/domain/persistence/provider path needed for: Users generate images for roles, scenes, props, and storyboard frames using configured image providers, with generation task records, file persistence, thumbnails, and failure states.
- Preserve later full-suite work in the readiness map.
- Record safe defaults from `PRE_IMPLEMENTATION_QUESTIONS.md` if answers are unavailable.

## Milestones

1. Define contract tests for success, empty/loading if UI, and negative branch: Provider failure updates image state and errorReason.
2. Implement topology: Generation forms, image API, AI image provider adapter, task record service, file service, polling/status UI.
3. Add runtime/browser/provider/persistence proof hooks: Sandbox image provider run or deterministic test-only provider plus live-proof blocker
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

- Needs sandbox/live image provider proof and browser polling evidence.
- Any implementation that relies on a fake success state, no-op control, or unproven provider path must stop and downgrade to `CONTRACT_SEAM_ONLY`.

