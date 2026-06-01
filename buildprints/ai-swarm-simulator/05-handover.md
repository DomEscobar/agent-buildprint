# Handover

Use this shape when stopping.

## Current Status

State the actual status. Use `local_build_requires_review` unless a downstream implementation has been built and reviewed.

## Built Surfaces

List only surfaces that exist and were exercised:

- graph-memory adapter;
- project ingestion;
- ontology flow;
- graph build/readback;
- graph/canvas;
- simulation setup/run;
- report generation;
- interaction/chat;
- hardening gates.

## Verification

Include commands and browser/runtime checks actually run. Name provider mode:

- deterministic fixture;
- live configured provider;
- blocked because credentials/runtime unavailable.

## Known Defects And Blockers

Name central defects first. Do not bury provider, persistence, canvas, or security blockers.

## Not Production-Grade

Mandatory for trusted-local handover:

- Auth/session/tenant isolation:
- Upload abuse controls:
- Secret management:
- Durable worker/queue:
- Observability/health:
- Backup/recovery:
- Deployment proof:
- Security review:
- Cost/rate-limit controls:

## Next Atomic Actions

Give 1-5 concrete next actions. The first action should continue the active phase unless review discovered a more central blocker.
