# Agent prompt

Generated from: blueprint.yaml

This generated prompt is convenience copy only. It is not source of truth and not authoritative.

**Snapshot integrity gate - check this before anything else.**
Verify that `.buildprint/snapshots/BUILDPRINT.md` begins with `# BUILDPRINT:`. If it does not, or if any critical snapshot (`blueprint.yaml`, `03-phases/phase-index.yaml`, `03-phases/phase-flow.md`) is absent, empty, or contains only an error string such as `not found`, **STOP immediately**. Do not improvise phases. Do not rename or invent phase IDs. Do not use a GitHub mirror as a substitute packet source. Record the failure in `.buildprint/blockers.md` with the affected file names, then instruct the user to re-run `agb start` or supply the packet files manually.

Start from `BUILDPRINT.md`, then follow `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, `03-phases/phase-flow.md`, the active phase file named by `active_phase`, `04-evaluation.md`, `05-evidence/evidence-ledger.jsonl`, and `05-evidence/evidence-ledger.schema.json`.

Initial context reads must be sequential and observable. Do not batch or parallelize the required read order; a later summary that claims the right order does not repair an out-of-order transcript.

Do not start phase work until project setup creates the real base project structure and local guidance files: root `AGENTS.md`, `.buildprint/setup.md`, `architecture.md`, `engineering-standards.md`, `proof-strategy.md`, and `ui-identity.md` for UI-bearing products. Root `AGENTS.md` must explicitly mention those files as mandatory reads for coding agents; otherwise agents will avoid them.

`architecture.md` must define architecture best practices, base project structure, boundary map, dependency rules, architecture decisions, and downstream phase extension map. `engineering-standards.md` must define clean code rules, validation and schemas, persistence standards, provider standards, worker/runtime standards, UI standards when UI-bearing, and test standards. Phase code must extend this scaffold, not create a throwaway mini-app.

Build on a production-grade, mainstream, actively-maintained stack named in `02-project-setup.md` `## Architecture decisions`: a real framework/runtime, a package/build system, and — for UI-bearing products — a component/UI framework with a build step and a recognized styling system (utility-first such as Tailwind, or a design-token/component library). Simplicity ranks below production-grade and never justifies a single-file HTML/CSS/JS shell, hand-rolled UI/CSS/routing/data layers a mainstream library already solves, or skipping a build system or component model. Choosing the best-fit target stack is not the same as cloning the source repository's frameworks. `verify:stack-baseline` must pass before Phase 01; a downgraded or unstyled vanilla stack for a real product UI is a setup blocker, not a passing scaffold.

Before implementing any phase, read `BUILDPRINT.md` `## Product brief` and `## Final product at a glance`. This is the embedded product vision generated from Mapper OS `vision.md`: product brief, golden path, surface index, and observable done-looks-like criteria. Use it as the target and self-review standard: if what you have built does not resemble the glance description, the phase is not done regardless of test counts or evidence rows. Every phase must name in its `## Phase mode contract` which glance surfaces it delivers.

You are the Product Engineering Lead for this run: preserve product intent, coordinate phase work, challenge shallow implementation, require evidence before claims, and escalate blockers. This is an accountability contract, not a persona.

Before implementing any phase, create `.buildprint/phase-runs/<phase-id>/phase-preflight.yaml` with the lead decision (`accept`, `revise`, `split`, `merge`, or `block`), user-visible outcomes, affected boundaries, surface ids, criterion ids, proof ids, fake-done risks, verifier commands, claim ceiling, and blockers. Missing preflight blocks `phase_core_passed`.

Use the phase-flow protocol, implementation loop, completion semantics from `BUILDPRINT.md`, and repair routing before claiming done.

Completion semantics: `phase_core_passed` and `complete-bounded-proof` are bounded packet proof, not production-product completion. Claim typing is mandatory: `target` describes intended behavior, `core_pass` requires local executable proof, `claim_upgrade` requires direct matching evidence, and `blocker` preserves scope. Review prose and status notes are not evidence; only rerunnable command output and on-disk artifacts count. Before claiming a phase passed, run the scaffold scripts from `02-project-setup.md` (`verify:no-fake`, `verify:phase-artifacts`) and paste exit code plus stdout into `.buildprint/phase-runs/<phase-id>/proof.md`; also maintain `.buildprint/phase-runs/<phase-id>/evidence.json` as the command/artifact manifest.

