# Phase 05 - Final critical review and handover

## Phase mode contract

- phase_id: `05-final-review-handover`
- blueprint_mode: `product`
- phase_style: `outcome_flow`
- Depends on: `04-report-interaction-console`
- Owned product surfaces: none. This is a required closeout phase over every surface already owned by phases 01-04.
- Required proofs: `proof-final-critical-review`, `proof-anti-slop-pass`, `proof-handover-written`
- Proof gate: `proof-handover-written`

## Product outcome

The implementation cannot end at the last feature phase. It must switch from builder mode into adversarial reviewer mode, inspect the whole MiroFish social simulation workbench, repair local high-signal defects, and produce a concise handover that tells the next human or agent what is actually built, what is blocked, and what to do next.

This phase exists so final review and handover are visible in phase lists, not buried as optional prose in `BUILDPRINT.md`.

## Implementation scope

1. Re-run the strongest local verification commands from `02-project-setup.md` and every completed phase proof file.
2. Exercise the product like a hostile reviewer:
   - create or reload a scenario;
   - inspect ontology output;
   - pan, zoom, select, drag, refresh, and inspect graph nodes/edges;
   - verify that graph behavior is not token bubbles, static SVG decoration, a card list, or raw JSON pretending to be a canvas;
   - run or replay simulation preparation/runtime paths;
   - generate or reload report artifacts;
   - use report-agent and simulated-agent interaction paths;
   - reload/restart where locally possible and confirm durable state.
3. Run anti-slop review after tests/lint/build. Prefer `npx aislop scan --changes` when available; otherwise document the deterministic/manual equivalent.
4. Fix local issues that are safe, central, and bounded. Do not leave dead buttons, placeholder copy, canned responses, swallowed errors, hallucinated imports, mock-only product paths, or non-persistent core state if they can be fixed locally.
5. Write `.buildprint/final-critical-review.md` with commands run, surfaces inspected, findings, repairs made, and unresolved blockers.
6. Write `.buildprint/handover.md` using the exact handover headings from `BUILDPRINT.md`.

## Interfaces touched

- Frontend workbench routes/components for final browser interaction checks.
- API/service endpoints used by intake, graph, simulation, report, and interaction flows.
- Provider adapters and blocked-provider states.
- Persistence files/database/restart behavior.
- `.buildprint/evidence/evidence-ledger.jsonl`.
- `.buildprint/final-critical-review.md`.
- `.buildprint/handover.md`.

## State/runtime touched

- No new product state should be invented here unless needed to fix a discovered defect.
- Review artifacts must be runtime artifacts under `.buildprint/`, not packet edits.
- Evidence rows must reference actual command output or artifacts, not reviewer vibes.

## UX/UI requirements

- The reviewer must actively try to break the visible product, not skim code.
- Any unresolved UI gap must name the surface, the user action, the observed failure, and the owning earlier phase.
- The graph workbench receives special scrutiny: meaningful graph semantics, canvas interactions, relationship inspection, state transitions, and downstream simulation effects must be present or honestly blocked.

## Safety/security constraints

- Do not print or commit secrets.
- Do not use live LLM/Zep/OASIS providers unless credentials and budget authorization already exist.
- Missing credentials produce blocked-provider evidence, not fake live proof.
- Do not publish/deploy unless the human explicitly asks.

## Quality gates

- All runnable setup/phase verification commands pass, or blockers are recorded with exact failure output.
- Final critical review artifact exists at `.buildprint/final-critical-review.md`.
- Anti-slop pass is recorded with command output or deterministic/manual checklist evidence.
- Handover exists at `.buildprint/handover.md` and is specific to the actual implementation state.
- Evidence ledger records final review, anti-slop, and handover proof/blockers.

## Proof gate

- `proof-final-critical-review`: `.buildprint/final-critical-review.md` exists and cites commands/artifacts for each reviewed surface.
- `proof-anti-slop-pass`: anti-slop scan or equivalent review output exists, and high-signal local residue is fixed or named as blocked.
- `proof-handover-written`: `.buildprint/handover.md` exists with the required headings and accurately separates built, partial, blocked, and not-started work.

This phase reaches `phase_core_passed` only when final review and handover are real artifacts. It cannot pass from a summary message alone.

## Repair routing

- Failed product behavior -> owning feature phase, then rerun this phase.
- Failed graph-workbench review -> `03-phases/02-graph-canvas-workbench.md`.
- Failed simulation/runtime review -> `03-phases/03-simulation-runtime-monitor.md`.
- Failed report/interaction review -> `03-phases/04-report-interaction-console.md`.
- Missing or vague handover -> this phase.
- Credential/live-provider blocker -> evidence ledger plus handover blocker section.
