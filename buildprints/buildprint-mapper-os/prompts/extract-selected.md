# Extract Selected Prompt

Use Mapper OS to extract a selected candidate, explicit scope, or full-suite target into `selected-buildprint/`.

## Primary Output: executable Buildprint

Emit a clean executable blueprint. `BUILDPRINT.md` is the only start point and owns the read order. Do not emit a second router.

```text
selected-buildprint/
  BUILDPRINT.md
  blueprint.yaml
  01-questions.md
  02-project-setup.md
  03-phases/
    phase-index.yaml
    phase-flow.md
    01-<phase-id>.md
    02-<phase-id>.md
  04-evaluation.md
  05-evidence/
    evidence-ledger.jsonl
    evidence-ledger.schema.json
  06-contracts/
    product-architect.md
    ux-ui-craft.md
    test-and-verification.md
    integration-runtime.md
    security-boundary.md
    data-persistence.md
  generated/
    agent-prompt.md
```

`schema_version` must be `mapper-os/executable-blueprint`.

## Scaffold preservation contract

Start from `templates/executable-packet/` as the structural authority. Preserve the current scaffold keys, headings, and validator tokens exactly, then fill source-specific content around them. Do not paraphrase or rename the scaffold just because a synonym reads better.

Required exact anchors include:

- `blueprint.yaml`: `execution_start: BUILDPRINT.md`, `machine_contract: blueprint.yaml`, `setup_gate.questions: 01-questions.md`, `setup_gate.project_setup: 02-project-setup.md`, `implementation_loop`, and `repair_loop.on_failure.proof_gate_failed: current_phase`, `repair_loop.on_failure.architecture_contradiction: 02-project-setup.md`.
- `BUILDPRINT.md`: heading `# BUILDPRINT: <mapped-app>`, section headings `## Product brief`, `## Required read order`, `## Project setup gate`, `## Implementation loop`, and `## Repair routing`.
- `01-questions.md`: use headings `## 1.` through `## 6.` and include the exact AI-best-judgment default phrase below.
- `03-phases/phase-index.yaml`: `active_phase` must be the active phase file path, e.g. `03-phases/01-ingestion-ontology.md`, not only the phase id.
- `04-evaluation.md`: include literal proof concept labels `provider_live`, `durable_persistence`, `security_boundary`, `no_fake`, and `production_readiness`.
- `06-contracts/`: include one role contract file for each allowed `requires_roles` value: `product-architect`, `ux-ui-craft`, `test-and-verification`, `integration-runtime`, `security-boundary`, and `data-persistence`.

`generated/agent-prompt.md` must declare `Generated from: blueprint.yaml` and state that it is not source of truth.

Do **not** place `AGENTS.md` in `selected-buildprint/` or inside the Buildprint packet. `AGENTS.md` belongs to the downstream implementation project. `02-project-setup.md` defines the root/local `AGENTS.md` plan.

## Explicitly forbidden obsolete/default files

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

`BUILDPRINT.md` must route agents through this exact first-action protocol. The downstream runner must read `BUILDPRINT.md` before inventorying, globbing, or enumerating packet files; file discovery is allowed only after `BUILDPRINT.md` has established the read order:

1. `BUILDPRINT.md`
2. `01-questions.md`
3. `02-project-setup.md`
4. `blueprint.yaml`
5. `03-phases/phase-index.yaml`
6. `03-phases/phase-flow.md`
7. required `06-contracts/<role>.md` files for the active phase only
8. active phase file only
9. `04-evaluation.md`
10. `05-evidence/evidence-ledger.jsonl`

No phase may start until `02-project-setup.md` is explicit enough to create project root/local `AGENTS.md` without inventing architecture.

Before the read order, `BUILDPRINT.md` must include a compact `## Product brief` with:

- `Product`
- `Primary outcome`
- `Primary users`
- `Main surfaces`
- `What this packet must not become`

Keep this brief to orientation only. Do not copy phase details, source evidence, setup matrices, role contract text, or implementation plans into `BUILDPRINT.md`.

## 01-questions.md

Use numbered questions, not a vague blob. Include exactly these question areas:

1. Product direction
2. Tech stack preferences
3. UX/UI preferences
4. Architecture preferences
5. Quality bar
6. Constraints / things to avoid

Default rule:

> Use AI best judgment to produce the highest-quality appropriate implementation. Full-suite mapped Buildprints default to production-grade architecture: auth/session/tenant boundaries, durable persistence, worker/runtime ownership, deployment shape, observability, CI/e2e proof, security controls, and maintainable code. Favor simplicity unless mapped product obligations or product goals prove more complexity is needed. Do not block on ordinary engineering choices. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks. Missing credentials block live proof only; they do not remove provider adapters, config contracts, tests, or runtime wiring from scope.

## 02-project-setup.md

This is the pre-phase setup contract. Required sections:

