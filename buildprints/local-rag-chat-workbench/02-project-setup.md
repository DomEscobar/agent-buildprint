# Project Setup

## Setup defaults

No blocking preference is required for the first implementation. Use AI best judgment and the highest-quality appropriate defaults from `01-questions.md`.

Classified blueprint mode: `product`.

Classified phase style: `outcome_flow`.

Blueprint mode: `product`.

Blueprint mode
- Primary: product
- Phase style: outcome_flow
- Why this mode fits: Local RAG Chat Workbench is a user-facing local-first product. Each phase is an outcome flow that must prove an operator-visible capability across UI/API/runtime/provider/persistence boundaries, not a library primitive or source route inventory.

Phase style: `outcome_flow`.

Product posture: production-grade local-first workbench. Missing live Ollama, browser media permission, Docker, voice sidecar, or deployment access blocks only the matching live proof after adapters, config, deterministic tests, runtime wiring, and local proof exist.

Missing credentials block only live proof after adapter/config/test/runtime wiring exists for provider, streaming, retrieval, tool, voice, and settings surfaces.

## Product / capability shape

Build a source-independent local RAG chat workbench inspired by observed Maxkrvo/OllamaChat behavior: streaming local chat, conversation history, Ollama-compatible model/provider configuration, code and vision routing, image input, per-conversation system prompts, optional model tool calls with visible traces, document/URL knowledge-base ingestion, vector retrieval, citations and grounding confidence, automatic memory capture and review, persisted settings, watched folder/file type controls, durable data lifecycle operations, and optional self-hosted voice.

Do not copy source implementation code. Source files are evidence only.

## Architecture decisions

- Browser workbench: real UI surface with chat-first workflow, conversation navigation, knowledge-base table/search, memory review, settings, and optional voice states.
- API/service boundary: expose explicit command/query boundaries for chat, conversations, documents, retrieval, memory, config, model/provider metadata, tool calls, and voice.
- Domain boundary: keep routing, prompt assembly, memory selection, RAG retrieval, grounding, tool-loop orchestration, and data lifecycle outside UI components.
- Provider boundary: implement Ollama-compatible chat/embedding adapters, deterministic no-network test doubles, and optional OpenAI-compatible speech adapter. Provider mode must be visible in evidence.
- Worker/runtime boundary: document ingestion, URL indexing, embedding, watched folder processing, reindex, delete cleanup, and eval/export tasks need job ownership, status, retry/cancel/failure recovery, and restart behavior.
- Persistence boundary: use durable relational state plus vector/retrieval storage with migrations, restart/readback proof, retention/export/delete/reset semantics, and schema/version ownership.
- Testing boundary: unit/integration proof for domain/provider/persistence, browser/e2e for UI flows, visual quality screenshots/critique, no-fake scan, security invalid-input/denied-path proof, and clean-room implementation trace.

## Production readiness contract

- Auth/session/tenant boundary: default to trusted single-user local session ownership. Public or multi-user deployment is blocked until explicit auth/session/tenant isolation, CSRF/rate limits, permissions, and denied-path tests are implemented.
- Provider integration contracts: provider base URLs and secrets live in config/env boundaries; adapters must handle timeout, malformed responses, missing provider, capability checks, retry/error mapping, deterministic tests, and live-proof blockers.
- Durable persistence contract: conversations, messages, images metadata, documents, chunks/vectors, citations, memory items, settings, jobs, and eval reports must survive restart/readback where claimed.
- Worker/runtime contract: ingestion/reindex/watch/eval jobs require status, progress, errors, retry/cancel, idempotency, and observability. A synchronous implementation can pass only if it still records status and failure paths for long operations.
- Deployment and operations contract: document local dev, Docker-ready shape, environment variables, health/readiness, logs without secrets, migration/setup commands, backup/export, and CI gates.
- Observability: provider mode, job status, retrieval quality, grounding confidence, memory injection, tool steps, voice health, and destructive actions must be inspectable without leaking private content.
- Browser/e2e contract: repeatable proof must cover chat, routing/image/system prompt/tool traces, knowledge-base indexing/retrieval/citations, memory review, settings/data lifecycle, and voice disabled/blocked/success paths where available.
- Screenshot critique: browser or screenshot evidence must critique visual hierarchy, density, contrast, responsive behavior, accessibility, and local-MVP risk before UX proof can upgrade.

Runtime setup artifact: before phase work, write `.buildprint/setup.md` or `.buildprint/setup/*.md` in the implementation workspace with concrete auth/session, provider, persistence, worker, deployment, browser/e2e, visual QA, safety, and verification decisions. Creating only `AGENTS.md` is not enough; `AGENTS.md` is a scope governor and local instruction map after setup decisions exist.

