# UX_CONTRACT

## UI Scope

- Product surface: MicroFish ingestion and graph workbench.
- Primary users: operator importing text and inspecting extracted ontology.
- Included screens: upload/import, extraction progress, graph workbench, error/blocked state.
- Excluded screens: production account management.
- Active capability: ingestion and ontology.

## Taste Direction

- Design quality bar: `DESIGN_QUALITY_BAR.md`
- Aesthetic direction: scientific workbench.
- Visual density: 7.
- Motion intensity: 2.
- Layout variance: 3.
- Surface depth: 3.
- Domain-fit rationale: graph inspection needs a dense workbench, not a generic dashboard.

## Screens

| Screen | User goal | Primary actions | Data shown | Navigation entry | Required proof |
|---|---|---|---|---|---|
| Upload/import | submit source text | choose file, paste text, start extraction | selected file, validation state | root route | screenshot/browser path |
| Graph workbench | inspect extracted ontology | pan, select node, view details | nodes, edges, properties | post-extraction route | screenshot/browser path |

## Workflows

| Workflow | Start state | Steps | Success state | Failure/blocked states | Proof |
|---|---|---|---|---|---|
| ingest text | empty project | upload, extract, persist, display graph | graph ready | empty/loading/error/blocked/ready | browser screenshot blocked until implementation |

## State Inventory

- Empty: no project loaded.
- Loading: extraction in progress.
- Error: parser/provider failure.
- Blocked: missing LLM/runtime credentials.
- Success/ready: graph persisted and visible.
- Partial data: extracted nodes without full relationships.
- Permission denied: not applicable for trusted-local fixture.

## Component Inventory

- Layout: workbench shell.
- Navigation: active project/workbench route.
- Data display: graph canvas and details panel.
- Forms/inputs: upload/paste input.
- Actions/controls: extract, retry, select node.
- Feedback/status: progress, blockers, errors.
- Modals/panels: node details.

## Responsive Behavior

- Mobile: stacked upload and graph/detail panels.
- Tablet: graph above details.
- Desktop: graph with side detail panel.
- Wide desktop: expanded graph canvas and details.
- Minimum supported viewport: 390px wide.

## Visual Quality Bar

- Domain-specific visual treatment: ontology graph and extraction status must look like a real workbench, not generic dashboard cards.
- Information density: dense enough to inspect nodes and edges without marketing layout.
- Hierarchy: import status, graph, and selected-node details are visually distinct.
- Interaction affordances: graph selection and retry actions must be obvious.
- Anti-generic-dashboard requirements: no static KPI-card shell.
- Accessibility constraints: keyboard reachable import actions and visible focus states.

## Visual Anti-Patterns

- Generic dashboard/card shell risk: forbidden unless graph metrics become actual workflow.
- Decorative hero risk: forbidden for workbench first screen.
- One-note palette risk: blocked by design quality bar.
- Static mock data risk: fixture remains unqualified until real data path proof.
- Dead/no-op control risk: controls must expose blocker or behavior.
- Text overflow/overlap risk: responsive screenshots required.

## Interaction Polish

- Hover: graph nodes and buttons.
- Focus: import and retry controls.
- Disabled: provider-blocked controls explain missing runtime.
- Loading: extraction status.
- Error: parser/provider failure.
- Success: graph ready.
- Retry/recovery: retry extraction.
- Motion/transition purpose: graph update clarity.

## Accessibility Proof

- Keyboard path: import and retry.
- Visible focus: required.
- Contrast: required.
- Labels/names: upload and graph controls.
- Reduced motion: required.
- Error announcement: required.

## Browser Proof Plan

- Command: blocked until implementation exists.
- Browser paths: `/`, `/workbench`.
- Screenshot/artifact paths: `artifacts/screenshots/microfish-workbench.png`.
- Interaction checks: upload, extraction blocker, graph empty/error/ready states.
- Nonblank visual/canvas checks where applicable: graph canvas must render nonblank.
- Required screenshot states:
  - Empty: `artifacts/screenshots/empty.png`
  - Loading: `artifacts/screenshots/loading.png`
  - Error: `artifacts/screenshots/error.png`
  - Blocked: `artifacts/screenshots/blocked.png`
  - Success/ready: `artifacts/screenshots/ready.png`
  - Partial data: `artifacts/screenshots/partial.png`
  - Mobile: `artifacts/screenshots/mobile.png`
  - Desktop: `artifacts/screenshots/desktop.png`
- Blockers: implementation not present in fixture.
