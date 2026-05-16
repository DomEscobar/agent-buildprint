# Buildprint Mapper OS Spec

## Must

- Must begin with a safety pass before reading or writing output.
- Must avoid copying secret values, credentials, private keys, tokens, cookies, customer data, or private production URLs.
- Must record environment variable names only, never values.
- Must separate observed facts from inferred claims and human questions.
- Must identify candidate Buildprints before extracting a huge repo into final package files.
- Must pause for human scope selection after soft discovery unless a clear scope was provided.
- Must treat mapping depth / parity target as a first-class user decision, not an implicit default.
- Must make claims match the selected depth: workflow, contract, runtime, UI/workbench, provider, export/media, or full parity.
- Must use minimal preflight and dynamic contextual questions; no long upfront questionnaire.
- Must support both single-module Buildprints and hierarchical System Buildprints.
- Must include quality gates and acceptance checks for any extracted Buildprint.
- Must include edge-case inventory for selected product/module scopes.
- Must document state machines, lifecycles, invariants, and failure modes for non-trivial workflows.
- Must include confidence levels per module and per high-risk claim.
- Must distinguish product-proof defects from Buildprint gaps after QA.
- Must include a submission checklist with known gaps and commands run.
- Must include `QA_PLAN.md` and `TRACEABILITY_MATRIX.md` for extracted product/feature/system outputs.
- Must include `PARITY_CLAIMS.md` for product-inspired, clone-like, compatibility, webapp, agentic, or user-facing rebuild scopes.
- Must include `HEAD_TO_FOOT_QA.md` for product/app/feature scopes where a generated proof may be runnable.
- Must include runtime/browser QA requirements when a generated proof has browser UI.
- Must include conditional precision artifacts when relevant: capability baseline, threat model, data lifecycle, architecture views, decisions, observability, and scorecard.

## Must not

- Must not modify application source code.
- Must not invent tests, dry-run results, traffic numbers, users, revenue, security reviews, or validation status.
- Must not turn unrelated subsystems into one vague Buildprint.
- Must not treat generated summaries as source-of-truth if they conflict with repository facts.
- Must not publish or submit automatically.
- Must not collapse edge cases into generic phrases like “handle errors”; concrete errors and recovery behavior must be listed or marked unknown.
- Must not use generic QA checklists as a substitute for scope-derived QA journeys.
- Must not ask product/business questions before discovering that the relevant subsystem exists.
- Must not silently escalate to full parity. Full parity requires explicit user selection and evidence for UI, provider, data, runtime, and export behavior.

## Modes

### Fidelity / parity depth

Every candidate and extracted Buildprint must declare one selected depth and any explicitly excluded depths:

1. `workflow-proof` — reproduce the core user/product workflow with mocks and fixtures.
2. `contract-parity` — preserve data models, states, APIs, adapters, validation, and edge behavior.
3. `runtime-parity` — generated product runs locally with build/test/runtime QA, persistence, async jobs, and real user journeys.
4. `ui-workbench-parity` — map screens, panels, routes, UX flows, workbench/canvas behavior, and visual QA evidence.
5. `provider-parity` — validate real external providers, credentials, latency/failure behavior, cost/safety boundaries, and media handling.
6. `export-media-parity` — validate final export/render/media behavior such as files, audio/video sync, stitching, feeds, or downloadable artifacts.
7. `full-clone-parity` — all relevant depths above. This is never the default.

Default if the user does not decide: `workflow-proof` plus `contract-parity`, with runtime proof only when cheap/applicable. Ask before adding UI/provider/export/full parity.

Candidates must include:

- recommended depth,
- optional deeper depths,
- explicitly excluded depths,
- evidence required to upgrade depth,
- safe claims at the selected depth.

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
