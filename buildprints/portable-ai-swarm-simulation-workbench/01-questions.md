# Questions

Default rule:

> Use AI best judgment to produce the highest-quality appropriate implementation. Full-suite mapped Buildprints default to production-grade architecture: auth/session/tenant boundaries, durable persistence, worker/runtime ownership, deployment shape, observability, CI/e2e proof, security controls, and maintainable code. Favor simplicity unless mapped product obligations or product goals prove more complexity is needed. Do not block on ordinary engineering choices. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks. Missing credentials block live proof only; they do not remove provider adapters, config contracts, tests, or runtime wiring from scope.

## 1. Product direction

Should the implementation preserve MiroFish as a public local workbench, or introduce authenticated multi-user project ownership as the production default? AI default: production-grade session/owner boundaries with local single-user mode available.

## 2. Tech stack preferences

Any required frontend, API, database, worker, or deployment stack? AI default: choose a maintainable browser app, API service, durable database/object storage, queue/worker, provider adapters, and e2e test harness.

## 3. UX/UI preferences

Any required visual identity beyond the mapped MiroFish workbench, graph, timeline, report, and interaction surfaces? AI default: dense technical workbench with graph/split/workbench views, progress dashboards, report reader, and agent interaction panels.

## 4. Architecture preferences

Any required OASIS runtime mode, container model, or provider hosting? AI default: isolate OASIS subprocess/workers, expose typed API contracts, preserve local execution, and make live provider proof credential-gated.

## 5. Quality bar

Any required proof environment for browser, provider, deployment, or CI? AI default: automated unit/API/worker tests, browser e2e, visual critique, restart/readback, no-fake scan, secret scan, and provider live proof where credentials exist.

## 6. Constraints / things to avoid

Any banned providers, storage systems, hosting targets, or destructive operations? AI default: do not send external provider calls without credentials/config; never copy secret values; require confirmation for delete/reset/stop/close actions.
