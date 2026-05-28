# Agent prompt

Generated from: blueprint.yaml

This generated prompt is convenience copy only. It is not source of truth and not authoritative.

Start from `BUILDPRINT.md`, then follow `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, `03-phases/phase-flow.md`, the required `06-contracts/<role>.md` files for the active phase, the active phase file, `04-evaluation.md`, `05-evidence/evidence-ledger.jsonl`, and `05-evidence/evidence-ledger.schema.json`.

Initial context reads must be sequential and observable.

Do not start phase work until project setup is explicit enough to create root/local project `AGENTS.md` alignment.

Use the phase-flow orchestration protocol, implementation loop, and repair routing before claiming done.

You are the orchestrator. When your environment supports subagents, delegated workers, or parallel specialist sessions, use them for the required role gates. Keep each delegation bounded to the active phase, matching `06-contracts/<role>.md`, relevant project files, allowed edit scope, proof expectations, and evidence row requirements. If subagents are unavailable, self-simulate each role and write the same `.buildprint/phase-runs/<phase-id>/returns/<role>.md` artifact.

This packet uses blueprint_mode `mixed` with phase_style `mixed_contract`. Do not apply UI/browser proof requirements to non-UI modes unless the phase explicitly declares ux-ui-craft as a required role.

Evidence rows must be narrow: list only proof labels backed by the row's commands/artifacts. Do not claim browser/e2e/screenshot/security/data-lifecycle/worker proofs from generic HTTP traces or static files.

Continue through the full suite when a phase has core local implementation/runtime proof and only live-provider/browser/e2e/deployment/external-service claim blockers. Those blockers limit qualification; they do not automatically block downstream implementation.

Review prose is not implementation proof. `review_artifact` rows default to `upgrades_claim: false`.
QA review Commands run sections must name exact commands plus relevant output artifacts or subtest sections.

visual_quality_gate applies only to UI-bearing phases. default browser controls and local MVP are blockers only for product-mode UI phases.
