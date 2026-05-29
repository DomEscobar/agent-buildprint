# Project Setup

This setup contract is completed before phase implementation. It turns human alignment and mapped observations into concrete project architecture, team operating rules, quality gates, safety rules, and the future project `AGENTS.md` plan.

## Setup defaults

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from mapped observations and product goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks.
- Default posture: local deterministic proof, no network, no live provider keys, no hosted deployment, no production auth/billing claim.
- Blueprint mode: `product`.
- Blueprint mode
  - Primary: product
  - Phase style: outcome_flow
  - Why this mode fits: the selected packet is a user-facing product workbench. Each phase is an outcome flow that makes an operator-visible local agent capability trustworthy across UI/API/runtime/state boundaries.
- Phase style: `outcome_flow`.
- Public product name: Personal Agent Chat. Do not use legacy public branding terms in title, slug, UI copy, or package identity unless describing a technical runtime boundary inside implementation notes.

## Product / capability shape

- Product: self-hosted personal agent chat workbench with chat as the control surface for a local agent runtime.
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

## Experience quality contract

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

## Mapped obligation/surface matrix

Allowed target disposition values: preserve | replace | merge | defer | drop.

This matrix is not route/function parity. No mapped surface may disappear silently; every high-signal mapped surface appears exactly once with one primary owning phase, a Target contract, and surface-specific Required proof. Generic claims such as "tests pass", "app builds", or "feature preserved" cannot satisfy this matrix unless tied to the named surface, runtime path, state readback, and proof gate.

| Surface id | Source evidence | Mapped obligation | Target disposition | Target contract | Owning phase | Required proof |
|---|---|---|---|---|---|
| session bootstrap and config diagnostics | Existing packet maps `agent/webui.py` bootstrap/config/model routes; live origin checkout blocked by DNS in this worker run. | Expose current local runtime state, provider config health, deterministic mode, blocked live-provider state, enabled tools/skills/MCP, memory/token defaults, and claim-boundary diagnostics. | preserve | Bootstrap API/service reports deterministic and blocked runtime status without exposing secrets. | `03-phases/01-contracts-storage.md` | bootstrap service test, config validation test, persistence defaults readback, security no-secret review |
| streaming chat turn lifecycle | Existing packet maps `agent/runner.py` and `agent/webui.py` stream boundary. | User message creates a turn, emits ordered stream events, persists trace/checkpoint, records usage, completes or fails with actionable diagnostics. | preserve | `03-phases/02-provider-streaming-runtime.md` | deterministic stream integration test, failure event test, trace/checkpoint readback |
| provider registry and adapter families | Existing packet maps `agent/providers/base.py`, `registry.py`, `openai_compat.py`, `anthropic_provider.py`, and `bedrock_provider.py`. | Registry supports deterministic provider plus OpenAI-compatible, Anthropic, Bedrock, and local-compatible adapter seams with config validation and fail-closed missing credentials. | preserve | `03-phases/02-provider-streaming-runtime.md` | provider adapter/config tests, unknown-provider negative test, non-upgrading live proof blocker |
| message/session/checkpoint storage | Existing packet maps runner checkpoints, message history, memory, compactor, and telemetry signals. | Durable local store owns sessions, messages, checkpoints, trace events, memory tiers, telemetry totals, enabled config, migrations, reset/delete/export, and restart readback. | preserve | `03-phases/01-contracts-storage.md` | repository roundtrip, restart/readback proof, migration/schema validation |
| tool schema registry | Existing packet maps `agent/tools/schema.py`, registry, dispatcher, filesystem, shell, web/search, task-list, and skills tools. | Every tool is a `ToolSpec` with input schema, risk label, approval/deny policy, timeout, bounded roots, audit events, and structured result/error. | preserve with safer defaults | `03-phases/03-tools-skills-mcp-policy.md` | schema validation tests, allow/deny runtime traces, audit readback |
| dangerous tool classes | Existing packet maps filesystem/shell/web/search/tool script surfaces. | Shell, write, network, browser, publishing, billing, media, retrieval, and destructive actions are denied by default and require explicit config plus separate proof. | preserve as blocked/policy-gated | `03-phases/05-safety-claim-boundaries.md` | denied-path tests, no-secret scan, claim-boundary review |
| skill discovery and selected instruction injection | Existing packet maps `agent/skills.py`, `skills/*/SKILL.md`, and skill tools. | Discover skill metadata, triggers, scripts/resources, explicit selection, narrow context injection, and script execution through tool policy only. | preserve without copying source skill text | `03-phases/03-tools-skills-mcp-policy.md` | skill discovery fixture, selected-only injection test, denied script policy test |
| MCP server and tool adapter | Existing packet maps `agent/mcp/client.py`, `config.py`, `connection.py`, and adapter. | Configured MCP servers expose namespaced tools through the same `ToolSpec` policy path with timeout, health, blocked state, retry/error mapping, and audit. | preserve with proof blocker for live servers | `03-phases/03-tools-skills-mcp-policy.md` | deterministic local MCP fixture, timeout/error mapping test, non-upgrading real MCP blocker |
| memory tiers and context builder | Existing packet maps `agent/memory.py`, `agent/compactor.py`, checkpoint and attachment store signals. | Preserve raw history, daily/episodic summaries, curated long-term memory, checkpoints, attachment/source summaries, selected skills, team context, recent messages, and tool results in context order. | preserve | `03-phases/04-memory-subagents-telemetry.md` | context assembly order test, compaction threshold test, persistence readback |
| user-editable memory | Existing packet maps memory routes and webui memory view signals. | Workbench allows memory read/edit/delete/reset with local-only privacy posture, audit/readback, validation, and empty/error/success states. | preserve | `03-phases/06-webui-api-workbench.md` | browser/API memory edit path, persistence readback, invalid-input test |
| subagent/team task lifecycle | Existing packet maps `agent/subagents/*` and `agent/team/*`. | Create bounded team tasks, emit lifecycle events, inherit tool policy, summarize returns before reinjection, and persist trace/audit state. | preserve | `03-phases/04-memory-subagents-telemetry.md` | team task lifecycle test, summarized return injection test, audit readback |
| token and context telemetry | Existing packet maps `agent/telemetry.py`, UI token composables, and `TokensView`. | Normalize input/output/cache/total usage, context-window percent, compaction count, and per-provider/session totals as persisted runtime events visible in API/UI. | preserve | `03-phases/04-memory-subagents-telemetry.md` | telemetry aggregation test, context-window calculation test, UI/API readback |
| trace/event inspection | Existing packet maps stream traces, tool events, checkpoints, and team events as observable workbench state. | Operator can inspect turn trace events, provider/tool/team/memory/telemetry events, failure causes, and blocked states without parsing logs. | preserve | `03-phases/06-webui-api-workbench.md` | API trace readback, browser trace view action path, no-fake UI review |
| workbench chat surface | Existing packet maps `webui/src/views` chat/model/tools/skills/MCP/memory/team/tokens/config. | First useful viewport is the workbench, not a landing page; chat stream is wired through UI/controller/runtime and shows empty/loading/error/blocked/success states. | preserve behavior, replace source UI | `03-phases/06-webui-api-workbench.md` | browser/e2e chat path, responsive screenshot critique, accessibility checks |
| provider/model settings view | Existing packet maps model/provider routes and model view. | Operator can inspect deterministic/live-blocked providers, model IDs, context windows, env var names, failure diagnostics, and selected provider without revealing secrets. | preserve | `03-phases/06-webui-api-workbench.md` | UI/API provider diagnostics test, missing credential blocked-state proof |
| tools view | Existing packet maps tool registry and tool UI signals. | Operator can inspect tool list, schemas, risk labels, enabled/denied state, allowed roots/timeouts, audit results, and denial reasons. | preserve | `03-phases/06-webui-api-workbench.md` | browser/API tools state proof, denial visible-state proof |
| skills view | Existing packet maps skill registry and skill list/detail signals. | Operator can inspect available skills, metadata, trigger reason, selection status, resource/script policy, and selected-context preview without copying source skill contents. | preserve | `03-phases/06-webui-api-workbench.md` | skill list/detail UI proof, selected-only injection trace |
| MCP view | Existing packet maps MCP config, connections, adapter, and view signals. | Operator can inspect servers, imported namespaced tools, health, timeout, disabled/blocked state, and live-proof blocker. | preserve | `03-phases/06-webui-api-workbench.md` | deterministic MCP fixture proof, blocked live MCP UI proof |
| team/subagent view | Existing packet maps team task events and store/tools. | Operator can create/observe bounded local team tasks, see status/progress/failure/completion, and inspect summarized returns. | preserve | `03-phases/06-webui-api-workbench.md` | team task UI/API action path, persisted event readback |
| config and claim-boundary diagnostics | Existing packet maps config diagnostics and non-claim boundaries. | UI/API clearly labels deterministic, live, blocked, unsupported, and unproven surfaces; unsupported billing/auth/hosted/source-clone claims are rejected. | preserve | `03-phases/05-safety-claim-boundaries.md` | claim-boundary tests, diagnostics UI proof, no-fake scan |
| optional broader auth/RAG/workflows/swarm/deployment references | Existing prior packet mentions comparative JARVIS/ToFu pressure only, not origin-observed emperor-agent capability. | Keep as non-claim boundaries unless the human explicitly expands scope and proof gates are added. | defer | `04-evaluation.md` | non-claim wording check; no implementation proof required unless scope expands |

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

