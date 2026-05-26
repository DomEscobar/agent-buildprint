# Questions

Answer what you know. Blank answers mean AI best judgment: choose the highest-quality appropriate default from the product goals, existing project conventions, and phase evidence. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks.

## 1. Corpus and update model

What document sources must be retrieved: docs, support tickets, PDFs, code/docs, compliance content, customer records, media transcripts, or another corpus? How often do they change, and are deletes or re-indexing required?

Default if blank: start with text/document sources, stable source ids, checksum-based updates, explicit delete/reset paths, and fixture ingestion that can later be backed by durable jobs.

## 2. Tenant, permission, and privacy model

Is retrieval single-tenant, multi-tenant, per-user private, role-based, or mixed public/private? Which identity fields are available at query time?

Default if blank: implement tenant id plus user id access scopes, public/private visibility, and deny-by-default filtering before context packing.

## 3. Query and answer jobs

Which user jobs matter most: exact identifier lookup, semantic Q&A, troubleshooting, compliance, global corpus summaries, code/docs search, or operational support answers?

Default if blank: support exact lookup, semantic paraphrase, unsupported-question refusal, and at least one hard distractor/rerank case before optional global-summary modules.

## 4. Stack, provider, and cost choices

Which backend, database/search engine, vector store, embedding model, reranker, generator, queue, and deployment target should be used? Are live providers approved?

Default if blank: use the host project's stack; keep provider adapters behind interfaces; use deterministic local proof mode for tests; block live provider claims until credentials and paid-service approval exist.

## 5. Citation, trace, and user experience

What citation format should users see? Should traces be visible to users, admins, or only logs? What refusal copy and blocked/insufficient-evidence states are required?

Default if blank: return chunk/source citations with titles and URIs, expose compact admin/developer traces, and show clear insufficient-evidence/refusal states without leaking private document titles.

## 6. Evaluation and launch threshold

What eval cases, quality thresholds, latency targets, and cost budgets define launch readiness? Which failures block release?

Default if blank: require fixture evals for exact, paraphrase, contextualized, private/tenant mismatch, unsupported, and rerank cases; record recall@k, MRR, citation precision, answer correctness, refusal behavior, permission drops, latency, cost labels, and token budget use.
