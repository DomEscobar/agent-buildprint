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
