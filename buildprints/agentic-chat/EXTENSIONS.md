# Extensions (deferred, not in 1.0 core)

These capabilities are intentionally **out of the 1.0 build**. They are documented here as designed seams so the core stays narrow and deep instead of broad and stubbed. Do not build, stub, mock, or advertise them as working in 1.0. Each becomes its own phase later, gated by the same proof discipline as the core (`03-phases/critical-review-pushback.md`).

Why deferred: the 1.0 goal is a genuinely shippable real-model streaming chat. Half-shipping tools, MCP, memory, and subagents as deterministic stubs is exactly the breadth-without-depth failure this packet avoids.

## Tools and skills

- Seam: a `tool_request` → `policy_result` → `approval_record` → `tool_result` path that runs through the same turn/event pipeline as a model turn.
- Hard rules when built: explicit allowlist, typed results, audit records, inline approval/block UI attached to the message, and no execution from implicit model text.
- Proof when built: a deterministic safe tool executes; a dangerous/unconfigured action blocks without side effect; both persist audit records.

## MCP policy

- Seam: an `mcp_adapter_record` that maps enabled MCP servers/tools into the same tool policy path (connection posture, allowlist status, timeout/error, side-effect class).
- Hard rules when built: external MCP/browser/file execution stays blocked until allowlists, credentials, side-effect policy, and proof exist.

## Memory and compaction

- Seam: scoped `memory_read` / `memory_write_decision` / `compaction_summary` records that affect or explain a real turn, with privacy/retention posture.
- Hard rules when built: memory is scoped (not a global notes blob), summarized in product language (no raw store/vector dumps), and write policy distinguishes auto-write/ask/skip/block.

## Subagents and delegation

- Seam: a `subagent_record` capturing delegation request, reason, input/output summary, status, and trace linkage.
- Hard rules when built: no fabricated subagent work; deterministic/local delegation is acceptable only when clearly labeled, with an honest claim ceiling.

## Telemetry beyond core

Core telemetry (per-turn/per-provider tokens, latency, cost) ships in 1.0. Per-tool/per-memory/per-subagent telemetry segments are deferred with the capabilities above.
