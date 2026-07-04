# Extensions and capability seams

This packet builds a **capability ladder** (`capability_maturity` in `blueprint.yaml`): `streaming_chat_core` → `agentic_chat` → `agentic_swarm`. Runtime technique selection is grounded in `references/runtime-techniques-basis.md` (sourced from [agentic-runtime-techniques](https://github.com/DomEscobar/agentic-runtime-techniques)).

The agentic action loop, production runtime layers (harness, budget, loop breaker, trust zones, verifier, run receipt), the tool/skill/MCP/memory policy path, and the parallel subagent swarm are **in scope and built through phases 04 and 05** — not deferred 1.0 cut-content. `03-phases/04-agentic-loop-runtime.md` promotes the loop/tool/MCP/memory/runtime-governance seams into the goal-to-action product loop; `03-phases/05-swarm-dispatching.md` promotes the swarm seam.

The honesty discipline is unchanged: a level counts as built only when it is proven by a real product path. Until a level is proven it stays an **honest blocked seam** — designed, wired, and surfaced as a blocked state, never stubbed, faked, keyword-matched, or advertised as working.

Hard rule: do not advertise an unavailable adapter as working. Either prove it through the product loop or show a user-visible blocked state with an exact missing credential, permission, runtime, command, or decision.

## In scope, built with proof discipline

### Stateful harness and session durability (phase 04)

- Seam: `AgentHarness` + `SessionEvent` append-only log; UI/session owns transcript and steering; loop is stateless inside harness; replay derives active state.
- Built rules: single-runner invariant, steering/follow-up queue, cancellation, dangling tool-call repair, run receipt export.
- Proof: user steers mid-run; cancel then continue without broken tool-call state; session events and run receipt read back after restart.

### Runtime governance (phase 04)

- Seam: `BudgetPolicy`, `LoopBreaker`, `ContextPack`, `TrustZone`, `ActionScreening`, `CapabilityGrant`, `VerifierResult`, `IdempotencyKey`.
- Built rules: budgets visible in UI; loop-break stops are typed; untrusted context cannot silently widen tool authority; write/external effects are idempotent where duplicates would harm.
- Proof: injected no-progress loop stops honestly; budget warn/hard-stop surfaces; screened action blocks or escalates; verifier blocks fake completion.

### Tools and skills (phase 04)

- Seam: a `tool_request` → `policy_result` → `approval_record` → `tool_result` path that runs through the same turn/event pipeline as a model turn.
- Built rules: model-driven selection via the provider's native tool/function-calling interface (never keyword/regex intent matching), explicit allowlist, typed results, audit records, inline approval/block UI attached to the message, tool error recovery as observations, and no execution from implicit model text.
- Proof: the model autonomously selects a deterministic safe tool that executes; a dangerous/unconfigured action blocks without side effect; both persist audit records.

### MCP policy (phase 04)

- Seam: an `mcp_adapter_record` that maps enabled MCP servers/tools into the same tool policy path (connection posture, allowlist status, timeout/error, side-effect class).
- Built rules: external MCP/browser/file execution stays blocked until allowlists, credentials, side-effect policy, and proof exist; once proven, it runs through the same approval gate, capability grant, and audit trail as native tools.

### Memory and compaction (phase 04)

- Seam: scoped `memory_read` / `memory_write_decision` / `compaction_summary` records that affect or explain a real turn, with privacy/retention posture; integrates with context packing.
- Built rules: memory is scoped (not a global notes blob), summarized in product language (no raw store/vector dumps), and write policy distinguishes auto-write/ask/skip/block.

### Subagents, delegation, and swarm dispatching (phase 05)

- Seam: a `subagent_record` capturing delegation request, reason, input/output summary, status, and trace linkage, plus a `swarm_run` with `delegation_ledger`, bounded-concurrency dispatch, no-progress breaker, and fan-in synthesis.
- Built rules: no fabricated or sequential-relabeled-as-parallel subagent work; real concurrency with isolated per-subagent context and scoped tool/MCP access; approval gate before side-effecting swarms; per-subagent and whole-swarm cancellation; bounded retry; honest partial-failure synthesis; resumable runs; per-worker run receipts.
- Proof: a goal that needs parallel work spawns real concurrent subagents whose results the supervisor synthesizes into one goal-tied answer, with at least one injected partial failure handled honestly.

## Telemetry beyond core

Core telemetry (per-turn/per-provider tokens, latency, cost) ships at the foundation. Per-tool, per-memory, per-subagent, per-swarm, budget, and loop-breaker telemetry segments are built alongside their capabilities at levels 2 and 3.

## Optional seams (honest blockers until proven)

These techniques from the runtime catalog are **designed seams**, not hidden stubs:

- **Model cascading / tiered routing** — cost-quality routing across models.
- **Semantic / prompt caching** — repeated-prefix cost reduction.
- **A2A remote agent protocol** — third-party remote agents beyond local MCP.
- **Research loop artifacts** — source ledger, citation verifier, gap analysis (unless user extends scope).
- **Coding harness loop** — repo/worktree/test/reviewer path (out of default packet scope).
- **Test-time compute search** — self-consistency, tree search, PRM-guided step search.
- **Saga / compensating transactions** — multi-API transactional rollback beyond idempotency keys.
- **Offline regression eval / red-team loop** — pair with `agentic-chat-eval-harness` buildprint.
- **Branchable session replay** — multiple active conversation leaves beyond append-only log + resume.

## Still deferred (out of this packet)

These remain genuinely out of scope and must stay honest blockers, not stubs:

- Distributed/remote subagent execution across machines or a hosted worker fleet (this packet's swarm runs in-process with a bounded local concurrency pool).
- Multi-tenant or shared-team workspaces, accounts, and per-user isolation beyond personal local use.
- Public/untrusted hosting hardening (abuse limits, secrets management at scale, tenant isolation) — gated by the same `deployment_posture` rules.
- Long-horizon autonomous operation without a human approval gate on side effects.
