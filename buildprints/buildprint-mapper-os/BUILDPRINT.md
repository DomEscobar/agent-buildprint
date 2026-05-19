# Buildprint Mapper OS

## LLM Attention Contract

- Discover first, ask later. Ask before discovery only when safety or read/export boundaries are unclear.
- Smaller complete scope beats broad fake scope.
- Every important claim needs an `OBSERVED`, `INFERRED`, `QUESTION`, or `OUT_OF_SCOPE` label.
- Generated mapper outputs must include agent execution rails: `AGENT_EXECUTION_BRIEF.md`, `agent-contract.xml`, `CURRENT_STATE.md`, `manifest.json`, QA/no-fake files, traceability, and submission checklist.
- Do not treat `agb map` discovery output as final selected extraction unless a candidate/scope is confirmed.
- Classify repo size/shape before choosing output mode; large repos require decomposition before implementation planning.
- For big projects, map feature slices first and synthesize full-system architecture only after slice-level evidence exists.
- Final response must include a chat handover: outcome, selected scope, evidence inspected, files generated, commands/evals run, known gaps, and recommended next direction.

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
- repo size classification and decomposition strategy;
- human scope and fidelity decision gate;
- single-module or hierarchical Buildprint extraction;
- execution artifacts for coding agents;
- scope-derived QA, traceability, and implementation-completeness checks;
- feature-slice proof strategy, staged validation, and later system synthesis;
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
- Do not turn a large repo or monorepo into one implementation Buildprint unless a bounded `--scope`, `--candidate`, or explicit full-system architecture mode was selected.
- Do not mark validation as passed unless the exact commands or checks ran.
- Do not require a CLI to use this Buildprint.
- Do not count test fixtures, skeleton adapters, route-shaped links, no-op controls, temporary product stores, or placeholder surfaces as implemented product behavior.

## Required Read Order

1. `BUILDPRINT.md`
2. `buildprint.json`, `phases.yaml`, `acceptance.yaml`, `claims.yaml` as machine-readable mirrors.
3. `README.md`
4. `PLAN.md`
5. `questions.md`, `policies/questions.md`
6. `policies/safety.md`, `policies/quality.md`
7. `plans/*.md` in numeric order for phase-local execution.
8. `SPEC.md`, `CONTRACTS.md`, `TEST_MATRIX.md`, `VALIDATION_TEMPLATE.md`
9. `prompts/discover.md`, `prompts/extract-selected.md`
10. Required templates under `templates/` for the selected output mode

## Phase Gates

| Phase | Gate | Exit evidence |
| --- | --- | --- |
| Safety boundary | Confirm read/write boundary and secret handling. | Source files are not modified; generated outputs avoid secret values. |
| Repo census | Inventory stack, modules, tests, data, integrations, and risk areas without final architecture claims. | Census facts are evidence-labeled. |
| Size classification | Classify repo as small, medium, large, or monorepo/system using evidence. | Output mode is justified before extraction. |
| System map | Convert census into architecture zones, flows, state, integrations, side effects, and unknowns. | Important claims are `OBSERVED`, `INFERRED`, or `QUESTION`. |
| Candidate discovery | Propose reusable Buildprint candidates with scope, included/excluded paths, risks, validation depth, implementation phases, and test strategy. | 2-5 candidates or a justified single/system path. |
| Scope decision | Ask for the selected candidate or system path, production-grade scope, and fidelity/depth target. | Decision is recorded before final extraction. |
| Extraction | Produce the selected Buildprint package with execution artifacts and contracts. | Required files exist and agree on scope. |
| Reversal validation | Rebuild from the extracted package only. | Reversal report records pass, fail, blockers, commands, and gaps. |
| Product proof, when applicable | Run the generated app/feature locally and test user-facing behavior. | QA report records setup, URL, browser/runtime checks, persistence checks, and no-fake scan results. |

## Acceptance Gates

A generated Buildprint package is publishable only when:

