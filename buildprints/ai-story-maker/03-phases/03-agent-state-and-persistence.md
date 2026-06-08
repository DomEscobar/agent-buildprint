# 03 Agent State And Persistence

## How to implement this phase

Read `02-ui-identity.md` before backend or realtime work because assistant state and persistence are visible product behavior. Then read `blueprint.yaml`, `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, current project `AGENTS.md` if present, `docs/architecture.md`, prior phase handoffs, and the active code contracts. Treat assistant messages as product interactions, not logs.

## Building objective

Implement the realtime production assistant and durable flow-data backend. The assistant must connect with the active project and episode context, show connection state, accept user instructions, support stop/reconnect, maintain visible history, and update the same canvas artifacts the user sees. It must not be a separate chat transcript that leaves the canvas unchanged.

Build APIs/events equivalent to these behaviors: fetch flow data by project and episode, save flow data, update context when the selected episode changes, return sanitized flow data to assistant tools, add/update/delete derived assets, add/edit/delete storyboard frames, update storyboard image URLs, and record assistant history/memory. Use strict validation for ids and payload shapes. Persist state in a durable relational store and keep generated media paths separate from user-facing URLs.

The assistant can use deterministic local tool behavior when provider credentials are missing, but it must expose live-provider blockers honestly. If model/provider lookup fails, the UI should say what is missing and what to configure. Do not let the assistant claim that it generated script, storyboard, images, or video unless the corresponding canvas state changed and the relevant provider path actually ran or is clearly marked simulated test-only.

This phase should also harden auth/session behavior around realtime connections. Socket or realtime channels must reject unauthenticated users, require project/episode context, and cleanly handle disconnects. Clearing memory/history should require confirmation and visible result.

## DO NOT

- Do not let chat output be the only place where generated production work exists.
- Do not ship placeholders, functionless buttons, or mocked/sample data counted as proof.
- Do not fake tool success when persistence or provider calls fail.
- Do not accept arbitrary project/episode ids without authorization checks.
- Do not leak secrets, tokens, raw provider responses, or internal tool JSON in the main UI.
- Do not make memory clearing or destructive graph mutations silent.
- Do not skip readback proof after assistant-driven mutations.

## Minimum proof before moving on

- Flow-data fetch and save APIs validate project and episode ids.
- Assistant connects only when authenticated and scoped to the selected project/episode.
- Sending a production instruction produces a visible assistant response and either mutates canvas state or records a truthful blocker.
- At least one assistant/tool mutation is persisted and read back after reload.
- Stop/reconnect/disconnect states are visible and tested.
- Provider-missing state is tested without fake success.
- Memory/history clear path requires confirmation and updates visible history or records a blocker.

## Handoff note

Record API/event names, validation rules, persistence tables, assistant tool list, tested mutation, provider blocker status, and any security gaps that prevent private/public deployment claims.
