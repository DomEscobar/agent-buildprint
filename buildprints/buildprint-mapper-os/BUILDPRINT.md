# Buildprint Mapper OS

## Agent Operating Contract

Buildprint Mapper OS is a coding-agent process for turning an existing software project into a scoped, evidence-backed Agent Buildprint package.

The mapper reads source files, cites evidence, separates observed facts from inference, asks only blocking decisions, and validates the resulting package through a clean-room reversal attempt. It is not a source scanner, code generator, or project-summary template.

The mapper's default posture is strict: scope may be limited, but every included capability must be complete enough to implement, test, and review. If a route, provider, persistence path, job, export, setting, API, or UI control is included in the selected Buildprint, it must have a real contract, error behavior, and validation path. Capabilities that cannot meet that bar are excluded and documented as future work.

## Binding Implementation Slice

This Buildprint binds the mapping process, not a deployable product runtime.

Included:

- safe repository census;
- evidence-backed system map;
- candidate Buildprint discovery;
- human scope and fidelity decision gate;
- single-module or hierarchical Buildprint extraction;
- execution artifacts for coding agents;
- scope-derived QA, traceability, and implementation-completeness checks;
- clean-room reversal validation and final gap reporting;
- golden fixture eval harness for mapper quality regression checks.

Excluded:

- modifying the source application being mapped;
- automatic publishing or submission;
- copying secrets, private data, or production credentials;
- claiming full behavioral equivalence to the source project without explicit evidence and validation;
- treating fixture providers, no-op controls, or temporary stores as production behavior.

## Non-Goals / Unsafe Claims

- Do not rewrite application code.
- Do not copy secrets, private keys, tokens, `.env` values, customer data, cookies, or private production URLs.
- Do not present repository guesses as facts.
- Do not create a large undifferentiated project summary and call it a Buildprint.
- Do not mark validation as passed unless the exact commands or checks ran.
- Do not require a CLI to use this Buildprint.
- Do not count test fixtures, skeleton adapters, route-shaped links, no-op controls, temporary product stores, or placeholder surfaces as implemented product behavior.

## Required Read Order

1. `BUILDPRINT.md`
2. `README.md`
3. `PLAN.md`
4. `SPEC.md`
5. `CONTRACTS.md`
6. `TEST_MATRIX.md`
7. `policies/safety.md`
8. `policies/quality.md`
9. `policies/questions.md`
10. `prompts/discover.md`
11. `prompts/extract-selected.md`
12. Required templates under `templates/` for the selected output mode

## Phase Gates

| Phase | Gate | Exit evidence |
| --- | --- | --- |
| Safety boundary | Confirm read/write boundary and secret handling. | Source files are not modified; generated outputs avoid secret values. |
| Repo census | Inventory stack, modules, tests, data, integrations, and risk areas without final architecture claims. | Census facts are evidence-labeled. |
| System map | Convert census into architecture zones, flows, state, integrations, side effects, and unknowns. | Important claims are `OBSERVED`, `INFERRED`, or `QUESTION`. |
| Candidate discovery | Propose reusable Buildprint candidates with scope, included/excluded paths, risks, and validation depth. | 2-5 candidates or a justified single/system path. |
| Scope decision | Ask for the selected candidate or system path, production-grade scope, and fidelity/depth target. | Decision is recorded before final extraction. |
| Extraction | Produce the selected Buildprint package with execution artifacts and contracts. | Required files exist and agree on scope. |
| Reversal validation | Rebuild from the extracted package only. | Reversal report records pass, fail, blockers, commands, and gaps. |
| Product proof, when applicable | Run the generated app/feature locally and test user-facing behavior. | QA report records setup, URL, browser/runtime checks, persistence checks, and no-fake scan results. |

## Acceptance Gates

A generated Buildprint package is publishable only when:

