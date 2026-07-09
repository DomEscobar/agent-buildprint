# 00 Assessment Questions

Ask these after `00-host-assessment.md` and before `01-integration-plan.md`. Hard-stop questions must be answered by the user or explicit user delegation. `agent_assumption` is invalid for hard-stop decisions.

## Hard-stop questions

1. **Fitness function** — which benchmark, test suite, task set, or metric defines improvement? Include resolution and regression metrics separately.
2. **Editable surfaces** — which paths/modules may the loop edit (explicit allowlist)? Everything else is off-limits.
3. **Evaluator protection** — can evaluator, hidden tests, and guardrails be checksum-protected and read-only during agent runs?
4. **Sandbox policy** — what isolation boundary is required before candidate code can run?
5. **Model and budget** — which mutation models are allowed, and what spend/time ceiling stops the loop?
6. **Dual acceptance splits** — what held-in vs held-out tasks enforce "fixes weakness" vs "does not break elsewhere"?
7. **Self-modification approval** — can winning patches be applied automatically, or must a human approve?
8. **External side effects** — may candidates access network, tools, providers, repositories, or user data?
9. **Claim target** — research prototype, host-applied improvement, or production-safe runtime?
10. **Profile scope** — patch-loop only, population-evolution, or deferred scaffold-self-improve?

## Assumable defaults

- Default profile is `patch-loop` with TDAD-style rollback.
- Use editable-surface allowlist, not blocklist-only scope.
- Unit tests gate before benchmark eval.
- Five consecutive reverts restore best snapshot.
- Record no-improvement honestly instead of forcing a winner claim.
- Keep model-judge output advisory only.
- Start with app-code patches (Phase 1); defer scaffold self-edit.

## Deferrable questions

- exact UI layout for archive inspection;
- novelty rejection embedding threshold;
- clade metaproductivity selection;
- remote distributed evaluators;
- long-running schedule and cron policy;
- full Kitchen Loop specification surface enumeration;
- population-evolution island count.

## Integration Path Discovery

Ask after host assessment and before integration plan. Default is `self-contained` with `tdad-patch-loop` + `self-harness-gates`. Record in `.buildprint/capability-plan.md` under "Integration Path Decision". Each path maps to `proposed_integration_paths` in `capability.yaml`.

### TDAD Patch Loop

- does the host already have unit-test and benchmark commands suitable for gate ordering?
- who owns best-snapshot promotion and consecutive-revert policy?
- is benchmark eval cheap enough to run every iteration?

### Self-Harness Gates

- can the host express editable surfaces as an allowlist handed to the proposer?
- are traces available for causal weakness mining?
- what held-in and held-out splits exist today?

### SWE-bench Shape

- does the host need issue-style task specs with repo snapshots?
- who authors hidden tests and prevents leakage?

### Kitchen Loop Oracle

- is benchmark-only optimization insufficient for the product?
- who owns the specification surface and regression oracle cases?

### Population Evolution

- does the host tolerate multi-candidate eval cost per iteration?
- is diversity collapse a known risk requiring novelty rejection?

### Inspect AI / DeepEval Runner

- should eval execution delegate to a library, or stay fully host-native?
- can third-party types be kept out of archive schema?

## Output

Write answers into `.buildprint/capability-plan.md`. If any hard-stop answer is missing, stop before `01-integration-plan.md`.
