# Phase 05 - Verification And Receipt

## Objective

Prove the installed capability with deterministic evidence and write final receipts with honest claim ceilings.

## Required inputs

- completed phases 01–04
- `verify.md`
- `.buildprint/host-assessment.md`
- `.buildprint/capability-plan.md`

## Verification matrix

Run and record:

| Check | Expected |
| --- | --- |
| Baseline on best snapshot | parseable score |
| Evaluator checksum | unchanged after agent run |
| Editable-surface violation | rejected pre-eval |
| Unit-test failure | rollback, no benchmark |
| Held-out regression | blocks promotion |
| Sandbox limit | bad candidate contained |
| Successful patch cycle | archived with failure record fields |
| No-improvement path | claim_status not-proven |
| Baseline rerun | same settings as candidate eval |

Reconcile all host assessment blockers and hard-stop decisions.

## Required output

- `.buildprint/evolution-runtime-receipt.md`;
- `.buildprint/capability-receipt.md`;
- baseline and candidate score logs;
- evaluator checksum log;
- sandbox proof;
- editable-surface rejection proof;
- unit-test and regression gate proof;
- archive/lineage proof;
- claim ceiling with evidence tags if citing external research.

Use `examples/fixture-evolution-receipt.md` as shape reference only — host receipts must contain real command output.

## Proof before moving on

`verify.md` passes or records exact blockers. Receipts state:

- what is proven (fixture_proven / host_proven);
- what is not proven;
- what must not be claimed (production_safe, autonomous self-modification, research headline numbers).

## DO NOT

- Do not claim improvement without best-snapshot comparison and rerun.
- Do not erase failed or reverted patches from the archive.
- Do not cite TDAD/DGM/AlphaEvolve results as host proof.
- Do not use placeholders, functionless buttons, or mocked/sample data as proof.
