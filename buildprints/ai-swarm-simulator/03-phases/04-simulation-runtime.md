# Phase 04: Simulation Runtime

## Product intention

Prepare and run a multi-agent social simulation from graph entities. The first local loop may use a deterministic simulator, but the architecture must also support OASIS live execution behind explicit setup checks.

## Build

- Read graph entities and relationships through the graph-memory port.
- Generate agent profiles from entities and graph context.
- Generate simulation configuration from the prediction requirement and available entities.
- Support Twitter-like and Reddit-like worlds or equivalent dual social spaces.
- Run a deterministic local simulation path that emits actions, rounds, statuses, and logs.
- Keep OASIS live runtime optional behind verified dependencies and clear blocked states.
- Stream meaningful simulation actions back into graph memory as temporal activity.

## Quality Bar

- Simulation output depends on graph entities and the prediction requirement.
- Profiles and configuration are persisted and readable.
- The UI shows current round, platform statuses, stop/close behavior, and error states.
- Graph memory is updated after meaningful actions.

## Do not ship

- A fake completed simulation with no action log.
- Live OASIS calls that fail silently.
- External writes without explicit configuration and user approval.
