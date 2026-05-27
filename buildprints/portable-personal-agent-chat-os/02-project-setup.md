# Project Setup

This setup contract is completed before phase implementation. It turns human alignment and mapped mapped observations into concrete project architecture, team operating rules, quality gates, safety rules, and the future project `AGENTS.md` plan.

## Setup defaults

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from mapped observations and product goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks.
- Default posture: local deterministic proof, no network, no live provider keys, no hosted deployment, no production auth/billing claim.

## Product shape

- Product: self-hosted personal agent chatbot OS with chat as the control surface for a local agent runtime.
- Frontend/UI surfaces: chat stream, provider/model settings, tool workbench with risk labels, skills list/detail, MCP server/tool status, memory editor/viewer, team/subagents view, token/usage view, and config diagnostics.
- Backend/API surfaces: bootstrap state, chat stream via SSE/WebSocket or equivalent, provider registry/config diagnostics, tool request policy path, skill discovery/selection, MCP adapter mapping, memory/checkpoint read/write, team task events, token telemetry, trace/event inspection, cancellation/retry if supported.
- State/runtime surfaces: sessions, messages, trace events, checkpoints, provider configs, enabled tools/skills/MCP servers, raw history, daily/episodic summaries, curated long-term memory, attachment/source summaries, team task state, normalized usage totals, compaction markers.
- Tests/evaluation: derive from `04-evaluation.md` and phase proof gates; deterministic local tests are required before any live-provider claim.

## Architecture decisions

- Framework/runtime:
  - Decision: AI best-fit unless human constrained it. Prefer a small, testable backend and a UI stack with native streaming support.
  - Evidence: mapped runtime has streaming chat, provider adapters, tool dispatch, memory, team events, telemetry, and WebUI workbench surfaces.
- Package manager:
  - Decision: choose ecosystem-standard defaults for the selected stack and keep deterministic lockfiles.
  - Evidence: proof must run offline or with already-installed dependencies when possible.
- Data/storage:
  - Decision: use real local persistence for sessions, memory, checkpoints, traces, and telemetry. SQLite or a similarly simple durable store is preferred.
  - Evidence: product requires durable history, checkpoint recovery, memory compaction, and token aggregates.
- Auth/providers/deployment:
  - Decision: single-user local app by default. Provider credentials, paid services, hosted deployment, and production auth require explicit human confirmation and separate proof.

## Production readiness contract

Production-grade architecture is the default for the selected full-suite packet. Do not downgrade to a local MVP unless the user explicitly reduces selected scope. Missing credentials block only live proof; they do not block implementation of provider adapters, config contracts, deterministic tests, durable state paths, security boundaries, worker/runtime ownership, tool/MCP safety seams, deployment/ops shape, or browser/e2e proof plans.

- Auth/session/tenant boundary: define local owner/session boundaries, single-user versus multi-user posture, memory privacy, attachment/source ownership, token telemetry visibility, and hosted auth/tenant blockers before exposing claims.
- Provider integration contract: implement deterministic provider, OpenAI-compatible/Anthropic/Bedrock/local adapter seams, config validation, fail-closed missing-credential behavior, streaming event contracts, latency/token labels, and tests that do not upgrade deterministic providers to live providers.
- Durable persistence contract: define sessions, messages, checkpoints, memory, traces, enabled tools/skills/MCP servers, team tasks, telemetry, import/export, delete/reset, retention, migration, and restart/readback ownership before claiming production durability.
- Worker/runtime contract: define streaming turn lifecycle, cancellation, retry/failure recovery, compaction, team task events, MCP/tool timeouts, progress state, and restart behavior.
- Deployment and operations contract: document local dev, production target, env/config, health/readiness, structured logs, metrics/traces, bounded roots, tool limits, CI/browser/API gates, and release blockers.
- Browser/e2e contract: UI-bearing work must have repeatable browser/e2e proof plans for chat streaming, provider diagnostics, tools, skills, MCP, memory, team, token telemetry, config diagnostics, blocked states, responsive behavior, accessibility, and no-overlap rendering.

Runtime setup artifact: before phase work, write `.buildprint/setup.md` or `.buildprint/setup/*.md` in the implementation workspace with the concrete choices above. Creating only `AGENTS.md` is not enough; `AGENTS.md` is a scope governor and local instruction map after setup decisions exist.

## Workbench UX quality contract

- UI architecture: define a real UI boundary, component/state ownership, controller/API integration, and browser proof path for any user-facing phase.
- Product composition: start from the primary workflow surface, not a generic dashboard, default form, or marketing shell.
- Domain-specific affordances: represent domain objects with appropriate workbench affordances instead of raw text-list substitutes.
- Visual system: define hierarchy, density, typography, spacing, color, focus, disabled, loading, error, blocked, and success states.
- Screenshot critique: browser or screenshot evidence must critique visual hierarchy, responsive behavior, accessibility, and local-MVP risk before UX proof can upgrade.

