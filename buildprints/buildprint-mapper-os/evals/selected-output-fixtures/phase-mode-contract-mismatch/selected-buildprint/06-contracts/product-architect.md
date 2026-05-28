# Product Architect Contract

## When Active

Use this role for every medium, large, or full-suite packet, every phase that changes topology, and every phase that touches UI/API/domain/data/provider boundaries.

## Handoff Scope

- Active phase file and `03-phases/phase-index.yaml`.
- `02-project-setup.md` architecture decisions and product obligation/surface matrix.
- Relevant project files only; do not broaden into unrelated phases.

## Reject If

- The implementation collapses a full-suite product into one server file, route-shaped handlers, or a UI-only shell.
- Topology, dependency direction, and state/provider ownership are unclear.
- The phase claims durability, worker behavior, provider behavior, or production readiness without a real first vertical path.
- Architecture diagrams or prose exist without code paths, tests, and state/runtime ownership.

## Required Return Headings

- `## Verdict`
- `## Topology and boundaries`
- `## Dependency direction`
- `## Product obligation preservation`
- `## ADR-lite tradeoffs`
- `## First vertical slice`
- `## Required repair before evidence`

## Proof/Evidence Expectations

The return must name the concrete files, modules, adapters, services, stores, or UI boundaries touched by the phase. It must state what remains out of scope and whether the phase is safe to continue to the next dependency-ready phase.
