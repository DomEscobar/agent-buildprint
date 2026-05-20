# Mapper OS Requirement

## Summary

Mapper OS must turn an existing source project into a source-independent Buildprint through staged discovery, evidence promotion, selected or full-suite extraction, source distillation, downstream-agent execution planning, and qualification.

The final qualified Buildprint must be implementable by another Codex session or coding agent without needing the original source repository. Source is required during mapping, source distillation, and qualification. Source must not be required for later implementation from a qualified Buildprint.

Qualification means the Buildprint is an evidence-backed, source-independent implementation input for the selected scope. It must not claim perfection. It must expose uncertainty, blockers, and unverified behavior instead of hiding them behind confidence language.

A Buildprint is a scope-complete behavioral contract for the selected scope, not a whole-repo completeness claim and not a source-code clone plan. It must preserve product behavior, user workflows, system workflows, and required integration boundaries while giving the implementing agent freedom to choose architecture, libraries, internal abstractions, and folder structure.

A Buildprint is also a coding-agent execution plan. It must make the next implementation action, verification gate, repair loop, and handoff evidence clear without requiring the original source repository.

For non-trivial scopes, the Buildprint is hierarchical: a small global spine plus focused capability packs. The default answer is not one giant Markdown file and not a broad scaffold tree.

## Primary Goal

- Mapper OS must be usable by a coding agent session against local source folders and Git URLs.
- Git URL inputs must be cloned or otherwise checked out into a temporary source checkout before discovery when the agent has access.
- Every mapped package must record source URL or local input, source checkout path, source commit SHA when available, generation timestamp, output mode, discovery status, qualification status, production posture, mock policy, no-fake scan status, completeness score, and included/excluded capability counts.
- Static scanning may guide discovery but must not become product authority.
- A qualified Buildprint must contain enough feature behavior, boundary contracts, acceptance gates, traceability, and proof instructions to rebuild the selected scope without reopening the original source.
- Mapper OS must optimize for reconstructable product behavior, not for preserving source internals.
- Mapper OS must scale package shape by selected scope size.
- Mapper OS must optimize generated Buildprints for how coding agents actually execute work: bounded context, concrete milestones, verification after each slice, repair loops, fresh-context review, and explicit handoff evidence.
- A qualified Buildprint must be usable as a living execution plan. It must tell the implementing agent what to build next, what can change, what must remain stable, how to verify each milestone, and when to stop or escalate.

## Required Flow

### Stage 1: Source Acquisition

- Accept a local folder path or Git URL.
- For Git URLs, perform a shallow temporary clone.
- Record source URL, local checkout path, commit SHA, and generation timestamp.
- Treat the source checkout as read-only during mapping.

### Stage 2: Safe Census

- Collect file tree, manifests, package names, config filenames, env variable names, dependency hints, framework hints, script hints, deployment hints, and test file hints.
- Never copy secret values, private keys, tokens, cookies, or production data.
- Census output may create only `CENSUS_HINT` or `PENDING_AGENT_DISCOVERY` claims.
- Census output must not assert product behavior, absence, parity, route completeness, provider completeness, persistence guarantees, or candidate readiness.

### Stage 3: Capability Discovery

- Discover product capabilities first. Files are evidence, not the product boundary.
- Read source entrypoints, manifests, route files, API handlers, models, workflow engines, state stores, provider adapters, tests, docs, deployment files, and security-relevant configs only to understand feature behavior and required boundaries.
- Promote claims only with source evidence.
- Use these claim states:
  - `CENSUS_HINT`
  - `PENDING_AGENT_DISCOVERY`
  - `OBSERVED`
  - `INFERRED`
  - `QUESTION`
  - `BLOCKED`
  - `OUT_OF_SCOPE`
- Every `OBSERVED` claim must cite source path and line or section evidence.
- Absence is a claim and requires evidence. Missing scanner hints are not evidence of absence.
- Internal classes, function names, folder layout, and source architecture are not preserved unless they are required for user-visible behavior, integration compatibility, operational compatibility, or qualification proof.

