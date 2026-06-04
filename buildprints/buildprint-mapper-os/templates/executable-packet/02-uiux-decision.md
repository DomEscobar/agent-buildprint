# 02 UI/UX Decision

Use this file only for artifacts with human-facing UI, CLI interaction, operator screens, reports, dashboards, editors, or browser workbenches. For non-UI libraries/services, write `not-ui-bearing` in setup and describe the developer/operator experience instead.

## How to implement this decision

Before UI code, read:

- `BUILDPRINT.md`
- `01-project-setup.md`
- current project `AGENTS.md`

Then define the experience in enough detail that a coding agent cannot ship generic cards and gradients as good UI.

## UI/UX objective

Describe the intended product feel, main user surfaces, primary layout, visual hierarchy, interaction model, motion/transition expectations, and state coverage. Make this concrete to the mapped product. If the source had a distinctive feel, preserve the useful quality without copying source internals.

For UI-bearing products, the first meaningful screen must expose the product loop. It should not be a marketing landing page unless the product itself is a marketing site. Every visible CTA must work or show an honest blocked state. Every loading, empty, error, and blocked state must explain what is happening and what the user can do next.

## DO NOT

- Do not use placeholder cards, lorem ipsum, or fake activity feeds.
- Do not create functionless buttons, inert tabs, decorative charts, or static graph bubbles.
- Do not treat raw JSON as the main experience unless the product is explicitly a developer JSON tool.
- Do not use sample data as proof for real input/operator paths.
- Do not hide provider/runtime/deployment blockers behind optimistic success UI.
- Do not claim polished from colors alone; interaction and state behavior matter.

## Minimum proof before moving on

- UI identity/state rules are recorded in project docs;
- first screen maps to the golden path;
- clickable/control inventory is known;
- screenshot/browser critique criteria are documented;
- blocked/provider/error states are designed before happy-path-only implementation begins.
