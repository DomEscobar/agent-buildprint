---
name: frontend-ui-product-design
description: Use when building or changing any human-facing UI, frontend, dashboard, app, page, component, or visual workflow from a Buildprint.
---

# Frontend UI Product Design

Use before UI code. The goal is not decoration; the goal is a product surface that makes the current task obvious, fits the artifact, and rejects generic AI UI.

## Core Workflow

1. Read `references/preflight.md` when the project already has files, design tokens, components, CSS, or a framework.
2. Read `references/screen-states.md` before layout for any screen, app shell, or workflow.
3. Read `references/structural-variety.md` before choosing the page or screen structure.
4. Read `references/design-tokens.md` before writing colors, fonts, spacing, focus, or state styles.
5. Read `references/component-states.md` for single components or interactive controls.
6. Read `references/mobile-hard-floor.md` before responsive verification.
7. Read `references/slop-review.md` before final handoff.

## Required Decisions

- Audience, current task, dominant object, primary gesture, first action.
- Scope: component, screen state, multi-step flow, or full app shell.
- Aesthetic direction and adjacent directions rejected.
- Current screen state: visible now, reachable later, placement for details, and what must not be visible together.
- One dominant surface, one supporting context surface, and one action/status surface per screen state.

## Hard Rejections

- Generic dashboard, renamed workbench, card grid, admin shell, proof console, or raw JSON as the main experience.
- Stuffing all capabilities into one permanent page to show requirement coverage.
- Template rhythm reused without product reason.
- Untokenized colors/fonts, invented proof copy, fake chrome, and display-heading italics.
- UI copy that exposes evaluator/build/proof terms unless the artifact is explicitly a developer tool.