## Mapped contract anchors

- Route/API/job prefixes and handlers: source path anchors include agent/webui bootstrap/config/memory/tokens/model routes and streaming WebSocket/HTTP chat boundary; target may use cleaner routes as long as equivalent bootstrap, stream, diagnostics, memory, token, and trace capabilities exist.
- Request/response payloads and validation errors: chat input accepts user message, session id, provider/model selection, enabled tools/skills, attachments, and optional team/task directives; errors must be evented or structured, actionable, and visible to UI/API clients.
- Provider/runtime boundaries and env var names only: adapters for deterministic test provider, OpenAI-compatible providers, Anthropic, Bedrock, and local/Ollama-like endpoints; secrets are env names or secret handles only.
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: runtime artifacts include local DB/files for sessions, history, checkpoints, memory, traces, telemetry, and phase evidence; product-generated outputs must be labeled runtime artifacts or generated outputs, not packet files.
- UI flow/state anchors including empty/loading/error/blocked/success states: all workbench views need empty state, loading/streaming state, denied/blocked state, error state, and success/ready state.

## Product obligation/surface matrix

- Surface id: streaming chat runtime
  - Source anchor: source path agent/runner.py and agent/webui.py.
  - Source capability: evented model turn with deltas, tool calls, checkpoints, usage, completion, and failure.
  - Target disposition: preserve.
  - Target contract: equivalent target behavior through `AgentSession`, `StreamingAgentLoop`, persisted trace events, and UI/API stream.
  - Compatibility impact: route/function parity is not required; event semantics and user-visible stream behavior are required.
  - Phase(s): `03-phases/02-provider-streaming-runtime.md`, `03-phases/06-webui-api-workbench.md`.

- Surface id: provider routing
  - Source anchor: source paths agent/providers/base.py, registry.py, openai_compat.py, anthropic_provider.py, and bedrock_provider.py.
  - Source capability: registry-driven provider selection, capabilities, streaming adapters, and token accounting.
  - Target disposition: preserve.
  - Target contract: deterministic test provider plus adapter interfaces for OpenAI-compatible, Anthropic, Bedrock, and local providers.
  - Compatibility impact: live provider parity is deferred until env-gated smoke proof; deterministic provider proves the runtime contract.
  - Phase(s): `03-phases/02-provider-streaming-runtime.md`.

- Surface id: tool registry and safety policy
  - Source anchor: source paths agent/tools/schema.py, registry.py, dispatch.py, filesystem, shell, web/search, task-list, and skills tools.
  - Source capability: schema-described tools, dispatcher, filesystem/shell/web risks, and audit events.
  - Target disposition: preserve.
  - Target contract: all tools become `ToolSpec` records with schema validation, risk labels, allow/deny policy, bounded roots/timeouts, and event audit.
  - Compatibility impact: actual shell/network/browser execution is denied by default and cannot be claimed without separate proof.
  - Phase(s): `03-phases/03-tools-skills-mcp-policy.md`.

