# Apply Protocol

## Objective

Install the Secure Hybrid RAG MCP capability through a strict, phased grafting workflow.

## Required order

1. Read `capability.yaml`.
2. Run `00-host-assessment.md`.
3. Run `01-integration-plan.md`.
4. Implement each file in `02-implementation-phases/` in order.
5. Run `verify.md`.
6. Write `.buildprint/capability-receipt.md`.

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
