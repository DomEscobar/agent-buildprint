# Graph Builder And Visualization

Status: `INCLUDED`

## Agent Brief

Goal: build graph construction from persisted project text/ontology and display graph data.
Status: `CONTRACT_SEAM_ONLY`
Dependencies: `01-ingestion-ontology`
Stable behavior: async build task, Zep-style graph adapter, node/edge retrieval, graph UI states.
Implementation freedom: graph rendering library and queue implementation.
Forbidden substitutions: static graph presented as built graph, synchronous fake task, no-op refresh.
First implementation slice: deterministic graph adapter converts text chunks into nodes/edges and UI renders nonblank graph.
First verification gate: `npm test -- graph-builder`
Required evidence: task lifecycle artifact, graph screenshot, adapter call log.
No-fake checks: graph data must come from adapter result and persisted graph id.
Stop or escalate when: graph provider/delete semantics are unclear.
Required team packs: product-architect, ux-ui-craft, test-and-verification, integration-runtime, security-boundary, data-persistence.

## Behavior Contract

- User/system action: user starts graph build from project.
- Accepted inputs: project id and optional graph name/chunk settings.
- Observable outputs: task id, progress, graph id, node/edge data, visual graph.
- Important state: task status, graph id, provider episode ids, project status.
- Failure/empty/loading/blocked states: no project text, missing Zep key, provider error, empty graph.
- Provider/persistence/runtime/operational boundary: Zep adapter, background task manager, graph repository.

## Team-Pack Gates

| Team | Gate for this capability | Evidence path | Status |
|---|---|---|---|
| product-architect | async graph topology | `IMPLEMENTATION.md` | missing |
| ux-ui-craft | graph loading/error/success states | screenshots | missing |
| test-and-verification | task and graph tests | `VERIFICATION.md` | missing |
| integration-runtime | Zep adapter proof | `CONTRACTS.md` | missing |
| security-boundary | graph delete/reset safety | `VERIFICATION.md` | missing |
| data-persistence | graph id and task persistence | `VERIFICATION.md` | missing |

## Stable vs Free

| Stable | Free |
|---|---|
| async graph build and visualization behavior | queue, storage, graph renderer |

## Source Evidence

- OBSERVED: `backend/app/api/graph.py:260` defines graph build.
- OBSERVED: `backend/app/api/graph.py:569` exposes graph data.
- OBSERVED: `backend/app/services/graph_builder.py` calls Zep graph APIs.
- OBSERVED: `frontend/src/components/GraphPanel.vue` renders graph states.

## Pack Navigation

- Implementation plan: `IMPLEMENTATION.md`
- Verification ledger: `VERIFICATION.md`
