# Implementation Questions

Use the defaults unless the user answers differently.

1. Deployment posture?
   Default: `trusted_local`. This keeps the product local/private and requires explicit not-production-grade blocker reporting.

2. Execution cadence?
   Default: `all_remaining`. The requested scope is broad enough that stopping after a single phase would leave the graph/memory replacement incomplete.

3. Open-source graph memory backend?
   Default: Graphiti-backed local adapter with a clear storage choice. Use Neo4j, FalkorDB, Kuzu, or another supported local backend only if it can be installed and verified in the target environment.

4. AI provider?
   Default: OpenAI-compatible provider adapter configured by `LLM_API_KEY`, `LLM_BASE_URL`, and `LLM_MODEL_NAME`, with optional local/provider presets. The UI and backend must not assume one vendor.

5. First success loop?
   Default: upload a small text seed, generate an ontology, build a local graph, render nodes/edges on the canvas, open a node/edge detail panel, prepare a small simulation, generate a report stub only if backed by real graph/simulation data.

6. Sensitive capabilities?
   Default: keep uploads, deletes, provider keys, and simulation process control local-only. Public exposure, auth, tenancy, upload scanning, rate limits, and abuse controls are blocked until posture is promoted.

