# Phase 04 - User Operator Surface

## Objective

Give the operator a clear way to start, inspect, stop, compare, promote, and roll back patch-loop runs without overclaiming self-improvement.

## Required inputs

- phase 03 host entrypoint
- archive read API or file layout
- claim ceiling from capability plan

## How to implement this phase

Add CLI output, web UI, logs, or dashboards appropriate to the host. Minimum visibility:

- task spec id and editable surfaces;
- best-snapshot score vs current candidate;
- unit-test and benchmark gate status;
- held-out regression status;
- evaluator checksum status;
- consecutive revert count;
- budget/cost consumption;
- archive lineage (parent, patch summary, failure mechanism);
- apply/rollback decision point;
- claim ceiling and blocked/no-improvement states.

Suggested CLI shape (adapt to host):

```text
<host> patch-loop --task tasks/001.yaml --baseline baseline.yaml
<host> archive show --run latest
<host> promote --candidate cand_042
<host> rollback --to-best
```

A dashboard is optional for v1. CLI plus reproducible archive is the right first shape per source repo guidance.

## Required output

- run start controls;
- patch and score inspection;
- gate failure and sandbox status;
- budget/cost display;
- promote/rollback controls;
- no-improvement and blocked states;
- link/path to receipt files.

## Proof before moving on

Show a run with:

- at least one failed gate (unit test, regression, or sandbox);
- one promoted or no-improvement result;
- visible receipt path;
- claim ceiling displayed honestly.

## DO NOT

- Do not hide failed iterations or reverted patches.
- Do not present model-judge praise as deterministic proof.
- Do not market the system as self-improving unless proof exists.
- Do not use functionless buttons, placeholders, or mocked/sample data as proof.
