# BUILDPRINT: Agentic Chat Eval Harness Capability

You are applying one strict Capability Buildprint to an existing host project. Your job is to add a trace-aware, scenario-based evaluation harness for an Agentic Chat runtime.

This is a bounded capability, not a whole-product Buildprint. Do not build a new chat app. Add evaluation infrastructure that proves whether the host's existing chat runtime behaves correctly.

## Required read order

1. `BUILDPRINT.md`
2. `capability.yaml`
3. `compatibility.md`
4. `00-host-assessment.md`
5. `00-assessment-questions.md`
6. `01-integration-plan.md`
7. `apply.md`
8. `02-implementation-phases/01-contract-and-config.md`
9. `02-implementation-phases/02-core-integration.md`
10. `02-implementation-phases/03-host-wiring.md`
11. `02-implementation-phases/04-user-operator-surface.md`
12. `02-implementation-phases/06-interactive-eval-console.md`
13. `02-implementation-phases/05-verification-and-receipt.md`
14. `verify.md`
15. `references/runtime-techniques-basis.md`
16. `references/eval-control-plane-basis.md`
17. `references/eval-spec-and-dataset-guide.md`
18. `references/research-basis.md`

## Capability promise

Add an Agentic Chat Eval Harness that can run versioned scenarios, drive simulated or recorded user conversations, capture trace spans, score model/tool/state/UI behavior, optionally score RAG grounding, maintain an event-sourced eval archive, provide an interactive Eval Operator Console, and write receipts suitable for regression and handover.

## Scope boundary

The harness evaluates these behaviors:

- multi-turn task completion
- question-asking and blocked-state behavior
- instruction and policy adherence
- provider routing, retry, fallback, latency, and cost capture
- tool selection, tool arguments, side effects, idempotency, and recovery
- memory writes, state diffs, compaction, and stale-state avoidance
- streaming UI, tool/action status, error/blocked states, and receipt visibility
- optional RAG retrieval, citation, grounding, weak-evidence behavior, and permission denial
- optional harness-runtime behavior: steering queues, cancellation, dangling tool-call repair, session event replay
- optional security-governance behavior: injection regression, action screening, HITL, capability grants, budget exhaustion

The harness does not replace the agent runtime, provider router, tool registry, memory system, UI framework, or RAG service. It adapts to them.

## Runtime techniques alignment

Before phase 01, read `references/runtime-techniques-basis.md` and `references/eval-control-plane-basis.md`. Scenario design and scorers must cover the failure modes named in the agentic-runtime-techniques decision guide (`regression_after_change`, `trajectory_fails_end_to_end`, `unsafe_tool_action`, `infinite_tool_loop`, `fake_completion`). When the host implements a stateful harness (Tau-style), enable the `harness-runtime` profile. When the host implements governance surfaces, enable the `security-governance` profile. Scenario splits and dataset quality rules live in `references/eval-spec-and-dataset-guide.md`.

## Proposed integration paths

The harness ships self-contained by default. The full machine-readable list of proposed paths lives in `capability.yaml` under `proposed_integration_paths`. Each path has a clear adapter boundary so existing gates stay authoritative.

Available paths (full detail in `capability.yaml`):

- `inspect-ai-runtime` — Inspect AI behind the existing gates (scenario execution, model-graded checks, trace mapping)
- `braintrust-telemetry` — Braintrust as observability/UI layer for ScoreResult and regression history
- `ragas-trulens-rag-metrics` — Ragas / TruLens metrics inside the optional `rag` profile only
- `tau-bench-scenario-pattern` — tau-bench pattern for simulated-user, verifiable end-state scenarios
- `openai-evals-iteration-loop` — OpenAI Evals iteration loop pattern (private/custom eval registry)
- `hybrid-self-plus-adapter` — keep self-contained, add an optional adapter layer per adopted path

Decision gate is in `00-assessment-questions.md` under "3rd Party Integration Discovery". Default decision is `deferred`. Adopted paths must run behind the deterministic gates in `verify.runtime_checks`; model-judge scores may never override security, side-effect, or proof gates.

## Local checkpoints

The applying agent must create these files in the host repo before or during implementation:

```text
.buildprint/host-assessment.md
.buildprint/capability-plan.md
.buildprint/agentic-chat-eval-plan.md
.buildprint/agentic-chat-eval-safety-plan.md
.buildprint/agentic-chat-eval-receipt.md
.buildprint/capability-receipt.md
```

No source edits before host assessment and capability plan exist.

## Discovery decision gate

Host assessment must classify important findings as:

- `infer safely`
- `patch locally`
- `must ask user`
- `out of scope`

Stop before implementation when a `must ask user` finding changes production-critical chat flows, tool side-effect policy, sandbox strategy, external model-judge provider use, RAG privacy, auth/tenant boundaries, destructive operation policy, or CI/runtime cost ceiling.

Verification must reconcile against the assessment and plan. If proof exposes missing trace hooks, unsafe tools, unavailable runtime paths, flaky model-only assertions, absent scenario ownership, or RAG evidence gaps, downgrade the claim instead of reporting success.

## Hard-stop conditions

Stop and ask instead of guessing when:

- the host has no identifiable chat runtime or conversation loop
- the host cannot run the chat runtime in test, sandbox, or local mode
- tool/action side effects cannot be mocked, sandboxed, or made safe
- production-critical flows are unknown and cannot be inferred from tests/docs
- external model-judge calls would send private transcripts without approval
- RAG profile would inspect private documents without approved retrieval/privacy policy
- baseline build/test commands cannot run enough to make the proof trustworthy

## Success standard

Do not claim the Agentic Chat Eval Harness is installed unless verification proves:

- scenario fixtures are versioned and runnable
- trace spans capture model, tool, state, retrieval when present, and final response events
- deterministic scorers fail on wrong tool calls, missing side effects, unsafe state changes, and missing artifacts
- eval archive records every run with lineage and failure mechanism when gates fail
- interactive Eval Operator Console inspects runs, traces, gate failures, and regression diffs
- model-judge scorers are optional, rubric-bound, and never the sole proof for high-risk gates
- receipts record commands, artifacts, scenarios, scores, blockers, and claim status
- optional RAG profile proves allow, deny, citation, weak-evidence, and stale/deleted-content behavior before claiming RAG coverage
- optional UI profile proves streaming/action/error/blocked states with screenshot, DOM, or interaction evidence
