# Pre-Implementation Questions

Ask only if the answer is available. If unanswered, use the AI-best-judgment defaults below and record the decision in .buildprint/setup.md.

1. Deployment posture: trusted-local, private authenticated, or public webapp?
   Default: private authenticated webapp. Trusted-local is acceptable for provider smoke tests, but public deployment requires auth, upload limits, destructive-action controls, and audit logs.

2. Provider proof access: are sandbox credentials available for the OpenAI-compatible LLM, graph memory provider, and simulation runtime?
   Default: implement real provider adapters behind explicit env vars and run deterministic adapter/config tests; mark live_provider_proof_blocker_only until credentials exist.

3. Persistence default: what storage should hold projects, uploaded files, job/task state, simulations, reports, logs, and action streams?
   Default: Postgres or SQLite for structured state plus durable local/object storage for uploads/reports/logs. Do not use in-memory task state for production claims.

4. Risky capability policy: should destructive actions such as delete project/report/graph, stop simulation, close environment, and log cleanup be exposed?
   Default: include them behind role-gated controls, confirmation, idempotency, audit logging, and reversible retention where feasible.

5. Browser/canvas fidelity: should the implementation exactly match the visual styling or preserve behavior with a new UI identity?
   Default: preserve behavior and interaction depth with a new polished product UI identity; do not clone source styling as the contract.
