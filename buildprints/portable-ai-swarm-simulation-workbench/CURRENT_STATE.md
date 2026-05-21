# CURRENT_STATE

## Status

Qualification: `SELECTED_UNQUALIFIED`

Active capability: `capabilities/01-ingestion-ontology/`

## Read Next

Read `capabilities/01-ingestion-ontology/CAPABILITY.md`, then `IMPLEMENTATION.md`, then `VERIFICATION.md`.

Do not read unrelated capability packs upfront. Advance to the next pack only after the active capability has proof, a documented blocker, or an explicit scope decision.

## Current Blockers

- Live provider proof needs sandbox `LLM_API_KEY` and `ZEP_API_KEY` or explicit test-double-only scope.
- Runtime proof needs selected OASIS-compatible worker strategy.
- Persistence backend must be selected before restart/readback qualification.

## Next Action

Implement the first real vertical slice: upload fixture -> persisted project -> ontology adapter -> graph adapter -> graph UI proof.
