# Project Setup

This setup contract is completed before phase implementation. It turns short human alignment and mapped mapped observations into concrete project architecture, team operating rules, quality gates, and the future project `AGENTS.md` plan.

## Setup defaults

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from mapped observations and product goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks.
- If the human requests live provider validation, public deployment, paid rendering, real publishing, or public gallery exposure, treat that as a separate credentialed approval gate.
- blueprint_mode.primary: product.
- phase_style: outcome_flow.
- Per-phase mode: every phase in this packet is a product phase and must include `## Phase mode contract` with `blueprint_mode: product` and `phase_style: outcome_flow`.

## Blueprint mode

- Primary: product
- Phase style: outcome_flow
- Why this mode fits: the selected packet maps an end-user production application with UI workflows, API/service behavior, provider-backed generation, media artifacts, gallery/publish outcomes, and proof-gated product phases. It is not primarily a library, framework, integration-only connector, automation loop, data pipeline, or infrastructure packet.

## Product shape

- Product: AI Shorts Production Studio.
- Frontend/UI surfaces: studio home/workbench, source input, analysis/scripts, configuration, generation progress, review/player, private gallery, video detail, publish handoff, limitations notice, and secondary debug/details drawer.
- Backend/API surfaces: clip generator process/status/edit/subtitle/hook/translate/render, product analysis/scripts, actor options/upload validation, voice list, AI Shorts generation/status, gallery list, video detail, social publish handoff, YouTube Studio upload/analyze/title-refine/thumbnail/description/publish, provider request records, output manifest, and validation/report surfaces.
- State/runtime surfaces: product project state, script selection and edits, actor/voice/video config, consent flags, job queue/status/logs, provider request records, output manifests, local media artifacts, gallery metadata, publish handoff payloads, validation reports, browser screenshots, and runtime evidence.
- Proof source: derive from `04-evaluation.md` and each active phase proof gate: contract, adapter, job, media, browser, privacy, publishing, security, no-fake, build, and evidence checks.

## Architecture decisions

Record decisions with short evidence, not bureaucracy:

- Framework/runtime:
  - Decision: AI best-fit unless human constrained it; browser UI, server API, media composition tooling, job workers, provider adapters, gallery pages, and optional render-service boundaries are the capability contract.
  - Evidence: mapped source had those product surfaces, but concrete source frameworks are replaceable implementation details unless the human requires them.
- Package manager:
  - Decision: choose ecosystem-standard default for the selected stack.
  - Evidence: proof gates require repeatable install, tests, production build, browser automation, and media checks.
- Data/storage:
  - Decision: use durable-enough local persistence for jobs, logs, manifests, gallery metadata, and output paths, or visibly label temporary proof storage and record a blocker for production durability.
  - Evidence: source used local output directories, in-memory job maps, optional S3, and public gallery metadata.
- Auth/providers/deployment:
  - Decision: mock/no-network providers by default. Live keys, public storage, real publishing, and hosted deployment require explicit human approval and evidence.

## Production readiness contract

Production-grade architecture is the default for the selected full-suite packet. Do not downgrade to a local MVP unless the user explicitly reduces selected scope. Missing credentials block only live proof; they do not block implementation of provider adapters, config contracts, deterministic tests, durable state paths, security boundaries, worker/runtime ownership, media pipeline seams, deployment/ops shape, or browser/e2e proof plans.

