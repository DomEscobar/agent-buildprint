# Phase 04 â€” Simulation Runtime Monitoring

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare the phase objective, write compact runtime artifact `.buildprint/phase-runs/<phase-id>/team-gates.md`, implement the first real vertical path, review architecture/UX/QA, verify, write proof, and record evidence. Create handoff/return files only when real delegation happens.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - ux-ui-craft
  - integration-runtime
  - data-persistence
  - security-boundary
  - test-and-verification

## Product outcome

Start, stop, monitor, and recover a Twitter/Reddit/parallel multi-agent simulation runtime, including action logs, round progress, process safety, and optional graph-memory updates.

## Mapped product obligations

Mapped surface IDs: SRC-006

Product obligations: OBL-004.

Mapped product obligations refs:
- /root/MiroFish/README.md:86-93 describes dual-platform parallel simulation and dynamic temporal memory updates.
- /root/MiroFish/backend/app/api/simulation.py:1451-1641 starts simulations with platform, max rounds, graph-memory update, force restart, and readiness checks.
- /root/MiroFish/backend/app/api/simulation.py:1644-1700 stops simulations and persists paused state.
- /root/MiroFish/backend/app/services/simulation_runner.py:196-205 states responsibilities for background OASIS runs, action parsing, realtime status, and stop/resume operations.

This packet is source-independent: use these observations to preserve product behavior, not to depend on the original repository at implementation time.

## Behavior compatibility contract

- Surface id: mapped surfaces listed in Mapped product obligations.
  - Disposition: preserve capability, target route/function names may differ.
  - Equivalent target behavior: preserve this phase's product outcome through cleaner target architecture where useful.
  - Compatibility impact: API/UX/data/provider behavior changes must be explicit; mapped route names are evidence, not mandatory parity.

## Implementation scope

1. Implement the smallest real source-independent vertical path for this capability.
2. Wire APIs/UI/runtime state to real implementation seams, not static fixtures or no-op controls.
3. Add required negative/failure-state tests.
4. Prove persistence/readback, provider/runtime boundaries, and browser/runtime behavior where claimed.
5. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl` using `phase_id: 04-simulation-runtime`.

Inputs:
- `simulation_id`
- `platform: twitter|reddit|parallel`
- `max_rounds`
- `enable_graph_memory_update`
- `force`

Outputs/downstream handoff:
- `runner_status`
- `current_round`
- `total_rounds`
- `actions counts`
- `recent actions`
- `process pid`

Downstream slices may rely on persisted identifiers, state transitions, provider-mode disclosure, and failure semantics proven here.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: identify and implement only those required by this phase.
- Provider/tool contracts: implement provider adapter/config/test seams before live proof; disclose deterministic, sandbox, or live mode where provider behavior is claimed.
- None â€” reason: only if this phase truly touches no interface boundary.

## State/runtime touched

Production runtime: define worker queue ownership, retry/cancel/failure recovery, progress persistence, restart behavior, and health/observability hooks when this phase touches async or runtime behavior.

Data lifecycle: define migrations, retention/delete/export, backup/readback, upload limits, object/file storage, and sensitive data handling when this phase touches durable state or uploads.

Stable obligations:
- Start, stop, monitor, and recover a Twitter/Reddit/parallel multi-agent simulation runtime, including action logs, round progress, process safety, and optional graph-memory updates.
- Inputs, outputs, failure states, persistence expectations, and proof gates are mandatory.

Free choices:
- Frameworks, database choices, graph provider, queue/worker implementation, and UI component libraries may vary if contracts and proofs pass.

Boundary requirements:
Provider-backed behavior must disclose whether it is deterministic-test-double, sandbox live, or production live. Secrets must remain in environment variables or secret stores and must never appear in logs, screenshots, reports, or ledger entries.

## UX/UI requirements

This phase must expose runtime monitoring as a simulation control room, not status text plus buttons.

- Show run state, platform, rounds, progress/timeline, recent actions, stop/recover controls, process/runtime mode, and graph-memory update state with clear hierarchy.
- Action logs should read as a timeline/activity feed with scannable agent, round, platform, and action type. Raw pale text rows are a visual-quality blocker.
- Preserve empty/no-simulation, loading/running, stopped, recovered, blocked-runtime, error, and success/completed states.
- Stop/recover must be clear, reversible, and safe.
- Screenshot critique: browser proof must include visual critique against the workbench UX quality contract in `02-project-setup.md`.

## Safety/security constraints

- Define and preserve auth/session/tenant/privacy boundaries appropriate to the product; do not omit them because the source boundary is implicit or credentials are missing.
- Never expose secrets in logs, UI, screenshots, reports, or evidence rows.
- Ask before destructive actions, external writes, paid providers, deployments, or irreversible migrations.
- Stop rather than claim implementation if proof depends only on mocks, placeholders, static UI, route-shaped stubs, or in-memory-only state where durability is claimed.
- Stop rather than claim live provider/runtime behavior from deterministic adapters; live credentials block live proof only after adapter/config/test/runtime wiring exists.
- Stop on secret exposure, destructive-action ambiguity, unreviewed upload/runtime surfaces, failed core local runtime/API proof, or missing persistence proof for state this phase owns. Missing live-provider, browser/e2e, screenshot, deployment, or external-service proof limits claim qualification; record a non-upgrading blocker with blocks_continuation: false and continue if the core phase path is implemented and locally proven.

## Quality gates

- Run the smallest meaningful typecheck/lint/test/build gate for changed files.
- Add or update tests for changed behavior and failure states.
- For UI-facing behavior, provide repeatable browser/e2e proof plus screenshot or DOM evidence, or an honest blocker for unavailable browser tooling.
- For persistence/provider behavior, prove readback and provider adapter/config/test behavior; record blockers only for unavailable live credentials, external services, or deployment authorization.

## Proof gate

- Proof id: proof-04-simulation-runtime
- Required proof tracks:
  - unit_or_integration_test
  - negative_test
  - browser_trace_or_runtime_trace
  - persistence_roundtrip
  - evidence_ledger_entry
  - browser_runtime_trace
  - ux_design_gate
  - visual_quality_gate
  - screenshot_state_set
  - provider_adapter_config_test_required
  - live_provider_proof_blocker_only
  - worker_retry_cancel_recovery
  - repeatable_browser_e2e
  - persistence_roundtrip
  - security_boundary_review
  - clean_room_implementation_trace
  - no_fake_scan_pass
Do not copy all proof tracks into one evidence row. Each runtime row must list only the proof labels backed by its commands and artifacts. Browser/e2e/screenshot, worker, data-lifecycle, security, and live-provider claims require separate matching proof rows or non-upgrading blocker rows.

Live credentials, paid services, or external deployment approval may block live proof only after adapter/config/test/runtime wiring exists. Do not satisfy this phase with deterministic-only providers, screenshots-only UI proof, in-memory-only state, route-shaped handlers, or local MVP shortcuts.

- Negative tests: validation failure, provider/runtime failure where applicable, persistence/readback failure, and phase safety/security constraints and negative fixtures listed above.
- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl` in the implementation workspace
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`
- Evidence schema: `05-evidence/evidence-ledger.schema.json`

Required runtime evidence row must use `phase_id: 04-simulation-runtime` and write to `.buildprint/evidence/evidence-ledger.jsonl`.

## Repair routing

If this phase fails verification, return here before editing again. Re-read product outcome, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, and proof gate.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`
