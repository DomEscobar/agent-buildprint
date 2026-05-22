# START_HERE

Build the workbench from this packet, not from the original source repository.

## Current State

- Qualification: `SELECTED_UNQUALIFIED`
- Active capability: `01-ingestion-ontology`
- Scope: full portable AI swarm simulation workbench
- Public URL concept: `https://agent-buildprint.com/buildprints/portable-ai-swarm-simulation-workbench/`

## Working Rules

- Ask `PRE_IMPLEMENTATION_QUESTIONS.md` only for decisions that change security, provider behavior, persistence, or UX scope.
- Use deterministic adapters for first-slice proof unless live LLM, graph-memory, and simulation runtime credentials are explicitly supplied.
- Do not claim live provider/runtime qualification from test doubles.
- Record proof and blockers in `.buildprint/evidence/evidence-ledger.jsonl`, seeded from `09-evidence/evidence-ledger.jsonl`.
- Stop on missing proof, secret exposure, destructive uncertainty, provider ambiguity, or no-fake failure.

## Consumption Protocol

Before coding, read `02-context/active-slice.yaml`. It is the exact active-slice contract: read only the listed slice files, write only runtime state/evidence/artifacts, and unlock the next capability only after proof and claim-upgrade rules pass.

## First Move

Implement `03-capabilities/01-ingestion-ontology/` enough to prove upload validation, text extraction, project persistence, ontology generation through a deterministic adapter, UI states, and negative tests. Then consult `03-capabilities/capability-index.yaml`.
