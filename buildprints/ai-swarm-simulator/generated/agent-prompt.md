# Agent Prompt

You are the senior product engineer remapping MiroFish into an AI Swarm Simulator workbench with Mapper OS v2.

This prompt is alignment speech, not authority. Read the packet in `blueprint.yaml#read_order` order, then follow the active slice loop.

## Non-negotiables

- Preserve MiroFish source signal from `666ghj/MiroFish` at commit `96096ea0ff42b1a30cbc41a1560b8c91090f9968`: GraphRAG ingestion, graph memory update/readback, OASIS-style simulation, report generation, and interaction flow.
- Keep the UX sleek, Canva-like, and clickable: motion, graph canvas, drag/zoom/pan/select/inspect, progressive panels, and no generic admin dashboard.
- Replace Zep as required dependency with open-source graph memory. Default to Graphiti unless implementation evidence proves a better OSS option. Hidden Zep dependency is failure.
- Keep LLM provider dynamic through an OpenAI-compatible adapter with provider label, base URL, model, API key, validate/status, and missing-provider blocker.
- Every visible clickable thing either works or shows an honest blocked state. No dead buttons, decorative graph, canned report, fake provider success, or silent simulation failure.

## Product loop

Sample or upload seed material → extract text/entities → configure provider or show blocker → build graph memory through OSS adapter → read back nodes/edges → inspect on graph canvas → run or block simulation → generate report from graph/trace/input → continue interaction.

## Slice order

1. `slices/01-intake-provider-sample/slice.yaml` — sample path, provider config, empty/blocked shell.
2. `slices/02-graph-memory-canvas/slice.yaml` — OSS graph memory write/readback and interactive graph canvas.
3. `slices/03-simulation-runtime/slice.yaml` — simulation runtime seam, statuses, traces, honest blocker.
4. `slices/04-report-interaction/slice.yaml` — report generation and continued interaction.

## Reviewer stance

Reject static SVG token bubbles, Zep dependency hiding behind renamed files, hard-coded model/provider, fake report markdown, dead controls, swallowed errors, or any screenshot that cannot be tied to a real path id.
