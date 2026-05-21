# DESIGN_QUALITY_BAR

## Product Category

- Category: creative/operator graph workbench.
- Primary users: operator importing text and inspecting extracted ontology.
- Primary job-to-be-done: turn source text into a persisted, inspectable graph.
- Usage frequency: repeated project work.
- Environment: desktop first, responsive support.

## Taste Direction

| Variable | Value | Reason |
|---|---|---|
| Aesthetic direction | scientific workbench | graph inspection and extraction status need operational clarity |
| Visual density `1-10` | 7 | graph and detail panels need compact scanning |
| Motion intensity `1-10` | 2 | motion should clarify graph updates only |
| Layout variance `1-10` | 3 | predictable workbench layout |
| Surface depth `1-10` | 3 | panels need separation without decorative cards |

## Visual Hierarchy

- First thing the user should notice: extraction state and graph canvas.
- Primary working surface: ontology graph.
- Secondary panels: selected node details and extraction log.
- Tertiary/debug information: raw extraction metadata.
- Primary action: import/extract.
- High-risk action treatment: not applicable for fixture.

## Composition And Components

- Layout grid: workbench shell with graph and inspector.
- Navigation pattern: project/workbench route.
- Data display pattern: graph canvas plus details panel.
- Input/control pattern: upload/paste input with extraction action.
- Feedback/status pattern: progress, blocked provider, and error states.
- Empty/loading/error/blocked/success visual treatment: all states require screenshots.

## Forbidden Generic Patterns

- Generic KPI-card dashboard unless cards are the actual product workflow.
- Decorative hero as the main screen for an operational tool.
- Purple/blue gradient default look unless justified by product evidence.
- Dead buttons, fake success states, or controls with no owned behavior.
- Static mock data presented as product completion.
- Text overflow, overlap, illegible contrast, or invisible focus states.

## Interaction Polish

- Hover: graph nodes and action buttons show affordance.
- Focus: keyboard visible focus for import and retry.
- Disabled: disabled controls explain blocker.
- Loading: extraction progress visible.
- Error: provider/parser failure has retry.
- Success: persisted graph visible.
- Retry/recovery: retry extraction after provider failure.
- Motion/transition purpose: graph update clarity only.

## Accessibility Gates

- Keyboard path: import and retry reachable.
- Focus visibility: required.
- Contrast: required.
- Labels/names: upload and graph controls labelled.
- Reduced motion: required.
- Error announcement: required.

## Responsive Gates

| Viewport | Required layout behavior | Screenshot artifact |
|---|---|---|
| Mobile | stacked import, graph, details | artifacts/screenshots/mobile.png |
| Tablet | graph above details | artifacts/screenshots/tablet.png |
| Desktop | graph with side inspector | artifacts/screenshots/desktop.png |
| Wide desktop | expanded graph and details | artifacts/screenshots/wide.png |

## Required Screenshot Set

At least one screenshot or browser artifact is required for each major UI state:

- Empty: artifacts/screenshots/empty.png
- Loading: artifacts/screenshots/loading.png
- Error: artifacts/screenshots/error.png
- Blocked: artifacts/screenshots/blocked.png
- Success/ready: artifacts/screenshots/ready.png
- Partial data: artifacts/screenshots/partial.png
- Responsive mobile: artifacts/screenshots/mobile.png
- Responsive desktop: artifacts/screenshots/desktop.png

## Review Verdict

- Status: blocked
- Evidence artifacts: planned screenshot paths only.
- Blockers: implementation not present in fixture.
- Required fixes before UI completion: provide browser proof.
