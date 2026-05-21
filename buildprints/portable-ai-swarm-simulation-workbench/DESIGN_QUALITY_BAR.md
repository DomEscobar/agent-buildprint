# DESIGN_QUALITY_BAR

Required because `TEAM_STACK.md` selects `ux-ui-craft`.

## Product Category

- Category: AI simulation and graph-analysis workbench.
- Primary users: analysts, researchers, decision makers, creators exploring scenario outcomes.
- Primary job-to-be-done: run a prediction simulation from seed material and inspect the resulting graph, agents, actions, report, and conversations.
- Usage frequency: repeated sessions with long-running jobs.
- Environment: desktop-first browser app with responsive support.

## Taste Direction

| Variable | Value | Reason |
|---|---|---|
| Aesthetic direction | simulation lab / graph operations console | The product centers on graph and runtime artifacts. |
| Visual density `1-10` | 8 | Users compare state, logs, graph, report, and actions. |
| Motion intensity `1-10` | 3 | Motion should clarify progress, not decorate. |
| Layout variance `1-10` | 6 | Different artifacts need canvas, timeline, report, and chat layouts. |
| Surface depth `1-10` | 4 | Panels should organize tools without heavy card nesting. |

## Visual Hierarchy

- First thing the user should notice: current workflow step and whether it is ready, running, blocked, or failed.
- Primary working surface: upload form, graph canvas, simulation timeline, report body, or chat transcript depending on route.
- Secondary panels: logs, entity/profile inspector, configuration, proof/status details.
- Tertiary/debug information: raw provider responses and console logs in collapsible drawers.
- Primary action: next workflow action, visually dominant but disabled with reason when blocked.
- Destructive action treatment: explicit danger styling plus confirmation and ownership/server check.

## Composition And Components

- Layout grid: constrained app shell with persistent header, step rail, primary content, contextual side panel.
- Navigation pattern: workflow route progression plus history resume.
- Data display pattern: graph canvas, timeline, tables, report sections, chat messages.
- Input/control pattern: high-confidence primary controls with status text and retry.
- Feedback/status pattern: progress, current operation, evidence/log link, blocker message.
- Empty/loading/error/blocked/success visual treatment: each state has distinct copy, controls, and next action.

## Forbidden Generic Patterns

- Generic KPI-card dashboard unless cards are the actual workflow controls.
- Decorative hero as the main screen for the operational app.
- Purple/blue gradient default look unless justified by product evidence.
- Dead buttons, fake success states, or controls with no owned behavior.
- Static mock data presented as product completion.
- Text overflow, overlap, illegible contrast, or invisible focus states.

## Interaction Polish

- Hover: graph nodes, report sections, buttons, and history rows expose action affordances.
- Focus: tab order follows workflow and side panel controls.
- Disabled: every disabled primary action explains what is missing.
- Loading: show operation name, progress when known, and safe cancel/stop where relevant.
- Error: show recoverable action and log/proof link.
- Success: show produced artifact and next workflow step.
- Retry/recovery: retry provider/job actions without losing persisted project state.
- Motion/transition purpose: communicate long-running progress and graph changes only.

## Accessibility Gates

- Keyboard path: complete one happy path without pointer.
- Focus visibility: visible on buttons, file input, graph list fallback, chat input.
- Contrast: AA contrast for body text, controls, and status labels.
- Labels/names: icon controls have accessible names.
- Reduced motion: animated graph/progress effects respect reduced motion.
- Error announcement: failed async jobs and validation errors are announced.

## Responsive Gates

| Viewport | Required layout behavior | Screenshot artifact |
|---|---|---|
| Mobile | stacked controls, graph fallback list, no text overlap | `artifacts/screens/mobile-process.png` |
| Tablet | collapsible side panel, readable graph/report | `artifacts/screens/tablet-report.png` |
| Desktop | primary canvas/report/chat plus persistent side context | `artifacts/screens/desktop-graph.png` |
| Wide desktop | side-by-side graph/log/report without stretched text | `artifacts/screens/wide-interaction.png` |

## Required Screenshot Set

- Empty: home upload and empty history.
- Loading: ontology/graph build and report section generation.
- Error: provider missing and runtime failure.
- Blocked: no credentials/no graph/destructive unconfirmed.
- Success/ready: graph, simulation status, report, chat.
- Partial data: generating profiles or sections.
- Responsive mobile: upload/process/report.
- Responsive desktop: graph/run/interaction.

## Review Verdict

- Status: missing until browser evidence exists.
- Evidence artifacts: planned under `artifacts/screens/`.
- Blockers: no implementation yet.
- Required fixes before UI completion: screenshot proof, keyboard proof, responsive proof, graph nonblank check.
