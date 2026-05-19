# Portable Novel-to-Storyboard Pipeline Buildprint Plan

## Authority

`BUILDPRINT.md` is the canonical source of truth. This file is the implementation phase index and must not weaken the binding scope, non-goals, phase gates, or acceptance gates in `BUILDPRINT.md`.

## Phase routing

- Resolve `questions.md` first: use `Use default storyboard preset` or ask the closed questions and wait for confirmation.
- Execute `plans/*.md` in numeric order. These phase files keep each coding pass small enough for LLM context windows.
- Use `IMPLEMENTATION_ROADMAP.md` only as a lower-authority sequencing aid after phase files.
- `phases.yaml` is a machine-readable mirror; `BUILDPRINT.md` remains authoritative.

## Completion order

1. Read `BUILDPRINT.md` first and confirm the binding scope/non-goals.
2. Resolve `questions.md` or record default storyboard preset.
3. Execute `plans/00-alignment.md` through `plans/05-qa-handover.md`.
4. Read only the phase-relevant detail docs listed in each plan file.
5. Run the checks in `TEST_MATRIX.md`.
6. Complete `VALIDATION_TEMPLATE.md` with commands, evidence, gaps, blockers, screenshots, manifest sample, and chat handover summary.
7. Pass `checks/acceptance.md` before claiming completion.
8. Finish with the final chat handover.
