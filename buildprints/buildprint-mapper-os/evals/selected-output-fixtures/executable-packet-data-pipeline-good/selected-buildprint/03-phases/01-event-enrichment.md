# Phase 01 — Event enrichment dataflow contract

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare the phase objective, resolve every role in `requires_roles` to `06-contracts/<role>.md`, write `.buildprint/phase-runs/<phase-id>/team-gates.md`, write bounded handoffs for every required role, use subagents/delegated workers when available or self-simulate when unavailable, write return artifacts for every required role, implement the first real vertical path, review architecture/UX/QA, verify, write proof, and record evidence.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - data-persistence
  - test-and-verification

## Capability outcome

Define and prove the event enrichment dataflow: input schema, transform semantics, output schema, lineage, backfill/idempotency, and data quality proof.

## Phase mode contract

- blueprint_mode: data-pipeline
- phase_style: dataflow_contract
- Lens: this phase defines the dataflow contract — input datasets/schemas, transform semantics, output artifacts, lineage, backfill/idempotency, and quality proof.
- Shared proof spine:
  - Preconditions/inputs: raw events in `events` table with id, type, payload, created_at.
  - Entrypoint/use site: pipeline runner reads input schema and executes the transform.
  - Execution behavior: validate input schema, apply enrichment transform, write to `enriched_events`, record lineage row.
  - State/artifact effects: `enriched_events` table, lineage record, quality assertion results.
  - Observable proof: schema validation test, transform proof with sample data, lineage assertion, data quality check.
  - Failure/recovery: invalid schema, missing fields, duplicate idempotency key, quality threshold failure.
  - Non-goals: serving API, UI, ML training.

## Mapped capability obligations

- Input schema: events(id, type, payload, created_at).
- Transform: enrich `type` with category lookup; add `enriched_at` timestamp.
- Output schema: enriched_events(id, type, category, payload, created_at, enriched_at).
- Lineage: append one lineage row per run recording source version, transform version, row counts.
- Backfill/idempotency: re-running the same run_id is idempotent; duplicate rows deduplicated.
- Data quality: row count matches input; no null category for known types.

## Behavior compatibility contract

- Disposition: preserve dataflow capability; transform implementation may differ.
- Equivalent target behavior: schema validation, transform, output schema, lineage, backfill/idempotency, data quality.
- Compatibility impact: mapped schema names are evidence, not mandatory column parity.

## Implementation scope

1. Implement schema validation for input events.
2. Apply enrichment transform with category lookup.
3. Write enriched output and record lineage row.
4. Add idempotency key and deduplication.
5. Run data quality assertions and append proof rows.

## Interfaces touched

- Provider/tool contracts: implement provider adapter/config/test seams before live proof; disclose deterministic, sandbox, or live mode where provider behavior is claimed.
- None — reason: only if this phase truly touches no interface boundary.

## State/runtime touched

- Define state and runtime ownership appropriate to this phase's mode.
- Use a real seam; do not fake success in any state only.
- Runtime artifacts/generated outputs: label explicitly as runtime artifact, not packet file.

## UX/UI requirements

This phase is not UI-bearing. Consumer or operator experience proof must include usage examples for empty, error, success, and recovery states. Screenshot critique: critique developer/operator experience against the experience quality contract in `02-project-setup.md`; visual proof is not required for this non-UI phase.

## Safety/security constraints

- Define and preserve auth/session/tenant/privacy boundaries appropriate to the mode.
- Never expose secrets in logs, UI, screenshots, reports, or evidence rows.
- Ask before destructive actions, external writes, paid providers, deployments, or irreversible migrations.

## Quality gates

- Run the smallest meaningful typecheck/lint/test/build gate for changed files.
- Add or update tests for changed behavior and failure states.
- For persistence/provider behavior, prove readback and provider adapter/config/test behavior; record blockers only for unavailable live credentials.

## Proof gate

- Proof id: proof-01-event-enrichment
- Required proofs: persistence_roundtrip, clean_room_implementation_trace, no_fake_scan_pass, provider_adapter_config_test_required, live_provider_proof_blocker_only, worker_retry_cancel_recovery, migration_retention_backup_upload_limits

adapter/config/test wiring exists before claiming live provider proof. Missing credentials block live proof only.

- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl` in the implementation workspace
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`

Required runtime evidence row must use `phase_id: 01-event-enrichment` and write to `.buildprint/evidence/evidence-ledger.jsonl`.

## Repair routing

If this phase fails verification, return here before editing again.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`

Do not continue to the next phase if the core path does not persist state, cannot be read back, has unresolved security/destructive ambiguity, or fails tests.

