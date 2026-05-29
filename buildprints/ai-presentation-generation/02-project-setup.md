# Project Setup

This setup contract is completed before phase implementation. It turns short human alignment and mapped observations into concrete project architecture, team operating rules, quality gates, and the future project `AGENTS.md` plan.

## Blueprint classification

- blueprint_mode: product
- phase_style: outcome_flow
- Classification reason: the selected scope is an end-user and API-facing presentation generation product with UI, API, worker, persistence, provider, export, webhook, MCP, and desktop boundaries. The phases therefore use product outcome-flow slices rather than library, framework, integration-only, automation-only, data-pipeline-only, or infrastructure-only contracts.
- Blueprint mode
- Primary: product
- Phase style: outcome_flow
- Why this mode fits: implementation success is measured by product outcomes and proof-backed user/API workflows, not by exposing a library API or automating one backend task.

## Setup defaults

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from mapped observations and product goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks.

## Product shape

- Product: source-independent AI presentation generation product inspired by Presenton.
- Frontend/UI surfaces: dashboard, login/settings/provider config, upload/decompose, outline generation, generation progress, presentation editor, template/theme/media asset pages, export/download states.
- Backend/API surfaces: authenticated `/api/v1`-style presentation, files, outlines, images/icons/fonts/themes/templates, slide edit, chat, export, webhooks, provider config, health/status, and optional MCP routes.
- Worker/runtime surfaces: async generation queue/status, document parsing/OCR, provider calls, image search/generation, export rendering, webhook delivery, desktop packaging boundary.
- State/runtime surfaces: user/session config, provider configuration, uploaded files, parsed chunks, presentations, slides, themes/templates, media assets, chat history, async task status, export artifacts, webhook subscriptions/events.
- Tests/evaluation: derive from `04-evaluation.md` and phase proof gates.

## Architecture decisions

Record decisions with short evidence, not bureaucracy:

- Framework/runtime:
  - Decision: AI best-fit unless human constrained it; mapped observations suggests a web frontend plus API/worker/export backend split.
  - Evidence: Presenton has Next.js UI, FastAPI API/services, Electron scripts, Docker, MCP server, export runtime, and provider adapters.
- Package manager:
  - Decision: choose source-faithful or ecosystem-standard default.
  - Evidence: source has Node/Python lockfiles; target may choose equivalent if contracts are preserved.
- Data/storage:
  - Decision: real persistence where the product requires durable state.
  - Evidence: source has SQL models and app data/files for presentations, slides, assets, config, and task status.
- Auth/providers/deployment:
  - Decision: best-fit default unless credentials, cost, or irreversible deployment choices require human confirmation.

## Production readiness contract

Production-grade architecture is the default for the selected full-suite packet. Do not downgrade to a local MVP unless the user explicitly reduces selected scope. Missing credentials block only live proof; they do not block implementation of provider adapters, config contracts, deterministic tests, durable state paths, security boundaries, worker/runtime ownership, export/webhook/MCP seams, deployment/ops shape, or browser/e2e proof plans.

- Auth/session/tenant boundary: define instance/admin auth, session ownership, provider-key safety, uploaded document ownership, presentation access, webhook/API permissions, and hosted auth blockers before exposing claims.
- Provider integration contract: implement text/image/search/provider adapter seams, deterministic proof adapters, live config validation, fail-closed missing-credential behavior, cost/latency labels, and tests that do not upgrade fake providers to live providers.
- Durable persistence contract: define user/session config, provider config, uploaded files, parsed chunks, presentations, slides, themes/templates, media assets, chat history, async tasks, export artifacts, webhook subscriptions/events, import/export, delete/reset, retention, migration, and restart/readback ownership before claiming production durability.
- Worker/runtime contract: define generation queue ownership, outline/deck/media/export jobs, status/progress, cancellation, retry/failure recovery, webhook delivery retry, and restart behavior.
- Deployment and operations contract: document local dev, production target, env/config, health/readiness, structured logs, metrics/traces, file/upload limits, export limits, CI/browser/export gates, and release blockers.
- Browser/e2e contract: UI-bearing work must have repeatable browser/e2e proof plans for auth/config, upload/decompose, outline generation, deck generation, editor/chat, media/template/theme assets, export/download, blocked provider states, desktop/mobile screenshots, accessibility, and no-overlap responsive behavior.

Runtime setup artifact: before phase work, write `.buildprint/setup.md` or `.buildprint/setup/*.md` in the implementation workspace with the concrete choices above. Creating only `AGENTS.md` is not enough; `AGENTS.md` is a scope governor and local instruction map after setup decisions exist.

## Workbench UX quality contract

- UI architecture: define a real UI boundary, component/state ownership, controller/API integration, and browser proof path for any user-facing phase.
- Product composition: start from the primary workflow surface, not a generic dashboard, default form, or marketing shell.
- Domain-specific affordances: represent domain objects with appropriate workbench affordances instead of raw text-list substitutes.
- Visual system: define hierarchy, density, typography, spacing, color, focus, disabled, loading, error, blocked, and success states.
- Screenshot critique: browser or screenshot evidence must critique visual hierarchy, responsive behavior, accessibility, and local-MVP risk before UX proof can upgrade.

