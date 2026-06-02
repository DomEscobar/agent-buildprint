# Phase 07 - Architecture garden

requires_roles: [product-architect, integration-runtime, data-persistence, security-boundary]

## Product intention

Remove accidental complexity and tighten boundaries after the product loop works. Keep the system maintainable without rewriting the product into a new platform.

## Mapped obligations

- Consolidate graph memory adapter boundaries.
- Consolidate provider config and diagnostics.
- Separate background task ownership from request handlers where needed.
- Review simulation process lifecycle.
- Keep trusted_local security limits explicit.

## Stable vs free

Stable: no direct Zep/provider calls outside adapters and no fragmented persistence.

Free: exact queue, service, module, and database implementation.

## Implementation scope

Refactor only where it reduces real risk: provider adapters, graph memory services, task ownership, persistence, and lifecycle cleanup.

## Interfaces touched

Backend services, task runner/queue, config, adapter modules, lifecycle hooks.

## State / runtime touched

Graph memory, task state, simulation processes, logs.

## UX / DX / operator requirements

Refactors must preserve the user workflow and not remove graph canvas features.

## Required output (product-architect)

Identify boundaries that should stay stable for future phases.

## Blocks (product-architect)

No broad rewrite that breaks the proven user loop.

## Required output (integration-runtime)

Eliminate scattered direct provider calls and normalize retry/error handling.

## Blocks (integration-runtime)

No adapter bypasses for graph or LLM calls.

## Required output (data-persistence)

Review retention, cleanup, readback, and migration/bootstrap for local data.

## Blocks (data-persistence)

No orphaned data or unclear graph/project ownership.

## Required output (security-boundary)

Review upload paths, file names, deletes, provider secrets, and local process control.

## Blocks (security-boundary)

No secret values in logs, reports, or UI; no public-ready claims.

## Quality bar

Architecture is simpler, not merely renamed.

## Do not ship

Large unrelated rewrites, new fake abstractions, or broken working paths.

## Repair routing

If a refactor breaks a proven loop, revert the refactor behaviorally and repair more narrowly.

## Unlock condition

Provider, graph memory, persistence, and simulation lifecycle boundaries are coherent and verified.

