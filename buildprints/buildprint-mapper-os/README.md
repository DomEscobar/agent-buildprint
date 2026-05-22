# Buildprint Mapper OS

Use this Buildprint to map a source project into a source-independent Buildprint package.

Mapper OS is run by an agent. It reads source, records evidence, distills capability contracts, and produces either discovery output or a selected `selected-buildprint/` package.

## Start Here

Read:

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `PLAN.md`
5. `EXECUTION_PROTOCOL.md`
6. `VERIFICATION.md`

For generated selected packages, downstream implementers should not read all Markdown files upfront. They should read `BUILDPRINT.md`, `CURRENT_STATE.md`, `EXECUTION_PROTOCOL.md`, `PRE_IMPLEMENTATION_QUESTIONS.md`, `TEAM_STACK.md`, `CONTEXT_PACKET.json`, then only the active capability pack. `CAPABILITY_INDEX.md` is consulted after proof to choose the next dependency-ready pack.

## Default Behavior

- Discover first.
- Ask only blocking questions.
- Selected output must include a pre-implementation question gate so downstream agents ask or safely default the few decisions that change quality/security.
- Treat scanner output as hints only.
- Keep output discovery-only until scope is selected.
- Preserve requested scope; sequence implementation into slices, but do not hide broad/blocked/unproven capabilities.
- Produce capability packs for medium, large, and full-suite selected outputs.
- Emit implementation signals so the downstream harness can choose an appropriate builder team/passes without Mapper OS prescribing architecture.

## Selected Output

Selected output belongs under `selected-buildprint/`. New Mapper OS output should be an executable packet:

```text
BUILDPRINT.md
START_HERE.md
blueprint.yaml
00-intent/
01-operating-model/
02-context/
03-capabilities/
04-interfaces/
05-state-runtime/
06-safety/
07-execution/
08-evaluation/
09-evidence/
generated/
```

`BUILDPRINT.md` is a compatibility router. `blueprint.yaml` is the machine contract, `03-capabilities/` owns capability packets, `08-evaluation/` defines required proof, and `09-evidence/evidence-ledger.jsonl` records proof or blockers.

Legacy output remains valid during migration. Its spine is:

```text
BUILDPRINT.md
CAPABILITY_INDEX.md
CONTEXT_PACKET.json
CONTRACTS.md
VERIFICATION.md
EXECUTION_PROTOCOL.md
PRE_IMPLEMENTATION_QUESTIONS.md
IMPLEMENTATION_PLAN.md
CURRENT_STATE.md
manifest.json
capabilities/
```

Every included capability pack must contain `CAPABILITY.md`, `IMPLEMENTATION.md`, and `VERIFICATION.md`. `manifest.json` must match actual files and typo aliases such as `VERFICATION.md` are invalid.

## Qualification

Qualification is evidence-backed source-independent readiness. It is not perfection and not proof that a future implementation already works.
