# Phase 06 - Deep Interaction, History, Security, and Operations

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: create the phase-flow required artifacts, resolve every role through `06-contracts/<role>.md`, write handoff and return artifacts for every role, implement, verify, review, write proof, and only then append runtime evidence to `.buildprint/evidence/evidence-ledger.jsonl`. The packet seed ledger `05-evidence/evidence-ledger.jsonl` is read-only context.

requires_roles:
  - product-architect
  - ux-ui-craft
  - integration-runtime
  - data-persistence
  - security-boundary
  - test-and-verification

## Product outcome

A user can interact deeply with report and simulated agents, inspect interview history and past runs, switch localized UI/API messages, and operate the full MiroFish workbench with hardened session ownership, config diagnostics, health checks, Docker/local deployment proof, and honest blockers for unavailable live infrastructure.

## Phase mode contract

- blueprint_mode: mixed
- phase_style: mixed_contract
- Lens: IPC automation, history/admin data surface, localization, security hardening, config/deployment operations, and UI interaction workbench.
- Shared proof spine: completed runtime/report -> interview IPC/chat/history/admin/config operations -> durable readback -> denied-path/deployment/locale proof.

## Mapped product obligations

- Own `ipc.interview-single`: optimized single-agent interview through IPC with platform selection.
- Own `ipc.interview-batch-all`: batch/all interview flows, validation, partial failure.
- Own `data.interview-history`: query history from platform DBs.
- Own `ui.interaction-view`: Step 5 report chat and simulation interview panels.
- Own `history.database`: home history of past runs enriched with project/report/run state.
- Own `i18n.localization`: English/Chinese UI and API messages.
- Own `security.public-local-posture`: replace public-local assumption with owner/session boundary before production claims.
- Own `config.env-runtime`: env names, config status, redaction, fail-closed providers.
- Own `deployment.local-docker`: local dev, Docker build/run, health/readiness, CI posture.

## Behavior compatibility contract

- Target disposition values are preserve for interviews, history, localization, config, deployment posture, and interaction UI; replace for public-local security posture.
- Equivalent target behavior preserves agent interaction, history, localization, and operations without route/function parity.
- Compatibility impact: production readiness cannot be claimed until auth/session/owner denied paths, config redaction, and deployment health are executable.

## Implementation scope

- Implement single, batch, and all-agent interview IPC commands with timeouts, partial failures, status, and transcripts.
- Persist and query interview history, past run history, stale/missing report states, filters, and limits.
- Implement interaction UI with report chat context, interview controls, history, blocked-runtime states, and localized messages.
- Add session/owner security boundary across projects, simulations, reports, runtime, downloads, deletes, interviews, history.
- Implement config diagnostics with env names only, secret scan, fail-closed provider status, health/readiness, Docker/local build/run, and CI gates.

## Interfaces touched

- IPC API/controllers, simulation runner IPC client, history repositories/read models, localization middleware/resources, security/session middleware, config/status APIs, health/readiness, Docker/CI, interaction/history UI.

## State/runtime touched

- Durable interview transcripts/history, enriched past-run records, locale preference, auth/session ownership, config status, health/readiness logs, deployment artifacts. Missing live providers, OASIS, or deployment authorization block live proof only after adapter/config/test/runtime wiring exists.

## UX/UI requirements

- UI must provide interaction panels, interview selectors, batch/all progress, history table/detail, localized errors, config/blocked states where relevant, responsive layout, and Screenshot critique against `02-project-setup.md`.

## Safety/security constraints

- Enforce session/owner checks on all prior surfaces before production claims, redact secret values, require destructive confirmations, block cross-owner downloads/history/interviews, record public deployment blocker if auth is incomplete.

## Quality gates

- IPC success/timeout/partial-failure tests; history DB query tests; locale browser/API tests; denied-path tests across owned surfaces; secret scan/config tests; build/run/health/readiness and CI proof.
- Browser e2e for report chat, interview, history, blocked-runtime states, locale switch, and admin/security states.

## Proof gate

Proof id: proof-06-interaction-history-admin

- phase_id: 06-interaction-history-admin
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e
- visual_quality_gate
- security_boundary_review
- deployment_health_readiness
- persistence_roundtrip
- no_fake_scan_pass

## Repair routing

- current phase: failed IPC, history, localization, security boundary, config, deployment, UI, or proof.
- `02-project-setup.md`: production security/deployment contradiction.
- `01-questions.md`: auth model, external deployment, or destructive policy fork.
- `.buildprint/evidence/evidence-ledger.jsonl`: non-upgrading live provider/OASIS/browser/deployment blockers.
