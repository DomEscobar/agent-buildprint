# Research Basis

Research artifact:

```text
/root/.openclaw/workspace/research/agentic-chat-rag-eval-harness-2026-06-24
```

Validated on 2026-06-24 with 22 sources, 22 fetched pages, and 19 evidence claims.

## Selected techniques

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
