# Acceptance Checks

- [ ] `BUILDPRINT.md` was read first and treated as the authority spine.
- [ ] Setup gate is complete before phase implementation.
- [ ] Each phase starts through `03-phases/phase-flow.md`.
- [ ] Included scope is implemented or mapped end-to-end; excluded scope is explicit.
- [ ] RAG contracts preserve ingestion, chunking, hybrid retrieval, permission filtering, reranking, grounded answers, refusal behavior, traces, and evals.
- [ ] `TEST_MATRIX.md` checks passed or every skipped check has a concrete blocker.
- [ ] Runtime evidence is schema-valid and written only to `.buildprint/evidence/evidence-ledger.jsonl`.
- [ ] No placeholder, no-op, skeleton, route-shaped, vector-only, or mock-as-product implementation is claimed as complete.
