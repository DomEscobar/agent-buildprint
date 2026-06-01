# Phase 06 - Graph Canvas Design And Copy

requires_roles: [ux-ui-craft]

## Product intention

Make the graph/canvas feel like a serious inspection surface for swarm simulation, with readable controls, details, and states.

## Mapped obligations

- Preserve zoom/pan, refresh, maximize, labels, legend, node detail, edge detail, self-loop grouping, and curved multi-edge readability.
- Avoid generic dashboard copy and debug/proof vocabulary.
- Handle empty, loading, error, provider-blocked, and large-ish graph states.

## Stable vs free

Stable: graph remains the first-class visual work surface.

Free: visual system, graph library, exact colors, motion details.

## Implementation scope

Polish graph canvas interactions, layout, details panel, legends, controls, copy, responsive behavior.

## Interfaces touched

Canvas component, graph data mapper, layout shell, status components.

## State / runtime touched

Selected node/edge, label visibility, viewport/zoom state, graph refresh state.

## UX / DX / operator requirements

Controls use familiar visual affordances; text fits; graph content is inspectable on desktop and mobile.

## Required output (ux-ui-craft)

- Browser screenshots or notes for desktop and mobile.
- Canvas interaction checklist.
- Empty/loading/error/provider-blocked copy.

## Blocks (ux-ui-craft)

- Blank or clipped graph.
- Detail panel text overflow.
- Dead refresh/maximize/toggle controls.
- Raw JSON as primary detail view.

## Quality bar

A user can understand graph structure, inspect facts, and continue to the next step without guessing.

## Do not ship

Do not make the graph a static image or decorative card.

## Repair routing

Visual/copy defects go to this phase.

## Unlock condition

Canvas interactions are browser-reviewed and central defects are fixed or named.
