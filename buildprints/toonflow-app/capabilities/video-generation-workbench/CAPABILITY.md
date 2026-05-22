# Video Generation Workbench

Status: `INCLUDED_NEEDS_PROOF`
Depth status: `CONTRACT_SEAM_ONLY`

## Owned source surfaces

- routes.production.workbench.*
- routes.cornerScape.audioBinding.*
- providers.video.*
- tables.o_video
- tables.o_videoTrack
- tables.o_assetsRole2Audio
- tables.o_tasks

## Product obligations

- Preserve tracks, video prompt/reference generation, provider polling, local video URLs, audio binding, and failure/retry/delete states.

## Agent Brief

Goal: Users create video tracks, generate videos from prompts and storyboard/asset references, poll success/failure, and receive playable local URLs for completed clips.
Status: INCLUDED_NEEDS_PROOF; CONTRACT_SEAM_ONLY.
Dependencies: Timeline/workbench UI, video generation API, provider adapter, o_video/o_videoTrack persistence, task record, polling UI.
Stable behavior: Reference media conversion, ratio/resolution/duration/audio/mode passing, async state transitions.
Implementation freedom: internal framework, module names, and storage library are free if observable behavior and proof obligations are met.
Forbidden substitutions: static labels, no-op controls, route-shaped endpoints, deterministic providers, or in-memory-only state may not count as production behavior.
First implementation slice: build the smallest vertical path that exercises this capability through UI/API/domain/persistence/provider layers as applicable.
First verification gate: Sandbox video provider or blocked live-provider proof with polling trace
Required evidence: artifacts/video-generation.trace; BLOCKED_WITH_REASON: no video provider credentials.
No-fake checks: prove state changes, negative branch, and runtime/browser/provider evidence where applicable.
Stop or escalate when: Needs sandbox/live video proof, long-running job proof, and browser timeline evidence.

## Behavior Contract

- User/system action: Users create video tracks, generate videos from prompts and storyboard/asset references, poll success/failure, and receive playable local URLs for completed clips.
- Accepted inputs: see API/UI/domain contracts below; validate required fields and reject malformed input.
- Observable outputs: successful state mutation, returned data/file/socket stream, or explicit error reason.
- Important state: o_videoTrack, o_video, data/oss video files, o_tasks.
- Failure/empty/loading/blocked states: Missing reference file, provider failure, timeout, unsupported mode.
- Provider/persistence/runtime/operational boundary: Configured video provider.

## Stable vs Free

| Stable | Free |
|---|---|
| Users create video tracks, generate videos from prompts and storyboard/asset references, poll success/failure, and receive playable local URLs for completed clips. | Implementation framework/component/database abstraction. |
| Missing reference file, provider failure, timeout, unsupported mode. | Exact internal error class names. |
| Sandbox video provider or blocked live-provider proof with polling trace | Test runner and artifact naming, if equivalent evidence is produced. |

## Source Evidence

- OBSERVED Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/routes/production/workbench/addTrack.ts:7-27; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/routes/production/workbench/generateVideo.ts:21-123; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/routes/production/workbench/checkVideoStateList.ts:8-32; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/utils/ai.ts:292-323

