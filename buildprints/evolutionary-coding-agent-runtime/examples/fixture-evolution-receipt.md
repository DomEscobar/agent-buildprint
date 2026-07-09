# Fixture Evolution Receipt

## Claim

claim_status: fixture_proven
profile: patch-loop
source_alignment: agentic-eval-evolution-runtime Mode B (fixture only)

This receipt proves the receipt shape for a tiny fixture. It does not prove host improvement, evaluator protection in production, or autonomous self-modification.

## Baseline / Best Snapshot

- snapshot_ref: `snapshots/best_003`
- command: `npm run eval:local-tasks -- --split held_in`
- baseline_score: 0.5
- regression_count: 0

## Evaluator Integrity

- checksum_ref: `checksums/eval-harness.sha256`
- checksum_unchanged: true

## Patch Iterations

- iteration_count: 2
- promoted: `cand_001` → `snapshots/best_004`
- rolled_back: `cand_002` (unit_test_gate)
- failure_record captured for rollback iteration: true

## Gate Proof

- editable_surface_rejection: not exercised in this fixture (configured)
- unit_test_gate: pass (`cand_001`), rollback (`cand_002`)
- held_out_regression_gate: pass for promoted candidate
- sandbox: timeout/memory/network limits configured

## Lineage Archive

- archive_path: `.buildprint/evolution/archive/evo_fixture_001.jsonl`
- records_parent: true
- records_patch: true
- records_failure_record: true
- records_regression_count: true
- records_evaluator_checksum: true

## Best Snapshot Versus Baseline

- same_evaluator_settings: true
- beats_baseline: true
- repeated_run_required_for_host_claim: true

## No-Improvement Path

If no candidate beats baseline, the receipt must record:

- claim_status: not-proven
- best_snapshot_ref: unchanged
- no-improvement reason
- next task spec or editable-surface change

## Model Judge Boundary

Model-judge notes are advisory only. They cannot override deterministic evaluator score, unit-test gate, regression gate, evaluator checksum, or lineage receipt gaps.

## Research Evidence Boundary

External results (TDAD, DGM, AlphaEvolve, etc.) may appear in planning docs with evidence tags. They cannot appear as host proof in this receipt.

## Not Proven

- host_proven
- improvement_proven on a real host
- production_safe
- autonomous self-modification
- scaffold-self-improve profile
