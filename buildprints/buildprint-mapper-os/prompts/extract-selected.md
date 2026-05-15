# Extract Selected Prompt

You are using Buildprint Mapper OS to extract one selected candidate into `buildprint-submission/`.

Use only relevant evidence. Mark unrelated systems as out of scope. Do not modify app code. Do not copy secrets. Do not invent validation results.

## Inputs

Read:

- `SYSTEM_MAP.md`
- `BUILDPRINT_CANDIDATES.md`
- `questions.md` / human decision answers
- relevant source files for the selected candidate

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
  questions.md
  SUBMISSION_CHECKLIST.md
```

After reversal validation, also create:

```txt
buildprint-submission/REVERSAL_REPORT.md
```

## Extraction rules

- Stay inside the selected scope unless a dependency is required to understand the contract.
- If you cross the boundary, document why.
- Separate `OBSERVED`, `INFERRED`, and `QUESTION`.
- Preserve exact contracts only when you have evidence.
- Do not claim exact behavior when only architecture is known.

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
- Given/When/Then cases where useful.

`CONTRACTS.md`:
- inputs,
- outputs,
- API/schema contracts,
- persistence contracts,
- auth/session contracts,
- tool/provider contracts if relevant.

`TEST_MATRIX.md`:
- risks mapped to checks,
- existing tests observed,
- missing tests,
- reversal checks.

`questions.md`:
- 3-5 required decisions max,
- appendix for non-blocking unknowns.

`SUBMISSION_CHECKLIST.md`:
- files created,
- evidence inspected,
- commands run,
- commands not run,
- known gaps,
- whether reversal was attempted.

## Reversal validation

Do not call the Buildprint validated until a clean-room reversal has been attempted.

For reversal:

1. Create a separate scratch folder.
2. Give the implementing agent only `buildprint-submission/`.
3. Do not let it read the original repo.
4. Build the smallest skeleton that satisfies the Buildprint.
5. Run tests/build/checks.
6. Write `REVERSAL_REPORT.md`.

Use honest wording:

- `architecture reversal passed`,
- `behavioral fidelity partial`,
- `behavioral parity not claimed`,
- `blocked: <reason>`.

End with a concise final summary and the package path.
