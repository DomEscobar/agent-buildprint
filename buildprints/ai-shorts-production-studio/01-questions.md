# Questions

Answer only what you care about. Leave anything blank and the implementation agent must choose the best-fit option from mapped observations, product goals, architecture quality, UX quality, security, maintainability, and long-term scalability.

Default for every unanswered question:

> Use AI best judgment to produce the highest-quality appropriate implementation. Prefer clean architecture, excellent UX/UI, strong security, maintainable code, real persistence where needed, and proof-backed completion. Favor simplicity unless mapped observations or product goals prove more complexity is needed. Do not block on ordinary engineering choices. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks.

Default execution standard: production-grade architecture. Do not offer or choose an MVP quality tier. Missing credentials block live proof only; they do not remove the requirement to implement provider adapter seams, config contracts, deterministic tests, durable state paths, security boundaries, worker/runtime ownership, media pipeline wiring, browser/e2e proof plans, and runtime evidence.

## 1. Product direction

What should the final studio feel like or optimize for?

Default: a compact SaaS/UGC production workbench for creating draft vertical marketing shorts from product inputs, not a marketing landing page or API harness.

## 2. Tech stack preferences

Do you require or prefer any stack, framework, package manager, database, auth, providers, hosting, or deployment target?

Default: choose the fastest maintainable full-webapp stack that can prove browser workflow, API/service contracts, local media generation, tests, and screenshots. Use generic capability needs as the default; do not assume the source repository's concrete frameworks are desired.

## 3. UX/UI preferences

Do you want a specific visual style, design system, interaction quality, accessibility level, or responsive behavior?

Default: a polished, dense production-studio UI with workflow stepper, side-by-side controls and preview, secondary debug drawer, accessible controls, and responsive desktop/mobile layouts.

## 4. Architecture preferences

Do you require a specific architecture style or project organization?

Default: UI -> application/service layer -> domain contracts -> provider/data adapters. Keep all live provider, gallery, publishing, upload, and media boundaries replaceable and testable in deterministic mock/no-network mode.

## 5. Quality bar

What must be true before work is considered done?

Default: AI defines and enforces strong gates: typecheck/lint where applicable, unit/contract/job/media tests, production build, browser happy and negative paths, desktop/mobile screenshots, ffprobe or equivalent MP4 proof, no-network default gate, secret/claim wording check, and schema-valid runtime evidence.

## 6. Constraints / things to avoid

Anything forbidden, unwanted, expensive, risky, or out of scope?

Default: avoid live provider calls, paid services, public publishing, public gallery exposure, browser-managed secrets, third-party likeness processing, arbitrary URL egress, unsafe subtitle interpolation, no-op controls, fake success, and OpenShorts clone or parity claims unless specifically approved and proven.
