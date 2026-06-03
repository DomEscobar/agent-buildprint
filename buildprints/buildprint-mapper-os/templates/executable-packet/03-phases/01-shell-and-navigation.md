# Phase 01 — Shell and navigation

requires_roles: [ux-ui-craft, product-architect]

ux_obligations:
  - 00b-ux-contract/first-run-path.md#landing
  - 00b-ux-contract/empty-blocked-loading-states.yaml#empty
  - 00b-ux-contract/empty-blocked-loading-states.yaml#loading
  - 00b-ux-contract/empty-blocked-loading-states.yaml#blocked
  - 00b-ux-contract/disclosure-plan.md#default-vs-expert

## Product intention

Create the product shell that makes the app legible before feature depth: routes/views, navigation, global states, permission/auth states, and empty/loading/error behavior.

## Mapped obligations

- App shell and navigation match product promise and primary loops.
- Main contexts have one obvious primary action.
- Empty/loading/error/blocked/permission states preserve trust.

## Stable vs free

- Stable: route intent, state semantics, and clear next action per view.
- Free: routing library, component names, and style implementation.

## Implementation scope

- Build app shell and mode-appropriate navigation.
- Implement route/view entrypoints for the first loop.
- Add meaningful global state states (empty/loading/error/blocked).
- Keep copy in user/domain language.

## Interfaces touched

- Routing layer and navigation controls.
- Top-level layouts and entry views.
- Session/permission boundary entrypoints where applicable.

## State / runtime touched

- Navigation state and selected context.
- Global loading/error/blocked state ownership.

## UX / DX / operator requirements

- New users understand where they are and what to do first.
- Expert controls do not bury first value.

## Required output (ux-ui-craft)

- Workflow-first layout and first viewport usability.
- Empty/loading/error/blocked/success states defined.

## Blocks (ux-ui-craft)

- Generic dashboard chrome as the primary shell.
- Dead tabs or controls with no owned behavior.

## Required output (product-architect)

- Navigation boundaries reflect product loops, not source folders.

## Blocks (product-architect)

- Route-only shell with no owned state and no real data path.

## Quality bar

A new user should understand where they are, what to do first, what is unavailable, and how to recover from empty/error states without reading docs or seeing internal vocabulary.

## Do not ship

Generic dashboard chrome, nav that mirrors source folders, dead tabs, unexplained blocked states, technical/provider jargon before value, or empty screens with no next action.

## Repair routing

- shell contradiction -> current phase
- loop mismatch -> `02-project-setup.md`
- unresolved blocked-state semantics -> `04-review.md`

## Unlock condition

The shell supports first-loop navigation with explicit global states and no dead primary controls, every entry in `ux_obligations` resolves to a real artifact section, and the empty/loading/blocked states named in `00b-ux-contract/empty-blocked-loading-states.yaml` are visible without requiring provider config.
