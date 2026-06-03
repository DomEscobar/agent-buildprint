# UX Contract

## Role

You are the consumer-comprehension specialist for a graph-backed AI swarm simulation workbench. Lock the comprehension contract before shell or feature code.

The product must feel like a sleek Canva-like creative workbench for graph/simulation/report exploration, not an admin dashboard. Motion and clickability are product requirements, not decoration.

## Required UX artifacts to create in the implementation repo

Create `00b-ux-contract/` with:

1. `consumer-model.yaml` — novice/operator/expert personas.
2. `first-run-path.md` — no-provider/no-input sample path to inspectable graph and sample report under 60 seconds.
3. `copy-quality-bar.md` — jargon ban list and alt-copy for GraphRAG, graph memory, OASIS, provider, simulation trace, ontology.
4. `empty-blocked-loading-states.yaml` — empty/loading/ready/blocked/error states for the state model.
5. `disclosure-plan.md` — default/progressive/expert panels.
6. `ux-acceptance.yaml` — typed acceptance rows.

## Required visual/interaction contract

- Canvas-style graph area with fluid layout transitions, zoom/pan/drag/select/inspect.
- Node/edge details open from clicks and show source/entity/reasoning metadata.
- Provider status chip, graph-memory status, simulation runtime status, report status.
- Clickable controls: upload, try sample, build graph, inspect node, run simulation, generate report, continue interaction. Each works or shows honest blocked state.
- Loading states are specific: extracting, writing graph memory, reading graph, running simulation, generating report.
- No static SVG token bubbles, dead cards, generic dashboard tables, or fake progress.

## Acceptance rows

Required novice rows:

- `NOVICE-FIRST-RESULT-60S` — novice with no provider and no input reaches a viewable sample graph and sample report in under 60 seconds.
- `NOVICE-CANVAS-CLICKABLE` — novice clicks at least one node/edge and sees a legible detail panel.
- `NOVICE-BLOCKED-PROVIDER-LEGIBLE` — live provider-required action explains what is missing while keeping sample path available.

Required operator rows (sample cannot satisfy):

- `OPERATOR-INPUT-CHANGES-GRAPH` — two different real inputs produce observably different graph topology/entities.
- `OPERATOR-GRAPH-READBACK-TRACES-INPUT` — graph nodes/edges reference uploaded input content or extracted entities.
- `OPERATOR-SIMULATION-OR-BLOCKER-TRACEABLE` — simulation either produces traces tied to graph entities or shows a runtime blocker with next action.
- `OPERATOR-REPORT-USES-GRAPH-AND-TRACE` — report references graph memory and simulation trace/input references; no canned report.

Row format:

```yaml
- ux_ac_id: OPERATOR-INPUT-CHANGES-GRAPH
  persona: operator
  preconditions: [provider_configured, input_uploaded]
  test_must_observe:
    - graph topology or entities differ when input changes
    - no placeholder/sample-only nodes present
  sample_can_satisfy: false
```

## Path Map

```yaml
paths:
  - id: novice-sample-to-result
    persona: novice
    preconditions: []
    acceptance_rows: [NOVICE-FIRST-RESULT-60S]
    description: Empty user launches sample and reaches graph plus report.
  - id: novice-canvas-click-inspect
    persona: novice
    preconditions: [sample_loaded]
    acceptance_rows: [NOVICE-CANVAS-CLICKABLE]
    description: User clicks graph node or edge and sees details.
  - id: novice-blocked-provider-legible
    persona: novice
    preconditions: [no_provider_configured]
    acceptance_rows: [NOVICE-BLOCKED-PROVIDER-LEGIBLE]
    description: Live provider action blocks legibly without hiding sample path.
  - id: operator-input-to-graph
    persona: operator
    preconditions: [provider_configured, input_uploaded]
    acceptance_rows: [OPERATOR-INPUT-CHANGES-GRAPH, OPERATOR-GRAPH-READBACK-TRACES-INPUT]
    description: Real input is extracted, written to graph memory, read back, and rendered.
  - id: operator-simulation-runtime
    persona: operator
    preconditions: [graph_ready]
    acceptance_rows: [OPERATOR-SIMULATION-OR-BLOCKER-TRACEABLE]
    description: Simulation runs against graph entities or blocks honestly with runtime seam.
  - id: operator-report-interaction
    persona: operator
    preconditions: [graph_ready]
    acceptance_rows: [OPERATOR-REPORT-USES-GRAPH-AND-TRACE]
    description: Report and interaction panel use graph/simulation/input references.
```

## Unlock condition

All six UX artifacts exist, path ids are referenced by slices, sample path is offline, operator rows require real pipeline evidence, and every visible clickable control is covered by work/blocked-state semantics.