## Mapped contract anchors

Promote concrete source observations into implementation contracts before starting phases:

- Route/API/job prefixes and handlers: source paths under `servers/fastapi/api/v1/auth`, `servers/fastapi/api/v1/ppt/endpoints`, `servers/fastapi/api/v1/webhook`, and `servers/fastapi/mcp_server.py` anchor authenticated generation, asset, chat, export/webhook, and MCP capabilities.
- Request/response payloads and validation errors: source path `servers/fastapi/models/generate_presentation_request.py` anchors generation request fields including content, slides markdown, instructions, tone, verbosity, web search, slide count, language, template, files, export, and webhook flags.
- Provider/runtime boundaries and env var names only: source paths under `servers/fastapi/services/*generation*`, `servers/fastapi/utils/llm_calls`, and provider config utilities anchor adapter separation; exact implementation may differ.
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: source SQL models, app data, generated presentations, assets, and export task services anchor persistence/readback requirements.
- UI flow/state anchors including empty/loading/error/blocked/success states: source Next.js dashboard/upload/outline/presentation/settings/templates/theme pages anchor browser-visible flows.

## Mapped obligation/surface matrix

- Surface id: SRC-AUTH-CONFIG-PROVIDERS
  - Source anchor: source paths `servers/fastapi/api/v1/auth/router.py`, `servers/fastapi/utils/simple_auth.py`, provider config components/utilities.
  - Mapped obligation: authenticate an instance, configure providers, disclose runtime/provider mode, persist user config.
  - Target disposition: preserve | replace | merge | defer | drop. This packet uses preserve.
  - Target contract: equivalent auth/config/provider behavior; route/function names may change.
  - Compatibility impact: source route name is an anchor only, not route/function parity.
  - Phase(s): `03-phases/01-instance-auth-config-provider-setup.md`.
- Surface id: SRC-INGEST-OUTLINE
  - Source anchor: source paths `servers/fastapi/api/v1/ppt/endpoints/files.py`, `outlines.py`, `servers/fastapi/services/documents_loader.py`, `liteparse_service.py`, and `utils/llm_calls/generate_presentation_outlines.py`.
  - Mapped obligation: accept prompts/files/slide markdown, parse/decompose documents, generate outlines, stream status.
  - Target disposition: preserve.
  - Target contract: equivalent ingestion and outline behavior with safe validation; route/function names may change.
  - Compatibility impact: source route name is an anchor only, not route/function parity.
  - Phase(s): `03-phases/02-content-ingestion-outline-generation.md`.
- Surface id: SRC-DECK-SLIDES
  - Source anchor: source paths `presentation.py`, `generate_presentation_structure.py`, `generate_slide_content.py`, and presentation/slide SQL models.
  - Mapped obligation: generate and persist deck/slide structure, slide content, layouts, title/TOC behavior, and async state.
  - Target disposition: preserve.
  - Target contract: equivalent deck model and generation behavior; route/function names may change.
  - Compatibility impact: source route name is an anchor only, not route/function parity.
  - Phase(s): `03-phases/03-deck-structure-slide-generation.md`.
- Surface id: SRC-MEDIA-TEMPLATE-THEME
  - Source anchor: source paths `images.py`, `icons.py`, `fonts.py`, `theme.py`, `templates/*`, `pptx_slides.py`, and `pdf_slides.py`.
  - Mapped obligation: generated/search/uploaded media plus themes, fonts, icons, templates, and imported slide assets.
  - Target disposition: preserve.
  - Target contract: equivalent asset lifecycle and safe storage; route/function names may change.
  - Compatibility impact: source route name is an anchor only, not route/function parity.
  - Phase(s): `03-phases/04-media-template-theme-assets.md`.
- Surface id: SRC-EDITOR-CHAT
  - Source anchor: source Next.js presentation/store routes and `servers/fastapi/api/v1/ppt/endpoints/slide.py`, `chat.py`, `services/chat/*`, memory service.
  - Mapped obligation: editable presentation UI, slide edits, undo/redo where claimed, chat-assisted iteration, scoped memory/context.
  - Target disposition: preserve.
  - Target contract: equivalent editor/chat workflow; route/function names may change.
  - Compatibility impact: source route name is an anchor only, not route/function parity.
  - Phase(s): `03-phases/05-editor-chat-iteration-workflow.md`.
