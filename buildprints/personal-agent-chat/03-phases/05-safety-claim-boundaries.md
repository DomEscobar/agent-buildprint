# Phase 05 — Safety Claim Boundaries

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`: resolve every role in `requires_roles` to `06-contracts/<role>.md`,

1. declare phase objective
2. write compact runtime artifact `.buildprint/phase-runs/<phase-id>/team-gates.md` with required roles
3. create handoff/return files only for real delegation
4. collect reviews
5. integrate
6. verify
7. record evidence

Every role in `requires_roles` must produce a handoff and return artifact before `phase_core_passed`.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - security-boundary
  - integration-runtime

## Product outcome

Make the operational boundary explicit and executable: dangerous tools are denied by default, secrets are never stored, provider/MCP/live claims are gated, persistence limitations are labeled, and unsupported clone/auth/billing/publishing/browser/network claims are rejected by tests or documentation checks.

## Phase mode contract

blueprint_mode: product
phase_style: outcome_flow
- Mode lens: this phase proves the user/operator outcome of knowing exactly what the local agent may do, what is blocked, and which claims remain unqualified.
- Shared proof spine: preconditions are tool/MCP and memory/team surfaces; entrypoint is policy configuration, diagnostics, and claim-boundary checks; execution behavior denies dangerous paths, redacts secrets, labels blocked live surfaces, records audits, and prevents unsupported claims; state/artifact effects include audit rows, diagnostics output, and claim-boundary report; observable proof is denied-path tests, no-secret scan, no-fake scan, and documentation/diagnostics checks; failure/recovery covers unsafe config, missing credentials, unsupported hosted/auth/billing claims, and destructive ambiguity; non-goals are enabling external writes or hosted multi-user operation.

## Mapped product obligations

- Source tool families include filesystem, shell, web/search, skills scripts, MCP, and subagent paths that can cross local security boundaries.
- Original packet non-goals explicitly excluded live provider parity, real MCP interoperability, production auth, hosted SaaS, billing, and exact source clone behavior.
- Comparative JARVIS/ToFu references introduced broader capabilities that must remain optional and non-claimed unless separately implemented.

## Behavior compatibility contract

- Shell/filesystem/network/browser/media/retrieval operations: preserve as policy-gated boundaries; default disposition is deny for high-risk classes. Compatibility impact: capability may be blocked until explicitly configured and tested.
- Secrets and provider credentials: preserve env-handle boundary; source or generated files must not contain secret values.
- Billing, publishing, production auth, hosted SaaS, and multi-tenant operation: defer. Compatibility impact: packet must not imply these are included.
- Exact source clone parity and source UI/style/assets: drop as unsafe claims while preserving equivalent target behavior.

## Implementation scope

Add policy configuration, denied-event tests, no-secret checks, claim-boundary checks, and implementation documentation or runtime diagnostics that tell users what is deterministic, live, blocked, or unproven.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: diagnostics for provider mode, tool policy, MCP disabled state, persistence mode, and unsupported claims.
- Provider/tool contracts: risk evaluator, approval/config boundary, live-provider gating.

## State/runtime touched

- Database/persistence: audit log for tool requests, denials, MCP calls, and delegation.
- Env/config: allowlist/denylist, bounded roots, timeouts, provider secret handles, live smoke toggles.
- Jobs/workers/runtime: none unless background audits or diagnostics are implemented.
- Runtime artifacts/generated outputs: runtime artifact security proof log and claim-boundary report.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. If not user-facing, write `None - reason:` and name downstream UI obligations.


Diagnostics and workbench state must make blocked or unproven behavior visible. UI must not show live provider, real MCP, shell/browser/network, billing, publishing, retrieval, media, or production auth as ready unless evidence exists.

## Safety/security constraints

No destructive actions, external writes, paid services, secret handling, browser automation against external sites, live provider calls, or real MCP writes without explicit human approval and separate proof. Blocked/missing/synthetic/partial evidence cannot upgrade claims.

## Quality gates

- Static/typecheck gate.
- Denial tests for shell/write/network/browser-class actions.
- No-secret scan or equivalent proof.
- Claim-boundary test/documentation check rejecting unsupported clone/live/auth/billing/publishing claims.
- Audit event test for request, denial, execution, MCP mapping, and subagent delegation.

## Proof gate

Additional production proof tracks:
- visual_quality_gate


Proof id: proof-05-safety-claim-boundaries
Required proof types:
- unit_or_integration_test
- runtime_or_browser_trace_or_blocker
- persistence_roundtrip_or_blocker
- security_boundary_review_or_blocker
- no_fake_scan_pass
- evidence_ledger_entry


Production-grade proof split:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, streaming, tools, MCP, memory, team, telemetry, security, and WebUI/API paths.

Required runtime evidence row must use `phase_id: 05-safety-claim-boundaries` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If the current phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
