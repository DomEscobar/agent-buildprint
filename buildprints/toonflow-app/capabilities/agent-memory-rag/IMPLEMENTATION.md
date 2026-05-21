# Implementation: Agent Memory And Local RAG

## First Slice

- Implement UI/API/domain/persistence/provider path needed for: Agents persist short-term messages, summary memories, embeddings, semantic recall, deep retrieval, and memory-management settings per isolation key.
- Preserve later full-suite work in the readiness map.
- Record safe defaults from `PRE_IMPLEMENTATION_QUESTIONS.md` if answers are unavailable.

## Milestones

1. Define contract tests for success, empty/loading if UI, and negative branch: Missing model file fails clearly; clear scope does not delete unrelated isolation keys.
2. Implement topology: Memory service, embedding runtime, SQLite memories table, settings API, agent tools, clear/retrieve API, runtime proof.
3. Add runtime/browser/provider/persistence proof hooks: Memory add/get/clear test with local ONNX model and restart readback
4. Update root and capability verification ledgers with artifact paths.

## Repair Loop

- Failed check: capture command, API/browser path, and observed failure.
- Structured feedback: map failure to UI/API/domain/persistence/provider layer.
- Focused fix: repair only the failing layer and adjacent contract.
- Rerun: repeat the exact proof command plus relevant negative test.
- Pass or blocker: either attach artifact or downgrade with blocker.

## Fresh Review

Required when touching auth, uploads, provider code, destructive operations, persistence migration, socket streaming, Electron/Docker runtime, or user data.

## Stop Conditions

- Needs ONNX proof, summary provider proof, and isolation-key negative tests.
- Any implementation that relies on a fake success state, no-op control, or unproven provider path must stop and downgrade to `CONTRACT_SEAM_ONLY`.