### Stage 4: Scope Selection

- The default Mapper OS agent run must stay lean discovery.
- Candidate, scope, and full-suite selection are agent workflow decisions, not a required CLI surface.
- Once extraction mode is selected, scope selection must prefer the smallest fully implementable production-complete capability set over broader partial scope.
- If a capability lacks a real production path, it must be marked `OUT_OF_SCOPE` or `BLOCKED`, not placeholder-included.
- Scope cuts remove capabilities and must not be replaced with mocks, placeholders, route-shaped links, no-op controls, skeleton adapters, or in-memory substitutes.
- Selected implementation output must stay under `selected-buildprint/`.
- No implementation scaffold may appear at the package root.
- `--full-suite` is valid when the user intentionally wants the complete feature suite. It still must preserve qualification blockers and must not claim source-independent completeness until source distillation and proof are complete.
- If selected scope contains auth, uploads, external providers/webhooks, billing, admin actions, or user-data operations, conditional hardening artifacts are mandatory: threat model, data lifecycle, observability, limits/abuse controls, and secret-handling contract.
- If any required hardening artifact is missing, affected capabilities must remain `BLOCKED` or `OUT_OF_SCOPE` and the package cannot be promoted to qualified.

### Stage 5: Source Distillation

- Convert source facts into source-independent Buildprint contracts.
- Distillation must describe what the selected product does, what behavior must be preserved, what can change, and how the rebuild will be accepted.
- Distillation happens capability by capability.
- Every included capability must have a focused behavior contract and verification oracle.
- Distill at minimum:
  - user-visible features and workflows;
  - system workflows required by those features;
  - accepted inputs and observable outputs;
  - important states, transitions, loading states, empty states, and failure behavior;
  - boundary contracts required to rebuild features without guessing, such as API behavior, artifact/data persistence expectations, provider expectations, runtime workflow lifecycle, and operational setup;
  - trust boundaries, actors/assets, abuse scenarios, and required mitigations for in-scope sensitive surfaces;
  - external-surface contracts for APIs/uploads/webhooks/provider/admin paths: authN/authZ, input constraints, rate limits, idempotency/retry behavior, and failure modes;
  - data lifecycle for persisted or sensitive data: collection, validation, storage, retention, deletion, backup/restore, and export semantics;
  - observability contract: required logs, metrics, traces/audit events, and alert conditions;
  - secret contract: required placeholders, source of truth, access scope, rotation expectation, and redaction rules;
  - allowed implementation freedom and forbidden behavior changes;
  - tests, acceptance criteria, no-fake checks, and reversal checks.
- Shared contracts stay in root `CONTRACTS.md`; capability-local contracts stay in that capability pack.
- Remove generic placeholders from qualified files.
- Remove `PENDING_AGENT_DISCOVERY` and unresolved `QUESTION` markers from files that claim implementation readiness.
- Known source defects must be recorded with a preserve-vs-fix decision only when they affect user-visible behavior, integration compatibility, data semantics, operational behavior, or acceptance checks.

### Stage 5.5: Capability Pack Completeness

- Every extraction output (`--candidate`, `--scope`, `--full-suite`) must classify each capability as `INCLUDED`, `OUT_OF_SCOPE`, `BLOCKED`, or `TEST_ONLY_MOCK`.
- Completeness is recorded in `CAPABILITY_INDEX.md`, each capability pack, and `VERIFICATION.md`.
- `IMPLEMENTATION_COMPLETENESS.md` is optional legacy or expanded reporting, not the default final package shape.
- Each included capability pack must include capability status, source evidence, required contracts, no-fake rules, verification gates, blockers, and qualification state.
- Any missing capability classification, missing gate applicability declaration, missing evidence link, or missing per-capability verification oracle is a qualification blocker.

### Stage 5.6: Downstream Agent Execution Planning

Source-independent Buildprints must include an execution protocol for the coding agent that will implement them.

