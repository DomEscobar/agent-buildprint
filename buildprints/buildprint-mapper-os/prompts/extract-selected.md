# Extract Selected Prompt

Use Mapper OS to extract a selected candidate, explicit scope, or full-suite target into `selected-buildprint/`.

## Primary Output: Executable Packet

For new selected outputs, emit an agent-executable packet. The root `BUILDPRINT.md` remains only a compatibility router; `START_HERE.md` is the execution start; `blueprint.yaml` and the capability/proof packets are the machine-routable contract. `blueprint.yaml` must split `compatibility_start`, `execution_start`, and `machine_contract` instead of creating a single ambiguous start authority.

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
    active-slice.yaml
    read-order.yaml
    team-stack.yaml
    ux-contract.md
    design-quality-bar.md
    source-evidence-index.yaml
  03-capabilities/
    capability-index.yaml
    <capability-id>/
      capability.yaml
      source-evidence.md
      product-contract.md
      implementation-workflow.md
      proof-contract.yaml
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
    phases/
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
- Source evidence exists for included capabilities or blockers are recorded.
- Sensitive surfaces have required hardening artifact requirements.

## Legacy Selected Output Cutoff

Do not emit the legacy doc-pack shape. Root `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `SOURCE_SURFACE_COVERAGE.md`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `IMPLEMENTATION_PLAN.md`, `manifest.json`, `capabilities/`, and `generated/current-buildprint-compat/` are forbidden in new Mapper OS selected outputs.

## Router-First Execution Packet Rule

Medium, large, and full-suite outputs are invalid unless a fresh coding agent can start by reading only the router and active context:

1. `BUILDPRINT.md`
2. `START_HERE.md` and `blueprint.yaml`
3. `02-context/context-map.yaml`
4. `PRE_IMPLEMENTATION_QUESTIONS.md`
5. `02-context/team-stack.yaml`
4. the active capability packet only

Do not require the implementing agent to read all Markdown files or all capability packs before it knows the next action. Emit `02-context/active-slice.yaml` as the consumption protocol: it must list the exact initial read-only files, writable runtime/evidence/artifact targets, deliverables, forbidden actions, and next-unlock rule for the active capability. `02-context/context-map.yaml` is the active-context router, `02-context/team-stack.yaml` is the quality-gate router, and `03-capabilities/capability-index.yaml` is consulted only after proof to choose the next dependency-ready pack. UI-bearing executable packets must include `02-context/ux-contract.md` and `02-context/design-quality-bar.md`; active UI capabilities load them before implementation. Provider, data, and security docs are loaded only when the active context requires them.

Set an explicit execution mode. Default full-suite selected outputs to `continuous-full-suite`: the implementation agent starts with the active pack, proves it, updates local `.buildprint/state.json` plus handoff files, then consults `03-capabilities/capability-index.yaml` to choose the next dependency-ready pack without reading unrelated packs upfront. Use `active-capability-handoff` only when the user explicitly requests a constrained validation or handoff run.

## Extraction Rules

- Convert source facts into source-independent behavior contracts.
- Convert every high-signal source surface into either a product obligation, an explicit merge, a blocker, or an explicit out-of-scope decision.
- For executable packets, `00-intent/source-surface-map.md` and `02-context/source-evidence-index.yaml` replace loose source-surface coverage prose.
- For executable packets, `03-capabilities/capability-index.yaml` replaces `CAPABILITY_INDEX.md` as the machine-routable capability index.
- For executable packets, each capability uses `capability.yaml`, `source-evidence.md`, `product-contract.md`, `implementation-workflow.md`, and `proof-contract.yaml`; compatibility Markdown is generated output only.
- For executable packets, split proof policy from proof result: `08-evaluation/` defines what must be proven, packaged `09-evidence/evidence-ledger.jsonl` is the immutable seed, and runtime `.buildprint/evidence/evidence-ledger.jsonl` records what was actually proven or blocked after bootstrap. Emit `08-evaluation/claim-upgrade-rules.yaml` and `09-evidence/evidence-ledger.schema.json`; claim upgrades are invalid unless ledger rows match the schema and satisfy the claim-specific proof types.
- Derive qualification from evidence ledger rows. Do not promote `claim_status` unless every required promotion proof has passing evidence.
- Do not preserve source internals unless externally observable or qualification-relevant.
- `00-intent/source-surface-map.md` must list every high-signal census surface and its disposition: `OWNED_BY_CAPABILITY`, `MERGED_INTO_CAPABILITY`, `OUT_OF_SCOPE_BY_USER_ONLY`, `BLOCKED_NEEDS_REVIEW`, or `LOW_SIGNAL_IGNORED_WITH_REASON` only when a previously high-signal surface is downgraded with evidence.
- Capabilities must reference owned source surface IDs in their `capability.yaml`; this is traceability, not route/function parity.
- Do not map routes/functions 1:1 unless that is the real product boundary.
- Do not satisfy source-surface coverage by dumping every route/function into a table. Each owned surface must connect to a named product obligation, contract, blocker, intentional merge, or explicit out-of-scope decision.
- If a high-signal surface is not owned by any capability, mark it as `BLOCKED_NEEDS_REVIEW`, `MERGED_INTO_CAPABILITY`, or `OUT_OF_SCOPE_BY_USER_ONLY`; do not omit it.
- Preserve the selected/requested capability surface. Do not convert “hard to prove,” “risky,” “external,” “destructive,” “provider-backed,” or “not first slice” into omission.
- Classify every capability as `INCLUDED_READY`, `INCLUDED_NEEDS_PROOF`, `INCLUDED_BLOCKED`, `INCLUDED_RISKY_REQUIRES_HARDENING`, `OUT_OF_SCOPE_BY_USER_ONLY`, or `TEST_ONLY_MOCK`.
- Use `OUT_OF_SCOPE_BY_USER_ONLY` only for explicit user exclusions or explicit selected-target boundaries; lack of proof is not enough.
- Include stable-vs-free boundaries for every capability.
- Include first implementation slice and first verification gate for every included capability. Implementation slicing is not scope shrinking.
- Include a per-capability evidence/depth matrix for every medium, large, or full-suite output with columns for required teams, source evidence, product obligation, required topology, topology status, UI/UX status, API, domain logic, persistence/state, provider/runtime, failure states, proof command, proof artifact, negative test, runtime/browser evidence, depth status, and promotion blocker.
- Copy/emit `02-context/team-stack.yaml`; do not use old generic pass names. It must list selected team packs, trigger signals, blocking gates, required evidence, and review order. Team packs are markdown quality lenses, not autonomous agents and not user-selectable quality tiers. Team packs are original Mapper OS rules; public skill pages may inspire them, but selected output must not vendor or require third-party skill installation.
- Team routing: UI-bearing output selects `ux-ui-craft`, `product-architect`, and `test-and-verification`; medium/large/full-suite output selects `product-architect` and `test-and-verification`; provider/API/upload/job/runtime/webhook/external-side-effect output selects `integration-runtime`; auth/admin/user-data/payment/destructive/secrets/public-deployment output selects `security-boundary`; persistence/import/export/reporting/project-data/graph/model output selects `data-persistence`.
- UI-bearing output must generate `02-context/ux-contract.md` with screens, workflows, empty/loading/error/blocked/success states, component inventory, responsive behavior, visual quality bar, accessibility proof, interaction polish, and screenshot/browser proof plan.
- UI-bearing output must generate `02-context/design-quality-bar.md` with taste variables, product category, density/motion/layout targets, visual hierarchy, forbidden generic patterns, interaction polish, accessibility gates, responsive gates, and required screenshot set.
- Emit proof requirements in each capability `proof-contract.yaml`; each proof contract must include required proof, proof types, command/API/browser path, artifact expectation, negative tests, runtime/browser evidence needs, status blockers, claim-upgrade-rule pointer, evidence-schema pointer, and the runtime evidence ledger path.
- Use role-chained artifacts, not free-form roleplay: source mapper output must feed product obligations; product obligations must feed required topology; topology must feed implementation planning; QA must feed proof ledger rows; skeptical reviewer must feed depth status and promotion blockers.
- For every included capability, emit source evidence, product obligation, required topology/layers, first implementation slice, required proof command, required proof artifact, negative test, promotion blocker, and depth status rule. If source proof is inferred or blocked, label it explicitly instead of omitting the field.
- Include an architecture topology gate for medium, large, full-suite, UI-bearing, provider-backed, stateful, or runtime-heavy outputs. The gate must reject mostly single-file backends, one-file static UI shells, route-shaped endpoints, and seam-only adapters as product-quality implementation unless explicitly justified as tiny scope.
- Browser/UI products require UX contract, design quality bar, browser proof, or an explicit blocker. Static text/label presence is not enough.
- Provider-backed or runtime-heavy products require live/sandbox proof or explicit blocker. Deterministic adapters preserve contract shape only and must be marked `CONTRACT_SEAM_ONLY` until provider/runtime proof exists.
- Persistence claims require restart/readback/delete/export proof where applicable or must remain `CONTRACT_SEAM_ONLY`.
- Upload, auth/admin, destructive, provider, runtime/job, persistence mutation, export, and security-sensitive capabilities require negative/failure-state tests or explicit blockers. Emit `06-safety/security-test-fixtures.yaml` with concrete fixtures for upload rejection, path traversal, secret redaction, destructive confirmation, subprocess allowlist, and proof-artifact secret scan.
- Use depth statuses: `REAL_IMPLEMENTED`, `CONTRACT_SEAM_ONLY`, `BLOCKED_WITH_REASON`, `OUT_OF_SCOPE_BY_USER_ONLY`, `FAKE_OR_PLACEHOLDER_FAIL`.
- Emit implementation signals for the downstream harness: user-facing UI, uploads, external providers, long-running jobs, graph persistence, simulation/runtime execution, reports, auth/admin, destructive controls, deployment surface, and recommended review specialties.
- Generate `PRE_IMPLEMENTATION_QUESTIONS.md` with at most five blocking questions that materially affect execution mode, security, scope, provider behavior, persistence, deployment, or qualification status. Do not ask how good the implementation should be and do not ask the user to choose a team; max-quality is mandatory and teams are inferred from Buildprint signals. Executable packets must route through this file before the active capability packet.
- `START_HERE.md`, `02-context/context-map.yaml`, and `generated/agent-prompt.md` must require the implementation agent to read `PRE_IMPLEMENTATION_QUESTIONS.md` before coding, ask unresolved blockers, use concrete safe defaults, and execute team-pack gates from `02-context/team-stack.yaml`.
- Keep unresolved questions out of files that claim implementation readiness.
- Mark selected output `SELECTED_UNQUALIFIED` until proof exists.
- Validate selected output shape before handoff. Fail executable packets if `blueprint.yaml`, `START_HERE.md`, `02-context/context-map.yaml`, `02-context/active-slice.yaml`, `02-context/team-stack.yaml`, UI `02-context/ux-contract.md`, UI `02-context/design-quality-bar.md`, `03-capabilities/capability-index.yaml`, a capability `proof-contract.yaml`, `08-evaluation/claim-upgrade-rules.yaml`, `09-evidence/evidence-ledger.schema.json`, or `09-evidence/evidence-ledger.jsonl` is missing. Fail any output that emits legacy selected-output v1 files such as root `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `IMPLEMENTATION_PLAN.md`, `manifest.json`, `capabilities/`, `generated/current-buildprint-compat/`, typo aliases such as `VERFICATION.md`, or duplicate canonical handoff files.

## Behavior Loss Review

Before handoff, ask:

> What source-backed product behavior, workflow, integration boundary, persistence behavior, auth/security rule, job/runtime behavior, import/export, or operational requirement would be impossible to rebuild from this Buildprint?

Any identified loss must become one of:

- a capability obligation;
- a capability blocker;
- an explicit user-approved exclusion;
- or a documented merge into another capability.

This review is adversarial: the goal is not source-shape parity, but preventing silent loss of product behavior.

## Forbidden Defaults

Do not create default `AGENT_EXECUTION_BRIEF.md`, `agent-contract.xml`, `TEST_MATRIX.md`, `TRACEABILITY_MATRIX.md`, `IMPLEMENTATION_COMPLETENESS.md`, `PHASE_PLAN.md`, or `LOOP_GATES.md`.
