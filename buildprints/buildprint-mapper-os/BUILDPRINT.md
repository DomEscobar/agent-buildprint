# Buildprint Mapper OS

## Purpose

Buildprint Mapper OS turns an existing software project into a scoped, reviewable Agent Buildprint package without flattening the project into a vague summary or copying secrets.

It is a coding-agent process, not a scanner. The agent reads source files, cites evidence, separates observed facts from inference, asks only blocking decisions, and validates the result through reversal.

Mapper OS must not generate lazy MVP apps. Its default posture is: **scope may be limited, but implemented scope must be complete**. If a feature, route, provider, persistence path, job, export, setting, or UI control is included, it must be real, wired, error-handled, persistent where relevant, and QA-testable. If that is too large, cut the capability from scope instead of faking it.

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
- Do not count mock services, skeleton adapters, no-op controls, route-shaped links, in-memory-only product stores, fake auth/billing/export/queues, placeholders, or `coming soon` surfaces as implemented product behavior.

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

- `buildprint-submission/AGENT_EXECUTION_BRIEF.md`.
- `buildprint-submission/agent-contract.xml`.
- `buildprint-submission/CURRENT_STATE.md`.
- `buildprint-submission/manifest.json`.
- `buildprint-submission/BUILDPRINT.md`.
- `buildprint-submission/SPEC.md`.
- `buildprint-submission/PLAN.md`.
- `buildprint-submission/CONTRACTS.md`.
- `buildprint-submission/TEST_MATRIX.md`.
- `buildprint-submission/IMPLEMENTATION_COMPLETENESS.md`.
- `buildprint-submission/AGENT_PROMPTING_STANDARD.md` when useful or referenced.
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

## Reversal and product proof requirement

A Buildprint is not validated just because it reads well. Validation requires a clean-room reversal attempt and, for product/feature Buildprints, a runnable product proof:

1. hide or ignore the original repo,
2. give the implementing agent only the extracted Buildprint package,
3. build the smallest production-grade implementation that satisfies the selected scope,
4. set up the generated app/feature on the user's machine,
5. run tests/build/checks,
6. run persistence/restart checks when product state exists,
7. run no-fake implementation scans for placeholders, no-op controls, skeleton adapters, route-shaped links, and mock-as-product paths,
8. run user-facing QA with Playwright CLI (`@playwright/cli`, https://github.com/microsoft/playwright-cli) when there is any browser UI,
9. write `REVERSAL_REPORT.md` and `QA_REPORT.md` with pass/fail, evidence, screenshots/snapshots where useful, and fidelity gaps.

Use honest grades:

- `architecture reversal passed`,
- `runnable product proof passed`,
- `browser QA passed`,
- `behavioral fidelity partial`,
- `behavioral parity not claimed`,
- `blocked` with missing evidence, setup failure, or decisions.
