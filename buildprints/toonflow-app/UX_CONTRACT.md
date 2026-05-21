# UX_CONTRACT

Required because `TEAM_STACK.md` selects `ux-ui-craft`.

## Taste Direction

Toonflow should feel like a serious AI production workbench: cinematic, operator-grade, calm, and legible. Avoid generic dashboard chrome and static mock controls.

## Screens

- Login and expired-token recovery.
- Project setup and model selection.
- Novel import and chapter event extraction.
- Script agent workspace.
- Asset/media library and upload.
- Production agent workbench/canvas.
- Storyboard/flow persistence and video timeline.
- Provider, skill, memory, backup/import/reset settings.

## Workflows

| Workflow | Required states | Proof artifact | Status |
|---|---|---|---|
| Login/token gate | empty, invalid credentials, expired token, loading, success | `artifacts/browser/login-flow.png` | blocked |
| Project setup/model selection | empty list, validation error, unavailable model, saved project | `artifacts/browser/project-setup.png` | blocked |
| Novel import/events | empty file, parsing, provider pending, provider error, event success | `artifacts/browser/novel-events.png` | blocked |
| Script agent workspace | empty, streaming, stopped, provider error, saved script | `artifacts/browser/script-agent.png` | blocked |
| Asset/media library | empty, upload progress, invalid file, preview error, delete confirmation | `artifacts/browser/media-library.png` | blocked |
| Production workbench | empty canvas, editing, provider pending, failed generation, saved graph | `artifacts/browser/production-workbench.png` | blocked |
| Admin/settings | invalid vendor, model test pending/error/success, destructive confirmation | `artifacts/browser/settings-admin.png` | blocked |

## State Inventory

Every screen must prove empty, loading, error, blocked, and success/ready states where applicable. Long-running provider jobs must expose pending/progress/error/cancel/retry. Destructive admin operations must expose confirmation, in-progress, success, and failure states.

## Component Inventory

Required components include authenticated shell, project form, model picker, upload dropzone, asset grid, socket/chat stream, canvas/flow editor, storyboard/timeline, provider code editor, skill editor, memory controls, backup/import/reset confirmations, toasts/errors, and job status components.

## Responsive Behavior

Support normal desktop workbench width and narrow desktop/Electron windows. Canvas/timeline/editor regions may remain desktop-first but must avoid clipped critical actions and hidden destructive confirmations.

## Visual Quality Bar

See `DESIGN_QUALITY_BAR.md`. The UX contract blocks static shells, no-op controls, and buttons without loading/error/disabled/success feedback.

## Visual Anti-Patterns

- Generic dashboard cards that hide creative production state.
- Static canvas/timeline that looks editable but does not mutate state.
- Provider/model controls without unavailable/error states.
- Destructive admin actions without confirmation and visible result feedback.

## Interaction Polish

Keyboard and pointer interaction must work for forms, modals, destructive confirmations, editor controls, job controls, and navigation. Streaming jobs need stop/retry affordances.

## Accessibility Proof

Provide visible focus states, semantic form labels, non-color-only statuses, usable contrast, and keyboard reachability proof for critical workflows.

## Browser Proof Plan

Capture screenshots or browser automation artifacts for login, project setup, novel import/events, script workspace, asset upload, production canvas, provider settings, and destructive admin confirmation. Browser/Electron proof must demonstrate real navigation and state changes, not static text presence.
