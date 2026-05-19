# Buildprint: Portable AI Shorts Production Studio

## Agent Operating Contract

This file is the canonical authority spine for the Buildprint. Supporting files add contracts, UX rules, validation gates, source evidence, and machine-readable mirrors; they do not override this file.

Build a stack-flexible, product-grade webapp proof for an AI shorts production studio. The studio creates vertical UGC-style marketing video drafts from either a product URL or a manual product/business description.

Default acceptance is a full webapp proof, not an API-only harness. Agents must deliver a usable browser studio with deterministic mock/no-network providers by default, a pollable generation workflow, a playable 1080x1920 MP4 fixture output, gated gallery/publish surfaces, validation reports, screenshots, and explicit claim boundaries.

Generated videos are draft artifacts until durability, key handling, consent, privacy, egress, provider validation, and platform handoff gates are satisfied.

## Required Constants

```txt
TARGET_SHAPE = full browser AI shorts production studio proof
DEFAULT_PROVIDER_MODE = deterministic mock/no-network
DEFAULT_ACCEPTANCE = real browser webapp + local playable 1080x1920 MP4 fixture + validation evidence
STACK_POLICY = stack-flexible; behavior and evidence are mandatory
PRIMARY_UI = studio workflow first; debug/JSON/reporting secondary
LIVE_PROVIDER_POLICY = optional, env-gated, never default acceptance
PUBLISHING_DEFAULT = handoff/mock/manual approval; never auto-publish by default
ALIGNMENT = ask questions.md only unless user says "Use default studio preset"
```

## LLM Attention Contract

- Keep "usable AI shorts production studio" in active context. Do not drift into a backend-only compliance proof.
- The first useful screen must be the production workflow, not a report, raw manifest, route list, or debug dashboard.
- Debug evidence, raw provider refs, logs, and manifests are required but secondary.
- If context is compacted, reread `BUILDPRINT.md`, `PRODUCT_QUALITY_BAR.md`, `LLM_AGENT_EXECUTION_GUIDE.md`, `WEBAPP_TARGET_SPEC.md`, and `claims.yaml` before continuing.
- Before final reporting, reread `HEAD_TO_FOOT_QA.md`, `BROWSER_QA_SCENARIOS.md`, `VALIDATION_TEMPLATE.md`, and `PARITY_CLAIMS.md`.
- Every included route, button, job state, adapter, and visible workflow must work end-to-end or be visibly disabled/blocked with an honest reason.

## Binding Implementation Slice

Build exactly this first:

1. Alignment choices: use `DEFAULT_PRESET.md` when the user says `Use default studio preset`; otherwise ask exactly `questions.md` and record the answers.
2. Webapp shell: a browser-accessible studio with source input, analysis/scripts, configuration, generation progress, review/player, gallery, and publish handoff surfaces.
3. Product input: accept product URL or manual description. Manual-description mode must work without URL input.
4. URL path: execute scrape, optional web research, analysis, and script generation through adapter seams with deterministic mock fixtures by default.
5. Script workflow: produce structured product analysis and at least two selectable UGC script drafts; scripts must contain five timed segments and b-roll requirements.
6. Configuration workflow: user can select/edit script, voice, actor source/image, narration text, video mode, and consent/gating controls.
7. Provider adapters: Gemini/research, ElevenLabs/voice, fal.ai/Flux/Hailuo/Kling/VEED media, Upload-Post, S3, scraping, and yt-dlp are isolated behind adapter contracts. Tests use deterministic mocks and make no live network calls.
8. Job lifecycle: generation returns a pollable `job_id`; status exposes pending/running/success/failure/cancel/retry, ordered logs, provider request records, output manifest, and error reasons.
9. Media pipeline: deterministic fixture pipeline creates a playable local vertical MP4 that probes as 1080x1920, includes nonblank visual content, subtitles/caption layer, b-roll timing markers, and escaped provider text.
10. Gallery: metadata/API and `/gallery` + `/video/{video_id}` pages render only after explicit publication/gallery consent. Gallery is private by default.
11. Publish handoff: Upload-Post/social payload construction is available only after explicit consent and validation gates; default behavior is mock/manual handoff, not platform publishing.
12. Browser QA: real browser happy path clicks rendered controls, observes completed state, parses output evidence from rendered UI, and captures desktop/mobile screenshots.
13. Reports: implementation records validation, build/test summary, browser/runtime report, screenshot paths, MP4 probe evidence, provider mode, limitations, and remaining gaps.

## Non-Goals / Unsafe Claims

Do not build or claim as included behavior:

