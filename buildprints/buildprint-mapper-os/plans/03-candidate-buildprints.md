# Phase 03 - Candidate Buildprints

## Goal

Propose reusable, bounded Buildprint candidates without merging unrelated scopes.

## Keep in context

- `prompts/discover.md`
- `policies/quality.md`
- `SYSTEM_MAP.md`

## Steps

- Produce 2-5 candidates, or a justified single/system path.
- For each candidate include title, outcome, included/excluded paths, reusable value, risks, open questions, estimated tier, fidelity target, and validation checks.
- Identify capabilities to exclude rather than fake.
- Recommend the smallest production-grade selected scope.

## Do not

- Create one vague whole-repo Buildprint when smaller scopes exist.
- Count mocks, fixtures, temporary stores, or no-op controls as product behavior.
- Skip QA strategy or parity boundaries.

## Exit criteria

- Candidate list is decision-ready.
- The next human question is which candidate/system path to extract.

## Validation evidence

- `BUILDPRINT_CANDIDATES.md` includes scope, evidence, risks, and validation strategy per candidate.
