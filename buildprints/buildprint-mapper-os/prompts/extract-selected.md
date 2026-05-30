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
  generated/
    agent-prompt.md
```

`schema_version` must be `mapper-os/executable-blueprint`.

`blueprint.yaml` must also include `qualification_label: PROOF_REQUIRED`, explicit `setup_tier`, optional-vs-required `PRODUCT.md` rule, and the Product Engineering Lead accountability contract. Do not use CEO/persona framing.

Mapper OS maintains `buildprints/buildprint-mapper-os/vision.md` as generator guidance. Use it while synthesizing selected packets, but never emit packet-level `vision.md` into `selected-buildprint/`.

## Scaffold preservation contract

Start from `templates/executable-packet/` as the structural authority. Preserve the current scaffold keys, headings, and validator tokens exactly, then fill source-specific content around them. Do not paraphrase or rename the scaffold just because a synonym reads better.

Required exact anchors include:

- `blueprint.yaml`: `execution_start: BUILDPRINT.md`, `machine_contract: blueprint.yaml`, `blueprint_mode` with primary/secondary/phase_style, `setup_gate.questions: 01-questions.md`, `setup_gate.project_setup: 02-project-setup.md`, `implementation_loop`, and `repair_loop.on_failure.proof_gate_failed: current_phase`, `repair_loop.on_failure.architecture_contradiction: 02-project-setup.md`.
- `blueprint.yaml`: must include `qualification_label`, `setup_tier`, `lead_agent_contract.role: Product Engineering Lead`, optional-vs-required `PRODUCT.md` rule, and each phase entry must include `phase_id`, `file`, `blueprint_mode`, `phase_style`, `glance_surfaces`, `owned_surface_ids`, `required_proofs`, and `proof_gate`.
- `BUILDPRINT.md`: heading `# BUILDPRINT: <mapped-app>`, section headings `## Product brief`, `## Final product at a glance`, `## Required read order`, `## Project setup gate`, `## Implementation loop`, `## Completion semantics`, and `## Repair routing`. `## Completion semantics` must state that bounded proof is not product completion, that review prose/status notes are not evidence, and that every pass verdict requires rerunnable command output or an existing artifact path (copy from `templates/executable-packet/BUILDPRINT.md`; do not omit).
- `01-questions.md`: use headings `## 1.` through `## 6.` and include the exact AI-best-judgment default phrase below.
- `03-phases/phase-index.yaml`: `active_phase` must be the active phase file path, e.g. `03-phases/01-ingestion-ontology.md`, not only the phase id.
- `04-evaluation.md`: include literal proof concept labels `provider_live`, `durable_persistence`, `security_boundary`, `no_fake`, and `production_readiness`.

`generated/agent-prompt.md` must declare `Generated from: blueprint.yaml`, state that it is not source of truth, and summarize the selected blueprint mode/phase style without overriding the packet files.

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
7. active phase file only
8. `04-evaluation.md`
9. `05-evidence/evidence-ledger.jsonl`

No phase may start until `02-project-setup.md` is explicit enough to create project root/local `AGENTS.md` without inventing architecture.

For product-mode packets and UI-bearing mixed outputs, synthesize `BUILDPRINT.md` and `02-project-setup.md` from Mapper OS `vision.md`. Do not copy `vision.md` into the packet. Convert its quality bar into concise product-specific language that makes the downstream agent picture a desirable finished product before it sees implementation mechanics.

Before the read order, `BUILDPRINT.md` must include a compact vision-derived `## Product brief` with:

- `Product`
- `Primary outcome`
- `Primary users`
- `Main surfaces`
- `What this packet must not become`

Rules for `## Product brief`:

- `Product` must be a **capability name** — what kind of tool or system this is — not the source app or brand name. Writing "Toonflow production canvas webapp" when the source app is called Toonflow is invalid. Write "AI short-drama production canvas workbench" instead.
- `Primary outcome` must be a **single concrete user-visible result**: what the user can do and what they receive. Do not list internal source node names, route names, or component identifiers as if the reader knows them. Do not restate the product name. One sentence, product language, from the user's perspective.
- Keep this brief to five orientation bullets. Do not copy phase details, source evidence, setup matrices, or implementation plans.
- Do not freeze source implementation frameworks: write capability surfaces (`browser workbench`, `API service`, `worker/runtime`, `provider adapter`, `persistence`, `artifact export`), not concrete stack names such as Vue, React, Flask, Django, FastAPI, Express, Next, Nuxt, Svelte, or Angular. Product-defining external systems such as named platforms, model/provider boundaries, and runtime artifacts may be named when they are part of the mapped product contract.
- The brief must reject ugly-app failure modes in product-specific terms: generic dashboards, local MVP shells, static demos, bare graphs, raw text lists, default forms, and product-agnostic UI.

