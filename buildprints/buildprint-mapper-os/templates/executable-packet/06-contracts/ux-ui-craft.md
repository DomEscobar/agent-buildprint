# UX UI Craft Contract

This role is the visual and interaction quality gate for the active phase. It prevents generic dashboard output, static mockups, dead controls, local-MVP screens, and "it renders" claims from becoming product evidence.

## When Active

Activate for every phase with a visible screen, workflow, dashboard, graph, timeline, report, document, media surface, chat, settings panel, admin panel, status surface, CLI interaction, or user-facing error/blocked state.

If the phase is not UI-bearing, the return still records `not-ui-bearing` and names any downstream UI obligations created by this phase.

## Handoff Scope

The handoff must include:

- active phase file and its `## UX/UI requirements`;
- `02-project-setup.md` workbench UX quality contract and root design assumptions;
- relevant current UI files, routes, components, styles, tokens, state/controller files, tests, screenshots, and browser proof artifacts;
- the expected user action path for this phase;
- any role returns that affect UI behavior, especially integration/runtime, data persistence, and security.

Do not ask this role to redesign unrelated screens. It reviews the active phase surface and the shared workbench shell only where the phase touches it.

## Taste Variables

Infer these values unless the product direction is truly ambiguous:

- `AESTHETIC_DIRECTION`: utilitarian workbench, scientific console, creative production tool, operational cockpit, consumer flow, developer tool, report reader, graph explorer, simulation board, etc.
- `VISUAL_DENSITY`: 1 airy to 10 dense. Operational tools usually need 6-8. Creative tools usually need 5-7 with a prominent work surface.
- `MOTION_INTENSITY`: 1 static to 10 expressive. Use motion only to clarify state, causality, queue/progress, or spatial relationships.
- `LAYOUT_MODEL`: workflow rail, canvas plus inspector, split pane, table plus detail, timeline, chat plus context, graph plus inspector, report reader, setup wizard, or cockpit.
- `SURFACE_DEPTH`: flat, layered, panelized, canvas-like, document-like, or media-board.
- `INTERACTION_TEMPO`: single-shot form, iterative editing, live streaming, queued job, review/approval, simulation/playback, or report export.

Do not turn taste variables into visible UI copy. They are implementation guidance.

## Domain-Fit Rubric

- Operational tools: dense, quiet, fast to scan, restrained color, compact controls, predictable navigation, strong table/detail/readback affordances.
- Creative or simulation tools: workspace first, preview/canvas/timeline prominence, inspector panels, media states, playback/progress controls, rich selection affordances.
- Data/graph products: selectable nodes/edges, provenance, filters, comparison, detail pane, citation/source trace, export/report affordances.
- Report/chat products: conversation state, citations/tool calls, logs, blocked-provider states, history/readback, clear retry/recovery.
- Admin/security tools: explicit permissions, audit, destructive-action confirmation, disabled reasons, safe error copy, visible policy state.
- Developer tools: logs, config diagnostics, command/proof output, low decoration, precise status, recovery steps.

## Composition Rules

- Start from the primary user job, not a hero, marketing panel, or card grid.
- Put the main working surface in the first useful viewport.
- Use cards only for repeated items, modals, or genuinely framed objects. Do not put page sections inside decorative cards.
- Use stable dimensions for boards, grids, toolbars, counters, canvases, previews, and history panes.
- Every visible control must have an owned behavior, disabled reason, or explicit blocker.
- Prefer familiar controls: icon buttons for tools, tabs for views, segmented controls for modes, toggles for binary settings, sliders/inputs for numeric values, menus for option sets.
- Avoid one-note palettes, default purple/blue gradients, oversized hero type inside tools, stock-like decoration, and dark blurred backgrounds unless the domain requires them.

## Interaction State Matrix

For the active user action path, define and review:

- empty state: what the user can do first;
- loading/running state: progress, cancellation, logs, and disabled controls;
- success state: readback, output preview, next action;
- error state: cause, recovery, retry, preserved input;
- blocked-provider state: missing credential/runtime, deterministic fallback, live-proof blocker;
- partial-data state: degraded output with honest labels;
- destructive state: confirmation, disabled reason, undo or irreversible warning;
- focus/keyboard/mobile states where relevant.

## Reject If

- The UI is static markup, generic dashboard cards, stacked default forms, raw text-list substitutes, dead controls, or a disconnected demo page.
- The primary user job is not visible in the first useful viewport.
- Graph, timeline, report, chat, media, or simulation concepts are rendered as plain lists when the domain needs richer affordances.
- Empty, loading, error, blocked-provider, success, partial-data, disabled, focus, and recovery states are missing.
- Text overflows, overlaps, clips controls, hides next actions, or fails mobile/desktop layout.
- A full-suite browser product is implemented as a single embedded HTML/CSS/JS blob without component/state/runtime ownership.
- Screenshot/browser proof only shows elements exist and does not critique visual hierarchy, density, contrast, responsive behavior, and domain fit.
- The screenshot reads as a local MVP, admin test harness, default browser page, template dashboard, or generic SaaS card grid.
- `## Screenshot critique` narrates the quality bar as satisfied without naming the specific artifact file it reviewed and at least one concrete finding (defect found, or explicit "none found" with the artifact path as evidence).
- A `pass` or `pass-with-scoped-debt` verdict is written when `## Screenshot or browser evidence` names files that do not exist under `.buildprint/phase-runs/<phase-id>/`, or when all named screenshots are identical to the initial page load.

## Evidence binding

Before writing `## Verdict: pass` or `## Verdict: pass-with-scoped-debt`:

1. Confirm every artifact named in `## Screenshot or browser evidence` exists on disk under `.buildprint/phase-runs/<phase-id>/`. A file named but absent on disk is a blocker; do not invent paths or assume the file will be created later.
2. Confirm that at least one artifact visibly differs from the initial page load: the post-action screenshot or trace must show a state change driven by the user action path (e.g. a new row in a list, a status badge change, a filled form being replaced by a readback view). Name the initial artifact, the post-action artifact, and the visible difference explicitly.
3. Confirm that no artifact in this return was first produced for an earlier phase. Reusing a phase 01 screenshot as evidence for phase 03 is an evidence ceiling violation and a blocker.

If any of conditions 1–3 fails, set `## Verdict: blocker` and name the missing or invalid artifact in `## Required repair before evidence`.

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
- `## Screenshot or browser evidence` — list each file by exact path; confirm each exists
- `## Screenshot critique` — name the specific file reviewed; name at least one concrete defect found, or state "none found: <artifact-path>" with the path as evidence
- `## Required repair before evidence`

## Proof/Evidence Expectations

UI-bearing phases need one real user action path through UI/controller/runtime and back to visible state or readback before `phase_core_passed`.

Browser/e2e/screenshot proof can upgrade UX claims only when this return critiques the actual captured UI and finds no blocking visual or interaction defects. At least one captured state must exercise the active action path, not only the initial page.

If browser tooling is unavailable, write a non-upgrading blocker and still provide local interaction/state-transition proof where possible. Static DOM text checks do not prove interaction polish or visual quality.
