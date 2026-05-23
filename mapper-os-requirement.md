# Mapper OS Requirement

## Summary

Mapper OS must turn an existing source project into a source-independent Buildprint through staged discovery, evidence promotion, selected or full-suite extraction, source distillation, downstream-agent execution planning, and qualification.

The final qualified Buildprint must be implementable by another Codex session or coding agent without needing the original source repository. Source is required during mapping, source distillation, and qualification. Source must not be required for later implementation from a qualified Buildprint.

Qualification means the Buildprint is an evidence-backed, source-independent implementation input for the selected scope. It must not claim perfection. It must expose uncertainty, blockers, and unverified behavior instead of hiding them behind confidence language.

A Buildprint is a scope-complete behavioral contract for the selected scope, not a whole-repo completeness claim and not a source-code clone plan. It must preserve product behavior, user workflows, system workflows, and required integration boundaries while giving the implementing agent freedom to choose architecture, libraries, internal abstractions, and folder structure.

A Buildprint is also a coding-agent execution plan. It must make the next implementation action, verification gate, repair loop, and handoff evidence clear without requiring the original source repository.

For non-trivial scopes, the Buildprint is hierarchical: a small global spine plus focused capability packets. The default answer is not one giant Markdown file and not a broad scaffold tree.

## Primary Goal

- Mapper OS must be usable by a coding agent session against local source folders and Git URLs.
- Git URL inputs must be cloned or otherwise checked out into a temporary source checkout before discovery when the agent has access.
- Every mapped package must record source URL or local input, source checkout path, source commit SHA when available, generation timestamp, output mode, discovery status, qualification status, production posture, mock policy, no-fake scan status, team-pack routing, completeness score, and capability readiness counts.
- Static scanning may guide discovery but must not become product authority.
- A qualified Buildprint must contain enough feature behavior, boundary contracts, acceptance gates, traceability, and proof instructions to rebuild the selected scope without reopening the original source.
- Mapper OS must optimize for reconstructable product behavior, not for preserving source internals.
- Mapper OS must scale package shape by selected scope size.
- Mapper OS must optimize generated Buildprints for how coding agents actually execute work: bounded context, concrete milestones, verification after each capability, repair loops, fresh-context review, and explicit handoff evidence.
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

### Stage 2.5: Source Surface Census

- Mapper OS must create a mechanical source-surface census before semantic capability mapping.
- Source surfaces are evidence, not requirements. The Buildprint must not preserve source structure, route count, file layout, function names, or module boundaries unless they encode externally observable behavior or qualification-relevant boundaries.
- Assign stable source surface IDs for high-signal surfaces, using prefixes such as `routes.*`, `api.*`, `tables.*`, `models.*`, `jobs.*`, `queues.*`, `sockets.*`, `providerAdapters.*`, `auth.*`, `admin.*`, `uploads.*`, `exports.*`, `imports.*`, `fileStores.*`, `env.*`, `deployment.*`, and `docs.*`.
- Classify each surface signal level as `high`, `medium`, or `low`. High-signal surfaces include user-facing routes, API handlers, persistence models/tables, provider adapters, auth/admin paths, jobs, uploads, imports/exports, file stores, sockets, deployment/runtime config, and source docs that define product workflows.
- The census may not infer product behavior. It may only record that a surface exists, where it was found, and why it may be relevant.
- Every high-signal source surface must later receive exactly one disposition in selected output: `OWNED_BY_CAPABILITY`, `MERGED_INTO_CAPABILITY`, `OUT_OF_SCOPE_BY_USER_ONLY`, `BLOCKED_NEEDS_REVIEW`, or `LOW_SIGNAL_IGNORED_WITH_REASON` when the signal classification is downgraded with evidence.
- The source-surface invariant is: the Buildprint does not need to preserve source structure; it must preserve source-backed product obligations, and every high-signal source surface must either support an obligation, be intentionally merged, or be explicitly blocked/out-of-scope.

### Stage 3: Capability Discovery

