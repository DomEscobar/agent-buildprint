# Phase 1 - Canvas Production Board

## Phase mode contract

`blueprint_mode: product`

`phase_style: outcome_flow`

This phase delivers the user-visible browser production canvas. The outcome flow is: open an episode workbench, see the production graph, manipulate the canvas, and keep graph state stable while moving and laying out nodes.

## Build target

Implement the production canvas board with:

- node graph surface for script, script plan, assets, storyboard table, storyboard panel and workbench;
- edges that preserve the source flow: script to assets, script to plan, plan to storyboard table, storyboard table to storyboard, storyboard to workbench;
- zoom, pan, space-drag, node dragging, fit view and auto layout;
- empty state when no episode is selected;
- visible loading/error states for flow fetch failures;
- right-side chat shell placeholder only as a connected surface, without implementing agent behavior in this phase.

## Interfaces touched

- Browser route or view for production workbench.
- Graph/canvas component API.
- FlowData client model with script, scriptPlan, assets, storyboardTable, storyboard and workbench.
- Episode selection input may be stubbed with fixture data until Phase 2, but the canvas must use the same model shape.

## State/runtime touched

This phase may use fixture FlowData in browser memory only for UI proof. It must not claim persistence. The graph state must support stable node positions during drag and layout.

## UX/UI requirements

- Nodes must be visually distinct, dense enough for production work and readable at common desktop viewport sizes.
- Canvas controls must not overlap the right chat shell or episode selector.
- The board must remain usable at narrow viewport widths with horizontal/vertical pan or responsive layout.
- The visual design must feel like a production tool, not a marketing page.

## Safety/security constraints

No provider calls, destructive actions or secret inputs in this phase. Fixture data must not include real credentials.

## Implementation loop

1. Define FlowData and node/edge topology.
2. Render the canvas and node components.
3. Add interaction controls and layout.
4. Add fixture/empty/error states.
5. Run browser proof and visual checks.

## Proof gate

- Unit test: topology builder returns required node IDs and edges.
- Browser test: production board renders all nodes, at least one edge, can zoom/pan/drag and trigger layout.
- Screenshot artifacts: desktop and narrow viewport after layout.
- Evidence row: `phase_id=01-canvas-workbench`, `proof_type=browser_runtime_trace`.

## Repair routing

If nodes render as static cards outside a canvas, return to this phase. If text overlaps or canvas controls are unusable, repair UX before advancing.

## Stop condition

Stop if no graph/canvas-capable implementation approach exists in the chosen stack; otherwise default to a proven graph/canvas library.

## Unlocks

Unlocks Phase 2 once canvas accepts FlowData and can render fixture board state.
