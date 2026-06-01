# Phase 05: Report And Interaction

## Intention

Generate a prediction report that is grounded in graph memory and simulation traces, then let the user interrogate the report and simulated agents.

## Build Scope

- Implement report generation with outline planning, section-by-section writing, progress, and markdown output.
- Persist report metadata, full markdown, section files if used, agent JSONL logs, and console logs.
- Implement graph search tools: quick search, broad/panorama search, deep insight search, node detail, node edges, and agent interview hooks.
- Implement chat with report agent and selected simulated agents where runtime data is available.
- Provide download, list, status, and delete APIs with safe local behavior.

## Quality Bar

- Report sections cite or summarize actual graph/simulation facts, not generic prediction prose.
- Logs are useful to inspect what tools were called and what data influenced the report.
- Chat responses change when the report, graph, or selected agent changes.
- Report UI has loading, partial, complete, failed, and empty states.

## Do Not Ship

- A report unrelated to the graph and simulation.
- Chat that ignores selected target.
- Raw JSON logs as the main report experience.
