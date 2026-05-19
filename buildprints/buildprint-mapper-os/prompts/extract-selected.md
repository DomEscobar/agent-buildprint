# Extract Selected Prompt

You are using Buildprint Mapper OS to extract one selected candidate into `buildprint-submission/`.

Use only relevant evidence. Mark unrelated systems as out of scope. Do not modify app code. Do not copy secrets. Do not invent validation results.

## Inputs

Read:

- `SYSTEM_MAP.md`
- `BUILDPRINT_CANDIDATES.md`
- `questions.md` / human decision answers
- `DECOMPOSITION_STRATEGY.md` when present
- relevant source files for the selected candidate
- `policies/quality.md` from Mapper OS
- relevant templates under `templates/` from Mapper OS

If the selected candidate is unclear, stop and ask one question. If the source is large/system-shaped and no candidate or scope is selected, do not extract an implementation Buildprint; return to decomposition/scope decision.

## Required outputs

Create:

```txt
buildprint-submission/
  AGENT_EXECUTION_BRIEF.md
  agent-contract.xml
  CURRENT_STATE.md
  manifest.json
  README.md
  BUILDPRINT.md
  SPEC.md
  PLAN.md
  CONTRACTS.md
  TEST_MATRIX.md
  VALIDATION_TEMPLATE.md
  QA_PLAN.md
  AGENT_PROMPTING_STANDARD.md # optional copy or reference when useful
  IMPLEMENTATION_COMPLETENESS.md # required for product/app/feature scopes
  HEAD_TO_FOOT_QA.md        # required for runnable product/app/feature scopes
  PARITY_CLAIMS.md          # required for product-inspired/rebuild/parity scopes
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
  RUNTIME_LIVE_TEST_PLAN.md    # optional; use when browser/product runtime QA needs a separate harness plan
```

Before implementation/reversal, coding agents must read `AGENT_EXECUTION_BRIEF.md`, `agent-contract.xml`, and `CURRENT_STATE.md` first. `CURRENT_STATE.md` must be updated after every phase.

After reversal validation, also create:

```txt
buildprint-submission/REVERSAL_REPORT.md
buildprint-submission/QA_REPORT.md        # required for runnable product/feature proofs
```

## Extraction rules

- Stay inside the selected scope unless a dependency is required to understand the contract.
- For large/system repos, extract one feature slice at a time unless the user explicitly selected architecture-only System Buildprint mode.
- If you cross the boundary, document why.
- If you discover source defects or suspicious mismatches, document them as observed risks unless the selected task explicitly includes source repair.
- Separate `OBSERVED`, `INFERRED`, and `QUESTION`.
- Preserve exact contracts only when you have evidence.
- Do not claim exact behavior when only architecture is known.
- Do not upgrade a mocked or fixture-only path into product implementation. Mocks are test/demo fixtures only and must have a documented boundary.
- Extract the smallest scope that can be implemented production-grade; if a capability cannot be real, exclude it instead of faking it.
- Extract edge cases, failure modes, lifecycle/state transitions, and invariants before writing implementation phases.
- Size phases to the feature: larger candidates need multiple evidence/testable phases rather than one broad implementation step.
- If an edge matters but evidence is missing, mark it `QUESTION` and include a safe default only as `INFERRED`.

## Buildprint package expectations

`BUILDPRINT.md`:
- purpose,
- architecture,
- selected production-grade scope,
- boundaries,
- non-goals,
- required validation,
- selected fidelity target and explicitly excluded parity depths,
- explicit statement that included features must be real, not mocked/placeholders.

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
- no-fake implementation checks,
- persistence/restart checks where product state exists,
- Playwright CLI QA journeys when UI exists.

`QA_PLAN.md`:
- derive QA from mapped flows/jobs,
- map each risk/edge to expected behavior,
- choose check type and concrete command/assertion where possible,
- include Playwright CLI or equivalent browser-runtime journeys only for browser-relevant flows.

`AGENT_EXECUTION_BRIEF.md`:
- compact mission, read order, hard constraints, phase gates, stop conditions, and final report format.

