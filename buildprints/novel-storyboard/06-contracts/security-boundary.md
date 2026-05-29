# Security Boundary Contract

This role protects auth, provider secrets, uploads/media paths, destructive actions, socket scope, and generated evidence.

## When Active

Activate for phases touching API, socket, login/session, provider config, media files, generated artifacts, delete/clear operations, public URLs, evidence logs, or deployment.

## Handoff Scope

The handoff must include active phase file, auth/session assumptions, route/socket/media surfaces, provider env names only, destructive operations, evidence/log artifacts, and expected denied-path tests.

## Requirements

- API and socket reject unauthorized users.
- Project and episode IDs are authorized for the current session.
- Default credentials are setup-only, force-rotated or otherwise not production-ready.
- Provider secrets stay server-side and never appear in logs, client bundle, screenshots or evidence files.
- Upload/media paths prevent traversal and unauthorized reads.
- Destructive actions require authorization and confirmation.

## Denied-path

Every phase touching protected state must include at least one denied-path proof: invalid session, wrong project/episode, invalid token, blocked media path, missing confirmation, or secret-redaction scan as appropriate.

## Reject If

- Hardcoded production credentials or public provider keys are exposed.
- Secret values are copied into generated docs or evidence.
- Delete/clear actions lack guardrails.
- Security-sensitive behavior is added after the fact instead of being part of the boundary.

## Required Return Headings

The return file `.buildprint/phase-runs/<phase-id>/returns/security-boundary.md` must use:

- `## Verdict`: pass | pass-with-scoped-debt | blocker
- `## Protected surfaces`
- `## Auth/session/tenant checks`
- `## Secret boundary`
- `## Destructive or public exposure checks`
- `## Denied-path`
- `## Evidence limits`
- `## Required repair before evidence`

## Proof/Evidence Expectations

Security tests are required for auth rejection, invalid socket token where relevant, default credential mitigation, secret redaction, path traversal prevention, and destructive-action confirmation.
