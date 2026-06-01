# Phase 00 — Product system alignment

requires_roles: [product-architect, ux-ui-craft]

## Product intention

Align promise, consumer, central artifact, first loop, and posture-driven obligations, then choose the concrete stack — within the guardrails `02-project-setup.md` sets. This phase owns the stack decision; `02-project-setup.md` only sets the craft floor and integration constraints.

## Mapped obligations

- Name artifact type and real consumer.
- Name the central artifact/interface/boundary.
- Name the first usable loop and expected outcome.
- Name deployment posture (`trusted_local`, `private_authenticated`, or `public_webapp`) and its implications.
- Choose the concrete stack (language, framework, libraries, tooling) that satisfies the `02-project-setup.md` product-craft floor and integration constraints. Keep the choice source-independent and free, except where a preserved dependency forces a reasoned, swappable constraint (state the reason). Do not inherit a stack just because the source used it.

## Stable vs free

- Stable: product promise, first-loop semantics, posture commitment, boundary honesty, the product-craft floor (real framework + design system, no single-file hand-rolled shell), and any reasoned integration constraint from `02-project-setup.md`.
- Free: which specific language/framework/library/design-system is chosen, module names, and internal file layout.

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

## Required output (ux-ui-craft)

- A named component/UI framework with a build step and a real styling/design system for UI-bearing products.
- A first-screen composition plan (workflow-first, not generic dashboard) with defined empty/loading/error/blocked/success states.

## Blocks (ux-ui-craft)

- Single-file hand-rolled HTML/CSS/JS shell or one-string server HTML as the product UI.
- No design/styling system; ad-hoc inline styles only.
- Raw internal ids or cryptic unlabeled controls on the surface.

## Quality bar

A new engineer can describe exactly what to build first, what must remain stable, what can change freely, and which framework + design system satisfies the craft floor.

## Do not ship

- Missionless feature list.
- Missing central artifact/boundary.
- Posture silently assumed or unresolved.
- A stack that violates the product-craft floor (single-file hand-rolled shell, no framework, no design system).

## Repair routing

- product contradiction -> `BUILDPRINT.md`
- setup contradiction -> `02-project-setup.md`
- unresolved posture/scope -> `01-questions.md`

## Unlock condition

Central artifact, first loop, posture, and boundary honesty are explicit before feature implementation begins.
