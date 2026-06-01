# Product-Architecture Phased Buildprint — Microfish Intake

## Purpose

Build a user-friendly Microfish slice while enforcing a scalable frontend architecture. This variant tests whether explicit architecture alignment prevents flat vanilla-JS apps without losing product quality.

## Required read order

1. `BUILDPRINT.md`
2. `00-alignment/product-and-architecture-contract.md`
3. `00-alignment/stack-decision.md`
4. `01-architecture-foundation/implementation.md`
5. `02-first-run-product/implementation.md`
6. `03-domain-state/contracts.md`
7. `04-verification-polish/review.md`
8. `HANDOVER.md`

## Execution phases

- Phase 00: decide product + architecture contract.
- Phase 01: create the modular app foundation.
- Phase 02: implement first-run product experience.
- Phase 03: implement domain/state/export contracts.
- Phase 04: verify architecture, UX, and product behavior.

## Non-negotiables

- TypeScript-first structure.
- Vite + React/Svelte preferred.
- Explicit components, domain modules, state/storage modules, provider modules, and tests.
- Architecture must serve the product; do not build empty abstractions.
