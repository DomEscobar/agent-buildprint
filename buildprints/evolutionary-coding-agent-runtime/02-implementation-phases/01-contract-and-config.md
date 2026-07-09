# Phase 01 - Contract And Config

## Objective

Define the task spec, editable surfaces, evaluator protection, patch, score, sandbox, archive, dual-acceptance, budget, and receipt contracts aligned with the eval control plane from `references/evolution-runtime-basis.md`.

## Required inputs

- `.buildprint/host-assessment.md`
- `.buildprint/capability-plan.md`
- active profile (`patch-loop` default)
- baseline and best-snapshot commands

## How to implement this phase

Create schemas or typed interfaces for:

- **TaskSpec** — task id, repo snapshot ref, goal text, editable surfaces, test/benchmark commands, budgets;
- **EditableSurfacePolicy** — explicit allowlist; default-deny everything else;
- **EvaluatorIntegrity** — checksum baseline, read-only paths, verification hook after agent runs;
- **PatchRecord** — diff, changed files, parent snapshot, mutation rationale;
- **FailureRecord** — verifier outcome, agent behavior from trace, abstract mechanism (Self-Harness causal mining);
- **ScoreRecord** — resolution, regression count, static checks, cost, latency;
- **ArchiveEvent** — mandatory fields from `capability.yaml`;
- **RunBudget** — max iterations, cost, wall time, consecutive reverts before forced restore.

Wire config loading without putting provider secrets into candidate-accessible state. Use `.buildprint/capability-plan.md` as source of truth.

### Editable surfaces rule

Use **allowlist**, not blocklist-only scope. Hand the coding agent/proposer only the allowlist. Evaluator, hidden tests, guardrails, and archive paths are never editable.

### Dual acceptance config

Define held-in split (weakness being fixed) and held-out split (must not regress). Both must pass for promotion.

## Required output

- task spec schema and at least one fixture task;
- editable-surface allowlist config;
- evaluator/hidden-test protection config with checksum baseline;
- unit-test and benchmark command config;
- sandbox limit config;
- archive schema (SQLite or JSONL);
- dual-acceptance split config;
- budget, plateau, and consecutive-revert config.

## Proof before moving on

- config validation passes;
- rejected config when evaluator protection, editable surfaces, or sandbox limits are missing;
- sample task spec loads and validates (see `examples/patch-loop-task.yaml`).

## DO NOT

- Do not use placeholders for evaluator output or checksum values in host proof.
- Do not use blocklist-only mutation scope without documenting user-approved exception.
- Do not make candidate code able to read secrets by default.
- Do not add generic TaskAdapter interfaces before one real host adapter exists unless population-evolution profile requires them.