- `## Setup defaults`
- `## Product shape`
- `## Architecture decisions`
- `## Production readiness contract`
- `## Workbench UX quality contract`
- `## Mapped contract anchors`
- `## Product obligation/surface matrix`
- `## Implementation project setup`
- `## Open assumptions`
- `## Phase start gate`

AI may decide ordinary engineering defaults, but each default must be appropriate, product-obligation-grounded, and production-grade for the selected full-suite scope. Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks. Missing credentials or paid-service approval can block live proof only after implementation includes provider adapters, config contracts, tests, and runtime wiring.

`## Production readiness contract` must define auth/session/tenant boundaries, provider integration contracts, durable persistence, worker/runtime behavior, deployment/operations, observability, CI gates, and repeatable browser/e2e proof. A local MVP, static shell, deterministic-only provider, screenshots-only UI proof, or in-memory product state is invalid unless the selected scope is explicitly prototype-only.

`## Product obligation/surface matrix` should be compact. Use a table or dense list, not pages of source evidence. Detailed behavior belongs in the owning phase files; this setup file only prevents surfaces from disappearing.


## Execution authority and delegation

Selected packets for multi-phase work must compile into orchestrator handoffs, not only implementation instructions.

Do not repeat the full phase/delegation protocol inside `02-project-setup.md`. That file should only contain implementation-project setup instructions: root/local `AGENTS.md` plan, `.buildprint/setup.md` requirement, and the statement that phase entry remains governed by `03-phases/phase-flow.md` plus `06-contracts/*`.

For long-running full-suite execution, the orchestrated phase-suite loop is mandatory:

1. Orchestrator reads Buildprint state, `03-phases/phase-flow.md`, and active phase.
2. Orchestrator resolves every phase `requires_roles` value to `06-contracts/<role>.md`.
3. Orchestrator writes `.buildprint/phase-runs/<phase-id>/plan.md`, `.buildprint/phase-runs/<phase-id>/team-gates.md`, and bounded handoffs for every required role.
4. Specialists implement or review scoped slices from those handoffs, or the orchestrator explicitly simulates the role and writes the same return artifact when subagents are unavailable.
5. Orchestrator integrates results in one workspace.
6. Proof gate runs for the phase after reviews are written under `.buildprint/phase-runs/<phase-id>/reviews/`.
7. Runtime evidence rows are appended to `.buildprint/evidence/evidence-ledger.jsonl` only after required phase-run artifacts exist.
8. Progress and next-agent continuity are updated before moving to the next phase.

A full-suite replay must fail if later phases are merely reserved, stubbed, or blocked while the run claims pass.

## Phase contract

Replace capabilities with phases, but keep capability discipline inside them.

A phase is **not** a waterfall time bucket. A phase is a proof-gated vertical product slice.

`03-phases/phase-index.yaml` must include `active_phase`, `phase_id`, `file`, `status`, dependencies, and proof gate. `active_phase` and every `file` value must point to the full packet-relative phase file path under `03-phases/`.

`03-phases/phase-flow.md` is required. It must be a compact delegation router, not the storage location for role expertise. It must define the phase-entry protocol, role-contract resolution through `06-contracts/<role>.md`, required phase-run artifacts, bounded handoff shape, subagent permission, self-simulation fallback when subagents are unavailable, integration/review/proof flow, and the rule that runtime evidence cannot be appended until plan/team-gates/handoffs/returns/reviews/proof artifacts exist.

`06-contracts/*.md` files are first-class packet files. Convert Mapper OS team skill capsules into concise role contracts with `## When Active`, `## Handoff Scope`, `## Reject If`, `## Required Return Headings`, and `## Proof/Evidence Expectations`. Do not copy the entire mapper-local `templates/teams/*` files verbatim into selected packets. A selected packet that only lists role names such as `ux-ui-craft` or `product-architect` without matching `06-contracts/<role>.md` files is incomplete.

Phase identity rules:

- Use one canonical `phase_id` per phase everywhere: `phase-index.yaml`, `blueprint.yaml`, phase files, proof gates, and seed evidence rows.
- Prefer stable numbered IDs that match the phase filename, e.g. `01-ingestion-ontology`, not both `ingestion-ontology` and `01-ingestion-ontology`.
- Do not use `capability_id` for phase proof instructions. Runtime proof rows must use `phase_id`.
- For stateful workflows, dependencies must model the mapped product workflow order. Do not emit `depends_on: []` for every phase unless the packet explicitly justifies independent parallel phases.

Every implementation phase file under `03-phases/*.md` must include:

- `## How to implement this phase` with required pre-code reads: `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md`; it must tell the agent to execute through phase-flow and block evidence until phase-flow artifacts exist.
- `requires_roles:` seeded from phase needs, not a fixed always-on team. Every listed role must have a matching `06-contracts/<role>.md` file.
- `## Product outcome`
- `## Mapped product obligations`
- `## Behavior compatibility contract`
- `## Implementation scope`
- `## Interfaces touched`
- `## State/runtime touched`
- `## UX/UI requirements`
- `## Safety/security constraints`
- `## Quality gates`
- `## Proof gate`
- `## Repair routing`

