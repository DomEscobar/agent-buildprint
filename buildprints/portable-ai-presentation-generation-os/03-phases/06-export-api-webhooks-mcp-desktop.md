# Phase 06 — Export, API, Webhooks, MCP, and Desktop Boundary

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: declare the phase objective, write compact runtime artifact `.buildprint/phase-runs/<phase-id>/team-gates.md`, implement the first real vertical path, review architecture/UX/QA, verify, write proof, and record evidence. Create handoff/return files only when real delegation happens.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles: [product-architect, ux-ui-craft, integration-runtime, data-persistence, security-boundary, test-and-verification]


## Product outcome

The system can be used as a self-hosted authenticated API and/or desktop app, exporting PPTX/PDF decks and delivering async/webhook/MCP integration signals safely.

## Source evidence

- README documents `/api/v1/ppt/presentation/generate`, Basic auth for `/api/v1`, PPTX/PDF export, Docker, cloud deploy, Electron desktop, and MCP server.
- `utils/export_utils.py`, `services/export_task_service.py`, and bundled export/runtime scripts handle export paths.
- `api/v1/webhook/router.py` and `services/webhook_service.py` implement webhook subscription/delivery.
- `servers/fastapi/mcp_server.py` provides MCP server behavior.
- `electron/*` scripts package the Next.js/FastAPI app for desktop.

This packet is source-independent: use these observations to preserve product behavior, not to depend on the original repository at implementation time.

## Source surface dispositions

- Source surface: `SRC-EXPORT-API-WEBHOOKS-MCP-DESKTOP` from `02-project-setup.md`.
- Target disposition: preserve unless `02-project-setup.md` explicitly says merge/defer/drop for a sub-surface.
- Target contract: preserve the capability and user/API outcome without forcing route/function parity.
- Compatibility impact: source path and route names are evidence anchors only, not route/function parity.
- Blocker rule: if the capability cannot be preserved in the target architecture, record a blocker instead of silently narrowing scope.

## Implementation scope

- Authenticated generate/edit/export API with stable request/response contracts.
- PPTX and PDF export path with downloadable artifact and failure handling.
- Async generation status and webhook delivery with retry/failure evidence.
- MCP server/tool boundary and Electron desktop packaging boundary, if in selected scope.

1. Implement the smallest real source-independent vertical path for this phase.
2. Wire APIs/UI/runtime state to real implementation seams, not static fixtures or no-op controls.
3. Add required negative/failure-state tests.
4. Prove persistence/readback, provider/runtime boundaries, and browser/runtime behavior where claimed.
5. Append proof or blocker rows to `.buildprint/evidence/evidence-ledger.jsonl` using `phase_id: 06-export-api-webhooks-mcp-desktop`.

Inputs:
- Inputs are defined by the product obligation and interface contracts.

Outputs/downstream handoff:
- Outputs are defined by the product obligation and interface contracts.

Downstream phases may rely on persisted identifiers, state transitions, provider-mode disclosure, and failure semantics proven here.

## Interfaces touched

- public API routes, export renderer/runtime, webhook API/service, MCP server, desktop packaging scripts, deployment config.

## State/runtime touched

- export artifacts, async task/export status, webhook subscriptions/events, MCP tool call logs, desktop bundled assets/config.

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

- Proof id: proof-06-export-api-webhooks-mcp-desktop
- Required proof types:
  - unit_or_integration_test
  - negative_test
  - browser_trace_or_runtime_trace
  - persistence_roundtrip_or_blocker
  - evidence_ledger_entry
  - browser_runtime_trace
  - ux_design_gate
  - screenshot_state_set
  - provider_adapter_config_test_required and live_provider_proof_blocker_only
  - persistence_roundtrip_or_blocker
  - security_boundary_review_or_blocker
  - clean_room_implementation_trace
  - no_fake_scan_pass
- Negative tests: validation failure, provider/runtime failure where applicable, persistence/readback failure, auth/upload/export failure where applicable, and phase safety/security constraints.
- Runtime evidence ledger: `.buildprint/evidence/evidence-ledger.jsonl`
- Immutable evidence seed: `05-evidence/evidence-ledger.jsonl`
- Claim rules: `04-evaluation.md`
- Evidence schema: `05-evidence/evidence-ledger.schema.json`


Production-grade proof split:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, ingestion, deck generation, media, editor, export, webhook, MCP, desktop, and browser/API paths.

Required runtime evidence row must use `phase_id: 06-export-api-webhooks-mcp-desktop` and write to `.buildprint/evidence/evidence-ledger.jsonl`, not the packaged seed ledger.

## Repair routing

If this phase fails verification, return here before editing again. Re-read product outcome, implementation scope, interfaces touched, state/runtime touched, UX/UI requirements, safety/security constraints, and proof gate.

- test/build/runtime/UI/proof failure -> current phase
- architecture contradiction -> `02-project-setup.md`
- missing human preference that affects product identity/cost/secrets/destructive action -> `01-questions.md`
- missing dependency -> required prior phase from `03-phases/phase-index.yaml`
- external blocker -> `.buildprint/evidence/evidence-ledger.jsonl`