Do not downgrade to a toy/local-MVP. Missing proof preserves scope and records `PROOF_REQUIRED`.

## Experience quality contract

- UI architecture: define a real UI boundary, component/state ownership, controller/API integration, and browser proof path for each user-facing surface.
- Product composition: start from the primary chat workbench and adjacent source-grounded surfaces, not a generic dashboard, default form stack, or marketing shell.
- Visual direction: dense local AI workbench, quiet and utilitarian, with chat as the primary work surface and side panels/tabs for context and settings.
- Visual system: define hierarchy, density, typography, spacing, color, focus, disabled, loading, error, blocked, and success states.
- Domain-specific affordances: citations, grounding, used memories, tool steps, image attachments, document status, chunks, last-cited state, watched folders, voice health, and provider mode need dedicated UI affordances, not raw JSON or plain text lists.
- Interaction states: every UI-bearing phase must cover empty, loading/running, success/readback, error, blocked-provider, partial-data, destructive confirmation, disabled reasons, keyboard/focus, and mobile behavior.
- Product-grade visual gate: generic forms, default browser controls, raw text-list substitutes, static screenshots, card-grid dashboards, dead controls, local-MVP shells, and overlapping/clipped text cannot upgrade UX claims.
- Screenshot critique: browser/screenshot proof must include critique of hierarchy, density, contrast, responsive behavior, accessibility, and domain fit before visual claims upgrade.

## Mapped contract anchors

Source repo: `https://github.com/Maxkrvo/OllamaChat`.

Observed source anchors:
- Source path `README.md` describes local Ollama chat, no cloud API key by default, streaming responses, vision/image input, smart model routing, system prompts, grounded citations, persistent memory, voice mode, model settings, dark/mobile UI, knowledge base, RAG settings, watched folders, memory page, setup, grounding review cases, and architecture modules.
- Source path `prisma/schema.prisma` defines Conversation, Message, Document, Chunk, MessageCitation, RagConfig, AppConfig, and MemoryItem persistence.
- Source path `src/app/api/chat/route.ts` shows the chat request path: conversation lookup, model resolution, message persistence, system/memory/RAG injection, optional tool loop, streaming response, citation persistence, memory usage/capture, and title update.
- Source paths `src/components/chat.tsx`, `src/components/knowledge-base.tsx`, `src/components/memory-center.tsx`, `src/components/settings-form.tsx`, and `src/components/rag-settings.tsx` show the user-facing surfaces and states.
- Source paths `src/lib/ollama.ts`, `src/lib/router.ts`, `src/lib/chat/*`, `src/lib/rag/*`, `src/lib/memory/index.ts`, `src/lib/tools/*`, and `src/lib/voice.ts` show provider, routing, RAG, memory, tool, and voice boundaries.
- Source path `package.json` and source paths `README.md` plus `VOICE.md` show setup/eval/voice runtime signals; they are source anchors, not packet files.

Use these observations to preserve behavior. Do not require implementation agents to clone or depend on the source repo.

## Mapped obligation/surface matrix

Allowed target disposition values: preserve | replace | merge | defer | drop.

This matrix is not route/function parity. No mapped surface may disappear silently; every high-signal mapped surface appears exactly once with one primary owning phase, a Target contract, and surface-specific Required proof. Generic claims such as "tests pass", "app builds", or "feature preserved" cannot satisfy this matrix unless tied to the named surface, runtime path, state readback, and proof gate. The matrix must enforce per-surface coverage ownership and must reject generic proof in favor of surface-specific proof.