- Discover product capabilities first. Files are evidence, not the product boundary.
- Routes, functions, files, tables, jobs, provider adapters, and configs are evidence for product obligations, not one-to-one Buildprint requirements.
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
- Capabilities must declare owned source surface IDs when they are mapped from source. Ownership is traceability from source evidence to product obligation, not route/function parity.
- A capability may own many routes, files, tables, jobs, or adapters when they belong to one product boundary.
- High-signal source surfaces discovered in census must not silently disappear. If they are not owned by a capability, they must be intentionally merged, explicitly user-excluded, or blocked for review.
- Absence is a claim and requires evidence. Missing scanner hints are not evidence of absence.
- Internal classes, function names, folder layout, and source architecture are not preserved unless they are required for user-visible behavior, integration compatibility, operational compatibility, or qualification proof.

### Stage 4: Scope Selection

- The default Mapper OS agent run must stay lean discovery.
- Candidate, scope, and full-suite selection are agent workflow decisions, not a required CLI surface.
- Mapper OS must preserve the user-requested product scope. It must not shrink scope to make a selected package look more complete, safer, or easier to implement.
- If no implementation target is selected, remain lean discovery. If a candidate, explicit scope, or full-suite target is selected, represent the full capability surface relevant to that target and classify every capability by readiness.
- Implementation order may be sliced into small vertical milestones, but slicing is not scope reduction. A first slice must never hide later capabilities, blockers, proof gaps, or risky surfaces.
- Scope reduction requires an explicit user decision. User-excluded capabilities must be recorded as `OUT_OF_SCOPE_BY_USER_ONLY`, not silently omitted.
- If a capability lacks a proven production path, it must remain represented as `INCLUDED_NEEDS_PROOF`, `INCLUDED_BLOCKED`, or `INCLUDED_RISKY_REQUIRES_HARDENING`, not placeholder-included and not erased.
- Scope cuts remove capabilities only when explicitly user-approved and must not be replaced with mocks, placeholders, route-shaped links, no-op controls, skeleton adapters, or in-memory substitutes.
- Selected implementation output must stay under `selected-buildprint/`.
- No implementation scaffold may appear at the package root.
- `--full-suite` is valid when the user intentionally wants the complete feature suite. It still must preserve qualification blockers and must not claim source-independent completeness until source distillation and proof are complete.
- If selected scope contains auth, uploads, external providers/webhooks, billing, admin actions, or user-data operations, conditional hardening artifacts are mandatory: threat model, data lifecycle, observability, limits/abuse controls, and secret-handling contract.
- If any required hardening artifact is missing, affected capabilities must remain `INCLUDED_BLOCKED` or `INCLUDED_RISKY_REQUIRES_HARDENING` unless the user explicitly excludes them; the package cannot be promoted to qualified.

### Stage 5: Source Distillation

- Convert source facts into source-independent Buildprint contracts.
- Distillation must describe what the selected product does, what behavior must be preserved, what can change, and how the rebuild will be accepted.
- Distillation happens capability by capability.
- Every included capability packet must have a focused behavior contract and verification oracle.
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
- Shared contracts stay in root `CONTRACTS.md`; slice-local contracts stay in that capability packet.
- Remove generic placeholders from qualified files.
- Remove `PENDING_AGENT_DISCOVERY` and unresolved `QUESTION` markers from files that claim implementation readiness.
- Known source defects must be recorded with a preserve-vs-fix decision only when they affect user-visible behavior, integration compatibility, data semantics, operational behavior, or acceptance checks.

### Stage 5.5: Capability Pack Completeness

- Every extraction output (`--candidate`, `--scope`, `--full-suite`) must classify each capability packet with one of these readiness states: `INCLUDED_READY`, `INCLUDED_NEEDS_PROOF`, `INCLUDED_BLOCKED`, `INCLUDED_RISKY_REQUIRES_HARDENING`, `TEST_ONLY_MOCK`, or `OUT_OF_SCOPE_BY_USER_ONLY`.
- `OUT_OF_SCOPE_BY_USER_ONLY` requires an explicit user decision or selected target boundary; lack of proof alone is not an out-of-scope reason.
- Completeness is recorded in `03-capabilities/capability-index.yaml`, each capability packet, and `VERIFICATION.md`.
- `IMPLEMENTATION_COMPLETENESS.md` is optional legacy or expanded reporting, not the default final package shape.
- Each included capability packet must include capability status, source evidence, required contracts, no-fake rules, verification gates, blockers, and qualification state.
- Any missing capability classification, missing gate applicability declaration, missing evidence link, or missing per-capability verification oracle is a qualification blocker.

