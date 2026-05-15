# Buildprint Mapper OS

## Purpose

Buildprint Mapper OS turns an existing software project into a scoped, reviewable Agent Buildprint package without flattening the project into a vague summary or copying secrets.

It is a coding-agent process, not a scanner. The agent reads source files, cites evidence, separates observed facts from inference, asks only blocking decisions, and validates the result through reversal.

## Core idea

Small project:

```txt
repo → one scoped Buildprint → reversal validation
```

Large project:

```txt
repo
→ safe census
→ evidence-backed system map
→ candidate Buildprints
→ human scope decision
→ one module Buildprint OR hierarchical System Buildprint
→ reversal validation
→ final gap report
```

## Non-goals

- Do not rewrite application code.
- Do not copy secrets, private keys, tokens, `.env` values, customer data, or private production URLs.
- Do not pretend to understand business rules that are not present in the repo.
- Do not create a 100-page project summary and call it a Buildprint.
- Do not mark validation as passed unless commands/tests actually ran.
- Do not require a CLI to use this Buildprint.

## Inputs

- Existing project repository.
- Human-provided goal, if available.
- Optional scope: feature, workflow, architecture, or full system.
- Optional prior inventory/index. Treat inventory as hints only, not architecture truth.

## Discovery outputs

- `SYSTEM_MAP.md`.
- `BUILDPRINT_CANDIDATES.md`.
- `questions.md` with only 3-5 required decisions and appendix questions.

## Single Buildprint extraction outputs

- `buildprint-submission/BUILDPRINT.md`.
- `buildprint-submission/SPEC.md`.
- `buildprint-submission/PLAN.md`.
- `buildprint-submission/CONTRACTS.md`.
- `buildprint-submission/TEST_MATRIX.md`.
- `buildprint-submission/VALIDATION_TEMPLATE.md`.
- `buildprint-submission/questions.md`.
- `buildprint-submission/README.md`.
- `buildprint-submission/SUBMISSION_CHECKLIST.md`.
- `buildprint-submission/REVERSAL_REPORT.md` after clean-room validation.

## Full large-system extraction outputs

- `project.buildprint/BUILDPRINT.md`.
- `project.buildprint/SYSTEM_MAP.md`.
- `project.buildprint/MODULES.md`.
- `project.buildprint/PLAN.md`.
- `project.buildprint/CONTRACTS.md`.
- `project.buildprint/TEST_MATRIX.md`.
- `project.buildprint/modules/*/BUILDPRINT.md` for major subsystems.
- `project.buildprint/questions.md`.
- `project.buildprint/SUBMISSION_CHECKLIST.md`.
- `project.buildprint/REVERSAL_REPORT.md` or per-module reversal reports.

## Evidence labels

Every important claim must be labeled as one of:

- `OBSERVED` — directly grounded in repo files.
- `INFERRED` — likely but not proven.
- `QUESTION` — requires human review.

If a claim cannot be grounded, it cannot be presented as fact.

## Reversal requirement

A Buildprint is not validated just because it reads well. Validation requires a clean-room reversal attempt:

1. hide or ignore the original repo,
2. give the implementing agent only the extracted Buildprint package,
3. build the smallest implementation skeleton that satisfies the contracts,
4. run tests/build/checks,
5. write `REVERSAL_REPORT.md` with pass/fail and fidelity gaps.

Use honest grades:

- `architecture reversal passed`,
- `behavioral fidelity partial`,
- `behavioral parity not claimed`,
- `blocked` with missing evidence or decisions.
