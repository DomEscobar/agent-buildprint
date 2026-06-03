# Phase 06 — Design system and copy

requires_roles: [ux-ui-craft, product-architect]

ux_obligations:
  - 00b-ux-contract/copy-quality-bar.md#reading-level
  - 00b-ux-contract/copy-quality-bar.md#jargon-ban
  - 00b-ux-contract/copy-quality-bar.md#alt-copy
  - 00b-ux-contract/disclosure-plan.md

## Product intention

Raise product taste: components, visual hierarchy, copy, and progressive disclosure should make the product feel deliberate and trustworthy.

## Mapped obligations

- Visual quality bar for layout, hierarchy, spacing, density, and responsiveness.
- Component patterns for forms/actions/results/status/errors/navigation.
- Copy rules: plain language and user outcome focus.
- Progressive disclosure and accessibility basics.

## Stable vs free

- Stable: quality thresholds for readability, interaction clarity, and copy tone.
- Free: component library and implementation details.

## Implementation scope

- Define reusable component patterns and states.
- Enforce copy quality and terminology rules.
- Add responsive and accessibility checks for primary flows.
- Prevent debug/proof language leakage to product surfaces.

## Interfaces touched

- UI component library and page compositions.
- Copy/content system and labels.
- Accessibility/focus state implementation.

## State / runtime touched

- UI state variants for empty/loading/error/blocked/success.
- Theme/density/layout constraints where relevant.

## UX / DX / operator requirements

- First viewport communicates purpose and primary action.
- Dense/tooling screens remain readable and navigable.

## Required output (ux-ui-craft)

- Workflow-first composition and state inventory.
- Responsive behavior and accessible focus states for core paths.

## Blocks (ux-ui-craft)

- Generic card dashboard substitute.
- Text overflow, overlapping controls, unreadable contrast, or missing focus states.

## Required output (product-architect)

- Component boundaries align with domain/workflow boundaries.

## Blocks (product-architect)

- Visual refactors that hide broken workflow behavior.

## Quality bar

A screenshot should communicate the product promise and primary action without explanation, and the copy should make the user feel guided rather than tested.

## Do not ship

Generic SaaS cards, decorative gradients hiding weak UX, placeholder copy, inconsistent components, cramped debug panels, or proof/phase vocabulary in the product surface.

## Repair routing

- design/copy defect -> current phase
- workflow clarity regression -> `01-shell-and-navigation.md`
- unresolved polish blocker -> `05-handover.md`

## Unlock condition

Core screens are readable, consistent, accessible, and free of placeholder/internal vocabulary, every term in `00b-ux-contract/copy-quality-bar.md#jargon-ban` either does not appear on the product surface or appears with its alt-copy, and the disclosure plan from `00b-ux-contract/disclosure-plan.md` is honored by what is default vs progressive vs expert.
