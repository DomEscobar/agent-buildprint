# Buildprint Mapper OS Spec

## Must

- Must begin with a safety pass before reading or writing output.
- Must avoid copying secret values, credentials, private keys, tokens, cookies, customer data, or private production URLs.
- Must record environment variable names only, never values.
- Must separate observed facts from inferred claims and human questions.
- Must identify candidate Buildprints before extracting a huge repo into final package files.
- Must pause for human scope selection unless a clear scope was provided.
- Must support both single-module Buildprints and hierarchical System Buildprints.
- Must include quality gates and acceptance checks for any extracted Buildprint.
- Must include edge-case inventory for selected product/module scopes.
- Must document state machines, lifecycles, invariants, and failure modes for non-trivial workflows.
- Must include confidence levels per module and per high-risk claim.
- Must distinguish product-proof defects from Buildprint gaps after QA.
- Must include a submission checklist with known gaps and commands run.
- Must include `QA_PLAN.md` and `TRACEABILITY_MATRIX.md` for extracted product/feature/system outputs.
- Must include conditional precision artifacts when relevant: capability baseline, threat model, data lifecycle, architecture views, decisions, observability, and scorecard.

## Must not

- Must not modify application source code.
- Must not invent tests, dry-run results, traffic numbers, users, revenue, security reviews, or validation status.
- Must not turn unrelated subsystems into one vague Buildprint.
- Must not treat generated summaries as source-of-truth if they conflict with repository facts.
- Must not publish or submit automatically.
- Must not collapse edge cases into generic phrases like “handle errors”; concrete errors and recovery behavior must be listed or marked unknown.
- Must not use generic QA checklists as a substitute for scope-derived QA journeys.

## Modes

### Discovery mode

Used when the repo is large or no scope is provided.

Output:

- `SYSTEM_MAP.md`
- `BUILDPRINT_CANDIDATES.md`
- `questions.md`

Then ask the user which candidate or full-system path to extract.

### Single Buildprint mode

Used when the user provides a bounded scope such as `billing`, `admin dashboard`, `AI blog pipeline`, or `auth/RBAC`.

Output one `buildprint-submission/` package.

### System Buildprint mode

Used when the full project is the product and its architecture is reusable.

Output one top-level `project.buildprint/` package plus module Buildprints under `modules/`.

## Acceptance behavior

A generated package is publishable only if:

- scope is clear,
- files are complete for the tier,
- secrets check is clean,
- unknowns are listed,
- edge cases/failure modes are inventoried,
- state/lifecycle behavior is explicit where relevant,
- validation status is honest,
- product/browser QA status is recorded when applicable,
- critical requirements trace to source evidence and checks,
- review checklist is present.
