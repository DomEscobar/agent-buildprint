# Research Basis

## Primary runtime catalog

Research artifact:

```text
C:\repos\agentic-runtime-techniques
```

Validated 2026-07-09. See `references/runtime-techniques-basis.md` for how this catalog maps to eval profiles, scorers, and failure-mode coverage. Start with `data/agent-discovery-index.yml` (`regression_after_change`, `trajectory_fails_end_to_end`) and `data/techniques.yml` (`Offline Regression Eval Loop`, `Adversarial Red-Team / Injection-Regression Loop`, `Trajectory-Level Reward / Verifier`, `Run Receipt / Trace-First Runtime`).

## Supplemental eval-framework sweep

Research artifact:

```text
/root/.openclaw/workspace/research/agentic-chat-rag-eval-harness-2026-06-24
```

Validated on 2026-06-24 with 22 sources, 22 fetched pages, and 19 evidence claims.

## Selected techniques

### From agentic-runtime-techniques

- Offline Regression Eval Loop: golden scenario replay with pass/fail gate and CI integration.
- Adversarial Red-Team / Injection-Regression Loop: replay known injection payloads; track bypass vs blocked over time.
- Trajectory-Level Reward / Verifier: score full tool-integrated trajectories; advisory scorer only.
- Run Receipt / Trace-First Runtime: structured spans and receipts as primary proof signal.
- Stateful Harness Around Pure Agent Loop: eval harness-runtime profile for steering, cancellation, dangling-tool repair.
- Append-Only Session Event Log: replay-derived state checks in memory-state profile.
- Artifact Provenance Graph: claim-to-source/tool links for RAG and audit scorers.
- Tau harness patterns: provider-neutral events, steering/follow-up queues, single-runner invariant.

### From eval-framework sweep

- OpenAI Evals: custom/private eval registry and iteration loop.
- OpenAI Agents tracing: model calls, tool calls, handoffs, guardrails, and custom events as trace evidence.
- Inspect AI: serious eval framework with tools, multi-turn dialogue, and model-graded evaluations.
- DeepEval: pytest-like developer ergonomics for LLM and agent evals.
- Braintrust: end-to-end plus step-level agent evaluation.
- Tau-bench: simulated user + tools + policies + verifiable task state.
- WebArena and Terminal-Bench: executable environments and deterministic verification.
- Ragas and TruLens: RAG metric vocabulary: context precision, context recall, faithfulness/groundedness, answer relevance.
- Phoenix, Langfuse, and OpenLLMetry: observability/tracing adapters.

## Rejected as primary v1 shape

- Final-answer-only grading: hides bad tools, state, routing, and UI behavior.
- Model-judge-only grading: too weak for security, side effects, auth, billing, legal, or destructive behavior.
- One combined Agentic Chat + RAG monolith: mixes agent behavior with retrieval truth and makes proof gates blurry.
- Hosted observability dashboard as required dependency: useful but not portable enough for a Buildprint.

## Source freshness constraints

Framework APIs and benchmark repos move quickly. Applying agents should re-check current docs before implementing adapters, especially for OpenAI Evals, Inspect AI, DeepEval, Braintrust, Phoenix, Langfuse, and Ragas.

## Source links

### Runtime techniques catalog

- https://github.com/DomEscobar/agentic-runtime-techniques
- https://raw.githubusercontent.com/DomEscobar/agentic-runtime-techniques/main/docs/tau-harness-techniques.md
- https://raw.githubusercontent.com/DomEscobar/agentic-runtime-techniques/main/docs/security-governance-patterns.md
- https://raw.githubusercontent.com/DomEscobar/agentic-runtime-techniques/main/docs/decision-guide.md

### Eval frameworks and benchmarks

- https://github.com/openai/evals
- https://developers.openai.com/api/docs/guides/evals
- https://openai.github.io/openai-agents-python/tracing/
- https://inspect.aisi.org.uk/
- https://github.com/UKGovernmentBEIS/inspect_ai
- https://github.com/confident-ai/deepeval
- https://www.braintrust.dev/docs/best-practices/agents
- https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/
- https://www.trulens.org/getting_started/core_concepts/rag_triad/
- https://github.com/arize-ai/phoenix
- https://developers.llamaindex.ai/python/framework/module_guides/evaluating/
- https://github.com/sierra-research/tau-bench
- https://github.com/sierra-research/tau2-bench
- https://github.com/web-arena-x/webarena
- https://github.com/ServiceNow/webarena-verified
- https://github.com/harbor-framework/terminal-bench
- https://github.com/THUDM/AgentBench
- https://github.com/langfuse/langfuse
- https://github.com/traceloop/openllmetry
