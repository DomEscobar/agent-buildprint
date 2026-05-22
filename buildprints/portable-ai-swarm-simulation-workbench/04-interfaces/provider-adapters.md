# Provider Adapters

Required adapter boundaries:

- LLM adapter: OpenAI-compatible chat and JSON generation for ontology, profiles, config, report, and chat.
- Graph memory adapter: Zep-compatible graph creation, ontology setting, text episodes, node/edge fetch, entity filtering, graph deletion.
- Simulation runtime adapter: OASIS/CAMEL-compatible worker or deterministic runtime with start/stop/status/action-log semantics.

Adapter mode must be visible in proof: deterministic, sandbox-live, or production-live.
