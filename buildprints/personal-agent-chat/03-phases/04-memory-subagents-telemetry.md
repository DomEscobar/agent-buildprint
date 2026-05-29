# Phase 04 — Memory Subagents Telemetry

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
  - data-persistence
  - integration-runtime
  - security-boundary

## Product outcome

Complete the runtime intelligence layer: memory tiers, context assembly, compaction, checkpoint inspection, bounded subagent/team tasks, summarized team returns, and normalized token telemetry.

## Phase mode contract

blueprint_mode: product
phase_style: outcome_flow
- Mode lens: this phase proves the user/operator outcome of retaining useful context across turns, delegating bounded work, and inspecting token/runtime cost.
- Shared proof spine: preconditions are storage and streaming runtime; entrypoint is memory/context/team/telemetry services; execution behavior assembles context in required order, compacts when threshold is reached, creates team tasks through a bounded task loop, summarizes returns, and aggregates usage; state/artifact effects include memory rows, compaction markers, team task events, summaries, and telemetry totals; observable proof is context order, compaction, team lifecycle, and telemetry tests; failure/recovery covers missing memory, over-budget context, failed team task, and restart readback; non-goals are untraceable hidden delegation and live-provider accounting qualification.

## Mapped product obligations

- Source paths agent/memory.py and agent/compactor.py show long-term memory, raw history, daily episodes, checkpoint handling, and compaction.
- Source paths agent/subagents/* and agent/team/* show delegated tasks, team bus/events/store/tools.
- Source path agent/telemetry.py and UI token view signals show usage telemetry visible outside the runtime loop.

## Behavior compatibility contract

- Raw history, daily episodes, curated long-term memory, checkpoints, and attachment/source summaries: preserve with equivalent target behavior and durable storage.
- Context builder order: preserve ordering of runtime instructions, long-term memory, selected skills, team context, recent messages, attachments, and tool results.
- Subagent/team delegation: preserve through bounded `TeamTask` records and `team.task` events. Compatibility impact: hidden prompts or untraceable delegation are dropped.
- Telemetry counters: preserve input, output, cache read, cache create, total, context-window percent, compaction count, and per-provider totals.

## Implementation scope

Implement compaction threshold behavior with deterministic compactor output, retain recent messages, emit `memory.compacted`, update daily episode and optionally curated long-term memory through explicit structured output or human edit. Add team bus lifecycle and summary reinjection. Persist telemetry aggregates and expose query services for UI/API.

## Interfaces touched

- API/routes/adapters/frontend-backend contracts: memory read/edit, checkpoint inspect, team task list/detail, token usage queries.
- Provider/tool contracts: context builder input contract, compactor adapter, team task event contract.

## State/runtime touched

- Database/persistence: memory tiers, attachment/source summaries, checkpoints, team tasks/events/results, telemetry aggregates, compaction markers.
- Env/config: context window threshold, retained recent message count, compactor provider mode.
- Jobs/workers/runtime: compactor adapter, team bus, summarized result reinjection.
- Runtime artifacts/generated outputs: runtime artifact compaction transcript, team task transcript, token telemetry snapshot.

## UX/UI requirements

For UI-bearing work, apply the product-grade visual contract from `02-project-setup.md`: visual hierarchy, state coverage, responsive behavior, accessibility, and Screenshot critique are required before UX proof can upgrade. If not user-facing, write `None - reason:` and name downstream UI obligations.


Runtime state must support memory viewer/editor, checkpoint viewer, team task statuses (`created`, `started`, `message`, `completed`, `failed`), token usage current turn/session/provider totals, and clear blocked states for compaction or delegation failures.

## Safety/security constraints

Do not silently drop user instructions during compaction. Curated long-term memory updates require explicit compactor output or human edit. Subagents inherit the same tool policy unless narrowed. User memory exports, private logs, retrieval indexes, and media attachments are sensitive and cannot be published or sent externally without explicit permission.

## Quality gates

- Static/typecheck gate.
- Tests for memory roundtrip and compaction retention of recent messages.
- Context builder test proving selected skills/team/tool results are ordered and unselected skills stay out.
- Team bus test for lifecycle events and summarized result reinjection.
- Telemetry test for normalized counters, compaction count, context-window percent, and per-provider aggregate.

## Proof gate

Additional production proof tracks:
- visual_quality_gate


Proof id: proof-04-memory-subagents-telemetry
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

Required runtime evidence row must use `phase_id: 04-memory-subagents-telemetry` and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If the current phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
