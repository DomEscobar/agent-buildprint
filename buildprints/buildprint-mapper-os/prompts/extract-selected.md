# Extract Selected Prompt

Use Mapper OS to extract a selected candidate, explicit scope, or full-suite target into `selected-buildprint/`.

## Primary Output: Execution-Packet v3

For new selected outputs, emit an agent-executable packet whose implementation spine is **capability packets**, not fragmented capability packets. `START_HERE.md` is the execution start; `blueprint.yaml` is the machine-routable contract; `03-capabilities/` owns the active vertical work packets.

```text
selected-buildprint/
  BUILDPRINT.md
  START_HERE.md
  PRE_IMPLEMENTATION_QUESTIONS.md
  blueprint.yaml
  00-intent/
    mission.md
    product-obligations.md
    source-surface-map.md
  01-operating-model/
    workflow-vs-agentic.md
    autonomy-levels.yaml
    stop-rules.md
    human-approval-policy.md
  02-context/
    context-map.yaml
    read-order.yaml
    team-stack.yaml
    ux-contract.md
    design-quality-bar.md
    source-evidence-index.yaml
  03-capabilities/
    capability-index.yaml
    01-<capability-id>.md
    02-<capability-id>.md
  04-interfaces/
    api-contracts.yaml
    tool-contracts.yaml
    provider-contracts.yaml
    schemas/
  05-state-runtime/
    state-model.yaml
    persistence.md
    runtime-topology.md
  06-safety/
    threat-model.md
    secrets-policy.md
    destructive-actions.md
    security-test-fixtures.yaml
  07-execution/
    implementation-plan.yaml
  08-evaluation/
    acceptance.yaml
    claim-upgrade-rules.yaml
    test-matrix.yaml
    quality-rubric.yaml
  09-evidence/
    evidence-ledger.jsonl
    evidence-ledger.schema.json
    unresolved-blockers.md
  generated/
    agent-prompt.md
```

`generated/agent-prompt.md` must declare `Generated from: blueprint.yaml` and must state that it is not source of truth.

## Preconditions

- Discovery has run.
- Scope is selected or full-suite is explicitly requested.
- Source evidence exists for included behaviors or blockers are recorded.
- Sensitive surfaces have required hardening artifact requirements.

## Purged Legacy Cutoff

Do not emit legacy selected-output v1/v2 shapes. The following are forbidden in new Mapper OS selected outputs:

- root `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `SOURCE_SURFACE_COVERAGE.md`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `IMPLEMENTATION_PLAN.md`, `manifest.json`
- `02-context/active-slice.yaml`
- `03-capabilities/`
- `07-execution/phases/`
- `capabilities/`
- `generated/current-buildprint-compat/`
- per-capability mini-files: `capability.yaml`, `source-evidence.md`, `product-contract.md`, `implementation-workflow.md`, `proof-contract.yaml`

## Router-First Execution Rule

Medium, large, and full-suite outputs are invalid unless a fresh coding agent can start by reading only the router and active context:

1. `BUILDPRINT.md`
2. `START_HERE.md` and `blueprint.yaml`
3. `02-context/context-map.yaml`
4. `PRE_IMPLEMENTATION_QUESTIONS.md`
5. `02-context/team-stack.yaml`
6. the active capability file only

Do not require the implementing agent to read all Markdown files or all capabilities before it knows the next action. `02-context/context-map.yaml` names the active capability. `03-capabilities/capability-index.yaml` is consulted only after active proof to choose the next dependency-ready slice.

UI-bearing packets must include `02-context/ux-contract.md` and `02-context/design-quality-bar.md`; active UI slices load them before implementation. Provider, data, and security docs are loaded only when the active capability requires them.

Default full-suite selected outputs to `continuous-full-suite`: the implementation agent starts with the active capability, proves it, updates local `.buildprint/state.json` plus handoff files, then consults `03-capabilities/capability-index.yaml` to choose the next dependency-ready slice without reading unrelated capabilities upfront. Use `active-slice-handoff` only when the user explicitly requests a constrained validation or handoff run.

## Execution Slice Contract

Every included capability is one Markdown file. It must include these sections:

- `## Build target`
- `## Why this capability exists`
- `## Required global context`
- `## Required teams and gates`
- `## User-visible outcome`
- `## System and architecture obligations`
- `## UI obligations`
- `## Inputs`
- `## Outputs and downstream handoff`
- `## Implementation path`
- `## Stop rules`
- `## Proof gate`
- `## Unlocks`

