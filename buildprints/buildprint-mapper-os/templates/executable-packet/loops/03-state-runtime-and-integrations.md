# Loop 03 — State, Runtime, And Integrations

## How to implement this loop

Before writing code, read:

- `loops/loop-flow.md`
- `.buildprint/next-agent.md` if it exists
- current project `AGENTS.md` if it exists
- `BUILDPRINT.md`
- `00-goal.md`
- `01-setup.md`
- `02-identity.md` as standing design responsibility

## Building objective

Keep `02-identity.md` open. Harden state, runtime boundaries, and integrations required by the goal: persistence, provider seams, retries/idempotency where relevant, env contracts, and honest blocked states when live systems are unavailable.

Use proven libraries/SDKs for hard domains listed in `proven_implementation_requirements`. Do not casually hand-roll fragile equivalents.

Product-proof contract for this loop:

- Named durable records or runtime seams
- Restart/readback or idempotent retry proof when claimed
- Explicit live-provider blockers when credentials/network are missing

## DO NOT

- Do not ship placeholders, functionless buttons, or mocked/sample data as live proof.
- Do not hide missing integrations behind optimistic success.
- Do not scatter provider auth through UI code.

## Minimum proof before moving on

- Run persistence/readback or integration probes that apply.
- Record blocked live checks honestly.

## Handoff note

Record runtime seams, proof, and blockers for later loops.
