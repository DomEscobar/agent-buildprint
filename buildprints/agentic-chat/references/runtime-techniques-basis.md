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
- **Assumed pre-existing/external tool as the only proof** — the building agent must implement or wire at least one real tool/skill/MCP server itself during phase 04; pointing at a hypothetical third-party tool it never authored or configured does not satisfy `SelfImplementedActionEvidence`.
- **Deterministic test double as the phase-04 proof provider** — the tool-calling and action-selection evidence must run against a live, real-running provider connection (local model runtime or paid provider actually invoked); the test double is a unit-test fixture only.

## Live proof requirements (no paid-key mandate)

"Live" means a real, running model connection actually invoked — not that a paid API key is required. A free local model runtime (for example Ollama) satisfies this as long as it is genuinely reachable and streaming real tokens; the deterministic test double never does. Pair this with a real tool/skill/MCP server the building agent authors or wires itself (see `01-project-setup.md` and `03-phases/04-agentic-loop-runtime.md`) so the tool-calling proof exercises actual working logic, not an assumed external capability.

## Reference implementation: open-multi-agent (OMA)

[open-multi-agent/open-multi-agent](https://github.com/open-multi-agent/open-multi-agent) is a TypeScript multi-agent orchestration framework (MIT, production use, 6k+ stars) that implements several of the techniques above concretely enough to adopt their shape directly:

- **Frozen Plan Artifact + Replay** (`planOnly` → `createPlanArtifact` → `runFromPlan`) — the supervisor/coordinator decomposition runs once and freezes as a versioned, diffable JSON artifact (task ids, dependencies, assignees, retry policy); replay re-executes the exact graph without re-invoking the supervisor. This is the concrete mechanism this packet's `SwarmRun` resumability should implement: freeze the approved decomposition as a `SwarmPlanArtifact`, then restart/resume replays execution from that artifact instead of re-planning — deterministic, auditable, and cheaper than a fresh supervisor call.
- **Proposer→Judge Consensus Loop** (`runConsensus`: a proposer emits an answer, a judge roster tries to refute it over bounded rounds, a quorum decides accept/reject, dissent optionally feeds back for revision) — a concrete, stronger implementation option for this packet's `VerifierResult` requirement, especially valuable for swarm fan-in synthesis or any high-stakes final answer.
- **Budget invariant** — consensus/judge/delegation/subagent token usage all roll into the *same* run-level budget as the rest of the pipeline; there is no separate, bypassable sub-budget. This packet's `BudgetPolicy` must enforce the same invariant: model turns, tool calls, verifier/consensus rounds, and subagent/delegation spend all count against one run-level budget, never fragmented per-feature budgets that let total spend exceed the real ceiling.
- **Named context strategies** (`sliding-window`, `summarize`, rule-based `compact`, `custom`) plus **already-consumed tool-result compression** (replace tool output with a short marker once the agent has acted on it) and **per-tool/per-agent output truncation** (head+tail excerpt with a marker) — concrete shapes for this packet's `ContextPack`/context-packing requirement, so compaction is a deliberate pluggable strategy rather than unspecified trimming.
- **Deterministic model-routing rule table** (`modelRouting`: match by `phase`/`agent`/`taskRole`/`taskPriority`/`leaf`/`hasDependencies`, first match wins, opt-in, non-mutating) — a concrete shape for the optional "model cascading / tiered routing" seam in `EXTENSIONS.md`, should a builder implement it.

Source: https://github.com/open-multi-agent/open-multi-agent — `docs/consensus.md`, `docs/plan-replay.md`, `docs/model-routing.md`, `docs/context-management.md`, `docs/checkpoint.md`.

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
