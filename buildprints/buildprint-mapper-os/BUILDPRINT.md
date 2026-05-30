# BUILDPRINT: Buildprint Mapper OS

Mapper OS is an agent-run workflow for turning an existing source project into a source-independent Buildprint. It is not a scanner command and not a source-code clone plan.

The mapper agent reads source, promotes only evidence-backed claims, preserves the requested scope, maps the full relevant behavior surface, classifies the selected blueprint mode honestly, distills source behavior into mode-aware product-led phase packets, and records qualification blockers honestly.

## Authority

- `mapper-os-requirement.md` is the root product requirement.
- This package is the operating Buildprint for agents performing mapping.
- `vision.md` is the maintained product-quality generator guide. It shapes selected packet `BUILDPRINT.md`, `02-project-setup.md`, and UI-bearing phase language, but it is not emitted into selected packets.
- Source files are evidence. Product obligations and phase packets are the rebuild contract.
- Static scanning may guide discovery but must never become product authority.
- A qualified Buildprint is an implementation input, not proof that a future implementation already works.
- The downstream executor role is **Product Engineering Lead**: not a persona or title, but an accountability contract to preserve product intent, coordinate phase work, require evidence, challenge shallow implementation, and escalate blockers before claims are upgraded.

## Read Order

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `PLAN.md`
5. `questions.md`
6. `policies/*.md`
7. `prompts/*.md` and `templates/`

For generated selected packages, do not make the implementing agent read all Markdown files or all phases before it knows the next action. `BUILDPRINT.md` is the only execution start, `blueprint.yaml` is the machine-readable contract, `01-questions.md` and `02-project-setup.md` gate alignment/setup, `03-phases/phase-index.yaml` names the active phase, and `03-phases/phase-flow.md` owns phase-run orchestration before runtime evidence.

## Required Flow

1. Source acquisition: use a local folder or clone/check out a Git URL into a temporary read-only source checkout.
2. Safe census: collect file tree, manifests, dependency hints, framework hints, env var names, scripts, deploy hints, and test hints as `CENSUS_HINT` only.
3. Behavior discovery: read source surfaces to discover product behavior and promote claims to `OBSERVED`, `INFERRED`, `QUESTION`, `BLOCKED`, or `OUT_OF_SCOPE`.
4. Scope selection: keep default output discovery-only; create `selected-buildprint/` only after candidate, scope, or full-suite selection; never shrink selected scope without explicit user decision.
5. Source distillation: convert source facts into source-independent obligations, phase packets, and verification oracles.
6. Execution planning: give the downstream coding agent product vision, slice readiness, verification gates, repair loops, and proof/evidence rules. Multi-phase outputs must define a lean execution model: the main coding session plans, implements the phase path, verifies, writes proof, and records evidence phase by phase.
   Before coding each phase, the lead must create `.buildprint/phase-runs/<phase-id>/phase-preflight.yaml` containing user-visible outcomes, affected boundaries, surface ids, criterion ids, proof ids, fake-done risks, verifier commands, claim ceilings, and explicit accept/revise/split/merge phase handling.
7. Qualification: keep output unqualified until required evidence, runtime proof, no-fake review, hardening artifacts, and reversal evidence exist.

## Output Modes

### Lean Discovery

Default mode. It may produce discovery, evidence, and quality files only. It must not emit implementation scaffold or selected package files.

### Selected Extraction

Creates `selected-buildprint/` with a small or medium package for the chosen behavior set. It requires proof until qualification proof exists.

### Full-Suite Extraction

Creates a hierarchical `selected-buildprint/` for the complete feature suite only when explicitly requested. Full-suite is user intent, not proof of completeness.

### Qualified Buildprint

Promoted only when the selected package is source-independent, behavior-complete for the selected scope, verified, free of critical no-fake findings, and safe to hand to another coding agent without source access.

## Selected Package Shape

Selected outputs must use executable Buildprint. `BUILDPRINT.md` is the only start point and read-order authority; `blueprint.yaml` is the machine contract; `01-questions.md` and `02-project-setup.md` gate alignment and setup; `03-phases/` owns proof-gated vertical implementation slices; `04-evaluation.md` defines promotion proofs; and `05-evidence/evidence-ledger.jsonl` seeds runtime evidence recording.

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

Selected packets must expose `qualification_label` in `blueprint.yaml` (`DISCOVERY_ONLY`, `PROOF_REQUIRED`, or `QUALIFIED_SOURCE_INDEPENDENT`). Public completion wording must derive from that label. A `PROOF_REQUIRED` packet may describe target outcomes but must not claim validated, production-ready, complete, fully working, or end-to-end status except in explicit negative rules.

