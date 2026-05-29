# Phase 5 - Webapp Runtime, Auth And Deployment

## Phase mode contract

`blueprint_mode: product`

`phase_style: outcome_flow`

This phase proves the selected Canvas workbench runs as a deployable webapp with authenticated API/socket, static client, durable data and operational checks.

## Build target

Implement:

- browser app build and static serving;
- API service startup;
- socket service startup;
- login/session setup;
- first-run credential rotation or secure setup alternative;
- durable data directory/volume;
- health/readiness endpoint;
- deployment command or compose profile;
- source-to-build provenance for the frontend.

## Interfaces touched

- App startup command.
- Static frontend serving.
- Auth/session middleware.
- Docker or local deployment configuration.
- Health/readiness endpoint.
- Evidence commands.

## State/runtime touched

Runtime must use durable database and media storage. Restart must not reset user/project/episode/board state. Runtime config may use env var names only; no secret values in generated docs or logs.

## UX/UI requirements

- Login route and protected board route work in browser.
- Unauthorized API/socket requests fail clearly.
- First-run setup/credential rotation is visible and not confusing.
- Browser app loads directly from deployment URL without desktop shell.

## Safety/security constraints

Default credentials must not remain as production-ready state. JWT/session secret must be generated/configured securely. Static media serving must prevent path traversal and secret file access. Upload and destructive routes need authorization.

## Implementation loop

1. Wire build/start/deploy commands.
2. Implement auth/session and secure first-run setup.
3. Serve browser app and API/socket from deployment shape.
4. Add health/readiness and persistent volume.
5. Run build, start, browser login and restart smoke proof.

## Proof gate

- Build command passes.
- Start/deploy command starts webapp at documented URL.
- Browser test: login, open production board, reload, unauthorized route rejected.
- Restart test: state remains after service restart.
- Security tests: default credential rotation/setup, invalid token API/socket rejection, no secrets in client bundle/evidence.
- Evidence row: `phase_id=05-webapp-runtime`, `proof_type=production_readiness`.

## Repair routing

If deployment only starts backend API without browser app, repair this phase. If default credentials remain unmitigated, return to security boundary before claiming readiness.

## Stop condition

Stop if deployment requires external infrastructure not available locally. Record blocker and provide local proof instead.

## Unlocks

Unlocks evaluation promotion review. Claim remains `PROOF_REQUIRED` until all evaluation gates pass.
