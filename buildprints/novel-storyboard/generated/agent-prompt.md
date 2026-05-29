# Agent prompt

Generated from: blueprint.yaml

This generated prompt is convenience copy only. It is not source of truth and not authoritative.

Start from `BUILDPRINT.md`, then follow `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, `03-phases/phase-flow.md`, the active phase file named by `active_phase`, `04-evaluation.md`, `05-evidence/evidence-ledger.jsonl`, and `05-evidence/evidence-ledger.schema.json`.

Initial context reads must be sequential and observable. Do not batch or parallelize the required read order; a later summary that claims the right order does not repair an out-of-order transcript.

Do not start phase work until project setup creates the real base project structure and local guidance files: root `AGENTS.md`, `.buildprint/setup.md`, `architecture.md`, `engineering-standards.md`, `test-strategy.md`, and `ui-identity.md`. Root `AGENTS.md` must explicitly mention those files as mandatory reads for coding agents. `engineering-standards.md` must define clean code rules, validation and schemas, persistence standards, provider standards, worker/runtime standards, UI standards, and test standards.

Before implementing any phase, read `BUILDPRINT.md` `## Product brief` and `## Final product at a glance`. The target is a visually compelling novel-to-storyboard production workbench: cinematic shot frames, ordered sequence, selected-frame inspector, agent chat, provider/media states, and durable episode state. If the built result reads as a generic dashboard, bare graph demo, raw text-list, static cards, or local MVP shell, the phase is not done.

Use `03-phases/phase-flow.md`, the implementation loop, completion semantics from `BUILDPRINT.md`, and repair routing before claiming done. For each phase, create `.buildprint/phase-runs/<phase-id>/plan.md`, implement the smallest real vertical path, run verification, write `.buildprint/phase-runs/<phase-id>/proof.md`, then append narrow rows to `.buildprint/evidence/evidence-ledger.jsonl`.

Completion semantics: `phase_core_passed` and `complete-bounded-proof` are bounded packet proof, not production-product completion. Review prose and status notes are not evidence; only rerunnable command output and on-disk artifacts count. Before claiming a phase passed, run the scaffold scripts from `02-project-setup.md` (`verify:no-fake`, `verify:phase-artifacts`) and paste exit code plus stdout into `.buildprint/phase-runs/<phase-id>/proof.md`.

Product-grade UI is default for this browser storyboard product. A single embedded HTML/CSS/JS file, default browser controls, stacked forms, generic cards, raw text-list substitutes, or screenshots that look like a local MVP must be treated as a UX blocker even when functional browser assertions pass. The implementation must define a real UI boundary, domain-specific interactions, visual hierarchy, responsive behavior, focus/disabled states, and screenshot critique before upgrading `ux_design_gate` or `visual_quality_gate`.

Evidence rows must be narrow: list only proof labels backed by the row's commands/artifacts. Do not claim browser/e2e/screenshot/security/data-lifecycle/worker proofs from generic HTTP traces or static files.

Do not upgrade worker, data-lifecycle, or security labels from a generic `runtime_trace`, `local_http_runtime_trace`, API smoke test, or review row. Use separate rows with proof types and artifacts that explicitly name the worker recovery, migration/retention/backup/upload-limit, or security/destructive-action/secret-boundary path.

Do not upgrade `ux_design_gate` or `visual_quality_gate` from static markup, string checks, non-browser DOM-state scripts, or browser assertions that only prove elements exist. If Playwright/Chrome/browser tooling is unavailable, write a non-upgrading UX/browser blocker row instead.

Continue through the full suite when a phase has core local implementation/runtime proof and only live-provider/browser/e2e/deployment/external-service claim blockers. Those blockers limit qualification; they do not automatically block downstream implementation.

Review prose is not implementation proof. `review_artifact` rows default to `upgrades_claim: false`. Do not upgrade UX, security, worker, data-lifecycle, browser/e2e, or live-provider labels from review rows; create separate executable proof rows for those labels. Upgrading rows for security, worker, data-lifecycle, browser/e2e, or UX proof must not use `type`, `proof_type`, or `source` wording that relies on review notes as proof.
