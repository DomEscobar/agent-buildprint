# Research Basis

This capability was derived from local research in:

```text
/root/.openclaw/workspace/research/baseline-rag-mcp-2026/report.md
```

Primary source themes:

- MCP security and authorization: no token passthrough, least privilege scopes, OAuth 2.1-compatible authorization, SSRF/session/confused-deputy protections.
- Docling: structure-aware parsing and chunking for PDFs, Office documents, images, OCR, tables, and RAG exports.
- pgvector: Postgres-native vector search, HNSW/IVFFlat, and filtered ANN caveats.
- Qdrant: hybrid dense/sparse retrieval, RRF/DBSF fusion, multivectors, and reranking patterns.
- Ragas: RAG evaluation metrics, especially context precision/recall and faithfulness.
- Anthropic Contextual Retrieval: contextual chunk headers before embedding and BM25 indexing.
- Access-control RAG patterns from AWS, Pinecone, and Databricks: validate subject/resource access before vector-store queries and use metadata filters as part of retrieval.
- RAGOps research: production RAG needs data lifecycle management, retrieval observability, index freshness, and evaluation loops.

## Source links

- https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices
- https://modelcontextprotocol.io/docs/tutorials/security/authorization
- https://docling-project.github.io/docling/concepts/chunking/
- https://github.com/pgvector/pgvector
- https://qdrant.tech/documentation/search/hybrid-queries/
- https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/
- https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_recall/
- https://www.anthropic.com/engineering/contextual-retrieval
- https://www.pinecone.io/learn/rag-access-control/
- https://aws.amazon.com/blogs/machine-learning/access-control-for-vector-stores-using-metadata-filtering-with-knowledge-bases-for-amazon-bedrock/
- https://community.databricks.com/t5/technical-blog/mastering-rag-chatbot-security-acl-and-metadata-filtering-with/ba-p/101946
- https://arxiv.org/html/2506.03401v1