- selected scope, included paths, excluded paths, and fidelity/depth target are explicit;
- every important claim is labeled and traceable to source evidence or a question;
- required package files exist for the selected mode;
- secrets checks are clean;
- edge cases, failure modes, state behavior, and lifecycle rules are inventoried where relevant;
- implementation-completeness status is recorded for product, app, feature, or system outputs;
- product/browser QA status is recorded when a runnable proof exists;
- safe and unsafe claims are listed;
- commands run and commands not run are both recorded;
- final validation status is honest.

## Purpose

Mapper OS exists to extract reusable architecture without flattening a project into vague prose. It gives coding agents a controlled process for discovering what is real, selecting a bounded scope, producing a Buildprint package, and proving that the package can guide an independent implementation.

## Architecture

Small project:

```txt
repo -> one scoped Buildprint -> reversal validation
```

Large project:

```txt
repo
-> safe census
-> evidence-backed system map
-> candidate Buildprints
-> human scope decision
-> one module Buildprint OR hierarchical System Buildprint
-> reversal validation
-> final gap report
```

Core outputs by mode:

- discovery: `SYSTEM_MAP.md`, `BUILDPRINT_CANDIDATES.md`, `questions.md`;
- single Buildprint extraction: `buildprint-submission/*` package files, execution artifacts, QA, traceability, and validation templates;
- full-system extraction: `project.buildprint/*` plus module-level Buildprints under `project.buildprint/modules/*`.

## Evidence Boundary

Every important claim must be one of:

- `OBSERVED` — directly grounded in repository files or commands;
- `INFERRED` — plausible synthesis from observed facts;
- `QUESTION` — requires human review;
- `OUT_OF_SCOPE` — intentionally excluded from the selected package.

If a claim cannot be grounded, it cannot be presented as fact. Optional prior inventories are hints only and never replace direct source evidence.

## Golden Eval Harness

This package includes `evals/` with fixture repositories and `evals/check-map.mjs`. The harness runs the real `agb map` command against golden projects and asserts that mapper output detects expected integrations, risks, env var names, API surfaces, and candidate types without leaking secrets or obeying malicious fixture instructions.

Required source checkout command:

```bash
node buildprints/buildprint-mapper-os/evals/check-map.mjs --agb ./bin/agb.js
```

Required bootstrapped snapshot command when validating a package:

```bash
AGB_CLI=/absolute/path/to/agent-buildprint/bin/agb.js node .buildprint/snapshots/evals/check-map.mjs
```

## Required Validation

Validation requires a clean-room reversal attempt:

1. hide or ignore the original repo;
2. give the implementing agent only the extracted Buildprint package;
3. implement the smallest production-grade selected scope;
4. set up the generated app or feature locally when applicable;
5. run tests, build, and static checks;
6. run persistence/restart checks when product state exists;
7. scan for placeholder, no-op, skeleton-adapter, route-shaped, temporary-store, and fixture-as-product paths;
8. run Playwright CLI QA when there is browser UI;
9. run the golden eval harness for mapper regression confidence when changing mapper behavior;
10. write `REVERSAL_REPORT.md` and `QA_REPORT.md` with pass/fail status, commands, evidence, and fidelity gaps.

Honest validation statuses:

- `architecture reversal passed`;
- `runnable product proof passed`;
- `browser QA passed`;
- `behavioral fidelity partial`;
- `behavioral equivalence not claimed`;
- `blocked`.

## Copyable Agent Prompt

```txt
Use Buildprint Mapper OS.

Read BUILDPRINT.md first, then follow the Required Read Order.

Map this repository without modifying source code. Start with discovery only:
1. create SYSTEM_MAP.md,
2. create BUILDPRINT_CANDIDATES.md,
3. create questions.md with at most 3-5 required decisions.

After I choose a candidate or system path, extract the selected Buildprint package with:
- explicit included and excluded scope,
- evidence labels for important claims,
- execution artifacts for coding agents,
- scope-derived QA and traceability,
- implementation-completeness gates where product behavior is included,
- clean-room reversal validation instructions.

Never copy secrets or .env values. Ask at most one blocking question at a time. Do not claim validation, runtime behavior, or behavioral equivalence without recorded evidence.
```
