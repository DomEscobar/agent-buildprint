# Project Setup

This setup contract is completed before phase implementation. It turns human alignment and mapped source evidence into concrete project architecture, team operating rules, quality gates, safety rules, and the future project `AGENTS.md` plan.

## Human preferences

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from source evidence and product goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks.
- Default posture: local deterministic proof, no network, no live provider keys, no hosted deployment, no production auth/billing claim.

## Inferred project shape

- Product: self-hosted personal agent chatbot OS with chat as the control surface for a local agent runtime.
- Frontend/UI surfaces: chat stream, provider/model settings, tool workbench with risk labels, skills list/detail, MCP server/tool status, memory editor/viewer, team/subagents view, token/usage view, and config diagnostics.
- Backend/API surfaces: bootstrap state, chat stream via SSE/WebSocket or equivalent, provider registry/config diagnostics, tool request policy path, skill discovery/selection, MCP adapter mapping, memory/checkpoint read/write, team task events, token telemetry, trace/event inspection, cancellation/retry if supported.
- State/runtime surfaces: sessions, messages, trace events, checkpoints, provider configs, enabled tools/skills/MCP servers, raw history, daily/episodic summaries, curated long-term memory, attachment/source summaries, team task state, normalized usage totals, compaction markers.
- Tests/evaluation: derive from `04-evaluation.md` and phase proof gates; deterministic local tests are required before any live-provider claim.

## Stack decisions

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

## Source contract anchors

- Route/API/job prefixes and handlers: source path anchors include agent/webui bootstrap/config/memory/tokens/model routes and streaming WebSocket/HTTP chat boundary; target may use cleaner routes as long as equivalent bootstrap, stream, diagnostics, memory, token, and trace capabilities exist.
- Request/response payloads and validation errors: chat input accepts user message, session id, provider/model selection, enabled tools/skills, attachments, and optional team/task directives; errors must be evented or structured, actionable, and visible to UI/API clients.
- Provider/runtime boundaries and env var names only: adapters for deterministic test provider, OpenAI-compatible providers, Anthropic, Bedrock, and local/Ollama-like endpoints; secrets are env names or secret handles only.
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: runtime artifacts include local DB/files for sessions, history, checkpoints, memory, traces, telemetry, and phase evidence; product-generated outputs must be labeled runtime artifacts or generated outputs, not packet files.
- UI flow/state anchors including empty/loading/error/blocked/success states: all workbench views need empty state, loading/streaming state, denied/blocked state, error state, and success/ready state.

## Source capability/surface ledger

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

## Architecture rules

- Preserve product behavior and source-derived obligations; frameworks are replaceable when behavior and proof remain intact.
- Keep dependency direction explicit: UI/API -> application/session services -> domain runtime -> data/provider/tool adapters.
- Keep routes/controllers thin; put provider routing, tool policy, memory, team, and telemetry rules in services/domain modules.
- Put external API/provider/database/MCP access behind adapters or repositories.
- Treat deterministic test providers/tools/MCP servers as proof adapters, not production integrations.
- Do not claim durable behavior from in-memory-only state unless explicitly scoped as a prototype blocker.
- Preserve security, provider, browser, persistence, billing, publishing, media, memory, retrieval, and operational boundaries as claim limits even when no code for them exists yet.
- Generated code must be marked and regenerated through documented commands.

## Team operating model

Use these review lenses during every implementation loop:

- Architecture: boundaries, dependency direction, maintainability, source-faithful behavior.
- UX/UI: polished flows, empty/loading/error/success states, accessibility, responsive behavior.
- Backend/API: validation, auth/privacy boundaries, provider contracts, error semantics.
- State/runtime: persistence, migrations, env/config, checkpoints, workers/jobs, runtime observability.
- QA/evaluation: tests, build, browser/runtime checks, evidence quality, no fake proof.
- Security/infra: secrets, destructive actions, external writes, provider/browser/network/shell risks, deployment and cost approvals.

## Execution authority model

- Root/local `AGENTS.md` files in the implementation project are scope governors, not product brains. They preserve architecture, safety, quality gates, and local workflow; they do not broaden the current phase.
- `.buildprint/next-agent.md` is continuity for fresh sessions. It must identify current phase, objective, recommended next action, known blockers, and which phase-run artifacts already exist.
- `03-phases/phase-flow.md` is the executable phase-entry constitution. It controls how each phase begins, how roles are assembled, how bounded handoffs are created, and when evidence may be appended.
- Explicit task or handoff text is the only valid source of delegated role, allowed scope, proof command, and evidence requirements.

## Delegation and handoff protocol

For each phase, the orchestrating main session must create bounded assignments before delegating or simulating specialist work. Each assignment includes phase id, proof gate, files to read, allowed edit scope, non-goals, success criteria, proof command or verification command, evidence row requirements, and risks/blockers. Specialist workers return changed files, proof results, an evidence row draft, and risks. The orchestrator reviews and integrates their output, runs the phase proof gate, appends runtime evidence to `.buildprint/evidence/evidence-ledger.jsonl`, and updates `.buildprint/progress.md` plus `.buildprint/next-agent.md` before moving on. Vague global delegation is invalid.

## AGENTS.md plan

The blueprint packet must not contain `AGENTS.md`. The implementation project should create root/local `AGENTS.md` after this setup is resolved.

- Root `AGENTS.md`: project shape, architecture rules, quality gates, safety/permissions, workflow, and local instruction map.
- Local `AGENTS.md` files: create only at real architectural boundaries such as frontend/app, backend/API, packages/ui, data/db, provider adapters, tools/MCP, or tests/e2e.
- Local files may narrow rules for their subtree but must not weaken root safety, quality, or architecture invariants.

## Quality gates

Before claiming any phase done:

- Run the smallest meaningful typecheck/lint/test/build gate for changed code.
- For UI-facing work, verify user-visible behavior with browser/screenshot evidence when possible.
- For backend/provider/state work, verify real request/path, event stream, persistence/readback, or record an honest blocker.
- For provider, tool, MCP, browser, shell, network, retrieval, media, billing, publishing, and deployment claims, require env-gated or integration evidence specific to that boundary.
- Do not skip tests, hide failures, or upgrade claims without proof.

## Safety and permissions

Ask before destructive actions, external writes/publishes/deploys, secret handling, paid services, irreversible migrations, public data changes, browser automation against external sites, live provider calls, real MCP server writes, or shell/network execution outside a bounded local test.

Never commit secrets, private logs, credentials, provider tokens, or user memory exports. Secrets are stored as env var names or secret handles only.

## Open questions and assumptions

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
