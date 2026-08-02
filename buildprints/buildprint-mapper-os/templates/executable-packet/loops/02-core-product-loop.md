# Loop 02 — Core Product Loop

## How to implement this loop

Before writing code, read:

- `loops/loop-flow.md`
- `.buildprint/next-agent.md` if it exists
- current project `AGENTS.md` if it exists
- `BUILDPRINT.md`
- `00-goal.md`
- `01-setup.md`
- `02-identity.md` as standing design responsibility

Implement one coherent deepening of the first loop into the core product path named by the goal and central output contract.

## Building objective

Keep `02-identity.md` open. Expand the first runnable path into the mapped artifact's core loop: the main action a user/operator repeats, the durable state it creates, and the central output quality bar from `blueprint.yaml`.

The builder should leave this loop able to complete one end-to-end golden-path action with real (or honestly blocked) providers, persisted state when durability is claimed, and output that is specific to the mapped product — not domain-generic filler.

Fan out independent subagents only when file ownership is clean. Each worker implements a goal slice against this contract.

Product-proof contract for this loop:

- Named core action and resulting central output
- Persistence/readback when state is claimed
- At least one honest failure/blocked path
- Proof that the output answers a reviewer acceptance question from the central output contract

## DO NOT

- Do not ship placeholders, functionless buttons, or mocked/sample data as live proof.
- Do not claim central output quality from technically input-derived but domain-generic results.
- Do not replace the goal with a toy demo.
- Do not invent production harness maturity unless claiming that upgrade with proof.

## Minimum proof before moving on

- Exercise the core action end to end.
- Inspect output against acceptance criteria in `00-goal.md`.
- Record blockers for missing providers or credentials without fake success.

## Handoff note

Record the core path, proof, blockers, and what later loops may trust.
