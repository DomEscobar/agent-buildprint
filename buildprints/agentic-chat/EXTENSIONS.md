# Extensions and capability seams

This packet builds a **capability ladder** (`capability_maturity` in `blueprint.yaml`): `streaming_chat_core` → `agentic_chat` → `agentic_swarm`. The agentic action loop, the tool/skill/MCP/memory policy path, and the parallel subagent swarm are now **in scope and built through phases 04 and 05** — not deferred 1.0 cut-content.

The honesty discipline is unchanged: a level counts as built only when it is proven by a real product path. Until a level is proven it stays an **honest blocked seam** — designed, wired, and surfaced as a blocked state, never stubbed, faked, keyword-matched, or advertised as working. Half-shipping tools, MCP, memory, and subagents as deterministic stubs is exactly the breadth-without-depth failure this packet avoids.

## In scope, built with proof discipline

### Tools and skills (phase 04)

- Seam: a `tool_request` → `policy_result` → `approval_record` → `tool_result` path that runs through the same turn/event pipeline as a model turn.
- Built rules: model-driven selection via the provider's native tool/function-calling interface (never keyword/regex intent matching), explicit allowlist, typed results, audit records, inline approval/block UI attached to the message, and no execution from implicit model text.
- Proof: the model autonomously selects a deterministic safe tool that executes; a dangerous/unconfigured action blocks without side effect; both persist audit records.

### MCP policy (phase 04)

- Seam: an `mcp_adapter_record` that maps enabled MCP servers/tools into the same tool policy path (connection posture, allowlist status, timeout/error, side-effect class).
- Built rules: external MCP/browser/file execution stays blocked until allowlists, credentials, side-effect policy, and proof exist; once proven, it runs through the same approval gate and audit trail as native tools.

### Memory and compaction (phase 04)

- Seam: scoped `memory_read` / `memory_write_decision` / `compaction_summary` records that affect or explain a real turn, with privacy/retention posture.
- Built rules: memory is scoped (not a global notes blob), summarized in product language (no raw store/vector dumps), and write policy distinguishes auto-write/ask/skip/block.

### Subagents, delegation, and swarm dispatching (phase 05)

- Seam: a `subagent_record` capturing delegation request, reason, input/output summary, status, and trace linkage, plus a `swarm_run` capturing supervisor decomposition, bounded-concurrency dispatch, and fan-in synthesis.
- Built rules: no fabricated or sequential-relabeled-as-parallel subagent work; real concurrency with isolated per-subagent context and scoped tool/MCP access; approval gate before side-effecting swarms; per-subagent and whole-swarm cancellation; bounded retry; honest partial-failure synthesis; resumable runs.
- Proof: a goal that needs parallel work spawns real concurrent subagents whose results the supervisor synthesizes into one goal-tied answer, with at least one injected partial failure handled honestly.

## Telemetry beyond core

Core telemetry (per-turn/per-provider tokens, latency, cost) ships at the foundation. Per-tool, per-memory, per-subagent, and per-swarm telemetry segments are built alongside their capabilities at levels 2 and 3.

## Still deferred (out of this packet)

These remain genuinely out of scope and must stay honest blockers, not stubs:

- Distributed/remote subagent execution across machines or a hosted worker fleet (this packet's swarm runs in-process with a bounded local concurrency pool).
- Multi-tenant or shared-team workspaces, accounts, and per-user isolation beyond personal local use.
- Public/untrusted hosting hardening (abuse limits, secrets management at scale, tenant isolation) — gated by the same `deployment_posture` rules.
- Long-horizon autonomous operation without a human approval gate on side effects.
