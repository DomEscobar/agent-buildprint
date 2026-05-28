# Phase 01 — Service deployment operations contract

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare the phase objective, resolve every role in `requires_roles` to `06-contracts/<role>.md`, write `.buildprint/phase-runs/<phase-id>/team-gates.md`, write bounded handoffs for every required role, use subagents/delegated workers when available or self-simulate when unavailable, write return artifacts for every required role, implement the first real vertical path, review architecture/UX/QA, verify, write proof, and record evidence.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - security-boundary
  - test-and-verification

## Operation outcome

Define and prove the service deployment operations: deploy/apply entrypoint, resources changed, status-check, revert-note, change-note detection, logging-note, and environment proof.

## Phase mode contract

- blueprint_mode: infrastructure
- phase_style: operations_contract
- Lens: this phase defines the operations contract — deploy/apply, resources changed, status-check, revert-note, change-note detection, logging-note, and permissions.
- Shared proof spine:
  - Preconditions/inputs: cluster access; image tag; target namespace.
  - Entrypoint/use site: apply manifests or Helm install.
  - Execution behavior: apply Deployment, Service; wait for rollout; assert status-check.
  - State/artifact effects: Deployment revision bumped; status-check probe passes; revert-note available.
  - Observable proof: status-check probe response, rollout status, change-note-detection assertion.
  - Failure/recovery: rollout failure triggers revert-note; change-note detected and reported.
  - Non-goals: application feature development, product UI.

## Mapped operation obligations

- Deploy/apply entrypoint: apply manifests to target environment.
- Resources changed: Deployment, Service, ConfigMap in target namespace.
- status-check: status-check endpoint returns 200; status-check probe passes when dependencies ready.
- revert-note: previous revision retained; revert-note command documented and tested.
- change-note detection: diff tool detects undeclared changes; CI gate fails on change-note.
- logging-note: structured logs; metrics endpoint exposed; liveness/status-check probes configured.
- Permissions: deploy service account has namespace-scoped create/update/patch only.

## Behavior compatibility contract

- Disposition: preserve deployment operations capability; IaC internals may differ.
- Equivalent target behavior: deploy/apply, status-check, revert-note, change-note, logging-note.
- Compatibility impact: mapped manifest names are evidence, not mandatory parity.

## Implementation scope

1. Implement deployment manifests for Deployment, Service, and ConfigMap.
2. Add status-check probe endpoints.
3. Add revert-note capability with retained revisions.
4. Add change-note detection CI check.
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

- Proof id: proof-01-service-deploy
- Required proofs: persistence_roundtrip, clean_room_implementation_trace, no_fake_scan_pass, provider_adapter_config_test_required, live_provider_proof_blocker_only, worker_retry_cancel_recovery, migration_retention_backup_upload_limits

adapter/config/test wiring exists before claiming live provider proof. Missing credentials block live proof only.

- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl` in the implementation workspace
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`

Required runtime evidence row must use `phase_id: 01-service-deploy` and write to `.buildprint/evidence/evidence-ledger.jsonl`.

## Repair routing

If this phase fails verification, return here before editing again.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`

Do not continue to the next phase if the core path does not persist state, cannot be read back, has unresolved security/destructive ambiguity, or fails tests.

