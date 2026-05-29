# Phase 06 — Storyboard And Media Generation Workbench

## How to implement this phase

Read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md` before code edits. Execute through phase-flow and block evidence until `.buildprint/phase-runs/06-storyboard-media-workbench/plan.md` and proof exist.

## Product outcome

A creator can convert script and asset context into storyboard panels, generate storyboard images, produce model-specific video prompts, generate clips, bind audio, choose video track results, and inspect failures or retries. Live provider absence appears as a blocked-provider state after the local worker and fake-provider path are proven.

## Phase mode contract

blueprint_mode: product

phase_style: outcome_flow

Glance surfaces delivered: Storyboard and media generation workbench

This phase is product-facing but worker-heavy. It must prove async generation states, worker_retry_cancel_recovery, media persistence, and provider blockers for storyboard/video/audio work.

## Mapped product obligations

- Storyboard rows with prompt, file, duration, state, track, reason, videoDesc, shouldGenerateImage, project/script/flow ids, asset associations.
- Workbench video tracks, prompts, generated videos, selected clips, material data, audio binding, polling/check state.

## Behavior compatibility contract

Preserve storyboard/video/audio generation semantics and asset associations, while allowing cleaner target APIs. Model prompt formats and reference mapping must be explicit and testable.

## Implementation scope

- Storyboard table/panel editor with add/batch add/edit/delete/order/preview.
- Image generation jobs for selected storyboard panels with progress, failed state, retry/cancel, and selected output.
- Video prompt generation from storyboard and assets with model-specific formatting.
- Video generation jobs, track list, clip selection, delete, audio binding, material export/read model.

## Interfaces touched

Storyboard/media UI, generation worker API, provider image/video/audio interfaces, prompt formatter service, storyboard repository, video/videoTrack repository, asset association repository.

## State/runtime touched

Owns storyboard rows, storyboard-image files, storyboard-asset links, video tracks, generated video rows/files, selected video ids, prompt artifacts, audio binding state, job state, and errors. Reads canvas flow ids and selected assets.

## UX/UI requirements

Use storyboard and media-workbench affordances: panel table plus visual strip, status badges, prompt editor, preview modal, track lanes, selected clip marker, retry/cancel controls, blocked provider cards, and progress that does not shift layout.

## Safety/security constraints

Provider cost controls, explicit live execution approval, media file limits, cancellation timeouts, retry caps, secret redaction, and no provider output claimed without proof.

## Quality gates

- Worker tests for queued/running/done/failed/retry/cancel.
- Fake-provider tests for image/video/audio and prompt formatting.
- Persistence roundtrip for storyboard, associations, video tracks, selected videos.
- Browser e2e for panel generation, prompt generation, blocked-provider, track selection.
- `verify:no-fake` and `PHASE_ID=06-storyboard-media-workbench verify:phase-artifacts`.

## Proof gate

Required labels: `worker_retry_cancel_recovery`, `provider_adapter_config_test_required`, `live_provider_proof_blocker_only`, `durable_persistence`, `repeatable_browser_e2e`.

Proof must separate fake-provider local pass from provider_live. Missing credentials block only live provider proof after worker, persistence, prompt, and blocked UI paths pass.

## Repair routing

Worker, prompt, media persistence, provider, browser, or track selection failures route to this phase. Missing provider adapter foundation routes to Phase 07.

