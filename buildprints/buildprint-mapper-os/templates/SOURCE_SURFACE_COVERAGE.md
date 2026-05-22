# SOURCE_SURFACE_COVERAGE

This file proves that high-signal source surfaces discovered during census did not silently disappear during semantic capability mapping.

Source surfaces are evidence, not requirements. Do not preserve route count, function names, file layout, or source architecture unless they encode externally observable behavior or qualification-relevant boundaries.

## Disposition Legend

- `OWNED_BY_CAPABILITY`: surface supports a named capability and product obligation.
- `MERGED_INTO_CAPABILITY`: surface is intentionally absorbed into a broader capability boundary.
- `OUT_OF_SCOPE_BY_USER_ONLY`: surface is excluded only by explicit user decision or selected-target boundary.
- `BLOCKED_NEEDS_REVIEW`: surface is high-signal but cannot yet be safely mapped.
- `LOW_SIGNAL_IGNORED_WITH_REASON`: surface was downgraded with evidence and is not product-relevant.

## Coverage Table

| Surface ID | Kind | Source evidence | Signal | Disposition | Capability / merge target | Product obligation / blocker / exclusion reason |
|---|---|---|---|---|---|---|
|  | routes / api / tables / jobs / providerAdapters / auth / admin / uploads / exports / imports / fileStores / env / deployment / docs | path:line or discovery evidence | high / medium / low | OWNED_BY_CAPABILITY / MERGED_INTO_CAPABILITY / OUT_OF_SCOPE_BY_USER_ONLY / BLOCKED_NEEDS_REVIEW / LOW_SIGNAL_IGNORED_WITH_REASON | capabilities/<id> or explicit target |  |

## Anti-Parity Rule

This table is not a route/function cloning checklist. One capability may own many source surfaces when that is the right product boundary. The invariant is that source-backed product obligations survive mapping, not that source structure survives implementation.

## Behavior Loss Review

Before handoff, answer:

> What source-backed product behavior, workflow, integration boundary, persistence behavior, auth/security rule, job/runtime behavior, import/export, or operational requirement would be impossible to rebuild from this Buildprint?

Any identified loss must become a capability obligation, capability blocker, explicit user-approved exclusion, or documented merge into another capability.
