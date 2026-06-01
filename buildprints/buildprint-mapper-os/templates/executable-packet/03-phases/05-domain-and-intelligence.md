# Phase 05 — Domain and intelligence

requires_roles: [integration-runtime, security-boundary, product-architect]

## Product intention

Shape the product's domain model and intelligence so outputs are grounded, actionable, and honest about provider boundaries.

## Mapped obligations

- Domain model with user-facing concepts, relationships, and constraints.
- Grounding rules for generated/inferred output.
- Provider boundaries for deterministic vs live behavior.
- Actionability rules and safety/privacy boundaries.

## Stable vs free

- Stable: domain semantics, grounding expectations, provider honesty, and safety boundaries.
- Free: model/tooling choices and internal prompt/adapter implementation details.

## Implementation scope

- Define domain entities and invariant rules.
- Implement grounding evidence paths for output.
- Implement provider adapters with blocked-state handling.
- Keep recommendations actionable and role-appropriate.

## Interfaces touched

- Domain model and transformation services.
- LLM/provider adapters and policy boundaries.
- Output/report surfaces for generated content.

## State / runtime touched

- Domain entity store and relationship state.
- Provider config and failure mode state.
- Safety/audit markers for sensitive operations.

## UX / DX / operator requirements

- Users can distinguish grounded output from uncertain output.
- Provider failures are explicit and actionable.

## Required output (integration-runtime)

- Provider/API/runtime boundary includes config, side effects, retries, and errors.
- Missing credentials block live proof only and remain explicit.

## Blocks (integration-runtime)

- Fake provider success in production path.
- Runtime behavior claimed without runtime proof or blocker.

## Required output (security-boundary)

- Uploads, generated data, logs, and destructive actions include safety boundaries.

## Blocks (security-boundary)

- Secret values in output/logging.
- Unsafe destructive paths without confirmation/permission.

## Required output (product-architect)

- Domain and provider seams avoid UI-boundary leakage.

## Blocks (product-architect)

- Provider logic spread through UI components.

## Quality bar

The product should feel domain-smart rather than AI-decorated: changed evidence changes output, uncertainty is visible, and recommendations are specific enough to act on.

## Do not ship

Fake intelligence, ungrounded claims, provider hallucination, generic advice, hidden prompts/logs in the UI, or live-boundary claims without credentials and error handling.

## Repair routing

- grounding failure -> current phase
- provider boundary contradiction -> `02-project-setup.md`
- safety/privacy gap -> `04-review.md`

## Unlock condition

Domain output is grounded, actionable, and provider-honest with explicit blocked/live boundaries.
