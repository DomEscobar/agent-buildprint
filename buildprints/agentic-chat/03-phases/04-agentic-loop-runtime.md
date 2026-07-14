# Phase 04 - Agentic Loop Runtime

## How to implement this phase

Before writing code, read:

- `references/runtime-techniques-basis.md`
- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md` if it exists
- current project `AGENTS.md` if it exists
- `BUILDPRINT.md`
- `01-project-setup.md`
- `architecture/agent-runtime-loop.md`, `architecture/state-and-memory-model.md`, `architecture/failure-recovery-flow.md`, `PROJECT_STRUCTURE.md`, and `ARCHITECTURE_STRUCTURE_TRACE.md` from the implementation project
- `02-ui-identity.md` as the standing UI identity and user-language responsibility for every UI-bearing artifact
- `blueprint.yaml`, especially `execution_model`, `capability_maturity`, and `central_output_contract`

Then implement this phase as one coherent product path. Do not split the work into tiny abstract checklist fragments. Understand the objective, build the smallest complete product path that satisfies it, verify it, and only then move on.

This phase is the difference between a strong streaming chat core and a real Agentic Chat. If phases 01 through 03 are missing real streaming, provider routing, persistence, or a qualified chat-native UI, return to the responsible phase first. If setup lacks product-specific architecture diagrams, a responsibility-based project structure, or component-to-code-to-proof traceability, return to `01-project-setup.md` before building the loop. Do not use agentic labels to cover a weak chat foundation.

## Building objective

Every phase must keep `02-ui-identity.md` and the generated local UI identity open as the product comprehension, visual identity, and user-language contract. Even backend, runtime, or verification work changes what the user sees through states, copy, blockers, reports, detail views, or controls; preserve the generated identity unless the artifact is explicitly marked `not-ui-bearing`.

Build the smallest useful **production-grade** Agentic Chat loop on top of the streaming core. The loop shape is **ReAct + stateful harness + plan-and-execute**, not a thin tool-calling wrapper. A user states a goal in the chat; the harness owns transcript, events, steering, and cancellation while the assistant records a plan or next-step state in product language, packs context with trust zones, selects a model/tool/memory/delegation action, screens proposed actions against original intent when untrusted context influenced the model, grants scoped capabilities, passes through policy and approval when the action can have side effects, executes or blocks honestly with idempotency on write/external effects, ingests the observation back into the conversation, respects runtime budgets and loop breakers, critiques or retries on failure, runs a verifier/done-check before final synthesis, emits a run receipt and append-only session events, persists the trace, survives reload/restart, and synthesizes a final answer tied to the original goal with provenance links. If a tool, MCP server, memory store, or subagent runtime is unavailable, build the typed seam and blocked state, not a fake success.

The building agent must implement or wire at least one real tool, skill, or MCP server itself during this phase — a real, working piece of logic the model can select and invoke, not an assumed pre-existing/external capability the agent did not author or configure. This self-implemented action is the live proof target for `ActionSelectionEvidence` and `SelfImplementedActionEvidence`. The proof trace for this phase must run against a live, real-running provider connection (the user-selected default provider, local or paid, actually invoked per `00-questions.md`/`docs/architecture.md`) — the deterministic test double satisfies unit tests only and never the phase-04 product-loop proof.

The runtime implementation must follow the setup architecture packet and `references/runtime-techniques-basis.md`. `architecture/agent-runtime-loop.md` is the source model for harness boundary, observe/plan/act/inspect/critique/verify/retry/continue/stop, budget governor, loop breaker, and action screening. `architecture/state-and-memory-model.md` is the source model for durable records, append-only session events, ephemeral runtime state, context packing, memory decisions, capability grants, and claim ceilings. `architecture/failure-recovery-flow.md` is the source model for retry budgets, approval blocks, budget exhaustion, loop-break stops, unavailable capabilities, cancellation with dangling tool-call repair, and user-visible recovery. If code needs to diverge, update the architecture and `ARCHITECTURE_STRUCTURE_TRACE.md` in the same phase or record architecture drift as a blocker.

Required runtime contracts:

- `agent_harness`: caller-owned transcript, provider-neutral event stream, single-runner invariant, steering/follow-up queue, cancellation token, dangling tool-call repair policy.
- `session_event`: append-only typed entry with sequence, event type, payload reference, and replay participation.
- `budget_policy`: configured limits, consumed amounts, warn/hard-stop events, and UI-safe summaries; enforces one run-level invariant across model, tool, verifier/consensus, and subagent/delegation spend — never fragmented, separately-bypassable sub-budgets.
- `loop_breaker`: repeated-action or no-progress detection with stop reason and last-good checkpoint reference.
- `context_pack`: selected context segments with trust-zone labels, token budget, and compaction provenance.
- `capability_grant`: scoped tools/MCP/data for one action with grant id, expiry, and revocation state.
- `action_screening`: firewall result comparing proposed action to original user intent.
- `verifier_result`: pass/fail/blocker with acceptance criteria reference.
- `run_receipt`: exportable run summary with provenance links and redaction policy.
- `idempotency_key`: key, action id, and execution ledger entry for write/external calls.
- `agent_run`: stable id, session id, originating message id, goal summary, status (`planning`, `awaiting_approval`, `acting`, `observing`, `critiquing`, `completed`, `failed`, `blocked`), current step id, timestamps, and claim level.
- `agent_step`: ordered step records for `goal.received`, `plan.created`, `context.packed`, `action.selected`, `action.screened`, `approval.required`, `capability.granted`, `action.executed`, `observation.received`, `critique.completed`, `budget.warned`, `budget.stopped`, `loop.breaker.triggered`, `verifier.completed`, `retry.scheduled`, `run.completed`, `run.failed`, and `run.blocked`.
- `action_request`: action kind (`model`, `tool`, `skill`, `mcp`, `memory`, `subagent`), side-effect class, input summary, policy result, approval requirement, timeout, and blocked reason when applicable.
- `action_result`: typed success, failure, blocked, or cancelled result with product-safe summary, raw-result storage policy, audit id, and trace link.
- `memory_decision`: scoped read/write/skip/block decision, privacy/retention posture, user-visible explanation, and audit id.
- `delegation_record`: subagent or background-task request, reason, input/output summary, status, trace linkage, and honest claim ceiling.
- `agent_trace`: append-only trace linking session, messages, stream events, provider route, agent run, agent steps, action requests, results, memory decisions, approvals, and telemetry.
- `self_implemented_action`: authored file/module reference, change/commit reference, tool/skill/MCP kind, and proof that the building agent (not a pre-existing external service) authored or wired this capability, linked to the live invocation trace that used it.

Product-proof contract for this phase:

- Named product loop: Agentic Goal-To-Action Loop (Harnessed ReAct).
- User/operator action: enter a concrete goal, inspect the assistant's next-step plan, steer or follow up during an active run, approve/reject/edit one side-effecting action, observe an executed or honestly blocked action result, trigger or inspect budget warn/hard-stop and loop-breaker states, retry or recover from one failure, reload or restart, export or inspect a run receipt, and see the run trace still attached to the conversation.
- Named output/state: persisted `agent_harness` run, `session_event` log, `agent_run`, ordered `agent_step` records, `context_pack`, `capability_grant`, `action_screening`, policy/approval state, typed `action_request`, typed `action_result`, `budget_policy` consumption, `loop_breaker` state when triggered, `verifier_result`, `run_receipt`, `memory_decision` when memory is enabled or blocked, `delegation_record` when delegation is enabled or blocked, and `agent_trace` linked to the session.
- Failure modes: missing harness boundary, no steering queue, unrepaired dangling tool calls after cancel, functionless tool buttons, hidden side effects, implicit execution from model text, fake memory writes, fabricated subagent work, raw MCP output as product UI, missing approval state, missing budget/loop-break surfaces, self-certifying completion without verifier, non-resumable run state, and retry loops without bounded policy must prevent a full Agentic Chat claim.
- Concrete proof artifact: `.buildprint/evidence-phase-04.md` with browser/API transcripts showing goal intake, harness events, plan/next-step state, context packing, action selection over a live real-running provider connection, action screening, scoped capability grant, approval/block path, idempotent write/external execution or honest block, executed or blocked result from the self-implemented tool/skill/MCP server, observation ingestion, budget or loop-break behavior, verifier pass or typed blocker, run receipt export, critique/retry behavior, session-event and trace readback after restart, and claim comparison against the plan-mode baseline.
- Claim-gate artifact: `.buildprint/claim-gates.json` must include `agentic_chat.status = pass` before this phase may raise the maturity claim. The gate must cite `ActionSelectionEvidence`, `SelfImplementedActionEvidence`, `ObservationReingestionEvidence`, harness/steering/cancellation repair evidence, budget or loop-breaker evidence, verifier evidence, run receipt evidence, side-effect denial/no-execution proof, UI state evidence, and `AgenticRestartEvidence`.

Required surface behavior:

- The conversation thread and composer/input remain dominant. Agentic state appears inline, attached to the relevant message, in a drawer, or in a subordinate trace panel; it does not replace chat with a task dashboard.
- The user can tell what the assistant is about to do, what it did, what it refused or could not do, what evidence came back, and what can happen next.
- Side-effecting tool/MCP/delegation actions require explicit policy and approval state before execution; reject/edit branches must be resumable.
- The user can steer an active run through the harness follow-up queue without corrupting transcript order.
- Cancellation must repair dangling tool calls before the next model request.
- Budget warn and hard-stop states must be visible when limits are approached or hit.
- Loop-breaker stops must explain no-progress or repeated-action detection in product language.
- Memory is never a global mystery blob. The UI explains whether memory was read, written, skipped, blocked, or unavailable.
- Subagent/delegation claims require a real delegation record or a blocked state; do not invent background work.
- Retry and recovery are bounded and visible. Infinite hidden retries, silent fallback, or optimistic success UI fail this phase.

This phase should leave a user, operator, or developer with a real path they can trigger, inspect, interrupt, and trust within the stated claim ceiling. The output must be specific to the product contract, not generic generated text, sample cards, raw JSON, or proof prose.

## DO NOT

- Do not call a streaming-only chat product a complete Agentic Chat.
- Do not build a generic chat loop without harness, budget policy, loop breaker, verifier, or run receipt and call it agentic.
- Do not use the deterministic test double as the provider connection for phase-04 product-loop proof; the loop must run over a live, real-running model (local runtime or paid provider, per the user's setup choice).
- Do not claim tool/skill/MCP proof from an assumed pre-existing or third-party capability the building agent did not implement or wire itself; author or configure at least one real one during this phase.
- Do not implement separate, bypassable budgets for tools, verifier/consensus rounds, or subagents that let total spend exceed the configured run-level ceiling; one invariant must cover all sources of spend.
- Do not build the agent loop against an implicit or stale architecture model.
- Do not add broad `utils`, `services`, `lib`, or generic agent folders that are not mapped in `PROJECT_STRUCTURE.md` and `ARCHITECTURE_STRUCTURE_TRACE.md`.
- Do not stub, mock, or advertise tool/skill/MCP/memory/subagent capabilities as working without a typed runtime path and proof.
- Do not let model text implicitly execute side effects.
- Do not hide action policy, approval, blocked, or failure states.
- Do not replace the chat-native interface with a mission sheet, guided-run launcher, task dashboard, status lane, or form-first workflow.
- Do not ship placeholders, lorem ipsum, empty wrappers, or decorative-only surfaces.
- Do not create functionless buttons, inert navigation, swallowed errors, or fake progress.
- Do not count mocked/sample data as proof for real input, live provider, persistence, or operator paths.
- Do not hide missing provider/runtime/tool/MCP/memory/delegation blockers behind optimistic success UI.
- Do not dump raw JSON as the main product experience unless the artifact is explicitly a JSON developer tool.
- Do not mark this phase complete from code edits or prose alone.
- Do not build a generic landing page unless the mapped product is actually a landing-page product.

## Minimum proof before moving on

- Run the relevant build/test/typecheck/runtime command or record why it cannot run.
- Prove the changed runtime files map back to `architecture/agent-runtime-loop.md`, `architecture/state-and-memory-model.md`, `architecture/failure-recovery-flow.md`, `PROJECT_STRUCTURE.md`, and `ARCHITECTURE_STRUCTURE_TRACE.md`; update those files or record architecture drift as a blocker.
- Inspect the full goal-to-action product loop through browser/UI plus API/CLI/runtime where useful, not only source files.
- Prove harness boundary, steering queue, cancellation with dangling tool-call repair, context packing, action screening, scoped capability grants, budget policy, loop breaker, verifier, run receipt, and session-event readback, or record exact blockers that keep `agentic_chat` unqualified.
- Prove the phase-04 action-selection evidence was captured against a live, real-running provider connection, not the deterministic test double, and cite the specific tool/skill/MCP server the building agent implemented or wired itself, with its authored file/module reference (`SelfImplementedActionEvidence`).
- Prove goal intake, plan or next-step state, action selection, policy/approval, execution or honest block, observation ingestion, critique/retry/recovery, resumable state, verifier, and final synthesis.
- Prove at least one side-effecting action blocks or waits for approval without side effects when not approved.
- Prove memory and delegation either work with audit records or block honestly with user-visible explanations.
- Prove the budget policy enforces a single run-level invariant covering model, tool, verifier, and subagent/delegation spend — not a separate, bypassable sub-budget.
- Prove persisted readback for `session_event`, `agent_run`, `agent_step`, `action_request`, `action_result`, `run_receipt`, `agent_trace`, and any memory/delegation records after restart, or record the exact persistence blocker.
- Produce or update `.buildprint/claim-gates.json` and `.buildprint/claim-check.md`; if the agentic gate is missing or blocked, keep `agentic_chat` unqualified.
- Capture screenshot/browser/API/runtime evidence for planning, awaiting approval, acting/observing, blocked/failed, retry/recovery, completed, and restored states.
- Record benchmark evidence comparing the Buildprint-guided result against a normal plan-mode baseline, or record why the benchmark could not run and keep `agentic_chat` unqualified.
- Record any blocker with the exact missing dependency, command, credential, permission, or decision.

## Handoff note

Write the proven maturity level (`streaming_chat_core` or `agentic_chat`), the exact goal-to-action loop surfaces used, architecture/structure files trusted or updated, approval and policy proof, memory/delegation proof or blockers, trace/readback proof, retry/recovery proof, benchmark result against normal plan mode, unresolved blockers, and which final critical-review claims can or cannot be trusted.
