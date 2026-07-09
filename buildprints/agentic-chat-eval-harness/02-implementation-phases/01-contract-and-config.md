# Phase 01 - Contract and Config

## Objective

Define the harness boundary, schemas, config, and safety defaults before implementing scenario execution.

## Required inputs

- `.buildprint/host-assessment.md`
- `.buildprint/capability-plan.md`
- `.buildprint/agentic-chat-eval-plan.md`
- `.buildprint/agentic-chat-eval-safety-plan.md`
- `references/runtime-techniques-basis.md`

## Required outputs

- typed or schema-validated `Scenario`
- typed or schema-validated `TraceSpan`
- typed or schema-validated `EvalRun`
- typed or schema-validated `ScoreResult`
- typed or schema-validated `EvalReceipt`
- profile configuration
- model-judge configuration disabled by default unless approved
- safe tool/action mode configuration
- artifact directory convention
- regression command placeholder wired to real runner once implemented

## Scenario contract

Each scenario must include:

- `id`
- `version`
- `profile`
- `title`
- `risk_level`
- `starting_state`
- `user_goal`
- `turns` or simulated user policy
- `allowed_tools`
- `forbidden_tools`
- `expected_trace_events`
- `expected_tool_calls`
- `expected_state_diff`
- `expected_user_visible_result`
- `pass_gates`
- `claim_ceiling`
- `runtime_technique_tags` (optional list mapping scenario to agentic-runtime-techniques entries, e.g. `Offline Regression Eval Loop`, `Interrupted Tool-Call Repair`)

## Trace contract

Spans must represent at least:

- user turn received
- model call
- provider routing decision
- tool/action call
- tool/action result
- state or memory write
- retrieval event when RAG profile is enabled
- UI event when UI profile is enabled
- final assistant response
- scorer result

When `harness-runtime` profile is enabled, spans must also support:

- `turn_start` / `turn_end` or equivalent
- `queue_update` (steering or follow-up)
- `cancellation` with reason
- `tool_call_repair` (synthetic failed results for dangling tool calls)
- `session_event` (append-only log entry type when host uses durable session logs)

When `security-governance` profile is enabled, spans must also support:

- `action_screening` (allow/block/escalate with trust-zone metadata)
- `hitl_interrupt` / `hitl_resume`
- `capability_grant` / `capability_revoke`
- `budget_warn` / `budget_exhausted`
- `loop_breaker` or `no_progress_stop`

When provenance is available, spans or linked records must support:

- `provenance_edge` from claim/artifact to source/tool/observation id

Every span must be linkable to a `run_id`, `scenario_id`, and parent span when nested.

## Scorer contract

Define two scorer classes:

- deterministic scorers: exact assertions over trace, state, tool results, citations, screenshots, DOM, receipts, session replay, and provenance edges
- model-judge scorers: rubric-bound semantic checks with examples and explicit claim ceiling
- trajectory-level scorers (optional): grade full tool-integrated trajectories end to end; advisory only; record score separately from deterministic gates

Deterministic high-risk failures must override model-judge and trajectory-level passes.

## Safety defaults

- destructive tools disabled
- external model judges disabled
- private transcript export disabled
- RAG profile disabled unless in scope
- harness-runtime profile disabled unless host exposes harness events or session log replay
- security-governance profile disabled unless host exposes screening, HITL, or capability hooks
- UI profile disabled unless proof tooling exists
- receipts local and redacted by default

## Proof before moving on

- scenario, trace, score, and receipt contracts are visible
- enabled/disabled profiles are explicit
- safety config defaults to local/sandbox behavior
- no runner executes real tools before safe mode exists
