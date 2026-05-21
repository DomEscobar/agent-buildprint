# DESIGN_QUALITY_BAR

## Product Category

AI creative production workbench for short-drama/comic generation, with desktop/local runtime and provider-backed long-running jobs.

## Taste Direction

Cinematic operator console: confident, dense, and practical. The user should see the active project, current generation/job state, next action, and proof/debug information without feeling trapped in a generic SaaS dashboard.

## Visual Hierarchy

- Primary: active project/episode, current job/agent state, next action.
- Secondary: generated assets, storyboard/timeline/canvas state, provider/model configuration.
- Tertiary: logs, metadata, advanced settings, debug proof.

## Forbidden Generic Patterns

- Static hero/card layouts for complex workbench screens.
- Buttons with no disabled/loading/error/success states.
- Undifferentiated gray panels where active context is unclear.
- Canvas/timeline visuals that do not map to persisted editable state.
- Secret/provider fields that reveal or log secret values.

## Interaction Polish

Controls must communicate pending, retryable, failed, canceled, and completed states. Streaming agent output should feel live but controllable. Provider failures should be recoverable without losing user work.

## Accessibility Gates

Visible focus, semantic labels, non-color-only status, readable contrast, keyboard access for destructive confirmations, and error messages tied to the relevant control.

## Responsive Gates

Validate desktop and narrow Electron windows. Critical actions, confirmation buttons, and provider/model controls must remain visible and usable.

## Required Screenshot Set

For each required surface, capture Empty:, Loading:, Error:, Blocked:, and Success/ready: states when applicable. Minimum screenshots: login, project setup, novel/events, script workspace, media upload, production workbench, provider settings, admin backup/import/reset.
