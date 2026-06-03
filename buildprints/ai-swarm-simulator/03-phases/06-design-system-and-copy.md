# Phase 06 - Design system and copy

requires_roles: [ux-ui-craft]

ux_obligations:
  - 00b-ux-contract/copy-quality-bar.md#reading-level
  - 00b-ux-contract/copy-quality-bar.md#jargon-ban
  - 00b-ux-contract/copy-quality-bar.md#alt-copy
  - 00b-ux-contract/disclosure-plan.md
  - 00b-ux-contract/empty-blocked-loading-states.yaml

## Product intention

Make the workbench feel like a serious simulation tool: dense enough for repeated use, readable graph interactions, clear progress, and no Buildprint/proof/internal vocabulary in user-facing screens.

## Mapped obligations

- Refine graph layout, labels, detail panels, legends, and mode controls.
- Refine upload/progress/report/interaction copy.
- Ensure responsive behavior across desktop and mobile widths.
- Show blocked states clearly without leaking secret values.

## Stable vs free

Stable: graph/canvas quality and workflow clarity.

Free: exact palette, typography, icons, and component library.

## Implementation scope

Design system tokens/components, graph visual treatment, buttons/controls, empty/error/loading states, accessibility checks.

## Interfaces touched

Frontend components and copy.

## State / runtime touched

No new core state; polish existing state display.

## UX / DX / operator requirements

Use icon buttons with tooltips for graph controls where appropriate. Text must fit containers and not overlap on mobile or desktop.

## Required output (ux-ui-craft)

Deliver a visually coherent workbench with usable controls and inspectable graph details.

## Blocks (ux-ui-craft)

No slop: clipped text, hidden controls, unreadable labels, nested card piles, decorative-only graph, or placeholder copy.

## Quality bar

The app can be reviewed in a browser without obvious visual defects in graph, split, and workbench modes.

## Do not ship

Marketing-first screen, giant hero, one-note theme, dead visual controls, or user-facing proof vocabulary.

## Repair routing

Fix visible defects before moving to architecture cleanup.

## Unlock condition

Browser review shows usable graph/workbench/report/interaction surfaces at target viewports, every term in `00b-ux-contract/copy-quality-bar.md#jargon-ban` is either absent from the product surface or accompanied by its alt-copy, the disclosure plan from `00b-ux-contract/disclosure-plan.md` is honored, and every state row in `00b-ux-contract/empty-blocked-loading-states.yaml` has matching implementation copy.

