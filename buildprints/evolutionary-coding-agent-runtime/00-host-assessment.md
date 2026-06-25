# 00 Host Assessment

Assess the host before any source edits. Classify every finding as `infer safely`, `patch locally`, `must ask user`, or `out of scope`. If a decision affects safety, budget, mutation scope, sandboxing, or benchmark claims, block until resolved.

## Required Output

Write `.buildprint/host-assessment.md` with:

- host language/runtime and agent entrypoint;
- existing eval commands, task fixtures, and scoring outputs;
- candidate execution boundary and sandbox status;
- mutation-safe and mutation-forbidden paths;
- provider/model configuration and budget controls;
- persistence/archive options;
- rollback and source-control status;
- baseline command result and failure notes.

## Assessment Checklist

### Evaluator

- What command produces a deterministic score?
- Does it report pass/fail, numeric fitness, latency, cost, or quality metrics?
- Can baseline and candidate be rerun under identical settings?
- What failures are expected and how are they parsed?

### Sandbox

- Are candidate runs isolated by process, container, jail, VM, or service boundary?
- Are time, memory, filesystem, and network limits enforced?
- Are provider keys hidden from candidate code unless explicitly allowed?
- Can a malicious candidate mutate the runner itself?

### Mutation Scope

- Which files may be mutated?
- Which files are forbidden: secrets, env, deployment, billing, migrations, production data?
- Does the host need SEARCH/REPLACE patches, unified diffs, or branch-based edits?
- Is rollback automated?

### Archive And Selection

- Where are candidates stored?
- Are parent, prompt, patch, evaluator output, score, and errors recorded?
- Is diversity tracked or only top score?
- What stops the loop: generation count, budget, plateau, or manual approval?

## Reconciliation Rule

Verification must reconcile `.buildprint/host-assessment.md` with `.buildprint/capability-plan.md`. Every baseline failure, assumption, hard-stop answer, and blocker must be fixed, accepted as a claim ceiling, or left blocked. Downgrade to partial or blocked when proof is missing.

