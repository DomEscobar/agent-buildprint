# START_HERE

Build from this capability-packet v4, not from the original source repository.

## Current State

- Qualification: `SELECTED_UNQUALIFIED`
- Active capability: `03-capabilities/01-01-ingestion-ontology.md`
- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl`
- Immutable seed ledger: `09-evidence/evidence-ledger.jsonl`

## Before Coding

1. Read `blueprint.yaml` for the machine contract.
2. Read `PRE_IMPLEMENTATION_QUESTIONS.md`; ask only unresolved blockers, otherwise apply its safe defaults.
3. Read `02-context/team-stack.yaml` and execute the blocking team gates.
4. For UI-bearing work, read `02-context/ux-contract.md` and `02-context/design-quality-bar.md` before implementation.
5. Read only the active capability: `03-capabilities/01-01-ingestion-ontology.md`.

## Working Rules

- Do not claim live provider/runtime qualification from deterministic adapters.
- Do not claim persistence without restart/readback/delete/export proof where applicable.
- Do not claim UI proof from static labels or screenshots disconnected from real state.
- Record proof and blockers in `.buildprint/evidence/evidence-ledger.jsonl`.
- Stop on missing proof, secret exposure, destructive uncertainty, provider ambiguity, or no-fake failure.

## First Move

Implement and prove `03-capabilities/01-01-ingestion-ontology.md`. Only after proof or blocker rows close it honestly, consult `03-capabilities/capability-index.yaml` for the next dependency-ready slice.

Evidence ledger closure is required before any claim upgrade.
