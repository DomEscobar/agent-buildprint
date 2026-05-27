# Phase 01 - Micro Chat UI Runtime

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare the phase objective, write compact runtime artifact `.buildprint/phase-runs/<phase-id>/team-gates.md`, implement the first real vertical path, review architecture/UX/QA, verify, write proof, and record evidence. Create handoff/return files only when real delegation happens.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

Fast-eval constraint: this packet is intentionally tiny. Do not build a CLI, HTTP server, worker daemon, Docker setup, or package-install path. Implement one dependency-free Node.js runtime plus one minimal interactive UI file such as `ui/chat.html` or `public/index.html`, then prove both with small local commands and write the runtime evidence ledger immediately after those proof commands pass.

The first ledger checkpoint is not phase completion. The phase core must prove a user action path: prompt input -> send action/controller -> provider seam -> durable conversation -> visible success/readback state. Static state cards, generic dashboards, or dead buttons fail this micro packet.

requires_roles:
  - product-architect
  - ux-ui-craft
  - integration-runtime
  - data-persistence
  - security-boundary
  - test-and-verification

## Product outcome

Implement one tiny AI chat workbench slice: accept a prompt, route it through a provider adapter, persist the conversation durably, expose readback, render the core chat UI states, and report unavailable live-provider/browser proof honestly.

## Source evidence

Source surface IDs: SRC-AI-MICRO-001.

Product obligations: provider seam, deterministic no-network fallback, persisted conversation readback, minimal chat UI states, negative provider/persistence paths, and evidence honesty.

Source evidence refs:
- eval-fixture/micro-ai-chat describes a local-first AI chat runtime with provider adapter, persistence, and no live-provider claim without runtime proof.

This packet is source-independent: use these observations to preserve product behavior, not to depend on a source repository at implementation time.

## Source surface dispositions

- Surface id: SRC-AI-MICRO-001 chat runtime.
  - Disposition: preserve capability, target route/function names may differ.
  - Equivalent target behavior: prompt -> provider adapter -> assistant response -> durable conversation -> readback.
  - Compatibility impact: implementation names may differ; this is not route/function parity.

## Implementation scope

