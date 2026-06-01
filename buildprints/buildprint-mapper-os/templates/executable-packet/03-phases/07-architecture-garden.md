# Phase 07 — Architecture garden

## Product intention

Keep the product improvable while features land: preserve module boundaries, refactor budget, test seams, and dependency rules.

## Build

- Module boundaries for UI, domain, provider adapters, persistence, background tasks, and report/output composition.
- Refactor budget for duplicated helpers, tangled state, oversized components, and source-clone leakage.
- Test strategy for domain logic, state transitions, provider boundaries, and core user journeys.
- Dependency rules that prevent UI from owning provider protocols or persistence details.
- Clear extension seams for the next feature/provider/view without rewriting the core loop.

## Quality bar

The next feature slice should be easier to add after this phase, not harder. Product taste and architecture must reinforce each other.

## Do not ship

A beautiful but tangled UI, copied source internals as architecture, duplicated provider logic, no testable seams, or refactors that delay the core user loop without improving it.
