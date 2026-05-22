# Phase 07 - Verification And Handoff

## Goal

Prove what can be proven and block what cannot be proven.

## Steps

- Run applicable static, build, unit/contract, runtime, browser/API, persistence/restart, no-fake, security/privacy, and clean-room reversal checks.
- Record commands run, commands not run, evidence, blockers, timestamps, environment, and artifacts.
- Run fixture review using `evals/golden-projects/` when Mapper OS behavior or templates change.
- Run selected-output shape validation for generated selected/full-suite executable packets and v2 regression fixtures.
- Keep label `SELECTED_UNQUALIFIED` unless source-independent qualification proof is complete.

## Exit Criteria

- Qualification label is honest.
- Missing gate results are blockers.
- Selected output shape is valid: executable-packet v2 spine, complete capability packets, evidence-ledger routing, no legacy v1 spine files, no typo aliases, and no duplicate canonical handoff files.
- Final handoff names active capability, completed packs, blocked packs, next pack, and residual risks.
