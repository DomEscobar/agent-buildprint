# Phase 02 - System Map

## Goal

Turn census facts into an evidence-backed architecture map.

## Keep in context

- `SPEC.md`
- `CONTRACTS.md`
- `policies/quality.md`

## Steps

- Map architecture zones, data flows, state/lifecycle behavior, integrations, side effects, auth/security boundaries, and tests.
- Capture edge cases and failure modes where observed.
- Add confidence labels for each major claim.
- Keep product/business intent questions separate from observed implementation facts.

## Do not

- Present guesses as facts.
- Treat legacy or experimental code as desired architecture without review.
- Hide low-confidence areas.

## Exit criteria

- `SYSTEM_MAP.md` has zones, flows, risks, unknowns, and evidence labels.
- Claims that need human review are marked `QUESTION`.

## Validation evidence

- Traceability from critical claims to source evidence or explicit questions.
