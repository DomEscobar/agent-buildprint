# Phase 05 - Domain And Intelligence

requires_roles: [integration-runtime, product-architect, data-persistence]

## Product intention

Preserve the MiroFish intelligence loop while making providers independent: ontology generation, graph memory, simulation profile/config generation, report tools, and interaction.

## Mapped obligations

- Keep OpenAI-compatible LLM config as the default provider surface.
- Support user-selected provider settings.
- Replace Zep Cloud with OSS graph-memory search, stats, entity details, graph context, and appendable activity episodes.
- Keep deterministic fixtures separate from live model output.

## Stable vs free

Stable: provider independence, no fake intelligence, graph-memory behavior used across graph/simulation/report.

Free: exact model, prompt format, graph backend, embedding provider.

## Implementation scope

Build provider adapters, graph-memory tool adapters, deterministic test adapter, and live-provider blocked states.

## Interfaces touched

LLM client, graph-memory client, ontology generator, simulation config/profile generator, report agent tools.

## State / runtime touched

Provider config, graph episodes, search indexes, report logs, simulation profiles/config.

## UX / DX / operator requirements

Users must understand whether a result came from live provider, deterministic fixture, cached data, or a blocked state.

## Required output (integration-runtime)

- Provider adapter contract.
- Graph-memory tool adapter contract.
- Live-provider smoke instructions.

## Blocks (integration-runtime)

- Hard-coded hosted provider.
- Zep-specific tool names in product contract.
- Swallowed provider errors.

## Required output (product-architect)

- Clear boundaries between local fixture mode and live provider mode.

## Blocks (product-architect)

- "AI generated" claims from deterministic fixtures.

## Quality bar

Changing provider config changes the runtime path or fails with a precise error.

## Do not ship

Do not default to fake success when credentials are missing.

## Repair routing

Provider and graph-memory intelligence gaps go to this phase.

## Unlock condition

Provider-independent intelligence paths are wired or explicitly blocked with user-facing explanation.
