# Alignment Questions

Default rule:

> Use AI best judgment to produce the highest-quality appropriate implementation. Full-suite mapped Buildprints default to production-grade architecture: auth/session/tenant boundaries, durable persistence, worker/runtime ownership, deployment shape, observability, CI/e2e proof, security controls, and maintainable code. Favor simplicity unless mapped product obligations or product goals prove more complexity is needed. Do not block on ordinary engineering choices. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks. Missing credentials block live proof only; they do not remove provider adapters, config contracts, tests, or runtime wiring from scope.

## 1. Product direction

Should the implementation optimize for the selected Canvas-board webapp only, or should it also include non-core suite surfaces such as novel management, all settings, task center and desktop packaging? Default: selected Canvas-board webapp only.

## 2. Tech stack preferences

Do you require a specific frontend/backend/runtime/storage/deployment stack, or may the implementer choose a maintainable webapp stack that satisfies the mapped contracts? Default: choose the simplest production-grade webapp stack that meets the contracts.

## 3. UX/UI preferences

Should the Canvas preserve the source interaction model closely, including node graph, right chat panel, zoom/pan/drag, layout and dense production controls? Default: yes, preserve the interaction model and improve polish only where it does not change behavior.

## 4. Architecture preferences

Do you require Electron parity, or is browser-first deployment with API/socket/provider/persistence services sufficient? Default: browser-first webapp; Electron packaging is out of selected scope.

## 5. Quality bar

Should live provider proof be required before delivery, or should fake-provider contract tests plus explicit live-credential blockers be accepted until credentials are supplied? Default: fake-provider contract tests are required; live proof remains blocked without credentials.

## 6. Constraints / things to avoid

Are there forbidden patterns beyond the mapped no-fake rules, such as no default admin password, no in-memory persistence, no static canvas mocks, no provider stubs counted as production and no destructive routes without confirmation? Default: all listed constraints apply.