- Auth/session/tenant boundary: define local project/session ownership, private-by-default gallery state, consent flags, upload ownership, publish authorization, and access-control seams before exposing gallery, video details, or publish handoffs.
- Provider integration contract: implement analysis/research, voice, actor/upload, image/video, composer, storage, scraper/downloader, and social handoff adapters with deterministic mock/no-network mode, live config validation, fail-closed missing-credential behavior, and tests that do not upgrade mocks to live providers.
- Durable persistence contract: define project state, scripts, actor/voice/video config, jobs, logs, provider records, output manifests, media artifact paths, gallery metadata, publish handoff payloads, validation reports, import/export, delete/reset, retention, migration, and restart/readback ownership before claiming production durability.
- Worker/runtime contract: define generation queue ownership, pending/running/success/failure/blocked/canceled/retry states, ordered logs, progress persistence, retry/cancel/failure recovery, and restart behavior.
- Deployment and operations contract: document local dev, production target, env/config, health/readiness, structured logs, media/output limits, URL egress policy, upload limits, CI/browser/media gates, and release blockers.
- Browser/e2e contract: UI-bearing work must have repeatable browser/e2e proof plans for source input, analysis/scripts, configuration, generation progress, review/player, gallery, publish handoff, blocked provider states, desktop/mobile screenshots, accessibility, and no-overlap responsive behavior.

Runtime setup artifact: before phase work, write `.buildprint/setup.md` or `.buildprint/setup/*.md` in the implementation workspace with the concrete choices above. Creating only `AGENTS.md` is not enough; `AGENTS.md` is a scope governor and local instruction map after setup decisions exist.

## Workbench UX quality contract

- UI architecture: define a real UI boundary, component/state ownership, controller/API integration, and browser proof path for any user-facing phase.
- Product composition: start from the primary workflow surface, not a generic dashboard, default form, or marketing shell.
- Domain-specific affordances: represent domain objects with appropriate workbench affordances instead of raw text-list substitutes.
- Visual system: define hierarchy, density, typography, spacing, color, focus, disabled, loading, error, blocked, and success states.
- Screenshot critique: browser or screenshot evidence must critique visual hierarchy, responsive behavior, accessibility, and local-MVP risk before UX proof can upgrade.

## Mapped contract anchors

Promote concrete source observations into implementation contracts before starting phases:

- Route/API/job prefixes and handlers: source paths `app.py` analyze/generate/status/gallery/post handlers, source path `saasshorts.py` orchestration, source path `dashboard/src/components/SaaShortsTab.jsx` wizard states.
- Request/response payloads and validation errors: product URL or description, script count/style/language/actor gender, script segment schema, actor upload/options, voices, generate request, job status, output manifest, gallery metadata, publish handoff payload.
- Provider/runtime boundaries and env var names only: Gemini/research, ElevenLabs, fal.ai/Flux/Hailuo/Kling/VEED, Upload-Post, S3, scraper, yt-dlp/downloader, FFmpeg/composer, optional Remotion.
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: label future product outputs as runtime artifacts/generated outputs, not packet files. Required generated outputs include runtime artifact: local MP4, runtime artifact: output manifest, runtime artifact: screenshots, runtime artifact: validation report, runtime artifact: provider request records.
- UI flow/state anchors including empty/loading/error/blocked/success states: source input, script selection, configuration, running job status, completed review/player, private gallery, publish handoff, provider/debug details.

## Mapped obligation/surface matrix

Before phase work, account for every high-signal source surface from the mapper census/evidence: user-facing routes/screens, API handlers, jobs/workers, provider adapters, auth/admin boundaries, persistence models/stores, uploads/imports/exports, generated artifacts, destructive lifecycle actions, and deployment/runtime requirements.

Use this format for each entry:

- Surface id:
  - Source anchor: source path plus line/section or route/job/provider marker.
  - Source evidence: observed file/line or connector anchor.
  - Mapped obligation: decomposed target obligation owned by a phase.
  - Source capability: what user/product capability this surface provides.
  - Target disposition: preserve | replace | merge | defer | drop.
  - Target contract: equivalent target behavior or explicit out-of-scope reason.
  - Compatibility impact: API/UX/data/provider behavior that changes, if any.
  - Phase(s): `03-phases/<phase>.md` or blocker/evaluation destination.
  - Required proof: surface-specific proof gate; broad "works" proof is invalid.

