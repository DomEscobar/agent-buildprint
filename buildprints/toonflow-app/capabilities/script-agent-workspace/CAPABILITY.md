# Script Agent Workspace

Status: `INCLUDED_NEEDS_PROOF`
Depth status: `CONTRACT_SEAM_ONLY`

## Owned source surfaces

- sockets.scriptAgent.*
- routes.scriptAgent.*
- agents.scriptAgent.*
- skills.script.*
- tables.o_agentWorkData
- tables.o_script
- tables.o_setting

## Product obligations

- Preserve authenticated script-agent chat, workspace update events, model/memory context, stop/error behavior, and script planning persistence.

## Agent Brief

Goal: Authenticated users chat with a script-planning agent that uses project context, chapter text/events, memory, and sub-agents for story skeleton, adaptation strategy, script writing, and supervision.
Status: INCLUDED_NEEDS_PROOF; CONTRACT_SEAM_ONLY.
Dependencies: Socket namespace, streaming response model, agent orchestration, workspace get/set events, memory service, script API persistence.
Stable behavior: Decision agent delegates to story skeleton, adaptation strategy, script writer, and supervisor with XML workspace contracts.
Implementation freedom: internal framework, module names, and storage library are free if observable behavior and proof obligations are met.
Forbidden substitutions: static labels, no-op controls, route-shaped endpoints, deterministic providers, or in-memory-only state may not count as production behavior.
First implementation slice: build the smallest vertical path that exercises this capability through UI/API/domain/persistence/provider layers as applicable.
First verification gate: Socket integration test with sandbox text model and stop/error branches
Required evidence: artifacts/script-agent-socket.trace; BLOCKED_WITH_REASON: socket/provider/browser proof not run.
No-fake checks: prove state changes, negative branch, and runtime/browser/provider evidence where applicable.
Stop or escalate when: Needs real socket stream proof, model sandbox, and browser workspace evidence.

## Behavior Contract

- User/system action: Authenticated users chat with a script-planning agent that uses project context, chapter text/events, memory, and sub-agents for story skeleton, adaptation strategy, script writing, and supervision.
- Accepted inputs: see API/UI/domain contracts below; validate required fields and reject malformed input.
- Observable outputs: successful state mutation, returned data/file/socket stream, or explicit error reason.
- Important state: Memory table and script/workspace tables.
- Failure/empty/loading/blocked states: Invalid token, missing isolationKey, provider errors, abort handling.
- Provider/persistence/runtime/operational boundary: scriptAgent model family and tools.

## Stable vs Free

| Stable | Free |
|---|---|
| Authenticated users chat with a script-planning agent that uses project context, chapter text/events, memory, and sub-agents for story skeleton, adaptation strategy, script writing, and supervision. | Implementation framework/component/database abstraction. |
| Invalid token, missing isolationKey, provider errors, abort handling. | Exact internal error class names. |
| Socket integration test with sandbox text model and stop/error branches | Test runner and artifact naming, if equivalent evidence is produced. |

## Source Evidence

- OBSERVED Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/socket/index.ts:5-15; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/socket/routes/scriptAgent.ts:48-89; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/agents/scriptAgent/index.ts:41-89,141-233; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/agents/scriptAgent/tools.ts:34-117

