# History And Data Lifecycle

Status: `INCLUDED`

## Agent Brief

Goal: persist and manage project/simulation/report lifecycle, history, delete/reset, and restart/readback.
Status: `CONTRACT_SEAM_ONLY`
Dependencies: all previous capabilities
Stable behavior: list history, resume artifacts, delete/reset safely, document retention/export semantics.
Implementation freedom: filesystem, SQLite/Postgres, object storage.
Forbidden substitutions: in-memory-only state, unconfirmed destructive actions, orphaned provider artifacts.
First implementation slice: create project/simulation/report records, restart app, reload history, delete one record with confirmation.
First verification gate: `npm test -- data-lifecycle`
Required evidence: restart/readback artifact, destructive negative test, history screenshots.
No-fake checks: persisted artifacts survive process restart and delete removes owned files.
Stop or escalate when: auth/ownership or retention policy is required but undefined.
Required team packs: product-architect, ux-ui-craft, test-and-verification, integration-runtime, security-boundary, data-persistence.

## Owned source surfaces

- `backend/app/models/project.py`
- `backend/app/api/graph.py:70`
- `backend/app/api/report.py:444`
- `frontend/src/components/HistoryDatabase.vue`

## Product obligations

- Persist projects, graphs, simulations, reports, and owned artifacts across restart.
- List, resume, export, delete, and reset history through explicit lifecycle rules.
- Gate destructive actions with confirmation and remove owned artifacts without orphaning provider state.

## Behavior Contract

- User/system action: list, resume, reset, delete, export/download artifacts.
- Accepted inputs: project id, simulation id, report id, confirmation.
- Observable outputs: history records, statuses, resumed routes, deleted/reset result, downloads.
- Important state: project files/text, graph id, simulation config/run state, reports/logs.
- Failure/empty/loading/blocked states: missing artifact, orphaned provider graph, delete denied, restart mismatch.
- Provider/persistence/runtime/operational boundary: repository layer and provider cleanup hooks.

## Source Evidence

- OBSERVED: `backend/app/models/project.py` file-backed project persistence.
- OBSERVED: `backend/app/api/graph.py:70` deletes projects.
- OBSERVED: `backend/app/api/report.py:444` deletes reports.
- OBSERVED: `frontend/src/components/HistoryDatabase.vue` lists/resumes history.

## Pack Navigation

- Implementation plan: `IMPLEMENTATION.md`
- Verification ledger: `VERIFICATION.md`
