# Project Setup

This setup contract is completed before phase implementation. It turns short human alignment and mapped source evidence into concrete project architecture, team operating rules, quality gates, and the future project `AGENTS.md` plan.

## Human preferences

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from source evidence and product goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks.
- If the human requests live provider validation, public deployment, paid rendering, real publishing, or public gallery exposure, treat that as a separate credentialed approval gate.

## Inferred project shape

- Product: Portable AI Shorts Production Studio.
- Frontend/UI surfaces: studio home/workbench, source input, analysis/scripts, configuration, generation progress, review/player, private gallery, video detail, publish handoff, limitations notice, and secondary debug/details drawer.
- Backend/API surfaces: analyze product, actor options/upload validation, voice list, generate video, job status, cancel/retry, gallery list, video detail, publish handoff, provider request records, output manifest, and validation/report surfaces.
- State/runtime surfaces: product project state, script selection and edits, actor/voice/video config, consent flags, job queue/status/logs, provider request records, output manifests, local media artifacts, gallery metadata, publish handoff payloads, validation reports, browser screenshots, and runtime evidence.
- Tests/evaluation: derive from `04-evaluation.md` and phase proof gates: contract, adapter, job, media, browser, privacy, publishing, security, no-fake, build, and evidence checks.

## Stack decisions

Record decisions with short evidence, not bureaucracy:

- Framework/runtime:
  - Decision: AI best-fit unless human constrained it; React/server API/FFmpeg-compatible tooling is source-faithful.
  - Evidence: mapped source had a React dashboard, FastAPI routes, job workers, FFmpeg composition, provider adapters, gallery pages, and optional Remotion render service.
- Package manager:
  - Decision: choose ecosystem-standard default for the selected stack.
  - Evidence: proof gates require repeatable install, tests, production build, browser automation, and media checks.
- Data/storage:
  - Decision: use durable-enough local persistence for jobs, logs, manifests, gallery metadata, and output paths, or visibly label temporary proof storage and record a blocker for production durability.
  - Evidence: source used local output directories, in-memory job maps, optional S3, and public gallery metadata.
- Auth/providers/deployment:
  - Decision: mock/no-network providers by default. Live keys, public storage, real publishing, and hosted deployment require explicit human approval and evidence.

## Source contract anchors

Promote concrete source observations into implementation contracts before starting phases:

- Route/API/job prefixes and handlers: source paths `app.py` analyze/generate/status/gallery/post handlers, source path `saasshorts.py` orchestration, source path `dashboard/src/components/SaaShortsTab.jsx` wizard states.
- Request/response payloads and validation errors: product URL or description, script count/style/language/actor gender, script segment schema, actor upload/options, voices, generate request, job status, output manifest, gallery metadata, publish handoff payload.
- Provider/runtime boundaries and env var names only: Gemini/research, ElevenLabs, fal.ai/Flux/Hailuo/Kling/VEED, Upload-Post, S3, scraper, yt-dlp/downloader, FFmpeg/composer, optional Remotion.
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: label future product outputs as runtime artifacts/generated outputs, not packet files. Required generated outputs include runtime artifact: local MP4, runtime artifact: output manifest, runtime artifact: screenshots, runtime artifact: validation report, runtime artifact: provider request records.
- UI flow/state anchors including empty/loading/error/blocked/success states: source input, script selection, configuration, running job status, completed review/player, private gallery, publish handoff, provider/debug details.

## Source capability/surface ledger

Before phase work, account for every high-signal source surface from the mapper census/evidence: user-facing routes/screens, API handlers, jobs/workers, provider adapters, auth/admin boundaries, persistence models/stores, uploads/imports/exports, generated artifacts, destructive lifecycle actions, and deployment/runtime requirements.

Use this format for each entry:

- Surface id:
  - Source anchor: source path plus line/section or route/job/provider marker.
  - Source capability: what user/product capability this surface provides.
  - Target disposition: preserve | replace | merge | defer | drop.
  - Target contract: equivalent target behavior or explicit out-of-scope reason.
  - Compatibility impact: API/UX/data/provider behavior that changes, if any.
  - Phase(s): `03-phases/<phase>.md` or blocker/evaluation destination.

Seed ledger:

