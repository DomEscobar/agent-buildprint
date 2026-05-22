# UX Contract

This packet builds a portable browser workbench, not a Toonflow UI clone. Exact Toonflow canvas, Electron, route, or final video parity is out of scope. The implementation must still feel like a storyboard production tool, not a generic admin dashboard.

## Screen Inventory

- Project/session gate: local login/session state, project create/select, model/provider mode, blocked-provider status.
- Novel ingestion: chapter import, ordered chapter list, extraction run state, event list, malformed input errors.
- Script workspace: outline, strategy, script, extracted assets, structured artifact status.
- Storyboard board: storyboard table, panel rows, timeline lanes, selected-shot inspector, linked event/script/asset status.
- Media task view: image/video mock tasks with pending/running/success/failure states and task log.
- Preview/export: rendered preview manifest, export affordance, limitations, blocked final-video parity notice.
- Safety/runtime: secret redaction, destructive action confirmation, disabled live-provider state.

## Workflow States

- Empty: new project with no chapters, no events, no script, no storyboard, and no media tasks.
- Loading: import/extraction/storyboard/media task in progress with visible pending state.
- Error: malformed chapter, malformed provider output, invalid session token, invalid storyboard row.
- Blocked: live provider credentials missing, destructive action requires confirmation, final stitched-video export not proven.
- Success/ready: persisted project shows chapters, events, scripts, assets, storyboard rows, media records, and export manifest.
- Restart/readback: browser reload or app restart rehydrates the selected project and storyboard state.

## Component Inventory

- Workspace header with project/session/provider status.
- Step navigation for novel, script, storyboard, media, export, safety.
- Chapter/event list with selection and validation feedback.
- Script artifact panels for outline, strategy, script, and assets.
- Storyboard table or board with frame rows, timeline lanes, selected-shot inspector, and linkage badges.
- Media task list with status, provider mode, error, and retry/blocked affordances.
- Export preview with manifest sections, copy/download action, and limitations.
- Confirmation UI for destructive/reset actions.

## Responsive Rules

- Desktop: storyboard board, timeline, and inspector can sit in multi-column layout.
- Mobile/narrow: navigation wraps, storyboard rows stack above inspector, status pills wrap, and export preview remains readable.
- Text overflow: chapter names, asset names, provider errors, and manifest keys wrap or truncate with accessible labels.
- Control wrapping: primary actions remain reachable without overlapping status indicators.

## Accessibility

- Primary flow is keyboard reachable from project selection through export.
- Focus states are visible on navigation, import, run, export, and confirmation controls.
- Inputs and buttons have accessible names.
- Status is shown with text and icon/shape, not color alone.
- Error and blocked states include recovery text.

## Browser Proof Plan

- Capture screenshots or browser traces for project/session, novel ingestion, script workspace, storyboard board, media task view, export preview, and safety/runtime states.
- At least one screenshot must cover Empty, Loading, Error, Blocked, Success/ready, and Restart/readback states.
- `production-storyboard-flow` proof must show storyboard rows linked to script/events/assets, selected-shot inspector, timeline lanes, and persisted readback.
- `media-preview-export` proof must show export parsed from rendered UI, not a service-only shortcut.

## Non-Negotiable UI Failures

- Generic dashboard card grid as the main screen.
- Raw JSON manifest textarea as the primary product surface.
- Dead buttons or no-op tabs.
- Missing empty/loading/error/blocked states.
- Browser proof that bypasses the rendered workbench.
- UI completion claimed before a real persisted data path or explicit blocker exists.
