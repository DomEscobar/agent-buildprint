# Mobile Hard Floor

Use this for every human-facing UI.

## Required Viewports

Verify at:

- 320 px.
- 375 px.
- 414 px.
- 768 px.

## Failures

The UI fails if any viewport has:

- Page-level horizontal scroll.
- Clipped controls or text.
- Unreadable text.
- Two-line clickable labels caused by cramped controls or nav.
- Image grids using bare 1fr tracks that overflow instead of minmax(0, 1fr).
- Display headings that cannot wrap long words.
- Section heads that stay multi-column when mobile needs a single column.
- Mobile layout that only stacks desktop panels without reconsidering task order.
- Tabs, drawers, or accordions that jump the viewport unexpectedly.

## Mobile Design Rule

Mobile is not a compressed desktop. Choose the dominant task again for mobile and hide secondary surfaces more aggressively.
