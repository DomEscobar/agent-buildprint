# Pre-Implementation Questions

Use AI best judgment to produce the highest-quality appropriate implementation. Full-suite mapped Buildprints default to production-grade architecture: auth/session/tenant boundaries, durable persistence, worker/runtime ownership, deployment shape, observability, CI/e2e proof, security controls, and maintainable code. Favor simplicity unless mapped product obligations or product goals prove more complexity is needed. Do not block on ordinary engineering choices. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks. Missing credentials block live proof only; they do not remove provider adapters, config contracts, tests, or runtime wiring from scope.

## 1. Product direction

Question: Should this MiroFish packet target a trusted-local analyst workbench, a private authenticated webapp, or a public deployment-ready product?
Default if unanswered: private authenticated webapp with local deterministic provider mode and explicit public-deployment blockers.
Blocks implementation: no, unless public deployment or destructive production data handling is required immediately.

## 2. Tech stack preferences

Question: Any frontend/backend/runtime/storage/deployment preferences?
Default if unanswered: choose a production-capable webapp stack with typed API boundaries, durable storage, worker/runtime ownership, and browser e2e support.
Blocks implementation: no.

## 3. UX/UI preferences

Question: Should the product feel closer to an analyst graph workbench, simulation control room, or narrative report studio?
Default if unanswered: graph workbench plus simulation control room, with report/interaction surfaces integrated as later phases.
Blocks implementation: no.

## 4. Architecture preferences

Question: Any required provider, graph memory, queue, database, or deployment boundary?
Default if unanswered: OpenAI-compatible LLM adapter, graph-memory adapter, durable job/persistence boundary, and fail-closed missing-credential behavior.
Blocks implementation: no, except for irreversible provider/deployment commitments.

## 5. Quality bar

Question: Which gates must run before handoff?
Default if unanswered: typecheck/lint/test/build/browser e2e, `verify:no-fake`, `verify:phase-artifacts`, persistence readback, provider fake tests, and security boundary review.
Blocks implementation: no.

## 6. Constraints / things to avoid

Question: Anything to avoid?
Default if unanswered: no generic dashboard, no static graph screenshot, no raw JSON-as-product, no in-memory-only production claims, no deterministic provider counted as live provider proof, and no source-dependent implementation handoff.
Blocks implementation: no.
