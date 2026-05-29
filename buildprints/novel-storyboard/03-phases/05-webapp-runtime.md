# Phase 05 - Webapp Runtime, Auth And Deployment

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this current phase through `03-phases/phase-flow.md`: declare the phase objective in `.buildprint/phase-runs/<phase-id>/plan.md`, implement the first real authenticated runtime path inside the scaffold, verify, write `.buildprint/phase-runs/<phase-id>/proof.md`, and record evidence.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Mode lens: product outcome flow with shared proof spine.
- Glance surfaces delivered: Webapp runtime shell.
- Product implementation rule: preserve source-backed outcome flows through UI/API/domain/provider/persistence boundaries without copying source implementation code.

## Product outcome

The selected storyboard workbench runs as a deployable authenticated browser webapp with static client serving, API/socket runtime, durable database/media storage, health/readiness, login/session setup, restart proof, and screenshot-proofed production UI.

## Mapped product obligations

- Source path `app.ts` and README runtime sections mapped API/socket/static frontend serving.
- `02-project-setup.md` requires deployment and operations contract, auth/session/tenant boundary, durable persistence, browser/e2e contract, and Screenshot critique.
- Prior phases provide the board, persistence, agent loop, and media provider boundaries that runtime must serve.

## Behavior compatibility contract

- browser-webapp-runtime: preserve. Equivalent target behavior: browser app loads from deployment URL with API/socket and static assets.
- auth-session-boundary: preserve. Equivalent target behavior: login protects API/socket/media routes and default credentials are setup-only or rotated.
- deployment-shape: replace. Equivalent target behavior: local documented command or compose profile may differ from source but must prove build/start/restart.
- live-provider-runtime: defer. Equivalent target behavior: missing credentials produce explicit live-proof blocker after adapter/config/test/runtime wiring exists.

## Implementation scope

Wire browser build/static serving, API startup, socket startup, login/session setup, first-run credential rotation or secure setup alternative, durable data/media volume, health/readiness endpoint, deployment command/profile, source-to-build provenance, browser login/open-board flow, restart proof, and security checks.

## Interfaces touched

- App startup command.
- Static frontend serving.
- Auth/session middleware.
- API/socket service startup.
- Docker or local deployment configuration.
- Health/readiness endpoint.
- Evidence commands.

## State/runtime touched

Runtime must use durable database and media storage. Restart must not reset user/project/episode/board state. Runtime config may use env var names only; no secret values in generated docs or logs.

## UX/UI requirements

For UI-bearing work, apply `02-project-setup.md` visual and Screenshot critique requirements. Login route and protected storyboard board route work in browser. First-run setup/credential rotation is visible and not confusing. Unauthorized API/socket requests fail clearly. Desktop/narrow screenshots still read as a storyboard product, not a generic dashboard or local MVP.

## Safety/security constraints

Default credentials must not remain as production-ready state. JWT/session secret must be generated/configured securely. Static media serving must prevent path traversal and secret file access. Upload and destructive routes need authorization.

## Quality gates

- Build command passes.
- Start/deploy command serves browser app at documented URL.
- Browser test: login, open storyboard workbench, reload, unauthorized route rejected.
- Restart test: persisted state remains.
- Security tests: default credential mitigation, invalid token API/socket rejection, no secrets in client bundle/evidence.

## Proof gate

Additional production proof tracks:
- visual_quality_gate

Proof id: proof-05-webapp-runtime
Required proof types:
- production_readiness
- browser_runtime_trace
- durable_persistence
- security_boundary
- repeatable_browser_e2e
- visual_quality_gate
- no_fake_scan_pass
- evidence_ledger_entry

Production-grade proof split:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, media, worker/runtime, browser, deployment, and security paths.

Required runtime evidence row must use `phase_id: 05-webapp-runtime` for the current phase and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If this phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
