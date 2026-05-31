# Prompt: Extract Selected Buildprint

Use this prompt when the user has selected a repo, candidate, feature set, or full-suite scope and wants a source-independent Buildprint packet.

## Mission

Emit a clean executable Buildprint that helps a future coding agent build a better product. Preserve source behavior and selected scope, but rewrite it as product obligations, not source-clone instructions.

The packet must shape product judgment before coding: mission, central artifact, first usable loop, persistence, provider/deployment boundaries, forbidden shortcuts, phase slices, skeptical review, and concise handover.

Do not emit evidence bureaucracy. Do not ask the implementing agent to prove quality with long ledgers. Local checks are useful; built product behavior is the standard.

## Required selected packet files

```text
BUILDPRINT.md
01-questions.md
02-project-setup.md
blueprint.yaml
03-phases/phase-index.yaml
03-phases/phase-flow.md
03-phases/01-<phase-id>.md
03-phases/99-final-review-handover.md
04-review.md
05-handover.md
generated/agent-prompt.md
```

Do not emit old routers or fragmented mini-files: `START_HERE.md`, `PRE_IMPLEMENTATION_QUESTIONS.md`, packet `AGENTS.md`, `03-capabilities/`, `04-interfaces/`, `05-state-runtime/`, `06-safety/`, `08-evaluation/`, `09-evidence/`, `manifest.json`, `capabilities/`, or per-capability YAML/proof files.

## Generation process

1. Identify the selected scope.
2. Name the primary user/operator.
3. Name the product promise.
4. Identify the central artifact or main work surface.
5. Identify the first usable end-to-end loop.
6. Identify state that must persist/read back.
7. Identify live-provider, credential, deployment, destructive, paid-service, and security boundaries.
8. Split implementation into a small number of usable slices.
9. Write each phase as product intention + build scope + quality bar + do-not-ship failures.
10. Add final review and handover.

## File guidance

### BUILDPRINT.md

Include:

- short product mission;
- read order;
- senior product engineer contract;
- how to use the packet;
- completion semantics and honesty rules.

Tone: direct and useful. Avoid protocol bloat.

### 01-questions.md

Ask only questions that change implementation. Prefer defaults for ordinary engineering choices.

Useful questions:

- primary user;
- central artifact;
- first usable loop;
- persistence/readback requirement;
- provider/deployment/destructive boundaries;
- what would make a 60-second screen recording embarrassing.

### 02-project-setup.md

Align the coding agent before code:

- role/mission/craftsmanship;
- product loop to make usable first;
- central artifact and why it is the right shape;
- state that must persist;
- live-provider/deployment boundaries to keep honest;
- fake-feel risk;
- local commands for build/test/smoke;
- product quality rules;
- forbidden shortcuts.

Do not turn this into a long architecture encyclopedia. The point is judgment, not compliance volume.

### blueprint.yaml

Use this shape and fill source-specific values where known:

```yaml
schema_version: mapper-os/executable-blueprint
execution_start: BUILDPRINT.md
machine_contract: blueprint.yaml
claim_status: product_build_required
qualification_label: local_build_requires_review
setup_tier: product_leadership
agent_contract:
  role: Senior Product Engineer
  rule: Build a usable product slice; do not produce proof theater.
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
  active_phase: 03-phases/01-<phase-id>.md
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

### 03-phases/phase-flow.md

Use product-led phase flow:

1. Read the phase and restate product intention.
2. Build the smallest real usable slice.
3. Improve the obvious next user action if local, safe, and central.
4. Run relevant checks.
5. Remove visible slop.
6. Record only useful handover facts.

### Phase files

Each phase should include:

- `# Phase NN — <title>`
- `## Product intention`
- `## Build`
- `## Quality bar`
- `## Do not ship`

For non-UI modes, adapt language to the consumer/operator experience: API, library, integration, automation, data pipeline, or infrastructure. Do not force UI language where the product surface is CLI/API/operator workflow.

### 04-review.md

Require skeptical product review:

- start fresh and complete the core loop;
- reload/read back state;
- change inputs and confirm outputs change;
- click primary controls;
- trigger empty/error/blocked states where possible;
- look for generic dashboard smell, fake intelligence, raw JSON, placeholder copy, dead controls, canned output, internal/proof vocabulary, missing persistence, and absent next actions;
- fix local, safe, central defects before handover.

### 05-handover.md

Require short headings:

- Current status;
- Built surfaces;
- Verification;
- Known defects and blockers;
- Next atomic actions.

### generated/agent-prompt.md

Write alignment speech only. It must say it is not a checklist and not authority. It should position the agent as a senior product engineer and warn against generic dashboards, decorative artifacts, raw JSON product surfaces, fake provider success, canned output, dead buttons, placeholder copy, swallowed errors, debug/proof vocabulary, and broad shallow panels.

## Anti-fix

Do not preserve old proof-heavy vocabulary just to satisfy older expectations. If a checker expects an evidence ledger or phase-preflight proof artifact, update the checker instead of making the product packet dumber.
