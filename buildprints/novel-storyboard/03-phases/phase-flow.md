# Phase Flow

Run phases in index order unless a proof failure routes back to the current phase.

## Orchestration

The main coding session is the orchestrator/integrator. It may delegate bounded assignments, but every delegated result must return command output or artifact paths. A review, summary or handoff is not proof.

## Per-Phase Loop

1. Confirm prior phase evidence exists.
2. Read the active phase file and required role contracts only.
3. Implement a complete vertical outcome for the phase.
4. Run the named proof gate.
5. Record evidence in `.buildprint/evidence/evidence-ledger.jsonl` with `phase_id`.
6. If the proof gate fails, repair the current phase.
7. Advance `active_phase` only after proof and evidence recording.

For UI-bearing phases, proof must include product-quality review as well as runtime checks. A phase is not complete if the UI technically renders but the first viewport does not communicate a storyboard workbench with ordered shot frames, selected-frame detail, visible media/review states and unobstructed controls.

## Stop Rules

- Stop on missing irreversible/product-defining human decision.
- Stop on live provider credential need for live proof, but continue fake-provider contract proof.
- Stop on security finding that exposes secrets, bypasses auth, allows destructive action without confirmation or corrupts persisted data.
- Stop on static Canvas mock, in-memory-only persistence or provider fake counted as production behavior.
- Stop on generic dashboard, bare graph demo or card-only layout that satisfies data plumbing but fails the storyboard product-quality contract.
