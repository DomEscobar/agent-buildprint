# Prompt: Extract Selected Buildprint

Use this prompt when the user has selected a repo, candidate, feature set, or full-suite scope and wants a source-independent Buildprint packet.

## Mission

Emit a clean executable Buildprint that helps a future coding agent build a better product. Preserve source behavior and selected scope, but rewrite it as product obligations, not source-clone instructions.

The packet must shape product judgment before coding: artifact type, mission, central artifact or boundary, first usable loop, persistence/state/readback, provider/deployment boundaries, forbidden shortcuts, phase slices, skeptical review, and concise handover.

Do not emit evidence bureaucracy. Do not ask the implementing agent to prove quality with long ledgers. Local checks are useful; built product behavior is the standard.

## Required selected packet files

```text
BUILDPRINT.md
01-questions.md
02-project-setup.md
blueprint.yaml
03-phases/phase-index.yaml
03-phases/phase-flow.md
03-phases/00-<phase-id>.md
03-phases/99-final-review-handover.md
04-review.md
05-handover.md
generated/agent-prompt.md
```

Do not emit old routers or fragmented mini-files: `START_HERE.md`, `PRE_IMPLEMENTATION_QUESTIONS.md`, packet `AGENTS.md`, `03-capabilities/`, `04-interfaces/`, `05-state-runtime/`, `06-safety/`, `08-evaluation/`, `09-evidence/`, `manifest.json`, `capabilities/`, or per-capability YAML/proof files.

## Generation process

1. Identify the selected scope.
2. Resolve deployment posture before extraction:
   - `trusted_local`
   - `private_authenticated`
   - `public_webapp`
     If posture remains unanswered after one prompt, default to `trusted_local` and record the default in `01-questions.md` and `05-handover.md`.
3. Classify the dominant artifact type: product, framework, library, integration, automation, data-pipeline, infrastructure, or mixed.
4. Select the matching spine from this canonical list only:
   - `product_app_consumer_first`
   - `developer_first_framework`
   - `reliability_first_service`
   - `automation_task_loop`
   - `data_pipeline_quality_loop`
   - `infrastructure_operations_loop`
   - `mixed`
     Never invent custom names such as `product_custom_consumer`.
5. Name the primary consumer: end user, developer, operator, maintainer, approver, analyst, or mixed.
6. Name the promise in mode-appropriate language.
7. Identify the central artifact, public interface, boundary transaction, work surface, task, dataflow, or operation.
8. Identify the first usable end-to-end loop for that consumer.
9. Identify state that must persist/read back, traces that must be inspectable, or outputs that must be reproducible.
10. Identify live-provider, credential, deployment, destructive, paid-service, and security boundaries.
11. Split implementation into usable, type-aware slices.
12. Route quality capsules for each phase:
    - UI-bearing -> [`ux-ui-craft`](../templates/teams/ux-ui-craft.md)
    - provider/runtime integration -> [`integration-runtime`](../templates/teams/integration-runtime.md)
    - durable state or restart/readback -> [`data-persistence`](../templates/teams/data-persistence.md)
    - auth/uploads/destructive/admin/user-data/public exposure -> [`security-boundary`](../templates/teams/security-boundary.md)
    - broad system refactor or many boundaries -> [`product-architect`](../templates/teams/product-architect.md)
      These linked files are extraction-time source capsules only; they are not shipped as separate role files in the generated packet.
13. Emit each phase with `requires_roles` and embed routed capsule obligations. EVERY role listed in a phase's `requires_roles` MUST have its own pair of sections in that same phase:
    - `## Required output (<role>)`
    - `## Blocks (<role>)`
      Do not list a role you do not embed, and do not embed a role you did not list. Phases are self-contained: there is no separate roles/capsule file shipped in the packet, so an unembedded role is a dangling token with no definition the downstream agent can resolve. `agb packet check` enforces this ("embeds every requires_roles role").
14. Add conditional hardening phases:
    - `auth-and-tenancy`
    - `observability-and-health`
    - `deployment-and-operability`
    - `ci-and-release-gates`
    - `backup-and-recovery`
    - `security-and-abuse-controls`
      For `trusted_local`, include these in `phase_order` as `included_blocked` with reason: `trusted_local posture -- promote to private_authenticated or public_webapp to unlock`.
15. Add final review and handover.

## File guidance

### BUILDPRINT.md

Include:

- detailed product mission;
- read order;
- senior product/developer/operator engineer contract;
- how to use the packet;
- completion semantics and honesty rules.

