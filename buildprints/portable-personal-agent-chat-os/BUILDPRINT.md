# BUILDPRINT: Portable Personal Agent Chat OS

## Agent Operating Contract

Build a self-hosted personal agent chatbot where chat is the control surface for a local agent runtime. The runtime routes model providers, streams responses as events, invokes policy-gated tools, loads selected skills, manages memory, delegates bounded subagent tasks, records token telemetry, and exposes a WebUI/API boundary.

The canonical contract is this file. Supporting files provide type contracts, subsystem requirements, tests, and source traceability, but they do not override this authority spine.

## Binding Implementation Slice

The included implementation slice is:

- `AgentSession`: one conversation/run with messages, checkpoints, active provider/model, runtime events, and usage.
- `ProviderRouter`: config-driven provider registry with deterministic test provider support and no live API requirement for proof.
- `StreamingAgentLoop`: turn lifecycle that emits deltas, tool events, memory events, team events, telemetry, completion, and failure.
- `ToolRegistry`: schema-described tools with risk labels and policy mediation before execution.
- `SkillRegistry`: discoverable skill records with metadata, triggers, instructions, optional resources/scripts, and explicit enablement.
- `McpAdapter`: adapter boundary that maps enabled external tools into the same `ToolSpec` policy path; proof uses deterministic local test servers.
- `MemoryStore`: raw history, daily/episodic notes, curated long-term memory, checkpoints, and attachment/source summaries.
- `ContextBuilder`: ordered assembly of runtime instructions, memory, selected skills, task/team context, recent messages, attachments, and tool results.
- `TeamBus`: evented subagent delegation with bounded task contracts and summarized results.
- `Telemetry`: normalized input/output/cache/total token counters and compaction markers visible to runtime state and UI/tests.
- `WebUI/API`: chat stream, model/provider settings, tool/skill/MCP workbench, memory editor/viewer, team view, token view, and config diagnostics.

The proof mode is local, deterministic, and no-network by default. Live model providers, real MCP servers, shell/browser/network execution, production multi-user auth, and hosted deployment are separate adapter work and require their own tests.

## Non-Goals / Unsafe Claims

- Full Emperor Agent clone behavior.
- Exact Vue UI, visual style, copy, assets, or product metaphor matching.
- Live OpenAI, Anthropic, Bedrock, Ollama, or OpenAI-compatible provider behavior without env-gated smoke tests.
- Real shell, browser, network, or filesystem safety beyond the implemented policy gates and tests.
- Real MCP server interoperability without configured server tests.
- Production multi-user auth, tenant isolation, billing, or hosted SaaS operation.
- JARVIS or ToFu feature completeness.
- Tool, route, view, or success states that are displayed but not wired end to end.
- Temporary in-memory storage as production durability.

## Required Read Order

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `AGENT_RUNTIME.md`
5. `PROVIDER_ROUTER.md`
6. `TOOL_SKILL_MCP.md`
7. `MEMORY_CONTEXT.md`
8. `SUBAGENTS_TEAM.md`
9. `TOKEN_TELEMETRY.md`
10. `STREAMING_WEBUI.md`
11. `SECURITY_POLICY.md`
12. `TEST_MATRIX.md`
13. `HEAD_TO_FOOT_QA.md`
14. `TRACEABILITY_MATRIX.md`
15. `PARITY_CLAIMS.md`

## Phase Gates

1. Scope and safety: choose stack, enabled channels, allowed tool roots, approval model, and no-network proof defaults.
2. Contracts and stores: implement the core types, persistent local stores for chat/memory/checkpoints, trace/event log, and token usage model. Any temporary in-memory store must be labeled test-only.
3. Provider router and streaming loop: implement provider registry, deterministic test provider, streaming turn lifecycle, checkpoint persistence, context building, and compaction threshold behavior.
4. Tools, skills, and MCP: implement schema validation, policy checks, deterministic test tools, skill discovery/matching, and MCP adapter mapping through the same tool path.
5. Memory and subagents: implement raw history, daily episode, long-term memory, checkpoint inspection, compactor adapter, team task bus, and result summarization.
6. WebUI/API: expose bootstrap state, chat stream, traces, model/tools/skills/MCP/memory/team/tokens/config views, accessible errors, and local no-credential operation.
7. QA: run unit/contract tests, deterministic end-to-end chat turn, minimal WebUI/API browser or HTTP path, and claim-boundary review.

## Acceptance Gates

