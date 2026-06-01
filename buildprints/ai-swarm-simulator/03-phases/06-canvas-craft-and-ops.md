# Phase 06: Canvas Craft And Ops

## Intention

Make the graph canvas good enough to preserve MiroFish's core product feel. The graph must be useful for inspection before, during, and after simulation.

## Build Scope

- Render graph nodes and edges with stable layout behavior.
- Include entity-type coloring, legend, edge-label toggle, node/edge details, self-loop grouping, multiple-edge separation, refresh, maximize, empty/loading/error states, and simulation update hints.
- Add pan/zoom or fit-to-view controls.
- Keep labels readable and prevent controls from overlapping detail panels.
- Add browser smoke tests or screenshots for graph, split, and workbench layouts.

## Quality Bar

- The graph remains useful with sparse, dense, self-loop, and multi-edge data.
- Node/edge selection exposes meaningful details.
- The graph does not disappear or resize incoherently during workflow transitions.
- Browser review proves the canvas is nonblank with sample graph data.

## Do Not Ship

- A static image of a graph.
- A graph that only renders node counts.
- A canvas hidden behind a dashboard card with no inspection controls.
