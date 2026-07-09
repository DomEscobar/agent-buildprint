# Runtime Techniques Basis

Research artifact:

```text
C:\repos\agentic-runtime-techniques
```

Validated 2026-07-09. The repo is a field guide to agentic loops, harnesses, orchestration patterns, and production runtime primitives. It names techniques clearly, compares tradeoffs, and provides machine-readable discovery data in `data/agent-discovery-index.yml` and `data/techniques.yml`.

This capability buildprint uses that catalog to close gaps between "scenario runner with final-answer grading" and a **trace-first, regression-safe eval harness** that proves harness behavior, governance, and trajectory quality — not just chat prose.

## Product use-case mapping

Agentic Chat Eval Harness is primarily:

| Discovery index use case | Why it applies |
| --- | --- |
| `simple_tool_assistant` | Core-chat and tool-actions profiles prove multi-turn task completion and side effects |
| `multi_step_task_agent` | Scenarios must verify plan/todo progress, blocked states, and honest stops |
| `risky_action_agent` | Security-governance profile proves HITL, action screening, and capability grants |
| `durable_background_agent` | Harness-runtime profile proves cancellation, steering, session replay, and dangling-tool repair |
| `multi_agent_system` | Optional swarm profile when host runs supervisor/worker coordination |

Secondary (honest blockers or extensions, not v1 floor):

| Use case | Posture in this packet |
| --- | --- |
| `research_agent` | RAG profile only; source ledger/provenance graph scoring optional |
| `coding_agent` | Out of scope unless user extends; no coding-harness loop required |
| `cost_sensitive_high_volume_agent` | Provider-routing profile; budget exhaustion scenarios optional |
| `hard_reasoning_agent` | Trajectory-level verifier scoring optional; never sole proof |
| `interoperable_agent_platform` | MCP tool traces in scope; A2A remote agents deferred |

## Selected composition recipe

Canonical eval stack for this capability (from decision guide **Offline Regression Eval Loop** + production observability primitives):

```text
Versioned scenario fixtures
  -> host runtime adapter (safe/sandbox mode)
  -> provider-neutral trace/span collector
  -> deterministic scorers (trace, state, side effects, UI, RAG)
  -> optional bounded model-judge scorers
  -> trajectory-level scorer (advisory only)
  -> regression command + machine-readable receipt
  -> negative proof paths
```

For hosts with a **Stateful Harness Around Pure Agent Loop**, add:

```text
Harness-runtime profile
  -> steering/follow-up queue events
  -> cancellation + dangling tool-call repair
  -> single-runner invariant
  -> append-only session event log replay
  -> provider-neutral event stream parity
```

For hosts with **security/governance** surfaces, add:

```text
Security-governance profile
  -> adversarial injection scenarios
  -> action firewall / trust-zone assertions
  -> HITL approval/deny paths
  -> capability grant scope checks
  -> budget exhaustion and loop-breaker stops
```

## Required eval techniques (in scope)

These are **built and proven**, not aspirational prose. Each maps to contracts in phase 01 and scorers in phase 04.

### Core eval shape (Category 17 + evaluation_runtime)

- **Offline Regression Eval Loop** — versioned golden scenarios replayed after every change; pass/fail gate; CI-friendly regression command.
- **Run Receipt / Trace-First Runtime** — exportable structured receipt: run id, scenario version, spans, scores, blockers, claim status.
- **Deterministic scorers over traces** — model calls, tool calls, state diffs, citations, UI artifacts; final text alone is insufficient.

### Harness eval (Category 15 + Tau patterns)

- **Stateful Harness Around Pure Agent Loop** — scenarios assert harness-owned transcript, queues, cancellation, and repair semantics separate from the pure loop.
- **Provider-neutral event stream** — spans map to portable events (`turn_start`, `tool_execution_start`, `queue_update`, `error`, etc.) when the host emits them.
- **Steering and follow-up queues** — scenarios prove safe user input during active runs without transcript races.
- **Interrupted tool-call repair** — cancellation scenarios assert synthetic failed tool results before the next model request.
- **Append-only session event log replay** — memory-state profile can assert compaction entries and replay-derived state when the host uses durable session logs.

### Security and governance eval (Category 12 + 13)

