# Phase 04 — Scope and fidelity decision

If no explicit scope was provided, stop after discovery and ask the human to choose:

- one candidate Buildprint,
- multiple candidates,
- or full System Buildprint.

Also ask/record the fidelity target. Do **not** silently escalate to full parity.

## Fidelity target menu

| Target | Use when | Default claim | Extra evidence needed |
|---|---|---|---|
| `workflow-proof` | demo/early validation | core flow is reproducible with mocks/fixtures | core workflow evidence |
| `contract-parity` | rebuild in another stack | data/states/API/adapters are preserved | schema/state/API evidence |
| `runtime-parity` | serious product proof | generated app runs with QA | runnable build + runtime QA |
| `ui-workbench-parity` | UX/workbench matters | screens/flows approximate observed UI | screenshots/browser/component evidence |
| `provider-parity` | external AI/media behavior matters | live adapter behavior verified | credentials, env gate, live smoke, cost/failure notes |
| `export-media-parity` | final outputs matter | export/render behavior verified | compositor/export evidence and artifact checks |
| `full-clone-parity` | rare explicit goal | broad parity across all relevant layers | all above plus strong evidence |

## Required decision table

Use this in `questions.md` after soft discovery:

```md
# Decisions

## Required now
| # | Decision | Safe default | Human answer |
|---|---|---|---|
| 1 | Confirm selected candidate/scope | Candidate N | |
| 2 | Choose fidelity target | workflow-proof + contract-parity | |
| 3 | Choose runtime proof depth | local build/test + runtime QA if UI exists | |
| 4 | Choose provider/export posture | mock providers; manifest/preview export only | |

## Appendix — ask only if touched
- ...
```

Do not generate final package files for a huge repo before this decision.