Execution planning must be concrete, milestone-based, and verification-driven. It must not be generic architecture prose.

Distill at minimum:

- task intake summary: selected scope, in-scope capabilities, out-of-scope capabilities, assumptions, risks, and success criteria;
- implementation order by capability, including dependencies and blocked prerequisites;
- per-capability agent brief with goal, stable behavior, implementation freedom, first implementation step, first verification gate, no-fake checks, and stop conditions;
- milestone plan with small vertical slices, not broad layer-first architecture;
- baseline checks to run before implementation where applicable;
- verification ladder applicability for static, unit/contract, integration, runtime/API/browser, persistence/restart, security/privacy, no-fake, and clean-room/reversal checks;
- repair-loop instructions: failed checks must be converted into structured feedback and fed into the next focused implementation pass;
- fresh-context review instructions for security-sensitive, data-sensitive, persistence, auth, billing, admin, provider, upload, or large refactor surfaces;
- decision log requirements for implementation choices that affect behavior, data semantics, provider compatibility, or verification;
- risk register requirements for unresolved ambiguity, weak tests, unverified runtime behavior, missing provider access, or security concerns;
- handoff requirements for changed behavior, verification evidence, skipped checks, residual risks, and next capability.

The downstream-agent execution flow must follow this default loop unless a capability pack declares a narrower safe loop:

```text
1. Intake: confirm selected capability, scope, risks, and success criteria.
2. Context load: read only the Buildprint spine and relevant capability pack.
3. Baseline: run declared preflight checks or record why they cannot run.
4. Implement slice: build the smallest behaviorally complete vertical slice.
5. Verify slice: run the declared targeted checks and fix failures.
6. Expand checks: add applicable integration, runtime, browser, persistence, security, and no-fake gates.
7. Fresh review: use an independent review pass for high-risk or broad changes.
8. Repair loop: convert failures into focused next actions until gates pass or blockers are recorded.
9. Handoff: update current state, decisions, risks, commands, evidence, and next capability.
```

Implementation plans must stay source-independent. They may reference Buildprint files, contracts, fixtures, schemas, and acceptance gates, but must not require reopening the original source checkout.

### Stage 6: Qualification

- Keep mapped packages at `QUALIFICATION_REVIEW_REQUIRED` until evidence proves otherwise.
- Run static, build, unit/contract, runtime, browser/API, persistence/restart, no-fake, security/privacy, and clean-room reversal checks where applicable.
- Record commands run, commands not run, evidence produced, blockers, and remaining unsafe claims.
- Do not promote a Buildprint when runtime/test proof is missing for included behavior that requires runtime evidence.
- Do not count mocks, fixtures, placeholder controls, skeleton adapters, no-op paths, or in-memory stores as production behavior unless explicitly scoped as test/demo-only.
- Do not require source-internal parity. Qualification proves the Buildprint can recreate selected feature behavior and required boundaries, not that it reproduces source code structure.
- Qualification fails if any `INCLUDED` capability depends on mocked providers in production path, route-shaped links without working handlers/pages, no-op controls, fake success states without real side effects, skeleton adapters, or in-memory-only persistence where persistence is claimed.
- No-fake implementation scan must pass with zero critical findings before qualification.
- For capabilities that write product state, persistence/restart checks are mandatory: write/read across restart, migration behavior, and failure-path handling.
- For capabilities that claim async processing or queues, retry/cancel behavior and restart-survival checks are mandatory.
- For each `INCLUDED` capability, qualification must record required gates, pass/fail result, command/API entry, environment, timestamp, and evidence artifact links.
- Missing gate result or missing evidence for an `INCLUDED` capability is a qualification failure.
- For sensitive-surface capabilities, qualification requires mandatory hardening artifacts and runtime verification of their controls.
- Any unresolved high/critical security risk blocks qualification.
- Any secret value present in generated outputs, logs, screenshots, or evidence artifacts blocks qualification.
- Qualification fails if implementation execution planning is missing for an extraction output that claims source-independent readiness.
- Qualification fails if a capability has behavior contracts but no concrete first implementation step, no applicable verification gate, or no stop/escalation condition.
- Qualification fails if the Buildprint requires the downstream agent to infer critical order, risk, or acceptance behavior from broad prose.

