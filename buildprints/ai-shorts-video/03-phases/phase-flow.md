# Phase Flow

Use this loop for the active phase and every dependency-ready phase. Do not turn phase execution into paperwork.

## How to run a phase

1. Read `BUILDPRINT.md`, `00-questions.md`, `01-project-setup.md`, `02-ui-identity.md`, `blueprint.yaml`, this file, the active phase, and current `AGENTS.md`.
2. State a short checkpoint before editing: active phase, smallest real operator path, likely failure modes, proof plan, and claim ceiling.
3. Build the smallest complete OpenShorts path for that phase.
4. Verify through commands, API/runtime checks, browser inspection, media playback, and persistence/readback where applicable.
5. Compare results to predicted failure modes. Fix at least one concrete weakness unless none is found.
6. Record concise progress, blockers, proof, unproven claims, and next trust boundary.
7. Final completion requires `99-critical-review-pushback`.

## Completion rule

A phase passes only when a real product path works or an exact blocker is recorded. Edits, sample videos, placeholder providers, screenshots without direct use, and mocked data counted as live proof do not pass.

## Repair routing

- Missing harness, architecture, commands, or env goes back to `01-project-setup.md`.
- Generic or incoherent UI goes back to `02-ui-identity.md` and `docs/ui-identity.md`.
- Missing provider credentials become blocker rows after local seams and validation exist.
- Unsafe publishing, public gallery upload, deletion, or scheduling requires confirmation and audit proof.
- Production durability claims require restart-safe persistence; otherwise record a claim ceiling.
