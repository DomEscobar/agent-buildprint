# Phase 13 — Production deployment, auth, privacy, and observability

## How to implement this phase

Read `.buildprint/next-agent.md`, local `AGENTS.md`, `03-phases/phase-flow.md`, `02-uiux-decision.md`, `enhancement-gaps.md`, and only this active phase before coding. This phase is required before private-authenticated or public-web readiness claims. Work in the implementation project, never in `.buildprint/snapshots/**`.

## Building objective

Add the production boundary required by the chosen deployment posture. For private or public deployment, implement authentication, HTTPS/deployment configuration, secret management, redacted structured logs, audit trail, backup/restore or export strategy, privacy/retention controls, abuse/rate limiting where public, and operational health checks. The UI must explain privacy, storage, provider, runtime, and deployment status in plain language. Handover must separate trusted-local, private-authenticated, and public-web claims.

Production readiness requires operational evidence, not a deployment-shaped folder. The app should have health endpoints or checks, redacted logs for provider/runtime/storage events, documented retention behavior, backup or export recovery proof, clear delete semantics, and a final threat/privacy posture aligned to the selected deployment mode. Public mode must include abuse prevention and user isolation.

## DO NOT

Do not use placeholders, functionless buttons, mocked/sample data counted as real product behavior, fake provider success, canned simulation success, decorative graph output, raw JSON as the main UI, or vague “done” claims. Do not claim production readiness from a local build. Do not deploy public surfaces without auth/privacy/abuse controls. Do not log secrets or private seed material unnecessarily. Do not skip backup/delete/export semantics. Do not make observability depend on exposing sensitive content.

## Minimum proof before moving on

Run build/test/smoke checks plus deployment or deployment-config validation. Verify auth gates if enabled, redacted logs, health checks, backup/export/delete paths, privacy copy, and no secret leakage in frontend bundles/logs. Record exact deployment posture and what remains unproven.

## Handoff note

Record deployment posture, auth/privacy controls, observability behavior, backup/export/delete proof, secret redaction proof, operational blockers, and final production-readiness status.
