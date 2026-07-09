# Phase 02 - Runner and Trace Core

## Objective

Implement the core scenario runner and trace collection without depending on optional profiles.

## Required inputs

- phase 01 contracts
- host test runner command
- chat runtime adapter target
- artifact directory convention

## Runner pipeline

1. Load scenario fixtures.
2. Validate scenario schema and version.
3. Create `EvalRun` with host commit, config, and profile list.
4. Initialize trace collector.
5. Start the host chat runtime adapter.
6. Send recorded user turns or simulated user turns.
7. Capture model, provider, tool, state, and final response spans.
8. Run deterministic scorers.
9. Run approved model-judge scorers if enabled.
10. Append `EvalArchiveEvent` to archive (pass and fail).
11. Update `last-green.json` when all regression gates pass.
12. Write trace artifacts, scores, and receipt draft.

## Trace rules

- Preserve event order.
- Include timestamps and status.
- Store large/private inputs by reference when possible.
- Redact secrets and raw sensitive data by default.
- Record errors as spans, not only thrown exceptions.
- Keep enough data to debug a failed score without rerunning live models.
- Emit OTel-compatible trace JSON when the host supports it; otherwise host-neutral JSON spans.
- Write `failure_record` triad on gate failure for archive and receipt.

## Archive rules

- Append every run to `.buildprint/eval-archive/events.jsonl` (or SQLite equivalent).
- Include `scenario_split`, gate results, trace summary, cost, latency, timestamp.
- Maintain `last-green.json` for regression diff baseline.
- Never delete failed runs from archive during normal operation.

## First scenarios

Implement at least:

- `core-chat/basic-task`: user goal, multi-turn response, final answer
- `core-chat/blocked-question`: missing input causes agent to ask or block honestly
- `core-chat/error-recovery`: model/tool/runtime error produces retry, fallback, or honest stop

When the host exposes a stateful harness, add at least one:

- `harness-runtime/cancel-mid-tool`: cancellation leaves valid transcript with dangling-tool repair before next model call
- `harness-runtime/steering-queue`: steering message injected during active run without second concurrent loop

When the host exposes governance hooks, add at least one:

- `security-governance/injection-blocked`: untrusted retrieved context cannot trigger forbidden tool
- `security-governance/hitl-side-effect`: side-effecting action pauses for approval before execution

If the host cannot support optional scenarios, write blockers and claim ceiling.

## Model determinism

Prefer fixture, stub, or low-temperature deterministic mode for regression. If live models are required, record:

- model id
- provider
- temperature/config
- prompt/version
- retry policy
- allowed flake threshold

## Proof before moving on

- runner command executes at least one scenario
- trace file is written
- archive event appended for the run
- receipt draft is written
- failing scenario can produce a failed score and failure record
- private data and secrets are not written in raw logs by default
