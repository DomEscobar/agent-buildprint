# Source Ingestion And Ontology

Status: `INCLUDED`

## Agent Brief

Goal: implement the first slice from document upload to persisted project and ontology JSON.
Status: `CONTRACT_SEAM_ONLY`
Dependencies: none
Stable behavior: uploads accept `pdf`, `md`, `txt`, `markdown`; requirement text guides ontology generation; project state persists files/text/ontology/status.
Implementation freedom: parser library, storage backend, UI framework.
Forbidden substitutions: static ontology, no-op upload, in-memory-only project state, secret logging.
First implementation slice: upload one text fixture, persist project, generate deterministic ontology through adapter, reload project after restart.
First verification gate: `npm test -- ingestion-ontology`
Required evidence: API test, browser upload screenshot, restart/readback artifact.
No-fake checks: uploaded bytes are actually parsed and stored; ontology comes from adapter contract.
Stop or escalate when: provider credentials, persistence backend, or upload security policy is unclear.
Required team packs: product-architect, ux-ui-craft, test-and-verification, integration-runtime, security-boundary, data-persistence.

## Behavior Contract

- User/system action: user uploads seed documents and enters prediction requirement.
- Accepted inputs: allowed document files, project name, simulation requirement, chunk settings.
- Observable outputs: project id, ontology entity/edge definitions, analysis summary, file metadata, extracted text length.
- Important state: project metadata, uploaded files, extracted text, ontology, error/status.
- Failure/empty/loading/blocked states: no files, invalid extension, oversized upload, missing LLM key, malformed ontology JSON.
- Provider/persistence/runtime/operational boundary: LLM ontology adapter and project repository.

## Team-Pack Gates

| Team | Gate for this capability | Evidence path | Status |
|---|---|---|---|
| product-architect | upload -> parse -> persist -> ontology topology | `IMPLEMENTATION.md` | missing |
| ux-ui-craft | upload/process states | `UX_CONTRACT.md`, screenshots | missing |
| test-and-verification | proof command and negative tests | `VERIFICATION.md` | missing |
| integration-runtime | LLM adapter fallback/error behavior | `CONTRACTS.md` | missing |
| security-boundary | file validation and secret redaction | `VERIFICATION.md` | missing |
| data-persistence | restart/readback project proof | `VERIFICATION.md` | missing |

## Stable vs Free

| Stable | Free |
|---|---|
| workflow and data contract | exact parser/storage/UI implementation |

## Source Evidence

- OBSERVED: `backend/app/api/graph.py:122` defines ontology generation route.
- OBSERVED: `backend/app/models/project.py` persists project files, metadata, and extracted text.
- OBSERVED: `.env.example` names LLM and Zep env vars.

## Pack Navigation

- Implementation plan: `IMPLEMENTATION.md`
- Verification ledger: `VERIFICATION.md`
