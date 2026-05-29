# Test Matrix

| Risk | Required check |
| --- | --- |
| Vector-only RAG misses exact identifiers | lexical/sparse and hybrid retrieval tests include identifier-heavy query |
| Lexical-only RAG misses semantic paraphrase | dense or dense-like retrieval tests include paraphrase query |
| Bad ordering hurts answers | reranker improves or preserves target chunk rank |
| Hallucinated answer | unsupported query returns insufficient-evidence/refusal |
| Citation laundering | answer citations reference selected chunks |
| Tenant/private data leak | private or tenant-mismatched chunks cannot reach context packing or answer citations |
| Chunk context loss | contextualized chunk case is covered when contextual text is enabled |
| Eval-free drift | eval command emits machine-readable retrieval and answer metrics |
| Live provider dependence | deterministic proof tests pass without network/API credentials |
| Fake production claim | blocked, synthetic, partial, sandbox, network-limited, and credential-limited proof cannot upgrade claims |
