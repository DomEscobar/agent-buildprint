# 01 Integration Plan

Create `.buildprint/capability-plan.md` and `.buildprint/evolution-runtime-plan.md` before implementation. The plan must reconcile host assessment findings with the eval-guided patch loop design from [agentic-eval-evolution-runtime](https://github.com/DomEscobar/agentic-eval-evolution-runtime). If assessment reveals blockers or incompatible gaps, downgrade the claim ceiling to partial or blocked.

## Required Sections

### Assessment Reconciliation

- `.buildprint/host-assessment.md` findings;
- baseline command result and best-snapshot reference;
- every `must ask user`, blocker, baseline failure, and assumption;
- integration path decision and adopted adapters;
- final claim ceiling: `unproven`, `fixture_proven`, `host_proven`, or `blocked`;
- downgrade reason when proof is incomplete.

### Capability Boundary

- active profile: `patch-loop`, `population-evolution`, or deferred `scaffold-self-improve`;
- task spec schema and example task ids;
- editable surfaces (allowlist) and permanently forbidden zones;
- evaluator command, hidden test command, checksum baseline;
- unit-test gate command and ordering;
- benchmark/regression oracle command and score parser;
- sandbox runner and rollback policy;
- archive/checkpoint store;
- dual-acceptance split definitions;
- budget, plateau, and consecutive-revert stop conditions.

### Control Plane Rules

Document explicitly:

- agent may patch application code within editable surfaces;
- agent may not patch evaluator, hidden tests, guardrails, or archive;
- unit-test failure rolls back before benchmark spend;
- promotion requires no regression on held-out split;
- failure records include outcome, trace behavior, and mechanism.

### Phase Plan

1. Contract and config — task spec, editable surfaces, archive, evaluator checksum.
2. Core patch loop — TDAD-style iteration with gates and rollback.
3. Host wiring — connect to real agent runner and benchmark harness.
4. Operator surface — CLI/UI, lineage inspection, apply/rollback controls.
5. Verification and receipt — deterministic proof and claim ceiling.

Optional later tracks (do not parallelize with Phase 1 host proof):

- population-evolution mutator profile;
- scaffold-self-improve with human PR gate;
- Kitchen Loop specification oracle expansion.

### Proof Plan

- baseline evaluator run on best snapshot;
- evaluator checksum unchanged after agent run;
- editable-surface violation rejected;
- unit-test failure rollback proof;
- one complete patch cycle with benchmark comparison;
- held-out regression gate proof;
- archive/lineage receipt with failure record;
- no-improvement receipt path;
- optional: two-candidate population-evolution cycle.

## Safety Rules

Do not implement broad autonomous self-modification without explicit approval. Do not make source edits before host assessment and capability plan. Do not hide a weak evaluator behind confident language. Do not start scaffold-self-improve before app-patch loop proves archive/gate/rollback ROI.

## Build-vs-Buy Notes

Prefer reusing DeepEval, Inspect AI, or SWE-bench-shaped fixtures as **libraries behind host gates**. Build locally: editable surfaces, evaluator protection, archive schema, rollback logic, and host adapter.
