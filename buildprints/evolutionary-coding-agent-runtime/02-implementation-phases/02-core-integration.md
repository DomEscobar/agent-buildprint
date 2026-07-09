# Phase 02 - Core Patch Loop

## Objective

Implement the TDAD-style eval-guided patch loop: snapshot → one focused patch → unit-test gate → benchmark → promote or rollback → archive.

## Required inputs

- phase 01 contracts
- host coding agent invocation path
- unit-test and benchmark commands
- rollback/snapshot mechanism

## Loop pipeline

1. Load task spec and verify editable surfaces.
2. Snapshot repo at current best baseline.
3. Checksum evaluator and hidden tests; enforce read-only.
4. Invoke coding agent with allowlist and visible feedback only — **one focused patch**.
5. Reject patch if changed files exceed editable surfaces.
6. Run unit tests — on failure, rollback immediately (no benchmark spend).
7. Run benchmark on held-in split; run held-out/hidden regression checks.
8. Compare to best snapshot; promote or rollback.
9. Write archive event with failure record (outcome + trace behavior + mechanism).
10. Stop on budget, plateau, baseline reached, or consecutive-revert threshold (default: 5 → force restore best).

## Population-evolution variant (optional)

If `population-evolution` profile is active, replace step 4 with mutator generating 2+ patch candidates, then run steps 5–9 for each candidate before selection. Share the same gates and archive. Consider novelty rejection pre-eval ([ShinkaEvolve](https://arxiv.org/abs/2509.19349)).

## Required output

- patch-loop runner (or population runner);
- repo snapshot and rollback implementation;
- evaluator integrity verifier;
- unit-test gate runner;
- benchmark and regression oracle runner;
- score parser;
- best-snapshot promotion policy;
- archive persistence;
- checkpoint/resume path.

## Proof before moving on

Run one complete bounded cycle:

- one patch (or two candidates if population profile);
- unit-test gate exercised;
- benchmark comparison recorded;
- at least one rollback or no-improvement path demonstrated;
- archive contains parent, patch, failure record, and score.

## DO NOT

- Do not run benchmark before unit tests pass.
- Do not expose hidden tests or guardrails to the agent/proposer.
- Do not execute candidates without timeout and memory limits.
- Do not treat mocked/sample data or functionless buttons as runtime proof.
