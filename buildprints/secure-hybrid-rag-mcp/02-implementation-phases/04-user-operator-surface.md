# Phase 04 - User Operator Surface

## Objective

Implement cited generation on top of authorized evidence.

## Required inputs

- phase 03 authorized retrieval
- declared output schemas
- generation model/provider plan
- host MCP or internal API surface plan

## Generation contract

The generator receives:

- user task
- subject purpose
- authorized evidence only
- citation metadata
- output schema
- uncertainty policy

The generator must not receive:

- forbidden chunks
- unfiltered document dumps
- hidden source titles from denied documents
- raw provider secrets

## Output behavior

Generated answers must:

- cite sources
- distinguish evidence from assumptions
- flag missing or weak evidence
- refuse or defer unsupported price, quantity, legal, or safety claims
- validate against the declared output schema when structured

For offer-generation profiles, output JSON first:

- customer/site assumptions
- offer title
- line items
- quantities
- units
- prices when evidenced
- missing data
- source references
- confidence

## Host surfaces

Wire only the surfaces named in the integration plan:

- MCP tools
- internal API routes
- service methods
- background jobs
- admin/debug views if explicitly scoped

Do not build a broad UI unless the user asked for one. A receipt or minimal debug route is enough for capability proof.

## Proof before moving on

- generation receives only authorized evidence
- output includes citations
- weak or missing evidence produces uncertainty flags
- structured output validates against schema
- host/MCP surface rejects missing subject, scope, or purpose
