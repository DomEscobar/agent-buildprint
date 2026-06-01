# Phase 07: Verification

## Product intention

Prove the local product loop works within honest boundaries. Structural success is not product success; verify behavior through APIs, persistence, and browser inspection.

## Build

- Run backend tests for graph-memory adapter, project persistence, task status, report persistence, and provider-error paths.
- Run frontend build and targeted component/page tests if available.
- Run a local smoke flow: create project, generate ontology, build graph, render canvas, prepare simulation, run deterministic simulation, generate report.
- Restart backend and verify project/report/simulation state reads back.
- Capture browser evidence for the graph canvas and primary workflow screens.

## Quality Bar

- Checks are repeatable on a clean local setup with documented env vars.
- Missing live credentials are marked as blockers, not hidden.
- Handover distinguishes deterministic local proof from live provider proof.

## Do not ship

- Passing only lint/build while the app cannot complete the core loop.
- Claims of production readiness without auth/security/deployment review.
- Screenshots where the canvas is blank or covered.
