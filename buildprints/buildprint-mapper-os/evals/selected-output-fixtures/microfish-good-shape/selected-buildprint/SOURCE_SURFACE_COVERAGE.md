# SOURCE_SURFACE_COVERAGE

This fixture demonstrates source-surface coverage without route/function parity. Source surfaces are evidence for product obligations, not a requirement to clone source shape.

| Surface ID | Kind | Source evidence | Signal | Disposition | Capability / merge target | Product obligation / blocker / exclusion reason |
|---|---|---|---|---|---|---|
| routes.upload | route | fixtures/microfish/routes/upload.ts | high | OWNED_BY_CAPABILITY | capabilities/01-ingestion-ontology | Product obligation: accept seed documents through upload workflow |
| api.parse | api | fixtures/microfish/api/parse.ts | high | OWNED_BY_CAPABILITY | capabilities/01-ingestion-ontology | Product obligation: extract text for ontology generation |
| tables.project | table | fixtures/microfish/schema.sql | high | OWNED_BY_CAPABILITY | capabilities/01-ingestion-ontology | Product obligation: durable project metadata |
| providerAdapters.llm | providerAdapters | fixtures/microfish/providers/llm.ts | high | OWNED_BY_CAPABILITY | capabilities/01-ingestion-ontology | Product obligation: real provider/runtime boundary remains blocked until proof |
| docs.quickstart | docs | fixtures/microfish/README.md | medium | MERGED_INTO_CAPABILITY | capabilities/01-ingestion-ontology | Workflow notes merged into ingestion behavior contract |

## Behavior Loss Review

No source-backed upload, parsing, persistence, or provider-runtime obligation is omitted. Provider proof remains a blocker rather than being erased.
