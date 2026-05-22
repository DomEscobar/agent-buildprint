# Capability: Ingestion And Ontology

Status: `INCLUDED_NEEDS_PROOF`

## Owned source surfaces

- routes.upload
- api.parse
- tables.project
- providerAdapters.llm

## Product obligations

- Accept seed documents through the upload workflow.
- Extract text for ontology generation.
- Persist project metadata durably.
- Preserve the LLM/provider boundary as a real runtime obligation, not a fake-success seam.

## Behavior Contract

Accept seed documents, extract text, and persist project metadata.
