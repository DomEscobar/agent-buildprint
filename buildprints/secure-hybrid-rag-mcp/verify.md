# Verify

Verification must prove security, retrieval quality, generation grounding, lifecycle behavior, and integration health.

## Required proof

Record proof in `.buildprint/capability-receipt.md`.

## Required command checks

Run available host checks:

- tests
- lint
- typecheck
- build
- migration dry run when relevant

If a command does not exist, record that in `.buildprint/capability-receipt.md`.

If a baseline command or schema validation failed before implementation, the receipt must say whether the failure was fixed, unrelated but still a claim ceiling, or blocking. Do not treat later tests as proof if the selected auth/retrieval/runtime layer remains invalid.

## Required structural checks

Confirm:

- `RetrievalSubject`, `RetrievalScope`, document metadata, chunk metadata, ACL metadata, evidence, citation, and receipt types exist or are mapped to host equivalents
- central retrieval authorization helper exists
- dense and keyword retrieval call the same authorization helper or equivalent policy
- chunks cannot enter the searchable corpus without ACL metadata
- generated outputs validate against declared schemas when structured
- lifecycle paths exist for reindex and delete

## Required fixture/runtime checks

At `fixture` proof or higher:

- Allowed subject retrieves an allowed document.
- Denied subject receives no candidates before dense retrieval.
- Denied subject receives no candidates before keyword retrieval.
- Cross-tenant query cannot return evidence.
- Missing ACL metadata is denied or quarantined.
- Vector and keyword queries use the same authorization filter or equivalent policy.

At `runtime` proof or higher:

- Raw document reference stored.
- Parsed document stored with parser version.
- Chunks stored with chunker version and parent document/page/section references.
- ACL metadata present on every chunk.
- Embedding version stored.
- Keyword index created or refreshed.
- Metadata filter + dense search works.
- Metadata filter + keyword search works.
- Fusion produces deterministic ranked evidence.
- Reranker is either verified or disabled behind a feature flag.
- Empty/weak evidence returns uncertainty instead of fabricated claims.

### Generation

- Generated answer or structured output includes citations.
- Unsupported price, quantity, legal, or factual claim is flagged or omitted.
- Output validates against declared schema.
- Prompt context contains only allowed chunks.
- Golden set exists.
- Retrieval metrics run or are manually scored with receipts.
- Permission-leak tests pass.
- Regression command is documented for future runs.
- Reindex path works for changed documents or changed ACLs.
- Delete path removes or invalidates chunks, embeddings, keyword entries, cached summaries, and receipts as required.
- Logs do not contain forbidden raw context by default.

## Blocked checks

Record blockers for:

- missing auth/session model
- ambiguous tenant/project permission source
- no approved migration/storage path
- no ACL assignment path at ingestion
- vector/search backend cannot pre-filter
- external provider approval missing for private documents
- host test harness unavailable

## Pass condition

The capability can be called installed only if:

- command checks pass or are honestly unavailable
- structural checks pass
- fixture/runtime checks pass at the claimed proof level
- denied path is proven
- citations and uncertainty behavior are proven
- `.buildprint/capability-receipt.md` reconciles every host-assessment blocker, assumption, baseline failure, and hard-stop question with the final proof level
- `.buildprint/capability-receipt.md` exists

## Failure handling

If any required proof fails:

- do not claim installed
- mark status as partial or blocked
- list exact failing check
- name the next action needed
