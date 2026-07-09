# Verify

Pass condition: `.buildprint/capability-receipt.md` and `.buildprint/evolution-runtime-receipt.md` exist, reconcile host assessment and capability plan, and no blocked checks remain.

## Required structural checks

- `.buildprint/host-assessment.md` exists.
- `.buildprint/capability-plan.md` names evaluator, editable surfaces, hidden tests, sandbox, archive, dual-acceptance splits, and budget ceiling.
- Task spec schema and archive schema exist.
- Editable-surface allowlist and forbidden zones are configured.
- Evaluator checksum baseline is recorded.
- Baseline/best-snapshot command is recorded.

## Runtime checks

- Baseline evaluator run completes and produces a parseable score on best snapshot.
- Evaluator checksum unchanged after agent run.
- Patch outside editable surfaces is rejected before eval.
- Unit-test failure triggers rollback without benchmark spend.
- One complete patch cycle runs: patch → unit tests → benchmark → archive.
- Held-out or hidden-test regression blocks promotion.
- Sandbox timeout or memory limit blocks a bad candidate.
- Archive persists parent, task id, patch, failure record, score, regression count, and rollback reason.
- Selection picks improved best snapshot or records no improvement.
- Rerun confirms candidate and baseline under the same evaluator settings.

### Optional profile checks (population-evolution)

- At least two bounded candidates evaluated under same gates.
- Novelty rejection or diversity note recorded if enabled.

## Blocked checks

- No deterministic evaluator.
- No sandbox boundary.
- No editable-surface allowlist.
- Evaluator not protected from agent edits.
- No unit-test gate before benchmark.
- No baseline/best-snapshot comparison.
- No lineage receipt.

## Receipt Requirements

`.buildprint/capability-receipt.md` must include:

- baseline command and score on best snapshot;
- evaluator checksum proof;
- patch cycle count;
- mutation model and budget used;
- editable-surface enforcement proof;
- unit-test gate proof;
- regression gate proof;
- sandbox proof;
- best-snapshot comparison or no-improvement result;
- lineage/archive path;
- claim ceiling;
- research evidence tags if external results are cited;
- reconciliation with `.buildprint/host-assessment.md` and `.buildprint/capability-plan.md`.

## Overclaim Rule

Not-proven or blocked evidence means the claim is not-proven. Model-judge praise, a single candidate, TDAD/DGM headline numbers, or a changed file without deterministic evaluator improvement cannot override proof level.
