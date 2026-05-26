# Evaluation

## Claim upgrade rules

Claims upgrade only after the relevant phase proof gate passes and evidence is recorded in `.buildprint/evidence/evidence-ledger.jsonl`.

Required proof concepts:

- provider_live: real embedding/search/reranker/generator/API behavior is proven with configured credentials, or a blocker records why only deterministic/sandbox proof exists.
- durable_persistence: sources, chunks, index state, traces, and eval reports survive readback/reload where durability is claimed.
- security_boundary: tenant/privacy filtering, secrets, prompt injection, destructive re-index/delete, external provider data transfer, and unsafe input paths are reviewed.
- no_fake: no static shell, fake green test, placeholder provider, no-op control, vector-only shortcut, or in-memory-only demo is claimed as production behavior.
- clean_room_implementation_trace: implementation does not depend on opening the original source repo as implementation input.

## Retrieval gates

- Exact identifier query proves lexical/sparse retrieval is present.
- Semantic paraphrase query proves dense or dense-like retrieval is present.
- Hybrid retrieval proves lexical/sparse and dense candidates are fused and deduped.
- Permission filtering proves unauthorized private or tenant-mismatched chunks cannot reach context packing, answer generation, citations, or user-visible traces.
- Reranking or late interaction improves hard-case ordering or preserves the correct top context.
- Contextualized retrieval is covered by at least one ambiguous chunk case when chunk context is enabled.

## Answer gates

- Cited answer: every factual answer cites selected chunks or source ids.
- Insufficient evidence: unsupported questions refuse instead of fabricating.
- Citation precision: citations refer to selected, relevant chunks and cannot be laundered from unselected context.
- Token budget: selected context records budget used and truncation/omission behavior.

## Operational gates

- provider_live
- durable_persistence
- security_boundary
- no_fake
- latency and cost fields labeled as measured, estimated, unavailable, deterministic, sandbox, or blocked
- permission drop counts or equivalent trace detail
- eval report generated as a machine-readable runtime artifact
- CI or release gate documented and runnable, or blocked honestly

## Minimum fixture cases

1. exact identifier lookup
2. semantic paraphrase
3. ambiguous chunk needing contextualized text
4. private or tenant mismatch
5. unsupported question requiring refusal
6. hard distractor requiring rerank

## Loop completion rule

A phase is complete only when:

- observe/plan/execute/verify/reflect/record loop completed at least once
- verification evidence exists
- phase proof gate passes, or an honest blocker is recorded
- blocker/unknowns are not hidden
- failed gates are repaired or routed correctly

## Evidence requirements

Each evidence row must include phase id, proof type, provider mode, status, source/command summary, claim proven or blocker, and whether it upgrades a claim.

## Blocker honesty

A blocker preserves scope. Do not silently downgrade the product, hide missing proof, skip required UI states, skip permission checks, or call deterministic adapters live providers. Blocked, missing, skipped, failed, synthetic, partial, sandbox-limited, network-limited, credential-limited, or dry-run-only evidence cannot set `upgrades_claim: true`.
