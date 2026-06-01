# Phase 14 — Security and abuse controls

requires_roles: [security-boundary, product-architect, integration-runtime]

## Product intention

Prevent unsafe exposure and abuse in private/public deployments while preserving core product usability.

## Mapped obligations

- Define threat boundaries for auth, uploads, external calls, destructive paths, and user data.
- Define abuse controls: rate limits, payload limits, and unsafe-action confirmation.
- Define redaction and secret-handling rules for logs, reports, and exports.

## Stable vs free

- Stable: denied-path outcomes, abuse-limit behavior, and secret/data protection guarantees.
- Free: WAF/rate-limiter vendor, auth provider internals, and policy engine implementation.

## Implementation scope

- Add validation and size/type checks for untrusted inputs and uploads.
- Add rate limiting and request throttling for high-risk routes.
- Add explicit confirmation for destructive/admin operations.
- Add secret redaction rules for logs and exported artifacts.
- Add negative tests for abuse and denied-path behavior.

## Interfaces touched

- API validation and middleware boundaries.
- Upload/import surfaces.
- Admin/destructive control surfaces.
- Logging/export/reporting boundaries.

## State / runtime touched

- Abuse/rate-limit counters.
- Audit events for sensitive actions.
- Redaction and data exposure filters.

## UX / DX / operator requirements

- Denied/limited states use clear language and next actions.
- Operators can trace abuse events without exposing sensitive payloads.

## Required output (security-boundary)

- Sensitive boundaries and negative tests are explicit.
- Secret-name-only contracts and redaction rules are enforced.

## Blocks (security-boundary)

- Plaintext secrets in output/logs/screenshots.
- Destructive actions without permission/confirmation semantics.
- Public exposure with no abuse controls.

## Required output (integration-runtime)

- External writes are idempotent, retry-aware, and failure-visible.

## Blocks (integration-runtime)

- External side effects without confirmation or failure handling.

## Required output (product-architect)

- Threat boundaries appear in context/component/data-flow views.

## Blocks (product-architect)

- Security controls bolted on without owning system boundaries.

## Quality bar

Sensitive and public-facing paths fail closed, reveal no secret values, and surface abuse controls with actionable operator diagnostics.

## Do not ship

- Open upload endpoints with no validation.
- Unlimited destructive or cost-amplifying actions.
- Logs/reports that leak credentials or private user data.

## Repair routing

- security contradiction -> `02-project-setup.md`
- abuse-control failure -> current phase
- unresolved high-risk issue -> `04-review.md` and `05-handover.md`

## Unlock condition

Sensitive-path controls and abuse mitigations are verified by denied-path tests or are explicitly blocked with release-stop semantics.