Immediately after `## Product brief`, `BUILDPRINT.md` must include `## Final product at a glance` with exactly three bounded parts:

1. **Golden path** — one short paragraph narrating the single primary end-to-end user journey through the core surfaces from first action to final result. Use product language only. Do not use source-internal node names, route names, or component identifiers. Do not enumerate every feature — only the spine.
2. **Surfaces** — one line per major view or surface, in the format: `- <Surface name> — <what the user does here> — Phase <N>`. Every surface named here must trace to a row in the `02-project-setup.md` obligation/surface matrix with exactly one owning phase. Do not invent surfaces beyond what the mapped obligations support. Depth stays in the phase file; this is a map, not a spec.
3. **Done looks like** — 2–4 bullets naming the observable end-state that distinguishes the real product from a proof shell. Examples: a saved entity reloads intact after restart; real drag/edit/generate interaction rather than static markup; honest blocked-provider states when credentials are absent.

This section is the product north star. It must not contain architecture decisions, API contracts, state schemas, or per-phase implementation detail. It carries `PROOF_REQUIRED` framing: it is the target picture, not a claim the product is built.

Traceability rule (both directions): every surface named in `## Final product at a glance` must appear in the `02-project-setup.md` obligation/surface matrix with exactly one owning phase; every phase in the packet must deliver at least one named glance surface. A glance surface with no owning phase is dropped scope. A phase that delivers no named glance surface is invented scope.

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

`01-questions.md` may ask for stack preferences, but it must not bias the human toward the source repository's concrete frameworks. Ask generically for frontend/backend/runtime/storage/deployment preferences; do not say “if different from Vue/Flask/etc.” Framework choices are implementation decisions unless the human names them or the framework itself is the product being mapped.


Adapt the question wording to match the selected blueprint_mode. The six numbered areas are fixed; only the wording within each area shifts by mode:

- Area 1 (direction): product/mixed → what the product optimizes for; framework/library → target primitive/API/semver policy; integration → which provider/service boundary; automation → task objective and stop policy; data-pipeline → input sources and output artifacts; infrastructure → target resources and environment.
- Area 2 (tech stack): product → frontend/backend/runtime/storage/deployment; framework/library → language/package manager/registry/test harness; integration → auth/SDK/transport/retry library; automation → orchestration runtime/agent framework/tools; data-pipeline → engine/storage/scheduler/validation library; infrastructure → IaC/provisioner/cloud/container/secrets manager.
- Area 3 (UX/UI): product/mixed → visual style/interaction quality/accessibility; framework/library → DX: docs format/API ergonomics/example style; integration → operator experience/webhook dashboard; automation → run log/approval UI/trace format; data-pipeline → lineage view/quality dashboard; infrastructure → deployment log/health dashboard/runbook format.
- Area 4 (architecture): product → frontend/backend/domain boundaries; framework/library → adapter/plugin/extension architecture; integration → auth boundary/idempotency strategy/sandbox setup; automation → tool/action boundary/loop topology; data-pipeline → DAG vs linear/transform isolation/backfill strategy; infrastructure → IaC modular layout/environment separation.
- Area 5 (quality): product → typecheck/lint/test/build/browser/e2e; framework/library → import/API/CLI contract proof-fixtures/semver compat; integration → fake-provider proof-fixtures/webhook replay/sandbox-live split; automation → trace-based proof/stop-condition verification; data-pipeline → schema validation/lineage proof-fixtures/quality gate; infrastructure → health/readiness/rollback proof/drift detection.
- Area 6 (constraints): product → forbidden patterns/out-of-scope surfaces; framework/library → breaking changes policy/max dependency additions; integration → secret/auth scope/rate-quota limits; automation → tool scope/dangerous-action approvals; data-pipeline → PII handling/retention policy; infrastructure → permission scope/immutable resources/blast radius.

