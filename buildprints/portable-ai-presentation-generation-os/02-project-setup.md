# Project Setup

This setup contract is completed before phase implementation. It turns short human alignment and mapped source evidence into concrete project architecture, team operating rules, quality gates, and the future project `AGENTS.md` plan.

## Human preferences

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from source evidence and product goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks.

## Inferred project shape

- Product: source-independent AI presentation generation OS inspired by Presenton.
- Frontend/UI surfaces: dashboard, login/settings/provider config, upload/decompose, outline generation, generation progress, presentation editor, template/theme/media asset pages, export/download states.
- Backend/API surfaces: authenticated `/api/v1`-style presentation, files, outlines, images/icons/fonts/themes/templates, slide edit, chat, export, webhooks, provider config, health/status, and optional MCP routes.
- Worker/runtime surfaces: async generation queue/status, document parsing/OCR, provider calls, image search/generation, export rendering, webhook delivery, desktop packaging boundary.
- State/runtime surfaces: user/session config, provider configuration, uploaded files, parsed chunks, presentations, slides, themes/templates, media assets, chat history, async task status, export artifacts, webhook subscriptions/events.
- Tests/evaluation: derive from `04-evaluation.md` and phase proof gates.

## Stack decisions

Record decisions with short evidence, not bureaucracy:

- Framework/runtime:
  - Decision: AI best-fit unless human constrained it; source evidence suggests a web frontend plus API/worker/export backend split.
  - Evidence: Presenton has Next.js UI, FastAPI API/services, Electron scripts, Docker, MCP server, export runtime, and provider adapters.
- Package manager:
  - Decision: choose source-faithful or ecosystem-standard default.
  - Evidence: source has Node/Python lockfiles; target may choose equivalent if contracts are preserved.
- Data/storage:
  - Decision: real persistence where the product requires durable state.
  - Evidence: source has SQL models and app data/files for presentations, slides, assets, config, and task status.
- Auth/providers/deployment:
  - Decision: best-fit default unless credentials, cost, or irreversible deployment choices require human confirmation.

## Source contract anchors

Promote concrete source observations into implementation contracts before starting phases:

- Route/API/job prefixes and handlers: source paths under `servers/fastapi/api/v1/auth`, `servers/fastapi/api/v1/ppt/endpoints`, `servers/fastapi/api/v1/webhook`, and `servers/fastapi/mcp_server.py` anchor authenticated generation, asset, chat, export/webhook, and MCP capabilities.
- Request/response payloads and validation errors: source path `servers/fastapi/models/generate_presentation_request.py` anchors generation request fields including content, slides markdown, instructions, tone, verbosity, web search, slide count, language, template, files, export, and webhook flags.
- Provider/runtime boundaries and env var names only: source paths under `servers/fastapi/services/*generation*`, `servers/fastapi/utils/llm_calls`, and provider config utilities anchor adapter separation; exact implementation may differ.
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: source SQL models, app data, generated presentations, assets, and export task services anchor persistence/readback requirements.
- UI flow/state anchors including empty/loading/error/blocked/success states: source Next.js dashboard/upload/outline/presentation/settings/templates/theme pages anchor browser-visible flows.

## Source capability/surface ledger

- Surface id: SRC-AUTH-CONFIG-PROVIDERS
  - Source anchor: source paths `servers/fastapi/api/v1/auth/router.py`, `servers/fastapi/utils/simple_auth.py`, provider config components/utilities.
  - Source capability: authenticate an instance, configure providers, disclose runtime/provider mode, persist user config.
  - Target disposition: preserve | replace | merge | defer | drop. This packet uses preserve.
  - Target contract: equivalent auth/config/provider behavior; route/function names may change.
  - Compatibility impact: source route name is an anchor only, not route/function parity.
  - Phase(s): `03-phases/01-instance-auth-config-provider-setup.md`.
- Surface id: SRC-INGEST-OUTLINE
  - Source anchor: source paths `servers/fastapi/api/v1/ppt/endpoints/files.py`, `outlines.py`, `servers/fastapi/services/documents_loader.py`, `liteparse_service.py`, and `utils/llm_calls/generate_presentation_outlines.py`.
  - Source capability: accept prompts/files/slide markdown, parse/decompose documents, generate outlines, stream status.
  - Target disposition: preserve.
  - Target contract: equivalent ingestion and outline behavior with safe validation; route/function names may change.
  - Compatibility impact: source route name is an anchor only, not route/function parity.
  - Phase(s): `03-phases/02-content-ingestion-outline-generation.md`.
- Surface id: SRC-DECK-SLIDES
  - Source anchor: source paths `presentation.py`, `generate_presentation_structure.py`, `generate_slide_content.py`, and presentation/slide SQL models.
  - Source capability: generate and persist deck/slide structure, slide content, layouts, title/TOC behavior, and async state.
  - Target disposition: preserve.
  - Target contract: equivalent deck model and generation behavior; route/function names may change.
  - Compatibility impact: source route name is an anchor only, not route/function parity.
  - Phase(s): `03-phases/03-deck-structure-slide-generation.md`.
