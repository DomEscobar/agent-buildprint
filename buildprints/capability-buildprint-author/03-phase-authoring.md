# 03 Phase Authoring

## Objective

Author the phased grafting workflow so the applying agent cannot jump from docs to edits.

## Required phase files

- `00-host-assessment.md`
- `01-integration-plan.md`
- `apply.md`
- `02-implementation-phases/01-contract-and-config.md`
- `02-implementation-phases/02-core-integration.md`
- `02-implementation-phases/03-host-wiring.md`
- `02-implementation-phases/04-user-operator-surface.md`
- `02-implementation-phases/05-verification-and-receipt.md`
- `verify.md`

## Each phase must include

- objective
- required inputs
- implementation or assessment instructions
- proof before moving on
- DO NOT rules

## Required local outputs for applying agents

- `.buildprint/host-assessment.md`
- `.buildprint/capability-plan.md`
- `.buildprint/capability-receipt.md`

## DO NOT

- Do not leave `apply.md` as a vague "implement this" note.
- Do not let the agent skip host assessment.
- Do not let the agent claim installed without receipt and verification.

