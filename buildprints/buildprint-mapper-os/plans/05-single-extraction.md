# Phase 05 - Single Buildprint Extraction

## Goal

Generate one selected Buildprint package with agent execution rails.

## Keep in context

- `prompts/extract-selected.md`
- `templates/AGENT_EXECUTION_BRIEF.md`
- `templates/agent-contract.xml`
- `templates/CURRENT_STATE.md`
- `templates/manifest.json`
- `policies/quality.md`

## Steps

- Generate the selected package only from relevant evidence.
- Include existing core files plus agent-first files: execution brief, XML contract, current state, manifest, QA plan, implementation completeness, head-to-foot QA, traceability, validation template, questions, and submission checklist.
- Add conditional files when triggered: parity claims, threat model, data lifecycle, observability, architecture views, quality scorecard.
- Make selected scope, excluded scope, no-fake boundaries, and proof depth explicit.

## Do not

- Treat discovery scaffold as final extraction.
- Include unrelated systems as requirements.
- Make vague acceptance criteria like "works correctly."
- Claim runtime, provider, export, or parity validation without evidence.

## Exit criteria

- Generated `manifest.json` parses and required files exist.
- Included capabilities are real, excluded, or blocked.

## Validation evidence

- `SUBMISSION_CHECKLIST.md`, `TRACEABILITY_MATRIX.md`, and `VALIDATION_TEMPLATE.md` are ready to fill.