### Stage 7: Handoff

- Another Codex session or coding agent must be able to implement from the Buildprint alone.
- The Buildprint must include a root spine, capability packs, and conditional shared files only when selected capability risk requires them.
- Another agent should start at `BUILDPRINT.md`, then `CAPABILITY_INDEX.md`, then `EXECUTION_PROTOCOL.md`, then the next capability pack named by `CURRENT_STATE.md`.
- `CURRENT_STATE.md` must record the active capability, completed capability packs, blocked capability packs, and next pack to implement.
- `IMPLEMENTATION_PLAN.md` must record milestones, current state, concrete next actions, verification gates, and decision log pointers.
- The handoff must clearly state whether the package is discovery-only, selected but unqualified, or qualified for source-independent implementation.
- The handoff must state the reimplementation freedom explicitly: what the agent may change internally and which external/product behaviors must remain stable.
- Qualification label must be exactly one of: `DISCOVERY_ONLY`, `SELECTED_UNQUALIFIED`, `QUALIFIED_SOURCE_INDEPENDENT`.
- Public copy must not use `validated`, `production-ready`, `complete`, or `end-to-end` unless label is `QUALIFIED_SOURCE_INDEPENDENT` and linked evidence is present.

## Required Acceptance Criteria

- A default Mapper OS agent run creates only discovery, evidence, and quality output.
- A full-suite Mapper OS agent run creates a full-suite selected target under `selected-buildprint/`.
- No implementation scaffold appears at the root.
- No scanner-authored product facts are treated as authoritative.
- Every `OBSERVED` claim has source path and line or section evidence.
- A qualified Buildprint does not require the original source repo for implementation.
- A non-qualified Buildprint clearly states what source, runtime, test, provider, persistence, security, or reversal evidence is still missing.
- Traceability is mandatory before qualification and lives per capability: capability requirement -> source evidence -> Buildprint contract -> implementation check -> QA or reversal check.
- The Buildprint must not require preservation of internal source structure unless the requirement explains why that structure is externally observable or qualification-relevant.
- Capability completeness status and production completeness score must be present for extraction outputs.
- Included and excluded capabilities must be listed separately; no included capability may be placeholder-backed.
- Every included capability must have a production contract and at least one runtime or QA gate proving real side effects.
- Qualification requires zero unresolved no-fake critical findings and a production completeness score that passes the declared threshold.
- Production completeness score must have a declared rubric, denominator, threshold, blocker overrides, and per-capability contribution. Scores must never override hard blockers such as missing evidence, unresolved critical no-fake findings, unresolved high/critical security risks, missing required hardening artifacts, or secret leakage.
- If selected scope includes auth, uploads, external providers, billing, admin actions, or user data, `THREAT_MODEL.md`, `DATA_LIFECYCLE.md`, `OBSERVABILITY.md`, limits/abuse controls, and secret-handling requirements are mandatory; absence blocks qualification.
- Misleading qualification language is a release blocker.

## Mapper Quality Requirements

- Optimize for correctness over impressive-looking output.
- Fail honest rather than generate generic architecture.
- Prefer explicit blockers over vague confidence.
- Detect, report, and block qualification on:
  - empty traceability;
  - generic module names;
  - pending API or UI contracts in selected output;
  - unresolved `QUESTION` markers in files that claim implementation readiness;
  - missing source citations for observed claims;
  - missing runtime or test proof;
  - copied secret values;
  - duplicate candidates;
  - root and selected scaffold crossover;
  - placeholder routes or controls in included scope;
  - fake success states with no durable side effects;
  - production-path mocks/skeleton adapters;
  - in-memory persistence claims where persistence is required;
  - missing per-capability gate evidence bundles.
