# Phase 06 — History And Data Lifecycle

## Product outcome

Persist projects, files, extracted text, simulations, run states, reports, and history views with safe reset/delete/export/readback behavior.

## Source evidence

Source surface IDs: SRC-008

Product obligations: OBL-006.

Source evidence refs:
- /root/MiroFish/backend/app/models/project.py:101-280 persists project metadata, files, and extracted text under upload storage.
- /root/MiroFish/backend/app/api/graph.py:36-117 lists, gets, resets, and deletes projects.
- /root/MiroFish/backend/app/api/simulation.py:788-987 lists simulations and builds enriched history records.
- /root/MiroFish/backend/app/api/report.py:358-467 lists, downloads, and deletes reports.
- /root/MiroFish/backend/app/services/simulation_runner.py:231-305 reloads run state from disk.

This packet is source-independent: use these observations to preserve product behavior, not to depend on the original repository at implementation time.

## Implementation scope

1. Implement the smallest real source-independent vertical path for this capability.
2. Wire APIs/UI/runtime state to real implementation seams, not static fixtures or no-op controls.
3. Add required negative/failure-state tests.
4. Prove persistence/readback, provider/runtime boundaries, and browser/runtime behavior where claimed.
5. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl` using `capability_id: 06-data-lifecycle`.

Inputs:
- `project_id`
- `simulation_id`
- `report_id`
- `limit`
- `delete/reset confirmation`

Outputs/downstream handoff:
- `history records`
- `persisted metadata`
- `downloadable config/report`
- `deleted/reset state`
- `restart readback proof`

Downstream slices may rely on persisted identifiers, state transitions, provider-mode disclosure, and failure semantics proven here.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: identify and implement only those required by this phase.
- Provider/tool contracts: disclose deterministic, sandbox, or live mode where provider behavior is claimed.
- None — reason: only if this phase truly touches no interface boundary.

## State/runtime touched

Stable obligations:
- Persist projects, files, extracted text, simulations, run states, reports, and history views with safe reset/delete/export/readback behavior.
- Inputs, outputs, failure states, persistence expectations, and proof gates are mandatory.

Free choices:
- Frameworks, database choices, graph provider, queue/worker implementation, and UI component libraries may vary if contracts and proofs pass.

Boundary requirements:
Provider-backed behavior must disclose whether it is deterministic-test-double, sandbox live, or production live. Secrets must remain in environment variables or secret stores and must never appear in logs, screenshots, reports, or ledger entries.

## UX/UI requirements

Follow `02-context/ux-contract.md` and `02-context/design-quality-bar.md`. Any `browser_runtime_trace` proof must include `ux_design_gate` and `screenshot_state_set` coverage for the relevant empty/loading/error/blocked/success states, or an explicit blocker row.

## Safety/security constraints

- Preserve auth/privacy/tenant boundaries if present.
- Never expose secrets in logs, UI, screenshots, reports, or evidence rows.
- Ask before destructive actions, external writes, paid providers, deployments, or irreversible migrations.
- Stop rather than claim implementation if proof depends only on mocks, placeholders, static UI, route-shaped stubs, or in-memory-only state where durability is claimed.
- Stop rather than claim live provider/runtime behavior from deterministic adapters.
- Stop on secret exposure, destructive-action ambiguity, unreviewed upload/runtime surfaces, or missing browser/runtime evidence.

## Quality gates

- Run the smallest meaningful typecheck/lint/test/build gate for changed files.
- Add or update tests for changed behavior and failure states.
- For UI-facing behavior, provide browser/screenshot proof or an honest blocker.
- For persistence/provider behavior, prove readback/live mode or record a blocker.

## Proof gate

- Proof id: proof-06-data-lifecycle
- Required proof types:
  - unit_or_integration_test
  - negative_test
  - browser_trace_or_runtime_trace
  - persistence_roundtrip_or_blocker
  - evidence_ledger_entry
  - browser_runtime_trace
  - ux_design_gate
  - screenshot_state_set
  - provider_integration_proof_or_blocker
  - persistence_roundtrip_or_blocker
  - security_boundary_review_or_blocker
  - clean_room_implementation_trace
  - no_fake_scan_pass
- Negative tests: validation failure, provider/runtime failure where applicable, persistence/readback failure, and phase safety/security constraints and negative fixtures listed above.
- Runtime evidence ledger: `05-evidence/evidence-ledger.jsonl`
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`
- Evidence schema: `05-evidence/evidence-ledger.schema.json`

Required evidence row must use `phase_id: 06-data-lifecycle` and write to `05-evidence/evidence-ledger.jsonl`.

## Repair routing

If this phase fails verification, return here before editing again. Re-read product outcome, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, and proof gate.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `05-evidence/evidence-ledger.jsonl`