Tone: direct and useful. Avoid protocol bloat.

### 01-questions.md

This file is a decision gate, not a survey.

Classify questions by blocking power:

- **Hard-stop**: unanswered means stop before `02-project-setup.md`. These affect product/artifact identity, primary consumer, deployment posture, public/private exposure, cost, secrets, destructive/data-loss actions, privacy, compliance, or source fidelity.
- **Assumable**: unanswered may receive the safest reversible default, but the assumption must be recorded.
- **Deferrable**: unanswered may be parked for later, but the deferral must be recorded.

Useful hard-stop questions:

- deployment posture;
- primary user/developer/operator/system consumer;
- central artifact, public interface, boundary transaction, service state, task, dataflow, or operation;
- exposure boundary: uploaded files, private data, accounts, public traffic, callbacks;
- provider credentials, paid APIs, local models, or external services;
- destructive/data-loss/publish/send/charge actions;
- privacy/compliance/local-only constraints;
- source behaviors that must be preserved.

Useful assumable questions:

- exact framework/component library when reversible;
- local database/storage engine when reversible;
- coding-agent runner or harness target when reversible; default to the portable harness unless the implementation environment clearly supports a runner-native location;
- file/folder naming;
- minor layout/navigation choices;
- mainstream test/build tools for the selected stack.

Useful deferrable questions:

- advanced export formats;
- optional integrations;
- nice-to-have observability under `trusted_local` posture;
- future deployment provider when posture is local;
- advanced permissions before private/public posture.

Make the consumption rule explicit: hard-stop blanks block setup; assumable blanks become reversible assumptions; deferrable blanks become parking-lot entries. Include a question-to-decision ledger shape with `Question`, `Class`, `Answer / assumption / deferral`, `Architectural impact`, `Reversible?`, and `Blocks setup?`.

### 02-project-setup.md

This is not alignment vibes and not a feature phase. It is an LLM-native architect-mode foundation assignment.

Induce the implementer into this role:

- highly precise senior development architect;
- responsible for creating the architectural foundation all later phases build on;
- expert in modern software architecture, design patterns, frontend/backend separation, domain modeling, adapter boundaries, persistence, configuration hygiene, test strategy, DX, runtime failures, and LLM-agent failure modes;
- not allowed to merely restate the Buildprint.

Required behavior:

1. Consume `01-questions.md` first.
2. Classify each question as hard-stop, assumable, or deferrable.
3. If any hard-stop question is unanswered, stop and ask the human before setup.
4. Create a question-to-decision ledger: question, class, answer/assumption/deferral, architectural impact, reversibility, and setup-blocking status.
5. Never silently assume cost, secrets, public exposure, data loss, destructive actions, compliance, privacy, or product identity.
6. Design the base project architecture and coding-agent harness for remaining phases.
7. Require concrete setup and harness artifacts in the implementation project:
   - `AGENTS.md` as a short, testable repo constitution: product invariant, Buildprint authority, mandatory read order, setup/dev/build/test/smoke commands, ownership and boundary map, generated-file/secret/dependency rules, forbidden shortcuts, approval gates for deploy/migration/payment/external-message/destructive actions, verification/blocker reporting rules, and local `AGENTS.md` boundary rules;
   - `docs/agent-harness.md` mapping the full harness: root/local `AGENTS.md`, repo-local skills/playbooks, tool permissions, hooks, harness evals, and human review gates. If no runner is specified, default to a portable harness with `AGENTS.md`, `docs/agent-harness.md`, and `.buildprint/harness-evals/`, and record runner-native hooks/permissions as unsupported blockers when needed. For every important agent rule, decide whether it belongs in prose, a playbook, a permission, a hook, an eval, or human review;
   - repo-local skill/playbook files for repeated jobs, scoped by task/path and containing purpose, allowed tools, success criteria, anti-goals, and conflict rules with `AGENTS.md`;
   - runner-native permission and hook configuration where available, or a blocker entry in `docs/agent-harness.md` explaining what cannot be technically enforced yet and which human gate substitutes for it;
   - `.buildprint/harness-evals/` with small drift checks for the failure modes the project must catch, such as generated-file edits, secret reads, unnecessary dependencies, skipped checks, review-mode edits, and unapproved external actions;
   - `UI-IDENTITY.md` for UI-bearing artifacts, produced by an explicit UX/UI persona [`ux-ui-craft`](../templates/teams/ux-ui-craft.md) pass and defining visual identity, motion/interaction rules, clickable-control rules, layout/responsive/accessibility standards, component states, screenshot critique rubric, and forbidden generic UI patterns;
   - `.env.example` with no real secrets;
   - `docs/architecture.md`;
   - `docs/product-loop.md` or `docs/artifact-loop.md`;
   - initial app/runtime skeleton;
   - verification commands;
   - `.buildprint/setup-receipt.md`.