- Bootstrap loads config, provider registry, tools, skills, MCP configs, memory state, checkpoints, and token state.
- Provider selection is config-driven; unknown provider fails with actionable diagnostics.
- A chat turn emits `turn.started`, model deltas before completion, tool request/allow/deny/result events as applicable, telemetry, and `turn.completed` or `turn.failed`.
- Tools cannot execute from raw model text; every tool request passes schema validation and risk policy.
- Disallowed shell/write/network/browser actions emit denial events and do not execute.
- Selected skill instructions are injected narrowly; unselected skills stay out of context.
- MCP tools are mapped through namespaced `ToolSpec` records and policy-gated; proof uses deterministic local test servers.
- Memory preserves raw history, recent messages, daily/episodic summaries, curated long-term memory, checkpoints, and compaction events without silent instruction loss.
- Subagent delegation emits bounded `team.task` lifecycle events and summarizes results before reinjection.
- Token telemetry includes normalized input, output, cache read, cache create, total, context-window percent, compaction count, and per-provider totals.
- Minimal WebUI/API path is wired end to end from bootstrap to streamed answer, with trace, memory, and token state observable through browser UI or HTTP API evidence.
- Proof passes without network access, API keys, live MCP servers, shell execution, or hosted services. The minimal WebUI/API path uses local deterministic data only.

## Purpose

The purpose is to specify a portable personal-agent OS contract: a local chat-driven workbench with provider routing, event streaming, tool and skill execution boundaries, external tool adapter boundaries, memory, subagent coordination, telemetry, UI/API surfaces, and safety controls.

## Architecture

```text
WebUI / CLI / Channel
  -> Session Controller
  -> Context Builder
      -> Memory Store
      -> Skill Registry
      -> Team Context
  -> Provider Router
  -> Streaming Agent Loop
      -> Tool Dispatcher
      -> MCP Adapter
      -> Subagent Team Bus
  -> Event Stream + Telemetry
  -> History / Episodes / Long-term Memory / Checkpoints
```

Turn lifecycle:

1. Emit `turn.started`.
2. Persist the user message and checkpoint.
3. Select enabled skills.
4. Build context from runtime instructions, memory, selected skills, active task/team context, recent messages, attachments, and tool results.
5. Route to the selected provider.
6. Stream `model.delta` events.
7. Detect structured tool requests or delegation requests.
8. Validate request schema and risk policy.
9. Execute allowed tools, deterministic local MCP test tools, or subagent tasks; deny unsafe requests.
10. Feed results back into the loop when required.
11. Emit usage telemetry.
12. Persist final answer, trace, memory updates, and compaction state.
13. Clear or advance checkpoint.
14. Emit `turn.completed` or `turn.failed`.

## Evidence Boundary

Primary source mapping basis: `TheSyart/emperor-agent` at shallow clone commit `d9761740bf82b9d5a91e5d8cda44ab5643bab59d`.

Observed architecture signals:

- `agent/runner.py`: streaming model/tool loop, checkpoints, token tracking, and compaction trigger.
- `agent/webui.py`: WebSocket/HTTP boundary, bootstrap state, memory/tokens/model/config routes.
- `agent/providers/*`: provider base, registry, OpenAI-compatible, Anthropic, and Bedrock implementations.
- `agent/tools/*`: tool schema, registry, dispatch, filesystem, shell, web/search/task-list/skills tools.
- `agent/mcp/*`: MCP config, client, connection, and adapter layer.
- `agent/memory.py` and `agent/compactor.py`: long-term memory, history, daily episodes, checkpoint, and compaction.
- `agent/subagents/*` and `agent/team/*`: subagent specs, team bus/events/store/tools.
- `agent/telemetry.py` and `webui/src/views/TokensView.vue`: token/usage telemetry surfaced in UI.
- `webui/src/views/*.vue`: chat, model, tools, skills, MCP, memory, team, tokens, and config workbench tabs.

Comparative references from the scan:

- `hyhmrright/JARVIS` informs optional breadth such as auth, workflows, RAG, observability, Postgres, Qdrant, and Redis.
- `NiuTrans/ToFu` informs optional breadth such as MCP, memory, scheduler, browser, tool use, DB layer, and multi-agent/swarm behavior.

This Buildprint captures portable architecture and contracts only. Implementations must use original code, original UI, and original tests.

## Required Validation

Run the static, unit/contract, deterministic runtime, persistence, security, browser-if-UI, and claim-boundary gates in `HEAD_TO_FOOT_QA.md` and `TEST_MATRIX.md`. Record exact commands, pass/fail status, screenshots for UI implementations, and known gaps in the implementation validation report.

## Copyable Agent Prompt

```text
Implement the Portable Personal Agent Chat OS from BUILDPRINT.md. Treat BUILDPRINT.md as the canonical authority. Build the binding slice: AgentSession, ProviderRouter with deterministic test provider, StreamingAgentLoop, ToolRegistry with risk policy, SkillRegistry, MCP adapter boundary, MemoryStore, ContextBuilder, TeamBus, Telemetry, and minimal WebUI/API surfaces. Keep proof local, deterministic, and no-network by default. Do not claim live provider behavior, real MCP interoperability, shell/browser/network safety, production auth, hosted SaaS operation, source-project clone behavior, or production durability unless separately implemented and tested. Run the acceptance gates and record commands and results.
```
