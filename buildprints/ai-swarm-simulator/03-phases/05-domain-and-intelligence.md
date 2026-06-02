# Phase 05 - Domain and intelligence

requires_roles: [integration-runtime, product-architect, data-persistence]

## Product intention

Make the intelligent parts real and provider-neutral: ontology generation, graph memory, graph search/statistics, simulation profile/config generation, report planning/writing, and interaction.

## Mapped obligations

- Preserve OpenAI-compatible LLM configuration.
- Support user-selected provider/base URL/model.
- Implement Graphiti/open-source graph memory replacement.
- Keep graph search/statistics and temporal updates available through the adapter.
- Record missing provider/runtime as blockers, not fake outputs.

## Stable vs free

Stable: provider independence and graph-shaped memory semantics.

Free: exact prompt wording, model presets, graph backend, retry policy.

## Implementation scope

LLM provider module, graph memory module, graph search/report tools, dynamic memory updater, provider status diagnostics.

## Interfaces touched

LLM calls, graph adapter calls, report tools, simulation profile/config generator, memory update job.

## State / runtime touched

Provider config, graph memory, retry/error logs, report/tool traces.

## UX / DX / operator requirements

The UI should explain missing provider config in product terms. It should not show stack traces or vendor-specific jargon as the main experience.

## Required output (integration-runtime)

Implement real adapter-backed intelligence with clear config and blocked modes.

## Blocks (integration-runtime)

No hidden Zep dependency, no hard-coded vendor, no silent fallback to canned data.

## Required output (product-architect)

Keep AI features tied to the product loop; do not add unrelated chat or generic RAG panels.

## Blocks (product-architect)

No intelligence feature that does not consume selected project/graph/simulation state.

## Required output (data-persistence)

Persist generated ontology, graph memory references, report outputs, and tool traces needed for readback.

## Blocks (data-persistence)

No report or memory output that cannot be traced to stored project/graph state.

## Quality bar

Provider changes are configuration-only, graph memory is open-source/local by default, and outputs change with inputs.

## Do not ship

Hard-coded Qwen/OpenAI, Graphiti only in docs but not code, or search/statistics tools still bound to Zep Cloud.

## Repair routing

If adapter semantics are incomplete, repair the adapter before report or simulation polish.

## Unlock condition

The product can run or honestly block provider-backed intelligence through explicit adapters.

