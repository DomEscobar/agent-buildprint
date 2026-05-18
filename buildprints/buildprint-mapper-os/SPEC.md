# Buildprint Mapper OS Spec

## Must

- Must begin with a safety pass before reading or writing output.
- Must avoid copying secret values, credentials, private keys, tokens, cookies, customer data, or private production URLs.
- Must record environment variable names only, never values.
- Must separate observed facts from inferred claims and human questions.
- Must identify candidate Buildprints before extracting a huge repo into final package files.
- Must pause for human scope selection after soft discovery unless a clear scope was provided.
- Must treat production-grade selected scope as the default output posture: smaller scope is acceptable, fake MVP implementation is not.
- Must treat mapping depth / parity target as a first-class user decision, but secondary to implementation completeness.
- Must make claims match the selected depth: workflow, contract, runtime parity, UI/workbench, provider, feed/source, export/media, or full parity.
- Must include `AGENT_EXECUTION_BRIEF.md`, `agent-contract.xml`, `CURRENT_STATE.md`, and `manifest.json` for every extracted Buildprint.
- Must include `IMPLEMENTATION_COMPLETENESS.md` for every product/app/feature/system output that could be implemented.
- Must require coding-agent read order, phase gates, stop conditions, and current-state updates to prevent context rot.
- Must require every included route, UI control, provider, job, export, persistence path, setting, auth/billing/upload/admin surface, and API to have real data flow, validation, error states, and QA evidence.
- Must cut scope honestly when full implementation is too large; excluded capabilities must be removed from claimed product scope, not replaced by mocks/placeholders.
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
- Must not generate lazy MVP apps, fake product surfaces, route-shaped links, no-op controls, placeholder settings, fake success states, in-memory-only product persistence, skeleton adapters counted as implemented, or mock services counted as product behavior.
- Must not use mocked providers, fixtures, or no-network demos as evidence that an included production provider/export/service is implemented. Mocks are allowed only as test/demo fixtures with a documented boundary.

## Modes

### Production-grade selected scope

Mapper OS defaults to production-grade implementation for the selected scope. This does **not** mean full clone parity. It means: once a capability is included, it must be complete enough to ship or be honestly blocked.

Rules:

- Scope may be limited, but implemented scope must be complete.
- Prefer a smaller complete Buildprint over a broad fake MVP.
- If a provider/export/job/route/auth flow/persistence layer cannot be implemented fully, exclude it and list what is required to add it later.
- Test fixtures and mocks may be generated, but they must not be the production path or be counted as feature completion.
- Product proof must include no-fake implementation checks, persistence/restart checks when data exists, and route/control checks when UI exists.

### Fidelity / parity depth

Every candidate and extracted Buildprint must declare one selected depth and any explicitly excluded depths:

1. `workflow-proof` — reproduce the core user/product workflow with mocks and fixtures.
2. `contract-parity` — preserve data models, states, APIs, adapters, validation, and edge behavior.
3. `runtime-parity` — generated product runs locally with build/test/runtime QA, persistence, async jobs, and real user journeys.
4. `ui-workbench-parity` — map screens, panels, routes, UX flows, workbench/canvas behavior, and visual QA evidence.
5. `provider-parity` — validate real external providers, credentials, latency/failure behavior, cost/safety boundaries, and media handling.
6. `feed-source-parity` — validate real feed/API source availability, redirects/proxies, schema drift, stale/deleted records, representative live payloads, and source freshness behavior.
7. `export-media-parity` — validate final export/render/media behavior such as files, audio/video sync, stitching, feeds, or downloadable artifacts.
8. `full-clone-parity` — all relevant depths above. This is never the default.

Default if the user does not decide: choose the smallest production-grade selected scope that can be implemented fully, usually `contract-parity` plus local `runtime-parity` for that scope when it is an app/feature. Do not default to mock-only workflow proof for product Buildprints. Ask before adding UI/provider/feed-source/export/full parity beyond the selected complete scope.

Candidates must include:

- recommended depth,
- optional deeper depths,
- explicitly excluded depths,
- explicitly excluded source/provider/hosted parity categories when relevant,
- evidence required to upgrade depth,
- safe claims at the selected depth,
- production-grade completeness posture,
- mock/fixture boundary,
- capabilities that should be excluded rather than faked.

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
- implementation completeness/no-fake status is recorded when applicable,
- product/browser QA status is recorded when applicable,
- critical requirements trace to source evidence and checks,
- review checklist is present.
