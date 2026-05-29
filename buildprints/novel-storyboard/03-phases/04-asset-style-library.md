# Phase 04 — Asset And Style Library

## How to implement this phase

Read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md` before code edits. Execute through phase-flow and block evidence until `.buildprint/phase-runs/04-asset-style-library/plan.md` and proof exist.

## Product outcome

A creator can create roles, scenes, props, audio assets, clips, and art styles; generate or upload media variants; select the current reference; and see all media reload with thumbnails, status, errors, and retry paths. Missing providers or failed uploads are visible and recoverable.

## Phase mode contract

blueprint_mode: product

phase_style: outcome_flow

Glance surfaces delivered: Asset and style library

This product phase owns the reusable media/reference library that downstream storyboard and canvas work consume.

## Mapped product obligations

- Asset records, child/derived assets, selected image/audio references, art styles, local file storage, small-image URLs, media delete/update, and prompt polishing/generation.

## Behavior compatibility contract

Preserve asset types, derivative relationships, selected reference behavior, generated image/audio states, and local media storage safety. Target UI may redesign layout and route names.

## Implementation scope

- Asset CRUD for role, scene, prop, audio, clip with parent/child variant relationships.
- Art style add/edit/extract prompt and style preview.
- Upload/generate/select/delete images and audio with queued/running/done/failed states.
- Media thumbnails, detail inspector, prompt/description fields, search/filter, and blocked-provider feedback.

## Interfaces touched

Asset/style library UI, upload controller, generation worker request API, media storage service, asset repository, image/audio repository, provider image/audio interface.

## State/runtime touched

Owns assets, child assets, images/audio files, selected media ids, art styles, prompt states, error reasons, media storage paths, and thumbnail derivatives. Reads project records. Downstream phases read selected assets.

## UX/UI requirements

Use media-production affordances: thumbnail grid plus inspector, type filters, selected badges, generation progress, retry/cancel, upload drop zone, audio preview, and responsive panels. Avoid default file inputs as the full interaction.

## Safety/security constraints

Upload size/type limits, path traversal tests, local media root containment, safe delete confirmation, secret-free provider errors, and no raw base64 in logs/evidence.

## Quality gates

- Unit/integration tests for assets, variants, selected reference, and art styles.
- Upload/read/delete traversal tests.
- Fake-provider image/audio generation test.
- Browser e2e for upload/generate/select/delete and restart readback.
- `verify:no-fake` and `PHASE_ID=04-asset-style-library verify:phase-artifacts`.

## Proof gate

Required labels: `migration_retention_backup_upload_limits`, `provider_adapter_config_test_required`, `live_provider_proof_blocker_only`, `durable_persistence`, `repeatable_browser_e2e`.

Proof must show real media file write/read/delete, selected reference readback after restart, failed upload recovery, and blocked-provider UI when live credentials are absent.

## Repair routing

Storage, upload, asset persistence, provider seam, or browser failures route to this phase. Missing project context routes to Phase 02.

