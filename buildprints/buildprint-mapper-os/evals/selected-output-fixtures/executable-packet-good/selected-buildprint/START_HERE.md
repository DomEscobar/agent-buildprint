# Start Here

1. Read `blueprint.yaml` for scope, claim status, obligations, capabilities, and promotion requirements.
2. Read `02-context/context-map.yaml` to identify the active capability. Then read `02-context/active-slice.yaml` as the consumption protocol: it lists the exact read-only files, writable runtime/evidence/artifact targets, deliverables, forbidden actions, and next-unlock rule.
3. Read `PRE_IMPLEMENTATION_QUESTIONS.md`; ask unresolved blockers or apply safe defaults.
4. Read `02-context/team-stack.yaml` and execute required team gates for the active capability.
5. If the active capability is UI-bearing, read `02-context/ux-contract.md` and `02-context/design-quality-bar.md`; these are blocking gates, not optional polish.
6. Read only that active capability packet under `03-capabilities/`.
7. Write proof or blockers to the runtime evidence ledger at `.buildprint/evidence/evidence-ledger.jsonl`.

Generated prompts are convenience output only. The evidence ledger controls qualification.
