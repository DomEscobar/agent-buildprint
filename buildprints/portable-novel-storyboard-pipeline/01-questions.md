# Questions

Answer only what you care about. Leave anything blank and the implementation agent must choose the best-fit option from mapped observations, product goals, architecture quality, UX quality, security, maintainability, and long-term scalability.

Default for every unanswered question:

> Use AI best judgment to produce the highest-quality appropriate implementation. Prefer clean architecture, excellent UX/UI, strong security, maintainable code, real persistence where needed, and proof-backed completion. Favor simplicity unless mapped observations or product goals prove more complexity is needed. Do not block on ordinary engineering choices. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks.

Default execution standard: production-grade architecture. Do not offer or choose an MVP quality tier. Missing credentials block live proof only; they do not remove the requirement to implement provider adapter seams, config contracts, deterministic tests, durable state paths, security boundaries, worker/runtime ownership, browser/e2e proof plans, media/export seams, and runtime evidence.

## 1. Product direction

What should the final product feel like or optimize for?

Default: AI chooses the product direction that best fits the mapped source and user value.

## 2. Tech stack preferences

Do you require or prefer any stack, framework, package manager, database, auth, payments, AI provider, hosting, or deployment target?

Default: AI chooses the strongest practical stack from mapped observations and target product needs.

## 3. UX/UI preferences

Do you want a specific visual style, design system, interaction quality, accessibility level, or responsive behavior?

Default: AI creates a polished, modern, accessible UI appropriate for the product category.

## 4. Architecture preferences

Do you require a specific architecture style or project organization?

Default: AI chooses clean, maintainable project architecture with clear frontend/backend/domain boundaries and local `AGENTS.md` alignment.

## 5. Quality bar

What must be true before work is considered done?

Default: AI defines and enforces strong gates: typecheck, lint, tests, build, relevant UI checks, no fake data, no skipped proof.

## 6. Constraints / things to avoid

Anything forbidden, unwanted, expensive, risky, or out of scope?

Default: avoid unsafe, overcomplicated, brittle, fake, insecure, unmaintainable, or unproven implementation choices.
