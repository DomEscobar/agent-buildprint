# Agent Prompt

Generated from: blueprint.yaml

This generated prompt is not source of truth. It is a convenience summary. If anything conflicts, follow `BUILDPRINT.md`, `blueprint.yaml`, and the active phase file.

Bootstrap exact snapshots first, then read in order:

1. `BUILDPRINT.md`
2. `01-questions.md`
3. `02-project-setup.md`
4. `blueprint.yaml`
5. `03-phases/phase-index.yaml`
6. `03-phases/phase-flow.md`
7. the active phase file only
8. `04-evaluation.md`
9. `05-evidence/evidence-ledger.jsonl`
10. `05-evidence/evidence-ledger.schema.json`

Do not read all phase files upfront. Do not edit packet snapshots. Runtime evidence belongs in `.buildprint/evidence/evidence-ledger.jsonl`.

Initial context reads must be sequential and observable. Do not batch or parallelize the required read order; a later summary that claims the right order does not repair an out-of-order transcript.

Execute one phase at a time through `03-phases/phase-flow.md`. Production-grade architecture is the default: provider adapters/config/tests, SQLite/libSQL durable state, worker/runtime ownership, browser/e2e proof, security boundaries, and data lifecycle proof are required before claim upgrades.

Evidence rows must be narrow. Do not copy every proof label into every row. Missing Ollama, browser tooling, deployment approval, or external services may block qualification, but such blockers do not automatically block downstream implementation when core local runtime/API/persistence proof passed and the blocker row uses `blocks_continuation: false`.

Do not upgrade worker, data-lifecycle, or security labels from a generic `runtime_trace`, `local_http_runtime_trace`, API smoke test, or review row. Use separate rows with proof types and artifacts that explicitly name the worker recovery, migration/retention/backup/upload-limit, or security/destructive-action/secret-boundary path.

Do not upgrade `ux_design_gate` from static markup, string checks, or non-browser DOM-state scripts. If Playwright/Chrome/browser tooling is unavailable, write a non-upgrading UX/browser blocker row instead.

Review prose cannot upgrade implementation proof by itself. `review_artifact` rows default to `upgrades_claim: false`. Provider seams, RAG/vector behavior, memory lifecycle, browser states, security, UX, and persistence must be backed by separate executable proof commands or artifacts before claim upgrade. Upgrading rows for security, worker, data-lifecycle, browser/e2e, or UX proof must not use `type`, `proof_type`, or `source` wording that relies on review notes as proof.
QA review `Commands run` sections must name exact commands plus relevant output artifacts or subtest sections. A bare aggregate such as `npm test` is not enough in full-suite runs.

For fast phase replay, write the first valid `.buildprint/evidence/evidence-ledger.jsonl` checkpoint immediately after provider/persistence tests and UI-state proof pass. Do not defer evidence while expanding HTTP serving, browser automation retries, live-provider checks, docs, or UI polish.

That checkpoint is not phase completion. For UI-bearing phases, finish the core vertical path before claiming `phase_core_passed`: user input/control -> UI/controller boundary -> provider/runtime/data path -> persisted result -> visible state/readback transition. Static state cards, dead buttons, or a browser blocker without local interaction proof do not satisfy the phase core.
