# Phase 03 — Feature slices

requires_roles: [product-architect, ux-ui-craft, integration-runtime, data-persistence]

## Product intention

Add product breadth as vertical feature slices, not as disconnected panels. Each slice must carry UX, state, domain behavior, failure states, and verification.

## Mapped obligations

- Prioritize slices from feature map by user outcome.
- Define user goal, entry, action, state/data touched, result, and errors per slice.
- Preserve cross-slice consistency and explicit blockers for risky/sensitive slices.
- If the selected scope has multiple substantial slices, split them into N dependency-ordered phase files after this one. Keep this phase as the slice index/contract and name split ids like `03-feature-slice-001-<slice-id>`, `03-feature-slice-002-<slice-id>`, and so on.

## Stable vs free

- Stable: user-visible slice outcomes and cross-slice behavior consistency.
- Free: internal module layout and helper abstractions.

## Implementation scope

- Build slices vertically after core loop credibility.
- Track per-slice dependencies, blockers, and verification.
- Keep copy, navigation, and state semantics consistent across slices.
- Avoid broad shallow panel additions that skip depth.
- For every slice, record the slice contract: user loop, user-visible outcome, views/states, exact primary action, data/domain contracts, copy/evidence rules, tests/gates, and handover facts.
- In `03-phases/phase-index.yaml`, make each split slice depend on the prior slice or this phase. Make `04-state-and-data` depend on the last included feature-slice phase.

## Interfaces touched

- Slice entry routes/views/commands.
- API/domain boundaries for each slice.
- Provider/persistence boundaries where slice depends on them.

## State / runtime touched

- Slice-owned state transitions and persisted artifacts.
- Runtime task ownership for async slices.

## UX / DX / operator requirements

- Each included slice should be demoable independently.
- Slice should strengthen, not dilute, core loop clarity.

## Required output (ux-ui-craft)

- Screen and state inventory per slice is explicit.

## Blocks (ux-ui-craft)

- Slice represented only by labels/cards with no interaction depth.

## Required output (integration-runtime)

- Provider/runtime-dependent slices have adapter and blocked-state semantics.

## Blocks (integration-runtime)

- External dependency assumptions hidden inside "done" slice claims.

## Required output (data-persistence)

- Persistent slices include restart/readback behavior.

## Blocks (data-persistence)

- Persistent claims with no data ownership.

## Required output (product-architect)

- Slice boundaries and dependencies are coherent and maintainable.

## Blocks (product-architect)

- Horizontal layer work with no user-visible value.

## Quality bar

Every included slice should be independently demoable and also make the core product loop stronger or more complete. A slice is not a page, endpoint, or card; it is a user-visible change across UX, state, domain, data, tests, and handover.

## Do not ship

Horizontal layers with no user-visible value, broad shallow panels, duplicate components/helpers, hidden broken secondary paths, or slices that silently downgrade scope.

## Repair routing

- slice regression -> current phase
- cross-slice contract mismatch -> `07-architecture-garden.md`
- missing blocker visibility -> `05-handover.md`

## Unlock condition

Included slices are vertical, demoable, dependency-aware, and explicitly blocked where external constraints apply. For multi-slice scope, the phase index shows each slice as its own next-action step instead of burying N slices inside one overloaded phase.
