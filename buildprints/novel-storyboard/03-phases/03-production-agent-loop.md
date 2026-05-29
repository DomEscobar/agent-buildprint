# Phase 03 - Production Agent Chat And Board Updates

## How to implement this phase

Before writing code, read:

- `03-phases/phase-flow.md`
- `.buildprint/next-agent.md`
- current project `AGENTS.md`

Then execute this current phase through `03-phases/phase-flow.md`: declare the phase objective in `.buildprint/phase-runs/<phase-id>/plan.md`, implement the first real chat-to-board update path inside the scaffold, verify, write `.buildprint/phase-runs/<phase-id>/proof.md`, and record evidence.

You may not append evidence or mark this phase passed until the phase-flow required artifacts exist.

## Phase mode contract

- blueprint_mode: product
- phase_style: outcome_flow
- Mode lens: product outcome flow with shared proof spine.
- Glance surfaces delivered: Agent chat controller.
- Product implementation rule: preserve source-backed outcome flows through UI/API/domain/provider/persistence boundaries without copying source implementation code.

## Product outcome

The user sends a chat instruction for the selected episode, receives streamed or structured agent events, sees visible storyboard frame changes, can stop safely, and keeps persisted board state consistent after errors or malformed output.

## Mapped product obligations

- Source path `productionAgent.ts` mapped authenticated socket/channel behavior.
- Source path `tools.ts` mapped agent tools for script, plan, storyboard table, and storyboard item updates.
- `02-project-setup.md` requires scoped socket auth, trace recording, untrusted XML/event parsing, and visible UI state changes.

## Behavior compatibility contract

- agent-socket-channel: preserve. Equivalent target behavior: authenticated project/episode scoped realtime channel. Compatibility impact: socket namespace/protocol may differ.
- structured-board-updates: preserve. Equivalent target behavior: agent output mutates validated FlowData through parser and mutation boundary.
- storyboard-frame-updates: replace. Equivalent target behavior: storyboard item updates surface as shot-frame prompt/status/continuity/media-state changes.
- live-model-stream: defer. Equivalent target behavior: fake model stream proves contracts; live model proof is credentialed.

## Implementation scope

Implement authenticated production-agent channel, chat panel connected/disconnected/pending/streaming/stopped/error states, send/stop actions, fake agent stream, trace ledger, XML/event parser, duplicate/malformed/partial handling, and scoped board mutation.

## Interfaces touched

- Socket namespace or equivalent realtime endpoint.
- Client chat store.
- FlowData mutation boundary.
- Agent runtime adapter with fake model stream for tests.

## State/runtime touched

Agent messages, parsed board updates and abort state must be scoped to project/episode. Partial updates must not corrupt persisted board state.

## UX/UI requirements

For UI-bearing work, apply `02-project-setup.md` visual and Screenshot critique requirements. Chat panel is resizable and does not cover the board by default. Stop action is visible while generation is pending/streaming. Agent-created storyboard updates must surface as visible shot-frame changes, not only raw text or invisible store mutations.

## Safety/security constraints

Socket must reject missing/invalid session and missing isolation scope. Agent output is untrusted input and must be parsed defensively. No prompt or trace may include provider secrets.

## Quality gates

- Socket tests for invalid auth, valid scoped connection and stop abort.
- Parser tests for valid, malformed, duplicate and partial XML/events.
- Browser test for chat instruction updating visible storyboard state and stop preserving consistency.
- Trace/evidence secret-redaction scan.

## Proof gate

Additional production proof tracks:
- visual_quality_gate

Proof id: proof-03-production-agent-loop
Required proof types:
- socket_or_realtime_test
- agent_runtime_trace
- parser_negative_test
- security_boundary
- repeatable_browser_e2e
- visual_quality_gate
- no_fake_scan_pass
- evidence_ledger_entry

Production-grade proof split:
- provider_adapter_config_test_required
- live_provider_proof_blocker_only
- worker_retry_cancel_recovery
- repeatable_browser_e2e

Missing live credentials block live proof only after adapter/config/test/runtime wiring exists for provider, media, worker/runtime, browser, agent, and deployment paths.

Required runtime evidence row must use `phase_id: 03-production-agent-loop` for the current phase and write to `.buildprint/evidence/evidence-ledger.jsonl` after phase-flow artifacts exist. The packaged `05-evidence/evidence-ledger.jsonl` is seed evidence only.

## Repair routing

If this phase fails verification, return here before editing again. Route architecture contradictions to `02-project-setup.md`, product-defining human ambiguity to `01-questions.md`, packet seed-only blockers to `05-evidence/evidence-ledger.jsonl`, and runtime proof/blocker rows to `.buildprint/evidence/evidence-ledger.jsonl`.
