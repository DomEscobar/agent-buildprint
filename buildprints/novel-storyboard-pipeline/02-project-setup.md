# Project Setup

This setup contract is completed before phase implementation. It turns human alignment and mapped source-surface evidence into concrete project architecture, team operating rules, quality gates, foundation scaffold requirements, and the future implementation project `AGENTS.md` plan.

## Setup defaults

- Blueprint mode: `product`.
- Phase style: `outcome_flow`.
- Primary: product.
- Why this mode fits: this is a user-facing creative production pipeline with browser/API outcome flows, durable state, worker/runtime jobs, provider adapters, exports, and safety gates.
- Product: Novel Storyboard Pipeline.
- Qualification label: `PROOF_REQUIRED` until runtime implementation, browser proof, persistence proof, provider-boundary proof, no-fake proof, security review, and clean-room evidence exist.
- Human answers come from `01-questions.md`.
- Blank answers authorize AI best judgment using the highest-quality appropriate implementation. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks.
- Source clone was attempted in this worker and blocked by DNS. Use the source-independent obligations in this packet plus the prior Mapper OS packet evidence; do not reopen the original source during implementation unless a coordinator explicitly assigns remapping work.

## Product / capability shape

- Product category: creative production workbench for turning ordered novel content into structured events, scripts, assets, storyboard panels, media preview tasks, and exportable production artifacts.
- Primary user: an operator or developer running a project pipeline, checking generated structure, editing outputs, and exporting reviewable artifacts.
- Core surfaces: browser workbench, API/application service, worker/runtime job system, provider adapter layer, durable project persistence, generated artifact storage, media/export manifest, admin/safety controls, and runtime evidence ledger.
- Stable product outcome: a user can create a project, ingest ordered story text, derive narrative events, generate script beats/assets, assemble storyboard panels, preview media tasks, export a manifest/artifact set, and see honest blocked states for missing live provider/deployment proof.
- Non-goals: exact Toonflow UI parity, source route/function parity, Electron parity, final stitched-video export parity, live provider parity without credentials, or a static local demo.

## Architecture decisions

- Architecture style: modular product app with clear browser, API/application, domain, repository, worker/runtime, provider adapter, artifact storage, and test/e2e boundaries. A mostly single-file shell is invalid for this scope.
- Framework/runtime: implementation agent may choose the best-fit stack; source frameworks are evidence only and are not preserved as requirements.
- Data/storage: use durable persistence for users/sessions, projects, chapters, events, scripts, assets, storyboard panels, media tasks, export manifests, provider settings, job state, and audit/evidence metadata. In-memory state cannot satisfy durability claims.
- Provider/runtime boundary: AI/text/image/video/export capabilities live behind adapters with deterministic local proof mode, sandbox/live config separation, fail-closed missing-credential behavior, status/progress, retry/error mapping, cancellation where jobs are long-running, and live-proof blocker rows when credentials are unavailable.
- UI architecture: primary screen should be the production workbench, not a marketing page or generic dashboard. Use a workbench layout with project rail, pipeline/status rail, main editing/board surface, inspectors, job/proof panels, and export affordances as the selected stack allows.
- Security model: default to authenticated private project workspace with owner/session boundaries, secret names only, server-side authorization, upload/input limits, destructive confirmation/audit, and evidence redaction.

## Production readiness contract

- Auth/session/tenant boundary: project and generated artifacts belong to an authenticated owner or local authenticated workspace. API, realtime channels, workers, exports, admin actions, and provider settings must enforce the same boundary.
- Durable persistence contract: every product entity has an owner, schema/version plan, migration/readback path, retention/delete/export semantics, and restart behavior.
- Worker/runtime contract: ingestion, extraction, script generation, asset extraction, storyboard generation, media preview, and export are observable jobs or synchronous actions with status, progress when applicable, cancellation/retry/failure semantics, timeout behavior, and persisted results.
- Provider integration contracts: deterministic adapters prove local contract shape only; live adapters require credentials, sandbox/live split, idempotency for repeated job requests, retry/error mapping, fail-closed config checks, and explicit blocked-provider UI/API states.
- Deployment and operations contract: implementation must document local dev, production target assumptions, env/config, health/readiness, structured logs, metrics/traces, upload/export limits, CI gates, and release blockers.
- Browser/e2e contract: UI-bearing work needs repeatable browser proof for project setup, ingestion, script workspace, storyboard board, media preview/export, provider-blocked states, desktop/mobile layouts, accessibility, and no-overlap visual review.
- Qualification ceiling: Missing credentials block only live proof, not implementation scope. Missing live credentials, browser tooling, deployment authorization, or external services may block claim qualification but must not remove adapters, config contracts, deterministic tests, durable state, security controls, or UX states from scope.

