# Phase 05 — Domain and intelligence

## Product intention

Shape the product's domain model and intelligence so outputs are grounded, actionable, and honest about provider boundaries.

## Build

- Domain model with user-facing concepts, relationships, and constraints.
- Evidence/grounding rules for generated, inferred, ranked, or analyzed output.
- Provider boundaries: what is local/deterministic, what calls live services, what needs credentials, and what can fail.
- Actionability rules: every insight/recommendation/result should tell the user why it matters or what to do next.
- Safety and privacy boundaries for uploads, generated data, logs, provider payloads, and destructive actions.

## Quality bar

The product should feel domain-smart rather than AI-decorated: changed evidence changes output, uncertainty is visible, and recommendations are specific enough to act on.

## Do not ship

Fake intelligence, ungrounded claims, provider hallucination, generic advice, hidden prompts/logs in the UI, or live-boundary claims without credentials and error handling.
