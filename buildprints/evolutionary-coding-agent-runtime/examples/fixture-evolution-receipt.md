# Fixture Evolution Receipt

## Claim

claim_status: fixture_proven

This receipt proves the receipt shape for a tiny fixture. It does not prove host improvement or production safety.

## Baseline

- command: `npm run eval:fixture`
- baseline_score: 0.5
- baseline_passed: true

## Candidates

- candidate_count: 2
- winner_id: `cand_001`
- winner_score: 0.7
- failed_candidate: `cand_002`
- failed_candidate_reason: `sandbox_timeout`

## Sandbox Proof

- timeout_ms: 30000
- memory_mb: 1024
- network: disabled
- candidate_can_read_provider_keys: false
- bad candidate timed out and did not receive secrets

## Forbidden Mutation Proof

- forbidden_paths:
  - `.env`
  - `.env.*`
  - `deploy/**`
  - `billing/**`
  - `migrations/**`
- forbidden mutation rejection: pass

## Lineage Archive

- archive_path: `.buildprint/evolution/archive/evo_fixture_001.json`
- records_parent: true
- records_mutation_prompt: true
- records_patch: true
- records_score: true
- records_failure: true

## Baseline Versus Winner

- same_evaluator_settings: true
- beats_baseline: true
- repeated_run_required_for_host_claim: true

## No-Improvement Path

If no candidate beats baseline, the receipt must record:

- claim_status: not-proven
- winner_id: none
- no-improvement reason
- next evaluator or mutation-scope change

## Model Judge Boundary

Model-judge notes are advisory only. They cannot override deterministic evaluator score, sandbox failure, forbidden mutation rejection, or lineage receipt gaps.

## Not Proven

- host_proven
- improvement_proven on a real host
- production_safe
- autonomous self-modification

