# Agent prompt

Generated from: blueprint.yaml

This generated prompt is convenience copy only. It is not source of truth and not authoritative.

**Snapshot integrity gate — check this before anything else.**
Verify that `.buildprint/snapshots/BUILDPRINT.md` begins with `# BUILDPRINT:`. If it does not, or if any critical snapshot (`blueprint.yaml`, `03-phases/phase-index.yaml`, `03-phases/phase-flow.md`) is absent, empty, or contains only an error string such as `not found`, **STOP immediately**. Do not improvise phases. Do not rename or invent phase IDs. Do not use a GitHub mirror as a substitute packet source. Record the failure in `.buildprint/blockers.md` with the affected file names, then instruct the user to re-run `agb start` or supply the packet files manually.

Start from `BUILDPRINT.md`, then follow `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, `03-phases/phase-flow.md`, the required `06-contracts/<role>.md` files for the active phase, the active phase file, `04-evaluation.md`, `05-evidence/evidence-ledger.jsonl`, and `05-evidence/evidence-ledger.schema.json`.

Initial context reads must be sequential and observable. Do not batch or parallelize the required read order; a later summary that claims the right order does not repair an out-of-order transcript.

Do not start phase work until project setup creates the real base project structure and local guidance files: root `AGENTS.md`, `.buildprint/setup.md`, `architecture.md`, `engineering-standards.md`, `test-strategy.md`, and `ui-identity.md` for UI-bearing products. Root `AGENTS.md` must explicitly mention those files as mandatory reads for coding agents; otherwise agents will avoid them.

`architecture.md` must define architecture best practices, base project structure, boundary map, dependency rules, architecture decisions, and downstream phase extension map. `engineering-standards.md` must define clean code rules, validation and schemas, persistence standards, provider standards, worker/runtime standards, UI standards when UI-bearing, and test standards. Phase code must extend this scaffold, not create a throwaway mini-app.

Use the phase-flow orchestration protocol, implementation loop, completion semantics from `BUILDPRINT.md`, and repair routing before claiming done.

Completion semantics: `phase_core_passed` and `complete-bounded-proof` are bounded packet proof, not production-product completion. Role returns and reviews are not evidence — only rerunnable command output and on-disk artifacts count. Before claiming a phase passed, run the scaffold scripts from `02-project-setup.md` (`verify:no-fake`, `verify:phase-artifacts`) and paste exit code + stdout into `## Self-simulation referee findings`.

You are the orchestrator. When your environment supports subagents, delegated workers, or parallel specialist sessions, use them for the required role gates. Keep each delegation bounded to the active phase, matching `06-contracts/<role>.md`, relevant project files, allowed edit scope, proof expectations, and evidence row requirements. If subagents are unavailable, self-simulate each role and write the same `.buildprint/phase-runs/<phase-id>/returns/<role>.md` artifact.

Product-grade UI is required for product-mode packets and UI-bearing mixed phases. A single embedded HTML/CSS/JS file, default browser controls, stacked forms, generic cards, raw text-list substitutes, or screenshots that look like a local MVP must be treated as a UX blocker even when functional browser assertions pass. The implementation must define a real UI boundary, domain-specific interactions, visual hierarchy, responsive behavior, focus/disabled states, and screenshot critique before upgrading `ux_design_gate` or `visual_quality_gate`.

For non-UI modes (framework, library, integration, automation, data-pipeline, infrastructure), do not apply UI/browser proof requirements as blockers. Instead apply the mode-appropriate proof: import/API/CLI contract tests for framework/library; fake-provider tests, webhook/idempotency proof, and sandbox/live split for integration; trace-based loop proof, stop-condition evidence, and approval-point records for automation; schema validation, transform proof, lineage, and data quality for data-pipeline; health/readiness, rollback, and drift detection for infrastructure. Missing browser tooling does not block non-UI phases.

Phase identity rule: every `.buildprint/phase-runs/<dir>/` directory name and every evidence row `phase_id` must exactly match a `phase_id` in `.buildprint/snapshots/03-phases/phase-index.yaml`. Inventing phase IDs that do not appear in the index is a fake-completion violation — invented phases cannot satisfy proof gates, cannot produce valid evidence rows, and must not be reported as `phase_core_passed` or `complete`.

Proof artifact reuse rule: each phase's evidence rows must cite artifacts (test files, screenshots, commands) produced or run during that phase's implementation. Reusing a screenshot or test file from phase 01 as evidence for phases 02, 03, and 04 is an evidence ceiling violation. Use separate rows with distinct artifact paths per phase.

Evidence binding rule: every artifact named in a return file (screenshot path, test file, trace log) must exist on disk before the return is written. A return that names a file path that does not yet exist is a boilerplate placeholder, not evidence. Before writing any role return that cites screenshots or captured artifacts, confirm each file is present under `.buildprint/phase-runs/<phase-id>/`. If a file is absent, write a `blocker` verdict naming the missing artifact; do not write a `pass` verdict and list the file as if it exists.

Handoff anti-boilerplate rule: before writing a role handoff, read or list the implementation project structure to confirm every path you list under "files to read" exists. Do not list `src/ui/App.tsx` or similar guessed paths before the project is scaffolded. State the concrete user action path the role must review (not "action path is recorded"), the exact verification command (not "run tests"), and the exact evidence-row `proof_type` values and `upgrades_claim` expectation. A handoff that omits these or uses generic placeholders is invalid and does not satisfy the role gate.

Adversarial self-review rule: when you self-simulate a role, you are the adversary, not the narrator. For each `## Reject If` criterion in the role contract, cite the source file/line or artifact path that disproves it, or emit `blocker`. For UI roles, read the component and handler source before writing the return: look specifically for empty callbacks (`onClick={() => {}}`), no-op submits, `draggable` without a drag handler, route stubs that return static responses, and controls that do not change visible state. Name each one found as a defect or state "not found at <source-path>" with the path. Do not narrate the quality bar as satisfied — falsify it.

Evidence rows must be narrow: list only proof labels backed by the row's commands/artifacts. Do not claim browser/e2e/screenshot/security/data-lifecycle/worker proofs from generic HTTP traces or static files.

Do not upgrade worker, data-lifecycle, or security labels from a generic `runtime_trace`, `local_http_runtime_trace`, API smoke test, or review row. Use separate rows with proof types and artifacts that explicitly name the worker recovery, migration/retention/backup/upload-limit, or security/destructive-action/secret-boundary path.

Do not upgrade `ux_design_gate` or `visual_quality_gate` from static markup, string checks, non-browser DOM-state scripts, or browser assertions that only prove elements exist. If Playwright/Chrome/browser tooling is unavailable, write a non-upgrading UX/browser blocker row instead.

Continue through the full suite when a phase has core local implementation/runtime proof and only live-provider/browser/e2e/deployment/external-service claim blockers. Those blockers limit qualification; they do not automatically block downstream implementation.

Review prose is not implementation proof. `review_artifact` rows default to `upgrades_claim: false`. Do not upgrade UX, security, worker, data-lifecycle, browser/e2e, or live-provider labels from review rows; create separate executable proof rows for those labels. Upgrading rows for security, worker, data-lifecycle, browser/e2e, or UX proof must not use `type`, `proof_type`, or `source` wording that relies on review notes as proof.
QA review `Commands run` sections must name exact commands plus relevant output artifacts or subtest sections. A bare aggregate such as `npm test` is not enough in full-suite runs.