| Source surface | Source evidence | Mapped obligation | Target disposition | Target contract | Owning phase | Required proof |
|---|---|---|---|---|---|---|
| Ollama-compatible chat provider | Source path README.md; source paths `src/lib/ollama.ts`, `src/app/api/chat/route.ts` | Adapter config, deterministic test mode, live mode, streaming, provider errors | preserve | Provider adapter/config tests can prove adapter seams; live Ollama proof needs real runtime or non-upgrading blocker. | 01-provider-chat-runtime | Adapter tests, runtime trace, live-provider proof/blocker |
| Conversation history and message persistence | Source paths `src/components/chat.tsx`, `prisma/schema.prisma` | Create/select/delete/readback conversations and messages | preserve | Durable conversation/message repository with restart/readback and delete confirmation. | 01-provider-chat-runtime | Persistence roundtrip, browser action, restart/readback |
| Chat rendering and states | Source path README.md; source path `src/components/chat.tsx` | Markdown/code output, streaming/thinking, empty/error/success/blocked-provider states | replace | Target UI may differ but must be wired through controller/runtime and visual_quality_gate. | 01-provider-chat-runtime | Browser/e2e or local UI action proof plus visual gate |
| Auto code routing | Source paths `src/lib/router.ts`, `src/lib/chat/resolve-model.ts` | Route code-like prompts to code model and display routing reason | preserve | Routing service emits selected model/reason and fallback diagnostics. | 02-multimodal-routing-agent-tools | Routing tests, visible metadata, fallback proof |
| Image input and vision routing | Source path README.md; source paths `src/components/chat.tsx`, `src/lib/chat/resolve-model.ts`; schema field `Message.images` | Attach/paste/drop images, validate/persist metadata, route to vision-capable model | preserve | Attachment pipeline validates size/type, persists metadata, and gates live vision proof. | 02-multimodal-routing-agent-tools | Image input browser proof, validation, vision proof/blocker |
| Per-conversation system prompt | Source paths `src/components/chat.tsx`, `src/lib/chat/context.ts`, schema field `Conversation.systemPrompt` | Save/readback prompt and inject before memory/RAG/history | preserve | Context builder proves prompt order and persistence. | 02-multimodal-routing-agent-tools | Injection-order and save/readback tests |
| Agent tool loop | Source paths `src/app/api/chat/route.ts`, `src/lib/tools/definitions.ts`, `src/lib/tools/executor.ts` | Capability-gated web_search/fetch_url tool calls, timeout/error capture, visible trace | preserve with safer defaults | Tool loop uses allowlist, timeout, SSRF review, visible trace, and non-upgrading live-web blocker when blocked. | 02-multimodal-routing-agent-tools | Allowlist, timeout, SSRF/input review, trace proof |
| File/URL/content ingestion | Source path README.md; source paths `src/components/knowledge-base.tsx`, `src/app/api/rag/documents/route.ts` | Validate and ingest files/URLs/content into document records and jobs | preserve with safer defaults | Worker/job records status, progress, errors, retry/cancel, parser failures, and URL/path denials. | 03-knowledge-base-ingestion-retrieval | Upload/URL validation, worker status, parse failure proof |
| Parser/chunker/embedding/vector storage | Source paths `src/lib/rag/index.ts`, `src/lib/rag/chunker.ts`, `src/lib/rag/vector-db.ts`, schema models Document/Chunk | Parse supported sources, chunk with metadata, embed through provider seam, store/search vectors | preserve | Parser/chunker/vector boundaries are durable, provider-gated, and searchable with readback. | 03-knowledge-base-ingestion-retrieval | Parser/vector integration, persistence, embedding proof/blocker |
| Retrieval, citations, grounding | Source path README.md; source paths `src/lib/chat/context.ts`, `src/app/api/rag/search/route.ts`; schema model MessageCitation | Inject top-k context, compute confidence, persist/display citations | preserve | Retrieval injects after memory, persists citation metadata, displays source/confidence trace. | 03-knowledge-base-ingestion-retrieval | Retrieval quality/review cases, citation UI/readback |
| Document management | Source paths `src/components/knowledge-base.tsx`, `src/app/api/rag/documents/[id]/route.ts` | Status/error/chunks/size/last-cited, search, reindex, delete | preserve | Knowledge-base UI/API proves search, reindex, delete cleanup, failure restore, and confirmation. | 03-knowledge-base-ingestion-retrieval | Browser proof, destructive confirmation, cleanup |
| Memory capture | Source path README.md; source paths `src/lib/memory/index.ts`, `src/app/api/chat/route.ts` | Conservative preference/fact/decision capture after completed turns | preserve | Capture is non-fatal, dedupes/supersedes, and tags source conversation. | 04-memory-review-injection | Capture/dedupe/supersede tests, non-fatal failure proof |
| Memory selection/injection/usage | Source paths `src/lib/memory/index.ts`, `src/app/api/chat/route.ts` | Rank global/conversation memory, enforce token budget, inject before RAG, update use counts | preserve | Context builder enforces injection order, token budget, and use-count readback. | 04-memory-review-injection | Injection-order, budget, use-count readback |
| Memory review center | Source path `src/components/memory-center.tsx` | Search, manual add, archive, promote to global, clear all with confirmation | preserve | UI/API proves memory CRUD, promote/archive/clear, privacy review, and destructive confirmation. | 04-memory-review-injection | Browser proof, destructive confirmation, privacy review |
| Model/app/RAG config | Source paths `src/components/settings-form.tsx`, `src/components/rag-settings.tsx`, schema models AppConfig/RagConfig | Save/readback model, memory budget, RAG params, watched folders, supported types | preserve | Config service validates, persists, and proves downstream routing/retrieval effects. | 05-settings-data-lifecycle-operations | Validation, persistence, downstream effect proof |
| Data lifecycle and operations | Source path `prisma/schema.prisma`; source path package.json; source path README.md eval/setup notes | Migrations/setup, export/delete/reset, health, CI/review gates, evidence-safe logs | preserve | Operations include migration/readback, export/delete/reset, health/readiness, no-secret logs, and eval gates. | 05-settings-data-lifecycle-operations | Migration/readback, export/delete/reset, health/review proof |
| Watched folders and file type controls | Source paths `src/components/rag-settings.tsx`, schema field `RagConfig.watchedFolders` | Add/remove local watched folders and extension allowlist for automatic indexing | preserve with safer defaults | Path safety and file-watcher proof are required; unavailable watcher records non-upgrading blocker. | 05-settings-data-lifecycle-operations | Path safety review, watcher proof/blocker, extension tests |
| Optional voice sidecar | Source path README.md; source path VOICE.md; source paths `src/lib/voice.ts`, `src/components/chat.tsx`, `src/components/settings-form.tsx` | Voice config, health, STT, TTS, push-to-talk, auto/manual speak, SSRF-conscious URL policy | preserve | Voice is optional but included; media/sidecar proof may block qualification only after adapters/UI states exist. | 06-voice-sidecar-experience | Voice adapter tests, media/browser proof/blocker, security review |

