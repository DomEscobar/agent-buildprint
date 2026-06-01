# Phase 04 - State And Data

requires_roles: [data-persistence, product-architect, security-boundary]

## Product intention

Make trusted-local data durable and inspectable enough that the graph workbench can survive ordinary reloads and backend restarts.

## Mapped obligations

- Persist projects, uploaded file metadata, extracted text, ontology, graph id, graph status, simulation state, reports, and provider-blocked states.
- Replace in-memory-only task status for core workflow or mark it as local limitation until repaired.
- Provide delete/reset paths with explicit confirmation.

## Stable vs free

Stable: readback after reload, no durability overclaims, explicit destructive actions.

Free: SQLite, file store, Postgres, queue engine, object store.

## Implementation scope

Implement durable stores and migration/init logic for trusted-local use.

## Interfaces touched

Project repository, task/job repository, graph metadata store, simulation/report store.

## State / runtime touched

Local database/files, graph backend namespace, job status, report artifacts.

## UX / DX / operator requirements

State loss, migration errors, and graph backend disconnects must be visible and recoverable.

## Required output (data-persistence)

- Restart/readback smoke.
- Consistent ids across project, graph, simulation, report.
- Local cleanup/reset commands.

## Blocks (data-persistence)

- Task state only in process memory for core progress.
- Graph id stored only in frontend state.

## Required output (security-boundary)

- Confirmation for delete/reset.
- No secret values persisted in project/report data.

## Blocks (security-boundary)

- Destructive actions without confirmation or audit trail.

## Quality bar

Restarting backend does not make the UI lie about graph or simulation status.

## Do not ship

Do not claim "saved" unless there is a readback path.

## Repair routing

Persistence contradictions go to this phase.

## Unlock condition

Core data survives reload/restart or remaining local-only limitations are explicit blockers.
