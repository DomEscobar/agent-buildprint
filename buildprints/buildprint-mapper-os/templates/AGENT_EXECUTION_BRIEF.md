# Agent Execution Brief

Purpose: this is the first file a coding agent reads before implementing the Buildprint. Keep it short, operational, and high-attention.

## Mission

Build the selected production-grade scope described by this Buildprint. Scope may be limited, but every included capability must be real, wired, persistent where relevant, and QA-tested.

## Read order

1. `AGENT_EXECUTION_BRIEF.md` — mission, constraints, phase gates.
2. `agent-contract.xml` — strict MUST / MUST NOT / STOP rules.
3. `CURRENT_STATE.md` — current phase, completed work, blockers.
4. `BUILDPRINT.md` — product purpose, scope, architecture, boundaries.
5. `SPEC.md` — behavior and user/system requirements.
6. `CONTRACTS.md` — schemas, APIs, data, providers, jobs, side effects.
7. `IMPLEMENTATION_COMPLETENESS.md` — no-fake implementation contract.
8. `TEST_MATRIX.md` / `HEAD_TO_FOOT_QA.md` — proof gates and QA journeys.

Do not read optional/deep files until the phase requires them.

## Hard constraints

- MUST implement included capabilities end-to-end.
- MUST cut or block capabilities that cannot be real; do not fake them.
- MUST NOT count mocks, fixtures, skeleton adapters, fake success states, no-op controls, placeholder routes, or in-memory-only stores as product implementation.
- MUST persist product data through a durable adapter if persistence is claimed.
- MUST update `CURRENT_STATE.md` after each phase.
- MUST run the required verification gates before claiming done.
- MUST report evidence, commands, artifacts, and blockers.

## Phase gates

| Phase | Goal | Exit gate |
|---|---|---|
| 0 | Load contract and current state | Read order complete; active constraints copied into working notes |
| 1 | Scaffold selected scope | Routes/modules/files exist; no placeholder routes or fake controls |
| 2 | Implement data/contracts | Schemas/API/contracts validated; persistence path selected if needed |
| 3 | Implement product behavior | Included capabilities perform real state changes/side effects |
| 4 | Hardening | Error, empty, loading, retry/cancel/idempotency behavior covered where relevant |
| 5 | Verification | tests/build/runtime QA/no-fake scan pass or blockers written |
| 6 | Final report | evidence summary and remaining gaps written |

Do not advance a phase until its exit gate is met or a blocker is recorded.

## Stop conditions

STOP and ask or report blocked if:

- required provider credentials are missing for an included live provider,
- a required feature would need to be mocked to continue,
- persistence is claimed but no durable adapter can be used,
- a primary route/control cannot be made real,
- tests/build/runtime QA cannot run,
- the Buildprint contradicts itself.

## Final report format

```md
# Implementation Report

## Result
PASS / BLOCKED / FAILED

## Commands run
- ...

## Evidence
- tests:
- build:
- runtime URL:
- screenshots/artifacts:
- persistence/restart proof:
- no-fake scan:

## Included capabilities completed
- ...

## Excluded capabilities
- ...

## Blockers / remaining gaps
- ...
```
