# Phase 07 - Architecture Garden

requires_roles: [product-architect, integration-runtime, data-persistence, security-boundary]

## Product intention

Tighten architecture after the product loop exists, without refactoring away working behavior.

## Mapped obligations

- Keep graph-memory, provider, project, simulation, and report boundaries explicit.
- Remove obsolete Zep names from required product paths.
- Centralize errors and blocked-state handling.
- Keep local config and secrets out of persisted user artifacts.

## Stable vs free

Stable: behavior and adapter contracts.

Free: internal module organization.

## Implementation scope

Refactor around ports/repositories/services only where it reduces real complexity or duplication.

## Interfaces touched

Backend service boundaries, frontend API client, config loader, storage adapters, worker lifecycle.

## State / runtime touched

Config, local stores, graph backend connection, job lifecycle.

## UX / DX / operator requirements

Local setup should be predictable. Error messages should name the missing service/config and next action.

## Required output (product-architect)

- Boundary map.
- Local runbook.
- Removed stale/obsolete required paths.

## Blocks (product-architect)

- Zep-specific modules still required by selected loop.
- Duplicated graph data mapping that diverges across screens.

## Required output (security-boundary)

- Config/secrets handling review.
- Destructive action confirmation review.

## Blocks (security-boundary)

- Secret values logged or persisted.

## Quality bar

The code structure makes provider and graph-memory replacement obvious.

## Do not ship

Do not perform broad rewrites that break the core loop.

## Repair routing

Architecture contradictions go to this phase.

## Unlock condition

The working loop is cleaner, not more abstract and broken.
