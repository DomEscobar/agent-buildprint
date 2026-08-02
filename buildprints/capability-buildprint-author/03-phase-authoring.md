# 03 Loop Authoring

## Objective

Author the kernel grafting workflow so the applying agent cannot jump from docs to edits.

## Required kernel files

- `00-goal.md`
- `01-host.md`
- `loops/loop-flow.md`
- `loops/01-contract-and-config.md`
- `loops/02-core-integration.md`
- `loops/03-host-wiring.md`
- `loops/04-operator-surface.md`
- `review.md`
- `verify.md`

## Each loop must include

- How to implement this loop
- Building objective
- required inputs
- evidence or docs the applying agent must re-check before edits
- implementation or assessment instructions
- Minimum proof before moving on
- DO NOT rules
- Handoff note

## Required local outputs for applying agents

- `.buildprint/decisions.md` (hard stops from `00-goal.md`)
- `.buildprint/host-assessment.md` or equivalent notes in `01-host.md` outputs
- `.buildprint/capability-plan.md`
- `.buildprint/capability-receipt.md`

## Discovery decision gate

`01-host.md` must require the applying agent to classify important findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`.

`00-goal.md` must require assessment-led hard-stop questions, assumable defaults, and deferrable questions. It must explicitly say that `agent_assumption` is invalid for hard-stop decisions.

## Kernel rule

Generated packets use `kernel_loop` shape: goal → bare agentic loop → optional independent fan-out → contract review. Do not emit obsolete `02-implementation-phases/` or `00-host-assessment.md` + `01-integration-plan.md` as the live spine.
