# Phase 14 - Security And Abuse Controls

requires_roles: [security-boundary, product-architect]

## Product intention

Block public exposure until uploads, provider costs, prompt/data handling, and destructive actions are controlled.

## Mapped obligations

- Enforce upload type, size, content scanning policy, and retention.
- Rate-limit expensive provider and simulation actions.
- Protect provider keys and graph-memory credentials.
- Confirm destructive graph/project/report deletes.
- Redact secrets from logs and reports.

## Stable vs free

Stable: no public claim without abuse and secret controls.

Free: specific security tooling.

## Implementation scope

Included but blocked under trusted-local posture.

## Interfaces touched

Upload API, provider adapter, graph-memory adapter, logs, delete/reset APIs.

## State / runtime touched

Uploads, provider configs, logs, graph namespaces, reports.

## UX / DX / operator requirements

Blocked actions should tell users why and what they can do next.

## Required output (security-boundary)

Abuse-control tests and secret redaction checks.

## Blocks (security-boundary)

Unbounded uploads, unbounded provider calls, or secrets in logs.

## Quality bar

Risky actions are controlled, logged, and user-visible.

## Do not ship

Do not expose upload/provider paths publicly without this phase.

## Repair routing

Security and abuse gaps go to this phase.

## Unlock condition

Security controls pass review for the chosen non-local posture.
