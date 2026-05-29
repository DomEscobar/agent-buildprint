# Phase 1 - Cinematic Storyboard Workbench

## Phase mode contract

`blueprint_mode: product`

`phase_style: outcome_flow`

This phase delivers the user-visible browser storyboard workbench. The outcome flow is: open an episode workbench, see an ordered cinematic storyboard with dependency flow, inspect a shot frame, manipulate the canvas/shot layout, and keep graph and storyboard state stable while moving and laying out nodes.

## Build target

Implement the production storyboard workbench with:

- node graph surface for prose/script, script plan, assets, storyboard table, storyboard panel and video workbench;
- storyboard-first shot strip or grid with frame cards that remain visually primary over the technical graph;
- frame inspector for the selected shot with prompt, scene/beat, aspect ratio, continuity tags, linked character/assets, notes and review/media status;
- edges that preserve the source flow: script to assets, script to plan, plan to storyboard table, storyboard table to storyboard, storyboard to workbench;
- zoom, pan, space-drag, node dragging, fit view and auto layout;
- empty state when no episode is selected;
- visible loading/error states for flow fetch failures;
- right-side chat shell placeholder only as a connected surface, without implementing agent behavior in this phase.

## Interfaces touched

- Browser route or view for production workbench.
- Graph/canvas component API.
- FlowData client model with prose/script, scriptPlan, assets, storyboardTable, storyboard frames and workbench.
- Episode selection input may be stubbed with fixture data until Phase 2, but the canvas must use the same model shape.

## State/runtime touched

This phase may use fixture FlowData in browser memory only for UI proof. It must not claim persistence. The graph state must support stable node positions during drag and layout.

## UX/UI requirements

- The first viewport must immediately read as a storyboard production tool: visible shot frames, ordered sequence, selected-frame detail and canvas flow.
- Nodes must be visually distinct, dense enough for production work and readable at common desktop viewport sizes.
- Storyboard frame previews must use stable aspect-ratio containers and show useful placeholders, generated image previews or blocked/failed states without layout shifts.
- Shot cards must show shot number, scene/beat label, status, linked assets/characters and revision signal in a compact readable form.
- Canvas controls must not overlap the right chat shell or episode selector.
- The board must remain usable at narrow viewport widths with horizontal/vertical pan or responsive layout.
- The visual design must feel like a production-grade creative tool, not a marketing page, generic SaaS dashboard, technical graph demo or loose card board.

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
- Browser test: production board renders all nodes, at least one edge, an ordered storyboard strip/grid, selected-frame inspector, can zoom/pan/drag and trigger layout.
- Screenshot artifacts: desktop and narrow viewport after layout.
- Evidence row: `phase_id=01-canvas-workbench`, `proof_type=browser_runtime_trace`.

## Repair routing

If nodes render as static cards outside a canvas, return to this phase. If the graph renders but the storyboard frames are absent, visually secondary, or indistinguishable from generic task cards, return to this phase. If text overlaps or canvas controls are unusable, repair UX before advancing.

## Stop condition

Stop if no graph/canvas-capable implementation approach exists in the chosen stack; otherwise default to a proven graph/canvas library.

## Unlocks

Unlocks Phase 2 once canvas accepts FlowData and can render fixture board state.
