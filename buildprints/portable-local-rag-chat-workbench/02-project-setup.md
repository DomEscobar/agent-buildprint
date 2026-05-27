# Project Setup

## Human preferences

No blocking preference is required for the first implementation. Use AI best judgment and highest-quality appropriate defaults from `01-questions.md`.

## Inferred project shape

Build a source-independent local-first RAG chat workbench inspired by Maxkrvo/OllamaChat source evidence: streaming chat, Ollama-compatible provider configuration, persisted conversations, document ingestion, SQLite/libSQL vector search, citations, memory, settings, and browser workbench states.

## Stack decisions

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

## Source contract anchors

Source repo: https://github.com/Maxkrvo/OllamaChat.

Observed source anchors:

- README describes local Ollama chat, no cloud API key requirement, streaming responses, document upload, RAG citations, persistent memory, settings, and SQLite setup.
- README architecture lists chat, memory, RAG, tools, voice, router, Ollama wrapper, config, and database modules.
- README evals describe grounding checks as a repeatable regression gate.

Use these observations to preserve product behavior. Do not require the implementation agent to clone or depend on the source repo.

## Source capability/surface ledger

Target disposition values: preserve | replace | merge | defer | drop.

| Source surface | Target disposition | Equivalent target behavior | Compatibility impact |
| --- | --- | --- | --- |
| Streaming chat/provider route | preserve | User sends a message and receives streamed assistant output through an Ollama-compatible adapter | Route names may differ; this is not route/function parity |
| Document upload and RAG indexing | preserve | User uploads supported files or URLs and receives searchable chunks with citations | Storage internals may differ if proof passes |
| Memory/settings workbench | preserve | User can review/configure memory and model/RAG settings | UI composition may differ if states and proof pass |
| Voice sidecar | defer | Optional self-hosted speech provider remains out of compact packet scope | Must not be claimed unless implemented and proven |

## Architecture rules

Implement vertical slices, not route-shaped shells. Provider adapters, persistence, ingestion/indexing, UI state, and evidence commands must connect through real code paths. Deterministic test doubles may support local proof but cannot satisfy live provider claims.

## Team operating model

Required roles for all phases: product-architect, ux-ui-craft, integration-runtime, data-persistence, security-boundary, and test-and-verification. The main session may perform these roles directly, but it must record compact gates in `.buildprint/phase-runs/<phase-id>/team-gates.md`.

## Execution authority model

The Buildprint packet controls scope. The implementation project may have a root/local `AGENTS.md` as a scope governor only. `.buildprint/next-agent.md` controls continuity and handoff state between sessions.

## Delegation and handoff protocol

Use bounded assignment when real delegation happens. Each assignment must name the phase, files or surfaces allowed, proof command or verification command, expected return, evidence row requirements, and integration review owner. If no real delegation happens, write compact team-gates instead of fake handoff paperwork.

## AGENTS.md plan

Create implementation-project `AGENTS.md` only after this setup is understood. It must state: follow this Buildprint, execute one phase at a time, do not edit packet snapshots, write runtime proof to `.buildprint/evidence/evidence-ledger.jsonl`, preserve provider/persistence/browser proof honesty, and route failures through `03-phases/phase-flow.md`.

## Runtime setup artifact

Before starting any `03-phases/*` work, write `.buildprint/setup.md` or files under `.buildprint/setup/` in the implementation workspace. This is runtime state, not packet content.

The setup artifact must record concrete decisions for auth/session/tenant ownership, provider adapters/env/config/test doubles, durable persistence and readback/restart behavior, worker/runtime limitations or queue ownership, deployment/ops/local dev shape, browser/e2e proof plan, safety/permission rules, and verification commands. Creating only `AGENTS.md` is not enough to satisfy the setup gate.

## Quality gates

Minimum gates: dependency install/build or typecheck, unit/integration tests for provider and persistence, negative tests for provider/indexing failures, repeatable browser/e2e for UI flows, no-fake scan, and evidence ledger validation.

## Safety and permissions

Ask before external writes, paid providers, deployments, secrets, irreversible migrations, or destructive actions beyond local test data. Never expose secrets in logs, screenshots, UI, reports, or evidence rows.

## Open questions and assumptions

Assume local deterministic provider mode until Ollama runtime is supplied. Assume SQLite/libSQL persistence. Assume local dev plus Docker-ready production shape. Assume single-user local mode unless user asks for multi-user auth.

## Phase start gate

Do not start `03-phases/*` until this setup has been converted into implementation-project structure, local `AGENTS.md`, environment plan, persistence plan, provider plan, UI proof plan, and test commands.