Do not add a seventh question. Do not split any area into multiple numbered sections.

## Blueprint mode and phase style

Before writing `02-project-setup.md`, `blueprint.yaml`, or any phase, classify the selected output by blueprint mode. This is a generation invariant, not branding. Do not force every repository into product-app language.

Use one primary mode and optional secondary tags:

```yaml
blueprint_mode:
  primary: product | framework | integration | automation | library | data-pipeline | infrastructure | mixed
  secondary: [ui, api, worker, provider, sdk, cli, agent, data, deployment]
  phase_style: outcome_flow | primitive_composition_map | boundary_transaction_contract | task_loop_contract | callable_contract | dataflow_contract | operations_contract | mixed_contract
```

Mode guidance:

- `product`: phases are outcome-first flows. A user/operator can do a meaningful product operation end to end.
- `framework`: phases are primitive/composition maps. Describe the primitive, invariants, composition rules, extension points, reference patterns, misuse cases, compatibility surface, and proof examples. Do not collapse a general framework into one downstream app story.
- `library`: phases are callable-surface contracts. Define the public API, callable entry points, invariants, type/error contracts, semver/compatibility surface, reference patterns, and misuse cases. Focus on what a consumer imports and calls, not one downstream app story.
- `integration`: phases are external boundary transaction contracts. Describe config/secrets, request/response, webhook/callback, idempotency, retry/error mapping, sandbox/live split, persistence/audit, fake-provider tests, and live-proof blockers.
- `automation`: phases are task-loop contracts. Describe task objective, tool/action boundaries, plan/execute/observe loop, evidence requirements, stop conditions, human approval points, recovery/escalation, and trace proof.
- `data-pipeline`: phases are dataflow contracts. Describe input datasets/schemas, transform semantics, output artifacts/tables, validation, lineage, backfills, idempotency, and data quality proof.
- `infrastructure`: phases are operations contracts. Describe deploy/apply entrypoint, resources changed, health/readiness, rollback, drift detection, observability, permissions, and environment proof.
- `mixed`: the source spans multiple mode families. Each phase must declare its own `blueprint_mode` (a non-`mixed` primary) and matching `phase_style`. The packet-level `blueprint_mode.phase_style` is `mixed_contract`. Across all phases, at least two distinct per-phase `blueprint_mode` values must appear; if every phase would be the same mode, reclassify the packet under that single mode instead.

Phase-style definitions:

- `outcome_flow`: product mode. Phases describe what a user/operator can do end to end.
- `primitive_composition_map`: framework mode. Phases describe primitives, invariants, composition rules, extension points, and misuse cases.
- `callable_contract`: library mode. Phases describe callable API surfaces, public contracts, semver/compatibility boundaries, and consumer patterns.
- `boundary_transaction_contract`: integration mode. Phases describe external boundary, config, request/response, webhook/callback, idempotency, sandbox/live split, and fake-provider proof.
- `task_loop_contract`: automation mode. Phases describe task objective, plan/execute/observe loop, stop conditions, approval points, trace proof, and escalation.
- `dataflow_contract`: data-pipeline mode. Phases describe input datasets/schemas, transform semantics, output artifacts, lineage, backfills, idempotency, and quality proof.
- `operations_contract`: infrastructure mode. Phases describe deploy/apply, resources changed, health, rollback, drift detection, observability, and environment proof.
- `mixed_contract`: mixed-mode packet-level style only. Individual phases must use one of the above seven styles matching their per-phase `blueprint_mode`.

Every phase still needs the shared proof spine: preconditions/inputs, entrypoint or callable/use site, execution behavior, state/artifact effects, observable proof, failure/recovery, and non-goals. The mode decides the language and emphasis.

## Per-mode minimum vocabulary

Every generated phase file must contain the minimum vocabulary for its declared mode. These are not headings — they are required terms that must appear at least once in the phase body:

- `product`: terms are covered by the shared proof spine; no additional required terms beyond those already mandated by phase structure.
- `framework`: at least one of `primitive`, `composition`, `extension point`, `misuse`. All four are strongly preferred.
- `library`: at least one of `callable`, `public API`, `semver`, `compat`. Also required: `consumer` or `import`.
- `integration`: `webhook` or `callback`; `idempotency`; `sandbox` or `live split`; `retry` or `error mapping`.
- `automation`: `task loop` or `plan/execute/observe`; `stop condition`; `approval` or `approval point`; `trace`.
- `data-pipeline`: `schema`; `transform`; `lineage`; `backfill` or `idempotency`; `data quality`.
- `infrastructure`: `deploy` or `apply`; `rollback`; `health` or `readiness`; `drift`; `observability`.
- `mixed`: each phase's minimum vocabulary follows its declared per-phase `blueprint_mode` above.