`agent-contract.xml`:
- strict XML instruction envelope with mission, read order, MUST/MUST NOT rules, stop-if conditions, phase gates, and done criteria.

`CURRENT_STATE.md`:
- rolling anti-context-rot state: mission, current phase, completed work, active constraints, next action, blockers, evidence.

`manifest.json`:
- required files, conditional files, read order, required gates, no-fake implementation rules, and done criteria.

`IMPLEMENTATION_COMPLETENESS.md`:
- inventory every included route, screen, API, job, provider, export, import, setting, auth surface, billing flow, upload, and destructive action,
- prove each included capability is real or mark it blocked/excluded,
- document mock/fixture boundaries,
- require no-placeholder/no-op/no-fake scans.

`HEAD_TO_FOOT_QA.md`:
- define static safety, unit/contract, build, runtime happy path, runtime negative paths, responsive/UX, persistence/restart, no-fake implementation, and optional live-provider gates,
- require real browser/runtime validation for UI proofs,
- require screenshot(s), parsed manifest/artifact sample, command summaries, and remaining gaps.

`PARITY_CLAIMS.md`:
- list safe claims for selected depth,
- list unsafe claims for excluded depths,
- include exact wording allowed in reports/public copy,
- prohibit full-clone/drop-in/export/live-provider claims unless explicitly selected and validated.

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
4. Build the smallest production-grade implementation that satisfies the selected scope. Do not satisfy included product features with mocks, no-op controls, placeholder routes, skeleton adapters, or in-memory persistence when durability is claimed.
5. Run tests/build/checks, including no-fake implementation checks.
6. If the Buildprint describes a product/app/feature, set up the generated result on the user's machine and record the command and URL.
7. If the result has browser UI, run real runtime/browser QA. Prefer Playwright CLI (`@playwright/cli`) or an equivalent CDP/browser harness that clicks actual rendered controls, parses rendered state/artifacts, and captures screenshots.
8. Write `REVERSAL_REPORT.md` and, when product/browser QA applies, `QA_REPORT.md`.

### Reversal timebox and size

Keep reversal compact. The goal is architecture reconstruction, not cloning the original product. Default budget depends on selected fidelity target. For selected production scope, keep it compact by cutting scope, not by faking implementation:

- 1-3 core modules if needed,
- 5-10 focused tests minimum for compact proofs,
- fixtures only in test/demo paths, never selected product behavior,
- real durable storage if persistence is claimed,
- real routes/controls for included UI,
- real provider/database/network calls only when explicitly included; otherwise exclude those capabilities from product scope.

If the implementation is growing beyond this, stop and report the highest-risk missing contract or scope cut instead of continuing with fake coverage.

### TypeScript / NodeNext scratch guidance

If the clean-room implementation uses TypeScript with `module` or `moduleResolution` set to `NodeNext`:

- test files should import emitted runtime paths such as `../src/workflow.js`, even when the source file is `workflow.ts`;
- do not use `.ts` import specifiers unless `allowImportingTsExtensions` is valid for the chosen no-emit setup;
- if tests compile before running, keep `tsc --noEmit` and emitted JS test execution compatible;
- treat TS config/import mistakes as scratch-harness issues, not Buildprint fidelity gaps, and fix them before judging the Buildprint.

### Report gap types separately

`REVERSAL_REPORT.md` and `QA_REPORT.md` must distinguish:

- `Buildprint gaps` — missing or ambiguous architecture/contracts in the generated Buildprint,
- `Scratch harness issues` — test runner, TypeScript config, dependency, or local implementation mistakes,
- `Product proof defects` — runnable app/UI bugs found during setup or Playwright CLI QA,
- `Intentional omissions` — mocked/excluded systems that were outside the selected scope.

Use honest wording:

- `architecture reversal passed`,
- `behavioral fidelity partial`,
- `browser QA passed`,
- `behavioral parity not claimed`,
- `blocked: <reason>`.

End with a concise final summary and the package path.
