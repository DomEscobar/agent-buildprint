# Questions

Use AI best judgment to produce the highest-quality appropriate implementation. Full-suite mapped Buildprints default to production-grade architecture: auth/session/tenant boundaries, durable persistence, worker/runtime ownership, deployment shape, observability, CI/e2e proof, security controls, and maintainable code. Favor simplicity unless mapped product obligations or product goals prove more complexity is needed. Do not block on ordinary engineering choices. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks. Missing credentials block live proof only; they do not remove provider adapters, config contracts, tests, or runtime wiring from scope.

## 1. Product direction

Question: Should MiroFish optimize primarily for analyst-grade scenario rehearsal, creative story/sandbox exploration, or a balanced workbench for both?

AI-best-judgment default: balanced workbench, with serious prediction language in reports and playful simulation affordances where the user is exploring fictional or speculative seed material.

## 2. Tech stack preferences

Question: Do you have generic preferences for frontend, backend, runtime, storage, queue, deployment, browser/e2e, or provider SDK choices?

AI-best-judgment default: choose a modern typed browser app, modular API service, durable relational store plus object/file storage, worker queue for long jobs, provider adapters for LLM/Zep/OASIS, containerized local development, CI, and browser automation.

## 3. UX/UI preferences

Question: Should the workbench feel more like an operational cockpit, graph explorer, simulation control room, report reader, or a hybrid of those?

AI-best-judgment default: hybrid control room with a persistent workflow rail, graph/canvas surface, inspector panels, simulation timeline, report reader, blocked-provider states, and compact bilingual-ready copy.

## 4. Architecture preferences

Question: Are there product-defining architecture choices such as single-tenant local-only, private authenticated team app, public webapp, or strict provider isolation?

AI-best-judgment default: private authenticated webapp-ready architecture with a local single-user mode, explicit owner/session boundaries, provider adapters, durable state, worker orchestration, and environment-specific secrets.

## 5. Quality bar

Question: Are live provider credentials, sandbox provider access, browser/e2e tooling, or deployment authorization available for qualification proof?

AI-best-judgment default: implement provider adapters, deterministic test doubles, fake-provider tests, browser/e2e harness, persistence tests, no-fake scans, and runtime traces. Missing credentials or deployment access become non-upgrading live-proof blockers only.

## 6. Constraints / things to avoid

Question: Are there forbidden dependencies, cost ceilings, external-write limits, destructive-action restrictions, privacy constraints, or accessibility/localization requirements beyond the mapped product?

AI-best-judgment default: do not expose secrets or uploaded content in logs/evidence, avoid unapproved external writes and destructive actions, keep provider calls opt-in by environment, preserve bilingual-ready structure, and reject generic dashboard/forms/raw-list substitutes for graph, simulation, report, and chat surfaces.
