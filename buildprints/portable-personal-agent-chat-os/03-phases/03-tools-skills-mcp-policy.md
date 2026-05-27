# Phase 03 — Tools Skills MCP Policy

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
  - integration-runtime
  - security-boundary
  - test-and-verification

## Product outcome

Wire policy-gated tools, selective skills, and MCP-style external tool adapters into the agent loop without allowing raw model text to execute. Deterministic fixtures prove allowed and denied paths.

## Mapped product obligations

- Source paths agent/tools/schema.py, registry.py, dispatch.py, filesystem, shell, web/search, task-list, and skills tools show schema-driven tool dispatch and risk surfaces.
- Source paths agent/skills.py and source path skills/*/SKILL.md show discoverable skills with instructions, triggers, scripts, and resources.
- Source paths agent/mcp/client.py, config.py, connection.py, and adapter.py show MCP server config and tool mapping.

## Behavior compatibility contract

- Tool registry and dispatcher: preserve through `ToolSpec`, schema validation, risk labels, audit events, and dispatcher.
- Dangerous filesystem/shell/network/browser tools: preserve as policy boundaries; default disposition is deny unless explicitly enabled. Compatibility impact: denied-by-default behavior intentionally differs from any permissive source setup.
- Skill discovery and injection: preserve equivalent target behavior; source skill content is not copied.
- MCP adapter: preserve by mapping enabled MCP tools into namespaced `ToolSpec` records. Compatibility impact: real MCP server interoperability is deferred; deterministic local MCP fixture proves mapping.

## Implementation scope

Add tool request parsing only for structured provider output, not arbitrary text. Validate input schema, evaluate risk policy, emit `tool.requested`, `tool.allowed` or `tool.denied`, and `tool.result` where applicable. Add skill registry selection and MCP adapter mapping through the same dispatcher.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: tool/skill/MCP bootstrap state and trace events.
- Provider/tool contracts: structured tool-call request contract, `ToolSpec`, `SkillSpec`, `McpServerSpec`, policy evaluator, deterministic tool fixtures.

## State/runtime touched

- Database/persistence: tool audit events, selected skill events, MCP mapping events, optional enabled/disabled config state.
- Env/config: allowed tool risk policy, bounded roots/timeouts, MCP server IDs, secret handles only.
- Jobs/workers/runtime: tool dispatcher, skill loader, MCP adapter boundary.
- Runtime artifacts/generated outputs: runtime artifact tool trace and deterministic MCP fixture transcript.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. If not user-facing, write `None - reason:` and name downstream UI obligations.


Runtime state must support UI rows for registered tools with risk labels, selected skills with enabled/disabled state, MCP servers/tools with health/timeout/blocked state, and clear denial reasons. Full workbench rendering is later.

## Safety/security constraints

No tool may execute from raw model text. Default policy allows only `safe` and bounded `read`. `write`, `network`, `shell`, browser, external MCP writes, publishing, billing, media upload, and retrieval providers require explicit config, bounded scope, and separate proof. Every denial must be auditable and should let the turn continue safely where possible.

## Quality gates

- Static/typecheck gate.
- Unit tests for schema validation and risk policy allow/deny.
- Runtime test where deterministic provider requests an allowed safe tool and receives a result.
- Runtime test where shell/write/network/browser-class action is denied and does not execute.
- Skill injection test proving selected skill only enters context.
- MCP fixture test proving namespaced mapped tool uses the same policy path.

## Proof gate

Additional production proof tracks:
- visual_quality_gate


Proof id: proof-03-tools-skills-mcp-policy
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

Required runtime evidence row must use `phase_id: 03-tools-skills-mcp-policy` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If the current phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
