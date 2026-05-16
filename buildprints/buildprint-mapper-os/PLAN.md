# Buildprint Mapper OS Plan

This plan is designed for a coding agent. The agent reads repo files, reasons about architecture, and writes the mapping artifacts. No CLI is required.

## Phase index

1. `plans/00-safety-boundaries.md` — secrets, source safety, write boundaries.
2. `plans/01-repo-census.md` — safe repo inventory; no architecture claims yet.
3. `plans/02-system-map.md` — architecture zones and subsystem boundaries with evidence.
4. `plans/03-candidate-buildprints.md` — possible reusable Buildprints.
5. `plans/04-scope-decision.md` — progressive human selection gate for candidate + fidelity/depth target.
6. `plans/05-single-extraction.md` — one bounded Buildprint package.
7. `plans/06-system-extraction.md` — hierarchical project/system package when requested.
8. `plans/07-validation-submission.md` — reversal validation, honesty, and submission checklist.

## Default flow

```txt
repo
→ minimal preflight only if needed
→ soft discovery / safe census
→ evidence-backed system map
→ 2-5 candidate Buildprints
→ one human scope + fidelity/depth decision
→ selected Buildprint extraction with explicit parity boundaries
→ scope-derived QA plan + head-to-foot QA + traceability matrix
→ conditional precision artifacts
→ compact clean-room reversal validation
→ runnable product/feature proof on the user machine when applicable
→ runtime/browser QA for browser UI when applicable
→ final package + separated Buildprint/harness/product-QA gap report
```

## Operating rules

- Do not modify source code.
- Do not copy `.env` values, tokens, private keys, customer data, or production secrets.
- Do not flatten the entire repo into one vague document.
- Do not ask a long questionnaire. Ask almost nothing before soft discovery; after discovery ask max 5 required decisions and at most one blocking question in chat at a time.
- Keep most unknowns in `questions.md` appendix unless they block the selected scope.
- Do not claim behavioral parity until reversal validation has run.
- Keep reversal validation compact: prove reconstructability with mocked services and focused tests, not a full clone.
- Separate real Buildprint gaps from scratch-harness/tooling bugs in validation reports.
- For product or feature Buildprints, the final proof should set up the generated app/thing locally and run user-facing QA, not stop at unit tests.
- Do not assume full parity. Capture the user-selected depth: workflow, contract, runtime, UI/workbench, provider, export/media, or full clone.
- Generate safe/unsafe parity claims for product-inspired or clone-like scopes, and make QA match the selected depth.
- Use Playwright CLI (`@playwright/cli`) for browser QA when the generated proof has a UI.

## Decision gate

If the project is large and no scope is provided, stop after candidate discovery and ask which candidate and fidelity/depth target to extract.

If the user asks for a full system map instead of one candidate, follow `plans/06-system-extraction.md`.
