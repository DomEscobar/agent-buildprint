# Compatibility

## Good host candidates

This capability fits host projects that already have:

- user identity or service-principal identity
- tenant, team, project, customer, or document ownership boundaries
- durable storage for metadata
- file upload, document import, or existing document stores
- background jobs or a place to add them
- enough test infrastructure to prove allowed and denied behavior

These are the main host signals the applying agent must name in `.buildprint/host-assessment.md`: auth/session helper, permission or membership source, document model, storage adapter, migration system, background job path, vector/search backend, and test command.

## Weak host candidates

Proceed only after explicit user approval when the host:

- has authentication but no authorization model
- stores documents only in third-party systems with no metadata mirror
- has no approved schema migration path
- cannot run local parsing or must send all documents to external providers
- cannot expose MCP tools and needs an internal service API instead

## Incompatible hosts

Do not apply this capability when:

- every user is anonymous
- the host cannot identify which documents a subject may access
- derived indexes cannot be deleted when a document is deleted
- the vector store cannot support equivalent pre-retrieval filters
- the user refuses evaluation or denial tests for permission boundaries

Block conditions must be written explicitly. A host with no user identity, no permission source, no ACL assignment path, no approved storage path, or no pre-filter-capable retrieval backend is not compatible until the missing prerequisite is supplied.

## Provider compatibility

The capability is provider-adaptable:

- PostgreSQL + pgvector is the default MVP route when the host already uses Postgres.
- Qdrant, Weaviate, Elasticsearch/OpenSearch, or another vector/search backend is acceptable when it supports equivalent authorization pre-filters.
- Hosted file-search products may be used for prototypes or secondary experiences, but not as the sole production datastore when the app needs tenant/project ACLs, custom extraction, deterministic rendering, or deletion receipts.
