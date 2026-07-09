# Phase 01 - Contract and Config

## Objective

Define the harness boundary, schemas, config, and safety defaults before implementing scenario execution.

## Required inputs

- `.buildprint/host-assessment.md`
- `.buildprint/capability-plan.md`
- `.buildprint/agentic-chat-eval-plan.md`
- `.buildprint/agentic-chat-eval-safety-plan.md`
- `references/runtime-techniques-basis.md`
- `references/eval-control-plane-basis.md`
- `references/eval-spec-and-dataset-guide.md`

## Required outputs

- typed or schema-validated `Scenario`
- typed or schema-validated `TraceSpan`
- typed or schema-validated `EvalRun`
- typed or schema-validated `ScoreResult`
- typed or schema-validated `EvalReceipt`
- typed or schema-validated `EvalArchiveEvent`
- typed or schema-validated `FailureRecord`
- typed or schema-validated `ConsoleConfig`
- profile configuration
- model-judge configuration disabled by default unless approved
- safe tool/action mode configuration
- artifact directory convention
- eval archive directory convention (default `.buildprint/eval-archive/`)
- regression command placeholder wired to real runner once implemented

## Scenario contract

Each scenario must include:

- `id`
- `version`
- `profile`
- `scenario_split` (`train`, `validation`, `holdout`, `redteam`, `regression`, `core`, `edge`, `negative`)
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

## Eval archive contract

Each `EvalArchiveEvent` must include:

- `run_id`
- `parent_run_id` (null for first run of a scenario lineage)
- `scenario_id`
- `scenario_version`
- `host_commit`
- `profile`
- `scenario_split`
- `gate_results` (map of gate id → pass/fail/not-applicable)
- `aggregate_pass_fail`
- `trace_summary` (span count, key span types, error count)
- `failure_record` (see below; null on clean pass)
- `cost` and `latency` (or explicit unavailable)
- `timestamp`
- `model_versions` when live models used

Append every run to the archive — pass and fail. Storage: JSONL or SQLite under `.buildprint/eval-archive/` (host choice).

Maintain `last-green.json` pointing to the most recent all-gates-pass run per regression manifest baseline.

## Failure record contract

When a run fails a gate, write a `FailureRecord` triad:

- `verifier_outcome` — gate id, result, assertion message
- `agent_behavior_from_trace` — ordered span summary or tool/action excerpt
- `abstract_failure_mechanism` — root cause class (e.g. `fake_completion`, `injection_bypass`, `missing_repair_span`, `forbidden_tool_called`)

Include failure records in receipt `failure_records` and archive `failure_record`.

## Console config contract

Define `ConsoleConfig` with:

- `archive_directory` (default `.buildprint/eval-archive/`)
- `events_file` (default `events.jsonl`)
- `last_green_file` (default `last-green.json`)
- `evidence_directory` (default `.buildprint/eval-console-evidence/`)
- `host_path` — how the console is served (Next.js route, Vite dev server, static HTML)
- `port` when applicable
- `redaction_policy` — local and redacted by default

Console reads archive and receipt artifacts; it does not override deterministic gates.

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

- scenario, trace, score, receipt, archive, and console config contracts are visible
- scenario_split values are documented per fixture
- enabled/disabled profiles are explicit
- safety config defaults to local/sandbox behavior
- no runner executes real tools before safe mode exists
