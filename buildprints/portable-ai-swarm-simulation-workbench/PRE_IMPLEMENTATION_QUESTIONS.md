# PRE_IMPLEMENTATION_QUESTIONS

Ask only these blocking product-shape questions before coding if the answer is not already supplied by the target project.

1. Which provider mode should be implemented first: sandbox adapters only, or live LLM/Zep/OASIS credentials available for gated smoke tests?
2. What persistence backend should the clean-room implementation use for projects, simulations, reports, and logs: filesystem, SQLite/Postgres, or existing app database?
3. Should destructive actions require local-only confirmation, authenticated ownership, or admin permissions?
4. Which first vertical slice should be built first if scope must be reduced: upload-to-graph, graph-to-simulation, or simulation-to-report?
5. What deployment target should runtime paths support first: local dev only, Docker Compose, or hosted web app with worker process?

Do not ask which quality/team should do this. If unanswered, use safest max-quality defaults and keep all selected teams active.
