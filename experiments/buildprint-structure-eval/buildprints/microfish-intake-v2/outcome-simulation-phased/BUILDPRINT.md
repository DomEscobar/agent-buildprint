# Outcome-Simulation Phased Buildprint — Microfish Intake

## Purpose

Combine simulation-first product thinking with explicit setup and phased implementation. The user journey and failure map drive the product, but stack/architecture alignment prevents a flat demo app.

## Required read order

1. `BUILDPRINT.md`
2. `00-alignment/stack-and-scope.md`
3. `01-user-simulation/journey.md`
4. `01-user-simulation/plain-language-contract.md`
5. `02-failure-map-build/failure-map.md`
6. `03-implementation-slices/phases.md`
7. `04-replay-polish/replay.md`
8. `HANDOVER.md`

## Execution phases

- Phase 00: choose stack/scope/architecture.
- Phase 01: simulate first-time user journey in plain language.
- Phase 02: convert failures into build obligations.
- Phase 03: implement in slices.
- Phase 04: replay journey, polish, verify, hand over.

## Non-negotiables

- Use TypeScript/framework setup unless blocked.
- Failure map drives features.
- First screen must be normal-user simple.
- Technical/provider details are available but not front-loaded.