- Surface id: SRC-EXPORT-API-WEBHOOKS-MCP-DESKTOP
  - Source anchor: source paths `export_utils.py`, `export_task_service.py`, webhook router/service, `mcp_server.py`, and `electron/*`.
  - Mapped obligation: authenticated API usage, PPTX/PDF export, async status, webhook delivery, MCP, and desktop packaging boundary.
  - Target disposition: preserve for API/export/webhooks/MCP/desktop boundary. If desktop signing/notarization or live MCP deployment cannot be proven locally, mark `PROOF_REQUIRED` without removing the capability.
  - Target contract: equivalent export/integration capability with explicit blockers for deferred surfaces; route/function names may change.
  - Compatibility impact: source route name is an anchor only, not route/function parity.
  - Phase(s): `03-phases/06-export-api-webhooks-mcp-desktop.md`.

Rules:

- This is not route/function parity. Prefer cleaner target architecture when it preserves or intentionally improves the capability.
- Source evidence is limited to source path observations and prior packet observations. It must become mapped obligations, not copied implementation.
- Every high-signal mapped surface must appear exactly once with a primary owning phase, Target disposition, Target contract, and Required proof. No mapped surface may disappear silently. If it is merged, replaced, deferred, or dropped, record why and where the equivalent obligation or blocker lives.
- Required proof must be surface-specific. Generic proof such as "tests pass", "app builds", or "feature preserved" is insufficient unless it is tied to the owned surface, expected interface/state transition, and evidence row.
- Source repository filenames such as package manifests, lockfiles, or route files are source anchors, not packet file references. Label them as source paths instead of ambiguous packet links.
- Future files produced by the implementation/product are runtime artifacts or generated outputs, not packet files. Label them inline, e.g. `runtime artifact: <name>` or `generated output: <name>`.
- Unlabeled backticked `.md`, `.yaml`, `.json`, or `.jsonl` references are reserved for actual packet files that exist in this packet.

## Implementation project setup

The Buildprint packet must not contain `AGENTS.md`. The implementation project should create root/local `AGENTS.md` and setup artifacts after this file is resolved.

- Root `AGENTS.md`: short scope governor with project shape, architecture boundaries, safety rules, local instruction map, and "do not broaden current phase" rule.
- Local `AGENTS.md`: create only at real architectural boundaries such as frontend/app, backend/API, provider adapters, workers, data/db, infra, or tests/e2e.
- Runtime setup artifact: before starting `03-phases/*`, write `.buildprint/setup.md` or files under `.buildprint/setup/` recording concrete auth, provider, persistence, worker, deployment, browser/e2e, visual QA, safety, and verification decisions.
- Creating only `AGENTS.md` is not enough to satisfy the setup gate.
- Phase entry remains governed by `03-phases/phase-flow.md` and role contracts under `06-contracts/`.

## Foundation scaffold gate

Before Phase 01 starts, the implementation agent must create a real base project structure for the selected stack. The scaffold must be source-independent and must include at minimum:

- `implementation-project/AGENTS.md`
- `implementation-project/architecture.md`
- `implementation-project/engineering-standards.md`
- `implementation-project/test-strategy.md`
- `implementation-project/ui-identity.md`
- frontend app boundary for auth/settings, generation, editor, assets, and export surfaces
- backend/API boundary for auth, provider config, ingestion, outlines, deck generation, assets, chat, export, webhooks, MCP, health, and status
- worker/runtime boundary for document parsing, provider calls, deck/media/export jobs, webhook retry, cancellation, and recovery
- persistence boundary for sessions, provider config, uploaded files, parsed chunks, presentations, slides, themes/templates, assets, chat, async tasks, export artifacts, and webhook events
- test/e2e boundary for unit, integration, worker recovery, browser/e2e, screenshot critique, API contract, security, and no-fake scans

Root `AGENTS.md` in the implementation project must explicitly require coding agents to read `architecture.md`, `engineering-standards.md`, `test-strategy.md`, and `ui-identity.md` as mandatory reads before code edits. It must also restate phase discipline, no source implementation copying, no silent scope downgrade, and no phase completion without proof/evidence.

`architecture.md` must contain these sections: Architecture principles, Base project structure, Boundary map, Dependency rules, Architecture decisions, and Downstream phase extension map.

`engineering-standards.md` must contain these sections: Clean code rules, Validation and schemas, Persistence standards, Provider standards, Worker/runtime standards, UI standards, and Test standards with deterministic blocker/e2e/runtime exit behavior.

`test-strategy.md` must define local deterministic tests, live-provider blockers, API/browser/e2e gates, screenshot critique, export proof, webhook retry proof, worker cancellation/recovery proof, security/no-fake scans, and evidence row responsibilities.

`ui-identity.md` must define a product-grade presentation workbench identity: navigation hierarchy, editor canvas/filmstrip behavior, asset/theme affordances, generation progress states, responsive rules, accessibility/focus states, and screenshot critique criteria. Generic forms, default controls, raw text lists, or local-MVP screenshots cannot upgrade UX claims.

No phase may start until this scaffold exists and is referenced from `.buildprint/setup.md` or `.buildprint/setup/foundation-scaffold.md`.

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

- `03-phases/01-instance-auth-config-provider-setup.md`
