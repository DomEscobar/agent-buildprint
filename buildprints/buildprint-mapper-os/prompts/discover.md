# Discovery Prompt

You are using Buildprint Mapper OS to map an existing repo.

Your job is discovery only. Do not modify source code. Do not create a final Buildprint package yet unless the repo is clearly small and the user explicitly asked for one.

## Question policy

Do not run a long preflight questionnaire. If safe, assume read/export defaults and start soft discovery. Ask only for missing boundaries that would make discovery unsafe.

## Required outputs

Create these files at the repo root or in the user-requested output folder:

- `SYSTEM_MAP.md`
- `BUILDPRINT_CANDIDATES.md`
- `DECOMPOSITION_STRATEGY.md` when the repo is medium/large/high-pressure/system
- `questions.md`

## Process

1. Read `README.md`, `BUILDPRINT.md`, `PLAN.md`, `SPEC.md`, `CONTRACTS.md`, `policies/quality.md`, `policies/questions.md`, and the relevant `templates/*.md` from this Mapper OS package.
2. Do a safe repo census:
   - package/dependency manifests,
   - app entrypoints,
   - routes/pages/API handlers,
   - auth/session files,
   - persistence/schema files,
   - integration/provider files,
   - tests/checks,
   - deploy/runtime files.
3. Inspect the files that carry architectural evidence. Do not rely on filenames alone.
4. Classify repo size/shape as `small`, `medium`, `large`, or `monorepo-system`.
5. Write `SYSTEM_MAP.md` with evidence-backed zones and the selected output-mode rationale.
6. Write `DECOMPOSITION_STRATEGY.md` for medium/large/high-pressure/system repos.
7. Write `BUILDPRINT_CANDIDATES.md` with 2-5 scoped candidates.
8. Write `questions.md` as a progressive decision gate.

## Claim discipline

For every important claim, use one of:

- `OBSERVED(path:line)` — directly grounded in repo files.
- `INFERRED` — likely but not proven.
- `QUESTION` — requires human/product input.

Do not copy secrets or `.env` values. Environment variable names are allowed; values are not.

## `SYSTEM_MAP.md` must include

- Project purpose if observable; otherwise mark as `QUESTION`.
- Architecture zones.
- Entrypoints/routes/APIs.
- Data and persistence boundaries.
- Auth/session/permission boundaries.
- External integrations and side-effect surfaces.
- Tests/validation already present.
- State machines/lifecycles for major workflows.
- Edge cases and failure modes.
- Risk zones.
- Unknowns with confidence.

## Size classification must include

- size class: `small`, `medium`, `large`, or `monorepo-system`;
- evidence for the classification;
- selected output mode and why;
- whether implementation extraction is safe now;
- latest safe starting phase;
- why a one-giant-Buildprint path is safe or unsafe.

## `DECOMPOSITION_STRATEGY.md` must include for medium/large/high-pressure/system repos

- domains/features/modules;
- dependency boundaries;
- candidate order;
- shared contracts and cross-slice risks;
- per-slice implementation phase depth;
- feature-slice validation/test strategy;
- what should wait for later system synthesis;
- capabilities that must be excluded rather than faked.

## `BUILDPRINT_CANDIDATES.md` must include 2-5 candidates

For each candidate:

- title,
- scope,
- included paths,
- excluded paths,
- reusable value,
- main risks,
- evidence,
- confidence,
- edge cases to preserve,
- QA/product proof strategy,
- recommended production-grade selected scope,
- capabilities to exclude rather than fake,
- mock/fixture boundary if tests need mocks,
- recommended fidelity target,
- optional deeper parity targets,
- explicitly excluded parity targets,
- evidence needed to upgrade depth,
- what decision is needed before extraction;
- implementation phases sized to the candidate;
- concrete test/QA strategy for feature implementation;
- dependencies that must be confirmed before extraction;
- latest safe starting phase.

Do not merge unrelated scopes just to make one big Buildprint. For large/system repos, do not recommend implementation until a candidate/scope is selected; the default next action is candidate selection or system-architecture-only mapping.

## `questions.md` must not flood the user

Use this structure after soft discovery:

```md
# Decisions

## Required now
| # | Decision | Safe default | Human answer |
|---|---|---|---|
| 1 | Confirm selected candidate/scope | Use candidate N as scope | |
| 2 | Confirm production-grade selected scope | Smaller complete scope; no proof-only product surfaces | |
| 3 | Choose fidelity target | contract-parity + runtime-parity for included product/app features | |
| 4 | Confirm provider/export posture | Exclude provider/export unless real implementation is selected; mocks only as test fixtures | |
| 5 | Confirm side-effect posture | No external writes during mapping/reversal | |

## Appendix — ask only if touched
- ...
```

Rules:

- 3-5 required decisions max after discovery.
- Ask at most one blocking question at a time.
- Put non-blocking unknowns in the appendix.
- If no candidate was chosen yet, end by asking which candidate should be extracted.


## Feature-scope overhaul

Mapper OS is capability-first. See `FEATURE_SCOPE_CONTRACT.md`: features are the rebuild contract; files are evidence; implementation decomposition must produce `FEATURE_INVENTORY.md`, `PRODUCT_CAPABILITY_MAP.md`, `IMPLEMENTATION_DECOMPOSITION.md`, `PHASE_PLAN.md`, `LOOP_GATES.md`, and `PARITY_ACCEPTANCE.md`.