- Surface id: product-analysis-and-scripts
  - Source anchor: source path `app.py` analyze handler and source path `saasshorts.py` research/analyze/script functions.
  - Source capability: product URL/manual description analysis, optional web research, and UGC scripts.
  - Target disposition: preserve.
  - Target contract: equivalent target behavior with deterministic mock adapters and validated analysis/script schema.
  - Compatibility impact: not route/function parity; target may use cleaner services while preserving payload semantics.
  - Phase(s): `03-phases/01-contracts-adapters.md`.
- Surface id: studio-wizard-ui
  - Source anchor: source path `dashboard/src/components/SaaShortsTab.jsx`.
  - Source capability: setup, analysis, configuration, generation, result, actor/voice/video controls.
  - Target disposition: replace.
  - Target contract: equivalent target behavior in a polished production-studio workbench.
  - Compatibility impact: UX can improve, but source input through completed review remains mandatory.
  - Phase(s): `03-phases/04-browser-studio.md`.
- Surface id: provider-adapters
  - Source anchor: source paths `saasshorts.py`, `s3_uploader.py`, Upload-Post handler.
  - Source capability: research, voice, image/video generation, composition, storage, and handoff provider boundaries.
  - Target disposition: preserve.
  - Target contract: adapters return validated domain objects with deterministic mock/no-network default and structured live blockers.
  - Compatibility impact: provider-specific raw responses may move to debug/provider records.
  - Phase(s): `03-phases/01-contracts-adapters.md`, `03-phases/03-media-pipeline.md`, `03-phases/05-gallery-publish-validation.md`.
- Surface id: async-jobs-and-runtime
  - Source anchor: source path `app.py` job maps and status endpoints.
  - Source capability: queued generation, status polling, ordered logs, result/error, retry reuse.
  - Target disposition: preserve.
  - Target contract: pending/running/success/failure/blocked/canceled/retry with logs, provider records, manifest, cancel protection, and durability honesty.
  - Compatibility impact: target should improve restart/readback proof or record durability blocker.
  - Phase(s): `03-phases/02-job-runtime-state.md`.
- Surface id: media-composition
  - Source anchor: source path `saasshorts.py` subtitles, b-roll, FFmpeg composition, optional Remotion render service.
  - Source capability: create vertical video with voice, talking head, b-roll, captions, and manifest.
  - Target disposition: preserve.
  - Target contract: deterministic fixture pipeline creates playable nonblank 1080x1920 MP4 with captions and timing evidence.
  - Compatibility impact: live media quality parity is out of scope unless proven.
  - Phase(s): `03-phases/03-media-pipeline.md`.
- Surface id: gallery-and-video-pages
  - Source anchor: source path `app.py` gallery and video detail pages plus optional S3 metadata.
  - Source capability: gallery/list/detail surfaces and SEO metadata.
  - Target disposition: preserve.
  - Target contract: private-by-default gallery and detail pages render only explicit consented metadata.
  - Compatibility impact: public SEO claim deferred until access control and consent are proven.
  - Phase(s): `03-phases/05-gallery-publish-validation.md`.
- Surface id: social-publish-handoff
  - Source anchor: source path `app.py` Upload-Post post handler.
  - Source capability: construct TikTok/Instagram/YouTube handoff payloads with schedule/timezone.
  - Target disposition: preserve.
  - Target contract: mock/manual handoff by default, blocked without publish consent, no direct official platform publishing claim.
  - Compatibility impact: live submit is credentialed optional proof.
  - Phase(s): `03-phases/05-gallery-publish-validation.md`.
- Surface id: safety-boundaries
  - Source anchor: source paths for browser key storage, uploads, local output mount, S3 public URLs, scraping/downloading, provider calls.
  - Source capability: key, upload, URL egress, output, gallery, and provider safety boundaries.
  - Target disposition: merge.
  - Target contract: server-side secrets for live mode, consent gates, allow/deny URL policy, escaped subtitle text, private gallery, and explicit blocked claims.
  - Compatibility impact: client-side API key storage must not be upgraded to hosted security.
  - Phase(s): all phases and `04-evaluation.md`.

Rules:

- This is not route/function parity. Prefer cleaner target architecture when it preserves or intentionally improves the capability.
- No source-backed surface may disappear silently. If it is merged, replaced, deferred, or dropped, record why and where the equivalent obligation or blocker lives.
- Source repository filenames such as package manifests, lockfiles, or route files are source anchors, not packet file references. Label them as source paths instead of ambiguous packet links.
- Future files produced by the implementation/product are runtime artifacts or generated outputs, not packet files. Label them inline, e.g. `runtime artifact: <name>` or `generated output: <name>`.
- Unlabeled backticked `.md`, `.yaml`, `.json`, or `.jsonl` references are reserved for actual packet files that exist in this packet.

