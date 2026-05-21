# Implementation: Video Generation Workbench

## First Slice

- Implement UI/API/domain/persistence/provider path needed for: Users create video tracks, generate videos from prompts and storyboard/asset references, poll success/failure, and receive playable local URLs for completed clips.
- Preserve later full-suite work in the readiness map.
- Record safe defaults from `PRE_IMPLEMENTATION_QUESTIONS.md` if answers are unavailable.

## Milestones

1. Define contract tests for success, empty/loading if UI, and negative branch: Provider failure updates o_video.state and errorReason.
2. Implement topology: Timeline/workbench UI, video generation API, provider adapter, o_video/o_videoTrack persistence, task record, polling UI.
3. Add runtime/browser/provider/persistence proof hooks: Sandbox video provider or blocked live-provider proof with polling trace
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

- Needs sandbox/live video proof, long-running job proof, and browser timeline evidence.
- Any implementation that relies on a fake success state, no-op control, or unproven provider path must stop and downgrade to `CONTRACT_SEAM_ONLY`.

