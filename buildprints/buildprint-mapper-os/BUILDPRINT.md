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
6. Execution planning: give the downstream coding agent slice readiness, verification gates, implementation-team signals, repair loops, review rules, and handoff requirements. Multi-phase outputs must define an orchestrated execution model: the main coding session plans, writes bounded handoffs, delegates specialist work, integrates, verifies, and records evidence phase by phase.
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

Selected outputs must use executable-blueprint v5. `BUILDPRINT.md` is the only start point and read-order authority; `blueprint.yaml` is the machine contract; `01-questions.md` and `02-project-setup.md` gate alignment and setup; `03-phases/` owns proof-gated vertical implementation slices; `04-evaluation.md` defines promotion proofs; and `05-evidence/evidence-ledger.jsonl` seeds runtime evidence recording.

```text
BUILDPRINT.md
01-questions.md
02-project-setup.md
blueprint.yaml
03-phases/
  phase-index.yaml
  01-<phase-id>.md
04-evaluation.md
05-evidence/
  evidence-ledger.jsonl
  evidence-ledger.schema.json
generated/
  agent-prompt.md
```

`generated/agent-prompt.md` is compiled output and must not be treated as source of truth.

Qualification is evidence-derived. `claim_status: SELECTED_UNQUALIFIED` can be promoted only when runtime `.buildprint/evidence/evidence-ledger.jsonl` contains passing rows for all required promotion proofs, including `browser_runtime_trace`, `provider_integration_proof`, `persistence_roundtrip`, `security_boundary_review`, and `clean_room_implementation_trace` when applicable. The packaged `05-evidence/evidence-ledger.jsonl` is an immutable seed/template, not the write target.

The packet shape above is mandatory. Output without `blueprint.yaml`, `01-questions.md`, `02-project-setup.md`, `03-phases/phase-index.yaml`, at least one phase Markdown file, `04-evaluation.md`, or `05-evidence/evidence-ledger.jsonl` is invalid.

Legacy files are forbidden in selected output: `START_HERE.md`, `PRE_IMPLEMENTATION_QUESTIONS.md`, packet `AGENTS.md`, `03-capabilities/`, `04-interfaces/`, `05-state-runtime/`, `06-safety/`, `08-evaluation/`, `09-evidence/`, root `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `IMPLEMENTATION_PLAN.md`, `manifest.json`, `02-context/active-slice.yaml`, `07-execution/phases/`, `capabilities/`, and fragmented mini-files such as `capability.yaml`, `source-evidence.md`, `product-contract.md`, `implementation-workflow.md`, or `proof-contract.yaml`.

`02-project-setup.md` is mandatory for selected output. It defines architecture rules, team operating model, execution authority model, delegation/handoff protocol, root/local AGENTS.md plan, quality gates, safety/permissions, assumptions, and the phase start gate. UI-bearing output must include UX/UI requirements inside the relevant phase packets; provider-backed/stateful output must include interface and state/runtime sections inside the relevant phase packets.

## Non-Negotiables

- Do not copy secrets, private keys, tokens, cookies, production data, or secret values.
- Do not mutate the source project during mapping.
- Do not infer absence from missing scanner hints.
- Do not include placeholders, mocks, no-op controls, skeleton adapters, or in-memory substitutes in claimed production scope.
- Do not preserve source internals unless they are externally observable or qualification-relevant.
- Do not use `validated`, `production-ready`, `complete`, or `end-to-end` unless label is `QUALIFIED_SOURCE_INDEPENDENT` and evidence is linked.

## Handoff Contract

Every selected package must tell the next coding agent:

- that `AGENTS.md` in the downstream repo is a scope governor, not a product brain;
- that `.buildprint/next-agent.md` is continuity for fresh sessions;
- that bounded assignment/handoff text is the unit of delegated work;
- that orchestrator/integrator authority must be explicit in the task prompt, not inferred from the repo;
- what phase packet to implement next;
- what behavior is stable;
- what implementation choices are free;
- which pre-implementation questions must be asked or safely defaulted before coding;
- which team-pack gates must run before and during coding;
- what verification gate to run immediately;
- what evidence is missing;
- when to stop, replan, or escalate.
