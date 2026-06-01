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

Ask only questions that change implementation. Prefer defaults for ordinary engineering choices.

Useful questions:

- deployment posture;
- execution cadence (`one_phase`, `to_checkpoint`, or `all_remaining`);
- primary user;
- central artifact, public interface, boundary transaction, service state, task, dataflow, or operation;
- first usable loop;
- persistence/readback requirement;
- provider/deployment/destructive boundaries;
- what would make a 60-second demo, terminal recording, API trace, or operator walkthrough embarrassing.

### 02-project-setup.md

Align the coding agent before code:

- role/mission/craftsmanship;
- first artifact-type loop to make usable: user loop, adoption loop, boundary transaction, service operation, task, dataflow, or infrastructure operation;
- central artifact and why it is the right shape;
- state that must persist;
- live-provider/deployment boundaries to keep honest;
- fake-feel risk;
- local commands for build/test/smoke;
- product quality rules;
- forbidden shortcuts.

Include posture-specific role and rule:

- `trusted_local` -> `Senior Product Engineer` with explicit non-production blocker reporting.
- `private_authenticated` -> `Senior Staff Engineer` with production-shaped obligations.
- `public_webapp` -> `Staff/Principal Engineer` with production-grade obligations.

Include a posture-independent product-craft floor as a quality class (not a vendor): for UI-bearing products a mainstream component/UI framework with a build step plus a real design/styling system; never a single-file hand-rolled HTML/CSS/JS shell, no raw internal ids or cryptic unlabeled controls on the surface; for non-UI artifacts the language-appropriate project/build/test structure. Posture changes operability only, never craft. Route `ux-ui-craft` into phase 00 for UI-bearing products.

Stack ownership (critical — do not let `02-project-setup.md` and `00-product-system-alignment.md` collide):

- `02-project-setup.md` sets guardrails only: the craft floor (quality class), integration constraints, and persistence/provider boundaries. It must NOT pick the concrete stack.
- `03-phases/00-product-system-alignment.md` owns the concrete stack/architecture choice, made inside those guardrails.
- Do not pin a backend language, framework, or library copied from the source as a decision in either file. Stack stays free and source-independent.
- Only when a preserved external dependency genuinely forces a stack (for example the graph-memory or simulation runtime is a Python library) state it as a reasoned, swappable constraint with an escape hatch (such as a sidecar), never as a bare "X service backend" decision.

Do not turn this into a long architecture encyclopedia. The point is judgment, not compliance volume.

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
