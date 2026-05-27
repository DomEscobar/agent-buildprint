# Agent prompt

Generated from: blueprint.yaml

This generated prompt is convenience copy only. It is not source of truth and not authoritative.

Start from `BUILDPRINT.md`, then follow `01-questions.md`, `02-project-setup.md`, `blueprint.yaml`, `03-phases/phase-index.yaml`, `03-phases/phase-flow.md`, the active phase file, `04-evaluation.md`, `05-evidence/evidence-ledger.jsonl`, and `05-evidence/evidence-ledger.schema.json`.

Initial context reads must be sequential and observable. Do not batch or parallelize the required read order; a later summary that claims the right order does not repair an out-of-order transcript.

This micro replay is dependency-free Node.js plus one minimal interactive UI file only. Do not choose Python, install packages, start Docker, or use external services.

Keep the implementation minimal: no CLI, HTTP server, worker daemon, Docker setup, or package-install path unless the active phase explicitly requires it. The target is one provider seam, one durable readback path, one interactive chat UI file with required states, one proof/test command, a UI action/state-transition proof attempt, and honest evidence.

Static state cards are not enough. Before claiming `phase_core_passed`, prove prompt input -> send action/controller -> provider seam -> persisted conversation -> visible success/readback state.

Do not start phase work until project setup is explicit enough to create root/local project `AGENTS.md` alignment.

Use the phase-flow orchestration protocol, implementation loop, and repair routing before claiming done.

Runtime proof/blocker rows must be appended to `.buildprint/evidence/evidence-ledger.jsonl`; packet `05-evidence/evidence-ledger.jsonl` is immutable seed evidence.

Write `.buildprint/evidence/evidence-ledger.jsonl` immediately after the local proof command passes. Do not defer evidence until optional cleanup or final summary.

Evidence rows must be narrow: list only proof labels backed by the row's commands/artifacts. Do not claim browser/e2e/screenshot/security/data-lifecycle/worker proofs from generic HTTP traces or static files.

Missing live-provider, browser/e2e, deployment, or external-service proof may limit qualification, but those blockers do not automatically block downstream implementation when core local runtime/API/persistence proof passed and the blocker row uses `blocks_continuation: false`.

Review prose is not implementation proof. `review_artifact` rows default to `upgrades_claim: false`. Do not upgrade UX, security, worker, data-lifecycle, browser/e2e, or live-provider labels from review rows; create separate executable proof rows for those labels. Upgrading rows for security, worker, data-lifecycle, browser/e2e, or UX proof must not use `type`, `proof_type`, or `source` wording that relies on review notes as proof.
QA review `Commands run` sections must name exact commands plus relevant output artifacts or subtest sections. A bare aggregate such as `npm test` is not enough in full-suite runs.
