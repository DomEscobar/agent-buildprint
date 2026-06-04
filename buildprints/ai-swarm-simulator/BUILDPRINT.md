# BUILDPRINT: AI Swarm Simulator

This is a Mapper OS v3 phase-driven executable Buildprint for building a MiroFish-style graph-backed AI swarm simulation workbench.

It is an execution manual for an AI builder, not a schema. The schema is only the machine-readable mirror in `blueprint.yaml`; this markdown owns product judgment, quality, and the read order.

## Product identity

AI Swarm Simulator is a trusted-local product workbench for a user who wants to bring seed material, structure it into graph memory, run or understand a swarm simulation, inspect a living canvas, and continue from a generated report. The central artifact is not a static demo page; it is a working graph-backed simulation/report loop with honest blocked states where local credentials or runtime dependencies are missing.

## Golden path

Upload or choose sample seed material → extract text/entities → configure an OpenAI-compatible provider or see a clear missing-provider blocker → build/read graph memory through an open-source adapter → inspect nodes and edges on a real graph canvas → run or honestly block the swarm simulation runtime → generate an inspectable report tied to graph/simulation evidence → continue the interaction from the report.

## Required constants

- Default deployment posture: `trusted_local`.
- Required graph-memory direction: open-source graph memory; Graphiti is the default unless evidence proves a better OSS adapter.
- Forbidden required dependency: Zep Cloud. Zep may be documented only as an optional adapter, never as the required product loop.
- Provider contract: OpenAI-compatible dynamic configuration with provider label, base URL, model, API key handling, status/test action, and explicit missing-provider state.
- UX contract: Canva-like motion and polish; graph nodes/edges must be clickable, pannable, zoomable, selectable, and inspectable.
- Completion contract: every visible action works or presents an honest blocked/error state; no fake provider success, canned reports, decorative graphs, raw JSON dumps, or functionless buttons.

## Binding implementation contract

The builder must preserve the source signal from MiroFish: GraphRAG ingestion, dynamic graph memory update/readback, OASIS-style simulation seams, report generation, and continued interaction. The implementation may simplify the stack for trusted-local delivery, but it must not simplify away the product loop. Local mocks, fixtures, or sample-only paths cannot be counted as full implementation unless the handover clearly scopes them as partial and blocked.

## Required Read Order

1. `BUILDPRINT.md`
2. `00-questions.md`
3. `01-project-setup.md`
4. `02-uiux-decision.md`
5. `blueprint.yaml`
6. `03-phases/phase-index.yaml`
7. `03-phases/phase-flow.md`
8. Active phase file named by `03-phases/phase-index.yaml`
9. `HANDOVER.md` before stopping or claiming completion

Do not read every phase upfront. Use `03-phases/phase-flow.md` to execute only the active phase, then update the active phase and handover honestly.

## Fake-success paths that are forbidden

Functionless buttons, dead controls, mocked/sample data counted as real input, decorative charts, fake provider success, simulation buttons that always succeed, graph canvases with no real readback, reports that ignore uploaded input, raw JSON instead of product UI, and screenshots without runtime proof are not completion.
