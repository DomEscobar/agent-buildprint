# UX Contract

The first screen is the usable workbench, not a landing page. The UI must support upload/start, graph/split/workbench viewing, five-step workflow progress, status logs, graph inspection, simulation setup, runtime monitoring, report generation, chat/deep interaction, and history.

Required states: empty, loading, streaming/progress, ready, partial provider failure, validation error, retryable task failure, stale/recovered after refresh, destructive confirmation, deleted/reset, and provider unavailable.

Required proof: desktop and mobile browser screenshots for upload, graph, simulation setup, runtime monitor, report, chat, and history; interaction traces for upload validation, task polling, graph inspect, start/stop, report generation, chat, delete confirmation, and refresh recovery.


## Screen Inventory

- Workbench/dashboard screen for the active capability.
- Detail/inspector surface where graph, report, simulation, or record state is visible.

## Workflow States

- Empty: no project/data loaded yet.
- Loading: upload/job/provider/runtime work is in progress.
- Error: validation/provider/runtime/persistence failure with actionable recovery.
- Blocked: missing credentials, proof, persistence, or security review is explicit.
- Success/ready: persisted result is visible and ready for downstream handoff.

## Component Inventory

- Primary action controls, status/progress region, result panel, error/blocked callout, and retry/reset/export controls where applicable.

## Responsive Rules

- Must remain usable on desktop and narrow tablet widths; dense graph/workbench layouts must collapse without hiding proof-critical state.

## Accessibility

- Keyboard reachable controls, visible focus, semantic labels, and non-color-only status indicators.

## Browser Proof Plan

- Capture screenshot/browser trace for empty, loading, error, blocked, and Success/ready states tied to real state transitions.
