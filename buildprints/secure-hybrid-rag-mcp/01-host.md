# 01 Host

Merge of host assessment and integration plan. Complete before loop work. No source edits before `00-goal.md` hard stops and this host plan.

## Host assessment

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



## Integration plan

# 01 - Integration Plan

Write `.buildprint/capability-plan.md`, `.buildprint/rag-security-plan.md`, and `.buildprint/rag-evaluation-plan.md` before source edits.

## Capability plan

The plan must name:

- exact MCP tools or internal service methods to add
- database tables or collections to add/change
- migration strategy and rollback path
- parser and fallback parser boundary
- embedding model and versioning strategy
- vector and keyword index strategy
- reranker strategy and feature flag
- generation model/output schemas
- tests to add
- host surfaces to wire

## Security plan

The security plan must define:

- `RetrievalSubject` fields
- document/chunk ACL fields
- authorization helper or policy engine to use
- how allowed corpus is computed
- how dense and keyword queries share the same filter
- how denied retrieval is tested
- which logs may contain raw content
- deletion and permission-change reindex behavior

The plan must explicitly reject post-retrieval filtering as the primary security mechanism.

## Evaluation plan

The evaluation plan must define a small golden set:

- representative documents or synthetic fixtures
- retrieval questions
- extraction tasks
- generation tasks
- expected sources/pages/fields
- permission-leak scenarios
- metrics and pass/fail thresholds

Minimum metrics:

- context precision
- context recall
- faithfulness
- answer relevance
- unsupported-claim rate
- extraction field accuracy
- domain-output accuracy
- allowed/denied retrieval correctness

## Scope control

Keep the first implementation small but real:

- one ingestion path
- one parser adapter
- one vector path
- one keyword path
- one fusion path
- one cited generation path
- one evaluation fixture set

Do not add a dashboard, admin UI, or broad provider marketplace until the core security and retrieval proof passes.



## Apply order

Follow:

1. `00-goal.md`
2. `01-host.md` (this file)
3. `loops/` in order
4. `review.md`
5. `verify.md`

### Legacy apply notes

# Apply Protocol

## Objective

Install the Secure Hybrid RAG MCP capability through a strict, phased grafting workflow.

## Required order

1. Read `capability.yaml`.
2. Run `00-host-assessment.md`.
3. Run `00-assessment-questions.md`.
4. Run `01-integration-plan.md`.
5. Implement each file in `02-implementation-phases/` in order.
6. Run `verify.md`.
7. Write `.buildprint/capability-receipt.md`.

## Local outputs

The applying agent must create:

```text
.buildprint/host-assessment.md
.buildprint/capability-plan.md
.buildprint/rag-security-plan.md
.buildprint/rag-evaluation-plan.md
.buildprint/capability-receipt.md
```

## Implementation rule

Keep RAG bounded. Do not redesign auth, replace the database, build a broad admin console, or rewrite the product around the capability unless the plan says that scope is required and approved.

Host assessment is a hard gate. Classify important findings as `infer safely`, `patch locally`, `must ask user`, or `out of scope`. If any `must ask user` finding changes user identity, tenant boundaries, document ownership, permission source, provider privacy, migration strategy, deletion policy, or output liability, stop and ask before source edits.

## Security rule

Secure Hybrid RAG is deny-by-default:

- unknown user: deny
- unknown tenant/scope: deny
- missing ACL metadata: deny or quarantine
- missing permission source: block
- post-retrieval filtering: invalid as primary security boundary

## Phase order

1. Contract and config
2. Ingestion and indexing
3. Secure retrieval
4. Generation and host surfaces
5. Evaluation, observability, and receipt

Each phase must leave the repo in a buildable or honestly blocked state. If a phase cannot be completed, write the blocker to `.buildprint/capability-receipt.md` and stop.

## Implementation rules

- Prefer host conventions over new frameworks.
- Use existing auth helpers instead of inventing a parallel authorization system.
- Use existing DB/ORM migration style.
- Make indexing idempotent.
- Version parser, chunker, embedding model, index schema, and prompt contracts.
- Do not log sensitive raw content by default.
- Do not call external providers with private documents unless approved.
- Do not claim installation until `verify.md` passes or blockers are explicit.

## DO NOT

- Do not skip local assessment and plan files.
- Do not implement when the host assessment decision is `block`.
- Do not scatter retrieval authorization across unrelated files.
- Do not protect only the UI while leaving API/MCP retrieval open.
- Do not claim success without allow and deny proof.
- Do not over-broaden the task into a product rebuild.


Reconcile assessment assumptions with proof. Downgrade claim ceiling when proof is partial or blocked. Record not-proven honestly.