## Experience quality contract

- Visual quality bar: product-grade creative production workbench. Generic cards, stacked default forms, raw text-list substitutes, dead buttons, default browser controls, and local-MVP screenshots block UX proof.
- Product composition: start from the primary workflow surface: project rail, pipeline/status rail, main workbench, inspector, job/proof panel, and export controls.
- Domain-specific affordances: chapters/events/scripts/assets/panels/media tasks must have domain-fit affordances such as ordered rails, editable records, board/timeline sequencing, inspectors, status chips, preview panes, retry/cancel controls, and manifest export review.
- Visual system: define hierarchy, density, typography, spacing, color, focus, disabled, loading, error, blocked, success, and partial-data states.
- State coverage: every UI-bearing phase must cover empty, loading/running, success, error, blocked-provider, partial-data, disabled, destructive, focus/keyboard, and responsive states where relevant.
- Responsive/accessibility: desktop workbench is primary, but mobile/narrow layouts must not overlap, clip controls, hide next actions, or make proof unusable.
- Screenshot critique: browser or screenshot proof must explicitly critique hierarchy, density, contrast, responsive behavior, accessibility, domain fit, and local-MVP risk before any `ux_design_gate` or `visual_quality_gate` claim can upgrade.

## Mapped contract anchors

- Route/API/job anchors from prior source evidence: login/auth, project add/edit/get, novel add/get, event generation, script agent planning/tools, asset extraction, storyboard generation, image/video media tasks, file/export helpers, vendor/provider settings, and DB admin import/export/clear/delete.
- Data anchors: user, setting, project, novel/chapter, event, script, asset, storyboard, media task, generated file, export manifest, and evidence/audit records.
- Provider/runtime anchors: text/event extraction, script planning/writing, asset extraction, storyboard prompt/panel generation, image/video adapters, local file storage, and optional live providers.
- Safety anchors: auth/channel guards, provider secret handling by name only, upload/file containment, destructive admin actions, import/export, and claim boundaries around Electron/Docker/live providers.

## Mapped obligation/surface matrix

