# Phase 01 — Define record ingest primitive and composition contract

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare the phase objective, resolve every role in `requires_roles` to `06-contracts/<role>.md`, write `.buildprint/phase-runs/<phase-id>/team-gates.md`, write bounded handoffs for every required role, use subagents/delegated workers when available or self-simulate when unavailable, write return artifacts for every required role, implement the first real vertical path, review architecture/UX/QA, verify, write proof, and record evidence. Every role in `requires_roles` must produce a handoff and return artifact before `phase_core_passed`.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - test-and-verification

## Capability outcome

Define and prove the reusable record-ingest primitive: accept a record object, validate required fields, persist through a storage adapter, expose readback, and document composition rules for downstream applications.

## Phase mode contract

- blueprint_mode: framework
- phase_style: primitive_composition_map
- Lens: this phase is a framework primitive/composition contract, so it defines the primitive, invariants, reference patterns, extension points, invalid states, compatibility surface, and proof examples instead of one downstream product flow.
- Shared proof spine:
  - Preconditions/inputs: a consumer imports or calls the ingest primitive with record fields and a storage adapter.
  - Entrypoint/use site: SDK import, callable API, or CLI/demo calls the primitive and readback operation.
  - Execution behavior: enforce invariants, validate required fields, call storage adapter, expose readback, and surface typed errors.
  - State/artifact effects: persisted record, adapter write/read calls, validation/readback result, and traceable example output.
  - Observable proof: import/API/CLI tests and runtime evidence prove primitive usage, invalid states, adapter behavior, persistence, and readback.
  - Failure/recovery: missing fields, adapter failure, duplicate/idempotent write, and readback miss fail clearly; failed proof routes back to current phase.
  - Non-goals: downstream UI product flow, live providers, and worker lifecycle claims do not upgrade without matching adapter/runtime evidence.

## Mapped product obligations

- Capability obligation: OBL-INGEST-PRIMITIVE
- Mapped surface: SRC-INGEST-PRIMITIVE
- Mapped capability obligations: OBSERVED(api/records.ts:1-20) accepts record input and writes a stored result; compile this into a source-independent primitive, not route parity.

## Behavior compatibility contract

- Surface id: SRC-INGEST-API
  - Disposition: preserve primitive capability, target route/handler may differ.
  - Equivalent target behavior: expose primitive/import/callable usage, validate required fields, store durably through an adapter, expose readback, document invariants, composition rules, extension points, invalid states, and compatibility impact.
  - Compatibility impact: mapped route name is evidence, not a mandatory clone target or downstream app story.

## Implementation scope

1. Implement the smallest real primitive plus reference composition path.
2. Add validation and invalid-state handling.
3. Add storage adapter persistence readback.
4. Run import/API/CLI and proof gates.
5. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.

Inputs:
- Record fields passed by a consumer/import/callable API.
- Existing persisted adapter records for readback.

Outputs/downstream handoff:
- Stored record and adapter call artifact.
- Validation result and typed error contract.
- Readback result consumed by reference patterns or downstream applications.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: identify and implement only those required by this phase.
- Provider/tool contracts: implement provider adapter/config/test seams before live proof; disclose deterministic, sandbox, or live mode where provider behavior is claimed.
- None — reason: only if this phase truly touches no interface boundary.

## State/runtime touched

Production runtime: define worker queue ownership, retry/cancel/failure recovery, progress persistence, restart behavior, and health/observability hooks when this phase touches async or runtime behavior.

Data lifecycle: define migrations, retention/delete/export, backup/readback, upload limits, object/file storage, and sensitive data handling when this phase touches durable state or uploads.

- Use a real API/service/storage seam; do not fake success in UI state only.
- Validation must reject missing required fields.
- Persistence must be durable or explicitly blocked with a ledger row.
- Runtime artifacts/generated outputs: optional export runtime artifact `records.json`; do not use naked ambiguous file refs for future product files.

## UX/UI requirements

This phase is not UI-bearing by default. Keep the consumer-experience contract inline: proof must include import/API/CLI usage plus example output for empty input, validation error, storage blocked, success/readback, and recovery states. Browser screenshots are optional and do not upgrade framework claims unless this phase adds a UI demo.

- Build a real consumer path through import/API/CLI -> primitive -> adapter -> durable state -> readback.
- Screenshot critique: only for optional UI demos; otherwise critique developer/operator experience against the experience quality contract in `02-project-setup.md`; visual proof is not required for this non-UI framework phase.

## Safety/security constraints

- Define and preserve auth/session/tenant/privacy boundaries appropriate to the product; do not omit them because the source boundary is implicit or credentials are missing.
- Never expose secrets in logs, UI, screenshots, reports, or evidence rows.
- Ask before destructive actions, external writes, paid providers, deployments, or irreversible migrations.
- Stop instead of claiming persistence if restart/readback cannot run.
- Stop instead of claiming browser proof if screenshots/browser trace cannot be produced.
- Stop if source-independent implementation evidence is unavailable.

## Quality gates

- Run the smallest meaningful typecheck/lint/test/build gate for changed files and exported API/import compatibility.
- Add or update tests for changed behavior and failure states.
- For framework behavior, provide import/API/CLI proof plus reference examples; browser proof is required only if a UI demo is in scope.
- For persistence/provider behavior, prove readback and provider adapter/config/test behavior; record blockers only for unavailable live credentials, external services, or deployment authorization.

## Proof gate

- Proof id: proof-01-ingest-record
- Required proofs: import_api_contract_trace, cli_or_reference_example_trace, consumer_experience_gate, persistence_roundtrip, clean_room_implementation_trace, no_fake_scan_pass, provider_adapter_config_test_required, live_provider_proof_blocker_only, worker_retry_cancel_recovery, migration_retention_backup_upload_limits
Live credentials, paid services, or external deployment approval may block live proof only after adapter/config/test/runtime wiring exists. Do not satisfy this phase with deterministic-only providers, screenshots-only UI proof, in-memory-only state, route-shaped handlers, one downstream app story, or local MVP shortcuts.

- Negative tests: rejects missing required fields.
- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl` in the implementation workspace
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`

Required runtime evidence row must use `phase_id: 01-ingest-record` and write to `.buildprint/evidence/evidence-ledger.jsonl`.

## Repair routing

If this phase fails verification, return here before editing again. Re-read capability outcome, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, and proof gate.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`
