# SPEC: Buildprint Mapper OS

Mapper OS maps a source project into a source-independent implementation packet for coding agents.

## Core invariant

A selected Buildprint should make the downstream artifact better. It should shape product/developer/operator judgment before coding: artifact type, mission, central artifact/interface/boundary, first usable loop, boundaries, forbidden shortcuts, review, and handover. It must not replace that judgment with evidence bureaucracy or self-proof theater.

## Source handling

- Use a read-only source checkout or local source folder.
- Do not mutate source while mapping.
- Never copy secrets, private keys, tokens, cookies, production data, or secret values.
- Treat scanners as hints only.
- Promote source facts by reading behavior-relevant files.
- Preserve requested scope; do not silently shrink it.

## Selected packet requirements (v2 Slice/Gate)

A selected packet must contain:

```text
BUILDPRINT.md
01-questions.md
02-project-setup.md
02-architecture.md
03-ux-contract.md
blueprint.yaml
slices/
  _template/
    slice.yaml
    build-brief.md
    acceptance-spec.md
  <id>/                     ← at least one populated slice
    slice.yaml
    build-brief.md
    acceptance-spec.md
gates/
  gate-index.yaml
  <gate>.md                 ← per gate active under any allowed posture
04-handover.md              ← template; runner generates the populated handover
```

The packet ships alongside `templates/teams/*.md` capsule files (referenced by `slice.yaml#persona`) and is operated by `bin/agb.js` per `templates/runner/RUNNER-SPEC.md`.

Required properties:

- `BUILDPRINT.md` is the execution start and owns read order.
- `blueprint.yaml` declares `schema_version: mapper-os/executable-blueprint/v2`, `execution_start: BUILDPRINT.md`, `machine_contract: blueprint.yaml`, a qualification label, `deployment_posture` (with `current` and `allowed_values`), `agent_contract` (with the partial-not-complete rule), `slices_dir`, `gates_dir`, `capsules_dir`, and `state_json_path`.
- `01-questions.md` asks only implementation-changing questions.
- `02-project-setup.md` aligns artifact type, deployment posture, real consumer, first success loop, central artifact/interface/boundary, persistence/traces/readback, live-boundary honesty, fake-feel risks, commands, quality rules, and forbidden shortcuts.
- `02-architecture.md` defines the chosen stack, adapter seams, persistence model, and architecture invariants (the `product-architect` persona authors this).
- `03-ux-contract.md` provides the global Path Map (every user-facing path with id), copy quality bar, state language, and acceptance rows. Each path needs at least one row with `sample_can_satisfy: false` for OPERATOR validation.
- Each `slices/<id>/slice.yaml` declares `id`, `persona` (file reference into `templates/teams/`), `paths:` (subset of Path Map), `core_proof_required:` (subset of paths), and optional `depends_on:`.
- `gates/gate-index.yaml` declares each gate's `active_when_posture:` list and `requires_human_signoff:` flag.
- `04-handover.md` ships as a template; the runner fills it via `agb slice status` from the derived `state.json`.

## Forbidden selected-output shapes

Do not emit:

- the legacy v1 phase chain: `03-phases/`, `04-review.md`, `05-handover.md`, `generated/agent-prompt.md`, `99-final-review-handover.md`;
- obsolete router/scaffold files: `START_HERE.md`, `PRE_IMPLEMENTATION_QUESTIONS.md`, packet `AGENTS.md`, `03-capabilities/`, `04-interfaces/`, `05-state-runtime/`, `06-safety/`, `08-evaluation/`, `09-evidence/`, `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `IMPLEMENTATION_PLAN.md`, `manifest.json`;
- fragmented per-capability mini-files such as `capability.yaml`, `source-evidence.md`, `product-contract.md`, `implementation-workflow.md`, or `proof-contract.yaml`;
- agent-written `state.json` (must be derived by `agb state derive`).

## Quality constraints

Mapper OS should preserve:

- artifact type and real consumer;
- central artifact/interface/boundary and first successful loop;
- state/persistence/readback where required;
- provider, credential, deployment, paid-service, destructive, and security boundaries;
- mode-appropriate consumer/developer/operator experience;
- product language rather than packet/proof language;
- local runnable checks and manual/browser review where relevant.

Mapper OS should avoid:

- broad shallow dashboards;
- raw JSON as the main product surface;
- fake provider success;
- canned output unrelated to input;
- dead/no-op controls;
- proof vocabulary in user-facing, developer-facing, or operator-facing surfaces;
- self-scored evidence as a substitute for observable walkthrough behavior.

## Qualification labels

Use conservative labels. A packet can be `product_build_required` or `local_build_requires_review` before a downstream implementation exists. Do not claim validated production completeness from the packet alone.

## Anti-fabrication invariants

- A slice is `complete` only when every `core_proof_required` path has `upgrades_claim: true` in its `acceptance-result.json`. Blocked, sample-satisfied, or stale-contract paths force `partial`. No OR-escape.
- `state.json` is always written by `agb state derive`, never by an agent. `derived_by: "agb state derive"` is validated by `agb drift check`.
- Every acceptance session loads `agb persona --role acceptance`, which injects the `acceptance-hostile-reviewer` capsule from `templates/teams/`.
- Every build session loads `agb persona --role build`, which injects the slice's named capsule from `templates/teams/`.
- Every `acceptance-result.json` carries a `contract_version` hash of `03-ux-contract.md`; mismatch forces `stale`.
- Every path id in any `slice.yaml#paths` must exist in `03-ux-contract.md` Path Map.
- Gates with `requires_human_signoff: true` require a non-agent `signoff_by` value before the gate counts as `passed`.

## Validation philosophy

Checkers should catch structural breakage, stale references, missing required files, obsolete packet shapes, and obvious placeholder leakage. They should not reward long ledgers, claim taxonomies, or proof-shaped prose.
