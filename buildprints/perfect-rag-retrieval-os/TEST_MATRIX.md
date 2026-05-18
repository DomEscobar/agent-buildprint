# Perfect RAG / Retrieval OS Test Matrix

| Risk | Required check |
| --- | --- |
| Vector-only RAG misses exact identifiers | lexical and hybrid retrieval tests include identifier-heavy query |
| Lexical-only RAG misses semantic paraphrase | dense/hybrid tests include paraphrase query |
| Bad ordering hurts answers | reranker improves or preserves target chunk rank |
| Hallucinated answer | unsupported query returns insufficient-evidence/refusal |
| Citation laundering | answer citations must reference selected chunks |
| Tenant/private data leak | private chunk cannot appear for unauthorized user |
| Chunk context loss | default proof includes one contextualized chunk retrieval case; production adaptations should add corpus-specific ambiguous chunk evals |
| Eval-free drift | `npm test` or equivalent runs retrieval and answer eval harness |
| Live provider dependence | default tests pass without network/API credentials |


---

## Consolidated notes from `VALIDATION_REPORT.md`

# Validation Report

## Status

Current checked-in validation is limited to the local proof command below. Historical local static manifest and public live bootstrap claims are not treated as reproducible evidence for this checkout.

## Research validation

Deepresearch artifact validated successfully:

- 18 sources fetched
- 16 evidence-backed claims
- report written
- artifact manager validation passed

The original artifact path was local to the authoring environment and is not a portable validation source for this checkout.

## Local proof target

The included proof must pass:

```bash
cd proof
npm test
```

Validated coverage:

- lexical, dense-like, hybrid, and reranked retrieval comparison
- contextualized chunk text used by a retrieval case
- cited grounded answer
- unsupported-question refusal
- private/tenant filtering
- compact eval report generation with recall@5, MRR, top chunk id, and answer

Local result for this checkout: `npm test` passes the TypeScript build and one Node TAP test file containing seven proof cases.

Remaining proof gaps: no durable ingestion/index persistence, no live provider adapters, no HTTP/API layer, no nDCG-like score, no labeled latency/cost fields, no token-budget accounting, and no permission-drop trace counts. These are production harness requirements unless added to the proof.

Historical bootstrap/public publish checks should be rerun after publication before making live distribution claims.
