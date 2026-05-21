# PLAN

## Read Order

1. `BUILDPRINT.md`
2. `CAPABILITY_INDEX.md`
3. `CONTRACTS.md`
4. `PRE_IMPLEMENTATION_QUESTIONS.md`
5. `IMPLEMENTATION_PLAN.md`
6. `VERIFICATION.md`
7. `MAPPING_GATE_REPORT.md`
8. capability packs under `capabilities/*/`

## Implementation Roadmap

- Resolve `PRE_IMPLEMENTATION_QUESTIONS.md` or record safe max-quality defaults in `CURRENT_STATE.md`.
- Start with the first vertical slice from `IMPLEMENTATION_PLAN.md`.
- Preserve the full selected capability surface; do not drop capabilities because proof, provider access, Electron runtime, browser proof, persistence, or security hardening is difficult.
- After each milestone, update `CURRENT_STATE.md`, capability `VERIFICATION.md`, and root `VERIFICATION.md`.
- Keep qualification at `SELECTED_UNQUALIFIED` until proof ledger rows, topology proof, browser/runtime evidence, security hardening, and clean-room reversal evidence are closed.
