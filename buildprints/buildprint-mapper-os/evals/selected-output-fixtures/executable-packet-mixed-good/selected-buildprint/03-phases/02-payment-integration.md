# Phase 02 — Payment provider integration boundary transaction

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare the phase objective, resolve every role in `requires_roles` to `06-contracts/<role>.md`, write `.buildprint/phase-runs/<phase-id>/team-gates.md`, write bounded handoffs for every required role, use subagents/delegated workers when available or self-simulate when unavailable, write return artifacts for every required role, implement the first real vertical path, review architecture/UX/QA, verify, write proof, and record evidence.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - integration-runtime
  - security-boundary
  - test-and-verification

## Capability outcome

Implement and prove the payment provider boundary: config/secrets, request/response, webhook/callback dispatch, idempotency, retry/error mapping, sandbox/live split, and fake-provider proof.

## Phase mode contract

- blueprint_mode: integration
- phase_style: boundary_transaction_contract
- Lens: this phase defines the integration boundary transaction — config, webhook, idempotency, sandbox/live split, and fake-provider proof.
- Shared proof spine:
  - Preconditions/inputs: provider API key and webhook secret in env; idempotency key per request.
  - Entrypoint/use site: service calls the payment adapter.
  - Execution behavior: validate config, build request, call fake/sandbox provider, dispatch webhook/callback, map errors.
  - State/artifact effects: idempotency key stored, webhook event dispatched, audit row recorded.
  - Observable proof: fake-provider tests prove request shape, idempotency, webhook/callback dispatch.
  - Failure/recovery: missing config, duplicate idempotency key, and signature mismatch fail with typed errors.
  - Non-goals: product UI, checkout flow (owned by phase 01).

## Mapped capability obligations

- Config/secrets: `PAYMENT_SECRET_KEY`, `PAYMENT_WEBHOOK_SECRET`; fail-closed when missing.
- Request/response: typed PaymentRequest and result; error envelope for network/auth/rate-limit.
- Webhook/callback: verify signature, dispatch typed event, record audit row.
- Idempotency: per-request key required; duplicate key returns stored result.
- Sandbox/live split: sandbox mode for tests; live mode requires credentials and approval.
- Retry/error mapping: typed retry on transient errors; permanent errors fail fast.

## Behavior compatibility contract

- Disposition: preserve payment boundary transaction capability.
- Equivalent target behavior: webhook dispatch, idempotency, error mapping, sandbox/live split.
- Compatibility impact: mapped adapter name is evidence, not a mandatory clone target.

## Implementation scope

1. Implement payment adapter with config, signature verification, typed errors.
2. Add idempotency key handling.
3. Add sandbox/live mode split with fake-provider test doubles.
4. Run fake-provider proof and error-mapping tests.
5. Append proof rows to `.buildprint/evidence/evidence-ledger.jsonl`.

## Interfaces touched

- Provider/tool contracts: payment adapter with deterministic sandbox and live modes.
- None — reason: no other interfaces for this phase.

## State/runtime touched

- Idempotency key store, webhook audit log.
- Provider config: `PAYMENT_SECRET_KEY`, `PAYMENT_WEBHOOK_SECRET`.

## UX/UI requirements

None — this phase is not UI-bearing. Operator experience proof includes config status, webhook audit log, and error map reference. Screenshot critique: critique operator experience against the experience quality contract in `02-project-setup.md`; visual proof not required for this non-UI phase.

## Safety/security constraints

- Never expose payment secrets in logs or evidence rows.
- Config fails closed when missing.
- Idempotency key required; duplicate key does not re-charge.

## Quality gates

- Fake-provider tests for dispatch shape, idempotency, error mapping.
- Config fail-closed test.
- No-fake scan.

## Proof gate

- Proof id: proof-02-payment-integration
- Required proofs: fake_provider_proof, provider_adapter_config_test_required, live_provider_proof_blocker_only, no_fake_scan_pass, security_denied_path_test, worker_retry_cancel_recovery, migration_retention_backup_upload_limits

adapter/config/test wiring exists before claiming live provider proof. Missing credentials block live proof only.

- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl`
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`

Required runtime evidence row must use `phase_id: 02-payment-integration` and write to `.buildprint/evidence/evidence-ledger.jsonl`.

## Repair routing

- test/build/runtime/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`
