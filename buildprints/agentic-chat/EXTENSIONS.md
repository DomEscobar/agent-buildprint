# Agentic Capability Extensions

These capabilities extend the streaming chat core into a complete Agentic Chat. They may be blocked at the `streaming_chat_core` maturity level, but they are required as typed runtime paths, proof, or explicit blockers before the packet may claim `agentic_chat`.

Why staged: the foundation must first prove real model streaming, provider routing, persistence, and chat-native UI. Half-shipping tools, MCP, memory, and subagents as deterministic stubs is exactly the breadth-without-depth failure this packet avoids. After the core is proven, `03-phases/04-agentic-loop-runtime.md` promotes these seams into the goal-to-action product loop.

Hard rule: do not advertise an unavailable adapter as working. Either prove it through the product loop or show a user-visible blocked state with an exact missing credential, permission, runtime, command, or decision.

## Tools and skills

- Runtime path: a `tool_request` -> `policy_result` -> `approval_record` -> `tool_result` path that runs through the same turn/event pipeline as a model turn.
- Hard rules when built: explicit allowlist, typed results, audit records, inline approval/block UI attached to the message, and no execution from implicit model text.
- Proof when built: a deterministic safe tool executes; a dangerous/unconfigured action blocks without side effect; both persist audit records.

## MCP policy

- Runtime path: an `mcp_adapter_record` that maps enabled MCP servers/tools into the same tool policy path (connection posture, allowlist status, timeout/error, side-effect class).
- Hard rules when built: external MCP/browser/file execution stays blocked until allowlists, credentials, side-effect policy, and proof exist.

## Memory and compaction

- Runtime path: scoped `memory_read` / `memory_write_decision` / `compaction_summary` records that affect or explain a real turn, with privacy/retention posture.
- Hard rules when built: memory is scoped (not a global notes blob), summarized in product language (no raw store/vector dumps), and write policy distinguishes auto-write/ask/skip/block.

## Subagents and delegation

- Runtime path: a `subagent_record` capturing delegation request, reason, input/output summary, status, and trace linkage.
- Hard rules when built: no fabricated subagent work; deterministic/local delegation is acceptable only when clearly labeled, with an honest claim ceiling.

## Telemetry beyond core

Core telemetry (per-turn/per-provider tokens, latency, cost) ships with the streaming foundation. Per-tool/per-memory/per-subagent telemetry segments ship or block with the full agentic capabilities above.
