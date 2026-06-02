# Phase 14 - Security and abuse controls

requires_roles: [security-boundary]

## Product intention

This phase is included but blocked under trusted-local posture.

## Mapped obligations

Harden uploads, provider keys, prompt injection exposure, file parsing, destructive actions, rate limits, abuse controls, and secret redaction before public/private exposure.

## Stable vs free

Stable: uploaded data and provider credentials are protected.

Free: exact security tooling.

## Implementation scope

Blocked until posture is promoted.

## Interfaces touched

Upload, provider config, reports, logs, deletes, graph reset/delete, simulation process control.

## State / runtime touched

User files, extracted text, logs, provider config, graph data.

## UX / DX / operator requirements

Users must understand destructive actions and blocked unsafe capabilities.

## Required output (security-boundary)

Implement security review fixes and abuse controls for promoted posture.

## Blocks (security-boundary)

No public upload surface with trusted-local-only validation.

## Quality bar

Security-sensitive paths are reviewed and tested.

## Do not ship

Public upload + provider-key app without hardening.

## Repair routing

Implement before public/private launch.

## Unlock condition

Security review and abuse-control checks pass.