### Stage 5.6: Downstream Agent Execution Planning

Source-independent Buildprints must include an execution protocol for the coding agent that will implement them.

Execution planning must be concrete, milestone-based, and verification-driven. It must not be generic architecture prose.

Distill at minimum:

- task intake summary: requested scope, selected target boundary, full capability surface, readiness states, user-excluded capabilities, assumptions, risks, and success criteria;
- implementation signals that help the downstream harness choose an implementation team, such as user-facing UI, uploads, external providers, long-running jobs, graph persistence, simulation/runtime execution, reporting, auth/admin paths, destructive controls, deployment surface, and required review specialties;
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

The downstream-agent execution flow must follow this default loop unless a capability packet declares a narrower safe loop:

```text
1. Intake: confirm requested scope, selected target boundary, capability readiness map, risks, and success criteria.
2. Team-pack routing: infer the builder quality lenses from Buildprint signals before coding. User-facing UI requires `ux-ui-craft`; broad or full-suite surfaces require `product-architect`; every selected output requires `test-and-verification`; provider/runtime surfaces require `integration-runtime`; sensitive surfaces require `security-boundary`; durable state requires `data-persistence`. Users choose scope/product intent, not quality tiers.
3. Context load: read only the Buildprint spine and relevant capability packet.
4. Baseline: run declared preflight checks or record why they cannot run.
5. Implement capability: build the next behaviorally complete vertical slice without erasing later capabilities from the plan.
6. Verify capability: run the declared targeted checks and fix failures.
7. Expand checks: add applicable integration, runtime, browser, persistence, security, and no-fake gates.
8. Fresh review: use an independent review pass for high-risk, UI/product, architecture, data, provider, or broad changes.
9. Repair loop: convert failures into focused next actions until gates pass or blockers are recorded.
10. Handoff: update current state, decisions, risks, commands, evidence, capability readiness, team-pack gate notes, and next capability.
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
- For capability packets that write product state, persistence/restart checks are mandatory: write/read across restart, migration behavior, and failure-path handling.
- For capability packets that claim async processing or queues, retry/cancel behavior and restart-survival checks are mandatory.
- For each `INCLUDED` capability packet, qualification must record required gates, pass/fail result, command/API entry, environment, timestamp, and evidence artifact links.
- Missing gate result or missing evidence for an `INCLUDED` capability is a qualification failure.
- For sensitive-surface capabilities, qualification requires mandatory hardening artifacts and runtime verification of their controls.
- Any unresolved high/critical security risk blocks qualification.
- Any secret value present in generated outputs, logs, screenshots, or evidence artifacts blocks qualification.
- Qualification fails if implementation execution planning is missing for an extraction output that claims source-independent readiness.
- Qualification fails if a capability has behavior contracts but no concrete first implementation step, no applicable verification gate, or no stop/escalation condition.
- Qualification fails if the Buildprint requires the downstream agent to infer critical order, risk, or acceptance behavior from broad prose.

### Stage 7: Handoff

- Another Codex session or coding agent must be able to implement from the Buildprint alone.
- The Buildprint must include a root spine, capability packets, and conditional shared files only when selected capability risk requires them.
- Another agent should start at `BUILDPRINT.md`, then `03-capabilities/capability-index.yaml`, then `02-context/context-map.yaml`, then `02-context/team-stack.yaml`, then `START_HERE.md`, then exactly one active capability named by `02-context/context-map.yaml`. If `02-context/team-stack.yaml` selects `ux-ui-craft`, it should also read `02-context/ux-contract.md` before implementing the active UI slice.
- The selected package must not require the implementation agent to read every Markdown file or every capability packet before knowing the next action.
- `02-context/context-map.yaml` must record the active capability, completed capability packets, blocked capability packets, and next pack to implement.
- `07-execution/implementation-plan.yaml` must record milestones, current state, concrete next actions, team-pack gates, verification gates, and decision log pointers.
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
- Capability readiness states must be listed separately; no included capability may be placeholder-backed, and no capability may be excluded merely because it is hard to prove or implement.
- Every included capability packet must have a production contract and at least one runtime or QA gate proving real side effects.
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
- Fail selected output with generic architecture modules instead of capability packets.
- Fail capability packets without proof gates.
- Fail full-suite output without `03-capabilities/capability-index.yaml` and `02-context/team-stack.yaml`.
- Fail UI-bearing selected output without `02-context/ux-contract.md` and `ux-ui-craft` routing.
- Golden evals must test discovery quality, source-independent extraction readiness, and false-claim prevention.
- Golden evals must reject source-code-clone output that preserves internals without explaining product relevance.
- Golden evals must reject Buildprints that contain contracts but no concrete downstream-agent execution sequence.
- Golden evals must reject one-pass implementation plans that lack verification after each meaningful slice.
- Golden evals must reject over-broad context instructions that require the implementing agent to read every generated file before knowing the next action.
- Golden evals must reject selected/full-suite package shape failures: missing `03-capabilities/capability-index.yaml`, missing `02-context/team-stack.yaml`, missing UI `02-context/ux-contract.md`, incomplete capability packets, blueprint drift, typo alias files, missing required team routing, and duplicate canonical handoff files.

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
- What verification gate must run immediately after that capability?
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
First implementation capability:
First verification gate:
Required evidence:
No-fake checks:
Stop or escalate when:
```

