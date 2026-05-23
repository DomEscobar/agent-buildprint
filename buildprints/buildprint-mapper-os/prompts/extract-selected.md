# Extract Selected Prompt

Use Mapper OS to extract a selected candidate, explicit scope, or full-suite target into `selected-buildprint/`.

## Primary Output: executable-blueprint v5

Emit a clean executable blueprint. `BUILDPRINT.md` is the only start point and owns the read order. Do not emit a second router.

```text
selected-buildprint/
  BUILDPRINT.md
  blueprint.yaml
  01-questions.md
  02-project-setup.md
  03-phases/
    phase-index.yaml
    01-<phase-id>.md
    02-<phase-id>.md
  04-evaluation.md
  05-evidence/
    evidence-ledger.jsonl
    evidence-ledger.schema.json
  generated/
    agent-prompt.md
```

`schema_version` must be `mapper-os/executable-blueprint.v5`.

`generated/agent-prompt.md` must declare `Generated from: blueprint.yaml` and state that it is not source of truth.

Do **not** place `AGENTS.md` in `selected-buildprint/` or inside the Buildprint packet. `AGENTS.md` belongs to the downstream implementation project. `02-project-setup.md` defines the root/local `AGENTS.md` plan.

## Explicitly forbidden legacy/default files

Do not emit:

- `START_HERE.md`
- `PRE_IMPLEMENTATION_QUESTIONS.md`
- `00-intent/`
- `01-operating-model/`
- `02-context/`
- `03-capabilities/`
- `04-interfaces/`
- `05-state-runtime/`
- `06-safety/`
- `07-execution/`
- `08-evaluation/`
- `09-evidence/`
- packet `AGENTS.md`
- packet-local `docs/` agent setup folders
- fragmented per-capability mini-files: `capability.yaml`, `source-evidence.md`, `product-contract.md`, `implementation-workflow.md`, `proof-contract.yaml`
- root `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `SOURCE_SURFACE_COVERAGE.md`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `IMPLEMENTATION_PLAN.md`, `manifest.json`

## Read order and execution protocol

`BUILDPRINT.md` must route agents through:

1. `BUILDPRINT.md`
2. `01-questions.md`
3. `02-project-setup.md`
4. `blueprint.yaml`
5. `03-phases/phase-index.yaml`
6. active phase file only
7. `04-evaluation.md`
8. `05-evidence/evidence-ledger.jsonl`

No phase may start until `02-project-setup.md` is explicit enough to create project root/local `AGENTS.md` without inventing architecture.

## 01-questions.md

Use numbered questions, not a vague blob. Include exactly these question areas:

1. Product direction
2. Tech stack preferences
3. UX/UI preferences
4. Architecture preferences
5. Quality bar
6. Constraints / things to avoid

Default rule:

> If blank, AI chooses the best-fit implementation path. Prefer high-quality, maintainable, secure, polished outcomes. Favor simplicity unless source evidence or product goals prove complexity is needed. Do not block on ordinary engineering choices. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks.

## 02-project-setup.md

This is the pre-phase setup contract. Required sections:

- `## Human preferences`
- `## Inferred project shape`
- `## Stack decisions`
- `## Architecture rules`
- `## Team operating model`
- `## AGENTS.md plan`
- `## Quality gates`
- `## Safety and permissions`
- `## Open questions and assumptions`
- `## Phase start gate`

AI may decide ordinary engineering defaults, but each default must be appropriate, source/product-grounded, and not maximal for its own sake. Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks.

## Phase contract

Replace capabilities with phases, but keep capability discipline inside them.

A phase is **not** a waterfall time bucket. A phase is a proof-gated vertical product slice.

`03-phases/phase-index.yaml` must include `active_phase`, `phase_id`, `file`, `status`, dependencies, and proof gate.

Every `03-phases/*.md` file must include:

- `## Product outcome`
- `## Source evidence`
- `## Implementation scope`
- `## Interfaces touched`
- `## State/runtime touched`
- `## UX/UI requirements`
- `## Safety/security constraints`
- `## Quality gates`
- `## Proof gate`
- `## Repair routing`

Interfaces, state/runtime, UX, and safety live inline in each phase unless the project genuinely needs a larger shared contract.

## Implementation loop

`BUILDPRINT.md`, `blueprint.yaml`, and every phase must require:

```text
Observe → Plan → Execute → Verify → Reflect → Record
```

A phase cannot be marked done from code edits alone. It needs verification evidence or an honest blocker.

## Repair routing

If verification fails, route back before editing again:

- test/build/runtime/UI/proof failure -> current phase file
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase
- external blocker -> `05-evidence/evidence-ledger.jsonl`

Do not mark a phase complete while its verification failure is unresolved.

## Evaluation and evidence

`04-evaluation.md` defines claim upgrade rules, loop completion, no-fake proof, evidence requirements, and blocker honesty.

`05-evidence/evidence-ledger.schema.json` must require `phase_id`, `proof_type`, `provider_mode`, and `upgrades_claim`.

`05-evidence/evidence-ledger.jsonl` is the packaged seed ledger. Runtime/implementation may copy from it, but claims only upgrade from passing evidence rows.

## Extraction rules

- Convert source facts into source-independent product obligations inside setup and phase files.
- Preserve selected/requested behavior. Do not omit hard/risky/external/provider/stateful behavior; mark blockers honestly when proof is missing.
- Do not map routes/functions 1:1 unless that is the real product boundary.
- Include stable-vs-free boundaries inside relevant phase files.
- Include source evidence refs inside each phase.
- Mark selected output `SELECTED_UNQUALIFIED` until proof exists.
- Public wording must avoid validated/production-ready/complete/end-to-end unless qualified evidence exists.

## Behavior loss review

Before handoff, ask:

> What source-backed product behavior, workflow, integration boundary, persistence behavior, auth/security rule, job/runtime behavior, import/export, or operational requirement would be impossible to rebuild from this Buildprint?

Any identified loss must become a phase, a blocker, an explicit user-approved exclusion, or a documented merge into another phase.
