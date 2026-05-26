# Phase 06 — WebUI API Workbench

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this phase through `03-phases/phase-flow.md`:

1. declare phase objective
2. assemble required roles
3. dispatch bounded subagent tasks or simulate them explicitly if subagents are unavailable
4. collect reviews
5. integrate
6. verify
7. record evidence

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

requires_roles:
  - product-architect
  - ux-ui-craft
  - integration-runtime
  - security-boundary
  - test-and-verification

## Product outcome

Expose the personal agent OS as a usable local workbench: bootstrap state, streamed chat, traces, provider diagnostics, tools, skills, MCP, memory, team, tokens, config diagnostics, accessible error states, and no-credential deterministic operation.

## Source evidence

- Source path agent/webui.py shows WebSocket/HTTP boundary and bootstrap/config/memory/tokens/model routes.
- Source paths webui/src/views show chat, model, tools, skills, MCP, memory, team, tokens, and config workbench tabs.
- Runtime source signals require trace, memory, token, provider, skill, tool, and team state to be observable.

## Source surface dispositions

- Workbench UI breadth: preserve with equivalent target behavior. Compatibility impact: exact Vue UI, visual style, copy, assets, and metaphor are dropped.
- Chat stream and trace view: preserve. Compatibility impact: transport may be SSE, WebSocket, fetch stream, or equivalent if event contract is maintained.
- Provider/tools/skills/MCP/memory/team/tokens/config views: preserve. Compatibility impact: screens can be minimal but must be wired end to end.
- Browser QA path: preserve. Compatibility impact: if browser automation is unavailable, record blocker and provide local HTTP evidence without upgrading browser claim.

## Implementation scope

Implement local UI/API paths that exercise the deterministic runtime: bootstrap, select/use test provider, send a message, observe deltas, tool trace or denial, final answer, token count changes, memory/history update, and diagnostics. Avoid a marketing landing page; first screen should be the workbench.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: bootstrap, chat stream, traces, provider config, tools, skills, MCP, memory, team, tokens, config diagnostics.
- Provider/tool contracts: UI-visible event stream and diagnostics.

## State/runtime touched

- Database/persistence: read/write memory edits, messages, traces, token totals, team tasks, selected config.
- Env/config: local no-credential mode plus visible blocked states for missing live provider/MCP config.
- Jobs/workers/runtime: stream transport, cancellation/retry if supported.
- Runtime artifacts/generated outputs: runtime artifact browser screenshot or DOM capture, local HTTP transcript, stream event transcript.

## UX/UI requirements

Design a dense, utilitarian local workbench rather than a landing page. Required states: empty chat, streaming/loading, tool denied/blocked, provider error, MCP disabled/timeout, memory empty/edited, team task created/completed/failed, token totals ready, config diagnostics blocked/ready, responsive desktop/mobile layout, keyboard-accessible controls, no incoherent overlap.

## Safety/security constraints

Do not display or store secret values. Dangerous actions need clear blocked/approval states. UI must not imply billing, publishing, hosted auth, browser/network/shell execution, real MCP, or live provider readiness without proof. Memory and telemetry may include sensitive user content and should stay local by default.

## Quality gates

- Static/typecheck/build gate.
- Local API or browser path from bootstrap to streamed deterministic answer.
- UI/DOM or screenshot evidence for workbench states where browser tooling is available.
- Tests or smoke checks for memory and token state visible after chat turn.
- Claim-boundary review for unsupported live/external/hosted features.

## Proof gate

Proof id: proof-webui-api-workbench
Required proof types:
- unit_or_integration_test
- runtime_or_browser_trace_or_blocker
- persistence_roundtrip_or_blocker
- security_boundary_review_or_blocker
- no_fake_scan_pass
- evidence_ledger_entry

Required runtime evidence row must use `phase_id: webui-api-workbench` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If the current phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
