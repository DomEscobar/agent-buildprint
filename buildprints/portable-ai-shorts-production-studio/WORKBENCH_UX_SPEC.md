# Workbench UX Spec

## Layout

Use a dense production-studio layout:

- Top area: project/product title, workflow progress, provider mode badge.
- Left/primary column: current step controls and content.
- Right/secondary column: preview/player, selected script summary, status, limitations.
- Bottom/collapsible drawer: logs, provider refs, manifest, validation/debug data.

Cards are allowed for repeated scripts/assets/jobs. Do not wrap the whole app in marketing hero cards. Keep product work surfaces compact and scannable.

## Controls

- URL/manual source mode: segmented control or tabs.
- Script selection: selectable cards with edit control.
- Voice/actor/video mode: menus or segmented controls.
- Consent gates: checkboxes/toggles with explicit labels.
- Generation: primary button, cancel/retry buttons, disabled states with reasons.
- Publish handoff: platform checkboxes, title/description fields, schedule/timezone inputs.
- Debug drawer: collapsed by default.

## Required States

Every major view must support:

- empty state with action;
- loading/running state;
- success/completed state;
- failure state with reason;
- retry or recovery path when applicable.

## Media Preview

The review/player area must show:

- playable MP4;
- 1080x1920 badge;
- duration;
- script title/metadata;
- provider mode;
- output manifest summary.

The generated video must not be blank or a single solid-color proof. Fixture visuals may be deterministic placeholders, but they must visibly represent script/b-roll/caption content.

## Limitations UI

Limitations and non-claims must be visible, but they belong in a compact notice or drawer. They must not dominate the primary workflow.
