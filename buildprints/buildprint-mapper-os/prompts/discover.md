# Discovery Prompt

You are using Buildprint Mapper OS to map an existing repo.

Your job is discovery only. Do not modify source code. Do not create a final Buildprint package yet unless the repo is clearly small and the user explicitly asked for one.

## Required outputs

Create these files at the repo root or in the user-requested output folder:

- `SYSTEM_MAP.md`
- `BUILDPRINT_CANDIDATES.md`
- `questions.md`

## Process

1. Read `README.md`, `BUILDPRINT.md`, `PLAN.md`, `SPEC.md`, and `CONTRACTS.md` from this Mapper OS package.
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
- Risk zones.
- Unknowns.

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
- what decision is needed before extraction.

Do not merge unrelated scopes just to make one big Buildprint.

## `questions.md` must not flood the user

Use this structure:

```md
# Decisions

## Required now
| # | Decision | Safe default | Human answer |
|---|---|---|---|
| 1 | Confirm selected candidate/scope | Use candidate N as scope | |
| 2 | Choose fidelity target | Architecture skeleton first; parity only after reversal | |
| 3 | Confirm side-effect posture | No external writes during mapping/reversal | |

## Appendix — ask only if touched
- ...
```

Rules:

- 3-5 required decisions max.
- Ask at most one blocking question at a time.
- Put non-blocking unknowns in the appendix.
- If no candidate was chosen yet, end by asking which candidate should be extracted.
