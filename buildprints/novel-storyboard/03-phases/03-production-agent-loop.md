# Phase 3 - Production Agent Chat And Board Updates

## Phase mode contract

`blueprint_mode: product`

`phase_style: outcome_flow`

This phase delivers the production-agent control loop as a user-visible product flow: send a chat instruction, receive streamed or structured agent events, update the board and stop safely.

## Build target

Implement:

- authenticated production-agent socket/channel scoped by project and episode;
- right chat panel with connected/disconnected, pending, streaming, stopped and error states;
- chat send and stop actions;
- XML/event parser for script, scriptPlan, storyboardTable and storyboardItem updates;
- duplicate/malformed event handling;
- trace recording for each agent run.

## Interfaces touched

- Socket namespace or equivalent realtime endpoint.
- Client chat store.
- FlowData mutation boundary.
- Agent runtime adapter with fake model stream for tests.

## State/runtime touched

Agent messages, parsed board updates and abort state must be scoped to project/episode. Partial updates must not corrupt persisted board state.

## UX/UI requirements

- Chat panel is resizable and does not cover the entire board by default.
- Stop action is visible while generation is pending/streaming.
- Errors show actionable messages without deleting board state.
- Memory clearing, if implemented, must require confirmation.

## Safety/security constraints

Socket must reject missing/invalid session and missing isolation scope. Agent output is untrusted input and must be parsed defensively. No prompt or trace may include provider secrets.

## Implementation loop

1. Implement authenticated socket/channel.
2. Implement fake agent stream and trace ledger.
3. Implement XML/event parsing and board mutation.
4. Add stop/error paths.
5. Verify with socket and browser tests.

## Proof gate

- Socket tests: invalid auth rejected, valid scoped connection accepted, stop aborts run.
- Parser tests: valid script/plan/table/storyboard item updates; malformed/duplicate/partial XML handled.
- Browser test: chat instruction updates board state and stop leaves board consistent.
- Evidence row: `phase_id=03-production-agent-loop`, `proof_type=agent_runtime_trace`.

## Repair routing

If agent output bypasses validation or corrupts board data, repair this phase. If auth/session risk appears, route through `06-contracts/security-boundary.md`.

## Stop condition

Stop if a model/provider is required for the test. Use fake model stream for contract proof and record live-provider blocker.

## Unlocks

Unlocks Phase 4 once agent-driven board updates and stop behavior are proven.