Coverage rule: every high-signal mapped surface must appear exactly once in the ownership ledger, even when its obligations are implemented across multiple proof gates. No mapped surface may disappear silently. Every source-backed surface in mapping packet file `../SOURCE_FEATURE_COVERAGE_MAP.md` must have an owning phase and a required proof. This is the per-surface coverage ownership rule: each mapped obligation names a phase owner, source evidence, required proof, and blocker path. Generic proof labels such as "simulation", "reports", "chat", "RAG", "browser proof", or "tests pass" are invalid unless decomposed into concrete route, workflow, state, provider, artifact, and safety surfaces. A surface may merge into another phase, but it may not disappear silently.

Seed ledger:

- Surface id: product-analysis-and-scripts
  - Source anchor: source path `app.py` analyze handler and source path `saasshorts.py` research/analyze/script functions.
  - Source evidence: `app.py` lines 1540-1605 route `/api/saasshorts/analyze`; `saasshorts.py` lines 1-20 pipeline summary and lines 80-250 scrape/research/analyze.
  - Mapped obligation: accept URL or manual description, produce validated product analysis, web-research record when URL mode is used, and five-segment scripts with style/language/actor controls.
  - Source capability: product URL/manual description analysis, optional web research, and UGC scripts.
  - Target disposition: preserve.
  - Target contract: equivalent target behavior with deterministic mock adapters and validated analysis/script schema.
  - Compatibility impact: not route/function parity; target may use cleaner services while preserving payload semantics.
  - Phase(s): `03-phases/01-contracts-adapters.md`.
  - Required proof: schema tests for manual and URL-fixture analysis, deterministic adapter no-network test, malformed-script negative test.
- Surface id: studio-wizard-ui
  - Source anchor: source path `dashboard/src/components/SaaShortsTab.jsx`.
  - Source evidence: `SaaShortsTab.jsx` lines 1-120 wizard state, style/language/video-mode controls, actor/gallery/voice state; lines 120-260 status polling and analyze/generate actions.
  - Mapped obligation: production workbench flow from source input through analysis, script selection/editing, actor/voice/video configuration, generation, review, blocked states, and result handoff.
  - Source capability: setup, analysis, configuration, generation, result, actor/voice/video controls.
  - Target disposition: replace.
  - Target contract: equivalent target behavior in a polished production-studio workbench.
  - Compatibility impact: UX can improve, but source input through completed review remains mandatory.
  - Phase(s): `03-phases/04-browser-studio.md`.
  - Required proof: repeatable browser e2e for happy path and negative paths, desktop/mobile screenshots, accessibility/DOM checks, visual quality critique.
- Surface id: provider-adapters
  - Source anchor: source paths `saasshorts.py`, `s3_uploader.py`, Upload-Post handler.
  - Source evidence: `saasshorts.py` lines 760-1180 ElevenLabs/fal.ai/talking-head/b-roll/composition; `s3_uploader.py` lines 1-220 S3/gallery helpers; `app.py` lines 1035-1125 Upload-Post clip post.
  - Mapped obligation: provider adapters for Gemini, scraper/research, ElevenLabs TTS/dubbing, fal.ai actor/video/lipsync/b-roll, FFmpeg/Remotion composition, S3/gallery storage, and Upload-Post handoff with deterministic and live-blocked modes.
  - Source capability: research, voice, image/video generation, composition, storage, and handoff provider boundaries.
  - Target disposition: preserve.
  - Target contract: adapters return validated domain objects with deterministic mock/no-network default and structured live blockers.
  - Compatibility impact: provider-specific raw responses may move to debug/provider records.
  - Phase(s): `03-phases/01-contracts-adapters.md`, `03-phases/03-media-pipeline.md`, `03-phases/05-gallery-publish-validation.md`.
  - Required proof: adapter config tests, no-network default gate, live-provider blocker rows only after fail-closed live config exists.