## Foundation scaffold gate

Before Phase 01, the implementation agent must create the selected stack's real base project structure. This is not optional and is not satisfied by a single prototype file.

Required implementation-project scaffold:

- root `AGENTS.md`
- `.buildprint/setup.md`
- `architecture.md`
- `engineering-standards.md`
- `test-strategy.md`
- `ui-identity.md` because this packet is UI-bearing
- concrete application directories for UI, API/application services, domain/contracts, repositories/persistence, provider/tool/MCP adapters, worker/runtime services, tests, e2e/browser proof, and operations/config

Root `AGENTS.md` must explicitly list `architecture.md`, `engineering-standards.md`, `test-strategy.md`, and `ui-identity.md` as mandatory reads for coding agents before code edits. It must also state that `AGENTS.md` is a scope governor, not a product brain; `.buildprint/next-agent.md` is continuity for fresh sessions; bounded handoff text is the unit of delegated work; and orchestrator/integrator authority must be explicit in the task prompt.

`architecture.md` must include these sections: `Architecture principles`, `Base project structure`, `Boundary map`, `Dependency rules`, `Architecture decisions`, and `Downstream phase extension map`.

`engineering-standards.md` must include these sections: `Clean code rules`, `Validation and schemas`, `Persistence standards`, `Provider standards`, `Worker/runtime standards`, `UI standards`, and `Test standards`. `Test standards` must require deterministic timeout and exit behavior for blocked e2e/runtime proof.

`test-strategy.md` must define unit, integration, persistence, provider-adapter, worker/runtime, security, browser/e2e, visual quality, no-fake, and evidence-ledger gates.

`ui-identity.md` must define product-grade visual quality for a dense local workbench, including typography, spacing, color, responsive constraints, accessibility, interaction states, forbidden generic/default patterns, and required screenshot critique.

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
