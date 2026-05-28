# Phase 05: Report Agent Task Loop

## How to implement this phase

phase_id: 05-report-agent-task-loop

Before writing code, read:

- Packet file `03-phases/phase-flow.md`
- Runtime artifact `.buildprint/next-agent.md` if it exists
- `AGENTS.md` in the implementation project
- Packet file `02-project-setup.md`
- Packet file `01-questions.md`
- Resolve requires_roles through `06-contracts/<role>.md`
- Packet file `06-contracts/product-architect.md`
- Packet file `06-contracts/ux-ui-craft.md`
- Packet file `06-contracts/integration-runtime.md`
- Packet file `06-contracts/security-boundary.md`
- Packet file `06-contracts/data-persistence.md`
- Packet file `06-contracts/test-and-verification.md`

requires_roles: [product-architect, ux-ui-craft, integration-runtime, security-boundary, data-persistence, test-and-verification]

Follow phase-flow required artifacts before code and before evidence. Packet seed evidence remains in packet file `05-evidence/evidence-ledger.jsonl`; runtime evidence belongs only in `.buildprint/evidence/evidence-ledger.jsonl`.

A handoff and return artifact is required for every role in requires_roles before phase_core_passed.

## Phase mode contract

blueprint_mode: automation
phase_style: task_loop_contract

This phase is an automation task loop for the report agent. It must plan-execute-observe report generation, enforce stop condition and force_regenerate approval semantics, and provide trace evidence for tool calls, section writes, logs, and report completion.

## Capability outcome

Generate, persist, read, and download a simulation report with visible section progress, tool/log timeline, force regeneration behavior, and honest provider blockers. The user can move from simulated world observation to report analysis and then unlock interaction surfaces.

## Mapped capability obligations

- Preserve async report generation with project/simulation/graph preconditions and force_regenerate behavior.
- Preserve report status, progress, sections, Markdown download, by-simulation lookup, and interaction unlock when complete.
- Preserve structured agent action logs and console log incremental/stream reads.
- Preserve report UI with reader, section progress, tool/log timeline, loading/error states, completed report, and download.

## Behavior compatibility contract

Target disposition: preserve/replace. Equivalent target behavior is required, not route/function parity. The report agent implementation may change if it preserves async task lifecycle, provider adapter boundaries, tool-call trace, section persistence, report download, and no fake completion.

Compatibility impact:

- A deterministic report provider may prove task loop trace and persistence, but cannot claim live LLM/Zep behavior.
- Force_regenerate must be explicit, idempotent where possible, and traceable.
- Report completion cannot be claimed from placeholder text, static Markdown, or review prose.

## Implementation scope

Implement report task start/status/read/download APIs, precondition checks, force_regenerate handling, report agent adapter, graph/simulation context provider, tool/log writers, incremental log readers, report section store, and report UI reader/progress/log states.

## Interfaces touched

- API/controller endpoints for report generate, status, progress, sections, by-simulation read, download, logs, and stream/incremental reads.
- Automation worker for report task loop, stop condition, retry/error mapping, tool trace, console log capture, and report persistence.
- LLM/Zep adapters for graph/simulation context and live-proof blockers.
- Browser report screen with section progress, tool/log timeline, reader, download, blocked-provider state, and interaction unlock.

## State/runtime touched

Own report task state, report sections, full Markdown report, by-simulation index, force_regenerate state, agent action logs, console logs, progress counters, and completion/unlock state. Persistence must support durable readback and download.

## UX/UI requirements

This phase is UI-bearing. The report screen must provide a report reader, section progress, visible tool/log timeline, loading/error/blocked-provider states, download action, and clear transition to interaction when complete. UI proof needs repeatable_browser_e2e, visual_quality_gate, Screenshot critique, and no raw text-list substitute for report sections or tool logs.

## Safety/security constraints

Do not leak provider keys, private source text, raw prompts, or unapproved provider responses in logs/evidence. Validate report ids and download paths. Force_regenerate requires explicit user intent. Logs must support redaction and bounded incremental reads.

## Quality gates

- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e
- visual_quality_gate
- automation_trace_proof for task loop, stop condition, approval, and trace
- report_section_persistence_readback
- log_from_line_and_stream_tests
- no_fake_completion_scan

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists.

## Proof gate

Gate: report_agent_trace_sections_logs_chat_seed_proof.

Required proof includes report precondition tests, task trace, force_regenerate approval/semantics, section readback, Markdown download, from_line log read, stream counts, malformed/missing log handling, browser report path, provider blocker/proof row, and evidence row with phase_id: 05-report-agent-task-loop.

## Repair routing

Repair the current phase for report task, provider adapter, log, persistence, UI, or proof failures. Route missing simulation observability inputs to Phase 04. Route architecture contradictions to packet file `02-project-setup.md`. Route product/credential forks to packet file `01-questions.md`. Record live-provider blockers only in `.buildprint/evidence/evidence-ledger.jsonl`.