- Fail selected output with one giant capability file for medium, large, or full-suite scopes.
- Fail selected output with generic architecture modules instead of capability packs.
- Fail capability packs without verification.
- Fail full-suite output without `CAPABILITY_INDEX.md`.
- Golden evals must test discovery quality, source-independent extraction readiness, and false-claim prevention.
- Golden evals must reject source-code-clone output that preserves internals without explaining product relevance.
- Golden evals must reject Buildprints that contain contracts but no concrete downstream-agent execution sequence.
- Golden evals must reject one-pass implementation plans that lack verification after each meaningful slice.
- Golden evals must reject over-broad context instructions that require the implementing agent to read every generated file before knowing the next action.

## Product Contract Model

Mapper OS must model the selected scope as capabilities and behavior, not as source files.

Each selected capability must answer:

- What can the user or system do?
- What inputs are accepted?
- What observable outputs are produced?
- What state matters to the user or later workflows?
- What failures, empty states, and blocked states matter?
- What provider, persistence, runtime, or operational boundary must be preserved?
- What can the implementing agent change freely?
- What acceptance check proves the behavior works?
- What is the first implementation slice?
- What verification gate must run immediately after that slice?
- What failure should cause the implementing agent to stop, replan, or escalate?

Boundary contracts are required at every behavior boundary where implementation could otherwise drift. They should capture externally meaningful behavior and operational guarantees, not internal source mechanics.

Each capability must include a stable-vs-free table:

- Stable: product behavior, public routes, API behavior, data semantics, auth and authorization rules, provider contracts, user-visible workflows, operational guarantees, and acceptance gates.
- Free: internal architecture, module names, component hierarchy, local helper abstractions, folder layout, and library choices unless constrained by a stable contract.

Each capability must include an agent brief:

```text
Goal:
Status:
Dependencies:
Stable behavior:
Implementation freedom:
Forbidden substitutions:
First implementation slice:
First verification gate:
Required evidence:
No-fake checks:
Stop or escalate when:
```

## Buildprint Package Shape

Mapper OS must choose package shape by selected scope size.

### Small Scope

Small scopes may use a flat package when all capabilities fit in one readable package without hiding complexity.

Required flat spine:

```text
BUILDPRINT.md
CAPABILITIES.md
CONTRACTS.md
VERIFICATION.md
EXECUTION_PROTOCOL.md
IMPLEMENTATION_PLAN.md
CURRENT_STATE.md
manifest.json
```

### Medium, Large, Or Full-Suite Scope

Medium, large, and full-suite scopes must use a hierarchical package.

Required global spine:

```text
BUILDPRINT.md
CAPABILITY_INDEX.md
CONTRACTS.md
VERIFICATION.md
EXECUTION_PROTOCOL.md
IMPLEMENTATION_PLAN.md
CURRENT_STATE.md
manifest.json
capabilities/
```

Required capability pack shape:

```text
capabilities/<capability-id>/
  CAPABILITY.md
  VERIFICATION.md
  IMPLEMENTATION.md
  CONTRACTS.md  # only when this capability has local boundary contracts
```

`CAPABILITY_INDEX.md` is the routing table. It must list every selected, excluded, blocked, and test-only capability with status, dependencies, pack path, verification status, and qualification blockers.

Each `capabilities/<id>/CAPABILITY.md` must define behavior, user or system workflow, inputs, outputs, important state, failures, implementation freedom, forbidden substitutions, and source evidence when mapped.

Each `capabilities/<id>/VERIFICATION.md` must define checks, expected results, no-fake gates, blockers, and runtime or QA proof requirements for that capability.

Each `capabilities/<id>/IMPLEMENTATION.md` must define the agent brief, dependency order, first implementation slice, milestone sequence, verification after each milestone, repair-loop rules, fresh-review requirement when applicable, and stop/escalation conditions.

