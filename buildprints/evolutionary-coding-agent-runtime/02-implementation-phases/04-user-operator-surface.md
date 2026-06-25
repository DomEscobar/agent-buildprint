# Phase 04 - User Operator Surface

## Objective

Give the operator a clear way to start, inspect, stop, compare, and apply evolutionary runs.

## How to implement this phase

Add CLI output, web UI, logs, or dashboards appropriate to the host. The surface must show baseline score, candidates, mutation scope, budget, sandbox status, failures, lineage, selected winner, no-improvement state, and claim ceiling. It must not market the system as self-improving unless the proof exists.

## Required output

- run start controls;
- candidate and score inspection;
- failure and sandbox status;
- budget/cost display;
- apply/rollback decision point;
- no-improvement and blocked states.

## Proof before moving on

Show a run with at least one failed candidate, one selected or no-improvement result, and a visible receipt path.

## DO NOT

- Do not hide failed candidates.
- Do not present model-judge praise as deterministic proof.
- Do not use functionless buttons, placeholders, or mocked/sample data as proof.