The setup file must force the architect to decide and record:

- artifact type and consumer;
- selected stack and rationale;
- module/app structure;
- domain model and central artifact/interface/boundary;
- adapter interfaces and external seams;
- data ownership, persistence, migrations, and readback;
- configuration model;
- error, blocked-state, retry, and recovery semantics;
- test/build/dev/smoke commands;
- future-agent harness rules, including which behaviors are enforced by AGENTS prose, skills/playbooks, permissions, hooks, evals, or human review;
- first vertical slice path.

Include posture-specific obligations:

- `trusted_local`: credible local artifact with explicit non-production blockers.
- `private_authenticated`: production-shaped obligations: auth/session, durable state, worker ownership, observability, restart safety, CI.
- `public_webapp`: private-authenticated obligations plus tenant isolation, abuse controls, deployment/rollback, backup/restore, and security review.

Include a posture-independent craft floor as a quality class, not a vendor: for UI-bearing products a mainstream component/UI framework with a build step plus a real design/styling system; never a single-file hand-rolled shell, no raw internal ids or cryptic unlabeled controls on the surface. For non-UI artifacts, require idiomatic package/project structure, build/test tooling, command/API ergonomics, examples, and recovery paths. Posture changes operability only, never craft.

Stack ownership:

- `02-project-setup.md` owns the selected architectural base and stack rationale.
- Do not inherit the source stack merely because the source used it.
- Preserve a source stack/dependency only when mapped behavior genuinely requires it, and state the reason plus an escape hatch such as an adapter or sidecar.

### 03-phases/00-product-system-alignment.md

This phase follows Buildprint Product System Alignment. It is not a second setup file, not a scaffold-only phase, and not a feature phase.

Selected packets use compact phase files, so embed the `00-product-system-alignment/` subfiles as sections inside this one phase file:

- product promise;
- user segments or consumer/operator personas;
- primary loops, such as capture, generate, review, return, share/export, or artifact-type equivalents;
- feature map ordered by loop and first value;
- state model, including empty, loading, success, blocked/error, recovery, saved/readback, and exported/handed-off states where relevant;
- architecture boundaries, using the setup receipt instead of reselecting the stack;
- quality bar and do-not-ship failures.

For UI-bearing products, include the state invariant: no UI without state, no state without UI. Every important state needs copy, one primary action, a recovery path, and test coverage. For non-UI artifacts, translate this into command/API/operator states, documented actions, recovery paths, and checks.

Phase 00 may repair a missing minimal setup artifact only when `02-project-setup.md` or `.buildprint/setup-receipt.md` is incomplete, but its normal job is to turn setup decisions into the product-system map that phase 01 and phase 02 implement. Do not reduce it to "create folders, stubs, health, smoke." Do not write vague alignment prose with no usable loop/state/feature decisions.

### blueprint.yaml

Use this shape and fill source-specific values where known:

```yaml
schema_version: mapper-os/executable-blueprint
execution_start: BUILDPRINT.md
machine_contract: blueprint.yaml
claim_status: product_build_required
qualification_label: local_build_requires_review
setup_tier: typed_product_leadership
deployment_posture:
  current: <trusted_local|private_authenticated|public_webapp>
  allowed_values:
    - trusted_local
    - private_authenticated
    - public_webapp
execution_cadence:
  current: <one_phase|to_checkpoint|all_remaining>
  allowed_values:
    - one_phase
    - to_checkpoint
    - all_remaining
blueprint_mode:
  primary: <product|framework|library|integration|automation|data-pipeline|infrastructure|mixed>
  consumer: <end_user|developer|operator|maintainer|approver|analyst|mixed>
  selected_spine: <product_app_consumer_first|developer_first_framework|reliability_first_service|automation_task_loop|data_pipeline_quality_loop|infrastructure_operations_loop|mixed>
  allowed_spines:
    - product_app_consumer_first
    - developer_first_framework
    - reliability_first_service
    - automation_task_loop
    - data_pipeline_quality_loop
    - infrastructure_operations_loop
    - mixed
agent_contract:
  role: <posture-derived role>
  rule: <posture-derived rule>
read_order:
  - BUILDPRINT.md
  - 01-questions.md
  - generated/agent-prompt.md
  - 02-project-setup.md
  - blueprint.yaml
  - 03-phases/phase-index.yaml
  - 03-phases/phase-flow.md
  - 04-review.md
  - 05-handover.md
implementation_loop:
  phase_flow: 03-phases/phase-flow.md
  active_phase: 03-phases/00-<phase-id>.md
  final_review: 04-review.md
  handover: 05-handover.md
repair_routing:
  product_contradiction: BUILDPRINT.md
  setup_or_architecture_gap: 02-project-setup.md
  phase_gap: current_phase
  review_gap: 04-review.md
  handover_gap: 05-handover.md
```