The `## Phase mode contract` section is the natural place to introduce these terms, but they may appear anywhere in the phase body.

Anti-patterns:

- Do not write product user stories for frameworks that should be maps of primitives and composition rules.
- Do not write libraries as one downstream app story; the consumer-callable API surface, semver contract, and compat surface must be explicit.
- Do not write provider integrations as generic product flows without webhook/idempotency/secret/error contracts.
- Do not write automation agents as feature checklists without task loop, evidence, stop conditions, and exit criteria.
- Do not write infrastructure as UI or API work when the meaningful operation is deployment, health, rollback, or drift control.
- Do not write data-pipeline phases without schema, transform, lineage, and quality proof.
- Do not use `mixed` as the primary mode to avoid classifying. If every phase would use the same per-phase mode, the packet should use that mode as primary instead of `mixed`.

## 02-project-setup.md

This is the pre-phase setup contract. Required sections:

- `## Setup defaults`
- `## Product / capability shape`
- `## Architecture decisions`
- `## Production readiness contract`
- `## Experience quality contract`
- `## Mapped contract anchors`
- `## Mapped obligation/surface matrix`
- `## Implementation project setup`
- `## Foundation scaffold gate`
- `## Open assumptions`
- `## Phase start gate`

AI may decide ordinary engineering defaults, but each default must be appropriate, mapped-obligation-grounded, mode-aware, and production-grade for the selected full-suite scope. Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks. Missing credentials or paid-service approval can block live proof only after implementation includes provider adapters, config contracts, tests, and runtime wiring.

`02-project-setup.md` may define architecture boundaries, but it must avoid treating source frameworks as defaults. Prefer neutral decisions such as browser workbench, API service, worker/runtime boundary, provider adapters, repositories, persistence, and e2e harness. If the source used a framework, record only that framework internals are replaceable; do not name or preserve the framework unless the mapped target is itself a framework/library or the human explicitly requires it.

`## Production readiness contract` must define auth/session/tenant boundaries, provider integration contracts, durable persistence, worker/runtime behavior, deployment/operations, observability, CI gates, and repeatable browser/e2e proof. A local MVP, static shell, deterministic-only provider, screenshots-only UI proof, or in-memory product state is invalid unless the selected scope is explicitly prototype-only.

`## Mapped obligation/surface matrix` is the source feature coverage map compiled into the executable packet. It should be compact, but it is mandatory coverage infrastructure, not decorative context. Use a table or dense list, not pages of source evidence. Detailed behavior belongs in the owning phase files; this setup file prevents surfaces from disappearing and gives each source surface one owner and one proof path.

The matrix must include source evidence, target disposition, owning phase, and required proof for every high-signal mapped surface. Generic buckets like “simulation”, “dashboard”, “memory”, “reports”, “runtime”, or “core app” are invalid unless decomposed into sub-surfaces with distinct obligations. If a surface is split across phases, name one primary owning phase and supporting phases. If a surface is intentionally dropped, deferred, blocked, or uncertain, mark that disposition with rationale; do not silently omit it.


## Execution authority

Selected packets for multi-phase work must compile into a lean phase-run protocol, not role-contract bureaucracy.

Do not repeat the full phase protocol inside `02-project-setup.md`. That file should only contain implementation-project setup instructions: root/local `AGENTS.md` plan, `.buildprint/setup.md` requirement, Foundation scaffold gate, `ui-identity.md` requirement for UI-bearing work, and the statement that phase entry remains governed by `03-phases/phase-flow.md`.

