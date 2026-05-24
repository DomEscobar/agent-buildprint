# Mapper OS Implementation Plan

This file describes how to maintain Mapper OS itself.

## Current Direction

- Mapper OS is an agent-run Buildprint workflow.
- `agb map` is not the mapper entrypoint.
- The Mapper OS package must teach source discovery, executable-blueprint extraction, selected-buildprint packaging, downstream execution planning, and qualification.

## Maintenance Milestones

1. Keep `mapper-os-requirement.md` and this package aligned.
2. Keep executable-blueprint v5 templates aligned to the required package shape.
3. Keep policies focused on evidence, no-fake behavior, minimal questions, and source independence.
4. Keep fixture review under `evals/golden-projects/` as manual or agent-run regression input.
5. Keep `agb check`, `agb start`, and isolated eval harnesses working; do not reintroduce `agb map` or `agb analyze`.

## Decision Log

- Mapper logic belongs in the Mapper OS Buildprint and agent session, not in a deterministic CLI scanner.
- Source-independent readiness is qualified by runtime evidence and verification, not by file generation.
- Legacy selected-output v1-v4 files are no longer generated. Their useful concepts now live in executable-blueprint v5 files: `01-questions.md`, `02-project-setup.md`, `03-phases/phase-index.yaml`, phase Markdown files, `04-evaluation.md`, and `05-evidence/evidence-ledger.jsonl`.
- `BUILDPRINT.md` is the selected packet start point; `blueprint.yaml` is the machine contract for generated selected packets.

## Risk Register

- Risk: legacy docs or templates reintroduce `AGENT_EXECUTION_BRIEF.md`, `agent-contract.xml`, `TEST_MATRIX.md`, `TRACEABILITY_MATRIX.md`, `IMPLEMENTATION_COMPLETENESS.md`, or fragmented per-capability mini-files as defaults.
- Risk: fixture review becomes informal and misses no-fake regressions.
- Risk: agents over-read source and preserve internals instead of behavior.
- Risk: selected packages look complete while remaining `SELECTED_UNQUALIFIED`.
