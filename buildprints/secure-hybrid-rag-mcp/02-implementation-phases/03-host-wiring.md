# Phase 03 - Host Wiring

## Objective

Implement authorized hybrid retrieval.

## Required inputs

- phase 02 indexed chunks
- host permission helper or policy engine
- retrieval subject/scope contract
- vector and keyword index access

## Request pipeline

1. Validate subject, scope, and purpose.
2. Classify intent: Q&A, summary, extraction, structured generation, audit, admin search.
3. Resolve authorized corpus from host permissions.
4. Rewrite query only inside allowed scope.
5. Run dense vector retrieval with authorization pre-filter.
6. Run keyword/full-text retrieval with the same authorization pre-filter.
7. Fuse candidates with RRF or equivalent deterministic fusion.
8. Rerank allowed candidates if enabled.
9. Return evidence chunks with citations, scores, and access receipt.

## Required query invariant

Dense and keyword retrieval must share the same authorization boundary. In SQL-backed implementations, the filter must be part of the query that retrieves candidates, not a post-processing step.

Example intent, not mandatory syntax:

```sql
WHERE tenant_id = :tenant_id
  AND project_id = ANY(:allowed_project_ids)
  AND acl_allows(:subject, chunk_acl)
```

## Ranking rules

Use exact-match boosts for:

- document titles
- page labels
- item numbers
- quantities
- units
- prices
- standards or legal references
- project/customer identifiers

Do not let semantic similarity override explicit denied permissions.

## Retrieval response

Return:

- evidence chunks
- citation metadata
- dense score
- keyword score
- fusion score
- reranker score when enabled
- filters applied
- access decision receipt
- uncertainty indicators

Do not include hidden forbidden candidate counts or forbidden document names in user-visible responses.

## Proof before moving on

- allowed subject can retrieve allowed evidence
- denied subject cannot reach dense candidates
- denied subject cannot reach keyword candidates
- vector and keyword retrieval share the same authorization helper or equivalent policy
- retrieval response includes citations, scores, applied filters, and access receipt