- repo size/shape classification and selected output mode are explicit;
- selected scope, included paths, excluded paths, and fidelity/depth target are explicit;
- every important claim is labeled and traceable to source evidence or a question;
- required package files exist for the selected mode;
- secrets checks are clean;
- decomposition strategy is explicit for medium/large/high-pressure repos;
- edge cases, failure modes, state behavior, and lifecycle rules are inventoried where relevant;
- implementation-completeness status is recorded for product, app, feature, or system outputs;
- product/browser QA status is recorded when a runnable proof exists;
- safe and unsafe claims are listed;
- commands run and commands not run are both recorded;
- final validation status is honest;
- final chat handover states outcome, selected scope, evidence, generated files, commands/evals, known gaps, and next direction.

## Purpose

Mapper OS exists to extract reusable architecture without flattening a project into vague prose. It gives coding agents a controlled process for discovering what is real, selecting a bounded scope, producing a Buildprint package, and proving that the package can guide an independent implementation.

## Architecture

Small project:

```txt
repo -> one scoped Buildprint -> reversal validation
```

Medium project:

```txt
repo
-> safe census
-> evidence-backed system map
-> 2-5 candidates
-> selected feature/module Buildprint
-> focused implementation/reversal proof
-> optional follow-up candidate extraction
```

Large project / monorepo:

```txt
repo
-> safe census
-> size + topology classification
-> evidence-backed system map
-> domain/feature decomposition
-> candidate Buildprints with implementation phase strategy
-> human scope decision
-> one feature-slice Buildprint first
-> slice-level tests, runtime proof, and no-fake QA
-> later hierarchical System Buildprint only when requested or after slices are validated
-> final gap report
```

Core outputs by mode:

- discovery: `SYSTEM_MAP.md`, `BUILDPRINT_CANDIDATES.md`, `questions.md`;
- decomposition: `DECOMPOSITION_STRATEGY.md` for medium/large/high-pressure repos, including size class, domains, dependency boundaries, candidate order, and validation plan;
- single Buildprint extraction: `buildprint-submission/*` package files, execution artifacts, QA, traceability, and validation templates;
- full-system extraction: `project.buildprint/*` plus module-level Buildprints under `project.buildprint/modules/*`; full-system mode is architecture/control-plane output, not a claim that every feature has implementation proof.

## Size Classification Contract

Classify before extraction:

- `small` — one app/service, one dominant workflow, limited routes/APIs, extraction can produce one complete Buildprint.
- `medium` — several workflows or integrations; produce candidates and allow one selected slice, but a single Buildprint may still be valid if scope is bounded.
- `large` — many routes/APIs/modules, multiple risk domains, or unclear product boundary; mandatory decomposition before implementation extraction.
- `monorepo/system` — multiple apps/packages/services/workers; mandatory module/domain map and candidate selection before implementation extraction.

For `large` and `monorepo/system`, the latest safe starting phase is candidate/scope selection unless the user supplied `--scope`, `--candidate`, or explicitly requested a system architecture package.

## Decomposition Strategy Contract

For medium/large/high-pressure repos, create or embed a decomposition strategy with:

- size class and evidence;
- domains/features/modules;
- dependency graph between slices;
- implementation order recommendation;
- candidate Buildprint boundaries;
- per-candidate phase count and validation depth;
- feature-slice test strategy;
- cross-slice risks and shared contracts;
- what should wait for later system synthesis;
- capabilities to exclude rather than fake.

A candidate is ready for extraction only when it has a testable feature slice, clear dependencies, included/excluded paths, and a concrete validation route.

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
3. create DECOMPOSITION_STRATEGY.md when the repo is medium/large,
4. create questions.md with at most 3-5 required decisions.

After I choose a candidate or system path, extract the selected Buildprint package with:
- explicit included and excluded scope,
- evidence labels for important claims,
- execution artifacts for coding agents,
- scope-derived QA and traceability,
- implementation-completeness gates where product behavior is included,
- clean-room reversal validation instructions.

Never copy secrets or .env values. Ask at most one blocking question at a time. Do not claim validation, runtime behavior, or behavioral equivalence without recorded evidence.
```
