# 00 - Host Assessment

Write `.buildprint/host-assessment.md` before editing source files.

## Baseline commands

Identify and run the host's normal validation commands before implementation:

- install/status command if dependencies are missing
- typecheck
- lint
- unit tests
- integration tests
- migration dry run when available

Record failures as baseline failures. Do not hide them as capability failures unless your edits caused them.

## Identity and authorization assessment

Find and document:

- how the host identifies the current user
- whether service accounts exist
- tenant/team/project/customer concepts
- role, group, permission, or membership source
- admin/bootstrap model
- denied-path behavior today
- middleware or helper functions used for authorization

Classify unresolved decisions. Stop if user identity, tenant boundary, or document permission source is unclear.

## Data and document assessment

Find and document:

- raw document storage
- upload/import surfaces
- supported file types
- existing document metadata
- existing search/vector/retrieval systems
- database ORM/migration framework
- background job framework
- deletion/retention behavior

Stop if documents cannot be tied to ACL metadata at ingestion time.

## Security and privacy assessment

Find and document:

- whether private documents may leave the host environment
- approved embedding/model/parser providers
- secret management
- logging policy
- audit-log requirements
- PII, pricing, legal, or confidential document classes

Stop if the implementation would send private content to an external parser/model without explicit approval.

## Retrieval assessment

Find and document:

- current keyword search
- current vector store or embedding model
- expected scale: documents, chunks, tenants, projects
- filter cardinality risks
- latency and cost constraints
- required languages

If using approximate vector search with strong filters, plan recall/performance tests. pgvector approximate indexes apply filtering after index scan, so highly selective ACL filters can require iterative scans, partial indexes, or partitioning.

