# Mapper OS Current State

Last updated: 2026-05-20 Europe/Berlin

## Product Direction

Mapper OS is an agent-run workflow for mapping source projects into source-independent Buildprints. It is not an `agb map` CLI command.

## Active Work

- Align package docs and templates with `mapper-os-requirement.md`.
- Remove legacy selected-output defaults.
- Preserve `agb analyze`, `agb check`, and `agb start`.

## Completed

- Public CLI no longer advertises or executes `agb map`.
- Mapper requirement now states Mapper OS is an agent-run Buildprint workflow.
- Mapper eval harness is removed; fixture review is manual or agent-run.

## Next Work

1. Keep templates aligned with the selected package shape.
2. Review fixture projects with Mapper OS and record quality regressions.
3. Tighten docs that still imply matrix-first, parity-first, or scaffold-first output.

## Blockers

- None known for the package overhaul.

## Do Not Reintroduce

- `agb map` as a public mapper entrypoint.
- Root implementation scaffold in discovery mode.
- Legacy default selected files such as `AGENT_EXECUTION_BRIEF.md`, `agent-contract.xml`, `TEST_MATRIX.md`, `TRACEABILITY_MATRIX.md`, or `IMPLEMENTATION_COMPLETENESS.md`.