- OpenShorts clone, drop-in replacement, commercial equivalence, or exact UI/API/provider parity.
- API-only proof, route-shaped mocks, gallery-only HTML, empty dashboard, raw JSON/manifest-first UI, or debug report as the primary product.
- Fake provider success, placeholder/no-op controls, in-memory-only durability claimed as restart-safe, or mock behavior claimed as live provider behavior.
- Publish-ready production behavior without durable storage, durable logs, provider request IDs, restart recovery tests, server-side key handling, URL egress policy, consent controls, gallery privacy controls, and provider validation evidence.
- Direct official TikTok, Instagram, or YouTube API publishing.
- Provider availability, moderation compliance, output quality, response schema stability, or cost stability.
- Public gallery safety without private-by-default storage, access controls, and explicit publish consent.
- Multi-tenant hosted SaaS security while provider keys remain browser-managed.

Temporary in-process state is allowed only for clearly labeled local proof mode and must not be described as restart-safe durability.

## Required Read Order

1. `BUILDPRINT.md`
2. `buildprint.json`, `phases.yaml`, `acceptance.yaml`, `claims.yaml`
3. `DEFAULT_PRESET.md`, `questions.md`
4. `PRODUCT_QUALITY_BAR.md`, `LLM_AGENT_EXECUTION_GUIDE.md`
5. `SPEC.md`
6. `CONTRACTS.md`, `PROVIDER_ADAPTERS.md`, `ASYNC_JOB_MODEL.md`, `MEDIA_PIPELINE_SPEC.md`
7. `WEBAPP_TARGET_SPEC.md`, `WORKBENCH_UX_SPEC.md`
8. `SYSTEM_MAP.md`, `THREAT_MODEL.md`
9. `TEST_MATRIX.md`, `QA_PLAN.md`, `HEAD_TO_FOOT_QA.md`, `BROWSER_QA_SCENARIOS.md`
10. `TRACEABILITY_MATRIX.md`, `SOURCE_TRACE.md`, `PARITY_CLAIMS.md`
11. `PLAN.md`, `checks/acceptance.md`, `VALIDATION_TEMPLATE.md`

## Phase Gates

### Phase 0 - Alignment

Exit only when:

- Stack, persistence mode, provider mode, sample product, visual style, and publish handoff target are recorded.
- Safe/unsafe claims are copied into docs or visible limitations UI.
- The agent confirms full webapp proof is the target and API-only proof cannot pass.

### Phase 1 - Contracts and Domain

Exit only when:

- Canonical schemas exist for analysis, scripts, actor options/upload, voices, generation request, job status/logs, output manifest, gallery metadata, publish handoff, and provider request records.
- Tests validate happy/invalid request shapes and non-claim wording.
- Provider interfaces and deterministic mock adapters are defined before orchestration depends on them.

### Phase 2 - Runtime and Jobs

Exit only when:

- Job lifecycle supports pending, running, success, failure, cancel, retry, idempotent retry owner behavior, ordered logs, error reasons, output manifest, and provider request records.
- Chosen local persistence survives app restart or is explicitly labeled temporary proof storage.
- No-network default is enforced in tests.

### Phase 3 - Media Pipeline

Exit only when:

- Fixture audio/subtitles/b-roll/composition path creates playable 1080x1920 MP4.
- Tests prove subtitle escaping, b-roll timing, nonblank output, output URL conversion, and ffprobe dimensions.
- Optional Remotion service, if implemented, validates schema and output path behavior.

### Phase 4 - Webapp Studio

Exit only when:

- Browser studio implements source input, analysis/scripts, configuration, generation progress, review/player, gallery, and publish handoff workflows.
- Primary UI satisfies `PRODUCT_QUALITY_BAR.md`: it reads as a production studio, not a debug dashboard.
- No included button/control is a no-op unless visibly disabled with an honest reason.
- Real browser happy path and negative path scenarios pass or blockers are recorded.

### Phase 5 - Validation and Claims

Exit only when:

- Unit/integration/media/browser tests and production build pass.
- Completed-state desktop and mobile screenshots show a populated studio workflow, video player, status/log affordance, and limitations/non-claims.
- `VALIDATION.md` or equivalent report records commands, evidence, screenshot paths, MP4 probe, provider mode, gaps, and final status.
- Claim wording check confirms safe claims only.

## Acceptance Gates

The build is accepted only when all are true:

| Gate | Required evidence |
|---|---|
| Full webapp proof | Browser-accessible studio with rendered controls for source input, scripts, config, generation, review, gallery, and handoff |
| Manual analysis | Manual description returns structured analysis and scripts without URL |
| URL analysis | URL path uses scrape/research/analyze/script adapters with deterministic fixtures by default |
| Script schema | At least two selectable scripts; each has five timed segments and b-roll requirements |
| Provider seams | Gemini, ElevenLabs, fal.ai/media, Upload-Post, S3, scraping/yt-dlp surfaces are isolated adapters with mocks |
| Job lifecycle | Pollable job status includes state, logs, provider records, output manifest, result/error, cancel, and retry semantics |
| Media fixture | Playable MP4 exists, probes as 1080x1920, is nonblank, includes subtitles/caption layer and b-roll timing evidence |
| Gallery privacy | Gallery API/pages render only consented metadata; private-by-default behavior is tested |
| Publish handoff | Payload matches selected platforms, title/description, schedule, timezone, and consent; no default auto-publish |
| Browser QA | Real browser happy path clicks rendered controls and captures completed desktop/mobile screenshots |
| Negative paths | Missing keys, provider failure, invalid URL, invalid script/provider output, gallery without consent, and publish without consent show visible failure states |
| Build/tests | Unit/contract/media/browser checks and production build pass or concrete blockers are recorded |
| Claims | Safe/non-claim wording visible in UI/docs; forbidden wording absent from completion claims |
| Validation | Final report records commands, evidence, screenshots, MP4 probe, provider mode, gaps, and status |

## Purpose

This Buildprint turns the observed AI Shorts workflow into a clean, portable architecture contract for coding agents. It preserves useful route, UI, provider, composition, gallery, and deployment evidence while forcing a real studio-shaped proof and preventing tiny fake apps or unsafe parity claims.

## Architecture

```txt
Browser production studio
  -> app API/service layer
    -> product scrape / web research adapter
    -> product analysis + script adapter
    -> actor image / voice / talking-head / b-roll provider adapters
    -> async job runtime + durable-enough local state
    -> fixture audio/subtitle/b-roll composition
    -> optional Remotion post-processing adapter
    -> local output + private-by-default gallery metadata
    -> consent-gated Upload-Post/social handoff adapter
```

Source evidence recommends React dashboard, FastAPI routes, FFmpeg, and optional Remotion, but implementations may choose another stack if all contracts, UX surfaces, and evidence gates are satisfied.

Primary evidence anchors:

- Product/manual input and analyze route: `app.py:1661-1717`
- Web research/scrape/analyze: `saasshorts.py:47-365`
- Script generation: `saasshorts.py:368-546`
- Actor/voice/video configuration UI: `dashboard/src/components/SaaShortsTab.jsx:850-1188`
- Provider asset generation: `saasshorts.py:553-1015`
- Subtitle/composition/orchestration: `saasshorts.py:1049-1474`
- Generate/status API: `app.py:2060-2230`
- Gallery/SEO pages: `app.py:1896-2046`
- Social publish handoff: `app.py:1812-1893`
- Docker services: `docker-compose.yml:1-40`

## Evidence Boundary

Source citations prove code shape and observed control flow. They do not prove live provider success, hosted deployment security, public bucket safety, platform publishing success, moderation outcomes, output quality, or restart-safe production durability. Those claims require the validation gates above plus provider/platform evidence.

## Required Validation

At minimum, run and record:

- unit/contract tests;
- production build;
- no-network/default mock-provider gate;
- media fixture tests with ffprobe 1080x1920 evidence;
- real browser happy path with desktop/mobile screenshots;
- browser negative paths from `BROWSER_QA_SCENARIOS.md`;
- secret scan and claim wording check;
- validation report from `VALIDATION_TEMPLATE.md`.

Live provider tests are optional. If run, record approved credentials scope, sandbox target, date, provider request IDs, sanitized responses, costs, and remaining limitations. Live evidence does not remove the mock/no-network default requirement.

## Copyable Agent Prompt

```txt
Use the Portable AI Shorts Production Studio Buildprint. Read BUILDPRINT.md first, then follow the Required Read Order, Phase Gates, and Acceptance Gates.

If the user says "Use default studio preset", use DEFAULT_PRESET.md. Otherwise ask exactly questions.md, summarize choices, and wait for confirmation.

Build a stack-flexible full webapp proof by default: browser studio UI, deterministic mock/no-network provider adapters, pollable jobs, fixture media pipeline, playable 1080x1920 MP4 output, consent-gated gallery, consent-gated social handoff, tests, production build, browser QA screenshots, and validation report.

Do not ship an API-only proof, route-shaped mocks, gallery-only HTML, empty dashboard, raw JSON/manifest-first UI, fake provider success, OpenShorts clone claim, drop-in replacement claim, provider/API parity claim, rendering-quality parity claim, or social-platform publishing parity claim.
```
