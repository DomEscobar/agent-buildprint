# CURRENT_STATE

## Status

Qualification: `SELECTED_UNQUALIFIED`

Execution mode: `continuous-full-suite`

Continue after proof: yes

Stop only on: explicit blocker, missing proof, provider uncertainty, destructive safety issue, secret exposure, user interruption, or context/tooling limit.

Active capability: `capabilities/01-ingestion-ontology/`

## Read Next

Read `capabilities/01-ingestion-ontology/CAPABILITY.md`, then `IMPLEMENTATION.md`, then `VERIFICATION.md`.

Do not read unrelated capability packs upfront. In `continuous-full-suite` mode, advance to the next pack only after the active capability has proof, a documented blocker, or an explicit scope decision, then continue in the same session unless a stop condition applies.

## Current Blockers

- Live provider proof needs sandbox `LLM_API_KEY` and `ZEP_API_KEY` or explicit test-double-only scope.
- Runtime proof needs selected OASIS-compatible worker strategy.
- Persistence backend must be selected before restart/readback qualification.

## Next Action

Implement the first real vertical slice: upload fixture -> persisted project -> ontology adapter -> graph adapter -> graph UI proof.

After `capabilities/01-ingestion-ontology/` passes its proof gate, update verification ledgers, set the active capability to `capabilities/02-graph-builder/`, load only that pack, and continue.