For implementation packets, `02-project-setup.md` must require the implementation agent to create the selected stack's real base project structure before Phase 01. The scaffold must include root `AGENTS.md`, `.buildprint/setup.md`, `architecture.md`, `engineering-standards.md`, `proof-strategy.md`, and `ui-identity.md` when UI-bearing. Root `AGENTS.md` must explicitly mention those files as mandatory reads for coding agents before editing code; otherwise coding agents will avoid them. `architecture.md` must contain architecture best practices with `Architecture principles`, `Base project structure`, `Boundary map`, `Dependency rules`, `Architecture decisions`, and `Downstream phase extension map`. `engineering-standards.md` must contain clean coding standards with `Clean code rules`, `Validation and schemas`, `Persistence standards`, `Provider standards`, `Worker/runtime standards`, `UI standards` when UI-bearing, and `Test standards`, including deterministic timeout/exit behavior for blocked e2e/runtime proof.

For UI-bearing packets, `ui-identity.md` is mandatory and must derive from the product vision in `BUILDPRINT.md`: visual identity, interaction principles, layout standards, empty/loading/error/blocked/success states, responsive behavior, screenshot critique, and product-specific anti-generic failure patterns.

`## Foundation scaffold gate` in `02-project-setup.md` must include the **Runnable verification gate** subsection from `templates/executable-packet/02-project-setup.md`: require `verify:no-fake` and `verify:phase-artifacts` scripts (or documented stack equivalents), mandate running them before runtime evidence, and require pasted stdout in `.buildprint/phase-runs/<phase-id>/proof.md`. Do not reduce this to prose-only "run tests".

For long-running full-suite execution, the orchestrated phase-suite loop is mandatory:

1. Orchestrator reads Buildprint state, `03-phases/phase-flow.md`, and active phase.
2. Orchestrator writes `.buildprint/phase-runs/<phase-id>/plan.md` with scope, product target, files to inspect, proof commands, and expected evidence rows.
3. Orchestrator implements the smallest real vertical path inside the scaffold.
4. Proof gate runs for the phase with exact tests, runtime/browser traces, screenshot critique, and source inspection required by the phase.
5. Orchestrator writes `.buildprint/phase-runs/<phase-id>/proof.md` with command output, artifact paths, screenshots/traces, blockers, and claim limits.
6. Runtime evidence rows are appended to `.buildprint/evidence/evidence-ledger.jsonl` only after required phase-run artifacts exist.
7. Progress and next-agent continuity are updated before moving to the next phase.

A full-suite replay must fail if later phases are merely reserved, stubbed, or blocked while the run claims pass.

## Phase contract

Replace capabilities with phases, but keep capability discipline inside them.

A phase is **not** a waterfall time bucket and not a component worklist. A phase is a mode-aware proof-gated slice that makes one meaningful capability, primitive, boundary, task loop, dataflow, or operation trustworthy.

Use `templates/executable-packet/03-phases/01-example-phase.md` as the few-shot pattern for selected phase generation. Copy its distinction between bad slice, prime slice, mode lens, `phase_core_passed`, `claim_qualified`, non-upgrading blockers, and narrow evidence rows. Do not copy its MiroFish/product nouns unless the selected product actually has that ingestion/ontology surface.

Mode-specific phase lenses:

- Product phases: outcome flow. Name what a user/operator can do, the flow preconditions, entrypoint, execution, visible/readable result, UX states, and proof.
- Framework/library phases: primitive composition map. Name the primitive or concept, contract and invariants, composition rules, reference patterns, extension points, invalid/misuse states, compatibility surface, and proof examples. Avoid freezing the framework into one app story.
- Integration phases: boundary transaction contract. Name the external boundary, config/secrets, request/response, webhook/callback, idempotency, retry/error mapping, sandbox/live split, persistence/audit, fake-provider proof, and live-proof blocker.
- Automation/agent phases: task loop contract. Name task objective, tool/action boundaries, plan/execute/observe loop, evidence requirements, stop conditions, approval points, recovery/escalation, and trace proof.
- Data pipeline phases: dataflow contract. Name inputs/schemas, transform semantics, output artifacts/tables, validation, lineage, backfill/idempotency, quality proof, and failure handling.
- Infrastructure phases: operations contract. Name deploy/apply entrypoint, resources changed, health/readiness, rollback, drift detection, observability, permissions, and environment proof.

Every phase must include a compact `## Phase mode contract` section immediately after `## Product outcome`, `## Capability outcome`, or `## Operation outcome` that states `blueprint_mode`, `phase_style`, why this phase uses that lens, and the mode-specific obligations. The section must not replace the shared proof spine.

