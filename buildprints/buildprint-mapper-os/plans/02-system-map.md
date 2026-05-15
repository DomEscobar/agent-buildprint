# Phase 02 — System map

Group facts into architecture zones:

- UI/frontend,
- backend/API,
- auth/identity,
- billing/payments,
- admin/internal tools,
- AI/agent workflows,
- data layer,
- jobs/workers,
- integrations,
- observability/deploy.

Mark confidence per zone and list evidence paths.


## Precision requirements

For each architecture zone, include:

- responsibilities,
- entrypoints,
- owned state/data,
- incoming/outgoing dependencies,
- side effects,
- invariants,
- edge cases/failure modes,
- tests/checks observed,
- confidence.

For product flows, write the flow as a lifecycle/state machine, not a prose summary. Include cancellation, retry, invalid input, permission denial, persistence failure, and offline/provider-failure edges when relevant.
