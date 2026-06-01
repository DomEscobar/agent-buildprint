# Phase 06 - Final critical review and handover

## Phase mode contract

- phase_id: `06-final-review-handover`
- blueprint_mode: `product`
- phase_style: `outcome_flow`
- Depends on: `05-deep-interaction-console`
- Owned product surfaces: none. This phase reviews every surface owned by phases 01-05.
- Required proofs: `proof-final-critical-review`, `proof-anti-slop-pass`, `proof-handover-written`
- Proof gate: `proof-handover-written`

## Product outcome

The implementation does not end when the last feature phase compiles. It ends only after a harsh final review checks the whole storyboard/workbench flow, repairs local high-signal defects, records anti-slop findings, and writes `.buildprint/handover.md` for the next human or agent.

This phase is explicit so review and handover cannot disappear into prose.

## Implementation scope

1. Re-run the strongest local verification commands from `02-project-setup.md` and completed phase proofs.
2. Exercise the real product flow:
   - upload/intake and prompt setup;
   - graph/canvas or storyboard workbench behavior;
   - simulation environment setup;
   - runtime start/stop/retry/recovery paths;
   - report timeline generation and artifact readback;
   - deep interaction console and history restore;
   - persistence after reload/restart where locally possible.
3. Check empty, loading, error, blocked-provider, reload, and obvious-next-action states.
4. Run anti-slop review after tests/lint/build. Prefer `npx aislop scan --changes` when available; otherwise record an equivalent deterministic/manual scan.
5. Fix safe, local, central defects before handover: dead controls, placeholders, swallowed errors, hallucinated imports, generic dashboard leakage, mock-only product paths, canned outputs, or non-persistent core state.
6. Write `.buildprint/final-critical-review.md` with commands run, surfaces inspected, findings, fixes, and unresolved blockers.
7. Write `.buildprint/handover.md` with the required handover headings from `BUILDPRINT.md`.

## Interfaces touched

- All implemented browser surfaces and API/runtime boundaries.
- Provider adapters and blocked-provider states.
- Persistence/readback paths.
- `.buildprint/evidence/evidence-ledger.jsonl`.
- `.buildprint/final-critical-review.md`.
- `.buildprint/handover.md`.

## State/runtime touched

- Do not invent new product state unless fixing a discovered defect.
- Review and handover are runtime artifacts under `.buildprint/`, not packet edits.
- Evidence rows must point to actual command output or artifacts.

## UX/UI requirements

- Act like the product is trying to fool you.
- Click visible controls and verify they do real work or are honestly disabled/blocked.
- Reject generic dashboard/form/list leakage when the mapped product needs a storyboard/workbench experience.
- Record any unresolved UX gap with surface, user action, observed failure, owning phase, and blocker/fix.

## Safety/security constraints

- Do not expose secrets, uploaded private content, provider logs, or credentials in review artifacts.
- Do not deploy/publish or use live paid providers unless explicitly authorized.
- Missing credentials produce blocker evidence, not fake live proof.

## Quality gates

- Runnable setup/phase verification commands pass, or blockers include exact failure output.
- `.buildprint/final-critical-review.md` exists and is concrete.
- Anti-slop scan/review exists and high-signal issues are fixed or blocked.
- `.buildprint/handover.md` exists and separates built, partial, blocked, and not-started work.
- Evidence ledger records final review, anti-slop pass, and handover proof/blockers.

## Proof gate

- `proof-final-critical-review`: final review artifact exists and cites commands/artifacts for reviewed surfaces.
- `proof-anti-slop-pass`: anti-slop scan/review output exists and findings are handled.
- `proof-handover-written`: `.buildprint/handover.md` exists with required headings and honest status.

This phase reaches `phase_core_passed` only when final review and handover are real artifacts. A summary message does not satisfy this phase.

## Repair routing

- Product defect -> owning feature phase, then rerun this phase.
- Missing/vague handover -> this phase.
- Credential/live-provider blocker -> evidence ledger and handover blocker section.
