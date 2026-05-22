# UX Contract

Required for executable packets with user-facing UI, browser workflows, dashboards, graphs, reports, editors, or operator consoles.

## Screen Inventory

- Primary workspace screen:
- Secondary detail/inspector screen:
- Import/upload screen:
- Export/report screen:
- Safety/blocked-provider screen:

## Workflow States

- Empty:
- Loading:
- Error:
- Blocked:
- Success/ready:
- Restart/readback:

## Component Inventory

- Navigation or workspace switcher:
- Primary action controls:
- Data table/list/board/canvas:
- Detail inspector:
- Provider/task/status indicators:
- Export/report affordance:

## Responsive Rules

- Desktop:
- Mobile:
- Text overflow:
- Control wrapping:

## Accessibility

- Keyboard path:
- Focus visibility:
- Labels and names:
- Contrast:
- Error messaging:

## Browser Proof Plan

- Capture at least one screenshot or browser trace for each major workflow state.
- Browser proof must exercise rendered UI, not only API responses or raw JSON.
- UI completion is blocked until screenshots or browser automation show empty, loading, error, blocked, and success/ready states.

## Non-Negotiable UI Failures

- Generic dashboard cards as the main product surface.
- Static markup with dead buttons.
- Missing empty/loading/error/blocked states.
- No browser proof.
- UI that cannot prove a real data path to persistence or an explicit blocker.
