# Extract Selected Prompt

You are using Buildprint Mapper OS to extract one selected candidate into `buildprint-submission/`.

Use only relevant evidence. Mark unrelated systems as out of scope. Do not modify app code. Do not copy secrets. Do not invent validation results.

## Inputs

Read:

- `SYSTEM_MAP.md`
- `BUILDPRINT_CANDIDATES.md`
- `questions.md` / human decision answers
- relevant source files for the selected candidate
- `policies/quality.md` from Mapper OS
- relevant templates under `templates/` from Mapper OS

If the selected candidate is unclear, stop and ask one question.

## Required outputs

Create:

```txt
buildprint-submission/
  README.md
  BUILDPRINT.md
  SPEC.md
  PLAN.md
  CONTRACTS.md
  TEST_MATRIX.md
  VALIDATION_TEMPLATE.md
  QA_PLAN.md
  TRACEABILITY_MATRIX.md
  questions.md
  SUBMISSION_CHECKLIST.md
  CAPABILITY_BASELINE.md      # required for famous/product-inspired systems
  THREAT_MODEL.md             # when auth/payments/admin/API/upload/sensitive data applies
  DATA_LIFECYCLE.md           # when persistent/synced/imported/exported data applies
  ARCHITECTURE_VIEWS.md       # required for System Buildprints
  DECISIONS.md                # when assumptions/scope/default decisions exist
  OBSERVABILITY.md            # when deployable services/products apply
  QUALITY_SCORECARD.md        # required before product-proof/publish-ready claims
```

After reversal validation, also create:

```txt
buildprint-submission/REVERSAL_REPORT.md
buildprint-submission/QA_REPORT.md        # required for runnable product/feature proofs
```

## Extraction rules

- Stay inside the selected scope unless a dependency is required to understand the contract.
- If you cross the boundary, document why.
- Separate `OBSERVED`, `INFERRED`, and `QUESTION`.
- Preserve exact contracts only when you have evidence.
- Do not claim exact behavior when only architecture is known.
- Extract edge cases, failure modes, lifecycle/state transitions, and invariants before writing implementation phases.
- If an edge matters but evidence is missing, mark it `QUESTION` and include a safe default only as `INFERRED`.

## Buildprint package expectations

`BUILDPRINT.md`:
- purpose,
- architecture,
- selected scope,
- boundaries,
- non-goals,
- required validation.

`SPEC.md`:
- user-visible behavior,
- system behavior,
- must / must-not rules,
- edge cases and failure modes,
- state/lifecycle behavior,
- Given/When/Then cases where useful.

`CONTRACTS.md`:
- inputs,
- outputs,
- API/schema contracts,
- persistence contracts,
- auth/session contracts,
- tool/provider contracts if relevant,
- invariants, idempotency, rollback/retry, and side-effect contracts.

`TEST_MATRIX.md`:
- risks mapped to checks,
- edge cases mapped to tests,
- existing tests observed,
- missing tests,
- reversal checks,
- Playwright CLI QA journeys when UI exists.

`QA_PLAN.md`:
- derive QA from mapped flows/jobs,
- map each risk/edge to expected behavior,
- choose check type and concrete command/assertion where possible,
- include Playwright CLI journeys only for browser-relevant flows.

`TRACEABILITY_MATRIX.md`:
- link requirement → source evidence → confidence → reversal check → QA check → status,
- list unverified requirements separately.

`questions.md`:
- 3-5 required decisions max,
- appendix for non-blocking unknowns.

`SUBMISSION_CHECKLIST.md`:
- files created,
- evidence inspected,
- commands run,
- commands not run,
- known gaps,
- whether reversal was attempted,
- whether a runnable product/feature proof was set up,
- whether Playwright CLI QA was run for browser UI.

## Reversal validation

Do not call the Buildprint validated until a clean-room reversal has been attempted.

For reversal:

1. Create a separate scratch folder.
2. Give the implementing agent only `buildprint-submission/`.
3. Do not let it read the original repo after reversal starts.
4. Build the smallest skeleton that satisfies the Buildprint.
5. Run tests/build/checks.
6. If the Buildprint describes a product/app/feature, set up the generated result on the user's machine and record the command and URL.
7. If the result has browser UI, run Playwright CLI QA with `@playwright/cli` (https://github.com/microsoft/playwright-cli). Prefer commands such as `open`/`attach`, `snapshot`, `click`, `eval`, and `screenshot` to verify realistic user journeys.
8. Write `REVERSAL_REPORT.md` and, when product/browser QA applies, `QA_REPORT.md`.

### Reversal timebox and size

Keep reversal compact. The goal is architecture reconstruction, not cloning the original product. Default budget:

- 1-3 core modules,
- 5-10 focused tests,
- mocked external services,
- no UI polish,
- no live provider/database/network calls unless the Buildprint explicitly requires them.

If the skeleton is growing beyond this, stop and report the highest-risk missing contract instead of continuing to build.

### TypeScript / NodeNext scratch guidance

If the clean-room skeleton uses TypeScript with `module` or `moduleResolution` set to `NodeNext`:

- test files should import emitted runtime paths such as `../src/workflow.js`, even when the source file is `workflow.ts`;
- do not use `.ts` import specifiers unless `allowImportingTsExtensions` is valid for the chosen no-emit setup;
- if tests compile before running, keep `tsc --noEmit` and emitted JS test execution compatible;
- treat TS config/import mistakes as scratch-harness issues, not Buildprint fidelity gaps, and fix them before judging the Buildprint.

### Report gap types separately

`REVERSAL_REPORT.md` and `QA_REPORT.md` must distinguish:

- `Buildprint gaps` — missing or ambiguous architecture/contracts in the generated Buildprint,
- `Scratch harness issues` — test runner, TypeScript config, dependency, or local skeleton mistakes,
- `Product proof defects` — runnable app/UI bugs found during setup or Playwright CLI QA,
- `Intentional omissions` — mocked/excluded systems that were outside the selected scope.

Use honest wording:

- `architecture reversal passed`,
- `behavioral fidelity partial`,
- `browser QA passed`,
- `behavioral parity not claimed`,
- `blocked: <reason>`.

End with a concise final summary and the package path.
