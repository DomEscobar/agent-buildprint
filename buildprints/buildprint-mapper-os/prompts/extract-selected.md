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
    - UI-bearing -> `ux-ui-craft`
    - provider/runtime integration -> `integration-runtime`
    - durable state or restart/readback -> `data-persistence`
    - auth/uploads/destructive/admin/user-data/public exposure -> `security-boundary`
    - broad system refactor or many boundaries -> `product-architect`
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
    For `trusted_local`, include these as `INCLUDED_BLOCKED` with reason: `trusted_local posture -- promote to private_authenticated or public_webapp to unlock`.
15. Add final review and handover.

## File guidance

### BUILDPRINT.md

Include:

- short product mission;
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
- file/folder naming;
- minor layout/navigation choices;
- mainstream test/build tools for the selected stack.

Useful deferrable questions:

- advanced export formats;
- optional integrations;
- nice-to-have observability under trusted-local posture;
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
6. Design the base project architecture for remaining phases.
7. Require concrete setup artifacts in the implementation project:
   - `AGENTS.md` with product invariants, Buildprint authority, mandatory read order, ownership map, commands, forbidden shortcuts, evidence/blocker rules, and local `AGENTS.md` boundary rules;
   - `UI-IDENTITY.md` for UI-bearing artifacts, produced by an explicit UX/UI persona pass and defining visual identity, motion/interaction rules, clickable-control rules, layout/responsive/accessibility standards, component states, screenshot critique rubric, and forbidden generic UI patterns;
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
- future-agent rules;
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

This phase must not duplicate `02-project-setup.md`.

Despite the legacy phase id, its job is foundation skeleton implementation:

- consume `02-project-setup.md` and `.buildprint/setup-receipt.md`;
- create the real app/package/runtime skeleton;
- implement adapter stubs, persistence initialization, configuration loader, readiness/health/config surface, and first smoke command;
- for UI products, create the framework/design-system base and first domain-shaped screen states;
- for non-UI artifacts, create the first command/API/example skeleton;
- prove the base runs or fails with a precise blocker.

Do not write another alignment essay. Documentation-only completion is invalid for phase 00.

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

For `blueprint_mode.primary: product` / `selected_spine: product_app_consumer_first`, use the Buildprint v4 product-app phase sequence unless the user explicitly selected a smaller slice:

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

Include conditional hardening phases when posture or source signals require them:

- `09-auth-and-tenancy`
- `10-observability-and-health`
- `11-deployment-and-operability`
- `12-ci-and-release-gates`
- `13-backup-and-recovery`
- `14-security-and-abuse-controls`

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

For non-UI modes, adapt language to the consumer/operator/developer experience: API, library, integration, automation, data pipeline, or infrastructure. Do not force UI language where the product surface is CLI/API/operator workflow.

Recommended phase spines:

- Buildprint v4 Consumer-First product app: product-system alignment -> shell/navigation -> core loop first -> feature slices -> state/data -> domain/intelligence -> design/copy -> architecture garden -> verification.
- Developer-First framework/integration: adoption contract -> framework seams -> first host action -> events/failures/observability -> examples/docs -> contract/smoke verification.
- Reliability-First service: service goal/SLO -> state machine/data contracts -> happy transaction -> retry/failure recovery -> observability/admin controls -> runbook/regression verification.

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
