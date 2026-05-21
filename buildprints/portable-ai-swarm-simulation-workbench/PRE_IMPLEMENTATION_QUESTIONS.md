# PRE_IMPLEMENTATION_QUESTIONS

Ask only these blocking product-shape questions before coding if the answer is not already supplied by the target project. For the first active capability, do not stop if the user is unavailable; apply the safe defaults below and proceed.

1. Which provider mode should be implemented first: sandbox adapters only, or live LLM/Zep/OASIS credentials available for gated smoke tests?
2. What persistence backend should the clean-room implementation use for projects, simulations, reports, and logs: filesystem, SQLite/Postgres, or existing app database?
3. Should destructive actions require local-only confirmation, authenticated ownership, or admin permissions?
4. Which first vertical slice should be built first if scope must be reduced: upload-to-graph, graph-to-simulation, or simulation-to-report?
5. What deployment target should runtime paths support first: local dev only, Docker Compose, or hosted web app with worker process?

## Safe Defaults For Unanswered First-Slice Runs

- Provider mode: sandbox/test-double adapters only. Do not require live LLM, Zep, OASIS, or simulation credentials for the first proof.
- Persistence: local durable filesystem or SQLite. The first slice must prove restart/readback; in-memory-only state is not enough.
- Destructive actions: local-only confirmation. Do not add auth/admin scope unless the active capability requires it.
- First vertical slice: upload-to-graph.
- Deployment target: local dev only.

Do not ask which quality/team should do this. If unanswered, use these defaults, keep all selected teams active, and keep qualification as `SELECTED_UNQUALIFIED` until live providers, runtime, browser, persistence, security, and no-fake gates are proven.
