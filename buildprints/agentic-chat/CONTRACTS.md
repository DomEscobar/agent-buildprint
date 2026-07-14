# CONTRACTS

This compatibility file summarizes product vocabulary only. `BUILDPRINT.md`, `01-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, and the active files under `03-phases/` are authoritative.

## Foundation contracts (streaming_chat_core)

- `ArchitecturePacket`: setup-created `architecture/*.md` files with Mermaid diagrams, product-specific components, labeled edges, state/failure notes, claim ceilings, and implementation mappings.
- `ProjectStructurePlan`: setup-created `PROJECT_STRUCTURE.md` organized by Agentic Chat product/runtime responsibility, with ownership, exclusions, architecture mapping, and tests/evals for each top-level source area.
- `ArchitectureStructureTrace`: setup-created `ARCHITECTURE_STRUCTURE_TRACE.md` proving component-to-file-to-proof traceability and recording the anti-lazy architecture score.
- `Session`: conversation with messages, active provider/model route, checkpoints, events, and usage.
- `Message`: id, session id, role, content, status (`pending`/`streaming`/`completed`/`failed`/`blocked`), and timestamps.
- `Turn`: id, session id, provider id, model id, status, timing, cancellation/timeout/error fields, and checkpoint id.
- `StreamEvent`: ordered SSE records — `turn.started`, `model.delta`, `usage.delta`, `turn.completed`, `turn.failed`, `turn.blocked`.
- `ChatProvider`: `stream(req, signal): AsyncIterable<ProviderStreamEvent>` plus `countTokens(messages)`; backs the default local model, the deterministic test double, and paid providers.
- `ProviderRoute`: selected provider, model, credential posture, real/test mode, and blocked reason when applicable.
- `ProviderFailure`: normalized code, retryability, and user-facing recovery text.
- `Telemetry`: prompt/output tokens, latency, provider id, model id, and cost (zero/unknown when not paid).

## Agentic loop contracts (agentic_chat — phase 04)

- `AgentHarness`: caller-owned transcript, stateless provider/tool loop inside harness, provider-neutral event stream, single-runner invariant, steering/follow-up queue, cancellation token, and dangling tool-call repair before the next model request.
- `SessionEvent`: append-only typed session entry (`message`, `model_step`, `compaction`, `approval`, `budget`, `custom`); active state derived by replay; supports branch/resume when implemented.
- `BudgetPolicy`: token, time, tool-call, step, and cost budgets with warn thresholds, hard-stop actions, and consumed-budget records attached to the run. One run-level budget invariant covers every source of spend — model turns, tool calls, verifier/consensus rounds, and subagent/delegation work — with no separate, bypassable sub-budget.
- `LoopBreaker`: no-progress or repeated-action detection with typed stop reason; pairs with bounded step/retry budget.
- `ContextPack`: ranked/filtered context slice with trust-zone labels, budget check, and compaction provenance before each model call, produced by a named pluggable strategy (for example sliding-window, summarize, rule-based compact, or a custom compressor) rather than unspecified trimming; already-consumed tool results and long tool outputs are compacted with a visible marker, never silently dropped.
- `TrustZone`: source label (`system`, `user`, `tool_output`, `retrieved`, `memory`) and packing authority for each context segment.
- `CapabilityGrant`: scoped tool/MCP/data access for one action or subtask, with expiry/revocation and audit link.
- `ActionScreening`: prompt-injection action firewall result comparing proposed action to original user intent when untrusted context influenced the model (`allow` / `block` / `escalate`).
- `VerifierResult`: goal acceptance check, rubric/tests outcome, or typed blocker preventing fake completion; may be a single-judge check or a stronger proposer→judge consensus loop (bounded rounds, quorum, dissent-driven revision) for high-stakes actions or swarm fan-in synthesis.
- `RunReceipt`: exportable structured record of run id, goal, steps, tool calls, approvals, budgets, errors, synthesis, provenance links, and redaction policy.
- `IdempotencyKey`: key/ledger entry for write/external side effects to prevent duplicate execution on retry or crash recovery.
- `ToolSpec` / `SkillSpec`: id, description, typed JSON input/output schema, side-effect class (`none`/`read`/`write`/`external`), and allowlist status. Exposed to the model as native tool/function definitions.
- `McpServerSpec`: server id, transport/command, connection posture, allowlisted tools, credential posture, side-effect class, and timeout/error policy.
- `ActionRequest`: model-selected action with kind (`tool`/`skill`/`mcp`/`memory`), typed arguments, originating message/turn, and the model rationale that selected it.
- `PolicyResult`: `allow` / `ask` / `block` with reason and required approval scope.
- `ApprovalRecord`: action id, decision (`approved`/`denied`), actor, and timestamp.
- `ActionResult`: typed output, status (`completed`/`failed`/`blocked`), latency, and error taxonomy; fed back into the loop as an observation.
- `AgentRun`: id, session id, goal, status, plan/next-step state, step list, bounded step/retry budget, budget consumption, loop-breaker state, verifier result, harness run id, and final synthesis; resumable after restart.
- `AgentStep`: ordered record of model decision, action request, policy/approval, observation, and critique.
- `MemoryEntry`: scope, key/content, write decision (`auto`/`ask`/`skip`/`block`), retention posture, and audit trail; `CompactionSummary` summarizes history in product language.
- `ActionSelectionEvidence`: model/provider request id, model/provider response id or normalized action id, selected action id, typed arguments, model rationale or tool-call payload, originating message id, policy result, approval requirement, side-effect class, and proof that the selection was not slash-command, keyword, regex, or button-only routing.
- `SelfImplementedActionEvidence`: the authored file/module path and change reference for at least one tool/skill/MCP server the building agent implemented or wired during this build, plus proof that the live action-selection trace invoked it over a real-running provider connection (not the deterministic test double, and not an assumed pre-existing/external capability the building agent did not author or configure).
- `ObservationReingestionEvidence`: action result id, next model request id, observation payload reference, final synthesis reference, and proof that the next step used the observed result rather than a scripted local append.
- `AgenticRestartEvidence`: `agent_run`, ordered `agent_step`, `action_request`, `policy_result`, `approval_record` when applicable, `action_result`, `agent_trace`, `session_event` log readback, and `run_receipt` after reload or process restart with matching ids and order.

## Swarm contracts (agentic_swarm — phase 05)

- `SwarmRun`: id, session id, parent agent run id, goal, decomposition plan, concurrency limit, delegation ledger, no-progress breaker state, status, aggregation/synthesis output, and cancellation state; resumable after restart.
- `SwarmPlanArtifact`: versioned, frozen decomposition snapshot (goal, ordered `SubtaskSpec` list with dependencies, assignees, and retry policy) created once the supervisor's decomposition is approved; restart/resume replays execution from this artifact instead of re-invoking the supervisor, so the task graph is deterministic and auditable across restarts, not a freshly re-planned (and possibly different) decomposition.
- `SubtaskSpec`: id, swarm id, typed objective, inputs, dependencies, and assigned tool/MCP scope.
- `SubagentRun`: id, swarm id, subtask id, isolated context, status (`queued`/`running`/`completed`/`failed`/`blocked`/`cancelled`), retry count, output summary, and independent trace link.
- `SubagentStep`: ordered per-worker model decision, action, observation, and critique records.
- `AggregationRecord`: fan-in inputs (per-subagent outputs), partial-failure notes, and the supervisor synthesis tied to the original goal.
- `SwarmConcurrencyEvidence`: concurrency primitive name/configuration, limit, queued count, at least two subagent ids with overlapping `started_at`/`finished_at` intervals, and proof that the run was not sequential awaits relabeled as parallel.
- `WorkerIsolationEvidence`: per-subagent context reference, scoped tool/MCP allowlist, independent trace link, and proof that no worker inherited unscoped global access.
- `SwarmRestartEvidence`: `swarm_run`, `subtask_spec`, `subagent_run`, per-worker `agent_run`/`agent_step`, and `aggregation_record` read back after reload or process restart.

These contracts are **built and proven** at their maturity level, not deferred. Unbuilt levels remain honest blocked seams per `EXTENSIONS.md`.

## Claim verification contracts (phase 06)

- `ClaimGateEvidence`: `.buildprint/claim-gates.json` with schema version, checked timestamp, computed `highest_honest_claim`, per-level status, cited evidence ids, and hard-failure arrays.
- `ClaimCheckReport`: `.buildprint/claim-check.md` explaining the pass/fail/blocker verdict for each maturity level, every lowered claim, and the smallest verification run needed to lift a blocked level.
- A higher claim may not pass from prose, screenshots alone, UI labels, configuration, SDK imports, fixtures, or sample/mock output. It needs the runtime records above plus restart/readback evidence.

## Setup architecture gate

- Implementation must not start until `ArchitecturePacket`, `ProjectStructurePlan`, and `ArchitectureStructureTrace` exist and score `4` or `5` on the setup architecture rubric, or until an exact external blocker lowers the claim ceiling.
- Generic diagrams are invalid: unlabeled edges, vague boxes such as `Frontend`, `Backend`, `API`, `Agent`, `Service`, `Utils`, or `DB`, and missing component-to-code mappings fail the gate.
- Generic file structures are invalid: `components/`, `utils/`, `services/`, `api/`, `pages/`, `lib/`, `helpers/`, or `misc/` may exist only when narrowed by product/runtime responsibility, explicit exclusions, architecture traceability, and proof mapping.