- Surface id: skill registry
  - Source anchor: source paths agent/skills.py, source path skills/*/SKILL.md, and agent/tools/skills.py.
  - Source capability: skill discovery, metadata, trigger matching, instructions, scripts/resources, and narrow injection.
  - Target disposition: preserve.
  - Target contract: `SkillRegistry` parses discoverable skill records, selects explicitly or by trigger/classifier, injects only selected instructions, and routes scripts through tool policy.
  - Compatibility impact: source skill text is not copied; the target implements the portable registry contract.
  - Phase(s): `03-phases/03-tools-skills-mcp-policy.md`.

- Surface id: MCP adapter
  - Source anchor: source paths agent/mcp/client.py, config.py, connection.py, and adapter.py.
  - Source capability: MCP server config, connection management, imported tools, timeouts, and adapter boundary.
  - Target disposition: preserve.
  - Target contract: enabled MCP tools map into namespaced `ToolSpec` records and pass through the same risk policy; deterministic local test server proves mapping.
  - Compatibility impact: real MCP interoperability is deferred until configured server tests pass.
  - Phase(s): `03-phases/03-tools-skills-mcp-policy.md`.

- Surface id: memory and context
  - Source anchor: source paths agent/memory.py, agent/compactor.py, checkpoint and attachment store signals.
  - Source capability: raw history, daily episodes, long-term memory, checkpoints, attachments, compaction threshold, and context assembly.
  - Target disposition: preserve.
  - Target contract: `MemoryStore` and `ContextBuilder` preserve raw history, episodes, curated memory, checkpoints, selected skills, team context, recent messages, attachments, and tool results without silent instruction loss.
  - Compatibility impact: exact storage files are replaceable; durable behavior and compaction semantics are required.
  - Phase(s): `03-phases/01-contracts-storage.md`, `03-phases/04-memory-subagents-telemetry.md`.

- Surface id: subagents/team
  - Source anchor: source paths agent/subagents/* and agent/team/*.
  - Source capability: bounded delegation, team bus/store/tools, team task events, summarized returns.
  - Target disposition: preserve.
  - Target contract: `TeamBus` creates `TeamTask` records, emits lifecycle events, inherits tool policy, and summarizes results before reinjection.
  - Compatibility impact: hidden prompts or untraceable delegation do not satisfy the contract.
  - Phase(s): `03-phases/04-memory-subagents-telemetry.md`.

- Surface id: token telemetry
  - Source anchor: source paths agent/telemetry.py, webui composables, and TokensView.
  - Source capability: input/output/cache/total token usage, context-window percent, compaction count, per-provider totals, and UI visibility.
  - Target disposition: preserve.
  - Target contract: normalized telemetry is emitted as runtime events, persisted, aggregated per provider/session, and visible in UI/API.
  - Compatibility impact: deterministic proof values may be synthetic but must be labeled and cannot prove live provider accounting.
  - Phase(s): `03-phases/04-memory-subagents-telemetry.md`, `03-phases/06-webui-api-workbench.md`.

- Surface id: workbench UI
  - Source anchor: source paths webui/src/views for chat, model, tools, skills, MCP, memory, team, tokens, and config.
  - Source capability: full local agent workbench, not only a chat box.
  - Target disposition: preserve.
  - Target contract: implement equivalent user workflows with accessible empty/loading/error/blocked/success states and local deterministic data path.
  - Compatibility impact: exact Vue implementation, visual style, copy, and assets are dropped; equivalent product behavior remains.
  - Phase(s): `03-phases/06-webui-api-workbench.md`.

- Surface id: optional broader OS references
  - Source anchor: comparative references JARVIS and ToFu.
  - Source capability: auth, workflows, RAG, observability, Postgres, Qdrant, Redis, scheduler, browser, DB layer, and multi-agent/swarm breadth.
  - Target disposition: defer.
  - Target contract: mention as non-claim boundaries unless human explicitly expands scope.
  - Compatibility impact: no JARVIS/ToFu feature completeness claim.
  - Phase(s): `04-evaluation.md`.

Rules:

- This is not route/function parity. Prefer cleaner target architecture when it preserves or intentionally improves the capability.
- Target disposition values: preserve | replace | merge | defer | drop.
- No source-backed surface may disappear silently. If it is merged, replaced, deferred, or dropped, record why and where the equivalent obligation or blocker lives.
- Source repository filenames are source anchors, not packet file references. Label them as source paths instead of ambiguous packet links.
- Future files produced by the implementation/product are runtime artifacts or generated outputs, not packet files.
- Unlabeled backticked `.md`, `.yaml`, `.json`, or `.jsonl` references are reserved for actual packet files that exist in this packet.

## Implementation project setup

The Buildprint packet must not contain `AGENTS.md`. The implementation project should create root/local `AGENTS.md` and setup artifacts after this file is resolved.

- Root `AGENTS.md`: short scope governor with project shape, architecture boundaries, safety rules, local instruction map, and "do not broaden current phase" rule.
- Local `AGENTS.md`: create only at real architectural boundaries such as frontend/app, backend/API, provider adapters, workers, data/db, infra, or tests/e2e.
- Runtime setup artifact: before starting `03-phases/*`, write `.buildprint/setup.md` or files under `.buildprint/setup/` recording concrete auth, provider, persistence, worker, deployment, browser/e2e, visual QA, safety, and verification decisions.
- Creating only `AGENTS.md` is not enough to satisfy the setup gate.
- Phase entry remains governed by `03-phases/phase-flow.md` and role contracts under `06-contracts/`.

## Open assumptions

- Assumption: local deterministic proof is sufficient for the first implementation.
  - Evidence: original packet proof mode required no network/API keys/live MCP.
  - Risk: live provider and real MCP claims remain blocked.
  - Blocks phase work: no.
- Assumption: single-user local self-hosted runtime is the target.
  - Evidence: source scope emphasized self-hosted personal workbench.
  - Risk: hosted auth, tenant isolation, billing, and publishing are non-claims.
  - Blocks phase work: no.
- Assumption: exact source UI style and source code are not reused.
  - Evidence: clean-room boundary.
  - Risk: downstream users may expect clone parity; `04-evaluation.md` must reject that overclaim.
  - Blocks phase work: no.

## Phase start gate

Do not start `03-phases/*` until this file is explicit enough to generate project root/local `AGENTS.md` without inventing architecture.

Initial phase set:

- `03-phases/01-contracts-storage.md`
- `03-phases/02-provider-streaming-runtime.md`
- `03-phases/03-tools-skills-mcp-policy.md`
- `03-phases/04-memory-subagents-telemetry.md`
- `03-phases/05-safety-claim-boundaries.md`
- `03-phases/06-webui-api-workbench.md`
