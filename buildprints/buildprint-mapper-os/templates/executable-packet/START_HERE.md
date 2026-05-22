# Start Here

1. Read `blueprint.yaml`.
2. Read `02-context/context-map.yaml`.
3. Read `PRE_IMPLEMENTATION_QUESTIONS.md`; ask unresolved blockers or apply its safe defaults before coding.
4. Read `02-context/team-stack.yaml` and execute required team gates for the active capability.
5. If the active capability is UI-bearing, read `02-context/ux-contract.md` and `02-context/design-quality-bar.md`; these are blocking gates, not optional polish.
6. Read only the active capability packet named there.
7. Run or block the active proof contract.
8. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.

The packet is evidence-gated. `09-evidence/evidence-ledger.jsonl` is the immutable seed downloaded with the package; `.buildprint/evidence/evidence-ledger.jsonl` is the writable runtime evidence ledger. Claim promotion comes from runtime evidence rows, not from prose.
