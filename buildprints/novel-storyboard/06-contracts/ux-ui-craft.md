# UX UI Craft Contract

This role is the visual and interaction quality gate for the active phase. It prevents generic dashboard output, static mockups, dead controls, local-MVP screens, and "it renders" claims from becoming product evidence.

## When Active

Activate for every phase with a visible screen, workflow, graph, timeline, storyboard, media surface, chat, settings panel, status surface, or user-facing error/blocked state.

## Handoff Scope

The handoff must include the active phase file and `## UX/UI requirements`, `02-project-setup.md` workbench UX quality contract, relevant UI files/tests/screenshots, the expected user action path, and role returns that affect UI behavior.

## Taste Variables

Infer storyboard-specific values unless product direction is ambiguous: creative production tool, medium-high density, canvas plus inspector, media-board surface depth, iterative review/approval tempo.

## Requirements

- The first viewport must clearly communicate storyboard production workbench through ordered shot frames, visual media surfaces and selected-shot detail.
- Storyboard frames must be first-class visual objects with stable preview aspect ratios, shot number, scene/beat label, status, linked assets/characters and revision signal.
- The graph/canvas supports production flow, but it must not be the only meaningful visual artifact on screen.
- A selected-frame inspector must support prompt, notes, continuity, status and media review.
- Empty, loading, blocked, streaming, pending, success and failure states must be visible.

## Visual quality bar

The visual system must be intentional and production-grade: dense but calm, media-forward, polished spacing, readable type scale, no generic dashboard filler, no decorative gradients used as a substitute for product content, and no local MVP look.

## Screenshot critique

Browser or screenshot evidence must critique visual hierarchy, shot-frame legibility, responsive behavior, accessibility, overlap/clipping, and whether the screen reads as a storyboard product rather than a raw graph editor.

## Reject If

- The UI is static markup, generic dashboard cards, stacked default forms, raw text-list substitutes, dead controls, or a disconnected demo page.
- The primary storyboard job is not visible in the first useful viewport.
- Graph/storyboard/media concepts are rendered as plain lists when the domain needs richer affordances.
- Text overflows, overlaps, clips controls, hides next actions, or fails mobile/desktop layout.
- Screenshot proof only shows elements exist and does not critique visual hierarchy, density, contrast, responsive behavior, and domain fit.

## Required Return Headings

The return file `.buildprint/phase-runs/<phase-id>/returns/ux-ui-craft.md` must use:

- `## Verdict`: pass | pass-with-scoped-debt | blocker | not-ui-bearing
- `## Primary user job`
- `## Taste variables`
- `## Screen composition`
- `## Domain interaction model`
- `## State matrix`
- `## Visual quality bar`
- `## Responsive/accessibility proof`
- `## Screenshot or browser evidence`
- `## Screenshot critique`
- `## Required repair before evidence`

## Proof/Evidence Expectations

UI-bearing phases need one real user action path through UI/controller/runtime and back to visible state or readback before `phase_core_passed`. Browser/e2e/screenshot proof can upgrade UX claims only when this return critiques the actual captured UI and finds no blocking visual or interaction defects.
