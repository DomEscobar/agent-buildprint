# Phase 01 - Contract and Config

## Objective

Define the harness boundary, schemas, config, and safety defaults before implementing scenario execution.

## Required inputs

- `.buildprint/host-assessment.md`
- `.buildprint/capability-plan.md`
- `.buildprint/agentic-chat-eval-plan.md`
- `.buildprint/agentic-chat-eval-safety-plan.md`

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

Every span must be linkable to a `run_id`, `scenario_id`, and parent span when nested.

## Scorer contract

Define two scorer classes:

- deterministic scorers: exact assertions over trace, state, tool results, citations, screenshots, DOM, or receipts
- model-judge scorers: rubric-bound semantic checks with examples and explicit claim ceiling

Deterministic high-risk failures must override model-judge passes.

## Safety defaults

- destructive tools disabled
- external model judges disabled
- private transcript export disabled
- RAG profile disabled unless in scope
- UI profile disabled unless proof tooling exists
- receipts local and redacted by default

## Proof before moving on

- scenario, trace, score, and receipt contracts are visible
- enabled/disabled profiles are explicit
- safety config defaults to local/sandbox behavior
- no runner executes real tools before safe mode exists
