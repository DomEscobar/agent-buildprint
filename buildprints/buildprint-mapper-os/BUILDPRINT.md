# Buildprint Mapper OS

## Purpose

Buildprint Mapper OS turns an existing software project into a scoped, reviewable Agent Buildprint package without flattening the project into a vague summary or copying secrets.

It is the official process for creator submissions when the source is an existing repo, especially a large project.

## Core idea

Small project:

```txt
repo → one scoped Buildprint
```

Large project:

```txt
repo
→ deterministic facts
→ system map
→ candidate Buildprints
→ human scope decision
→ one module Buildprint OR hierarchical System Buildprint
→ validation report
```

## Non-goals

- Do not rewrite application code.
- Do not copy secrets, private keys, tokens, `.env` values, customer data, or private production URLs.
- Do not pretend to understand business rules that are not present in the repo.
- Do not create a 100-page project summary and call it a Buildprint.
- Do not mark validation as passed unless commands actually ran.

## Inputs

- Existing project repository.
- Optional `agb map <repo> --out .project.buildprint` deterministic scan output.
- Optional human-provided scope: feature, workflow, architecture, or full system.

## Outputs

For discovery mode:

- `facts.json` or imported mapper facts.
- `SYSTEM_MAP.md`.
- `BUILDPRINT_CANDIDATES.md`.
- `questions.md`.

For single Buildprint extraction:

- `buildprint-submission/BUILDPRINT.md`.
- `buildprint-submission/SPEC.md`.
- `buildprint-submission/PLAN.md`.
- `buildprint-submission/CONTRACTS.md`.
- `buildprint-submission/TEST_MATRIX.md`.
- `buildprint-submission/VALIDATION_TEMPLATE.md`.
- `buildprint-submission/questions.md`.
- `buildprint-submission/README.md`.
- `buildprint-submission/SUBMISSION_CHECKLIST.md`.

For full large-system extraction:

- `project.buildprint/BUILDPRINT.md`.
- `project.buildprint/SYSTEM_MAP.md`.
- `project.buildprint/MODULES.md`.
- `project.buildprint/PLAN.md`.
- `project.buildprint/CONTRACTS.md`.
- `project.buildprint/TEST_MATRIX.md`.
- `project.buildprint/modules/*/BUILDPRINT.md` for major subsystems.
- `project.buildprint/questions.md`.
- `project.buildprint/SUBMISSION_CHECKLIST.md`.

## Critical rule

Every claim must be labeled as one of:

- `OBSERVED` — directly grounded in repo files or mapper facts.
- `INFERRED` — likely but not proven.
- `QUESTION` — requires human review.

If a claim cannot be grounded, it cannot be presented as fact.
