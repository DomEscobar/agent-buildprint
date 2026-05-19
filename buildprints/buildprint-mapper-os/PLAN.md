# Buildprint Mapper OS Plan

This plan is designed for a coding agent. The agent reads repo files, reasons about architecture, and writes the mapping artifacts. No CLI is required.

## Attention contract

- Discover first, ask later.
- Use `plans/*.md` as phase-local cards to avoid context rot.
- Generate agent execution rails for selected extraction, not only summary docs.
- Finish with a chat handover: outcome, selected scope, evidence, files, commands/evals, gaps, next direction.

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
→ one human scope + production-grade posture + fidelity/depth decision
→ selected Buildprint extraction with explicit parity boundaries and no-fake implementation contract
→ scope-derived QA plan + implementation completeness contract + head-to-foot QA + traceability matrix
→ conditional precision artifacts
→ compact clean-room reversal validation
→ runnable product/feature proof on the user machine when applicable
→ runtime/browser QA, persistence/restart QA, no-fake scan when applicable, and mapper golden eval regression checks
→ final package + separated Buildprint/harness/product-QA gap report
```

## Operating rules

- Do not modify source code.
- Do not copy `.env` values, tokens, private keys, customer data, or production secrets.
- Do not flatten the entire repo into one vague document.
- Do not ask a long questionnaire. Ask almost nothing before soft discovery; after discovery ask max 5 required decisions and at most one blocking question in chat at a time.
- Keep most unknowns in `questions.md` appendix unless they block the selected scope.
- Do not claim behavioral parity until reversal validation has run.
- Keep reversal validation compact but not fake: prove reconstructability with real implementation for the selected scope; mocks may be used only as test/demo fixtures and must not count as product behavior.
- Separate real Buildprint gaps from scratch-harness/tooling bugs in validation reports.
- For product or feature Buildprints, the final proof should set up the generated app/thing locally and run user-facing QA, persistence/restart QA where state exists, route/control checks where UI exists, and a no-fake implementation scan; do not stop at unit tests.
- For mapper/template behavior changes, run `node buildprints/buildprint-mapper-os/evals/check-map.mjs --agb ./bin/agb.js` and record fixture-level pass/fail evidence.
- Do not assume full parity, but do assume production-grade implementation for included scope. Capture the user-selected depth: workflow, contract, runtime, UI/workbench, provider, export/media, or full-system equivalence.
- Generate safe/unsafe parity claims for product-inspired or clone-like scopes, and make QA match the selected depth.
- Use Playwright CLI (`@playwright/cli`) for browser QA when the generated proof has a UI.

## Decision gate

If the project is large and no scope is provided, stop after candidate discovery and ask which candidate, production-grade selected scope, and fidelity/depth target to extract. Make the safe default "smaller complete product scope", not broad proof-only coverage.

If the user asks for a full system map instead of one candidate, follow `plans/06-system-extraction.md`.
