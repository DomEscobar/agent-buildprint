# Executable Packet — Quickstart

This packet is the implementation input for a coding agent. It replaces a sequential phase system with a small set of anchoring documents, vertically scoped slices, and posture-conditional gates.

## How the system lives

```
BUILDPRINT.md          Product intent — read first, never edit during a run
01-questions.md        Hard-stop questions — answer before any architecture decisions
02-architecture.md     One-time architecture session, produces repo foundation
03-ux-contract.md      Path map, personas, jargon contract, acceptance rows
slices/_template/      Template for every slice; instantiate per product surface
gates/                 Posture-conditional promotion checks (inactive at trusted_local)
04-handover.md         Filled by runner from slice/gate results; never written by agent
blueprint.yaml         Machine contract paths, posture, execution config
```

## Who writes what

| File | Written by |
|---|---|
| `BUILDPRINT.md` | Human / mapper-os extraction |
| `01-questions.md` | Human / mapper-os extraction |
| `02-architecture.md` | Architecture subagent (product-architect capsule) |
| `03-ux-contract.md` | UX subagent (ux-ui-craft capsule), approved by human |
| `slices/X/slice.yaml` | Human or orchestrator, defines scope |
| `slices/X/build-brief.md` | Runner (`persona_inject`) — never manually authored |
| `slices/X/acceptance-spec.md` | Runner (`persona_inject`) — never manually authored |
| `slices/X/acceptance-result.json` | Acceptance subagent (acceptance-hostile-reviewer capsule) |
| `gates/*/result.json` | Auto-test or human signoff file |
| `state.json` | Runner (`state_derive`) — never written by agent |
| `04-handover.md` | Runner (`slice_status`) — never written by agent |

## Execution order

1. Answer `01-questions.md`. No unanswered hard-stop question may proceed.
2. Run architecture session: inject `templates/teams/product-architect.md` as system prompt.
3. Run UX contract session: inject `templates/teams/ux-ui-craft.md` as system prompt.
4. For each slice (in dependency order per `slice.yaml#depends_on`):
   a. Runner generates `slices/X/build-brief.md` via `persona_inject`.
   b. Fresh build subagent (capsule from `slice.yaml#persona`) builds the slice.
   c. Runner generates `slices/X/acceptance-spec.md` via `persona_inject`.
   d. Fresh acceptance subagent (`acceptance-hostile-reviewer` capsule) runs acceptance and writes `acceptance-result.json`.
   e. Runner derives `state.json` via `state_derive`.
5. Run active gates (per `gates/gate-index.yaml#active_when_posture`).
6. Runner fills `04-handover.md` via `slice_status`.

## Key rules

- **Agents never write `state.json`.** The runner derives it from evidence files only.
- **Build and acceptance are always separate subagent sessions.** The builder never writes the acceptance spec.
- **Every Blocks entry in a team capsule has a `drift_check` that runs mechanically.** Capsule self-check produces `slices/X/slice-self-check.yaml` before handoff.
- **Path Map is the single truth.** `03-ux-contract.md#paths` is the authoritative list; slices reference path ids, they never define them.
- **Operator acceptance is mandatory.** Every slice must have at least one OPERATOR acceptance row that the precomputed sample cannot satisfy.
- **Inactive gates must state why.** `gates/gate-index.yaml` requires `inactive_reason` for every gate that does not run.

## Runner tools

```bash
# Build a system prompt for a slice build session
python -m buildprint_runner persona_inject --slice slices/X/slice.yaml --role build

# Build a system prompt for an acceptance session
python -m buildprint_runner persona_inject --slice slices/X/slice.yaml --role acceptance

# Derive state.json from evidence
python -m buildprint_runner state_derive

# Run mechanical drift checks
python -m buildprint_runner drift_check

# Print readable status
python -m buildprint_runner slice_status
```

See `../../runner/README.md` for full usage.
