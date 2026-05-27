# Questions

Use these questions before coding. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks. If the user is unavailable, use AI best judgment and the highest-quality appropriate defaults below.

## 1. Provider/runtime mode

Default: implement a generic local AI provider adapter with deterministic no-network test doubles. Missing credentials block live proof only; they do not remove provider adapter, config, tests, timeout, or error-path obligations.

## 2. Persistence and database

Default: local durable file or SQLite persistence with setup command, readback tests, and restart-safe conversation/message state.

## 3. Deployment target

Default: local dependency-free Node.js runtime. Do not use Python, Docker, package installs, external services, deployments, or paid providers for this micro eval.

## 4. Destructive actions and data retention

Default: local confirmation for delete/reset/reindex actions, audit-friendly logs without secrets, and retention/export/delete policies for uploaded documents, chunks, memory, and conversations.

## 5. Browser and UI proof

Default: API/runtime proof is enough for this micro packet. If UI is created, repeatable browser/e2e proof is required. If no UI is created, record UI/browser proof as non-upgrading not-applicable or blocked.

## 6. Scope and qualification

Default: production-grade architecture for one tiny chat runtime slice. Keep status PROOF_REQUIRED until live provider/runtime, persistence, security, and applicable UI/browser proof rows pass.

AI best judgment defaults are binding for ordinary engineering choices. Do not ask quality-tier or team-choice questions.