### 03-phases/phase-index.yaml

List phase ids, files, titles, status, dependencies, and the active phase. Include final review/handover as the last phase.

Use canonical phase status values only: `included`, `included_blocked`, `conditional`, or `blocked`. Use canonical deployment posture values only: `trusted_local`, `private_authenticated`, or `public_webapp`.

For `blueprint_mode.primary: product` / `selected_spine: product_app_consumer_first`, use the Buildprint product-app phase sequence unless the user explicitly selected a smaller slice:

1. `00-product-system-alignment`
2. `01-shell-and-navigation`
3. `02-core-loop-first`
4. `03-feature-slices`
5. `04-state-and-data`
6. `05-domain-and-intelligence`
7. `06-design-system-and-copy`
8. `07-architecture-garden`
9. `08-verification`
10. `99-final-review-handover`

Domain-specific phases may augment this set but must not replace it.

Feature slices are explicitly expandable. For small scopes, `03-feature-slices` may be one umbrella phase containing the selected slices. For medium or large scopes, keep `03-feature-slices` as the slice index/contract phase and add N dependency-ordered slice phase files after it, such as `03-feature-slice-001-<slice-id>.md`, `03-feature-slice-002-<slice-id>.md`, and `03-feature-slice-NNN-<slice-id>.md`. Each split slice must appear in `phase-index.yaml`, depend on the prior slice or `03-feature-slices`, embed its own `requires_roles` sections, and carry the reusable slice contract. Make `04-state-and-data` depend on the last included feature-slice phase, not blindly on the umbrella phase.

For non-product selected spines, replace the product-app `phase_order` with the matching concrete spine. Every listed phase must have a Markdown file, appear in `phase-index.yaml`, embed all `requires_roles`, and use mode-appropriate language:

- `developer_first_framework`: `01-adoption-contract`, `02-framework-seams`, `03-first-host-action`, `04-events-failures-observability`, `05-examples-and-docs`, `99-final-review-handover`.
- `reliability_first_service`: `01-service-goal-slo`, `02-state-machine-data-contracts`, `03-happy-transaction`, `04-retry-failure-recovery`, `05-observability-admin-controls`, `06-runbook-regression-verification`, `99-final-review-handover`.
- `automation_task_loop`: `01-task-contract`, `02-approval-and-inputs`, `03-first-task-run`, `04-stop-conditions-and-recovery`, `05-trace-and-handover`, `99-final-review-handover`.
- `data_pipeline_quality_loop`: `01-data-contracts`, `02-ingestion-and-lineage`, `03-transform-quality-loop`, `04-quality-gates-and-recovery`, `05-output-reproducibility`, `99-final-review-handover`.
- `infrastructure_operations_loop`: `01-operation-contract`, `02-plan-apply-boundaries`, `03-health-and-drift`, `04-rollback-and-recovery`, `05-runbook-and-release-gates`, `99-final-review-handover`.
- `mixed`: declare each phase's concrete mode in `phase-index.yaml` and use the relevant spine phases for each mode rather than a single product-app sequence.

Include conditional hardening phases in `phase_order` when posture or source signals require them:

- `09-auth-and-tenancy`
- `10-observability-and-health`
- `11-deployment-and-operability`
- `12-ci-and-release-gates`
- `13-backup-and-recovery`
- `14-security-and-abuse-controls`

For `trusted_local`, keep these as `included_blocked` with the unlock reason. For `private_authenticated` and `public_webapp`, mark the applicable hardening phases `included` unless a real external blocker requires `blocked`.

### 03-phases/phase-flow.md

Use typed artifact phase flow:

1. Read the phase and restate product intention.
2. Build the smallest real usable slice.
3. Improve the obvious next consumer action if local, safe, and central.
4. Run relevant checks.
5. Remove visible slop.
6. Record only useful handover facts.

### Phase files

Each phase should include:

