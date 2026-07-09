# Agentic Chat Eval Harness Capability Buildprint

This Capability Buildprint installs a rigorous evaluation harness for existing Agentic Chat systems.

It does not build a chat product. It adds a repeatable proof layer that can evaluate multi-turn conversation behavior, tool/action correctness, provider routing, memory/state continuity, recovery behavior, UI evidence, and optional RAG grounding.

## What it adds

- scenario fixtures for agentic chat tasks
- simulated user turns and interruption paths
- trace/span collection for model calls, tool calls, handoffs, guardrails, retrieval, UI events, and custom host events
- expected tool/action side-effect checks
- model/provider routing and fallback checks
- memory/state continuity checks
- streaming and UI proof checks
- optional RAG profile for retrieval, citation, grounding, permission, and stale-index checks
- deterministic scorers plus bounded model-judge scorers
- event-sourced eval archive with regression baseline tracking
- interactive Eval Operator Console (local web UI + CLI)
- regression command and machine-readable receipts

## Design thesis

Final-answer grading is not enough.

An Agentic Chat harness must inspect:

- what the agent saw
- what it asked
- what tool it chose
- what arguments it sent
- what the tool changed
- how it recovered from failures
- what state or memory changed
- whether the UI represented the real state
- whether retrieved evidence actually supported the answer

If those artifacts are unavailable, the harness must downgrade the proof level instead of reporting success.

## Preferred baseline

Use existing host tooling when it is already available. Otherwise prefer:

- runner style: pytest/Vitest or equivalent host test runner
- trace model: OpenTelemetry-compatible spans or host-neutral JSON spans
- scenario format: versioned YAML/JSON fixtures
- deterministic scorers: assertions over traces, tool results, state diffs, citations, and UI evidence
- model-judge scorers: optional, rubric-bound, example-calibrated, and never sole proof for high-risk claims
- optional integrations: OpenAI Evals, Inspect AI, DeepEval, Braintrust, Phoenix, Langfuse, OpenLLMetry, Ragas, TruLens, or LlamaIndex evaluation adapters

The durable contract is the proof behavior, not a specific vendor.

## Profiles

### Core chat

Evaluates multi-turn task completion, instruction adherence, user-questioning, blocked states, refusal boundaries, transcript quality, and final answer usefulness.

### Tool actions

Evaluates tool selection, tool argument correctness, side effects, retries, idempotency, and recovery from tool failure.

### Memory and state

Evaluates durable state changes, memory writes, compaction behavior, state diffs, and stale-memory avoidance.

### Provider routing

Evaluates model/provider selection, fallback, retry policy, latency/cost capture, and degraded-mode behavior.

### UI proof

Evaluates streaming, action visibility, loading/error/blocked states, receipt access, and absence of fake success or raw debug leakage.

### RAG

Optional profile. Evaluates retrieval allow/deny behavior, context precision, context recall, groundedness, answer relevance, citation coverage, unsupported claim rate, stale/deleted content exclusion, and weak-evidence uncertainty. When the host exposes provenance links, scorers may assert claim-to-source/tool edges per the Artifact Provenance Graph pattern.

### Harness runtime

Optional profile. Evaluates stateful harness behavior separate from final answer quality: provider-neutral event stream, steering and follow-up queues, single-runner invariant, cancellation with dangling tool-call repair, and append-only session event log replay when the host implements durable session entries.

### Security governance

Optional profile. Evaluates adversarial injection regression, prompt-injection action screening, context trust zones, HITL approval/deny/resume paths, scoped capability grants, runtime budget exhaustion, and loop-breaker stops. Model-judge scores may never be the sole proof for this profile.

## Non-negotiables

- No pass from final text alone.
- No tool/action pass without expected side-effect proof.
- No RAG pass without retrieved context, citations, and deny-path proof.
- No UI pass from prose description alone.
- No model-judge-only pass for security, billing, legal, destructive, or permission-sensitive behavior.
- No benchmark claim without pinned scenario/dataset version.
- No production claim without a regression command and `.buildprint/agentic-chat-eval-receipt.md`.
- No harness-runtime pass without trace evidence for cancellation, repair, or queue semantics when those surfaces exist.
- No security-governance pass from final text alone; injection and side-effect gates require deterministic artifacts.

## Where to start

Start with `BUILDPRINT.md`. The README is the human overview; the Buildprint files are the executable contract.

See `examples/core-chat-scenario.yaml` for a minimal scenario shape, `examples/harness-runtime-scenario.yaml` for harness-primitive checks, `examples/eval-receipt.md` for the expected receipt structure, and `examples/eval-archive-event.json` for archive event shape.

For technique selection and failure-mode mapping, read `references/runtime-techniques-basis.md`. For eval control plane architecture, archive, and console design, read `references/eval-control-plane-basis.md`. For scenario splits and dataset quality, read `references/eval-spec-and-dataset-guide.md`.