- Surface id: async-jobs-and-runtime
  - Source anchor: source path `app.py` job maps and status endpoints.
  - Source evidence: `app.py` lines 25-45 queue/job maps/config; lines 83-150 cleanup/worker/semaphore; lines 240-330 process/status route.
  - Mapped obligation: queued jobs with status, logs, result/error, provider records, cancellation, retry, cleanup, and durability honesty.
  - Source capability: queued generation, status polling, ordered logs, result/error, retry reuse.
  - Target disposition: preserve.
  - Target contract: pending/running/success/failure/blocked/canceled/retry with logs, provider records, manifest, cancel protection, and durability honesty.
  - Compatibility impact: target should improve restart/readback proof or record durability blocker.
  - Phase(s): `03-phases/02-job-runtime-state.md`.
  - Required proof: lifecycle tests, retry/cancel failure tests, ordered log proof, persistence roundtrip or non-upgrading blocker.
- Surface id: media-composition
  - Source anchor: source path `saasshorts.py` subtitles, b-roll, FFmpeg composition, optional Remotion render service.
  - Source evidence: `main.py` lines 300-700 scene detection, vertical crop, transcription, Gemini clip selection, FFmpeg cutting; `saasshorts.py` lines 760-1320 voiceover, talking head, b-roll, subtitles, FFmpeg composite; `render-service/src/server.ts` lines 1-145 render job API.
  - Mapped obligation: deterministic local fixture media pipeline plus optional live provider path, 1080x1920 playable MP4, captions, b-roll markers, probe report, manifest, and failure propagation.
  - Source capability: create vertical video with voice, talking head, b-roll, captions, and manifest.
  - Target disposition: preserve.
  - Target contract: deterministic fixture pipeline creates playable nonblank 1080x1920 MP4 with captions and timing evidence.
  - Compatibility impact: live media quality parity is out of scope unless proven.
  - Phase(s): `03-phases/03-media-pipeline.md`.
  - Required proof: media probe for 1080x1920, nonblank/caption/b-roll check, subtitle escaping test, browser-compatible playback check or blocker.
- Surface id: gallery-and-video-pages
  - Source anchor: source path `app.py` gallery and video detail pages plus optional S3 metadata.
  - Source evidence: `app.py` lines 1700-1885 `/gallery` and `/video/{video_id}` HTML/SEO surfaces; `dashboard/src/components/UGCGallery.jsx` lines 1-220 app gallery; `s3_uploader.py` lines 60-220 signed/public gallery metadata.
  - Mapped obligation: private-by-default gallery/list/detail with consented metadata, local playable video refs, optional public SEO exposure blocked until consent/access proof.
  - Source capability: gallery/list/detail surfaces and SEO metadata.
  - Target disposition: preserve.
  - Target contract: private-by-default gallery and detail pages render only explicit consented metadata.
  - Compatibility impact: public SEO claim deferred until access control and consent are proven.
  - Phase(s): `03-phases/05-gallery-publish-validation.md`.
  - Required proof: gallery privacy tests for consented and unconsented metadata, browser gallery/detail paths, no secret/private metadata leak scan.
- Surface id: social-publish-handoff
  - Source anchor: source path `app.py` Upload-Post post handler.
  - Source evidence: `app.py` lines 1035-1125 clip post and lines 1640-1695 AI Shorts post; `dashboard/src/components/ResultCard.jsx` lines 1-260 platform selection, publish modal state, edit/subtitle/hook/translate controls.
  - Mapped obligation: platform-specific publish payload for TikTok, Instagram Reels, YouTube Shorts, title/description/schedule/timezone, mock/manual result, explicit consent and live-write blocker.
  - Source capability: construct TikTok/Instagram/YouTube handoff payloads with schedule/timezone.
  - Target disposition: preserve.
  - Target contract: mock/manual handoff by default, blocked without publish consent, no direct official platform publishing claim.
  - Compatibility impact: live submit is credentialed optional proof.
  - Phase(s): `03-phases/05-gallery-publish-validation.md`.
  - Required proof: blocked-without-consent test, prepared-with-consent payload test, live-provider blocker unless approved credentials and sandbox target exist.
