# Agent Memory And Local RAG

Status: `INCLUDED_NEEDS_PROOF`
Depth status: `CONTRACT_SEAM_ONLY`

## Owned source surfaces

- routes.agents.*
- routes.setting.memoryConfig.*
- utils.agentMemory
- utils.agentEmbedding
- models.allMiniLML6v2
- tables.memories
- tables.o_setting

## Product obligations

- Preserve memory write/summary/embedding/search/clear flows, isolation-key boundaries, local ONNX dependency, and restart persistence.

## Agent Brief

Goal: Agents persist short-term messages, summary memories, embeddings, semantic recall, deep retrieval, and memory-management settings per isolation key.
Status: INCLUDED_NEEDS_PROOF; CONTRACT_SEAM_ONLY.
Dependencies: Memory service, embedding runtime, SQLite memories table, settings API, agent tools, clear/retrieve API, runtime proof.
Stable behavior: Summarization thresholds, vector search, relevance judging, summarized flags.
Implementation freedom: internal framework, module names, and storage library are free if observable behavior and proof obligations are met.
Forbidden substitutions: static labels, no-op controls, route-shaped endpoints, deterministic providers, or in-memory-only state may not count as production behavior.
First implementation slice: build the smallest vertical path that exercises this capability through UI/API/domain/persistence/provider layers as applicable.
First verification gate: Memory add/get/clear test with local ONNX model and restart readback
Required evidence: artifacts/memory-rag.log; BLOCKED_WITH_REASON: ONNX/runtime test not run.
No-fake checks: prove state changes, negative branch, and runtime/browser/provider evidence where applicable.
Stop or escalate when: Needs ONNX proof, summary provider proof, and isolation-key negative tests.

## Behavior Contract

- User/system action: Agents persist short-term messages, summary memories, embeddings, semantic recall, deep retrieval, and memory-management settings per isolation key.
- Accepted inputs: see API/UI/domain contracts below; validate required fields and reject malformed input.
- Observable outputs: successful state mutation, returned data/file/socket stream, or explicit error reason.
- Important state: memories and o_setting rows; local ONNX model files.
- Failure/empty/loading/blocked states: Missing ONNX model, malformed embedding JSON, summary provider failure.
- Provider/persistence/runtime/operational boundary: Local ONNX embedding plus configured text model for summaries/relevance.

## Stable vs Free

| Stable | Free |
|---|---|
| Agents persist short-term messages, summary memories, embeddings, semantic recall, deep retrieval, and memory-management settings per isolation key. | Implementation framework/component/database abstraction. |
| Missing ONNX model, malformed embedding JSON, summary provider failure. | Exact internal error class names. |
| Memory add/get/clear test with local ONNX model and restart readback | Test runner and artifact naming, if equivalent evidence is produced. |

## Source Evidence

- OBSERVED Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/utils/agent/memory.ts:36-219; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/utils/agent/embedding.ts:13-41; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/routes/agents/getMemory.ts:12-31; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/routes/agents/clearMemory.ts:8-32; Toonflow-app@122d2aa431d3240fea3eab491e6fbc690bb088cb:src/lib/initDB.ts:279-315

