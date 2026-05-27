# Phase 03 - Memory Settings Lifecycle

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare the phase objective, resolve every role in `requires_roles` to `06-contracts/<role>.md`, write `.buildprint/phase-runs/<phase-id>/team-gates.md`, write bounded handoffs for every required role, use subagents/delegated workers when available or self-simulate when unavailable, write return artifacts for every required role, implement the first real vertical path, review architecture/UX/QA, verify, write proof, and record evidence. Every role in `requires_roles` must produce a handoff and return artifact before `phase_core_passed`.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - ux-ui-craft
  - integration-runtime
  - data-persistence
  - security-boundary
  - test-and-verification

## Product outcome

User can review, edit, archive, restore, export, and delete memory/settings/conversation/document state while the app keeps model, RAG, memory, and lifecycle controls durable and auditable.

## Mapped product obligations

Source surface IDs: SRC-RAG-005, SRC-RAG-006.

Product obligations: automatic memory capture, memory review controls, settings page, export/delete/reindex lifecycle, and grounding eval path.

Mapped product obligation refs:
- https://github.com/Maxkrvo/OllamaChat README describes automatic memory capture, memory review page, settings controls, and model/RAG configuration.
- https://github.com/Maxkrvo/OllamaChat README describes document management, reindex/delete, grounding evals, and database-backed state.

This packet is source-independent: use these observations to preserve product behavior, not to depend on the original repository at implementation time.

## Behavior compatibility contract

- Surface id: SRC-RAG-005 memory/settings.
  - Disposition: preserve capability, target route/function names may differ.
  - Equivalent target behavior: memory extraction and settings are reviewable, editable, and durable.
  - Compatibility impact: UI layout may differ; this is not route/function parity.
- Surface id: SRC-RAG-006 lifecycle/evals.
  - Disposition: preserve capability.
  - Equivalent target behavior: export/delete/reindex/readback and grounding checks exist as repeatable commands.
  - Compatibility impact: exact eval format may vary if proof passes.

## Implementation scope

