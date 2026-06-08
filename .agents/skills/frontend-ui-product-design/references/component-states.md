# Component States

Use this for single components and interactive controls.

## Component-Scope Signals

Treat the task as component-scope when it names a single button, input, card, modal, dropdown, tooltip, select, checkbox, switch, tab strip, chip, badge, banner, snackbar, popover, slider, date picker, avatar, or a single component file.

## Required States

Interactive components must implement relevant states:

- Default.
- Hover.
- Focus-visible.
- Active.
- Disabled.
- Loading.
- Error.
- Success.
- Selected or expanded when applicable.

If a state does not apply, record why in the handoff or test note.

## Proof

Show states in a small preview, Storybook story, test route, or screenshot when practical. Forced classes such as is-hover or is-focus are acceptable for previews if they match the real pseudo-class styles.

## Hard Rules

- No dead controls.
- No hover-only access to critical information.
- Focus-visible must be visible and not rely only on color.
- Disabled controls must explain why when the reason is not obvious.
- Loading and error states must preserve layout shape where possible.
