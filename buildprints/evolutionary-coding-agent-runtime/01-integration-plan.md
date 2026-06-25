# 01 Integration Plan

Create `.buildprint/capability-plan.md` before implementation. The plan must reconcile host assessment findings with the intended evolutionary runtime. If assessment reveals blockers or incompatible gaps, downgrade the claim ceiling to partial or blocked.

## Required Sections

### Assessment Reconciliation

- `.buildprint/host-assessment.md` findings;
- baseline command result;
- every `must ask user`, blocker, baseline failure, and assumption;
- final claim ceiling: `unproven`, `fixture_proven`, `host_proven`, or `blocked`;
- downgrade reason when proof is incomplete.

### Capability Boundary

- candidate representation;
- mutation-safe paths;
- forbidden paths;
- evaluator command and score parser;
- sandbox runner;
- archive/checkpoint store;
- selection policy;
- budget and plateau stop conditions.

### Phase Plan

1. Contract and config.
2. Core evolution loop.
3. Host wiring.
4. Operator surface.
5. Verification and receipt.

### Proof Plan

- baseline evaluator run;
- candidate mutation validation;
- sandbox failure test;
- two-candidate evolution run;
- winner versus baseline comparison;
- lineage/archive receipt;
- no-improvement receipt path.

## Safety Rules

Do not implement broad autonomous self-modification without explicit approval. Do not make source edits before host assessment and capability plan. Do not hide a weak evaluator behind confident language.