## Buildprint Package Shape

Mapper OS selected output uses one capability-packet v4 shape for small, medium, large, and full-suite scopes. Scope size changes the number and depth of capability packets; it does not switch back to legacy routing.

Required selected package spine:

```text
BUILDPRINT.md
START_HERE.md
blueprint.yaml
PRE_IMPLEMENTATION_QUESTIONS.md
00-intent/mission.md
00-intent/product-obligations.md
00-intent/source-surface-map.md
01-operating-model/workflow-vs-agentic.md
01-operating-model/autonomy-levels.yaml
01-operating-model/stop-rules.md
01-operating-model/human-approval-policy.md
02-context/context-map.yaml
02-context/read-order.yaml
02-context/team-stack.yaml
02-context/source-evidence-index.yaml
02-context/ux-contract.md  # required for UI-bearing scopes
02-context/design-quality-bar.md  # required for UI-bearing scopes
03-capabilities/capability-index.yaml
03-capabilities/<capability>.md
04-interfaces/api-contracts.yaml
04-interfaces/tool-contracts.yaml
04-interfaces/provider-contracts.yaml
04-interfaces/schemas/
05-state-runtime/state-model.yaml
05-state-runtime/persistence.md
05-state-runtime/runtime-topology.md
06-safety/threat-model.md
06-safety/secrets-policy.md
06-safety/destructive-actions.md
06-safety/security-test-fixtures.yaml
07-execution/implementation-plan.yaml
08-evaluation/acceptance.yaml
08-evaluation/claim-upgrade-rules.yaml
08-evaluation/test-matrix.yaml
08-evaluation/quality-rubric.yaml
09-evidence/evidence-ledger.jsonl
09-evidence/evidence-ledger.schema.json
09-evidence/unresolved-blockers.md
generated/agent-prompt.md
```

`START_HERE.md` and `blueprint.yaml` are the execution authority. `02-context/context-map.yaml` names the active capability. `03-capabilities/capability-index.yaml` is the post-proof continuation index. Runtime proof is appended to `.buildprint/evidence/evidence-ledger.jsonl`; packaged `09-evidence/evidence-ledger.jsonl` is only the immutable seed.

Each capability packet file must define build target, source evidence refs, required teams and gates, user-visible outcome, architecture obligations, UI obligations where applicable, inputs, outputs, implementation path, stop rules, proof gate, and unlocks.

`02-context/team-stack.yaml` is mandatory for selected output. It records internal team packs selected from product signals, trigger reasons, owned gates, evidence paths, and review order. It must not ask the user to choose lazy/simple/quick quality. It must select `test-and-verification` for every selected output and route `product-architect`, `ux-ui-craft`, `integration-runtime`, `security-boundary`, and `data-persistence` whenever product signals require them.

Purged legacy selected-output files are invalid: root `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `SOURCE_SURFACE_COVERAGE.md`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `IMPLEMENTATION_PLAN.md`, `manifest.json`, `02-context/active-slice.yaml`, `07-execution/phases/`, `capabilities/`, `generated/current-buildprint-compat/`, and fragmented per-capability mini-files.

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
