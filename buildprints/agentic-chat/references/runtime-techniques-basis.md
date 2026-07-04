# Runtime Techniques Basis

Research artifact:

```text
https://github.com/DomEscobar/agentic-runtime-techniques
```

Validated 2026-07-04. The repo is a field guide to agentic loops, harnesses, orchestration patterns, and production runtime primitives. It names techniques clearly, compares tradeoffs, and provides machine-readable discovery data in `data/agent-discovery-index.yml` and `data/techniques.yml`.

This buildprint uses that catalog to close gaps between "streaming chat with tools" and a **professional general agentic chat** — bounded, inspectable, resumable, and safe under real use.

## Product use-case mapping

Agentic Chat is primarily:

| Discovery index use case | Why it applies |
| --- | --- |
| `simple_tool_assistant` | Default chat path: model decides when to call allowlisted tools/MCP/memory |
| `multi_step_task_agent` | Goals span plan → act → observe → critique → continue |
| `risky_action_agent` | Side-effecting tools/MCP/swarm dispatch need HITL approval and audit |
| `durable_background_agent` | Runs must survive reload/restart; agent runs outlive a single HTTP request |
| `multi_agent_system` | Full claim (`agentic_swarm`) uses supervisor/worker coordination |

Secondary (honest blockers or extensions, not v1 floor):

| Use case | Posture in this packet |
| --- | --- |
| `research_agent` | Optional tool path; source ledger/citation verifier not required for core claim |
| `coding_agent` | Out of scope unless user extends; no coding-harness loop required |
| `cost_sensitive_high_volume_agent` | Tiered routing/caching optional; budget governor required |
| `hard_reasoning_agent` | Test-time compute optional; verifier loop required for done-check |
| `interoperable_agent_platform` | MCP in scope; A2A remote agents deferred |

## Selected composition recipe

Canonical stack for this product (from decision guide **Reliable Tool Assistant** + production primitives):

```text
Intent / context router
  -> Stateful Harness Around Pure Agent Loop
  -> ReAct tool loop (provider tool/function calling)
  -> Plan-and-execute next-step state (visible, mutable)
  -> Tool error recovery
  -> Loop detection + budget policy engine
  -> Context packing / compaction before model calls
  -> Prompt-injection action firewall + capability grants (scoped tools)
  -> HITL approval gate (side effects)
  -> Verifier / goal done-check
  -> Run receipt + append-only session event log
  -> Trace attached to chat message
```

For `agentic_swarm`, add:

```text
Supervisor decomposition
  -> bounded task queue / worker pool
  -> typed subtask results + delegation ledger
  -> no-progress breaker
  -> fan-in synthesis + partial-failure honesty
  -> run receipt per worker and swarm
```

## Required runtime techniques (in scope)

These are **built and proven**, not aspirational prose. Each maps to contracts in `CONTRACTS.md` and architecture/setup requirements.

### Core loop shape

- **ReAct / core tool loop** — model-driven think → tool call → observation → continue/stop via provider tool/function calling (never keyword/regex routing).
- **Plan-and-execute next-step state** — mutable plan/todo artifact, progress status, stale-plan replan trigger, visible in product language.
- **Verifier / goal loop** — explicit goal + acceptance criteria; typed blocker when done cannot be verified; final synthesis only after verifier pass or honest blocked state.

### Harness and durability (Category 15 + 9)

- **Stateful harness around pure agent loop** — separates reusable agent brain from UI/session/persistence; caller-owned transcript; provider-neutral event stream; single-runner invariant; steering/follow-up queue; cancellation token; **dangling tool-call repair** before the next model request after cancel/interrupt.
- **Append-only session event log** — durable typed events (message, model step, compaction, approval, custom); derive active state by replay; supports readback and audit.
- **Task queue semantics for agent runs** — agent run can outlive one HTTP/stream connection; status events (`planning`, `acting`, `awaiting_approval`, etc.) emitted to UI.

### Safety and governance (Category 12 + 13)

