# Phase 05 — Report And Deep Interaction

## Product outcome

Generate simulation reports with progress/sections/logs, download completed reports, and support chat with a report agent plus selected simulated-agent interview flows.

## Source evidence

Source surface IDs: SRC-007

Product obligations: OBL-005.

Source evidence refs:
- /root/MiroFish/README.md:86-93 lists report generation and deep interaction with the post-simulation environment.
- /root/MiroFish/backend/app/api/report.py:25-200 starts asynchronous report generation for a simulation and graph.
- /root/MiroFish/backend/app/api/report.py:277-467 retrieves, lists, downloads, and deletes reports.
- /root/MiroFish/backend/app/api/report.py:472-564 implements ReportAgent chat against simulation and graph context.
- /root/MiroFish/backend/app/services/report_agent.py:1-10 describes report planning, ReACT generation, tool use, and chat.

This packet is source-independent: use these observations to preserve product behavior, not to depend on the original repository at implementation time.

## Implementation scope

1. Implement the smallest real source-independent vertical path for this capability.
2. Wire APIs/UI/runtime state to real implementation seams, not static fixtures or no-op controls.
3. Add required negative/failure-state tests.
4. Prove persistence/readback, provider/runtime boundaries, and browser/runtime behavior where claimed.
5. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl` using `capability_id: 05-report-interaction`.

Inputs:
- `simulation_id`
- `force_regenerate`
- `message`
- `chat_history`

Outputs/downstream handoff:
- `report_id`
- `markdown_content`
- `progress`
- `sections`
- `agent_log`
- `chat response`
- `sources/tool_calls`

Downstream slices may rely on persisted identifiers, state transitions, provider-mode disclosure, and failure semantics proven here.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: identify and implement only those required by this phase.
- Provider/tool contracts: disclose deterministic, sandbox, or live mode where provider behavior is claimed.
- None — reason: only if this phase truly touches no interface boundary.

## State/runtime touched

Stable obligations:
- Generate simulation reports with progress/sections/logs, download completed reports, and support chat with a report agent plus selected simulated-agent interview flows.
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

- Proof id: proof-05-report-interaction
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

Required evidence row must use `phase_id: 05-report-interaction` and write to `05-evidence/evidence-ledger.jsonl`.

## Repair routing

If this phase fails verification, return here before editing again. Re-read product outcome, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, and proof gate.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `05-evidence/evidence-ledger.jsonl`
