# Implementation Questions

Answer these before implementation when possible. If answers are unavailable, use the default and record it in handover.

1. Deployment posture?

   Default: `trusted_local`. This packet blocks public-webapp readiness until auth, tenant isolation, upload abuse controls, observability, backup/recovery, deployment, and security review are implemented.

2. Which OSS graph-memory backend should replace Zep Cloud?

   Default: Graphiti-style temporal graph memory with a local self-hosted backend. Prefer FalkorDB or Kuzu for trusted-local development; Neo4j is acceptable when the user explicitly chooses it. Keep a `GraphMemoryPort` so the backend can change.

3. Which LLM provider should be used for live proof?

   Default: provider-independent OpenAI-compatible settings: `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL_NAME`, optional boost provider settings. If no credentials are available, deterministic provider fixtures are allowed only for local smoke tests and must be labeled as such.

4. Should real-time simulation activities update graph memory?

   Default: include the feature behind an explicit toggle and show a visible blocked/error state if the OSS graph-memory adapter cannot support reliable append/readback yet.

5. What must a 60-second demo prove?

   Default: upload or load a fixture seed, build/read back the graph through the OSS adapter, inspect nodes and edges in the canvas, prepare simulation state, run or block live provider work honestly, and generate a report or provider-blocked report state without fake content.

## Alignment Summary

- Source input: MiroFish behavior mapped from `666ghj/MiroFish` revision `96096ea0ff42b1a30cbc41a1560b8c91090f9968`.
- Output mode: selected extraction.
- Requested scope: preserve the graph/canvas and replace Zep Cloud with free/open-source graph memory while keeping AI provider choice independent.
- Selected target / first capability: trusted-local graph-memory workbench slice.
- Artifact readiness summary: implementation input only; local build requires review.
- Explicitly user-excluded capabilities: none.
- Blocked capabilities: production/public-web hardening and live provider proof without credentials.
- Sensitive surfaces: uploads, provider calls, graph deletion/reset, background workers, reports, chat, user data.
- Required hardening artifacts: durable state, provider boundaries, explicit blocked states, runtime/browser review, local backup/restore before promotion.
- Qualification label: `local_build_requires_review`.
- Next artifact-type slice: build the local OSS graph-memory adapter and graph/canvas readback path.