If a source-backed contract cannot be made self-contained, record the blocker before phase work instead of relying on the original source checkout.

## Architecture rules

- Preserve product behavior and source-derived obligations; frameworks are replaceable when behavior and proof remain intact.
- Keep dependency direction explicit: UI -> application/service -> domain -> data/provider adapters.
- Keep routes/controllers thin; put business rules in domain/service layers.
- Put external API/provider/database access behind adapters or repositories.
- Do not claim durable behavior from in-memory-only state unless explicitly scoped as a prototype blocker.
- Generated code must be marked and regenerated through documented commands.
- Defaults must be appropriate, evidence-grounded, and no more complex than the product needs.
- Treat media, browser, persistence, provider, gallery, and publishing boundaries as operational boundaries with proof requirements, not as UI decorations.

## Team operating model

Use these review lenses during every implementation loop:

- Architecture: boundaries, dependency direction, maintainability, source-faithful behavior.
- UX/UI: polished flows, empty/loading/error/success states, accessibility, responsive behavior.
- Backend/API: validation, auth/tenant/privacy boundaries, provider contracts, error semantics.
- State/runtime: persistence, migrations, env/config, workers/jobs, runtime observability.
- QA/evaluation: tests, build, browser/runtime checks, evidence quality, no fake proof.
- Security/infra: secrets, destructive actions, external writes, deployment and cost approvals.

## Execution authority model

- Root/local `AGENTS.md` files in the implementation project are scope governors, not product brains. They preserve architecture, safety, quality gates, and local workflow; they do not broaden the current phase.
- `.buildprint/next-agent.md` is continuity for fresh sessions. It must identify current phase, objective, recommended next action, known blockers, and which phase-run artifacts already exist.
- `03-phases/phase-flow.md` is the executable phase-entry constitution. It controls how each phase begins, how roles are assembled, how bounded handoffs are created, and when evidence may be appended.
- Explicit task or handoff text is the only valid source of delegated role, allowed scope, proof command, and evidence requirements. Do not rely on workers guessing their authority.

## Delegation and handoff protocol

For each phase, the orchestrating main session must create bounded assignments before delegating or simulating specialist work. Each assignment includes phase id, proof gate, files to read, allowed edit scope, non-goals, success criteria, verification command, evidence row requirements, and risks/blockers. Specialist workers return changed files, proof results, an evidence row draft, and risks. The orchestrator reviews and integrates their output, runs the phase proof gate, appends runtime evidence to `.buildprint/evidence/evidence-ledger.jsonl`, and updates `.buildprint/progress.md` plus `.buildprint/next-agent.md` before moving on. Vague global delegation is invalid.

## AGENTS.md plan

The blueprint packet must not contain `AGENTS.md`. The implementation project should create root/local `AGENTS.md` after this setup is resolved.

- Root `AGENTS.md`: project shape, architecture rules, quality gates, safety/permissions, workflow, and local instruction map.
- Local `AGENTS.md` files: create only at real architectural boundaries such as frontend/app, backend/API, packages/ui, data/db, media/composer, providers/adapters, storage, infra, or tests/e2e.
- Local files may narrow rules for their subtree but must not weaken root safety, quality, or architecture invariants.

## Quality gates

Before claiming any phase done:

- Run the smallest meaningful typecheck/lint/test/build gate for changed code.
- For UI-facing work, verify user-visible behavior with browser/screenshot evidence when possible.
- For backend/provider/state work, verify real request/path, persistence/readback, or record an honest blocker.
- For media work, prove playable output dimensions, nonblank content, captions, and timing markers.
- Do not skip tests, hide failures, or upgrade claims without proof.

## Safety and permissions

Ask before destructive actions, external writes/publishes/deploys, secret handling, paid services, irreversible migrations, public gallery exposure, real provider calls, arbitrary URL crawling, third-party likeness processing, or public data changes.

Never commit secrets, private logs, credentials, provider tokens, raw uploaded personal images, or unsafe provider responses.

## Open questions and assumptions

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