Root `CONTRACTS.md` contains shared contracts only. Capability-local contracts belong in the capability pack.

Root `VERIFICATION.md` contains cross-capability checks, build/runtime setup, full journey checks, persistence/restart checks, no-fake scan requirements, and qualification status.

Root `EXECUTION_PROTOCOL.md` contains the global downstream-agent work loop, context-loading rules, verification ladder, repair-loop rules, fresh-review rules, and handoff requirements.

Root `IMPLEMENTATION_PLAN.md` contains the living milestone plan across capabilities, current implementation order, decision log, risk register, and evidence update rules.

Separate `TRACEABILITY_MATRIX.md`, `TEST_MATRIX.md`, `DECISION_LOG.md`, `RISK_REGISTER.md`, and acceptance files are not default package files. Their concepts remain required but are embedded in `CAPABILITY_INDEX.md`, capability packs, `IMPLEMENTATION_PLAN.md`, and `VERIFICATION.md` unless the selected scope is large enough that separate files improve agent navigation.

Conditional shared files are allowed only when they prevent ambiguity or prove qualification, for example:

```text
SECURITY.md
DATA_LIFECYCLE.md
OBSERVABILITY.md
PROVIDERS.md
MIGRATION_PLAN.md
REVERSAL_REPORT.md
QA_REPORT.md
```

Full-suite selected output must be hierarchical unless the project is genuinely small. A flat full-suite Buildprint for a medium or large project is invalid.

## Output Modes

### Lean Discovery

Default output for a Mapper OS agent run.

Required posture:

- Discovery package only.
- Source census and discovery queue are allowed.
- Implementation scaffold is not allowed.
- Qualification remains review-required.

### Selected Extraction

Output for `--candidate` or `--scope`.

Required posture:

- Root remains discovery/evidence/quality.
- `selected-buildprint/` contains the selected implementation package.
- Selected package must still state qualification blockers until source distillation and proof are complete.

### Full-Suite Extraction

Output for `--full-suite`.

Required posture:

- Root remains discovery/evidence/quality.
- `selected-buildprint/` contains the whole-repo implementation package.
- Full-suite mode is user intent, not proof of completeness.
- The package remains unqualified until exact contracts, traceability, and runtime/reversal proof exist.

### Qualified Buildprint

Required posture:

- Source-independent implementation is possible.
- Required behavior is represented in contracts and acceptance checks.
- Downstream-agent execution order, implementation slices, verification gates, repair loops, and handoff evidence are represented.
- Runtime/test/reversal proof exists for included behavior.
- Unsafe claims are explicitly prohibited.
- Internal implementation remains free unless a specific compatibility requirement constrains it.

## Non-Goals

- Mapper OS must not modify the source project during mapping.
- Mapper OS must not copy secrets or production data.
- Mapper OS must not claim parity from scanner output.
- Mapper OS must not treat generated scaffold as qualification.
- Mapper OS must not hide uncertainty behind generic architecture prose.
- Mapper OS must not translate source internals into Buildprint requirements unless those internals are externally observable or required for acceptance.
- Mapper OS must not claim the future implementation is verified merely because the Buildprint is qualified.
- Mapper OS must not generate implementation plans that depend on preserving proprietary source expression, comments, assets, or unique internal algorithms unless the user has rights and the element is explicitly required behavior.

## Test Plan

Run after changes to mapper behavior, mapper templates, or Mapper OS docs:

```bash
node --check bin/agb.js
npm run eval:analyze
git diff --check
```

Manual review must confirm:

- discovery, selected extraction, source distillation, and qualification are distinct;
- finished Buildprints are executable without source;
- static scanning cannot produce qualified behavior;
- root-level requirements remain suitable as the guiding product requirement for mapper rewrites.

## Assumptions

- Mapper OS is an agent-run Buildprint workflow, not an `agb map` CLI command.
- Existing Mapper OS docs remain in place and may be reconciled against this root requirement later.
- This requirement document defines intended product behavior, not the current implementation status.
