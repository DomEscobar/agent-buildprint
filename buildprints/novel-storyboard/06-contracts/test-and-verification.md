# Test And Verification Contract

This role prevents implementation claims that cannot be proven. It owns the evidence ceiling rule, negative cases, no-fake pressure, phase-state classification, and claim upgrade review.

## When Active

Activate for every phase.

## Handoff Scope

The handoff must include the active phase file and proof gate, `04-evaluation.md`, `05-evidence/evidence-ledger.schema.json`, role returns, commands/tests/build/browser/runtime artifacts, and draft runtime evidence rows before append.

## Evidence Ceiling Rule

Claims cannot exceed evidence. Static text proves copy exists, not workflow behavior. Unit tests prove the named unit only. Mock provider proof proves contract shape, not live provider behavior. Screenshot proves rendering state, not backend persistence or security. API smoke tests prove the named API path only. Review prose permits or blocks evidence; it does not upgrade implementation proof by itself. A blocker row cannot upgrade a claim.

## Proof Ladder

- Setup/standards verdict: before Phase 01 proof, verify the Foundation scaffold gate exists, `engineering-standards.md` contains Clean code rules, Validation and schemas, Persistence standards, Provider standards, Worker/runtime standards, UI standards, and Test standards.
- UI workflow: interactive browser/e2e proof, or honest browser blocker plus local interaction/state-transition proof.
- Visual quality: screenshot set reviewed against UX contract and no blocking Screenshot critique.
- API behavior: route/API call with expected response and at least one failure/invalid-input case.
- Persistence: write/readback, restart/readback where applicable.
- Provider/runtime: adapter/config tests always; live proof only with credentials and authorized runtime.
- Worker/job: queue/job status, progress, retry, cancel, timeout, failure recovery, restart behavior.
- Security: denied-path, invalid-input, secret-redaction, destructive-confirmation, and permission tests.
- No fake: no_fake_scan_pass or targeted inspection for placeholders, fake success, no-op controls, mock-only promotion, and static UI shells.

## Phase State Rules

- `checkpoint_recorded`: evidence exists, but it may be an early proof or blocker.
- `phase_core_passed`: the first real local vertical path works end to end, role returns/reviews are complete, negative cases run, and evidence rows are scoped correctly.
- `claim_qualified`: the specific live, browser, visual, security, worker, deployment, or data lifecycle claim has matching proof.

## Reject If

- A phase is marked passed from code edits, static text, screenshots-only proof, review prose, generic smoke tests, or checkpoint-only evidence.
- Evidence rows include proof labels not backed by the row's command/artifact.
- A blocker row uses `upgrades_claim: true`.
- UI-bearing phase proof lacks a user action path through UI/controller/runtime and visible/readback state.
- Provider-backed phase proof lacks adapter/config/error tests before claiming live-proof blocker.

## Required Return Headings

The return file `.buildprint/phase-runs/<phase-id>/returns/test-and-verification.md` must use:

- `## Verdict`: pass | pass-with-scoped-debt | blocker
- `## Setup/standards verdict`
- `## Phase state supported`
- `## Commands run`
- `## What passed`
- `## Negative cases`
- `## What this does not prove`
- `## Evidence row check`
- `## Claim limits`
- `## Required repair before evidence`

## Proof/Evidence Expectations

The return must audit every proposed `upgrades_claim: true` row. It must reject rows whose `proves` array is broader than the named `source`, commands, and artifacts. Separate evidence rows are required for live-provider, browser/e2e, visual quality, worker recovery, data lifecycle, security, and deployment claims.
