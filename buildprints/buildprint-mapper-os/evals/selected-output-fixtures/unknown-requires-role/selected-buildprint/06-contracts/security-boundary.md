# Security Boundary Contract

## When Active

Use this role for auth, sessions, tenant/user data, uploads, admin paths, secrets, destructive actions, payments, provider keys, public deployment, external writes, and privacy-sensitive flows.

## Handoff Scope

- Active phase safety/security constraints.
- `02-project-setup.md` auth/session/tenant, safety, and permissions decisions.
- Relevant request validation, permission checks, secret handling, destructive actions, and tests.

## Reject If

- Secrets or private data are copied into source, logs, generated artifacts, screenshots, or evidence.
- Destructive/admin/external actions lack permission checks, confirmation, audit semantics, or safe failure behavior.
- Public or multi-user posture is claimed without auth/session/tenant boundaries and denied-path tests.
- Uploads or user data lack size/type validation, retention/delete semantics, or exposure boundaries.

## Required Return Headings

- `## Verdict`
- `## Auth/session/tenant boundary`
- `## Secret and data exposure review`
- `## Destructive action review`
- `## Denied-path and invalid-input tests`
- `## Public deployment posture`
- `## Required repair before evidence`

## Proof/Evidence Expectations

Security review prose does not upgrade `security_boundary_review`. Upgrading evidence needs executable denied-path, invalid-input, destructive-confirmation, secret-redaction, or permission tests tied to the active phase.
