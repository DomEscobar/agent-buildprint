# Questions

Answer only what you care about. Leave anything blank and the implementation agent must choose the best-fit option from mapped obligations, architecture quality, experience quality, security, maintainability, and long-term scalability.

Default for every unanswered question:

> Use AI best judgment to produce the highest-quality appropriate implementation. Full-suite mapped Buildprints default to production-grade architecture: auth/session/tenant boundaries, durable persistence, worker/runtime ownership, deployment shape, observability, CI/e2e proof, security controls, and maintainable code. Favor simplicity unless mapped product obligations or product goals prove more complexity is needed. Do not block on ordinary engineering choices. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks. Missing credentials block live proof only; they do not remove provider adapters, config contracts, tests, or runtime wiring from scope.

## 1. Product direction

For this integration packet: which external provider boundary is the integration target? What are the auth boundary and sandbox/live split policies?

Default: AI chooses the direction that best fits the mapping, blueprint mode, and user value.

## 2. Tech stack preferences

Do you require or prefer any specific stack, package manager, database, runtime, auth, AI provider, hosting, or deployment target?

Default: AI chooses the strongest practical stack matching the selected blueprint mode and mapped obligations.

## 3. UX/UI preferences

For this mode: what are your operator/consumer/developer experience preferences?

Default: AI creates a polished experience appropriate for the blueprint mode.

## 4. Architecture preferences

Do you require a specific architecture style or project organization?

Default: AI chooses clean, maintainable architecture appropriate to the blueprint mode.

## 5. Quality bar

What must be true before work is considered done?

Default: AI defines and enforces strong gates appropriate to the mode.

## 6. Constraints / things to avoid

Anything forbidden, unwanted, expensive, risky, or out of scope?

Default: avoid unsafe, overcomplicated, brittle, fake, insecure, unmaintainable, or unproven implementation choices.