`03-phases/phase-index.yaml` must include `active_phase`, `phase_id`, `file`, `status`, dependencies, and proof gate. `active_phase` and every `file` value must point to the full packet-relative phase file path under `03-phases/`.

`03-phases/phase-flow.md` is required. It must be a compact phase-run constitution, not the storage location for role expertise. It must define snapshot integrity, phase identity, phase-entry protocol, required phase-run artifacts, proof/evidence sequencing, continuation rules, and the rule that runtime evidence cannot be appended until `plan.md` and `proof.md` exist.

Phase identity rules:

- Use one canonical `phase_id` per phase everywhere: `phase-index.yaml`, `blueprint.yaml`, phase files, proof gates, and seed evidence rows.
- Prefer stable numbered IDs that match the phase filename, e.g. `01-ingestion-ontology`, not both `ingestion-ontology` and `01-ingestion-ontology`.
- Do not use `capability_id` for phase proof instructions. Runtime proof rows must use `phase_id`.
- For stateful workflows, dependencies must model the mapped product workflow order. Do not emit `depends_on: []` for every phase unless the packet explicitly justifies independent parallel phases.

Every implementation phase file under `03-phases/*.md` must include:

- `## How to implement this phase` with required pre-code reads: `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md`; it must tell the agent to execute through phase-flow and block evidence until phase-flow artifacts exist.
- `## Product outcome` for product mode, or `## Capability outcome` / `## Operation outcome` for non-product modes
- `## Phase mode contract` — must include a `Glance surfaces delivered:` line naming which surfaces from `BUILDPRINT.md` `## Final product at a glance` this phase owns. At least one surface must be named. A phase that delivers no named glance surface is delivering invented scope and must be removed or traced to a missing glance entry.
- `## Mapped product obligations` for product mode, or `## Mapped capability obligations` / `## Mapped operation obligations` for non-product modes
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

Do not paste the same artifact inventory or proof-label prose into every phase. `## State/runtime touched` must name only phase-owned durable/runtime state, explicitly distinguish read-only upstream inputs from downstream artifacts, and reject ownership of artifacts that belong to later phases. `## Proof gate` may repeat canonical labels, but each label's explanation must be phase-specific and name the exact provider, worker, persistence, browser, and visual paths proven by that phase. A generic sentence such as “Treat each named file as a runtime artifact output when this phase owns or reads it” is invalid because it teaches downstream agents to overclaim ownership.

UI-bearing phases must not reference non-existent shared files such as `02-context/ux-contract.md` or `design-quality-bar.md`. Put the UX/UI contract inline in the phase or add an actual packet file and list it in the package.

## Product outcome quality bar

`## Product outcome` must be a concrete multi-sentence user-visible result. It must name what the user can do, what visible result they receive, and at least one non-success state (loading, blocked, error, empty, retry). It must not be:

- identical or nearly identical to the phase title (e.g., `## Product outcome\n\nProduction Storyboard Flow` after a title of `Phase 04 — Production Storyboard Flow` is forbidden)
- a single noun phrase or label without a user action and a visible result
- a restatement of "implement X" without naming what the user sees or proves

`## Implementation scope` must enumerate specific features, interactions, and depth items rather than generic boilerplate. Forbidden verbatim filler:

- `"Inputs are defined by the product obligation and interface contracts."` — name the actual inputs
- `"Outputs are defined by the product obligation and interface contracts."` — name the actual outputs and downstream artifacts

For UI-bearing product phases, `## Implementation scope` or the `## Proof gate` must name at least one concrete **interaction depth** item per domain capability:

- Where the product promises drag/pan/zoom/resize: name the specific pointer event, transform, or coordinate range that proves real manipulation (not just `draggable="true"`)
- Where the product promises editing (inspector, node editor, property panel): name what the user edits, how it persists, and how restart readback proves it
- Where the product promises async generation/processing: name the worker lifecycle states (queued, running, progress, done, failed, retry/cancel) that must be proven, not just a sandbox success response
- Where the product promises persistence per entity type: name each entity class that must survive restart and be readable

A broad smoke test (`target verification command` or `a generic check command`) that passes one happy path does not satisfy any of the above depth items. Each depth item requires its own named test, browser interaction, or evidence row.

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

