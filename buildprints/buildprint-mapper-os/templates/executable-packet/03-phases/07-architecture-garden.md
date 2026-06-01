# Phase 07 — Architecture garden

requires_roles: [product-architect, integration-runtime, data-persistence]

## Product intention

Keep the product improvable while features land: preserve module boundaries, refactor budget, test seams, and dependency rules.

## Mapped obligations

- Boundaries for UI, domain, adapters, persistence, runtime jobs, and outputs.
- Refactor budget for duplication, tangles, and oversized units.
- Test seams for domain/state/provider/core journeys.
- Dependency rules and extension seams for next slices.

## Stable vs free

- Stable: boundary integrity and externally visible behavior.
- Free: refactor style, internal module naming, and package layout.

## Implementation scope

- Enforce dependency direction (UI -> domain -> adapters -> persistence/runtime).
- Isolate provider and persistence concerns from presentation layers.
- Create extension seams for new feature/provider paths.
- Capture refactor budget and defer non-central work honestly.

## Interfaces touched

- Module boundaries across core layers.
- Adapter interfaces for providers and storage.
- Test harness boundaries and fixtures.

## State / runtime touched

- Shared state ownership and mutation points.
- Runtime job ownership interfaces.
- Data contracts crossing layer boundaries.

## UX / DX / operator requirements

- Architectural cleanup should improve iteration speed without regressing visible behavior.
- Error and recovery paths remain explicit after refactors.

## Required output (product-architect)

- Context/component/data-flow boundaries remain coherent after slice growth.
- Decision notes capture boundary tradeoffs.

## Blocks (product-architect)

- Beauty refactor with hidden coupling and no test seams.
- Source-clone architecture without explicit reasons.

## Required output (integration-runtime)

- Provider/runtime concerns remain behind adapters.

## Blocks (integration-runtime)

- UI layer directly owning provider protocols.

## Required output (data-persistence)

- Persistence ownership and restart/readback guarantees remain clear.

## Blocks (data-persistence)

- Shared mutable state with no durable ownership.

## Quality bar

The next feature slice should be easier to add after this phase, not harder. Product taste and architecture must reinforce each other.

## Do not ship

A beautiful but tangled UI, copied source internals as architecture, duplicated provider logic, no testable seams, or refactors that delay the core user loop without improving it.

## Repair routing

- boundary breakage -> current phase
- loop regression -> `02-core-loop-first.md`
- deferred structural risk -> `05-handover.md`

## Unlock condition

Boundaries and seams are clear enough that the next central slice can be added without rewriting the core loop.
