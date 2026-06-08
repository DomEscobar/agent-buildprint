# Screen States

Use this before layout for any screen, app shell, or flow.

## Screen-State Decision

Write the decision before UI code:

- Current task.
- Dominant product or creative surface.
- Visible now.
- Reachable but hidden.
- Detail, modal, drawer, step, or route placement.
- What must not be visible together.

## Surface Budget

A screen state may permanently show:

- One dominant surface.
- One supporting context surface.
- One action or status surface.

Everything else must be reachable through tabs, steps, routes, drawers, popovers, scoped modals, or detail views.

## Placement Rules

- Use a route for a full task switch.
- Use steps for ordered creation or setup.
- Use tabs for sibling views over the same object.
- Use drawers for temporary context or inspector detail.
- Use modals only for focused interruption, confirmation, short forms, or narrow detail.
- Use inline expansion only when it does not break the dominant surface.

## Buildprint Failure To Prevent

Do not expose intake, graph, outline, storyboard, drafting, review, export, provider status, continuity, and chat all at once just because the Buildprint lists them. Capabilities are not simultaneous regions.