- Treat Product Engineering Lead as an accountability contract, not a persona. Generated packets must say the lead preserves product intent, coordinates phase work, requires evidence, challenges shallow implementation, and escalates blockers. Do not use CEO language.
- Every selected packet must require `.buildprint/phase-runs/<phase-id>/phase-preflight.yaml` before coding, with user-visible outcomes, affected boundaries, surface ids, criterion ids, proof ids, fake-done risks, verifier commands, claim ceiling, and blockers.
- Every phase must include structured `phase_contract` data with `phase_id`, `blueprint_mode`, `phase_style`, `glance_surfaces`, `owned_surface_ids`, `core_pass_required`, and `claim_upgrade_tracks`.
- Generate claim typing explicitly: `target`, `core_pass`, `claim_upgrade`, and `blocker`. Do not allow `phase_core_passed` to qualify live provider, deployment, worker, security, visual, or lifecycle claims without matching claim-upgrade evidence.
- Generate verifier commands and proof ids as concrete anchors. A proof gate without criterion ids, proof ids, or command/artifact expectations is invalid.

- Convert source facts into source-independent mapped obligations inside setup and phase files. Do not expose `## Source evidence` as an implementation-agent section.
- Include a compact `## Mapped obligation/surface matrix` in `02-project-setup.md`. It must account for high-signal mapped surfaces according to mode: product flows, framework primitives/composition rules, integration boundary transactions, automation task loops, dataflows, infrastructure operations, routes/screens/API handlers/jobs/providers/auth/admin/state/uploads/imports/exports/artifacts/destructive lifecycle/deployment runtime. Include surface id, source evidence, mapped obligation (use “Mapped obligation” as the column label, not “Product obligation”), target disposition (`preserve`, `replace`, `merge`, `defer`, `drop`, or `blocked`), target contract, exactly one owning phase/blocker destination, and required proof. Broad buckets are invalid unless decomposed into sub-surfaces.
- Treat route/function/file names as evidence anchors and compatibility signals, not mandatory clone targets. Do not require 1:1 route/function parity unless the source route/function is the real product boundary. The target may improve, rename, merge, or redesign surfaces when the equivalent capability and compatibility impact are explicit.
- Clearly distinguish file-reference roles. A backticked file-ish reference ending in `.md`, `.yaml`, `.json`, or `.jsonl` must either be an actual packet file in `selected-buildprint/` or be role-labeled in the same sentence/line as a source path/source anchor, runtime artifact/generated output, or downstream implementation project file. Do not leave naked ambiguous refs such as “writes `report.md`”. Write “writes runtime artifact `report.md`” instead.
- Only actual packet files are packet links. Source repository files such as package manifests/lockfiles/route files must be labeled as source paths, not ambiguous packet-file references. Runtime artifacts such as `state.json`, `actions.jsonl`, `project.json`, `env_status.json`, `section_XX.md`, upload paths, report files, provider output files, or `<id>` paths must be labeled as runtime artifact paths and should not be written as ambiguous packet-file references.
- Preserve selected/requested behavior. Do not omit hard/risky/external/provider/stateful behavior; mark blockers honestly when proof is missing.
- Include stable-vs-free boundaries inside relevant phase files.
- Include mapped product/capability/operation obligations inside each phase according to `blueprint_mode`. Source references may appear only as compact mapped source notes; the implementation contract must be self-contained.
- Mark selected output `PROOF_REQUIRED` until proof exists.
- Public wording must avoid validated/production-ready/complete/end-to-end unless qualified evidence exists.

## Behavior loss review

Before returning selected output, ask:

> What mapped product behavior, workflow, integration boundary, persistence behavior, auth/security rule, job/runtime behavior, import/export, or operational requirement would be impossible to rebuild from this Buildprint?

Any identified loss must become a phase, a blocker, an explicit user-approved exclusion, or a documented merge into another phase.

## Required self-review before return

Before returning selected output, review the packet from the next implementer's point of view:

- `BUILDPRINT.md` contains a specific product dream, golden path, surfaces, and done-looks-like.
- `02-project-setup.md` turns that dream into architecture, UI/DX identity, and implementation setup.
- `03-phases/phase-index.yaml` names the active phase and each phase file has proof, stop, repair, and evidence rules.
- `04-evaluation.md` describes runtime proof expectations without relying on repo-local harnesses.
- No selected packet depends on deleted Mapper OS eval fixtures, role contracts, or repo check scripts.
