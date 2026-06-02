# Review

Run this as an operational walkthrough, not a self-score.

## Core Walkthrough

1. Start from a fresh local app.
2. Submit a small seed document and prediction requirement.
3. Generate or block ontology through the configured LLM provider.
4. Build graph memory through the open-source graph adapter.
5. Reload the project and confirm graph state reads back.
6. Inspect the graph canvas in graph, split, and workbench modes.
7. Click or select at least one node and one edge.
8. Refresh graph data.
9. Prepare a small simulation from graph entities.
10. Run, stop, or honestly block simulation runtime.
11. Generate and read back a report or honestly block provider/runtime.
12. Try report chat or agent interview if runtime state supports it.

## Observe And Record

- Does uploaded input affect ontology/graph output?
- Are graph controls alive and useful?
- Does state persist after reload/restart?
- Are missing providers shown as blocked states, not fake success?
- Are destructive actions explicit?
- Are public/private production claims absent under trusted_local posture?

## Defects To Fix Before Handover

- Generic dashboard smell.
- Decorative graph that cannot be inspected.
- Raw JSON as the main user experience.
- Canned output unrelated to input.
- Dead controls.
- Placeholder copy.
- Hidden Zep dependency.
- Hard-coded AI provider.
- Missing persistence/readback for visible history.
- Secret values in UI, logs, or generated artifacts.

