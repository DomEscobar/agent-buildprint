# Security Boundary Contract

This role owns auth, session, tenant, permissions, secrets, uploads, destructive actions, privacy, public deployment safety, and evidence redaction. It prevents "local only" assumptions from leaking into a product that will later hold user data or credentials.

## When Active

Activate for phases touching user data, auth/session/tenant boundaries, uploads, generated private artifacts, provider keys, admin actions, destructive actions, payments, external writes, public deployment, logs, screenshots, reports, or privacy-sensitive state.

If the phase is truly local-only, this role still records the local security posture and the point at which public or multi-user deployment would become blocked.

## Handoff Scope

The handoff must include:

- active phase safety/security constraints;
- `02-project-setup.md` auth/session/tenant, provider-key, deployment, and safety decisions;
- relevant routes, middleware, permission checks, secret access, upload handlers, destructive actions, logs, screenshots, tests, and evidence rows;
- security-sensitive role returns from integration/runtime and data persistence.

Do not ask this role to invent a business auth model if the product has not selected one. It must either enforce the selected model or record a product-defining blocker.

## Security Review Workflow

The return must identify:

- owner/session/tenant model used by this phase;
- trust boundaries: browser, API, worker, provider, storage, generated artifact, export, logs/evidence;
- secret names only, never secret values;
- denied-path behavior for unauthorized, cross-tenant, invalid, oversized, malformed, or destructive access;
- destructive action confirmation, audit semantics, reversibility, and safe failure behavior;
- upload/input validation, request-size/rate-limit posture, content-type handling, and storage exposure;
- data exposure in logs, reports, screenshots, generated files, exported artifacts, and evidence.

## Security Quality Bar

- Secrets must be read through explicit config/env boundaries and redacted in logs/evidence.
- Auth/session/tenant ownership must be visible at the API/domain boundary, not only in UI copy.
- Destructive actions need disabled state, confirmation, server-side permission check, and readback/audit where applicable.
- Uploads need type/size validation and safe parse errors before content reaches provider/runtime code.
- Evidence artifacts must not contain raw secrets, private documents, personal data, or provider responses that the user did not approve sharing.

## Reject If

- Secrets or private data are copied into code, logs, generated artifacts, screenshots, reports, or evidence.
- Destructive/admin/external actions lack permission checks, confirmation, audit semantics, or safe failure behavior.
- Public or multi-user posture is claimed without auth/session/tenant boundaries and denied-path tests.
- Uploads or user data lack type/size validation, retention/delete semantics, or exposure boundaries.
- Security review prose is used to upgrade `security_boundary_review` without executable Denied-path or invalid-input proof.
- UI-only disabled states are used as the only permission boundary.
- A provider key, token, file path, or user document is hardcoded into tests or examples.

## Required Return Headings

The return file `.buildprint/phase-runs/<phase-id>/returns/security-boundary.md` must use:

- `## Verdict`: pass | pass-with-scoped-debt | blocker
- `## Auth/session/tenant boundary`
- `## Secret and data exposure review`
- `## Destructive action review`
- `## Upload/input boundary`
- `## Denied-path and invalid-input tests`
- `## Public deployment posture`
- `## Evidence redaction`
- `## Required repair before evidence`

## Proof/Evidence Expectations

Security claims need executable proof: Denied-path tests, invalid-input tests, destructive-confirmation tests, secret-redaction checks, permission checks, upload-boundary tests, or explicit public-deployment blockers.

Review-only artifacts default to `upgrades_claim: false`. A security review can block evidence, but it cannot qualify security without matching executable proof.
