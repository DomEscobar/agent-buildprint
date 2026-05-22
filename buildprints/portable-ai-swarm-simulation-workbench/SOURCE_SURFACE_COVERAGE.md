# SOURCE_SURFACE_COVERAGE

| Surface id | Source evidence | Disposition | Capability obligation |
|---|---|---|---|
| api.graph.ontology | `backend/app/api/graph.py:122`, `backend/app/services/ontology_generator.py` | OWNED_BY_CAPABILITY | `capabilities/01-ingestion-ontology/` owns upload-to-ontology behavior. |
| api.graph.build | `backend/app/api/graph.py:260`, `backend/app/api/graph.py:569`, `backend/app/services/graph_builder.py` | OWNED_BY_CAPABILITY | `capabilities/02-graph-builder/` owns graph build, async task, and visualization behavior. |
| api.simulation.setup | `backend/app/api/simulation.py:165`, `backend/app/api/simulation.py:359` | OWNED_BY_CAPABILITY | `capabilities/03-simulation-setup/` owns simulation config and preparation progress. |
| api.simulation.runtime | `backend/app/api/simulation.py:1451`, `backend/app/api/simulation.py:1644` | OWNED_BY_CAPABILITY | `capabilities/04-simulation-runtime/` owns start/stop and runtime monitoring behavior. |
| api.report | `backend/app/api/report.py:25`, `backend/app/api/report.py:472` | OWNED_BY_CAPABILITY | `capabilities/05-report-interaction/` owns report generation and interaction behavior. |
| data.history | `backend/app/models/project.py`, `frontend/src/components/HistoryDatabase.vue` | OWNED_BY_CAPABILITY | `capabilities/06-data-lifecycle/` owns durable history, delete/reset, and restart/readback behavior. |

## Behavior Loss Review

No high-signal source surface may disappear silently. Any future source surface discovered during implementation must become a capability obligation, an explicit blocker, a merge into an existing capability, or an explicit user-approved exclusion.