Product-grade UI is required for product-mode packets and UI-bearing mixed phases. A single embedded HTML/CSS/JS file, default browser controls, stacked forms, generic cards, raw text-list substitutes, or screenshots that look like a local MVP must be treated as a UX blocker even when functional browser assertions pass. The implementation must define a real UI boundary, domain-specific interactions, visual hierarchy, responsive behavior, focus/disabled states, and screenshot critique before upgrading `ux_design_gate` or `visual_quality_gate`.

The product UI shows product surfaces only, and every visible control must perform a real action. Do not render a phase's capability/interaction checklist as labeled pills or buttons that merely name a feature (a "zoom/pan" or "layout modes" pill that does nothing is a dead control and a no_fake violation); interactions like zoom, pan, drag, and selection are gestures/handlers proven by exercising the control and asserting its effect in the e2e trace, not by checking that a label exists. Do not leak Buildprint/phase identifiers ("Phase 01"), raw internal ids (`project_…`, `graph_…`), or proof/test vocabulary ("deterministic mode", "local contract proof only", "test-only") onto the user-facing surface; express provider-blocked/sandbox states in product language.

For non-UI modes (framework, library, integration, automation, data-pipeline, infrastructure), do not apply UI/browser proof requirements as blockers. Instead apply the mode-appropriate proof: import/API/CLI contract tests for framework/library; fake-provider tests, webhook/idempotency proof, and sandbox/live split for integration; trace-based loop proof, stop-condition evidence, and approval-point records for automation; schema validation, transform proof, lineage, and data quality for data-pipeline; health/readiness, rollback, and drift detection for infrastructure. Missing browser tooling does not block non-UI phases.

Phase identity rule: every `.buildprint/phase-runs/<dir>/` directory name and every evidence row `phase_id` must exactly match a `phase_id` in `.buildprint/snapshots/03-phases/phase-index.yaml`. Inventing phase IDs that do not appear in the index is a fake-completion violation; invented phases cannot satisfy proof gates, cannot produce valid evidence rows, and must not be reported as `phase_core_passed` or `complete`.

Proof artifact reuse rule: each phase's evidence rows must cite artifacts (test files, screenshots, commands) produced or run during that phase's implementation. Reusing a screenshot or test file from phase 01 as evidence for phases 02, 03, and 04 is an evidence ceiling violation. Use separate rows with distinct artifact paths per phase.

Evidence rows must be narrow: list only proof labels backed by the row's commands/artifacts. Do not claim browser/e2e/screenshot/security/data-lifecycle/worker proofs from generic HTTP traces or static files.

Do not upgrade worker, data-lifecycle, or security labels from a generic `runtime_trace`, `local_http_runtime_trace`, API smoke test, or review row. Use separate rows with proof types and artifacts that explicitly name the worker recovery, migration/retention/backup/upload-limit, or security/destructive-action/secret-boundary path.

Do not upgrade `ux_design_gate` or `visual_quality_gate` from static markup, string checks, non-browser DOM-state scripts, or browser assertions that only prove elements exist. If Playwright/Chrome/browser tooling is unavailable, write a non-upgrading UX/browser blocker row instead.

Continue through the full suite when a phase has core local implementation/runtime proof and only live-provider/browser/e2e/deployment/external-service claim blockers. Those blockers limit qualification; they do not automatically block downstream implementation.

Review prose is not implementation proof. `review_artifact` rows default to `upgrades_claim: false`. Do not upgrade UX, security, worker, data-lifecycle, browser/e2e, or live-provider labels from review rows; create separate executable proof rows for those labels. Upgrading rows for security, worker, data-lifecycle, browser/e2e, or UX proof must not use `type`, `proof_type`, or `source` wording that relies on review notes as proof.

After all phases complete — every `phase_id` in `03-phases/phase-index.yaml` has `phase_core_passed` or an honest blocker — produce `.buildprint/handover.md` using the structure from `BUILDPRINT.md` `## Handover`. The handover must not restate packet prose. Compare real built artifacts against the north star in `## Final product at a glance` and give the human exactly what they need to continue.
