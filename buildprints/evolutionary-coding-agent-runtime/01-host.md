# 01 Host

Merge of host assessment and integration plan. Complete before loop work. No source edits before `00-goal.md` hard stops and this host plan.

## Host assessment

# 00 Host Assessment

Assess the host before any source edits. Classify every finding as `infer safely`, `patch locally`, `must ask user`, or `out of scope`. If a decision affects safety, budget, editable surfaces, evaluator integrity, sandboxing, or benchmark claims, block until resolved.

Read `references/evolution-runtime-basis.md` before assessment so control-plane vs agent-runtime boundaries are clear.

## Required Output

Write `.buildprint/host-assessment.md` with:

- host language/runtime and agent entrypoint;
- existing eval commands, task fixtures, visible vs hidden tests, and scoring outputs;
- evaluator location, checksum baseline, and protection feasibility;
- editable surfaces (allowlist candidate) and forbidden zones;
- candidate execution boundary and sandbox status;
- repo snapshot and rollback mechanism;
- provider/model configuration and budget controls;
- persistence/archive options;
- baseline command result and failure notes;
- integration path decision (`self-contained`, `tdad-patch-loop`, adopted adapters).

## Assessment Checklist

### Evaluator And Benchmark

- What command produces a deterministic score?
- Does it report pass/fail, resolution rate, regression count, latency, cost, or quality metrics?
- Where are hidden tests stored and who can read them?
- Can the evaluator and hidden tests be made read-only with SHA-256 checksum verification?
- Can baseline and candidate be rerun under identical settings?
- Is there a project-local task spec shape (issue + repo snapshot + tests)?
- What failures are expected and how are they parsed?

### Editable Surfaces And Guardrails

- Which paths/modules may the coding agent edit (explicit allowlist)?
- Which paths are permanently forbidden: evaluator, hidden tests, guardrails, archive, secrets, env, deployment, billing?
- Is the host currently using a blocklist-only plan? If yes, flag for migration to allowlist.
- Does the host need SEARCH/REPLACE patches, unified diffs, or branch-based edits?
- Is rollback automated to best snapshot?

### Sandbox

- Are candidate runs isolated by process, container, jail, VM, or service boundary?
- Are time, memory, filesystem, and network limits enforced?
- Are provider keys hidden from candidate code unless explicitly allowed?
- Can a malicious candidate mutate the runner or evaluator?

### Patch Loop Readiness

- Is there a unit-test command that can gate before benchmark spend?
- Is there a best-snapshot or baseline snapshot to compare against?
- Is regression tracked separately from resolution?
- Is there a holdout or held-out split the agent loop must not see?
- Is a specification/regression oracle available (Kitchen Loop profile)?

### Archive And Selection

- Where are patches, scores, and failures stored?
- Are parent, task id, patch diff, visible/hidden test summaries, regression count, and rollback reason recorded?
- Is diversity or clade tracking needed, or is single best-snapshot enough for v1?
- What stops the loop: iteration count, budget, plateau, consecutive reverts, or manual approval?

## Reconciliation Rule

Verification must reconcile `.buildprint/host-assessment.md` with `.buildprint/capability-plan.md`. Every baseline failure, assumption, hard-stop answer, and blocker must be fixed, accepted as a claim ceiling, or left blocked. Downgrade to partial or blocked when proof is missing.


## Integration plan

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


## Apply order

Follow:

1. `00-goal.md`
2. `01-host.md` (this file)
3. `loops/` in order
4. `review.md`
5. `verify.md`

### Legacy apply notes

# Apply

Apply this bounded capability only after reading:

1. `BUILDPRINT.md`
2. `references/evolution-runtime-basis.md`
3. `00-host-assessment.md`
4. `00-assessment-questions.md`
5. `01-integration-plan.md`
6. `02-implementation-phases/`
7. `verify.md`

## Inspect

Host assessment is a hard gate. Classify findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`. Record the decision and block when the evaluator, editable surfaces, hidden tests, sandbox, budget, rollback, or claim target is unsafe or unclear.

Minimum inspect outputs:

- baseline and best-snapshot commands;
- visible vs hidden test locations;
- evaluator checksum feasibility;
- editable-surface allowlist draft;
- sandbox boundary and secret isolation;
- archive persistence path.

## Steps

- Produce `.buildprint/host-assessment.md`.
- Ask unresolved hard-stop questions from `00-assessment-questions.md`.
- Record integration path decision in `.buildprint/capability-plan.md`.
- Produce `.buildprint/evolution-runtime-plan.md` and `.buildprint/evolution-runtime-safety-plan.md`.
- Implement phases in order.
- Run `verify.md`.
- Write `.buildprint/evolution-runtime-receipt.md` and `.buildprint/capability-receipt.md`; reconcile every blocker.

## Forbidden

- Do not redesign the whole product or rebuild a generic eval framework from scratch.
- Do not mutate secrets, env files, deployment files, billing code, or production data.
- Do not allow the agent to patch evaluator, hidden tests, guardrails, or archive.
- Do not run generated candidate code without sandbox limits.
- Do not skip unit-test gate before benchmark eval.
- Do not claim self-improvement unless a repeated evaluator run beats the best snapshot or records a clear no-improvement result.

## Default v1 shape

Unless the capability plan explicitly chooses otherwise, implement **patch-loop** profile first:

```text
task spec -> snapshot -> one focused patch -> unit tests -> benchmark -> promote/rollback -> archive
```

Defer population-evolution and scaffold-self-improve until patch-loop receipts exist.


Reconcile assessment assumptions with proof. Downgrade claim ceiling when proof is partial or blocked. Record not-proven honestly.