Qualification is evidence-derived. `claim_status: PROOF_REQUIRED` can be promoted only when runtime `.buildprint/evidence/evidence-ledger.jsonl` contains passing rows for all required promotion proofs, including `browser_runtime_trace`, `provider_integration_proof`, `persistence_roundtrip`, `security_boundary_review`, and `clean_room_implementation_trace` when applicable. The packaged `05-evidence/evidence-ledger.jsonl` is an immutable seed/template, not the write target.

The packet shape above is mandatory. Output without `blueprint.yaml`, `01-questions.md`, `02-project-setup.md`, `03-phases/phase-index.yaml`, at least one phase Markdown file, `04-evaluation.md`, or `05-evidence/evidence-ledger.jsonl` is invalid.

Obsolete packet files are forbidden in selected output: `START_HERE.md`, `PRE_IMPLEMENTATION_QUESTIONS.md`, packet `AGENTS.md`, `03-capabilities/`, `04-interfaces/`, `05-state-runtime/`, `06-safety/`, `08-evaluation/`, `09-evidence/`, root `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `IMPLEMENTATION_PLAN.md`, `manifest.json`, `02-context/active-slice.yaml`, `07-execution/phases/`, `capabilities/`, and fragmented mini-files such as `capability.yaml`, `source-evidence.md`, `product-contract.md`, `implementation-workflow.md`, or `proof-contract.yaml`.

`02-project-setup.md` is mandatory for selected output. It defines blueprint mode/phase style, product/framework/integration/automation/data/infra shape, architecture decisions, production readiness, mapped contract anchors, implementation setup, assumptions, and the phase start gate. UI-bearing output must include UX/UI requirements inside the relevant phase packets; framework/library output must include primitive/composition maps; integration output must include boundary transaction contracts; automation output must include task-loop/evidence/exit contracts; data-pipeline output must include dataflow contracts; infrastructure output must include operations/health/rollback contracts; provider-backed/stateful output must include interface and state/runtime sections inside the relevant phase packets.


## Blueprint Mode Discipline

Selected outputs must classify the dominant blueprint mode before writing `02-project-setup.md`, `blueprint.yaml`, or any phase. This is a generation invariant. Use one of eight `blueprint_mode.primary` values and the matching `phase_style`:

| Mode | `blueprint_mode.primary` | `phase_style` |
|---|---|---|
| Product | `product` | `outcome_flow` |
| Framework | `framework` | `primitive_composition_map` or `callable_contract` |
| Library | `library` | `callable_contract` or `primitive_composition_map` |
| Integration | `integration` | `boundary_transaction_contract` |
| Automation | `automation` | `task_loop_contract` |
| Data-pipeline | `data-pipeline` | `dataflow_contract` |
| Infrastructure | `infrastructure` | `operations_contract` |
| Mixed | `mixed` | `mixed_contract` |

Each mode requires phase-specific vocabulary (`blueprint_mode` token and `phase_style` token are required in every `## Phase mode contract`):

- `product`: outcome flows; shared proof spine.
- `framework` / `library`: primitive, composition, extension point, misuse; callable surface, semver, compat.
- `integration`: webhook/callback, idempotency, sandbox/live split, retry/error mapping, fake-provider proof.
- `automation`: task loop / plan-execute-observe, stop condition, approval point, trace.
- `data-pipeline`: schema, transform, lineage, backfill/idempotency, data quality.
- `infrastructure`: deploy/apply, rollback, health/readiness, drift, observability.

For `mixed` packets: every phase must declare a specific non-mixed `blueprint_mode` and matching `phase_style`. At least two distinct per-phase modes must appear. Do not use `mixed` to avoid classifying.

The shared proof spine is mandatory for every mode: preconditions/inputs, entrypoint or use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals. The mode decides the language and emphasis.

## Non-Negotiables

- Do not copy secrets, private keys, tokens, cookies, production data, or secret values.
- Do not mutate the source project during mapping.
- Do not infer absence from missing scanner hints.
- Do not include placeholders, mocks, no-op controls, skeleton adapters, or in-memory substitutes in claimed production scope.
- Do not preserve source internals unless they are externally observable or qualification-relevant.
- Do not use `validated`, `production-ready`, `complete`, or `end-to-end` unless label is `QUALIFIED_SOURCE_INDEPENDENT` and evidence is linked.

## Downstream Contract

Every selected package must tell the next coding agent:

- that `AGENTS.md` in the downstream repo is a scope governor, not a product brain;
- that `.buildprint/next-agent.md` is continuity for fresh sessions;
- that `BUILDPRINT.md` embeds the product dream and `02-project-setup.md` turns it into architecture plus UI/DX identity requirements;
- that phase-flow authority must be explicit, not inferred from the repo;
- what phase packet to implement next;
- what behavior is stable;
- what implementation choices are free;
- which pre-implementation questions must be asked or safely defaulted before coding;
- what verification gate to run immediately;
- what evidence is missing;
- when to stop, replan, or escalate.