- **HITL approval gate** — already required; extend with reject/edit branch and resumable pending-action state.
- **Prompt-injection action firewall** — screen each proposed action against original user intent when untrusted context (tool output, retrieved text, MCP content) influenced the model.
- **Context trust zones** — label context sources (`system`, `user`, `tool_output`, `retrieved`, `memory`); packing policy per zone.
- **Capability / least-privilege runtime** — grant scoped tool/MCP access per action or subtask; revoke on run completion; no global tool dump.
- **Runtime budget policy engine** — token, time, tool-call, step, and cost budgets with warn thresholds and hard stops; user-visible budget exhaustion state.

### Context and memory (Category 14)

- **Context packing / compression loop** — rank/filter/pack context before each model call; budget check; compaction entries with provenance (not silent drops).
- **Memory write/read policy** — already required; align with MemGPT-style paging posture: working context vs durable memory vs eviction.

### Observability (Category 17)

- **Run receipt / trace-first runtime** — exportable structured receipt: run id, goal, steps, tool calls, approvals, budgets consumed, errors, final synthesis, redaction policy.
- **Artifact provenance links** — action results and synthesis cite originating tool call / observation ids (flat trace is insufficient for audit).

### Reliability (Category 4 + failure map)

- **Loop detection circuit breaker** — detect repeated tool/action patterns and no-progress loops; stop with typed blocker, not infinite retry.
- **Tool error recovery** — errors become observations; schema mismatch and timeout taxonomy; optional **tool reliability scoring** when multiple tools overlap.
- **Idempotency keys** — side-effecting tool/MCP calls use idempotency keys to prevent duplicate external effects on retry/crash.

### Multi-agent (Category 8)

- **Supervisor + bounded worker pool** — phase 05; add **delegation ledger** and **max handoff depth** / no-progress breaker.
- **Typed result schemas** — subtask outputs are typed, not free-text concatenation.

## Selected optional techniques (design seams, blocked until proven)

Record as honest blockers in `EXTENSIONS.md` until implemented:

- **Model cascading / tiered routing** — route easy turns to cheaper models; requires router scoring proof.
- **Semantic / prompt caching** — cost optimization layer.
- **A2A remote agent protocol** — remote third-party agents beyond local MCP.
- **Self-consistency / tree search** — test-time compute for hard reasoning.
- **Saga / compensating transactions** — multi-API transactional side effects beyond single-tool idempotency.
- **Offline regression eval / red-team loop** — pair with `agentic-chat-eval-harness` buildprint.

## Rejected as substitutes for core runtime

- **Keyword/regex intent routing** — fails `agentic_chat` claim; model must select actions.
- **Prompt-only "agentic" behavior** — no tool loop, budget, harness, or receipt is a chat wrapper, not an agentic runtime.
- **Sequential subagents labeled parallel** — fails `agentic_swarm` claim.
- **Flat chat transcript as the only state** — no harness, no append-only events, no resumable run records.
- **Self-certifying completion** — worker decides it is done without verifier or typed blocker.

## Architecture implications

Setup must produce diagrams and contracts for:

1. Harness boundary (who owns transcript, queues, cancellation).
2. Budget governor (thresholds, hard stops, UI surfacing).
3. Trust zones and action screening path.
4. Context packing pipeline before provider calls.
5. Append-only session event log vs derived active state.
6. Run receipt export path.

See `architecture/agent-runtime-loop.md`, `architecture/state-and-memory-model.md`, and `architecture/failure-recovery-flow.md` — each must name these components or record an explicit blocker that lowers the claim ceiling.

## Source links

- https://github.com/DomEscobar/agentic-runtime-techniques
- https://raw.githubusercontent.com/DomEscobar/agentic-runtime-techniques/main/docs/decision-guide.md
- https://raw.githubusercontent.com/DomEscobar/agentic-runtime-techniques/main/docs/taxonomy.md
- https://raw.githubusercontent.com/DomEscobar/agentic-runtime-techniques/main/docs/security-governance-patterns.md
- https://raw.githubusercontent.com/DomEscobar/agentic-runtime-techniques/main/data/agent-discovery-index.yml

For automated consumption during implementation, start with `data/agent-discovery-index.yml`, then follow links into `data/techniques.yml` and the docs.