1. Implement memory extraction/review controls and settings persistence.
2. Implement export, delete, archive/restore, reset, and reindex lifecycle actions.
3. Implement confirmation and audit-friendly behavior for destructive local actions.
4. Implement repeatable browser/e2e proof and grounding/data lifecycle tests.
5. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl` using `phase_id: 03-memory-settings-lifecycle`.

Inputs: memory item, settings changes, delete/export/reindex action, confirmation state.

Outputs/downstream handoff: updated memory/settings records, export artifact, deletion/readback proof, reindex status, browser proof artifacts.

## Interfaces touched

- Memory/settings APIs or server actions.
- Export/delete/reindex endpoints.
- Settings and memory UI.
- Evidence/eval command surfaces.

## State/runtime touched

Production runtime: define worker queue ownership, retry/cancel/failure recovery, progress persistence, restart behavior, and health/observability hooks when this phase touches async or runtime behavior.

Data lifecycle: define migrations, retention/delete/export, backup/readback, upload limits, object/file storage, and sensitive data handling when this phase touches durable state or uploads.

Stable obligations:
- Settings and memory must survive readback.
- Destructive actions require confirmation and produce proof.
- Export/delete/reindex must reflect actual durable state.

Free choices:
- Export format, test runner, UI component library, and schema library may vary if contracts and proofs pass.

Boundary requirements:
Provider-backed behavior must disclose deterministic-test-double, sandbox live, or production live mode. Secrets must remain in environment variables or secret stores and must never appear in logs, screenshots, reports, or ledger entries.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. If not user-facing, write `None - reason:` and name downstream UI obligations.


Memory/settings UI must include empty, populated, editing, archived, restored, delete-confirmation, blocked-provider, export-success, and error states. UI-bearing proof must include repeatable browser/e2e coverage plus screenshot or DOM evidence. Screenshots alone do not satisfy UI completion.

## Safety/security constraints

- Require local confirmation for delete/reset/reindex actions.
- Do not export secrets, provider keys, or sensitive raw prompt contents into evidence rows.
- Ask before external writes, paid providers, deployments, or irreversible migrations.
- Stop rather than claim live provider/runtime behavior from deterministic adapters; live credentials block live proof only after adapter/config/test/runtime wiring exists.
- Stop on secret exposure, destructive-action ambiguity, failed owned persistence, failed local runtime/API proof, or missing data lifecycle proof. Missing live-provider, browser/e2e, screenshot, deployment, or external-service proof limits claim qualification; record a non-upgrading blocker with blocks_continuation: false and continue if the core phase path is implemented and locally proven.

## Quality gates

- Run settings/memory lifecycle tests.
- Run export/delete/readback and reindex failure tests.
- Run repeatable browser/e2e proof for settings, memory, and destructive confirmation states or record an honest non-upgrading browser blocker.
- Run no-fake scan for no-op buttons and static exports.

## Proof gate

Additional production proof tracks:
- visual_quality_gate


- Proof id: proof-03-memory-settings-lifecycle
- Required proof tracks:
  - unit_or_integration_test
  - negative_test
  - browser_trace_or_runtime_trace
  - persistence_roundtrip
  - evidence_ledger_entry
  - browser_runtime_trace
  - ux_design_gate
  - screenshot_state_set
  - provider_adapter_config_test_required
  - live_provider_proof_blocker_only
  - worker_retry_cancel_recovery
  - repeatable_browser_e2e
  - migration_retention_backup_upload_limits
  - security_boundary_review
  - clean_room_implementation_trace
  - no_fake_scan_pass
Do not copy all proof tracks into one evidence row. Each runtime row must list only the proof labels backed by its commands and artifacts. Browser/e2e/screenshot, worker, data-lifecycle, security, and live-provider claims require separate matching proof rows or non-upgrading blocker rows.

For this lifecycle phase, broad production labels must be split:
- `worker_retry_cancel_recovery` may upgrade only from a row whose proof artifact explicitly exercises queued/retry/cancel/recovery behavior; a generic local HTTP trace cannot carry it.
- `migration_retention_backup_upload_limits` may upgrade only from a row whose proof artifact explicitly exercises migration, retention/delete, backup/export/readback, and upload/size limit behavior. If any part is missing, split the passing lifecycle labels and add a non-upgrading blocker for the missing part.
- `security_boundary_review` may upgrade only from a row whose proof artifact explicitly exercises destructive confirmation, secret redaction, permission/session ownership, or sensitive export filtering. Review prose alone is not enough.
- If one script runs these checks, write separate evidence rows with proof types such as `worker_recovery_proof`, `data_lifecycle_proof`, and `security_boundary_proof`; do not combine them into one `local_http_runtime_trace` row.
- `ux_design_gate` may upgrade only from a real browser/e2e/accessibility/screenshot proof artifact. Static HTML, string checks, or non-browser DOM-state scripts may support a review note but must not upgrade UI quality. If browser tooling is unavailable, write a non-upgrading browser/UX blocker row.

Live credentials, local Ollama runtime, paid services, or external deployment approval may block live proof only after adapter/config/test/runtime wiring exists. Do not satisfy this phase with deterministic-only providers, screenshots-only UI proof, in-memory-only state, route-shaped handlers, no-op lifecycle controls, or local MVP shortcuts.

- Negative tests: invalid settings, duplicate memory, delete without confirmation, export failure, reindex failure, persistence failure, and phase safety/security constraints.
- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl` in the implementation workspace
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`
- Evidence schema: `05-evidence/evidence-ledger.schema.json`

Required runtime evidence row must use `phase_id: 03-memory-settings-lifecycle` and write to `.buildprint/evidence/evidence-ledger.jsonl`.

## Repair routing

If this phase fails verification, return here before editing again. Re-read product outcome, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, and proof gate.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`