- Surface id: SRC-MEDIA-TEMPLATE-THEME
  - Source anchor: source paths `images.py`, `icons.py`, `fonts.py`, `theme.py`, `templates/*`, `pptx_slides.py`, and `pdf_slides.py`.
  - Source capability: generated/search/uploaded media plus themes, fonts, icons, templates, and imported slide assets.
  - Target disposition: preserve.
  - Target contract: equivalent asset lifecycle and safe storage; route/function names may change.
  - Compatibility impact: source route name is an anchor only, not route/function parity.
  - Phase(s): `03-phases/04-media-template-theme-assets.md`.
- Surface id: SRC-EDITOR-CHAT
  - Source anchor: source Next.js presentation/store routes and `servers/fastapi/api/v1/ppt/endpoints/slide.py`, `chat.py`, `services/chat/*`, memory service.
  - Source capability: editable presentation UI, slide edits, undo/redo where claimed, chat-assisted iteration, scoped memory/context.
  - Target disposition: preserve.
  - Target contract: equivalent editor/chat workflow; route/function names may change.
  - Compatibility impact: source route name is an anchor only, not route/function parity.
  - Phase(s): `03-phases/05-editor-chat-iteration-workflow.md`.
- Surface id: SRC-EXPORT-API-WEBHOOKS-MCP-DESKTOP
  - Source anchor: source paths `export_utils.py`, `export_task_service.py`, webhook router/service, `mcp_server.py`, and `electron/*`.
  - Source capability: authenticated API usage, PPTX/PDF export, async status, webhook delivery, MCP, and desktop packaging boundary.
  - Target disposition: preserve for API/export/webhooks; defer MCP/desktop if not in selected scope.
  - Target contract: equivalent export/integration capability with explicit blockers for deferred surfaces; route/function names may change.
  - Compatibility impact: source route name is an anchor only, not route/function parity.
  - Phase(s): `03-phases/06-export-api-webhooks-mcp-desktop.md`.

Rules:

- This is not route/function parity. Prefer cleaner target architecture when it preserves or intentionally improves the capability.
- No source-backed surface may disappear silently. If it is merged, replaced, deferred, or dropped, record why and where the equivalent obligation or blocker lives.
- Source repository filenames such as package manifests, lockfiles, or route files are source anchors, not packet file references. Label them as source paths instead of ambiguous packet links.
- Future files produced by the implementation/product are runtime artifacts or generated outputs, not packet files. Label them inline, e.g. `runtime artifact: <name>` or `generated output: <name>`.
- Unlabeled backticked `.md`, `.yaml`, `.json`, or `.jsonl` references are reserved for actual packet files that exist in this packet.

## Architecture rules

- Build a source-independent AI presentation system, not a clone of Presenton internals.
- Preserve the observable product contract: authenticated self-hosted web/API, configurable LLM/image providers, document/prompt-to-deck generation, editable slide workflow, PPTX/PDF export, templates/themes/assets, async status, and webhook/API surfaces.
- Keep frontend, backend, worker/export runtime, persistence, provider adapters, and file storage boundaries explicit even if implemented in one deployable service.
- Use fake providers only in deterministic proof mode. Any live-provider claim requires live-mode evidence or a blocker row.
- Never store raw API keys in logs, exported decks, screenshots, or evidence rows.
- Do not claim durable behavior from in-memory-only state unless explicitly scoped as a prototype blocker.
- Generated code must be marked and regenerated through documented commands.

## Team operating model

Use these review lenses during every implementation loop:

- Architecture: boundaries, dependency direction, maintainability, source-faithful behavior.
- UX/UI: polished flows, empty/loading/error/success states, accessibility, responsive behavior.
- Backend/API: validation, auth/privacy boundaries, provider contracts, error semantics.
- State/runtime: persistence, migrations, env/config, workers/jobs, runtime observability.
- QA/evaluation: tests, build, browser/runtime checks, evidence quality, no fake proof.
- Security/infra: secrets, destructive actions, external writes, deployment and cost approvals.

## AGENTS.md plan

The blueprint packet must not contain `AGENTS.md`. The implementation project should create root/local `AGENTS.md` after this setup is resolved.

- Root `AGENTS.md`: project shape, architecture rules, provider/secret safety policy, quality gates, safety/permissions, workflow, proof loop, evidence ledger path, and local instruction map.
- Local `AGENTS.md` files: create only at real architectural boundaries such as frontend/app, backend/API, worker/export, provider-adapters, data/storage, infra, or tests/e2e.
- Local files may narrow rules for their subtree but must not weaken root safety, quality, or architecture invariants.

## Quality gates

Before claiming any phase done:

- Run the smallest meaningful typecheck/lint/test/build gate for changed code.
- For UI-facing work, verify user-visible behavior with browser/screenshot evidence when possible.
- For backend/provider/state work, verify real request/path, persistence/readback, or record an honest blocker.
- Do not skip tests, hide failures, or upgrade claims without proof.
- Add negative tests for auth, validation, provider failure, upload failure, export failure, or webhook failure where applicable.

## Safety and permissions

Ask before destructive actions, external writes/publishes/deploys, secret handling, paid services, irreversible migrations, public data changes, desktop signing, or provider calls that may incur cost.

Never commit secrets, private logs, credentials, provider tokens, uploaded private documents, or raw customer content.

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

- `03-phases/01-instance-auth-config-provider-setup.md`
