# Questions

Answer only what you care about. Leave anything blank and the implementation agent must choose the best-fit option from mapped obligations, architecture quality, experience quality, security, maintainability, and long-term scalability.

Default for every unanswered question:

> Use AI best judgment to produce the highest-quality appropriate implementation. Full-suite mapped Buildprints default to production-grade architecture: auth/session/tenant boundaries, durable persistence, worker/runtime ownership, deployment shape, observability, CI/e2e proof, security controls, and maintainable code. Favor simplicity unless mapped product obligations or product goals prove more complexity is needed. Do not block on ordinary engineering choices. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks. Missing credentials block live proof only; they do not remove provider adapters, config contracts, tests, or runtime wiring from scope.

## 1. Product direction

For product / mixed packets: what should the final product feel like or optimize for? For framework / library packets: what is the target primitive surface, semver policy, or API design principle? For integration packets: which provider/service boundary is the integration target? For automation packets: what is the task objective and stop policy? For data-pipeline packets: what input sources and output artifacts define this pipeline? For infrastructure packets: which environment and resource scope is the target?

Default: AI chooses the direction that best fits the mapping, blueprint mode, and user value.

## 2. Tech stack preferences

Do you require or prefer any specific stack, package manager, database, runtime, auth, AI provider, hosting, or deployment target? Do not assume the source repository's frameworks are desired defaults.

Default: AI chooses the strongest practical stack matching the selected blueprint mode and mapped obligations.

## 3. UX/UI preferences

For product / mixed packets: do you want a specific visual style, design system, interaction quality, accessibility level, or responsive behavior? For framework / library / integration / automation / data-pipeline / infrastructure packets: what are your developer/operator experience preferences — docs format, API ergonomics, trace output style, approval UI, lineage view, runbook format?

Default: AI creates a polished experience appropriate for the blueprint mode — product-grade UI for product mode, high-quality DX/operator experience for non-UI modes.

## 4. Architecture preferences

Do you require a specific architecture style or project organization?

Default: AI chooses clean, maintainable architecture appropriate to the blueprint mode: clear frontend/backend/domain boundaries for product; adapter/plugin architecture for framework/library; idempotency strategy and sandbox/live separation for integration; tool/action boundary for automation; transform isolation and backfill strategy for data-pipeline; IaC modular layout for infrastructure.

## 5. Quality bar

What must be true before work is considered done?

Default: AI defines and enforces strong gates appropriate to the mode — typecheck/lint/test/build/browser/e2e for product; import/API/CLI contract tests and semver compat for framework/library; fake-provider tests and webhook replay for integration; trace-based proof and stop-condition verification for automation; schema validation, lineage tests, and quality gates for data-pipeline; health/readiness, rollback proof, and drift detection for infrastructure.

## 6. Constraints / things to avoid

Anything forbidden, unwanted, expensive, risky, or out of scope?

Default: avoid unsafe, overcomplicated, brittle, fake, insecure, unmaintainable, or unproven implementation choices. For integration: do not exceed credential/auth scope or rate limits. For automation: do not execute dangerous actions without explicit approval points. For data-pipeline: do not process PII without declared retention/deletion policy. For infrastructure: do not modify immutable resources or exceed the declared permission scope.