Each capability must carry local truth for the active work unit: product obligation IDs, source surface IDs, source evidence refs, required teams, architecture seams, UI states, inputs/outputs, forbidden shortcuts, proof gate, runtime evidence path, immutable evidence seed, and unlock rule. Do not split this truth into multiple sibling mini-files.

## Extraction Rules

- Convert source facts into source-independent behavior obligations and capability packets.
- Convert every high-signal source surface into either a product obligation, an explicit merge, a blocker, or an explicit out-of-scope decision.
- `00-intent/source-surface-map.md` and `02-context/source-evidence-index.yaml` replace loose source-surface coverage prose.
- `03-capabilities/capability-index.yaml` replaces `03-capabilities/capability-index.yaml` as the machine-routable continuation index.
- Split proof policy from proof result: `08-evaluation/` defines what must be proven, packaged `09-evidence/evidence-ledger.jsonl` is the immutable seed, and runtime `.buildprint/evidence/evidence-ledger.jsonl` records what was actually proven or blocked after bootstrap.
- Emit `08-evaluation/claim-upgrade-rules.yaml` and `09-evidence/evidence-ledger.schema.json`; claim upgrades are invalid unless ledger rows use `capability_id`, match the schema, and satisfy the claim-specific proof types.
- Derive qualification from evidence ledger rows. Do not promote `claim_status` unless every required promotion proof has passing evidence.
- Do not preserve source internals unless externally observable or qualification-relevant.
- `00-intent/source-surface-map.md` must list every high-signal census surface and its disposition: `OWNED_BY_SLICE`, `MERGED_INTO_SLICE`, `OUT_OF_SCOPE_BY_USER_ONLY`, `BLOCKED_NEEDS_REVIEW`, or `LOW_SIGNAL_IGNORED_WITH_REASON` only when a previously high-signal surface is downgraded with evidence.
- Do not map routes/functions 1:1 unless that is the real product boundary.
- Preserve the selected/requested behavior surface. Do not convert “hard to prove,” “risky,” “external,” “destructive,” “provider-backed,” or “not first slice” into omission.
- Classify every selected behavior/slice as `INCLUDED_READY`, `INCLUDED_NEEDS_PROOF`, `INCLUDED_BLOCKED`, `INCLUDED_RISKY_REQUIRES_HARDENING`, `OUT_OF_SCOPE_BY_USER_ONLY`, or `TEST_ONLY_MOCK`.
- Use `OUT_OF_SCOPE_BY_USER_ONLY` only for explicit user exclusions or explicit selected-target boundaries; lack of proof is not enough.
- Include stable-vs-free boundaries inside the relevant capability packet.
- Implementation slicing is not scope shrinking.
- Include an evidence/depth matrix for every medium, large, or full-suite output with columns for required teams, source evidence, product obligation, required topology, topology status, UI/UX status, API, domain logic, persistence/state, provider/runtime, failure states, proof command, proof artifact, negative test, runtime/browser evidence, depth status, and promotion blocker.
- Copy/emit `02-context/team-stack.yaml`; do not use old generic pass names. It must list selected team packs, trigger signals, blocking gates, required evidence, and review order. Team packs are markdown quality lenses, not autonomous agents and not user-selectable quality tiers.
- Team routing: UI-bearing output selects `ux-ui-craft`, `product-architect`, and `test-and-verification`; medium/large/full-suite output selects `product-architect` and `test-and-verification`; provider/API/upload/job/runtime/webhook/external-side-effect output selects `integration-runtime`; auth/admin/user-data/payment/destructive/secrets/public-deployment output selects `security-boundary`; persistence/import/export/reporting/project-data/graph/model output selects `data-persistence`.
- UI-bearing output must generate `02-context/ux-contract.md` with screens, workflows, empty/loading/error/blocked/success states, component inventory, responsive behavior, visual quality bar, accessibility proof, interaction polish, and screenshot/browser proof plan.
- UI-bearing output must generate `02-context/design-quality-bar.md` with taste variables, product category, density/motion/layout targets, visual hierarchy, forbidden generic patterns, interaction polish, accessibility gates, responsive gates, and required screenshot set.
- Every capability packet proof gate must include required proof types, command/API/browser path, artifact expectation, negative tests, runtime/browser evidence needs, status blockers, claim-upgrade-rule pointer, evidence-schema pointer, runtime evidence ledger path, and immutable evidence seed path.
- Use role-chained artifacts, not free-form roleplay: source mapper output feeds product obligations; product obligations feed capability packets; capability packets feed topology and implementation planning; QA feeds proof ledger rows; skeptical reviewer feeds depth status and promotion blockers.
- Include an architecture topology gate for medium, large, full-suite, UI-bearing, provider-backed, stateful, or runtime-heavy outputs. The gate must reject mostly single-file backends, one-file static UI shells, route-shaped endpoints, and seam-only adapters as product-quality implementation unless explicitly justified as tiny scope.
- Browser/UI products require UX contract, design quality bar, browser proof, or an explicit blocker. Static text/label presence is not enough.
- Provider-backed or runtime-heavy products require live/sandbox proof or explicit blocker. Deterministic adapters preserve contract shape only and must be marked `CONTRACT_SEAM_ONLY` until provider/runtime proof exists.
- Persistence claims require restart/readback/delete/export proof where applicable or must remain `CONTRACT_SEAM_ONLY`.
- Upload, auth/admin, destructive, provider, runtime/job, persistence mutation, export, and security-sensitive slices require negative/failure-state tests or explicit blockers. Emit `06-safety/security-test-fixtures.yaml` with concrete fixtures for upload rejection, path traversal, secret redaction, destructive confirmation, subprocess allowlist, and proof-artifact secret scan.
- Use depth statuses: `REAL_IMPLEMENTED`, `CONTRACT_SEAM_ONLY`, `BLOCKED_WITH_REASON`, `OUT_OF_SCOPE_BY_USER_ONLY`, `FAKE_OR_PLACEHOLDER_FAIL`.
- Emit implementation signals for the downstream harness: user-facing UI, uploads, external providers, long-running jobs, graph persistence, simulation/runtime execution, reports, auth/admin, destructive controls, deployment surface, and recommended review specialties.
- Generate `PRE_IMPLEMENTATION_QUESTIONS.md` with at most five blocking questions that materially affect execution mode, security, scope, provider behavior, persistence, deployment, or qualification status. Do not ask how good the implementation should be and do not ask the user to choose a team; max-quality is mandatory and teams are inferred from Buildprint signals.
- `START_HERE.md`, `02-context/context-map.yaml`, and `generated/agent-prompt.md` must require the implementation agent to read `PRE_IMPLEMENTATION_QUESTIONS.md` before coding, ask unresolved blockers, use concrete safe defaults, and execute team-pack gates from `02-context/team-stack.yaml`.
- Keep unresolved questions out of files that claim implementation readiness.
- Mark selected output `SELECTED_UNQUALIFIED` until proof exists.
- Validate selected output shape before handoff. Fail execution packets if `blueprint.yaml`, `START_HERE.md`, `02-context/context-map.yaml`, `02-context/team-stack.yaml`, UI `02-context/ux-contract.md`, UI `02-context/design-quality-bar.md`, `03-capabilities/capability-index.yaml`, at least one capability packet file, `08-evaluation/claim-upgrade-rules.yaml`, `09-evidence/evidence-ledger.schema.json`, or `09-evidence/evidence-ledger.jsonl` is missing.

## Behavior Loss Review

Before handoff, ask:

> What source-backed product behavior, workflow, integration boundary, persistence behavior, auth/security rule, job/runtime behavior, import/export, or operational requirement would be impossible to rebuild from this Buildprint?

Any identified loss must become one of:

- an capability packet;
- a blocker;
- an explicit user-approved exclusion;
- or a documented merge into another slice.

This review is adversarial: the goal is not source-shape parity, but preventing silent loss of product behavior.

## Forbidden Defaults

Do not create default `AGENT_EXECUTION_BRIEF.md`, `agent-contract.xml`, `TEST_MATRIX.md`, `TRACEABILITY_MATRIX.md`, `IMPLEMENTATION_COMPLETENESS.md`, `PHASE_PLAN.md`, `LOOP_GATES.md`, legacy capability folders, or fragmented per-capability mini-files.
