# Phase 00 — Product system alignment

requires_roles: [product-architect]

## Product intention

Align promise, consumer, central artifact, first loop, and posture-driven obligations before implementation starts.

## Mapped obligations

- Name artifact type and real consumer.
- Name the central artifact/interface/boundary.
- Name the first usable loop and expected outcome.
- Name deployment posture (`trusted_local`, `private_authenticated`, or `public_webapp`) and its implications.

## Stable vs free

- Stable: product promise, first-loop semantics, posture commitment, and boundary honesty.
- Free: framework/library choices, module names, and internal file layout.

## Implementation scope

- Produce a concise implementation note with mission, loop, and persistence needs.
- Define boundaries for providers, deployment, credentials, and destructive actions.
- Identify top fake-feel risks and anti-slop expectations.

## Interfaces touched

- Main user/operator/developer entrypoints.
- Core service/domain boundary.
- Provider and persistence seams.

## State / runtime touched

- Core state model and lifecycle anchors.
- Required persistence and readback behavior.
- Runtime ownership assumptions for long-running paths.

## UX / DX / operator requirements

- First action and first value are obvious.
- Internal/proof vocabulary is absent from user-facing copy.

## Required output (product-architect)

- Context, component, and data-flow boundaries are explicit for the first loop.
- Decision notes capture tradeoffs that affect observable behavior.

## Blocks (product-architect)

- UI shell with no real data path.
- Architecture requiring all markdown files before the next action is clear.

## Quality bar

A new engineer can describe exactly what to build first, what must remain stable, and what can change freely.

## Do not ship

- Missionless feature list.
- Missing central artifact/boundary.
- Posture silently assumed or unresolved.

## Repair routing

- product contradiction -> `BUILDPRINT.md`
- setup contradiction -> `02-project-setup.md`
- unresolved posture/scope -> `01-questions.md`

## Unlock condition

Central artifact, first loop, posture, and boundary honesty are explicit before feature implementation begins.
