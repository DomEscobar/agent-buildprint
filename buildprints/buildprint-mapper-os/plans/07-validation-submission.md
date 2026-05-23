# Phase 07 - Verification And Handoff

## Goal

Prove what can be proven and block what cannot be proven.

## Steps

- Run applicable static, build, unit/contract, runtime, browser/API, persistence/restart, no-fake, security/privacy, and clean-room reversal checks.
- Record commands run, commands not run, evidence, blockers, timestamps, environment, and artifacts.
- Run fixture review using `evals/golden-projects/` when Mapper OS behavior or templates change.
- Run selected-output shape validation for generated selected/full-suite capability packets and v4 regression fixtures.
- Keep label `SELECTED_UNQUALIFIED` unless source-independent qualification proof is complete.

## Exit Criteria

- Qualification label is honest.
- Missing gate results are blockers.
- Selected output shape is valid: capability-packet v4 spine, capability packets, evidence-ledger routing, no legacy v1/v2 spine files, no fragmented per-capability mini-files, no typo aliases, and no duplicate canonical handoff files.
- Final handoff names active capability, completed slices, blocked slices, next capability, and residual risks.
