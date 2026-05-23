# Buildprint Mapper OS

Use this Buildprint to map a source project into a source-independent Buildprint package.

Mapper OS is run by an agent. It reads source, records evidence, distills product obligations, and produces either discovery output or a selected `selected-buildprint/` execution packet.

## Start Here

Read:

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `PLAN.md`
5. `EXECUTION_PROTOCOL.md`
6. `VERIFICATION.md`

For generated selected packages, downstream implementers should not read all Markdown files upfront. They should read: `BUILDPRINT.md`, `START_HERE.md`, `blueprint.yaml`, `02-context/context-map.yaml`, `PRE_IMPLEMENTATION_QUESTIONS.md`, `02-context/team-stack.yaml`, then only the active capability named by the context map. `03-capabilities/capability-index.yaml` is consulted after proof to choose the next dependency-ready slice.

## Default Behavior

- Discover first.
- Ask only blocking questions.
- Selected output must include a pre-implementation question gate so downstream agents ask or safely default the few decisions that change quality/security.
- Treat scanner output as hints only.
- Keep output discovery-only until scope is selected.
- Preserve requested scope; sequence implementation into capability packets, but do not hide broad/blocked/unproven behavior.
- Produce capability-packet packets for medium, large, and full-suite selected outputs.
- Emit implementation signals so the downstream harness can choose an appropriate builder team/passes without Mapper OS prescribing architecture.

## Selected Output

Selected output belongs under `selected-buildprint/`. Mapper OS output must be an capability-packet v4:

```text
BUILDPRINT.md
START_HERE.md
PRE_IMPLEMENTATION_QUESTIONS.md
blueprint.yaml
00-intent/
01-operating-model/
02-context/        # context-map, team-stack, UX contract, design quality bar
03-capabilities/
04-interfaces/
05-state-runtime/
06-safety/
07-execution/
08-evaluation/
09-evidence/
generated/
```

`BUILDPRINT.md` is a package overview. `START_HERE.md` is the execution start, `blueprint.yaml` is the machine contract, `02-context/` owns routing and team/UX gates, `03-capabilities/` owns active vertical work packets, `08-evaluation/` defines required proof, and `09-evidence/evidence-ledger.jsonl` seeds the writable runtime ledger at `.buildprint/evidence/evidence-ledger.jsonl`, where agents record proof or blockers.

Purged legacy selected-output shapes are not accepted: root `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `IMPLEMENTATION_PLAN.md`, `manifest.json`, `02-context/active-slice.yaml`, `07-execution/phases/`, `capabilities/`, and per-capability mini-files.

## Qualification

Qualification is evidence-backed source-independent readiness. It is not perfection and not proof that a future implementation already works.
