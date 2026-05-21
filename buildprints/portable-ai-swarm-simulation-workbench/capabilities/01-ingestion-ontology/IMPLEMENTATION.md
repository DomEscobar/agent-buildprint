# Implementation: Source Ingestion And Ontology

## Agent Brief

- Goal: build upload-to-ontology as the first real vertical slice.
- Dependencies: none.
- Stable behavior: persisted project plus ontology JSON.
- Implementation freedom: storage and parser choices.
- Forbidden substitutions: fake upload, static ontology, unredacted provider errors.
- First verification gate: `npm test -- ingestion-ontology`.
- Required evidence: API proof, browser screenshot, restart/readback.
- Required team packs: all selected teams.
- Stop or escalate when: upload limits or provider mode are undefined.

## First Real Vertical Slice

- User/API entry: upload form and `POST /api/graph/ontology/generate`.
- Domain/service behavior: parse files, combine requirement, call ontology adapter, validate entity/edge shape.
- Persistence/state effect: write project metadata, stored files, extracted text, ontology, status.
- Provider/runtime effect: LLM adapter called through port; deterministic test double records request.
- UI/browser proof when applicable: upload screen empty/loading/error/success screenshots.
- Negative/failure path: unsupported extension and malformed provider JSON fail without corrupting project state.

## Team-Pack Gates

| Team | Required action before coding | Evidence after implementation | Status |
|---|---|---|---|
| product-architect | confirm upload/service/repository/provider topology | topology proof and slice evidence | missing |
| ux-ui-craft | confirm upload states | screenshots | missing |
| test-and-verification | define API and negative tests | closed proof ledger | missing |
| integration-runtime | define LLM adapter contract | adapter proof | missing |
| security-boundary | define upload and secret policy | negative proof | missing |
| data-persistence | define project store | restart/readback proof | missing |

## Milestones

1. Project repository and file parser with allowed-extension/size checks.
2. Ontology adapter contract with deterministic test double and JSON validation.
3. Upload UI wired to API with proof states.

## Repair Loop

- Failed check: record failing API/browser assertion.
- Structured feedback: classify as upload, provider, persistence, or UI.
- Focused fix: patch one boundary.
- Rerun: `npm test -- ingestion-ontology`.
- Pass or blocker: update root and local verification.

## Stop Conditions

- Secret value appears in logs or artifacts.
- Project data does not survive restart/readback.
- UI claims success without persisted project and ontology.

## Handoff Update

After this passes, set `CURRENT_STATE.md` to `capabilities/02-graph-builder/`.
