# Phase 04 — Production Storyboard Flow

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare the phase objective, resolve every role in `requires_roles` to `06-contracts/<role>.md`, write `.buildprint/phase-runs/<phase-id>/team-gates.md`, write bounded handoffs for every required role, use subagents/delegated workers when available or self-simulate when unavailable, write return artifacts for every required role, implement the first real vertical path, review architecture/UX/QA, verify, write proof, and record evidence. Every role in `requires_roles` must produce a handoff and return artifact before `phase_core_passed`.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles: [product-architect, ux-ui-craft, integration-runtime, data-persistence, security-boundary, test-and-verification]


## Product outcome

Production Storyboard Flow

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Mode lens: this phase proves the product outcome flow for assembling and reviewing an ordered storyboard sequence from scripts and assets.
- Shared proof spine: preconditions are persisted script/assets; entrypoints are browser/API storyboard generation and board editing actions; execution behavior creates panels/scenes, supports edit/reorder/review state, and records panel provenance/provider mode; state effects include storyboard panels, order, notes, generated prompts/refs, status, and audit metadata; observable proof includes board interaction, persistence readback, responsive screenshot critique, and negative tests; failure/recovery covers missing assets, invalid reorder, provider errors, partial panels, retry, and restart readback.

## Mapped product obligations

Source surface IDs: SRC-FLOW, SRC-PRODUCTION-AGENT, SRC-STORYBOARD

Product obligations: OBL-STORYBOARD.

Mapped product obligation refs:
- `src/agents/productionAgent/index.ts` coordinates production planning.
- `src/agents/productionAgent/tools.ts` reads/writes flow data and storyboard artifacts.
- Production skills define storyboard table and storyboard panel behavior.
- `getFlowData`, `saveFlowData`, and storyboard routes persist flow/storyboard state.

This packet is source-independent: use these observations to preserve product behavior, not to depend on the original repository at implementation time.

## Behavior compatibility contract

- Source surfaces named in this phase: preserve unless `02-project-setup.md` explicitly records replace, merge, defer, or drop. Equivalent target behavior must preserve the user-visible capability, state/runtime ownership, and provider/security boundary without forcing route/function parity. Compatibility impact: source paths are evidence anchors only; target architecture may improve structure while keeping behavior and proof obligations.

## Implementation scope

1. Implement the smallest real source-independent vertical path for this capability.
2. Wire APIs/UI/runtime state to real implementation seams, not static fixtures or no-op controls.
3. Add required negative/failure-state tests.
4. Prove persistence/readback, provider/runtime boundaries, and browser/runtime behavior where claimed.
5. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl` using `phase_id: 04-production-storyboard-flow`.

Inputs:
- Inputs are defined by the product obligation and interface contracts.

Outputs/downstream handoff:
- Outputs are defined by the product obligation and interface contracts.

Downstream slices may rely on persisted identifiers, state transitions, provider-mode disclosure, and failure semantics proven here.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: identify and implement only those required by this phase.
- Provider/tool contracts: disclose deterministic, sandbox, or live mode where provider behavior is claimed.
- None — reason: only if this phase truly touches no interface boundary.

## State/runtime touched

Stable obligations:
- production agent creates director plan, storyboard table, and storyboard panel rows
- flow data persists and hydrates
- storyboard rows link to scripts/assets

Free choices:
- visual flow library
- storyboard row schema extensions
- panel layout implementation

Boundary requirements:
- Preserve provider, persistence, security, and no-fake boundaries from the package contracts.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. If not user-facing, write `None - reason:` and name downstream UI obligations.


Use the inline UX/UI requirements in this phase. Any `browser_runtime_trace` proof must include `ux_design_gate` and `screenshot_state_set` coverage for the relevant empty/loading/error/blocked/success states, or an explicit blocker row.

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

Additional production proof tracks:
- visual_quality_gate


- Proof id: proof-04-production-storyboard-flow
- Required proof types:
  - unit_or_integration_test
  - negative_test
  - browser_trace_or_runtime_trace
  - persistence_roundtrip_or_blocker
  - evidence_ledger_entry
  - browser_runtime_trace
  - ux_design_gate
  - screenshot_state_set
  - provider_adapter_config_test_required and live_provider_proof_blocker_only
  - persistence_roundtrip_or_blocker
  - security_boundary_review_or_blocker
  - clean_room_implementation_trace
  - no_fake_scan_pass
- Negative tests: validation failure, provider/runtime failure where applicable, persistence/readback failure, and phase safety/security constraints and negative fixtures listed above.
- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl`
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`
- Evidence schema: `05-evidence/evidence-ledger.schema.json`


Production-grade proof split:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for auth, ingestion, provider, script, storyboard, media, export, safety, and browser/API paths.

Required runtime evidence row must use `phase_id: 04-production-storyboard-flow` and write to `.buildprint/evidence/evidence-ledger.jsonl`.

## Repair routing

If this phase fails verification, return here before editing again. Re-read product outcome, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, and proof gate.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`
