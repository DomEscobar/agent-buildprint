# Phase 05 - Verification, Regression, and Receipt

## Objective

Prove the harness can be rerun, fails honestly, and leaves a durable receipt.

## Required inputs

- completed phases 01-04 and 06
- enabled profile scenarios
- host validation commands
- `.buildprint/agentic-chat-eval-plan.md`
- `.buildprint/agentic-chat-eval-safety-plan.md`

## Regression command

Add one command that can be run by future agents, for example:

```text
npm run eval:agentic-chat
pytest tests/evals/test_agentic_chat.py
python scripts/run_agentic_chat_evals.py
```

The exact command must match host conventions.

## Negative proof

Prove at least one failure path:

- wrong expected tool call fails
- missing side-effect receipt fails
- missing trace span fails
- forbidden tool call fails
- missing citation fails when RAG profile is enabled
- fake UI success fails when UI profile is enabled
- injection bypass fails when security-governance profile is enabled
- missing dangling-tool repair fails when harness-runtime profile is enabled
- side effect without HITL pause fails when security-governance profile is enabled

Do not rely only on happy-path passing scenarios.

## Console proof

When claiming `runtime` or higher:

- Run Explorer lists real archive events from host runs
- Trace Timeline renders spans from at least one completed scenario
- Gate Failure Panel shows failure record triad for at least one negative proof case
- Regression Diff compares a run against `last-green` baseline
- Negative Proof Runner (UI or CLI + screenshots) replays at least one pinned failure scenario
- Screenshot evidence in `.buildprint/eval-console-evidence/`:
  - `run-detail.png`
  - `gate-failure.png`
  - `regression-diff.png`

If console cannot be built, record explicit blocker and cap claim at `fixture` or below.

## Receipt

Write `.buildprint/agentic-chat-eval-receipt.md` with:

- files changed
- commands run
- scenarios run
- profiles enabled
- profiles not proven
- artifacts written
- score summary
- deterministic failures tested
- model-judge policy and provider use
- trajectory-level scorer policy if enabled
- adversarial case library version if security-governance profile is enabled
- archive path and console URL
- last-green baseline reference
- failure records (verifier outcome, agent behavior, abstract mechanism)
- privacy/sandbox decisions
- remaining risks
- blocked items
- exact claim status: installed, partial, or blocked

Mirror or link the same final proof at `.buildprint/capability-receipt.md` for generic Capability Buildprint tooling.

## Claim levels

- `structure`: schemas and plan exist, runner not proven
- `fixture`: runner works on fixture/stub runtime
- `runtime`: runner works against host runtime in safe mode
- `profile-proven`: named profile has runtime proof
- `production-regression`: CI or repeatable command proves selected production-critical scenarios

Do not claim higher than the weakest required proof artifact.

## Proof before moving on

- regression command runs or blocker is explicit
- receipt exists with archive path and console URL
- at least one negative proof is recorded
- console proof artifacts exist or explicit console blocker is recorded
- every enabled profile has pass/fail result or blocker
- every host-assessment blocker and hard-stop answer is reconciled
