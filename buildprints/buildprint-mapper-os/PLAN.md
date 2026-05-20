# Mapper OS Plan

This plan routes an agent through the Mapper OS workflow. It is decision-complete for running the mapping process, not for implementing the mapped product.

## Phase Index

1. `plans/00-safety-boundaries.md`: establish source read-only boundary and secret rules.
2. `plans/01-repo-census.md`: collect safe census hints without product claims.
3. `plans/02-system-map.md`: promote source-evidenced capability claims.
4. `plans/03-candidate-buildprints.md`: propose selected-scope candidates from promoted capability evidence.
5. `plans/04-scope-decision.md`: ask only blocking scope or risk decisions.
6. `plans/05-single-extraction.md`: create a selected capability Buildprint under `selected-buildprint/`.
7. `plans/06-system-extraction.md`: create hierarchical full-suite output when explicitly requested.
8. `plans/07-validation-submission.md`: run verification, no-fake, hardening, and reversal gates or record blockers.

## Default Flow

```text
source acquisition
-> safe census
-> capability discovery
-> claim promotion
-> scope decision
-> source distillation
-> selected-buildprint package
-> downstream execution planning
-> verification and qualification review
-> handoff
```

## Operating Rules

- Discover first, ask second.
- Ask only questions that affect selected scope, hardening, provider access, data handling, or qualification.
- Prefer smaller complete selected scopes over broad partial scope.
- Keep implementation scaffold out of the package root.
- Use capability packs for medium, large, and full-suite selected outputs.
- Record blockers instead of inventing behavior.
- Treat full-suite as user intent, not proof.
