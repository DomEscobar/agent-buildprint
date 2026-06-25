# Verify

Pass condition: `.buildprint/capability-receipt.md` exists, reconciles host assessment and capability plan, and no blocked checks remain.

## Required structural checks

- `.buildprint/host-assessment.md` exists.
- `.buildprint/capability-plan.md` names evaluator, sandbox, mutation scope, archive, selection policy, and budget ceiling.
- Candidate schema and score schema exist.
- Forbidden mutation paths are configured.
- Baseline command is recorded.

## Runtime checks

- Baseline evaluator run completes and produces a parseable score.
- Mutation engine creates at least two bounded candidates.
- Patch validation rejects a forbidden-file mutation.
- Sandbox timeout or memory limit blocks a bad candidate.
- Evaluator runs candidates and records score, logs, failure, and cost.
- Selection picks a winner or records no improvement.
- Archive persists parent, mutation prompt, patch, score, and lineage.
- Rerun confirms winner and baseline under the same evaluator settings.

## Blocked checks

- No deterministic evaluator.
- No sandbox boundary.
- Candidate can access secrets without approval.
- Mutation scope is unclear.
- No baseline comparison.
- No lineage receipt.

## Receipt Requirements

`.buildprint/capability-receipt.md` must include:

- baseline command and score;
- candidate count;
- mutation model and budget used;
- sandbox proof;
- forbidden mutation rejection proof;
- winner score or no-improvement result;
- lineage/archive path;
- claim ceiling;
- reconciliation with `.buildprint/host-assessment.md` and `.buildprint/capability-plan.md`.

## Overclaim Rule

Not-proven or blocked evidence means the claim is not-proven. Model-judge praise, a single candidate, or a changed file without evaluator improvement cannot override deterministic proof level.

