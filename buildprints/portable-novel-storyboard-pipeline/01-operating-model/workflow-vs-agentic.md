# Workflow vs Agentic

The downstream implementation agent must execute this as a controlled workflow, not a free-form product redesign.

- Use `blueprint.yaml` and `02-context/context-map.yaml` to identify the active capability.
- Load one capability packet at a time.
- Implement only the active packet plus directly required interfaces/state/runtime contracts.
- After proof, append an evidence row, update local run state, then advance through `03-capabilities/capability-index.yaml`.

Agentic creativity is allowed only inside implementation choices that the active `product-contract.md` marks as free.

