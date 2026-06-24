# CONTRACTS

This compatibility file summarizes product vocabulary only. `BUILDPRINT.md`, `01-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, and the active files under `03-phases/` are authoritative.

## Foundation contracts (streaming_chat_core)

- `Session`: conversation with messages, active provider/model route, checkpoints, events, and usage.
- `Message`: id, session id, role, content, status (`pending`/`streaming`/`completed`/`failed`/`blocked`), and timestamps.
- `Turn`: id, session id, provider id, model id, status, timing, cancellation/timeout/error fields, and checkpoint id.
- `StreamEvent`: ordered SSE records — `turn.started`, `model.delta`, `usage.delta`, `turn.completed`, `turn.failed`, `turn.blocked`.
- `ChatProvider`: `stream(req, signal): AsyncIterable<ProviderStreamEvent>` plus `countTokens(messages)`; backs the default local model, the deterministic test double, and paid providers.
- `ProviderRoute`: selected provider, model, credential posture, real/test mode, and blocked reason when applicable.
- `ProviderFailure`: normalized code, retryability, and user-facing recovery text.
- `Telemetry`: prompt/output tokens, latency, provider id, model id, and cost (zero/unknown when not paid).

## Agentic loop contracts (agentic_chat)

- `ToolSpec` / `SkillSpec`: id, description, typed JSON input/output schema, side-effect class (`none`/`read`/`write`/`external`), and allowlist status. Exposed to the model as native tool/function definitions.
- `McpServerSpec`: server id, transport/command, connection posture, allowlisted tools, credential posture, side-effect class, and timeout/error policy.
- `ActionRequest`: model-selected action with kind (`tool`/`skill`/`mcp`/`memory`), typed arguments, originating message/turn, and the model rationale that selected it.
- `PolicyResult`: `allow` / `ask` / `block` with reason and required approval scope.
- `ApprovalRecord`: action id, decision (`approved`/`denied`), actor, and timestamp.
- `ActionResult`: typed output, status (`completed`/`failed`/`blocked`), latency, and error taxonomy; fed back into the loop as an observation.
- `AgentRun`: id, session id, goal, status, plan/next-step state, step list, bounded step/retry budget, and final synthesis; resumable after restart.
- `AgentStep`: ordered record of model decision, action request, policy/approval, observation, and critique.
- `MemoryEntry`: scope, key/content, write decision (`auto`/`ask`/`skip`/`block`), retention posture, and audit trail; `CompactionSummary` summarizes history in product language.

## Swarm contracts (agentic_swarm)

- `SwarmRun`: id, session id, parent agent run id, goal, decomposition plan, concurrency limit, status, aggregation/synthesis output, and cancellation state; resumable after restart.
- `SubtaskSpec`: id, swarm id, typed objective, inputs, dependencies, and assigned tool/MCP scope.
- `SubagentRun`: id, swarm id, subtask id, isolated context, status (`queued`/`running`/`completed`/`failed`/`blocked`/`cancelled`), retry count, output summary, and independent trace link.
- `SubagentStep`: ordered per-worker model decision, action, observation, and critique records.
- `AggregationRecord`: fan-in inputs (per-subagent outputs), partial-failure notes, and the supervisor synthesis tied to the original goal.

These contracts are **built and proven** at their maturity level, not deferred. Unbuilt levels remain honest blocked seams per `EXTENSIONS.md`.