| Source surface | Source evidence | Mapped obligation | Target disposition | Owning phase | Required proof |
|---|---|---|---|---|---|
| Login/session entry | Prior packet cites `src/routes/login/login.ts` local login | Authenticated workspace entry with denied-path behavior | Preserve behavior, replace implementation | Phase 01 | Login/session test, denied API/realtime access test, browser state proof |
| Socket/API guard | Prior packet cites socket route guards for token/isolation key | Shared auth/session protection for API and channels | Preserve behavior, improve consistency | Phase 01 | Unauthorized/channel rejection proof and security review |
| Project create/edit/read | Prior packet cites `src/routes/project/addProject.ts`, `editProject.ts`, `getProject.ts` | Create, edit, persist, and read project metadata/settings | Preserve | Phase 01 | API/UI create-edit-readback and restart/readback proof |
| User/settings/project tables | Prior packet cites `src/lib/initDB.ts` tables | Durable base schema for users, settings, projects, provider config refs | Preserve semantics, not schema names | Phase 01 | Migration/schema test and persistence roundtrip |
| Novel/chapter ingestion | Prior packet cites `src/routes/novel/addNovel.ts` and `getNovel.ts` | Import ordered chapters/text into a project | Preserve | Phase 02 | Validation, ordering, persistence, readback, empty/error UI proof |
| Event generation route | Prior packet cites `src/routes/novel/event/generateEvents.ts` | Transform novel text into structured narrative event records | Preserve with adapter boundary | Phase 02 | Deterministic adapter test, job/runtime state proof, live-provider blocker if no credentials |
| Text cleanup/extraction utilities | Prior packet cites `src/utils/cleanNovel.ts` and AI utility calls | Normalize input and separate provider extraction from domain persistence | Preserve semantics | Phase 02 | Invalid input, cleaned text, extraction schema, provider error mapping proof |
| Script planning agent | Prior packet cites `src/agents/scriptAgent/index.ts` | Generate outline/adaptation/writing stages from events | Preserve behavior, clean-room implementation | Phase 03 | Script stage artifact proof, progress/failure proof, provider adapter proof |
| Script tools | Prior packet cites `src/agents/scriptAgent/tools.ts` | Expose controlled event/text/workspace tools for script generation | Preserve as application services/tools | Phase 03 | Tool boundary tests and misuse/invalid-state negative tests |
| Script skills | Prior packet cites outline, adaptation, writing, supervision skills | Produce structured script beats/episodes, not chat-only prose | Preserve semantics | Phase 03 | Structured output schema and editable readback proof |
| Asset extraction route | Prior packet cites `src/routes/script/extractAssets.ts` | Extract/dedupe roles, scenes, props, and asset records | Preserve | Phase 03 | Deduplication, persistence, failure/retry, UI readback proof |
| Storyboard generation | Prior packet cites storyboard flow/generation surfaces | Convert script/assets into ordered storyboard panels/scenes | Preserve | Phase 04 | Panel creation/edit/reorder proof, persistence proof, browser board proof |
| Storyboard production board | Prior packet maps production storyboard board/workflow surfaces | Review and edit storyboard sequence with inspector/state feedback | Preserve, improve UX | Phase 04 | Interactive board browser proof, responsive screenshot critique |
| Image media tasks | Prior packet maps image generation task/adapters | Create image preview tasks with status, provider mode, failure, retry | Preserve | Phase 05 | Adapter config, pending/running/success/failure/retry proof, live blocker |
| Video/media tasks | Prior packet maps video/media preview surfaces | Create video/media preview tasks without claiming final stitched-video parity | Preserve selected preview lifecycle | Phase 05 | Task lifecycle proof and explicit non-goal/blocker for final stitched export |
| File/export helper | Prior packet cites local file helper generated media refs | Store generated refs and export reviewable manifest/artifact set | Preserve | Phase 05 | Manifest schema, file containment, readback, export/download proof |
| Vendor/provider settings | Prior packet cites vendor config routes and VM helper | Configure provider names/modes/secrets safely by env/config boundary | Preserve with hardening | Phase 06 | Missing-secret fail-closed tests, redaction proof, sandbox/live split blocker |
| Upload/file containment | Prior packet cites upload/file helper under local data roots | Validate uploads/files and contain generated artifacts under runtime storage | Preserve | Phase 06 | Type/size/path traversal tests and cleanup/readback proof |
| DB admin import/export/clear/delete | Prior packet cites DB admin routes | Admin lifecycle actions require permission, confirmation, audit, and reversal/export semantics | Preserve as risky hardened surface | Phase 06 | Confirmation, denied path, audit, backup/export/delete tests |
| Electron/Docker surfaces | Prior packet notes Electron/Docker surfaces outside selected binding slice | Do not require Electron parity; document deployment/desktop blockers honestly | Defer by selected target boundary | Phase 06 | Non-upgrading blocker/decision row; no claim upgrade |

Target disposition values are `preserve | replace | merge | defer | drop`. The table phrases are human-readable, but every row maps to one of those values: included rows preserve the observed behavior while replacing source implementation details, and the Electron/Docker row is defer by selected target boundary.

Target contract: preserve each user-visible capability, state/runtime ownership, security/provider boundary, and proof path without route/function parity. Source paths are evidence anchors only; this is not route/function parity.

