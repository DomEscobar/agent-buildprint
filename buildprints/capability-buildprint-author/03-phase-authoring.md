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
- evidence or docs the applying agent must re-check before edits
- implementation or assessment instructions
- proof before moving on
- DO NOT rules

## Required local outputs for applying agents

- `.buildprint/host-assessment.md`
- `.buildprint/capability-plan.md`
- `.buildprint/capability-receipt.md`

## Phase evidence rules

For volatile providers, frameworks, billing, auth, security, data migration, webhook, or benchmark-sensitive work, phases must force the applying agent to verify current docs/source before implementation. The phase should say what to inspect, which version-sensitive assumptions matter, and when to block instead of guessing.

## DO NOT

- Do not leave `apply.md` as a vague "implement this" note.
- Do not let the agent skip host assessment.
- Do not let the agent claim installed without receipt and verification.
- Do not let phases silently rely on stale provider behavior or uncited model memory.
