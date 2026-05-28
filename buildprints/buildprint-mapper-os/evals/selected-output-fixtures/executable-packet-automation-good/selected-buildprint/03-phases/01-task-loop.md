# Phase 01 — Document processing task loop contract

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
  - test-and-verification

## Capability outcome

Define and prove the document processing task loop: task objective, tool/action inventory, plan/execute/observe loop, stop conditions, human approval points, recovery/escalation, and trace proof.

## Phase mode contract

- blueprint_mode: automation
- phase_style: task_loop_contract
- Lens: this phase defines the task loop contract — objective, tool boundaries, plan/execute/observe loop, stop conditions, approval points, and trace proof.
- Shared proof spine:
  - Preconditions/inputs: input document list, max_iterations, approval_required flag.
  - Entrypoint/use site: agent runner receives task descriptor.
  - Execution behavior: plan action, select tool, execute tool, observe result, reflect, repeat until stop condition met.
  - State/artifact effects: task trace log, output artifact, approval checkpoint records.
  - Observable proof: trace proves loop execution, tool calls, stop condition trigger, and at least one approval point.
  - Failure/recovery: tool failure, max_iterations reached, approval rejected.
  - Non-goals: multi-agent coordination, deployment, UI.

## Mapped capability obligations

- Task objective: process input documents through the plan/execute/observe loop.
- Tool/action inventory: read_input, execute_transform, write_output.
- Plan/execute/observe loop: agent plans, executes tool, observes output, reflects.
- Stop conditions: all inputs processed; max_iterations reached; approval rejected.
- Approval points: before writing final output when approval_required is true.
- Recovery/escalation: on tool failure, retry once; on max retries, escalate with trace artifact.

## Behavior compatibility contract

- Disposition: preserve task loop capability; agent internals may differ.
- Equivalent target behavior: plan/execute/observe loop, stop conditions, approval points, trace proof.
- Compatibility impact: mapped agent name is evidence, not a mandatory clone target.

## Implementation scope

1. Implement the task runner with plan/execute/observe loop.
2. Add stop condition detection and max_iterations guard.
3. Add approval point with checkpoint record.
4. Run trace-based proof and stop-condition tests.
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

- Proof id: proof-01-task-loop
- Required proofs: persistence_roundtrip, clean_room_implementation_trace, no_fake_scan_pass, provider_adapter_config_test_required, live_provider_proof_blocker_only, worker_retry_cancel_recovery, migration_retention_backup_upload_limits

adapter/config/test wiring exists before claiming live provider proof. Missing credentials block live proof only.

- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl` in the implementation workspace
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`

Required runtime evidence row must use `phase_id: 01-task-loop` and write to `.buildprint/evidence/evidence-ledger.jsonl`.

## Repair routing

If this phase fails verification, return here before editing again.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`

Do not continue to the next phase if the core path does not persist state, cannot be read back, has unresolved security/destructive ambiguity, or fails tests.

