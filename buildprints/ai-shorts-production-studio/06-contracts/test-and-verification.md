# Test And Verification Contract

This role prevents implementation claims that cannot be proven. It owns the evidence ceiling rule, negative cases, no-fake pressure, phase-state classification, and claim upgrade review.

## When Active

Activate for every phase. This role is mandatory even for non-UI or non-provider phases because every phase can overclaim.

## Handoff Scope

The handoff must include:

- active phase file and proof gate;
- `04-evaluation.md`;
- `05-evidence/evidence-ledger.schema.json`;
- role returns from product architecture, UX, integration/runtime, security, and data persistence when present;
- commands/tests/build/browser/runtime artifacts created for this phase;
- draft runtime evidence rows before they are appended.

Do not ask this role to design the product. It audits whether the work can be honestly recorded and whether the phase may move from `checkpoint_recorded` to `phase_core_passed` or `claim_qualified`.

## Evidence Ceiling Rule

Claims cannot exceed evidence:

- Static text proves copy exists, not workflow behavior.
- Import/build success proves syntax/module load, not product behavior.
- Unit tests prove the named unit boundary only.
- Mock or deterministic provider proof proves contract shape and local adapter behavior, not live provider behavior.
- Screenshot proves rendering state, not backend/persistence/security behavior.
- Browser automation proves only the exercised user path and assertions.
- API smoke tests prove the named API path only, not browser quality or full product readiness.
- Review prose permits or blocks evidence; it does not upgrade implementation proof by itself.
- A blocker row can explain why qualification is unavailable, but it cannot upgrade a claim.

## Proof Ladder

- Setup/standards verdict: before Phase 01 proof, verify the Foundation scaffold gate exists, `engineering-standards.md` contains Clean code rules, Validation and schemas, Persistence standards, Provider standards, Worker/runtime standards, UI standards, and Test standards, and `test-strategy.md` maps each phase to deterministic blocker/e2e/runtime exit behavior.
- UI workflow: interactive browser/e2e proof, or honest browser blocker plus local interaction/state-transition proof.
- Visual quality: screenshot set reviewed against UX contract and no blocking Screenshot critique.
- API behavior: route/API call with expected response and at least one failure/invalid-input case.
- Persistence: write/readback, restart/readback where applicable, update/delete/export where owned.
- Provider/runtime: adapter/config tests always; live proof only with credentials and authorized runtime.
- Worker/job: queue/job status, progress, retry, cancel, timeout, failure recovery, restart behavior.
- Security: denied-path, invalid-input, secret-redaction, destructive-confirmation, and permission tests.
- Data lifecycle: migration/versioning, retention, export/delete/reset, upload limits, backup/readback where applicable.
- No fake: no_fake_scan_pass or targeted inspection for placeholders, stubs, fake success, no-op controls, mock-only promotion, route-shaped handlers, and static UI shells.

## Phase State Rules

- `checkpoint_recorded`: evidence exists, but it may be an early proof or blocker. This is not phase completion.
- `phase_core_passed`: the first real local vertical path works end to end, role returns/reviews are complete, negative cases run, and evidence rows are scoped correctly.
- `claim_qualified`: the specific live, browser, visual, security, worker, deployment, or data lifecycle claim has matching proof.

The return must explicitly say which of these states is supported and why.

## Reject If

- A phase is marked passed from code edits, static text, screenshots-only proof, review prose, generic smoke tests, or checkpoint-only evidence.
- Evidence rows include proof labels not backed by the row's command/artifact.
- A blocker row uses `upgrades_claim: true`.
- `no_fake_scan_pass`, `visual_quality_gate`, `security_boundary_review`, `worker_retry_cancel_recovery`, `migration_retention_backup_upload_limits`, browser/e2e, deployment, or live-provider labels appear without matching executable proof or non-upgrading blocker rows.
- UI-bearing phase proof lacks a user action path through UI/controller/runtime and visible/readback state.
- Provider-backed phase proof lacks adapter/config/error tests before claiming live-proof blocker.
- A broad test command is cited without naming the relevant subtest, artifact section, or assertion.

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

The return must audit every proposed `upgrades_claim: true` row. It must reject rows whose `proves` array is broader than the named `source`, commands, and artifacts.

Separate evidence rows are required for live-provider, browser/e2e, visual quality, worker recovery, data lifecycle, security, and deployment claims. A single all-purpose proof row is a failure unless the row's artifact truly contains every named proof track.