## Implementation project setup

The Buildprint packet must not contain `AGENTS.md`. The downstream implementation project must create these files before starting any phase:

- Root `AGENTS.md`: scope governor with product shape, current phase limit, safety rules, and mandatory read list.
- `architecture.md`: mandatory read for coding agents; must include Architecture principles, Base project structure, Boundary map, Dependency rules, Architecture decisions, and Downstream phase extension map.
- `engineering-standards.md`: mandatory read; must include Clean code rules, Validation and schemas, Persistence standards, Provider standards, Worker/runtime standards, UI standards, and Test standards with deterministic blocker/e2e/runtime exit behavior.
- `proof-strategy.md`: mandatory read; must include unit, integration, browser/e2e, visual, provider, persistence, security, worker, no-fake, evidence, and CI gates.
- `ui-identity.md`: mandatory read because this packet is UI-bearing; must define visual direction, layout model, state matrix, accessibility, responsive constraints, domain affordances, and screenshot critique rules.

Root `AGENTS.md` must explicitly list `architecture.md`, `engineering-standards.md`, `proof-strategy.md`, and `ui-identity.md` as mandatory reads for coding agents before code edits.

Recommended base structure:

```text
implementation-project/
  AGENTS.md
  architecture.md
  engineering-standards.md
  proof-strategy.md
  ui-identity.md
  app-or-frontend/
  api-or-server/
  domain/
  providers/
  workers/
  persistence/
  proof-fixtures/
  e2e/
  .buildprint/
```

Specific framework names are free implementation choices unless the human chooses one.

## Foundation scaffold gate

Before Phase 01, create the selected stack's real base project structure plus the root docs above. The scaffold must include executable setup scripts, lint/typecheck/test placeholders that fail honestly when unimplemented, environment sample with secret names only, durable persistence setup plan, provider config plan, worker/runtime plan, UI shell plan, and `.buildprint/evidence/evidence-ledger.jsonl` initialized for runtime rows.

The scaffold gate is not complete if it only creates `AGENTS.md`, static UI, empty routes, in-memory storage, or placeholder tests.

## Open assumptions

- Local trusted single-user mode is default until the human requests public or multi-user deployment.
- Ollama-compatible chat/embedding provider is the mapped provider boundary; missing Ollama runtime blocks live proof only.
- Voice is included as optional, proof-required capability; unavailable microphone, Docker, sidecar, or media permissions record blockers without removing the phase.
- Watched folders are included but require local path safety and file watcher proof before qualification.
- Tool web access is included but requires strict allowlist, SSRF/rate/error boundaries, and may be blocked in offline deployments.
- Source framework choices are not requirements.

## Phase start gate

Do not start `03-phases/*` until:

- `01-questions.md` has been reviewed or defaulted.
- The foundation scaffold gate is complete.
- Root `AGENTS.md`, `architecture.md`, `engineering-standards.md`, `proof-strategy.md`, and `ui-identity.md` exist and are referenced by `AGENTS.md`.
- `.buildprint/setup.md` or `.buildprint/setup/*` records concrete auth/session, provider, persistence, worker, deployment, browser/e2e, visual QA, safety, and verification decisions.
- `03-phases/phase-flow.md` can create handoffs/returns/reviews/proof/evidence for the active phase.
