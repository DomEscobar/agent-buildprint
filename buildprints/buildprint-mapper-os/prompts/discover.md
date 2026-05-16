# Discovery Prompt

You are using Buildprint Mapper OS to map an existing repo.

Your job is discovery only. Do not modify source code. Do not create a final Buildprint package yet unless the repo is clearly small and the user explicitly asked for one.

## Question policy

Do not run a long preflight questionnaire. If safe, assume read/export defaults and start soft discovery. Ask only for missing boundaries that would make discovery unsafe.

## Required outputs

Create these files at the repo root or in the user-requested output folder:

- `SYSTEM_MAP.md`
- `BUILDPRINT_CANDIDATES.md`
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
4. Write `SYSTEM_MAP.md` with evidence-backed zones.
5. Write `BUILDPRINT_CANDIDATES.md` with 2-5 scoped candidates.
6. Write `questions.md` as a progressive decision gate.

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
- recommended fidelity target,
- optional deeper parity targets,
- explicitly excluded parity targets,
- evidence needed to upgrade depth,
- what decision is needed before extraction.

Do not merge unrelated scopes just to make one big Buildprint.

## `questions.md` must not flood the user

Use this structure after soft discovery:

```md
# Decisions

## Required now
| # | Decision | Safe default | Human answer |
|---|---|---|---|
| 1 | Confirm selected candidate/scope | Use candidate N as scope | |
| 2 | Choose fidelity target | workflow-proof + contract-parity; runtime QA if UI exists | |
| 3 | Confirm provider/export posture | mock providers; manifest/preview export unless explicitly upgraded | |
| 4 | Confirm side-effect posture | No external writes during mapping/reversal | |

## Appendix — ask only if touched
- ...
```

Rules:

- 3-5 required decisions max after discovery.
- Ask at most one blocking question at a time.
- Put non-blocking unknowns in the appendix.
- If no candidate was chosen yet, end by asking which candidate should be extracted.
