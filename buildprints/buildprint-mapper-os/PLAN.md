# Buildprint Mapper OS Plan

This plan is designed for a coding agent. The agent reads repo files, reasons about architecture, and writes the mapping artifacts. No CLI is required.

## Phase index

1. `plans/00-safety-boundaries.md` — secrets, source safety, write boundaries.
2. `plans/01-repo-census.md` — safe repo inventory; no architecture claims yet.
3. `plans/02-system-map.md` — architecture zones and subsystem boundaries with evidence.
4. `plans/03-candidate-buildprints.md` — possible reusable Buildprints.
5. `plans/04-scope-decision.md` — progressive human selection gate.
6. `plans/05-single-extraction.md` — one bounded Buildprint package.
7. `plans/06-system-extraction.md` — hierarchical project/system package when requested.
8. `plans/07-validation-submission.md` — reversal validation, honesty, and submission checklist.

## Default flow

```txt
repo
→ safe census
→ evidence-backed system map
→ 2-5 candidate Buildprints
→ one human scope decision
→ selected Buildprint extraction
→ clean-room reversal validation
→ final package + gap report
```

## Operating rules

- Do not modify source code.
- Do not copy `.env` values, tokens, private keys, customer data, or production secrets.
- Do not flatten the entire repo into one vague document.
- Do not ask a long questionnaire. Ask at most one blocking question at a time.
- Keep most unknowns in `questions.md` appendix unless they block the selected scope.
- Do not claim behavioral parity until reversal validation has run.

## Decision gate

If the project is large and no scope is provided, stop after candidate discovery and ask which candidate to extract.

If the user asks for a full system map instead of one candidate, follow `plans/06-system-extraction.md`.
