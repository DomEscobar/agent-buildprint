# Mapper OS Implementation Plan

This file describes how to maintain Mapper OS itself.

## Current Direction

- Mapper OS is an agent-run Buildprint workflow.
- `agb map` is not the mapper entrypoint.
- The Mapper OS package must teach source discovery, capability extraction, selected-buildprint packaging, downstream execution planning, and qualification.

## Maintenance Milestones

1. Keep `mapper-os-requirement.md` and this package aligned.
2. Keep executable-packet templates aligned to the required package shape.
3. Keep policies focused on evidence, no-fake behavior, minimal questions, and source independence.
4. Keep fixture review under `evals/golden-projects/` as manual or agent-run regression input.
5. Keep `agb analyze`, `agb check`, and `agb start` working; do not reintroduce `agb map`.

## Decision Log

- Mapper logic belongs in the Mapper OS Buildprint and agent session, not in a deterministic CLI scanner.
- Source-independent readiness is qualified by evidence and verification, not by file generation.
- Legacy selected-output v1 files are no longer generated. Their useful concepts now live in executable-packet v2 files: `03-capabilities/capability-index.yaml`, per-capability packets, `07-execution/implementation-plan.yaml`, `08-evaluation/`, and `.buildprint/evidence/evidence-ledger.jsonl`.

## Risk Register

- Risk: legacy docs or templates reintroduce `AGENT_EXECUTION_BRIEF.md`, `agent-contract.xml`, `TEST_MATRIX.md`, `TRACEABILITY_MATRIX.md`, or `IMPLEMENTATION_COMPLETENESS.md` as defaults.
- Risk: fixture review becomes informal and misses no-fake regressions.
- Risk: agents over-read source and preserve internals instead of behavior.
- Risk: selected packages look complete while remaining `SELECTED_UNQUALIFIED`.
