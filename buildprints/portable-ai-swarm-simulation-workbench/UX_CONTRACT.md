# UX_CONTRACT

Required because this Buildprint has a user-facing browser workbench.

## UI Scope

- Product surface: upload, graph build, simulation setup/run, report review, deep interaction, history.
- Primary users: analysts, researchers, product teams, and decision makers running scenario simulations.
- Included screens: Home upload, Process graph build, Simulation setup, Simulation run, Report, Interaction, History.
- Excluded screens: auth/admin/billing/marketing site.
- Active capability: `capabilities/01-ingestion-ontology/`

## Taste Direction

- Design quality bar: `DESIGN_QUALITY_BAR.md`
- Aesthetic direction: serious simulation lab with clear graph/workflow instrumentation.
- Visual density: high enough for operational status, not a KPI-card dashboard.
- Motion intensity: restrained, used for progress/running states only.
- Layout variance: workbench layout with primary canvas and contextual side panels.
- Surface depth: subtle panels for tools/logs, no decorative hero-first shell.
- Domain-fit rationale: users need to inspect graph, runtime, reports, logs, and agent interactions without losing workflow context.

## Screens

| Screen | User goal | Primary actions | Data shown | Navigation entry | Required proof |
|---|---|---|---|---|---|
| Home upload | submit seed docs and requirement | add/remove files, start | file list, requirement text, history | `/` | empty/error/ready screenshots |
| Process graph | build and inspect graph | generate ontology, build graph, refresh | task progress, graph nodes/edges, logs | `/process/:projectId` | loading/error/success graph screenshots |
| Simulation setup | generate agent profiles/config | prepare, inspect profiles/config | entities, profiles, platform choices | `/simulation/:simulationId` | setup screenshots |
| Simulation run | run/stop simulation | start, stop, inspect timeline | rounds, actions, posts/comments | `/simulation/:simulationId/start` | running/stopped/error screenshots |
| Report | inspect generated report | generate, view sections/logs | outline, sections, graph context | `/report/:reportId` | report screenshots |
| Interaction | chat with report/agents | send message, select agent | chat history, tool logs, profiles | `/interaction/:reportId` | chat screenshots |
| History | resume/delete artifacts | open project/simulation/report, delete | persisted records and status | home/history panel | empty/populated/delete screenshots |

## Workflows

| Workflow | Start state | Steps | Success state | Failure/blocked states | Proof |
|---|---|---|---|---|---|
| Upload to graph | no project | upload -> ontology -> build -> graph display | graph ready | invalid file, missing provider, task failure | browser + API artifact |
| Graph to simulation | graph ready | create simulation -> prepare profiles/config | config ready | empty graph, LLM failure | browser + API artifact |
| Simulation to report | config ready | start -> monitor -> generate report | report ready | runtime stop/fail, provider failure | browser + logs |
| Deep interaction | report ready | select target -> send chat -> inspect answer/tool trace | answer appended | timeout/tool unavailable | browser + API artifact |

## State Inventory

- Empty: no files, no history, no graph, no report sections.
- Loading: upload/ontology, graph task, profile generation, running simulation, report section generation.
- Error: provider missing, task failed, invalid upload, runtime failed, chat failed.
- Blocked: missing credentials, no graph, no simulation config, destructive action unconfirmed.
- Success/ready: graph displayed, profiles generated, runtime completed, report available.
- Partial data: some profiles/sections/actions available while generation continues.
- Permission denied: reserved for auth/ownership integration; must have UI copy and server status even if local-only.

## Component Inventory

- Layout: workbench shell with route header, stepper, primary work surface, contextual log/inspector panel.
- Navigation: route-based workflow plus history resume links.
- Data display: graph canvas, tables/lists, progress timelines, report sections, chat transcript.
- Forms/inputs: file upload, requirement text, provider/runtime controls, chat input.
- Actions/controls: start/build/prepare/run/stop/generate/delete/refresh.
- Feedback/status: progress bars, toasts/errors, logs, disabled states, blockers.
- Modals/panels: destructive confirmation, details drawer, log drawer.

## Responsive Behavior

- Mobile: stack workflow controls above content; graph becomes inspectable list + pan/zoom canvas.
- Tablet: two-column with collapsible side panel.
- Desktop: primary canvas/report/chat surface with persistent side context.
- Wide desktop: keep content width readable; use side-by-side graph/log/report panels.
- Minimum supported viewport: 360x720.

## Visual Quality Bar

- Domain-specific visual treatment: graph/simulation lab, not generic SaaS metrics.
- Information density: dense but legible operational data.
- Hierarchy: active step, primary artifact, current blocker, next action.
- Interaction affordances: controls clearly show disabled/loading/destructive states.
- Anti-generic-dashboard requirements: no decorative hero as main product; graph/report/runtime are first-class.
- Accessibility constraints: keyboard path, visible focus, contrast, labels, reduced motion.

## Visual Anti-Patterns

- Generic dashboard/card shell risk: forbidden unless cards operate the workflow.
- Decorative hero risk: forbidden for active app.
- One-note palette risk: avoid single purple/blue gradient default.
- Static mock data risk: mock fixtures must be visibly test mode.
- Dead/no-op control risk: blocks completion.
- Text overflow/overlap risk: blocks UI completion.

## Interaction Polish

- Hover: actionable controls and graph nodes show intent.
- Focus: visible ring and keyboard order.
- Disabled: reason shown when blocked.
- Loading: progress plus current operation name.
- Error: actionable recovery and log reference.
- Success: artifact link and next step.
- Retry/recovery: retry failed provider/task without losing state.
- Motion/transition purpose: progress and graph changes only.

## Accessibility Proof

- Keyboard path: upload, build, run, report, chat, delete confirmation.
- Visible focus: all controls and graph inspector items.
- Contrast: text and status colors pass WCAG AA.
- Labels/names: icon buttons have accessible names.
- Reduced motion: progress animation can be disabled.
- Error announcement: errors are announced in status region.

## Browser Proof Plan

- Command: `npm run test:browser` or equivalent Playwright suite.
- Browser paths: `/`, `/process/:projectId`, `/simulation/:simulationId`, `/simulation/:simulationId/start`, `/report/:reportId`, `/interaction/:reportId`.
- Screenshot/artifact paths: `artifacts/screens/*.png`.
- Interaction checks: upload, build, prepare, start/stop, generate report, send chat, delete confirmation.
- Nonblank visual/canvas checks where applicable: graph canvas must contain nodes/edges or empty state.
- Required screenshot states:
  - Empty: home/history empty.
  - Loading: graph build and report generation.
  - Error: provider missing.
  - Blocked: missing credentials/no graph.
  - Success/ready: graph, run status, report, chat.
  - Partial data: profiles or report sections still generating.
  - Mobile: home/process/report.
  - Desktop: graph/run/interaction.
- Blockers: no browser proof, no responsive proof, or no graph nonblank check blocks UI completion.
