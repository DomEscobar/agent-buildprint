# 00 - Assessment Questions

Run this question gate after `00-host-assessment.md` and before `01-integration-plan.md`.

Capability questions are assessment-led. Inspect the host first, then ask only what blocks a safe, useful Agentic Chat Eval Harness.

## Hard-stop questions

Ask and stop when the host assessment cannot resolve:

- which Agentic Chat flows are production-critical
- how to call the chat runtime from a test or local script
- which tools/actions may execute during evaluation
- which tools/actions must be mocked, sandboxed, or blocked
- whether external model-judge providers may receive transcripts, tool outputs, traces, screenshots, or retrieved evidence
- whether optional RAG profile is in scope
- whether optional harness-runtime or security-governance profiles are in scope
- whether private RAG documents may be inspected by the harness or external judge
- which observability backend, if any, is approved
- which regression command should gate future changes
- acceptable cost, latency, and flakiness ceiling for live-model scenarios

Hard-stop answers must be `confirmed_by: user`, `confirmed_by: explicit_user_delegation`, or recorded as blockers. `agent_assumption` is invalid for hard-stop decisions.

## Assumable defaults

The agent may infer reversible details from host patterns:

- fixture folder name
- scenario file naming
- local JSON trace file path
- scorer module placement
- receipt markdown formatting
- non-sensitive fixture copy
- disabled-by-default optional profiles

Record meaningful assumptions in `.buildprint/capability-plan.md`.

## Deferrable questions

Do not block on:

- full benchmark leaderboard
- hosted observability dashboard
- advanced synthetic scenario generation
- every production chat flow
- every RAG metric
- voice/full-duplex evaluation
- broad cross-model bakeoff
- full adversarial case library (start with a small pinned set)
- trajectory-level scorer calibration

Move deferrable items to `.buildprint/agentic-chat-eval-receipt.md`.

## 3rd Party Integration Discovery

These questions must be asked after host assessment and before integration plan. The default path is `self-contained` (no 3rd-party adapter). Each path corresponds to `proposed_integration_paths` in `capability.yaml`. Record answers in `.buildprint/capability-plan.md` under "Integration Path Decision".

### Inspect AI Runtime

- does the host need model-graded judge capability beyond the deterministic gates already in this buildprint?
- can the host accept a Python-leaning runtime dependency, or is an HTTP/shim adapter required?
- who owns the adapter between Inspect AI and the TraceSpan contract?
- which Inspect features (tools, multi-turn, model-graded checks) are required, vs nice-to-have?

### Braintrust Telemetry

- is hosted eval telemetry acceptable, or must the Braintrust layer be self-hosted?
- which fields may leave the host boundary (transcript snippets, tool outputs, traces, scores)?
- does the host already use Braintrust for other telemetry, or is this a new dependency?
- are regression-comparison dashboards a hard requirement?

### Ragas / TruLens RAG Metrics

- is the optional `rag` profile in scope for this host?
- does the host accept Ragas and/or TruLens as the `rag` profile scoring library?
- who owns the metric-to-gate mapping (which Ragas/TruLens scores can affect a gate)?
- which retrieved evidence may be sent to external RAG metric libraries?

### tau-bench Scenario Pattern

- does the host have production-critical flows that need simulated-user scenarios?
- is the host willing to author and maintain scenario personas, policies, and verifiable end-state checks?
- is a deterministic user simulation acceptable, or must scenarios be replayable from real transcripts?

### OpenAI Evals Iteration Loop

- does the host want a versioned eval registry beyond the scenario files in this buildprint?
- is the run-grade-diff-improve iteration loop valuable even without a managed eval runner?
- can the iteration loop run locally, or must it integrate with a hosted service?

### Hybrid self-contained plus adapter

- is the host willing to maintain an adapter layer per adopted 3rd-party path?
- which 3rd-party paths are likely to be adopted first?
- where does the adapter boundary live (same repo, separate package, sidecar service)?

### Decision rules

- if no 3rd-party path answers are confirmed, keep `proposed_integration_paths.decision = deferred` and stay on `self-contained`.
- if a path is adopted, set `proposed_integration_paths.decision` to the path id, document the adapter boundary, and update the receipt schema to record adapter presence/absence/version.
- if multiple paths are adopted, the hybrid path becomes the container and the individual paths describe which adapters are active.
- any adopted path must run behind the deterministic gates in `verify.runtime_checks`; model-judge scores may never override security, side-effect, or proof gates.

## Output

Write unresolved hard-stop questions and answers to `.buildprint/capability-plan.md` or `.buildprint/blockers.md`. If any hard-stop answer is missing, stop before `01-integration-plan.md`.