- Surface id: safety-boundaries
  - Source anchor: source paths for browser key storage, uploads, local output mount, S3 public URLs, scraping/downloading, provider calls.
  - Source evidence: `dashboard/src/App.jsx` lines 1-75 client-side key obfuscation; `app.py` lines 280-320 upload size and ownership attestation; `translate.py` lines 1-220 ElevenLabs dubbing poll/download; `main.py` lines 420-500 YouTube download/cookie path.
  - Mapped obligation: server-side live-secret boundaries, upload type/size limits, content ownership attestation, URL egress policy, public exposure consent, secret redaction, and evidence-safe provider logs.
  - Source capability: key, upload, URL egress, output, gallery, and provider safety boundaries.
  - Target disposition: merge.
  - Target contract: server-side secrets for live mode, consent gates, allow/deny URL policy, escaped subtitle text, private gallery, and explicit blocked claims.
  - Compatibility impact: client-side API key storage must not be upgraded to hosted security.
  - Phase(s): all phases and `04-evaluation.md`.
  - Required proof: invalid input/upload tests, secret-redaction scan, denied public exposure tests, claim wording/no-fake review.
- Surface id: clip-generator-long-video
  - Source anchor: source paths `app.py`, `main.py`, `dashboard/src/App.jsx`, `dashboard/src/components/ResultCard.jsx`.
  - Source evidence: source path `README.md` describes Clip Generator; `app.py` lines 240-330 `/api/process` and `/api/status`; `main.py` lines 1-40 viral clip prompt and lines 300-760 ingest/transcribe/analyze/cut/reframe; `ResultCard.jsx` lines 1-260 review/edit/subtitle/hook/translate controls.
  - Mapped obligation: preserve long-form upload/URL clip-generation scope as product surface, including rights attestation, transcription, viral moment selection, clip result cards, edit/subtitle/hook/translate actions, and provider blockers.
  - Source capability: convert long videos into short vertical clips with metadata and post-processing.
  - Target disposition: preserve.
  - Target contract: deterministic fixture-backed clip generator path and proof hooks; live YouTube/provider paths remain blocked without approval.
  - Compatibility impact: may share runtime/media/provider infrastructure with AI Shorts but cannot be collapsed into a vague "media pipeline".
  - Phase(s): `03-phases/01-contracts-adapters.md`, `03-phases/02-job-runtime-state.md`, `03-phases/03-media-pipeline.md`, `03-phases/04-browser-studio.md`, `03-phases/05-gallery-publish-validation.md`.
  - Required proof: upload/URL fixture tests, rights-attestation negative test, clip metadata/status proof, media probe, browser review/edit controls proof.
- Surface id: youtube-studio-toolkit
  - Source anchor: source paths `thumbnail.py`, `app.py`, `dashboard/src/components/ThumbnailStudio.jsx`.
  - Source evidence: `thumbnail.py` lines 1-260 title analysis/refinement/thumbnail generation; `app.py` lines 1180-1535 thumbnail upload/analyze/titles/generate/describe/publish; `ThumbnailStudio.jsx` lines 1-260 input/title/generate/description/publish workflow.
  - Mapped obligation: preserve YouTube Studio as distinct workflow for video upload, title suggestions/refinement chat, thumbnail generation with optional face/background, description with chapters, and YouTube publish handoff.
  - Source capability: generate YouTube titles, thumbnails, descriptions, and publishing payloads.
  - Target disposition: preserve.
  - Target contract: implement deterministic local analysis/thumbnail fixtures and browser workflow; live image/publish proof remains blocked until credentials/approval.
  - Compatibility impact: may reuse provider/storage/publish adapters but must remain visible as an owned screen/workflow.
  - Phase(s): `03-phases/01-contracts-adapters.md`, `03-phases/02-job-runtime-state.md`, `03-phases/04-browser-studio.md`, `03-phases/05-gallery-publish-validation.md`.
  - Required proof: title schema/refinement tests, thumbnail artifact fixture proof, description/chapter proof, browser workflow and publish blocker tests.

