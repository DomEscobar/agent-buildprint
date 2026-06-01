# Skeptical Product Review

Run this review after phase 08 and before handover. Fix local, safe, central defects before handing off.

## Core Loop Walkthrough

Do:

1. Start the graph-memory backend, API, and frontend from a clean local state.
2. Create a project from fixture seed content and a prediction requirement.
3. Generate or accept ontology.
4. Build a graph through the OSS graph-memory adapter.
5. Reload the app and backend if feasible.
6. Open the graph/canvas.
7. Continue to simulation setup.
8. Run live provider steps only when credentials are explicitly available.

Observe:

- Project and graph state read back after reload.
- Canvas shows meaningful nodes and edges from the seed.
- Multi-edge and self-loop cases are readable.
- Empty, loading, error, and provider-blocked states are explicit.
- Missing provider credentials do not produce fake reports or fake simulations.

Record:

- Commands run.
- Graph-memory backend used.
- Provider mode: deterministic fixture, configured live provider, or blocked.
- Browser viewports checked.
- Remaining blockers.

## Canvas Review

Do:

- Test zoom/pan.
- Select a node.
- Select an edge.
- Toggle edge labels.
- Refresh graph data.
- Maximize and restore graph view.
- Check mobile and desktop layouts.

Observe:

- Text does not overlap incoherently.
- Detail panels do not hide the selected graph context permanently.
- Edge labels do not make the graph unreadable.
- Empty/loading/error states tell the truth without raw stack traces.

## Provider And Memory Review

Do:

- Run graph adapter contract tests.
- Search graph memory for a seed-specific query.
- Fetch graph stats.
- Fetch entity detail and related edges.
- If enabled, append simulation activity and read it back.

Observe:

- The backend no longer requires Zep Cloud or `ZEP_API_KEY`.
- Graph adapter failures surface as actionable errors.
- LLM provider config is explicit and swappable.

## Do Not Handover If

- The graph is canned or unrelated to input.
- The canvas is blank, noninteractive, or unreadable.
- Zep remains the required backend.
- A missing provider produces fake success.
- Project/graph state disappears on ordinary reload while the UI claims persistence.
- Public production readiness is implied without hardening work.
