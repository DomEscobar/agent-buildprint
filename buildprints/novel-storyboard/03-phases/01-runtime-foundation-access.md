# Phase 01 — Runtime Foundation And Access

## How to implement this phase

Read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md` before code edits. Execute through phase-flow: write `.buildprint/phase-runs/01-runtime-foundation-access/plan.md`, implement inside the scaffold, verify, write proof, then record evidence. Block evidence until phase-flow artifacts exist.

## Operation outcome

A user can launch the product, reach a polished authenticated shell, sign in, and see protected surfaces reject unauthenticated or invalid sessions. Empty setup, loading, auth error, expired session, and safe first-run states are visible without exposing secrets or claiming production readiness from default credentials.

## Phase mode contract

blueprint_mode: infrastructure

phase_style: operations_contract

Glance surfaces delivered: Runtime foundation and access

This phase uses an operations lens because it owns deploy/run entrypoints, health/readiness, rollback readiness, drift-aware configuration, and observability for the base runtime. It must prove the app can start, expose health, serve UI/API/media boundaries, and enforce auth before product workflows build on top.

## Mapped operation obligations

- Runtime launch, static/browser shell, API service, media serving, session/token boundary, seeded/admin migration risk, request size limits, and health/readiness.
- Security boundary for credentials, sessions, default account posture, denied paths, and CORS/origin policy.

## Behavior compatibility contract

Source route names are evidence anchors, not mandatory clone targets. Preserve user-visible login/access behavior, protected API denial, local media/static serving, and first-run setup clarity. Do not preserve plaintext default credentials as a production claim.

## Implementation scope

- Base app scaffold, routing shell, auth/session storage, protected route middleware, login/logout/session-refresh, first-run credential setup or secure migration.
- Health/readiness endpoint, structured logs, config/env validation, static/media serving boundary, request limits, and CI-start command.
- Browser shell with signed-out, signed-in, loading, invalid-token, and blocked-setup states.

## Interfaces touched

Browser auth shell, API auth/session controllers, config/env loader, static/media controller, health/readiness endpoint, logging/observability boundary.

## State/runtime touched

Owns users/sessions/token secrets, runtime config, health status, auth audit rows, and startup logs. Reads no upstream product data. Produces runtime artifacts under `.buildprint/phase-runs/01-runtime-foundation-access/`.

## UX/UI requirements

The auth shell must feel like an entry to a creative production workbench, with restrained density, clear errors, keyboard/focus states, and no generic admin template. Blocked setup must explain the exact next safe action.

## Safety/security constraints

No secret values in logs, screenshots, or evidence. Passwords must not be stored plaintext in production posture. Default credentials require forced change or local-only warning. Denied-path tests are mandatory.

## Quality gates

- Unit tests for auth/session validation and config parsing.
- Integration tests for login success/failure and protected API denial.
- Health/readiness command proof.
- Browser smoke for signed-out/signed-in shell.
- `verify:no-fake` and `PHASE_ID=01-runtime-foundation-access verify:phase-artifacts`.

## Proof gate

Required labels: `security_boundary`, `durable_persistence`, `no_fake`, `production_readiness`.

Commands must prove runtime starts, health/readiness passes, login works, invalid/missing token fails, and session survives reload. Record exact stdout or saved logs. If deployment authorization is absent, write a non-upgrading operations blocker only after local deploy/run proof exists.

## Repair routing

Auth, health, runtime, UI, or proof failure routes to this phase. Architecture contradiction routes to `02-project-setup.md`. Missing destructive/provider/deployment preference routes to `01-questions.md`.

