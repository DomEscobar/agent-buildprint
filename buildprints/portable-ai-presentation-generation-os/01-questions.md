# Questions

Answer only what you care about. Leave anything blank and the implementation agent must choose the best-fit option from source evidence, product goals, architecture quality, UX quality, security, maintainability, and long-term scalability.

Default for every unanswered question:

> Use AI best judgment to produce the highest-quality appropriate implementation. Prefer clean architecture, excellent UX/UI, strong security, maintainable code, real persistence where needed, and proof-backed completion. Favor simplicity unless source evidence or product goals prove more complexity is needed. Do not block on ordinary engineering choices. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks.

Default execution standard: production-grade architecture. Do not offer or choose an MVP quality tier. Missing credentials block live proof only; they do not remove the requirement to implement provider adapter seams, config contracts, deterministic tests, durable state paths, security boundaries, worker/runtime ownership, export/webhook/MCP seams, browser/e2e proof plans, and runtime evidence.

## 1. Product direction

Should this optimize for a self-hosted web app, desktop app, API-first service, or all three?

Default: AI preserves the Presenton-like product shape as a self-hosted web/API app and treats desktop/MCP as later phase scope unless specifically selected.

## 2. Tech stack preferences

Do you require or prefer any stack, framework, package manager, database, auth, provider, hosting, or deployment target?

Default: AI chooses the strongest practical stack from source evidence and target product needs.

## 3. UX/UI preferences

Do you want a specific visual style, design system, interaction quality, accessibility level, or responsive behavior?

Default: AI creates a polished, modern, accessible presentation-generation workflow with clear empty/loading/error/blocked/success states.

## 4. Architecture preferences

Do you require a specific architecture style or project organization?

Default: AI chooses clean, maintainable project architecture with explicit frontend/backend/worker/provider/storage boundaries and local `AGENTS.md` alignment.

## 5. Quality bar

What must be true before work is considered done?

Default: AI defines and enforces strong gates: typecheck, lint, tests, build, browser/runtime checks, no fake data, no skipped proof, and evidence ledger rows.

## 6. Constraints / things to avoid

Anything forbidden, unwanted, expensive, risky, or out of scope?

Default: avoid unsafe, overcomplicated, brittle, fake, insecure, unmaintainable, or unproven implementation choices. Ask before paid providers, deployments, secret handling, destructive actions, or irreversible migrations.

## 7. Provider policy

Which LLM/image providers must be supported first, and may users enter/change their own keys in the UI?

Default: support a deterministic fake provider for tests plus a clean adapter contract for live provider configuration; require explicit approval before using paid live providers.

## 8. Data and export policy

Where may uploaded documents, generated decks, images, chat history, provider credentials, PPTX/PDF exports, and webhook events be stored?

Default: use local durable app storage in development, encrypted/secret-safe credential handling, and explicit retention/deletion semantics.
