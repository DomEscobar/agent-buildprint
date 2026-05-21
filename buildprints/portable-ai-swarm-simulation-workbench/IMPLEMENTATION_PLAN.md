# IMPLEMENTATION_PLAN

## Architecture Decision Notes

| Decision | Chosen approach | Why | Revisit when |
|---|---|---|---|
| App topology | Web UI + API server + worker/runtime boundary + persistence repositories + provider adapters | Source has Vue UI, Flask APIs, background tasks/processes, file-backed state, and LLM/Zep/OASIS side effects. | Target stack already has a different service boundary. |
| Provider handling | Ports/adapters with deterministic test doubles and optional live smoke | Prevents fake provider claims while allowing offline tests. | Sandbox credentials are available. |
| State | Repository interfaces for projects, simulations, reports, logs, and artifacts | File-backed source behavior must be restart/readback testable. | A production database is selected. |
| UI | Operational workbench, not generic dashboard | Primary job is stepwise simulation control and graph/report inspection. | Product scope is reduced to API-only. |

## First Real Vertical Slice

Build upload-to-graph first: upload a small text fixture, persist project, generate deterministic ontology via adapter, build deterministic graph via adapter, show graph screen with empty/loading/error/success states, and prove restart/readback.

## Team-Pack Gate Matrix

| Milestone | Owning teams | Gate |
|---|---|---|
| 1. Project upload and ontology | product-architect, ux-ui-craft, integration-runtime, security-boundary, data-persistence, test-and-verification | upload UI + API + persisted project + LLM adapter proof |
| 2. Graph build and visualization | product-architect, ux-ui-craft, integration-runtime, data-persistence, test-and-verification | async task + Zep adapter + graph UI proof |
| 3. Simulation setup | product-architect, ux-ui-craft, integration-runtime, data-persistence, test-and-verification | config/profile generation + progress proof |
| 4. Simulation runtime | product-architect, ux-ui-craft, integration-runtime, security-boundary, data-persistence, test-and-verification | start/stop worker + action timeline proof |
| 5. Report and interaction | product-architect, ux-ui-craft, integration-runtime, data-persistence, test-and-verification | report generation + chat/tool proof |
| 6. History and lifecycle | product-architect, ux-ui-craft, security-boundary, data-persistence, test-and-verification | restart/readback/delete/export proof |

## Repair Loop

- Failed check: record failing command/path and exact assertion.
- Structured feedback: identify capability, team gate, and missing evidence.
- Focused fix: change only the smallest relevant boundary.
- Rerun: capability proof plus affected root proof.
- Pass or blocker: update `CURRENT_STATE.md` and verification ledgers.
