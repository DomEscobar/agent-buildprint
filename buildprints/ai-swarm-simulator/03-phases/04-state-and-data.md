# Phase 04 - State and data

requires_roles: [data-persistence, security-boundary]

## Product intention

Make local state durable and inspectable so the workbench can reload projects, graph state, simulations, reports, logs, and interactions without lying about restart safety.

## Mapped obligations

- Durable project metadata and uploaded/extracted content.
- Durable graph memory store and graph reference.
- Durable simulation profiles/config/status/traces.
- Durable report progress, sections, markdown, logs.
- Honest task status storage or explicit local-only limitation.
- Safe local delete/reset semantics.

## Stable vs free

Stable: reload/readback for any visible history or completed result.

Free: SQLite, local files, Postgres, or graph-store metadata if readback is reliable.

## Implementation scope

Persistence schema/files, migrations or bootstrap, readback APIs, cleanup/reset behavior, and task progress strategy.

## Interfaces touched

Project, graph, simulation, report, log, chat/interview stores and APIs.

## State / runtime touched

All local durable data and graph memory.

## UX / DX / operator requirements

History screens should display real persisted artifacts, not stale component data.

## Required output (data-persistence)

Define and implement read/write/readback paths for every persisted product claim.

## Blocks (data-persistence)

No in-memory-only durability claims; no orphaned graph records after project reset/delete.

## Required output (security-boundary)

Protect local uploaded data from accidental exposure and make deletes explicit.

## Blocks (security-boundary)

No silent destructive operations; no secret values stored in logs or generated artifacts.

## Quality bar

Restart the app and reload the last project/report without losing claimed completed state.

## Do not ship

History list without backing store, task status claims that vanish on restart, or delete controls without clear scope.

## Repair routing

If readback fails, repair persistence before adding new features.

## Unlock condition

Persistence/readback behavior is verified for project, graph, simulation, and report artifacts.

