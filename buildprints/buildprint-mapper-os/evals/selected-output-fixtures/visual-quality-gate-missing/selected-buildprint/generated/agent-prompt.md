# Agent prompt

Generated from: blueprint.yaml

This generated prompt is convenience copy only. It is not source of truth and not authoritative.

Start from `BUILDPRINT.md`, then follow `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, `03-phases/phase-flow.md`, the active phase file, `04-evaluation.md`, `05-evidence/evidence-ledger.jsonl`, and `05-evidence/evidence-ledger.schema.json`.

Initial context reads must be sequential and observable. Do not batch or parallelize the required read order; a later summary that claims the right order does not repair an out-of-order transcript.

Do not start phase work until project setup is explicit enough to create root/local project `AGENTS.md` alignment.

Use the implementation loop and repair routing before claiming done.

Runtime proof/blocker rows must be appended to `.buildprint/evidence/evidence-ledger.jsonl`; packet `05-evidence/evidence-ledger.jsonl` is immutable seed evidence.

Production-grade architecture is the default: implement auth/session/tenant boundaries, provider adapters/config/tests, durable persistence, worker/runtime ownership, deployment/ops shape, observability, security controls, and repeatable browser/e2e proof before accepting live-proof blockers.

Product-grade UI is the default for browser work. A local MVP, default browser controls, stacked forms, generic cards, or raw text-list UI must be treated as a UX blocker until repaired. Do not upgrade `ux_design_gate` or `visual_quality_gate` unless screenshot critique and interaction proof show a product-grade surface.

Evidence rows must be narrow: list only proof labels backed by the row's commands/artifacts. Do not claim browser/e2e/screenshot/security/data-lifecycle/worker proofs from generic HTTP traces or static files.

Do not upgrade worker, data-lifecycle, or security labels from a generic `runtime_trace`, `local_http_runtime_trace`, API smoke test, or review row. Use separate rows with proof types and artifacts that explicitly name the worker recovery, migration/retention/backup/upload-limit, or security/destructive-action/secret-boundary path.

Do not upgrade `ux_design_gate` from static markup, string checks, or non-browser DOM-state scripts. If Playwright/Chrome/browser tooling is unavailable, write a non-upgrading UX/browser blocker row instead.

Continue through the full suite when a phase has core local implementation/runtime proof and only live-provider/browser/e2e/deployment/external-service claim blockers. Those blockers limit qualification; they do not automatically block downstream implementation.

Review prose is not implementation proof. `review_artifact` rows default to `upgrades_claim: false`. Do not upgrade UX, security, worker, data-lifecycle, browser/e2e, or live-provider labels from review rows; create separate executable proof rows for those labels. Upgrading rows for security, worker, data-lifecycle, browser/e2e, or UX proof must not use `type`, `proof_type`, or `source` wording that relies on review notes as proof.
QA review `Commands run` sections must name exact commands plus relevant output artifacts or subtest sections. A bare aggregate such as `npm test` is not enough in full-suite runs.
