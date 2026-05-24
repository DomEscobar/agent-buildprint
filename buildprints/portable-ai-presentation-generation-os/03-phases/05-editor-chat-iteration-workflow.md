# Phase 05 — Editor, Chat, and Iteration Workflow

## Product outcome

Users can browse decks, open an editable presentation, update slides, use chat assistance with scoped memory/context, and see trustworthy progress/error states.

## Source evidence

- Next.js routes include dashboard, upload, outline, presentation, documents-preview, template-preview, settings, templates, and theme pages.
- `store/slices/presentationGeneration.ts`, `presentationGenUpload.ts`, `undoRedoSlice.ts`, and `userConfig.ts` model frontend workflow state.
- `api/v1/ppt/endpoints/slide.py` exposes slide edit and edit-html routes.
- `api/v1/ppt/endpoints/chat.py` exposes conversation/history/message/stream routes.
- `services/chat/*` and `services/mem0_presentation_memory_service.py` manage chat, memory, and presentation context.

This packet is source-independent: use these observations to preserve product behavior, not to depend on the original repository at implementation time.

## Source surface dispositions

- Source surface: `SRC-EDITOR-CHAT` from `02-project-setup.md`.
- Target disposition: preserve unless `02-project-setup.md` explicitly says merge/defer/drop for a sub-surface.
- Target contract: preserve the capability and user/API outcome without forcing route/function parity.
- Compatibility impact: source path and route names are evidence anchors only, not route/function parity.
- Blocker rule: if the capability cannot be preserved in the target architecture, record a blocker instead of silently narrowing scope.

## Implementation scope

- Dashboard/list/detail navigation.
- Presentation editor with slide edit/update and undo/redo where claimed.
- Chat-assisted slide/deck iteration with scoped context and memory boundaries.
- UI states for empty/loading/error/blocked/success across generation and edit flows.

1. Implement the smallest real source-independent vertical path for this phase.
2. Wire APIs/UI/runtime state to real implementation seams, not static fixtures or no-op controls.
3. Add required negative/failure-state tests.
4. Prove persistence/readback, provider/runtime boundaries, and browser/runtime behavior where claimed.
5. Append proof or blocker rows to runtime artifact `.buildprint/evidence/evidence-ledger.jsonl` using `phase_id: editor-chat-iteration-workflow`.

Inputs:
- Inputs are defined by the product obligation and interface contracts.

Outputs/downstream handoff:
- Outputs are defined by the product obligation and interface contracts.

Downstream phases may rely on persisted identifiers, state transitions, provider-mode disclosure, and failure semantics proven here.

## Interfaces touched

- frontend routes/components/store, slide edit APIs, chat APIs, memory/context store, browser-visible auth/settings boundaries.

## State/runtime touched

- frontend app state, chat history, presentation context, memory entries, updated slide HTML/content, user config.

Boundary requirements:
- Preserve provider, persistence, security, export, file-upload, and no-fake boundaries from the package contracts.

## UX/UI requirements

Use the inline UX/UI requirements in this phase. Any `browser_runtime_trace` proof must include `ux_design_gate` and `screenshot_state_set` coverage for the relevant empty/loading/error/blocked/success states, or an explicit blocker row.

## Safety/security constraints

- Preserve auth/privacy/tenant boundaries if present.
- Never expose secrets in logs, UI, screenshots, reports, generated decks, provider requests, or evidence rows.
- Ask before destructive actions, external writes, paid providers, deployments, or irreversible migrations.
- Stop rather than claim implementation if proof depends only on mocks, placeholders, static UI, route-shaped stubs, or in-memory-only state where durability is claimed.
- Stop rather than claim live provider/runtime behavior from deterministic adapters.
- Stop on secret exposure, destructive-action ambiguity, unreviewed upload/runtime surfaces, SSRF/file-path traversal risk, or missing browser/runtime evidence.

## Quality gates

- Run the smallest meaningful typecheck/lint/test/build gate for changed files.
- Add or update tests for changed behavior and failure states.
- For UI-facing behavior, provide browser/screenshot proof or an honest blocker.
- For persistence/provider/export behavior, prove readback/live mode or record a blocker.

## Proof gate

- Proof id: proof-editor-chat-iteration-workflow
- Required proof types:
  - unit_or_integration_test
  - negative_test
  - browser_trace_or_runtime_trace
  - persistence_roundtrip_or_blocker
  - evidence_ledger_entry
  - browser_runtime_trace
  - ux_design_gate
  - screenshot_state_set
  - provider_integration_proof_or_blocker
  - persistence_roundtrip_or_blocker
  - security_boundary_review_or_blocker
  - clean_room_implementation_trace
  - no_fake_scan_pass
- Negative tests: validation failure, provider/runtime failure where applicable, persistence/readback failure, auth/upload/export failure where applicable, and phase safety/security constraints.
- Runtime evidence ledger: runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`
- Evidence schema: `05-evidence/evidence-ledger.schema.json`

Required runtime evidence row must use `phase_id: editor-chat-iteration-workflow` and write to runtime artifact `.buildprint/evidence/evidence-ledger.jsonl`, not the packaged seed ledger.

## Repair routing

If this phase fails verification, return here before editing again. Re-read product outcome, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, and proof gate.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `05-evidence/evidence-ledger.jsonl`
