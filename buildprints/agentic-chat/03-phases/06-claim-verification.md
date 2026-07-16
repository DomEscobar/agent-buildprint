# Phase 06 - Claim Verification

This phase is the anti-overclaim gate for Agentic Chat. It does not add new product scope; it proves or lowers the claims from phases 04 and 05. If this phase is skipped, missing, or prose-only, the highest honest claim is at most `streaming_chat_core`.

## How to implement this phase

Before claiming completion, read:

- `references/runtime-techniques-basis.md`
- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md` if it exists
- current project `AGENTS.md` if it exists
- `BUILDPRINT.md`
- `01-project-setup.md`
- `02-ui-identity.md` as the standing UI identity and user-language responsibility for every UI-bearing artifact
- `.buildprint/evidence-phase-04.md`
- `.buildprint/evidence-phase-05.md`
- `.buildprint/ui-evidence.md`
- `.buildprint/artifact-check.md`
- the persisted trace/readback export for agent and swarm runs
- `HANDOVER.md`
- `03-phases/04-agentic-loop-runtime.md`
- `03-phases/05-swarm-dispatching.md`
- `blueprint.yaml` (`execution_model`, `capability_maturity`, and `central_output_contract`)

Then create `.buildprint/claim-gates.json` and `.buildprint/claim-check.md`. The JSON is the machine-readable verdict. The Markdown explains the evidence in human terms. Both must cite real files, commands, browser/API transcripts, timestamps, screenshot paths, persisted record ids, and the confirmed User Intent Contract version used by each live scenario.

## Building objective

Every phase must keep `02-ui-identity.md` and the generated local UI identity open as the product comprehension, visual identity, and user-language contract. Even verification work changes what the user sees through states, copy, blockers, reports, detail views, or controls; preserve the generated identity unless the artifact is explicitly marked `not-ui-bearing`.

Compute the highest honest Agentic Chat claim from runtime evidence, not from UI ambition or builder confidence. The smallest complete product path is: inspect the streaming proof, inspect the phase-04 action-loop proof, inspect the phase-05 swarm proof, validate the evidence artifacts and persisted readbacks, compare product claims against the computed claim, lower any unsupported UI/README/HANDOVER claim, and leave a concrete next verification run for every blocked level.

Product-proof contract for this phase:

- Named product loop: Claim Verification And Maturity Ceiling.
- User/operator action: open the evidence package, run or inspect the claim checker, compare the computed highest honest claim against the product UI and handover, and see unsupported claims lowered or blocked with exact evidence ids.
- Named output/state: `.buildprint/claim-gates.json`, `.buildprint/claim-check.md`, final `highest_honest_claim`, hard-failure list, cited evidence ids, lowered-claim notes, and handover claim status.
- Failure modes: missing evidence files, prose-only proof, non-existent screenshot/transcript paths, slash-command/keyword/regex action routing, non-reingested action results, side effects before approval, sequential subagents relabeled as parallel, unscoped worker access, missing restart readback, UI claims above the computed maturity, placeholders, functionless buttons, or mocked/sample data counted as real runtime proof must prevent a higher maturity claim.
- Concrete proof artifact: `.buildprint/claim-gates.json` plus `.buildprint/claim-check.md`, with cited browser/API transcripts, commands, screenshots, persisted record ids, restart/readback evidence, and every hard failure named.

## Required claim-gate JSON shape

`.buildprint/claim-gates.json` must contain:

```json
{
  "schema_version": "agentic-chat/claim-gates/v1",
  "checked_at": "<iso timestamp>",
  "highest_honest_claim": "streaming_chat_core | agentic_chat | agentic_swarm",
  "streaming_chat_core": {
    "status": "pass | fail | blocked",
    "outcome_alignment": "<OutcomeAlignmentEvidence id>",
    "evidence": ["<file/path#line-or-record-id>"]
  },
  "agentic_chat": {
    "status": "pass | fail | blocked",
    "stateful_harness_and_steering": "<pass/fail/blocker>",
    "cancellation_and_dangling_tool_repair": "<evidence id>",
    "context_packing_and_trust_zones": "<evidence id>",
    "action_screening_against_user_intent": "<evidence id>",
    "scoped_capability_grants": "<evidence id>",
    "runtime_budget_policy": "<evidence id>",
    "single_run_level_budget_invariant": "<evidence id>",
    "loop_breaker_or_no_progress_stop": "<evidence id>",
    "verifier_or_goal_done_check": "<evidence id>",
    "run_receipt_export": "<evidence id>",
    "session_event_log_readback": "<evidence id>",
    "idempotency_on_write_external_effects": "<evidence id>",
    "model_driven_action_selection": "<pass/fail/blocker>",
    "provider_tool_call_or_normalized_action_trace": "<evidence id>",
    "self_implemented_tool_or_mcp_evidence": "<evidence id citing authored file/module>",
    "live_provider_connection_not_test_double": "<evidence id>",
    "no_slash_keyword_or_regex_intent_routing": "<evidence id>",
    "approval_or_block_before_side_effect": "<evidence id>",
    "typed_execution_result": "<evidence id>",
    "observation_reingested_into_next_model_step": "<evidence id>",
    "critique_retry_or_recovery": "<evidence id>",
    "persisted_restart_readback": "<evidence id>",
    "ui_state_evidence": "<screenshot/source evidence id>",
    "outcome_alignment": "<OutcomeAlignmentEvidence id>",
    "hard_failures": []
  },
  "agentic_swarm": {
    "status": "pass | fail | blocked",
    "delegation_ledger": "<evidence id>",
    "no_progress_breaker": "<evidence id>",
    "frozen_plan_artifact_replay": "<evidence id>",
    "per_worker_run_receipts": "<evidence id>",
    "supervisor_decomposition": "<evidence id>",
    "bounded_concurrency_primitive": "<evidence id>",
    "overlapping_subagent_timestamps": "<evidence id>",
    "isolated_worker_contexts": "<evidence id>",
    "scoped_worker_tool_access": "<evidence id>",
    "fan_in_synthesis_tied_to_goal": "<evidence id>",
    "partial_failure_handling": "<evidence id>",
    "approval_before_side_effecting_dispatch": "<evidence id>",
    "cancellation": "<evidence id>",
    "persisted_restart_readback": "<evidence id>",
    "ui_state_evidence": "<screenshot/source evidence id>",
    "outcome_alignment": "<OutcomeAlignmentEvidence id>",
    "hard_failures": []
  }
}
```

If an evidence field cannot cite a concrete artifact, set the level to `blocked` or `fail` and lower `highest_honest_claim`.

## Agentic chat hard gate

`agentic_chat` passes only when the evidence proves all of the following:

- The model selected the action through provider-native tool/function calling or a normalized model action record. User-typed slash commands, keyword matching, regex intent routing, button-only action selection, or deterministic shortcut code fail this gate.
- The trace contains an `ActionSelectionEvidence` record with: model/provider request id, model/provider response id or normalized action id, selected tool/skill/MCP/memory id, typed arguments, model rationale or tool-call payload, originating message id, policy result, approval requirement, and side-effect class.
- The trace contains `SelfImplementedActionEvidence`: at least one tool/skill/MCP server was authored or wired by the building agent itself during this build, with a citable file/module reference — an assumed pre-existing/external capability alone does not satisfy this gate.
- The action-selection proof trace was captured against a live, real-running provider connection (local model runtime or paid provider actually invoked), not the deterministic test double.
- The trace contains harness, budget, loop-breaker, verifier, run receipt, and session-event evidence, or the gate records exact blockers.
- The budget policy enforces a single run-level invariant: model, tool, verifier/consensus, and subagent/delegation spend all count against one budget, not separate, bypassable sub-budgets.
- At least one side-effecting action is denied or left unapproved and the proof shows no side effect executed. A UI card saying "approval required" is insufficient without the audit result.
- At least one allowed action produces a typed `ActionResult` and the result is fed back into the next model step as an observation. The final answer must reflect that observation; a scripted local append does not count.
- The trace contains bounded critique/retry/recovery for one failure or blocked action.
- `agent_run`, ordered `agent_step`, `action_request`, `policy_result`, `approval_record` when applicable, `action_result`, `agent_trace`, `session_event` log, and `run_receipt` read back after reload or process restart with the same ids/order.
- The UI evidence shows the plan/next-step, approval/block, action result, observation, retry/recovery, and restored trace in a chat-native surface.
- `OutcomeAlignmentEvidence` proves the trace began with the confirmed representative goal, the verifier evaluated its stated acceptance criteria, and the final synthesis either met them or names the exact unmet criterion/blocker.

Hard failures that force `agentic_chat.status = fail`:

- missing stateful harness boundary or steering queue when runs are interactive
- dangling tool calls not repaired after cancellation before the next model step
- missing runtime budget policy or loop breaker on multi-step runs
- final synthesis without verifier pass or honest typed blocker
- missing run receipt or session-event readback
- budget policy is fragmented into separate per-feature (tool/verifier/subagent) budgets that let total spend exceed the configured run-level ceiling
- no tool/skill/MCP server was implemented or wired by the building agent — only an assumed pre-existing/external capability, prose, or a config reference is offered as proof
- the action-selection proof trace used the deterministic test double instead of a live, real-running provider connection
- action selection is slash-command, keyword, regex, or button-only
- model text implicitly triggers side effects
- action execution occurs before approval for `write` or `external` side effects
- tool/MCP/memory output is not re-ingested into the next model step
- evidence uses sample/mock-only data while claiming a real runtime path
- persisted trace readback is missing
- the UI advertises agentic behavior but only a streaming chat path is proven
- the trace proves a generic tool demo but cannot tie its final result to the confirmed User Intent Contract and acceptance criteria

## Swarm hard gate

`agentic_swarm` passes only when the evidence proves all of the following:

- A supervisor model step decomposes the original goal into typed subtasks with dependency and scope metadata.
- A real bounded concurrency primitive dispatches subagents. At least two `subagent_run` records must have overlapping `started_at`/`finished_at` intervals under the configured concurrency limit.
- Each worker has its own subagent run id, isolated context reference, scoped tool/MCP allowlist, and independent trace linked back to the parent swarm.
- Queueing is visible when the number of subtasks exceeds the concurrency limit.
- A side-effecting swarm blocks before dispatch until approved; denied or missing approval leaves all side-effecting workers unstarted.
- The fan-in `AggregationRecord` cites each worker output, records any failed/blocked worker, and the supervisor synthesis is tied to the original user goal.
- At least one injected worker failure or timeout produces honest partial-failure synthesis instead of a fabricated complete answer.
- Whole-swarm cancellation and single-worker cancellation are proven or explicitly blocked with exact missing runtime support.
- Restart/resume replays execution from a frozen `swarm_plan_artifact` rather than re-invoking the supervisor for a fresh decomposition.
- `swarm_run`, `swarm_plan_artifact`, `subtask_spec`, `subagent_run`, per-worker `agent_run`/`agent_step`, and `aggregation_record` read back after reload or restart.
- The UI evidence shows the compact inline swarm panel, worker status, failure/partial state, cancellation, synthesis, and restored run in the conversation context.
- `OutcomeAlignmentEvidence` ties the frozen decomposition, worker outputs, and supervisor synthesis back to the same confirmed goal and records acceptance criteria affected by partial failure.

Hard failures that force `agentic_swarm.status = fail`:

- subagents are sequential awaits relabeled as parallel
- worker output is fabricated or copied from fixture/sample data
- all workers share one unscoped context or global tool set
- supervisor synthesis is only concatenated worker text
- partial worker failure is hidden
- concurrency timestamps are missing or strictly sequential
- persisted swarm readback is missing
- restart/resume re-invokes the supervisor for a new decomposition instead of replaying the frozen `swarm_plan_artifact`
- the UI advertises swarm behavior while only a single-agent loop is proven
- the swarm only proves generic parallelism and cannot show how its synthesis satisfies the confirmed user outcome

## DO NOT

- Do not call a streaming-only chat product `agentic_chat`.
- Do not call a single-agent action loop `agentic_swarm`.
- Do not accept placeholders, lorem ipsum, empty wrappers, decorative-only surfaces, functionless buttons, inert navigation, swallowed errors, or fake progress as proof.
- Do not count mocked/sample data as proof for real input, live provider, persistence, action execution, swarm concurrency, or operator paths.
- Do not pass model-driven action selection when the product uses slash commands, keyword matching, regex intent parsing, button-only triggers, or deterministic shortcuts.
- Do not pass agentic action execution when the action result is not fed back into a next model step.
- Do not pass side-effecting tools, MCP calls, memory writes, or swarm dispatches that execute before approval.
- Do not pass swarm dispatch when subagents ran sequentially, share unscoped context, inherit global tool access, or fabricate worker output.
- Do not use screenshots, config files, SDK imports, UI labels, or prose to override missing trace/readback evidence.
- Do not mark this phase complete from code edits or prose alone.

## Verification behavior

The checker must derive `highest_honest_claim`; builders do not choose it manually.

- If `streaming_chat_core` passes and higher gates are missing, set `highest_honest_claim = streaming_chat_core`.
- If `agentic_chat` passes and `agentic_swarm` is missing or blocked, set `highest_honest_claim = agentic_chat`.
- If all three gates pass, set `highest_honest_claim = agentic_swarm`.
- If the UI, README, metadata, or handover claims a higher level than `highest_honest_claim`, this phase fails until the product claim is lowered or the missing proof is captured.

## Minimum proof before moving on

- `.buildprint/claim-gates.json` exists, validates as JSON, and cites concrete evidence for every passing field.
- `.buildprint/claim-check.md` summarizes pass/fail/blocker status per maturity level and names every hard failure.
- `HANDOVER.md` uses the same `highest_honest_claim` as `.buildprint/claim-gates.json`.
- Screenshots and transcripts referenced by the gate exist.
- Every passing level cites `OutcomeAlignmentEvidence`; otherwise it is blocked even if its technical trace exists.
- Restart/readback evidence exists for every passed level.
- The final critical review phase consumes this gate and does not override it with prose confidence.

## Handoff note

Write the computed `highest_honest_claim`, each failed or blocked gate, the exact evidence artifacts that justified passing gates, any UI/README/metadata claims lowered by this check, and the smallest next verification run needed to lift the claim.
