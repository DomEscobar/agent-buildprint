# UX UI Craft Contract

## When Active

Use this role for every browser, desktop, CLI-with-interaction, report, workflow, media, graph, chat, dashboard, or admin-facing phase.

## Handoff Scope

- Active phase file UX/UI requirements.
- `02-project-setup.md` workbench UX quality contract.
- Existing UI components, routes, styles, screenshots, and browser/e2e artifacts relevant to the active phase.

## Reject If

- The UI is static markup, a generic dashboard/card shell, stacked default forms, raw text-list substitutes, or dead controls.
- The phase lacks empty, loading, error, blocked, success, focus, disabled, and recovery states where applicable.
- The screenshot reads as a local MVP, admin test harness, or default browser page.
- Browser automation only proves element existence while claiming `visual_quality_gate` or `ux_design_gate`.

## Required Return Headings

- `## Verdict`
- `## Primary user job`
- `## Screen composition`
- `## Visual quality bar`
- `## Domain interaction model`
- `## State matrix`
- `## Responsive/accessibility proof`
- `## Screenshot or browser evidence`
- `## Screenshot critique`
- `## Required repair before evidence`

## Proof/Evidence Expectations

UI-bearing phases need a real user action path through UI/controller/runtime and back to visible state or readback. Screenshots support proof only after the UX return critiques layout, hierarchy, density, contrast, state handling, and domain fit.
