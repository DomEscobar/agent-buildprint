# Questions

Use AI best judgment to produce the highest-quality appropriate implementation. Full-suite mapped Buildprints default to production-grade architecture: auth/session/tenant boundaries, durable persistence, worker/runtime ownership, deployment shape, observability, CI/e2e proof, security controls, and maintainable code. Favor simplicity unless mapped product obligations or product goals prove more complexity is needed. Do not block on ordinary engineering choices. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks. Missing credentials block live proof only; they do not remove provider adapters, config contracts, tests, or runtime wiring from scope.

## 1. Product direction

Should the implementation optimize MiroFish for local analyst workbench use, hosted multi-user use, or both? AI-best-judgment default: build the local workbench and API/runtime cleanly, while leaving explicit auth/session/tenant gates needed before public hosted use.

## 2. Tech stack preferences

Are there preferred frontend, backend, worker/runtime, storage, provider SDK, test harness, or deployment choices? AI-best-judgment default: choose replaceable, production-grade components that satisfy the mapped browser workbench, API service, worker/runtime, persistence, and provider-adapter contracts without preserving source frameworks.

## 3. UX/UI preferences

Should the workbench feel more like an analyst cockpit, graph explorer, simulation board, or report production tool? AI-best-judgment default: build a dense but polished cockpit with graph/workbench split modes, timeline/status readbacks, report reader, chat/interview tools, responsive states, accessibility, and visual_quality_gate proof.

## 4. Architecture preferences

Any product-defining boundary choices for OASIS, Zep, LLM, storage, worker execution, or local/hosted deployment? AI-best-judgment default: isolate browser/controller, API/application, domain services, repositories, provider adapters, worker/runtime, and observability so OASIS/Zep/LLM can be swapped or blocked honestly.

## 5. Quality bar

Which proof gates are required before calling the implementation usable? AI-best-judgment default: typecheck/lint/build, API/integration tests, worker retry/cancel/recovery tests, persistence readback, browser/e2e screenshots, no_fake scan, security boundary tests, deterministic provider tests, and live-provider blockers/proof rows.

## 6. Constraints / things to avoid

Any forbidden providers, data retention limits, destructive lifecycle limits, or privacy constraints? AI-best-judgment default: do not copy secrets or private documents into logs/evidence, do not run live provider writes without approval, do not downgrade to local MVP/static UI, and do not use mock providers as production behavior.
