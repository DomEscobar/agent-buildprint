# Implementation: Production Agent Workbench

## First Slice

- Implement UI/API/domain/persistence/provider path needed for: Authenticated users use a production agent to derive assets, generate asset images, plan direction, build storyboard tables/panels, generate storyboard images, and run supervision using art/story/production skills.
- Preserve later full-suite work in the readiness map.
- Record safe defaults from `PRE_IMPLEMENTATION_QUESTIONS.md` if answers are unavailable.

## Milestones

1. Define contract tests for success, empty/loading if UI, and negative branch: Missing project/model returns errors, stop aborts stream without fake completion.
2. Implement topology: Production socket namespace, agent sub-agent orchestration, skill loader, flow workspace event bridge, asset/storyboard APIs, memory.
3. Add runtime/browser/provider/persistence proof hooks: Socket + flow integration test with sandbox text provider
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

- Needs browser canvas proof, socket stream proof, and skill activation evidence.
- Any implementation that relies on a fake success state, no-op control, or unproven provider path must stop and downgrade to `CONTRACT_SEAM_ONLY`.