No mapped surface may disappear silently. Every high-signal mapped surface must be owned exactly once by one primary phase, or be explicitly marked preserve, replace, merge, defer, or drop with rationale. Supporting phases may be named, but ambiguous shared ownership is invalid.

Required proof must be surface-specific. Generic proof such as "tests pass", "app builds", or "feature preserved" cannot upgrade a mapped obligation without exercising the named surface and its failure/readback path.

## Implementation project setup

The Buildprint packet must not contain `AGENTS.md`. The downstream implementation project must create root/local `AGENTS.md` and setup artifacts after resolving this file.

- Root `AGENTS.md`: scope governor with project shape, current phase boundary, safety rules, local instruction map, and mandatory reads before code edits.
- Root `AGENTS.md` must explicitly require coding agents to read `architecture.md`, `engineering-standards.md`, `test-strategy.md`, and `ui-identity.md` before editing code.
- Local `AGENTS.md` files may be added only at real architectural boundaries such as browser app, API/application service, workers, provider adapters, data/persistence, infra, and tests/e2e.
- Runtime setup artifact: before starting `03-phases/*`, write `.buildprint/setup.md` or `.buildprint/setup/*.md` recording concrete stack, auth/session, provider, persistence, worker, deployment, browser/e2e, visual QA, safety, and verification decisions. Creating only `AGENTS.md` is not enough.
- Phase entry remains governed by `03-phases/phase-flow.md` and role contracts under `06-contracts/`.

## Foundation scaffold gate

Before Phase 01, the implementation agent must create the selected stack's real base project structure and these root artifacts:

- `AGENTS.md`
- `.buildprint/setup.md`
- `architecture.md`
- `engineering-standards.md`
- `test-strategy.md`
- `ui-identity.md`

`architecture.md` must contain:

- Architecture principles
- Base project structure
- Boundary map
- Dependency rules
- Architecture decisions
- Downstream phase extension map

`engineering-standards.md` must contain:

- Clean code rules
- Validation and schemas
- Persistence standards
- Provider standards
- Worker/runtime standards
- UI standards
- Test standards, including deterministic timeout and exit behavior for blocked e2e/runtime proof

`test-strategy.md` must define unit, integration, provider-adapter, worker/runtime, persistence, security, browser/e2e, visual screenshot, no-fake, and evidence-ledger checks.

`ui-identity.md` must define the workbench visual identity, layout model, interaction states, accessibility rules, responsive constraints, and screenshot critique checklist.

Foundation proof: Phase 01 cannot start until the scaffold files exist, list mandatory reads, and pass a minimal syntax/build/test command appropriate to the selected stack or record an honest blocker.

## Open assumptions

- Assumption: The implementation may use any production-grade web stack. Evidence: Mapper OS requires source-independent output and source frameworks are not product-defining. Risk: stack choice may affect speed, not product scope. Blocks phase work: no.
- Assumption: Deterministic provider adapters are used for local proof by default. Evidence: prior packet forbids live provider parity without credentials. Risk: live behavior remains unqualified. Blocks phase work: no, but blocks live-provider qualification.
- Assumption: Electron and final stitched-video parity are not part of this selected clean-room binding slice. Evidence: prior packet claims forbid Electron parity and final stitched-video export parity. Risk: downstream users may ask for them later. Blocks phase work: no.
- Assumption: Public multi-tenant deployment needs explicit hardening and deployment approval. Evidence: auth/provider/upload/admin surfaces are sensitive. Risk: security overclaim. Blocks phase work: no for private/local proof, yes for public production qualification.

## Phase start gate

Do not start `03-phases/*` until this file is explicit enough to generate project root/local `AGENTS.md` and the Foundation scaffold gate is satisfied.

Initial phase set:

- `03-phases/01-project-workspace-auth.md`
- `03-phases/02-novel-event-ingestion.md`
- `03-phases/03-script-agent-assets.md`
- `03-phases/04-production-storyboard-flow.md`
- `03-phases/05-media-preview-export.md`
- `03-phases/06-safety-runtime-boundary.md`
