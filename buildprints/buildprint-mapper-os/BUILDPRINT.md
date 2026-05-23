# Buildprint Mapper OS

Mapper OS is an agent-run workflow for turning an existing source project into a source-independent Buildprint. It is not a scanner command and not a source-code clone plan.

The mapper agent reads source, promotes only evidence-backed claims, preserves the requested product scope, maps the full relevant behavior surface, classifies readiness honestly, distills source behavior into capability packets, emits a team-pack quality router for the downstream harness, and records qualification blockers honestly.

## Authority

- `mapper-os-requirement.md` is the root product requirement.
- This package is the operating Buildprint for agents performing mapping.
- Source files are evidence. Product obligations and capability packets are the rebuild contract.
- Static scanning may guide discovery but must never become product authority.
- A qualified Buildprint is an implementation input, not proof that a future implementation already works.

## Read Order

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `PLAN.md`
5. `EXECUTION_PROTOCOL.md`
6. `IMPLEMENTATION_PLAN.md`
7. `VERIFICATION.md`
8. `questions.md`
9. `policies/*.md`
10. `prompts/*.md` and `templates/`

For generated selected packages, do not make the implementing agent read all Markdown files or all capabilities before it knows the next action. `START_HERE.md` is the execution start, `blueprint.yaml` is the machine-readable contract, `02-context/context-map.yaml` is the active-context router, `02-context/team-stack.yaml` is the quality gate router, and `03-capabilities/capability-index.yaml` is consulted only after proof to choose the next dependency-ready slice.

## Required Flow

1. Source acquisition: use a local folder or clone/check out a Git URL into a temporary read-only source checkout.
2. Safe census: collect file tree, manifests, dependency hints, framework hints, env var names, scripts, deploy hints, and test hints as `CENSUS_HINT` only.
3. Behavior discovery: read source surfaces to discover product behavior and promote claims to `OBSERVED`, `INFERRED`, `QUESTION`, `BLOCKED`, or `OUT_OF_SCOPE`.
4. Scope selection: keep default output discovery-only; create `selected-buildprint/` only after candidate, scope, or full-suite selection; never shrink selected scope without explicit user decision.
5. Source distillation: convert source facts into source-independent obligations, capability packets, and verification oracles.
6. Execution planning: give the downstream coding agent slice readiness, verification gates, implementation-team signals, repair loops, review rules, and handoff requirements.
7. Qualification: keep output unqualified until required evidence, runtime/test proof, no-fake checks, hardening artifacts, and reversal evidence exist.

## Output Modes

### Lean Discovery

Default mode. It may produce discovery, evidence, and quality files only. It must not emit implementation scaffold or selected package files.

### Selected Extraction

Creates `selected-buildprint/` with a small or medium package for the chosen behavior set. It remains `SELECTED_UNQUALIFIED` until qualification proof exists.

### Full-Suite Extraction

Creates a hierarchical `selected-buildprint/` for the complete feature suite only when explicitly requested. Full-suite is user intent, not proof of completeness.

### Qualified Buildprint

Promoted only when the selected package is source-independent, behavior-complete for the selected scope, verified, free of critical no-fake findings, and safe to hand to another coding agent without source access.

## Selected Package Shape

Selected outputs must use capability-packet v4. `BUILDPRINT.md` is a package overview; `START_HERE.md`, `blueprint.yaml`, `02-context/`, `08-evaluation/`, and `09-evidence/` are the machine-routable execution contract.

```text
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
07-execution/
  implementation-plan.yaml
08-evaluation/
  acceptance.yaml
  test-matrix.yaml
  quality-rubric.yaml
  claim-upgrade-rules.yaml
09-evidence/
  evidence-ledger.jsonl
  evidence-ledger.schema.json
  unresolved-blockers.md
generated/
  agent-prompt.md
```

`generated/agent-prompt.md` is compiled output and must not be treated as source of truth.

Qualification is evidence-derived. `claim_status: SELECTED_UNQUALIFIED` can be promoted only when runtime `.buildprint/evidence/evidence-ledger.jsonl` contains passing rows for all required promotion proofs, including `browser_runtime_trace`, `provider_integration_proof`, `persistence_roundtrip`, `security_boundary_review`, and `clean_room_implementation_trace` when applicable. The packaged `09-evidence/evidence-ledger.jsonl` is an immutable seed/template, not the write target.

The packet shape above is mandatory. Output without `blueprint.yaml`, `START_HERE.md`, `02-context/context-map.yaml`, `02-context/team-stack.yaml`, UI `02-context/ux-contract.md`, UI `02-context/design-quality-bar.md`, `03-capabilities/capability-index.yaml`, at least one capability packet Markdown file, `08-evaluation/acceptance.yaml`, or `09-evidence/evidence-ledger.jsonl` is invalid.

Purged legacy files are forbidden: root `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `IMPLEMENTATION_PLAN.md`, `manifest.json`, `02-context/active-slice.yaml`, `07-execution/phases/`, `capabilities/`, and fragmented mini-files such as `capability.yaml`, `source-evidence.md`, `product-contract.md`, `implementation-workflow.md`, or `proof-contract.yaml`.

`02-context/team-stack.yaml` is mandatory for selected output. It infers internal team packs from product shape; it must not ask the user to choose lazy/simple/quick quality. UI-bearing output selects `ux-ui-craft`, broad output selects `product-architect`, and every selected output selects `test-and-verification`.

## Non-Negotiables

- Do not copy secrets, private keys, tokens, cookies, production data, or secret values.
- Do not mutate the source project during mapping.
- Do not infer absence from missing scanner hints.
- Do not include placeholders, mocks, no-op controls, skeleton adapters, or in-memory substitutes in claimed production scope.
- Do not preserve source internals unless they are externally observable or qualification-relevant.
- Do not use `validated`, `production-ready`, `complete`, or `end-to-end` unless label is `QUALIFIED_SOURCE_INDEPENDENT` and evidence is linked.

## Handoff Contract

Every selected package must tell the next coding agent:

- what capability packet to implement next;
- what behavior is stable;
- what implementation choices are free;
- which pre-implementation questions must be asked or safely defaulted before coding;
- which team-pack gates must run before and during coding;
- what verification gate to run immediately;
- what evidence is missing;
- when to stop, replan, or escalate.
