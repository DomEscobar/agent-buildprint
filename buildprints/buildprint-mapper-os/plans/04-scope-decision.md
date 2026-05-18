# Phase 04 — Scope, completeness, and fidelity decision

If no explicit scope was provided, stop after discovery and ask the human to choose:

- one candidate Buildprint,
- multiple candidates,
- or full System Buildprint.

Also ask/record the production-grade selected scope and fidelity target. Do **not** silently escalate to full parity, but also do **not** silently downgrade product/app scope into proof-only behavior.

Core rule:

> Scope may be limited, but implemented scope must be complete.

Prefer a smaller complete scope over a broad fake implementation. If a capability cannot be implemented fully, exclude it and document the upgrade requirement instead of mocking it in the claimed product path.

## Fidelity target menu

| Target | Use when | Default claim | Extra evidence needed |
|---|---|---|---|
| `workflow-proof` | non-product research only | core flow is illustrated with explicit fixture boundaries; not a product implementation | core workflow evidence + explicit non-product label + excluded product-scope list |
| `contract-parity` | reusable architecture/contracts | data/states/API/adapters are preserved | schema/state/API evidence |
| `runtime-parity` | default for selected product/app/feature scope | generated app runs with real included features, persistence where relevant, and QA | runnable build + runtime QA + no-fake scan |
| `ui-workbench-parity` | UX/workbench matters | screens/flows approximate observed UI | screenshots/browser/component evidence |
| `provider-parity` | external AI/media behavior is included | live adapter behavior verified | credentials, env gate, live smoke, cost/failure notes |
| `export-media-parity` | final outputs are included | export/render behavior verified | compositor/export evidence and artifact checks |
| `full-clone-parity` | rare explicit goal | broad parity across all relevant layers | all above plus strong evidence |

## Required decision table

Use this in `questions.md` after soft discovery:

```md
# Decisions

## Required now
| # | Decision | Safe default | Human answer |
|---|---|---|---|
| 1 | Confirm selected candidate/scope | Candidate N | |
| 2 | Confirm production-grade selected scope | Smaller complete scope; no proof-only product surfaces | |
| 3 | Choose fidelity target | contract-parity + runtime-parity for included product/app features | |
| 4 | Choose provider/export posture | Exclude provider/export unless real implementation is selected; mocks only as test fixtures | |

## Appendix — ask only if touched
- ...
```

Do not generate final package files for a huge repo before this decision.
