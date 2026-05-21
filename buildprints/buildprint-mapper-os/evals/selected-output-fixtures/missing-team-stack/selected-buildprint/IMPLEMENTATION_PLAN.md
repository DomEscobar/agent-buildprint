# Implementation Plan

## Team-Pack Gate

| Team | Trigger | Milestone gate | Evidence path | Status |
|---|---|---|---|---|
| product-architect | full-suite UI graph product | topology and first real vertical slice | `CAPABILITY_INDEX.md` | blocked |
| ux-ui-craft | browser workbench | UX contract and browser proof plan | `UX_CONTRACT.md` | blocked |
| test-and-verification | always | proof ledger closure | `VERIFICATION.md` | pending |
| integration-runtime | LLM/runtime extraction | provider proof or blocker | capability verification | blocked |
| data-persistence | graph/project persistence | restart/readback proof or blocker | capability verification | blocked |

## Architecture Decision Notes

| Decision | Chosen approach | Alternatives rejected | Tradeoff | Reversal trigger |
|---|---|---|---|---|
| workbench topology | UI upload/graph surface plus parser service and graph persistence | static dashboard shell | more implementation work, but proves real data path | if selected scope becomes CLI-only |

## Milestones

| Order | Capability | First real vertical slice | First verification gate | Required teams | Status |
|---:|---|---|---|---|---|
| 1 | Ingestion and ontology | upload text -> extract ontology -> persist graph -> display graph | parser and persistence proof | product-architect, ux-ui-craft, test-and-verification, integration-runtime, data-persistence | pending |

This fixture remains `SELECTED_UNQUALIFIED` until runtime, browser, and persistence evidence exists.
