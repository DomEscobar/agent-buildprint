# Phase 05 - Parallel Swarm Dispatching

This phase promotes the product from `agentic_chat` to `agentic_swarm` — the full claim. The defining shift: a **supervisor** decomposes a goal into typed subtasks and dispatches **real concurrent subagents**, each with isolated context and scoped tools, then synthesizes their fan-in results into one goal-tied answer. Sequential calls relabeled as parallel, or fabricated worker output, are explicit failures of this phase.

## How to implement this phase

Before writing code, read:

- `references/runtime-techniques-basis.md`
- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md` if it exists
- current project `AGENTS.md` if it exists
- `BUILDPRINT.md`, `SPEC.md`, `CONTRACTS.md`, `EXTENSIONS.md`
- `blueprint.yaml` (`execution_model.product_loop.required_for_agentic_swarm_claim`, `capability_maturity.agentic_swarm`)
- `04-agentic-loop-runtime.md` — the swarm reuses the proven single-agent loop as the worker runtime
- `01-project-setup.md` and `02-ui-identity.md`

Build the swarm on top of the proven phase-04 loop: each subagent is an instance of the single-agent action loop with its own run id, isolated context window, and scoped tool/MCP allowlist. The supervisor must decompose the confirmed representative goal and preserve its acceptance criteria in each `SubtaskSpec` and the fan-in verifier; do not demonstrate concurrency on an unrelated generic task. Do not invent a second, weaker agent implementation for workers. Use a real concurrency primitive (worker pool / bounded task queue / `Promise`-based scheduler with a concurrency cap), not sequential awaits.

## Building objective

Keep `02-ui-identity.md` open: swarm progress must render as an **inline, chat-native** affordance — a compact live panel of parallel workers attached to the supervisor message, each expandable to its own trace. It must not become a separate task dashboard or kanban that displaces the conversation thread.

Build the smallest useful **supervisor/worker swarm** using multi-agent runtime techniques from `references/runtime-techniques-basis.md`: a user states a goal that benefits from parallel work; the supervisor (a model-driven step) decomposes it into typed subtasks with dependencies and records a **delegation ledger**; once approved, the decomposition is frozen into a **`swarm_plan_artifact`**; a **no-progress breaker** stops handoff/delegation drift; an approval gate fires before any side-effecting swarm; the dispatcher spawns subagents up to a concurrency limit; each subagent runs the phase-04 harnessed loop in isolation with scoped capability grants; the dispatcher streams per-subagent status; on completion (including partial failure) the supervisor performs fan-in synthesis with verifier/partial-failure honesty tied to the original goal; per-worker and swarm **run receipts** persist. The swarm run, subagent runs, and steps persist and resume after restart — resume replays execution from the frozen `swarm_plan_artifact` rather than re-invoking the supervisor for a fresh (and possibly different) decomposition.

Required runtime contracts (extend the phase-04 store; add a migration):

- `swarm_run`: id, session id, parent agent run id, goal text, decomposition plan, concurrency limit, delegation ledger, no-progress breaker state, status (`planning`/`awaiting_approval`/`running`/`synthesizing`/`completed`/`failed`/`partial`/`cancelled`), aggregation/synthesis output, cancellation state, schema version.
- `swarm_plan_artifact`: versioned, frozen snapshot of the approved decomposition (goal, ordered `subtask_spec` list with dependencies, assignees, retry policy) written once at `awaiting_approval`; restart/resume replays execution from this artifact instead of calling the supervisor again.
- `delegation_ledger`: ordered handoff records with worker id, subtask id, typed result schema reference, and trace link.
- `subtask_spec`: id, swarm id, typed objective, inputs, dependency ids, and assigned tool/MCP scope.
- `subagent_run`: id, swarm id, subtask id, isolated context reference, status (`queued`/`running`/`completed`/`failed`/`blocked`/`cancelled`), retry count, output summary, and trace link to its own `agent_run`/`agent_step` records.
- `aggregation_record`: swarm id, per-subagent inputs to fan-in, partial-failure notes, and the supervisor synthesis.

Product-proof contract for this phase:

- Named product loop: Swarm Dispatch and Synthesis.
- User/operator action: send a goal that needs parallel work; watch the supervisor decompose it; approve a side-effecting swarm; see multiple subagents run concurrently with live status; read the synthesized goal-tied answer; expand any subagent's independent trace; reload and confirm the swarm run, subagent runs, and aggregation persisted.
- Named output/state: persisted `swarm_run`, the frozen `swarm_plan_artifact`, ordered `subtask_spec` records, per-worker `subagent_run` records linked to their own `agent_run`/`agent_step` traces, the `aggregation_record` fan-in, approval/cancellation state, and the inline swarm-panel state attached to the supervisor message.
- Failure modes that must produce honest product-visible states: a subagent fails or times out (swarm continues, partial-failure synthesis is honest about gaps), all subagents fail (honest failed state, no fabricated answer), concurrency limit reached (queueing visible, not dropped work), whole-swarm cancellation (in-flight subagents cancelled, state persisted as `cancelled`), single-subagent cancellation, and persistence failure.
- Concrete proof artifact: `.buildprint/evidence-phase-05.md` with an API/browser transcript and timing evidence proving the subagents ran **concurrently** (overlapping start/finish timestamps, not strictly sequential), at least one injected partial failure handled honestly, the supervisor fan-in synthesis tied to the goal, cancellation behavior, and persisted readback after restart. It must contain `OutcomeAlignmentEvidence` mapping the confirmed goal and acceptance criteria to the decomposition, worker outputs, fan-in synthesis, and any criteria left blocked by partial failure.
- Claim-gate artifact: `.buildprint/claim-gates.json` must include `agentic_swarm.status = pass` before this phase may raise the maturity claim. The gate must cite `SwarmConcurrencyEvidence`, `WorkerIsolationEvidence`, fan-in synthesis evidence, partial-failure evidence, cancellation evidence, UI state evidence, and `SwarmRestartEvidence`.

Required surface behavior:

- The parallel-execution proof must be real: include overlapping per-subagent timestamps in the trace; sequential execution presented as a swarm fails the phase.
- A side-effecting swarm must block on an approval gate before any subagent with `write`/`external` scope runs.
- Each subagent must have an isolated context and a scoped tool/MCP allowlist; a worker must not silently inherit unscoped global access.
- The supervisor synthesis must reference the subtasks and be tied to the original goal, not a generic concatenation of worker outputs.
- The inline swarm panel must show queued/running/completed/failed/cancelled per worker without log parsing, and stay subordinate to the conversation thread.

## DO NOT

- Do not run subagents sequentially and call it a swarm; prove real concurrency with overlapping timestamps.
- Do not fabricate or mock subagent work; each worker runs the real phase-04 loop.
- Do not give workers unscoped global tool/MCP access; scope per subtask.
- Do not skip the approval gate for side-effecting swarms.
- Do not hide partial failures behind a confident synthesis; report what failed.
- Do not let the swarm UI become a task dashboard/kanban that displaces the chat thread.
- Do not regress the phase-04 single-agent loop or the streaming foundation.
- Do not re-invoke the supervisor for a fresh decomposition on restart/resume; replay the frozen `swarm_plan_artifact` so the task graph is deterministic and auditable across restarts.
- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only swarm surfaces.
- Do not create functionless buttons, inert worker rows, swallowed errors, or fake progress in the swarm panel.
- Do not count mocked/sample data or fabricated subagent output as proof for real concurrent execution, persistence, or synthesis.
- Do not mark this phase complete from code edits or prose alone.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Prove the frozen decomposition and fan-in synthesis serve the confirmed representative goal; record `OutcomeAlignmentEvidence` rather than treating generic parallel execution as user-outcome proof.
- Prove via timestamps that at least two subagents ran concurrently under the concurrency limit.
- Prove the supervisor decomposed the goal into typed subtasks and synthesized a goal-tied answer from the fan-in.
- Prove an injected subagent failure produced honest partial-failure synthesis, not a fabricated complete answer.
- Prove approval-gated dispatch for a side-effecting swarm, and both whole-swarm and single-subagent cancellation.
- Prove each subagent had isolated context and scoped tool access.
- Prove `swarm_run`, `subtask_spec`, `subagent_run`, and `aggregation_record` persist and read back after restart.
- Prove resume replays from the frozen `swarm_plan_artifact` rather than re-invoking the supervisor, or record blockers.
- Prove `delegation_ledger` and no-progress breaker behavior, or record blockers.
- Prove per-worker and swarm-level run receipts, or record blockers.
- Produce or update `.buildprint/claim-gates.json` and `.buildprint/claim-check.md`; if the swarm gate is missing, blocked, or has sequential timestamps, keep `agentic_swarm` unqualified.
- Capture screenshot/browser/API evidence for the decomposition, awaiting-approval, concurrent-running, partial-failure, and synthesized states.
- Record any blocker with the exact missing dependency, credential, command, or decision.

## Handoff note

Write what was built, the concurrency primitive and limit, the decomposition/dispatch/fan-in proof, the concurrency-timestamp evidence, the approval and cancellation proofs, the isolation/scoping proof, partial-failure handling, persisted readback evidence, the highest honest claim (`agentic_swarm` proven or blocked), and which capabilities remain genuinely deferred per `EXTENSIONS.md` (distributed/remote workers, multi-tenant, public hosting).
