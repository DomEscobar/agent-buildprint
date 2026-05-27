# Project Setup

## Setup defaults

No blocking preference is required for the first implementation. Use AI best judgment and highest-quality appropriate defaults from `01-questions.md`.

## Product shape

Build a source-independent local-first RAG chat workbench inspired by Maxkrvo/OllamaChat mapped observations: streaming chat, Ollama-compatible provider configuration, persisted conversations, document ingestion, SQLite/libSQL vector search, citations, memory, settings, and browser workbench states.

## Architecture decisions

- Frontend/runtime: Next.js or equivalent full-stack TypeScript web runtime.
- Provider: Ollama-compatible adapter with deterministic no-network test double and live runtime mode.
- Persistence: SQLite/libSQL-compatible durable store with setup command, migrations or schema bootstrap, and readback proof.
- Tests: unit/integration API proof plus repeatable browser/e2e proof.
- Missing credentials or missing local Ollama block only live proof after adapter/config/test/runtime wiring exists.

## Production readiness contract

- Auth/session/tenant boundary: define local session ownership for conversations, uploaded documents, memory, settings, and destructive actions even if auth is single-user by default.
- Provider integration contract: implement provider adapters, configuration, timeout/error handling, streaming contract, deterministic tests, and live-proof blocker rows when Ollama is unavailable.
- Durable persistence contract: implement database setup, readback, restart behavior, export/delete/reindex semantics, file/chunk storage, and sensitive data handling.
- Worker/runtime contract: define ingestion/indexing ownership, retry/cancel/failure recovery, progress persistence, restart behavior, and health/observability hooks.
- Deployment and operations contract: document local dev, Docker-ready production shape, environment variables, logs, health checks, and CI/test gates.
- Browser/e2e contract: provide repeatable browser tests or honest non-upgrading blockers for unavailable browser tooling; screenshots alone do not qualify UI behavior.

Do not downgrade to a local MVP. Missing credentials, paid services, or local Ollama availability block only live proof, not provider seams, persistence, UI states, tests, or runtime wiring.

Fast replay ordering: for phases 01 and 02, create the first valid runtime evidence ledger as soon as provider/persistence/retrieval tests and local UI-state proof pass. Do not let optional HTTP-server structure, browser automation retries, live Ollama checks, Docker readiness, documentation, or visual polish delay `.buildprint/evidence/evidence-ledger.jsonl`.

The early ledger is only `checkpoint_recorded`. It is not `phase_core_passed`. UI-bearing phases must still prove a local user action path through a UI/controller boundary into provider/runtime/data behavior and back into visible state/readback before the phase core is considered passed. Static state cards, generic dashboards, or dead buttons are not enough.

## Workbench UX quality contract

- UI architecture: define a real UI boundary, component/state ownership, controller/API integration, and browser proof path for any user-facing phase.
- Product composition: start from the primary workflow surface, not a generic dashboard, default form, or marketing shell.
- Domain-specific affordances: represent domain objects with appropriate workbench affordances instead of raw text-list substitutes.
- Visual system: define hierarchy, density, typography, spacing, color, focus, disabled, loading, error, blocked, and success states.
- Screenshot critique: browser or screenshot evidence must critique visual hierarchy, responsive behavior, accessibility, and local-MVP risk before UX proof can upgrade.

## Mapped contract anchors

Source repo: https://github.com/Maxkrvo/OllamaChat.

Observed source anchors:

- README describes local Ollama chat, no cloud API key requirement, streaming responses, document upload, RAG citations, persistent memory, settings, and SQLite setup.
- README architecture lists chat, memory, RAG, tools, voice, router, Ollama wrapper, config, and database modules.
- README evals describe grounding checks as a repeatable regression gate.

Use these observations to preserve product behavior. Do not require the implementation agent to clone or depend on the source repo.

## Product obligation/surface matrix

Target disposition values: preserve | replace | merge | defer | drop.

| Source surface | Target disposition | Equivalent target behavior | Compatibility impact |
| --- | --- | --- | --- |
| Streaming chat/provider route | preserve | User sends a message and receives streamed assistant output through an Ollama-compatible adapter | Route names may differ; this is not route/function parity |
| Document upload and RAG indexing | preserve | User uploads supported files or URLs and receives searchable chunks with citations | Storage internals may differ if proof passes |
| Memory/settings workbench | preserve | User can review/configure memory and model/RAG settings | UI composition may differ if states and proof pass |
| Voice sidecar | defer | Optional self-hosted speech provider remains out of compact packet scope | Must not be claimed unless implemented and proven |

Required fields: Product obligation, Target disposition, preserve | replace | merge | defer | drop, Target contract, owning phase.

## Implementation project setup

The Buildprint packet must not contain `AGENTS.md`. The implementation project should create root/local `AGENTS.md` and setup artifacts after this file is resolved.

- Root `AGENTS.md`: short scope governor with project shape, architecture boundaries, safety rules, local instruction map, and "do not broaden current phase" rule.
- Local `AGENTS.md`: create only at real architectural boundaries such as frontend/app, backend/API, provider adapters, workers, data/db, infra, or tests/e2e.
- Runtime setup artifact: before starting `03-phases/*`, write `.buildprint/setup.md` or files under `.buildprint/setup/` recording concrete auth, provider, persistence, worker, deployment, browser/e2e, visual QA, safety, and verification decisions.
- Creating only `AGENTS.md` is not enough to satisfy the setup gate.
- Phase entry remains governed by `03-phases/phase-flow.md` and role contracts under `06-contracts/`.

## Open assumptions

Assume local deterministic provider mode until Ollama runtime is supplied. Assume SQLite/libSQL persistence. Assume local dev plus Docker-ready production shape. Assume single-user local mode unless user asks for multi-user auth.

## Phase start gate

Do not start `03-phases/*` until this setup has been converted into implementation-project structure, local `AGENTS.md`, environment plan, persistence plan, provider plan, UI proof plan, and test commands.