Interfaces, state/runtime, UX, and safety live inline in each phase unless the project genuinely needs a larger shared contract.

Every phase proof gate must split implementation obligations from live-proof blockers. Use these required labels where applicable: `provider_adapter_config_test_required`, `live_provider_proof_blocker_only`, `worker_retry_cancel_recovery`, `migration_retention_backup_upload_limits`, and `repeatable_browser_e2e`. Do not use soft labels such as `provider_integration_proof_or_blocker` that allow the implementation path itself to disappear.

UI-bearing phases must not reference non-existent shared files such as `02-context/ux-contract.md` or `design-quality-bar.md`. Put the UX/UI contract inline in the phase or add an actual packet file and list it in the package.

## Implementation loop

`BUILDPRINT.md`, `blueprint.yaml`, `03-phases/phase-flow.md`, and every phase must require:

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
- packet seed-only blocker -> `05-evidence/evidence-ledger.jsonl`
- runtime proof/blocker row, including external implementation blockers -> `.buildprint/evidence/evidence-ledger.jsonl` in the implementation workspace

Do not mark a phase complete while its verification failure is unresolved.

## Evaluation and evidence

`04-evaluation.md` defines claim upgrade rules, loop completion, no-fake proof, evidence requirements, and blocker honesty.

`05-evidence/evidence-ledger.schema.json` must require `phase_id`, `proof_type`, `provider_mode`, and `upgrades_claim`.

`05-evidence/evidence-ledger.jsonl` is the packaged immutable seed ledger. Runtime/implementation may copy from it, but implementation proof and blockers are appended only to `.buildprint/evidence/evidence-ledger.jsonl`; claims only upgrade from passing runtime evidence rows with canonical `phase_id`.

## Extraction rules

- Convert source facts into source-independent product obligations inside setup and phase files. Do not expose `## Source evidence` as an implementation-agent section.
- Include a compact `## Product obligation/surface matrix` in `02-project-setup.md`. It must account for high-signal mapped surfaces (routes/screens/API handlers/jobs/providers/auth/admin/state/uploads/imports/exports/artifacts/destructive lifecycle/deployment runtime) with: surface id, product obligation, target disposition (`preserve`, `replace`, `merge`, `defer`, or `drop`), target contract, and owning phase/blocker destination.
- Treat route/function/file names as evidence anchors and compatibility signals, not mandatory clone targets. Do not require 1:1 route/function parity unless the source route/function is the real product boundary. The target may improve, rename, merge, or redesign surfaces when the equivalent capability and compatibility impact are explicit.
- Clearly distinguish file-reference roles. A backticked file-ish reference ending in `.md`, `.yaml`, `.json`, or `.jsonl` must either be an actual packet file in `selected-buildprint/` or be role-labeled in the same sentence/line as a source path/source anchor, runtime artifact/generated output, or downstream implementation project file. Do not leave naked ambiguous refs such as “writes `report.md`”. Write “writes runtime artifact `report.md`” instead.
- Only actual packet files are packet links. Source repository files such as package manifests/lockfiles/route files must be labeled as source paths, not ambiguous packet-file references. Runtime artifacts such as `state.json`, `actions.jsonl`, `project.json`, `env_status.json`, `section_XX.md`, upload paths, report files, provider output files, or `<id>` paths must be labeled as runtime artifact paths and should not be written as ambiguous packet-file references.
- Preserve selected/requested behavior. Do not omit hard/risky/external/provider/stateful behavior; mark blockers honestly when proof is missing.
- Include stable-vs-free boundaries inside relevant phase files.
- Include mapped product obligations inside each phase. Source references may appear only as compact mapped source notes; the implementation contract must be self-contained.
- Mark selected output `PROOF_REQUIRED` until proof exists.
- Public wording must avoid validated/production-ready/complete/end-to-end unless qualified evidence exists.

## Behavior loss review

Before handoff, ask:

> What mapped product behavior, workflow, integration boundary, persistence behavior, auth/security rule, job/runtime behavior, import/export, or operational requirement would be impossible to rebuild from this Buildprint?

Any identified loss must become a phase, a blocker, an explicit user-approved exclusion, or a documented merge into another phase.

## Required self-check before handoff

Before returning selected output, run the product-facing packet check when the CLI is available:

```bash
node /root/blueprint/bin/agb.js packet check <selected-buildprint-dir>
```

If working inside the `/root/blueprint` repository, also run:

```bash
node /root/blueprint/scripts/check-mapper-selected-output.mjs <selected-buildprint-dir>
```

A generated packet that fails these checks is not ready. Fix the root structural cause in the packet output rather than explaining the failure away.
