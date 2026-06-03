# Project Setup

Before product slices, create the implementation foundation.

## Required setup artifacts

- `AGENTS.md` — repo constitution, mandatory read order, ownership map, and verification contract.
- `UI-IDENTITY.md` — explicit sleek Canva-like graph workbench identity: motion language, spacing, typography, panels, graph interaction, blocked states.
- `.env.example` — dynamic provider config keys, Graphiti/graph-memory config, local simulation runtime config.
- `docs/architecture.md` — module boundaries, provider adapter, graph memory adapter, persistence model.
- `docs/product-loop.md` — upload/sample → graph → canvas → simulation → report → interaction loop.
- `docs/agent-harness.md` — commands agents must run and what screenshots/API proofs count.
- `.buildprint/setup-receipt.md` — selected stack, assumptions, blockers, and first verification commands.

## Setup rules

- Create the provider adapter seam before any provider-specific call.
- Create the graph-memory interface before implementation-specific Graphiti code.
- Create empty/loading/blocked/ready UI states before wiring happy-path only flows.
- Define sample seed data that proves novice path without provider credentials.
- If OASIS/simulation runtime is missing, implement a visible blocked state and runtime seam.

## Hard-stop handling

If deployment posture, data persistence, provider secret handling, graph memory replacement, or simulation runtime expectations are unclear, stop and ask. Do not guess in a way that leaks secrets or fakes product success.
