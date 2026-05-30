# Phase 99 - Final critical review and handover

## Phase mode contract

- phase_id: `99-final-review-handover`
- blueprint_mode: `product`
- phase_style: `outcome_flow`
- Depends on: all feature phases in `03-phases/phase-index.yaml`
- Owned product surfaces: none. This phase reviews every previously owned surface.
- Required proofs: `proof-final-critical-review`, `proof-anti-slop-pass`, `proof-handover-written`
- Proof gate: `proof-handover-written`

## Product outcome

The implementation ends with a visible closeout phase, not an optimistic summary. The agent reviews the built product adversarially, fixes local high-signal issues, records anti-slop findings, and writes `.buildprint/handover.md` for the human developer.

## Implementation scope

- Re-run the strongest local verification commands from `02-project-setup.md` and completed phase proofs.
- Exercise the real product surfaces in browser/runtime where applicable.
- Check empty, loading, error, blocked, reload, persistence, and obvious next-action states.
- Look for placeholders, dead controls, canned output, generic dashboard/form/list leakage, mock-only product paths, swallowed errors, hallucinated imports, and missing persistence.
- Write `.buildprint/final-critical-review.md`.
- Write `.buildprint/handover.md` using the required headings in `BUILDPRINT.md`.

## Interfaces touched

- All implemented product surfaces and runtime boundaries.
- `.buildprint/final-critical-review.md`.
- `.buildprint/handover.md`.
- `.buildprint/evidence/evidence-ledger.jsonl`.

## State/runtime touched

No new product state should be invented unless fixing a discovered issue. Review and handover are runtime artifacts under `.buildprint/`.

## UX/UI requirements

Click and inspect the actual UI where the product has one. Review prose alone is not enough to upgrade claims.

## Safety/security constraints

Do not expose secrets, run destructive actions, publish, deploy, or use paid/live providers unless explicitly authorized.

## Quality gates

- Final review artifact exists and names commands/artifacts checked.
- Anti-slop review is recorded with command output or deterministic/manual equivalent.
- Handover exists and separates built, partial, blocked, and not-started work.

## Proof gate

- `proof-final-critical-review`: `.buildprint/final-critical-review.md` exists and cites concrete proof.
- `proof-anti-slop-pass`: anti-slop scan/review output exists and high-signal local residue is fixed or blocked.
- `proof-handover-written`: `.buildprint/handover.md` exists with required headings.

## Repair routing

- Product defect -> owning feature phase, then rerun this phase.
- Missing/vague handover -> this phase.
- External blocker -> evidence ledger and handover blocker section.