1. Implement a minimal dependency-free Node.js chat module and proof script. Do not use Python or install packages.
2. Implement provider adapter/config/test seams before any live-proof blocker.
3. Implement durable local persistence and readback.
4. Implement one minimal interactive UI surface with empty, loading, error, blocked-provider, and success state markup. A runtime-only/API-only solution fails this UI micro packet.
5. Prove at least one local UI action/state-transition path through the UI/controller/runtime boundary.
6. Add negative tests for missing prompt, provider failure, malformed provider response, and persistence failure.
7. Attempt a browser/UX proof command. If browser tooling is unavailable, record a non-upgrading browser tooling blocker after proving the local interaction path.
8. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl` using `phase_id: 01-micro-chat-runtime` immediately after proof commands pass. Do not defer ledger writing until final summary.

Inputs: user prompt, optional conversation id, provider mode.

Outputs/downstream handoff: persisted conversation id, assistant response, provider-mode disclosure, UI state evidence, error state.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: identify and implement only those required by this phase.
- UI contract: one small static chat surface with visible state containers and provider-mode disclosure.
- Provider/tool contracts: implement provider adapter/config/test seams before live proof; disclose deterministic, sandbox, or live mode where provider behavior is claimed.
- None - reason: only if this phase truly touches no interface boundary.

## State/runtime touched

Production runtime: define worker queue ownership, retry/cancel/failure recovery, progress persistence, restart behavior, and health/observability hooks when this phase touches async or runtime behavior.

Data lifecycle: define migrations, retention/delete/export, backup/readback, upload limits, object/file storage, and sensitive data handling when this phase touches durable state or uploads.

Stable obligations:
- Provider behavior must come through a seam, not inline static text.
- Persistence must survive readback from a separate operation.
- Missing live provider must become a non-upgrading blocker, not a reason to omit provider wiring.
- `phase_core_passed` requires a local UI interaction/state-transition trace, not only static DOM hooks.

Free choices:
- Node.js module layout and command names may vary if proof gates pass. Python and package-install-based runtimes are out of scope for this micro eval.
- Keep file count minimal. A small provider module, store module, runtime module, one static UI file, proof/test scripts, no-fake scan, and required `.buildprint/phase-runs` artifacts are enough.

Boundary requirements:
Provider-backed behavior must disclose deterministic-test-double, sandbox live, or production live mode. Secrets must remain in environment variables or secret stores and must never appear in logs, screenshots, reports, or ledger entries.

## UX/UI requirements

This micro phase is UI-bearing. It must include a small chat surface with empty, loading, error, blocked-provider, and success states plus a real user action path. If browser tooling is unavailable, write a non-upgrading browser tooling blocker only after creating the UI file and running a local UI interaction/state-transition proof command. Runtime-only/API-only work fails this packet.

## Safety/security constraints

- Define local session ownership for persisted conversations.
- Never expose secrets in logs, UI, screenshots, reports, or evidence rows.
- Ask before external writes, paid providers, deployments, or irreversible migrations.
- Stop rather than claim live provider/runtime behavior from deterministic adapters; live credentials block live proof only after adapter/config/test/runtime wiring exists.
- Stop on failed core local runtime/API proof, missing provider seam, or missing persistence readback. Missing live-provider, browser/e2e, screenshot, deployment, or external-service proof limits claim qualification; record a non-upgrading blocker with blocks_continuation: false and continue if the core phase path is implemented and locally proven.

## Quality gates

- Run the smallest meaningful dependency-free Node test/build gate for changed files.
- Add tests for provider success/failure, persistence readback, and validation failure.
- Add a UI interaction/state-transition proof command that checks the chat control path and state updates.
- Run or create a no-fake scan.
- Provide repeatable browser/e2e proof plus screenshot or DOM evidence when tooling is available, or an honest non-upgrading blocker for unavailable browser tooling after the UI-state proof passes.

## Proof gate

- Proof id: proof-01-micro-chat-runtime
- Required proof tracks:
  - unit_or_integration_test
  - negative_test
  - browser_trace_or_runtime_trace
  - persistence_roundtrip
  - evidence_ledger_entry
  - ui_action_path
  - state_transition_proof
  - phase_core_passed
  - provider_adapter_config_test_required
  - live_provider_proof_blocker_only
  - worker_retry_cancel_recovery
  - repeatable_browser_e2e
  - security_boundary_review
  - clean_room_implementation_trace
  - no_fake_scan_pass
Do not copy all proof tracks into one evidence row. Each runtime row must list only the proof labels backed by its commands and artifacts. Browser/e2e/screenshot, worker, security, and live-provider claims require separate matching proof rows or non-upgrading blocker rows.

Live credentials, paid services, or external deployment approval may block live proof only after adapter/config/test/runtime wiring exists. Do not satisfy this phase with deterministic-only providers, screenshots-only UI proof, in-memory-only state, route-shaped handlers, or local MVP shortcuts.

- Negative tests: missing prompt, provider failure, malformed provider response, persistence failure, and phase safety/security constraints.
- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl` in the implementation workspace
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`
- Evidence schema: `05-evidence/evidence-ledger.schema.json`

Required runtime evidence row must use `phase_id: 01-micro-chat-runtime` and write to `.buildprint/evidence/evidence-ledger.jsonl`.

Evidence timing requirement: write the ledger directly after the local runtime/proof command passes, before optional cleanup, optional docs, or final response. A replay that proves behavior but times out before the ledger is still a failed replay. A replay with only `checkpoint_recorded` but no `ui_action_path`, `state_transition_proof`, and `phase_core_passed` row is still incomplete for this phase.

## Repair routing

If this phase fails verification, return here before editing again. Re-read product outcome, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, and proof gate.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`
