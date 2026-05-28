# Phase 01 — Webhook dispatch boundary transaction contract

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare the phase objective, resolve every role in `requires_roles` to `06-contracts/<role>.md`, write `.buildprint/phase-runs/<phase-id>/team-gates.md`, write bounded handoffs for every required role, use subagents/delegated workers when available or self-simulate when unavailable, write return artifacts for every required role, implement the first real vertical path, review architecture/UX/QA, verify, write proof, and record evidence.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - integration-runtime
  - security-boundary
  - test-and-verification

## Capability outcome

Implement and prove the webhook dispatch boundary: config/secrets, request/response, webhook/callback dispatch, idempotency, retry/error mapping, sandbox/live split, and fake-provider proof.

## Phase mode contract

- blueprint_mode: integration
- phase_style: boundary_transaction_contract
- Lens: this phase defines the external boundary transaction — config, webhook dispatch, idempotency, sandbox/live split, and fake-provider behavior.
- Shared proof spine:
  - Preconditions/inputs: provider API key and webhook secret in env; idempotency key per request.
  - Entrypoint/use site: service calls the webhook adapter with a typed event payload.
  - Execution behavior: validate config, build request, call fake/sandbox provider, dispatch webhook/callback, map errors.
  - State/artifact effects: idempotency key stored, webhook event dispatched, audit row recorded.
  - Observable proof: fake-provider tests prove request shape, response mapping, idempotency, error mapping, and webhook/callback dispatch.
  - Failure/recovery: missing config, duplicate idempotency key, and signature mismatch fail with typed errors.
  - Non-goals: product UI, deployment.

## Mapped capability obligations

- Config/secrets: `WEBHOOK_SECRET`, `PROVIDER_API_KEY`; fail-closed when missing.
- Request/response: typed WebhookEvent and result; error envelope for network/auth/rate-limit.
- Webhook/callback: verify signature, dispatch typed event, record audit row.
- Idempotency: per-request idempotency key required; duplicate key returns stored result without re-dispatching.
- Sandbox/live split: sandbox mode for tests; live mode requires credentials and approval.
- Retry/error mapping: typed retry on transient errors; permanent errors fail fast.

## Behavior compatibility contract

- Disposition: preserve boundary transaction capability; adapter internals may differ.
- Equivalent target behavior: webhook/callback dispatch, idempotency, error mapping, sandbox/live split.
- Compatibility impact: mapped adapter name is evidence, not a mandatory clone target.

## Implementation scope

1. Implement the webhook dispatch adapter with config, signature verification, and typed errors.
2. Add idempotency key handling.
3. Add sandbox/live mode split with fake-provider test doubles.
4. Run fake-provider proof and error-mapping tests.
5. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.

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

- Proof id: proof-01-webhook-dispatch
- Required proofs: persistence_roundtrip, clean_room_implementation_trace, no_fake_scan_pass, provider_adapter_config_test_required, live_provider_proof_blocker_only, worker_retry_cancel_recovery, migration_retention_backup_upload_limits

adapter/config/test wiring exists before claiming live provider proof. Missing credentials block live proof only.

- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl` in the implementation workspace
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`

Required runtime evidence row must use `phase_id: 01-webhook-dispatch` and write to `.buildprint/evidence/evidence-ledger.jsonl`.

## Repair routing

If this phase fails verification, return here before editing again.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`

Do not continue to the next phase if the core path does not persist state, cannot be read back, has unresolved security/destructive ambiguity, or fails tests.

