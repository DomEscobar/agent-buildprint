# Phase 05 - Verification And Receipt

## Objective

Prove the installed capability with deterministic evidence and write the final receipt.

## How to implement this phase

Run baseline and candidate evaluations under the same settings. Test sandbox timeout, forbidden mutation rejection, lineage persistence, budget stop, and no-improvement handling. Reconcile all host assessment blockers and hard-stop decisions.

## Required output

- `.buildprint/capability-receipt.md`;
- baseline and candidate score logs;
- sandbox proof;
- forbidden mutation proof;
- archive/lineage proof;
- claim ceiling.

## Proof before moving on

`verify.md` passes or records exact blockers. The receipt states what is proven, what is not proven, and what must not be claimed.

## DO NOT

- Do not claim improvement without baseline comparison.
- Do not erase failed candidates from the archive.
- Do not use placeholders, functionless buttons, or mocked/sample data as proof.

