# Implementation Questions

Use these questions only if the answer changes implementation. If the user does not answer, apply the listed AI-best-judgment default and record it in handover.

1. Deployment posture: trusted local workstation, private authenticated server, or public webapp?
   - Default: trusted local workstation with optional private server hardening later.

2. Graph-memory backend: use Graphiti plus FalkorDB, or another free/open-source backend that supports temporal graph memory and graph readback?
   - Default: Graphiti plus FalkorDB, because it is open source, local, temporal, graph-native, and closest to the source Zep behavior.

3. LLM provider: which OpenAI-compatible endpoint and model should be used for ontology generation, profile generation, simulation config, report writing, and chat?
   - Default: configurable `LLM_BASE_URL`, `LLM_MODEL_NAME`, and `LLM_API_KEY`; no hard-coded hosted provider.

4. Simulation runtime: should the implementation run OASIS live locally, provide a local deterministic simulator first, or support both?
   - Default: support both, with a deterministic local simulator as the first reliable loop and OASIS as a live runtime behind explicit setup checks.

5. Persistence default: local files, SQLite, Postgres, or another store?
   - Default: SQLite for metadata/tasks plus local object folders for uploads, generated profiles, reports, and logs; FalkorDB for graph memory.

6. Sensitive capabilities: should uploads, report deletion, project deletion, and external simulation writes be enabled immediately?
   - Default: enable uploads and local deletion with confirmation/audit logs; block external writes unless explicitly configured.