- **Adversarial Red-Team / Injection-Regression Loop** — known injection payloads replayed; bypass vs blocked classification tracked over time.
- **Prompt-injection action firewall** — scenarios with untrusted retrieved/tool context assert proposed actions are screened against original user intent.
- **Context trust zones** — spans label `system`, `user`, `tool_output`, `retrieved`, `memory`; scorers assert untrusted content cannot override policy.
- **HITL approval gate** — side-effect scenarios assert pause, approve, reject, and resumable pending-action branches.
- **Capability / least-privilege runtime** — tool scenarios assert scoped grants, forbidden tools blocked, grants revoked on run completion.
- **Runtime budget policy engine** — scenarios assert warn thresholds, hard stops, and honest budget-exhaustion output.

### Trajectory and provenance eval (Category 17 + test_time_compute)

- **Trajectory-Level Reward / Verifier** — optional scorer grades the full tool-integrated trajectory end to end; advisory only; never overrides deterministic gates.
- **Artifact Provenance Graph** — RAG and tool-action scorers link claims to source/tool/observation ids when the host exposes provenance.

### Reliability failure-map coverage

Map host failure modes to scenario families (from decision guide failure map):

| Failure mode | Eval scenario family |
| --- | --- |
| Infinite tool loop | loop-breaker / budget-exhaustion scenario |
| Fake completion | verifier or blocked-state scenario |
| Stale plan | plan/todo state diff scenario |
| Bad retrieval | RAG weak-evidence / deny-path scenario |
| Unsafe tool action | HITL + action-firewall scenario |
| Multi-agent drift | delegation ledger + max-handoff scenario (optional swarm profile) |
| Hidden production failure | trace-required + negative proof |
| Crash or long wait | session replay / resumable-run scenario |
| Duplicate side effects | idempotency-key scenario in tool-actions |
| Regression after change | offline regression command + pinned scenario version |

## Selected optional techniques (design seams, blocked until proven)

Record as honest blockers in the receipt until implemented:

- **Infinite Agentic Loop Static Analysis** — build/CI static check; separate from runtime scenarios.
- **Self-Healing Orchestrator** — typed recovery after repeated tool failure.
- **Workflow Portfolio Router / Meta-Tool Compiler** — composite-tool scenarios when host compiles repeated traces.
- **Model cascading proof** — provider-routing tier selection scenarios.
- **Swarm / supervisor eval** — only when host implements multi-agent coordination.

## Rejected as substitutes for eval proof

- **Final-answer-only grading** — hides bad tools, routing, harness, and UI behavior.
- **Model-judge-only grading** — too weak for security, side effects, auth, billing, legal, or destructive behavior.
- **Step-only scoring on long trajectories** — per Trajectory-Level Reward evidence, step scores can miss end-to-end failure.
- **Hosted dashboard as required dependency** — useful adapter, not portable proof; local Eval Operator Console is required instead.
- **Benchmark leaderboard claims** — without pinned scenario/dataset version.

## Architecture implications

Host assessment and integration plan must name eval surfaces for:

1. Trace/span export path (OpenTelemetry or host-neutral JSON).
2. Harness event stream parity (if harness-runtime profile is enabled).
3. Session event log replay (if memory-state or harness-runtime profiles are enabled).
4. Security/governance hooks (action screening, HITL, capability grants).
5. Provenance links from synthesis to tool/retrieval observations.
6. Regression command, eval archive, and Eval Operator Console path.

## Source links

- https://github.com/DomEscobar/agentic-runtime-techniques
- https://raw.githubusercontent.com/DomEscobar/agentic-runtime-techniques/main/docs/decision-guide.md
- https://raw.githubusercontent.com/DomEscobar/agentic-runtime-techniques/main/docs/taxonomy.md
- https://raw.githubusercontent.com/DomEscobar/agentic-runtime-techniques/main/docs/tau-harness-techniques.md
- https://raw.githubusercontent.com/DomEscobar/agentic-runtime-techniques/main/docs/security-governance-patterns.md
- https://raw.githubusercontent.com/DomEscobar/agentic-runtime-techniques/main/data/agent-discovery-index.yml

For automated consumption during implementation, start with `data/agent-discovery-index.yml` (see `regression_after_change`, `trajectory_fails_end_to_end`, `unsafe_tool_action`), then follow links into `data/techniques.yml` and the docs.
