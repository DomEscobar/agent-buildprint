# 02-core-integration

## How to implement this loop

Read `loops/loop-flow.md`, `00-goal.md`, and `01-host.md`, then implement the building objective.

## Building objective

Implement core integration logic for the bounded `capability-buildprint-standard` capability without redesigning the host. Keep changes scoped to capability.yaml touches. Leave honest blockers when host signals are missing.

## DO NOT

- Do not redesign the whole host product
- Do not ship placeholders or functionless buttons as proof
- Do not count mocked/sample data as live proof

## Minimum proof before moving on

- Run relevant structural or runtime checks from `verify.md` or record blockers

## Handoff note

Record what was wired, proof, and blockers.
