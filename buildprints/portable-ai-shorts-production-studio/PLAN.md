# Implementation Plan

Follow `BUILDPRINT.md` and `phases.yaml`. This file is a compact build-order aid.

## Phase 0: Alignment

- If user says `Use default studio preset`, use `DEFAULT_PRESET.md`.
- Otherwise ask exactly `questions.md`, summarize choices, and wait for confirmation.
- Record stack, persistence, provider mode, sample product, visual style, handoff target, and claim boundary.

## Phase 1: Contracts and Adapters

- Define canonical schemas from `CONTRACTS.md`.
- Add deterministic mock/no-network provider adapters from `PROVIDER_ADAPTERS.md`.
- Add tests for manual/URL analysis, script shape, actor/voice config, publish payload, consent gates, and invalid inputs.

## Phase 2: Runtime and Jobs

- Implement job lifecycle from `ASYNC_JOB_MODEL.md`: pending/running/success/failure/cancel/retry.
- Persist logs, provider request records, output manifest, result/error.
- Add restart or explicit local-persistence limitation evidence.

## Phase 3: Media Pipeline

- Implement fixture media path from `MEDIA_PIPELINE_SPEC.md`.
- Produce a playable 1080x1920 MP4 with captions and b-roll timing/visual changes.
- Test subtitle escaping, ffprobe dimensions, nonblank output, and output URL conversion.

## Phase 4: Browser Studio

- Build the studio UI from `WEBAPP_TARGET_SPEC.md` and `WORKBENCH_UX_SPEC.md`.
- Ensure source input, scripts, configuration, generation progress, review/player, gallery, and publish handoff all work from rendered controls.
- Keep logs/raw refs/manifest in secondary debug surfaces.

## Phase 5: Validation and Claims

- Run unit/contract/media/browser tests and production build.
- Capture completed desktop/mobile screenshots.
- Fill validation report from `VALIDATION_TEMPLATE.md`.
- Run claim wording and secret checks.

## Source Anchors

- Current AI Shorts orchestration: `saasshorts.py:1290-1474`
- Current backend generation route: `app.py:2069-2216`
- Current social handoff: `app.py:1823-1893`
- Current gallery pages: `app.py:1896-2046`
