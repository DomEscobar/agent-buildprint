---
name: frontend-ui-product-design
description: Use when building or changing any human-facing UI, frontend, dashboard, app, page, component, or visual workflow from a Buildprint.
phase: 02-ui-identity
triggers:
  - UI identity
  - frontend
  - page
  - component
  - visual workflow
skips:
  - backend-only change
  - CLI-only change
  - docs-only edit
completion_signal: UI_IDENTITY_DONE
---

# Frontend UI Product Design

Use before UI code. The goal is not decoration; the goal is a product surface that makes the current task obvious, fits the artifact, and rejects generic AI UI.

## Core Workflow

1. Read `references/product-taste.md` before choosing product genre, visual quality bar, taste dials, or anti-defaults.
2. Read `references/preflight.md` when the project already has files, design tokens, components, CSS, or a framework.
3. Read `references/screen-states.md` before layout for any screen, app shell, or workflow.
4. Read `references/structural-variety.md` before choosing the page or screen structure.
5. Read `references/aesthetic-direction.md` before choosing the visual style; commit to one named direction with concrete type, color, shape, and motion choices.
6. Read `references/design-tokens.md` before writing colors, fonts, spacing, focus, or state styles.
7. Read `references/component-states.md` for single components or interactive controls.
8. Read `references/mobile-hard-floor.md` before responsive verification.
9. Read `references/screenshot-capture.md` before capturing UI proof.
10. Read `references/slop-review.md` before final handoff.

## Required Decisions

- Audience, current task, dominant object, primary gesture, first action.
- Design read: product genre, audience, desired first-screen feeling, and nearest lazy default rejected.
- Taste dials: 4-7 product-specific dials with target values and screenshot-checkable implications.
- DESIGN.md split: `docs/ui-identity.md` governs product/interaction; `docs/DESIGN.md` governs visual taste, tokens, components, motion, and responsive craft.
- Scope: component, screen state, multi-step flow, or full app shell.
- Named aesthetic direction from `references/aesthetic-direction.md`, the concrete tokens it commits to, and the adjacent direction rejected.
- Current screen state: visible now, reachable later, placement for details, and what must not be visible together.
- One dominant surface, one supporting context surface, and one action/status surface per screen state.

## Hard Rejections

- Generic dashboard, renamed workbench, card grid, admin shell, proof console, or raw JSON as the main experience.
- Stuffing all capabilities into one permanent page to show requirement coverage.
- Template rhythm reused without product reason.
- Empty-state feature demos, generic seeded cards, internal status labels, or blank dead zones that make the UI feel like a harness instead of a product.
- Untokenized colors/fonts, invented proof copy, fake chrome, and display-heading italics.
- UI copy that exposes evaluator/build/proof terms unless the artifact is explicitly a developer tool.

End the identity or UI-design handoff with `UI_IDENTITY_DONE` only after the generated local identity artifact, `docs/DESIGN.md`, and UI implementation proof exist, or an explicit non-UI blocker is recorded.