## Foundation scaffold gate

Before Phase 01, the implementation agent must create the selected stack real base project structure. This is a hard gate, not an optional documentation task. The selected stack may be chosen by AI best judgment, but it must be capable of proving a browser UI, API/service contracts, local media generation, job runtime, persistence/readback, provider adapters, and evidence generation.

The Foundation scaffold gate requires:

- base project structure with real package manifests, source directories, test directories, configuration, and CI/build commands appropriate to the selected stack.
- implementation-project root `AGENTS.md` that explicitly lists `architecture.md`, `engineering-standards.md`, `proof-strategy.md`, and `ui-identity.md` as mandatory reads for coding agents before code edits.
- `architecture.md` with required sections: Architecture principles, Base project structure, Boundary map, Dependency rules, Architecture decisions, and Downstream phase extension map.
- `engineering-standards.md` with required sections: Clean code rules, Validation and schemas, Persistence standards, Provider standards, Worker/runtime standards, UI standards, and Test standards with deterministic blocker/e2e/runtime exit behavior.
- `proof-strategy.md` with phase proof commands, no-network provider gates, media probe gates, browser/e2e gates, security/secret scans, and evidence row policy.
- `ui-identity.md` because this is UI-bearing; it must define production-studio visual identity, interaction density, responsive rules, accessibility baseline, screenshot critique rubric, and forbidden generic/local-MVP patterns.

No phase implementation may start until these files exist and the base project can run an install/build or an honest setup blocker is written. If scaffold verification fails, exit deterministically before phase work and route the repair to this setup gate.

Rules:

- This is not route/function parity. Prefer cleaner target architecture when it preserves or intentionally improves the capability.
- No source-backed surface may disappear silently. If it is merged, replaced, deferred, or dropped, record why and where the equivalent obligation or blocker lives.
- Source repository filenames such as package manifests, lockfiles, or route files are source anchors, not packet file references. Label them as source paths instead of ambiguous packet links.
- Future files produced by the implementation/product are runtime artifacts or generated outputs, not packet files. Label them inline, e.g. `runtime artifact: <name>` or `generated output: <name>`.
- Unlabeled backticked `.md`, `.yaml`, `.json`, or `.jsonl` references are reserved for actual packet files that exist in this packet.

If a source-backed contract cannot be made self-contained, record the blocker before phase work instead of relying on the original source checkout.

## Implementation project setup

The Buildprint packet must not contain `AGENTS.md`. The implementation project should create root/local `AGENTS.md` and setup artifacts after this file is resolved.

- Root `AGENTS.md`: short scope governor with project shape, architecture boundaries, safety rules, local instruction map, and "do not broaden current phase" rule.
- Local `AGENTS.md`: create only at real architectural boundaries such as frontend/app, backend/API, provider adapters, workers, data/db, infra, or proof/e2e.
- Runtime setup artifact: before starting `03-phases/*`, write `.buildprint/setup.md` or files under `.buildprint/setup/` recording concrete auth, provider, persistence, worker, deployment, browser/e2e, visual QA, safety, and verification decisions.
- Creating only `AGENTS.md` is not enough to satisfy the setup gate.
- Phase entry remains governed by `03-phases/phase-flow.md` and role contracts under `06-contracts/`.

## Open assumptions

For each unresolved choice, record:

- Assumption:
- Evidence:
- Risk:
- Blocks phase work: yes/no

Unanswered ordinary engineering choices should become AI-owned assumptions, not blockers.

## Phase start gate

Do not start `03-phases/*` until this file is explicit enough to generate project root/local `AGENTS.md` without inventing architecture.

Initial phase set:

- `03-phases/01-contracts-adapters.md`
- `03-phases/02-job-runtime-state.md`
- `03-phases/03-media-pipeline.md`
- `03-phases/04-browser-studio.md`
- `03-phases/05-gallery-publish-validation.md`
