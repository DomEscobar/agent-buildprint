# Buildprint Mapper OS

Use this Buildprint to map a source project into a source-independent Buildprint package.

Mapper OS is run by an agent. It reads source, records evidence, distills product obligations, and produces either discovery output or a selected `selected-buildprint/` execution packet.

## Start Here

Read:

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `PLAN.md`
5. `VERIFICATION.md`

For generated selected packages, downstream implementers should not read all Markdown files upfront. They should read: `BUILDPRINT.md`, `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, then only the active phase named by the phase index.

## Default Behavior

- Discover first.
- Ask only blocking questions.
- Selected output must include `01-questions.md` so downstream agents ask or safely default the few decisions that change quality/security.
- Treat scanner output as hints only.
- Keep output discovery-only until scope is selected.
- Preserve requested scope; sequence implementation into proof-gated phases, but do not hide broad/blocked/unproven behavior.
- Produce executable Buildprint packets for medium, large, and full-suite selected outputs.
- Emit implementation signals so the downstream harness can choose an appropriate builder team/passes without Mapper OS prescribing architecture.

## Selected Output

Selected output belongs under `selected-buildprint/`. Mapper OS output must be an executable Buildprint:

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
```

`BUILDPRINT.md` is the execution start and read-order authority, `blueprint.yaml` is the machine contract, `01-questions.md` captures blocking/defaultable alignment, `02-project-setup.md` owns architecture/team/quality/AGENTS planning, `03-phases/` owns active vertical work packets, `04-evaluation.md` defines required proof, and `05-evidence/evidence-ledger.jsonl` seeds the writable runtime ledger at `.buildprint/evidence/evidence-ledger.jsonl`, where agents record proof or blockers.

Obsolete selected-output shapes are not accepted: root `CAPABILITY_INDEX.md`, `CONTEXT_PACKET.json`, `TEAM_STACK.md`, `UX_CONTRACT.md`, `DESIGN_QUALITY_BAR.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `IMPLEMENTATION_PLAN.md`, `manifest.json`, `02-context/active-slice.yaml`, `07-execution/phases/`, `capabilities/`, and per-capability mini-files.

## Qualification

Qualification is evidence-backed source-independent readiness. It is not perfection and not proof that a future implementation already works.