- `# Phase NN — <title>`
- `requires_roles: [<role ids>]`
- `## Product intention`
- `## Mapped obligations`
- `## Stable vs free`
- `## Implementation scope`
- `## Interfaces touched`
- `## State / runtime touched`
- `## UX / DX / operator requirements` (when relevant)
- `## Required output (<capsule>)`
- `## Blocks (<capsule>)`
- `## Quality bar`
- `## Do not ship`
- `## Repair routing`
- `## Unlock condition`

For product-app packets, phase files must preserve the Buildprint phase meanings:

- `00-product-system-alignment`: product promise, users, primary loops, feature map, state model, architecture boundaries, quality bar.
- `01-shell-and-navigation`: routes/views, app shell, global states, permissions, empty/loading/error states.
- `02-core-loop-first`: one complete user loop that proves the product end to end.
- `03-feature-slices`: vertical feature slices across UX, state, data, domain, tests, and handover; not pages, endpoints, or broad shallow panels. This can be one umbrella phase or an index/contract followed by N split slice phase files.
- `04-state-and-data`: state machines, persistence, sync/cache, import/export, recovery.
- `05-domain-and-intelligence`: domain model, evidence grounding, provider boundaries, actionability.
- `06-design-system-and-copy`: visual quality, components, copy quality, progressive disclosure.
- `07-architecture-garden`: module boundaries, refactor budget, dependency rules, test strategy.
- `08-verification`: user journeys, smoke/regression tests, screenshot review, release gates.

When writing `03-feature-slices` or any split `03-feature-slice-NNN-*` file, include a reusable slice contract with: user loop, user-visible outcome, views/states, exact primary action, data/domain contracts, copy/evidence rules, tests/gates, and handover facts. Split slices when one feature-slices phase would hide sequencing, dependencies, blockers, or verification.

For non-UI modes, adapt language to the consumer/operator/developer experience: API, library, integration, automation, data pipeline, or infrastructure. Do not force UI language where the product surface is CLI/API/operator workflow.

Recommended phase spines:

- Buildprint Consumer-First product app: product-system alignment -> shell/navigation -> core loop first -> feature slices -> state/data -> domain/intelligence -> design/copy -> architecture garden -> verification.
- Developer-First framework/integration: adoption contract -> framework seams -> first host action -> events/failures/observability -> examples/docs -> contract/smoke verification.
- Reliability-First service: service goal/SLO -> state machine/data contracts -> happy transaction -> retry/failure recovery -> observability/admin controls -> runbook/regression verification.
- Automation task loop: task contract -> approval/input boundaries -> first real task run -> stop conditions/recovery -> trace/handover.
- Data pipeline quality loop: data contracts -> ingestion/lineage -> transform quality loop -> quality gates/recovery -> output reproducibility.
- Infrastructure operations loop: operation contract -> plan/apply boundaries -> health/drift -> rollback/recovery -> runbook/release gates.

### 04-review.md

Require skeptical product review:

- start fresh and complete the core loop;
- reload/read back state;
- change inputs and confirm outputs change;
- click primary controls or run documented commands/API calls/operator actions;
- trigger empty/error/blocked states where possible;
- run an operability walkthrough with explicit Do/Observe/Record steps for durable persistence, background task ownership, provider blocked-state honesty, dead-control detection, and posture-specific auth/session/tenant/CI checks;
- look for generic dashboard smell, fake intelligence, raw JSON dumped as the experience, placeholder copy, dead controls, undocumented public methods, fake adapter seams, canned output, internal/proof vocabulary, missing persistence/traces/readback, and absent next actions;
- fix local, safe, central defects before handover.

### 05-handover.md

Require short headings:

- Current status;
- Built surfaces;
- Verification;
- Known defects and blockers;
- Not production-grade (mandatory for trusted_local; blocker-only for non-local);
- Next atomic actions;
- Continue from here (a numbered options menu: continue one phase, continue to checkpoint, do all remaining phases, or stop). Every handover must end with this menu so the developer always has a concrete choice instead of a vague "continue".

### generated/agent-prompt.md

Write alignment speech only. It must say it is not a checklist and not authority. It should position the agent as a senior product/developer/operator engineer and warn against generic dashboards, decorative artifacts, raw JSON product surfaces, fake provider success, canned output, dead buttons, placeholder copy, swallowed errors, debug/proof vocabulary in user/operator surfaces, and broad shallow panels.

## Anti-fix

Do not preserve old proof-heavy vocabulary just to satisfy older expectations. If a checker expects an evidence ledger or phase-preflight proof artifact, update the checker instead of making the product packet dumber.
