# Mapper OS Question Policy

UX rule: ask as little as possible before understanding the repo. The mapper should feel agentic, not like an onboarding form.

## Attention anchor

Discover first, ask later. Before discovery, ask only if safety or read/export boundaries are unclear. After discovery, ask one blocking decision at a time and keep non-blocking unknowns in `questions.md`.

## Principle

Discover softly first. Ask sharp questions later.

The agent should prefer safe defaults, proceed with reversible discovery, and only interrupt for decisions that materially change scope, safety, portability, or proof target.

## Preflight: 0-3 questions max

Before soft discovery, ask only if not already clear:

1. **Read/export boundary**
   - Default: read source, docs, tests, config names; export generated Buildprint files only; never copy secrets or `.env` values.
2. **Mapping goal**
   - Default: discover candidates first, then ask which to extract.
3. **Portability preference**
   - Default: keep product behavior portable; treat source stack as reference unless user asks for same-stack rebuild.

If these defaults are safe, do not ask. State assumptions briefly and start discovery.

## Soft discovery first

Soft discovery should produce orientation without requiring user answers:

- product purpose,
- source stack,
- major modules,
- user-facing flows,
- data/integration/security surfaces,
- candidate Buildprints,
- obvious risks/unknowns,
- likely proof targets.

Soft discovery is not the final Buildprint. It is the basis for better questions.

## Smart question gate after discovery

After soft discovery, create `questions.md` with:

```md
# Decisions after soft discovery

## Required now
| # | Decision | Why it matters | Safe default | Human answer |
|---|---|---|---|---|
| 1 | Which candidate/system scope should be extracted? | Sets output boundary | Candidate 1 / highest-confidence product scope | |
| 2 | Preserve source stack or keep portable? | Controls implementation constraints | Keep portable | |
| 3 | Target stack, if any? | Needed only for cross-stack rebuild | Not set yet | |
| 4 | Production-grade selected scope? | Prevents proof-only product claims | Smaller complete scope; included capabilities must be real | |
| 5 | Fidelity/proof target? | Controls validation depth | Contract + runtime proof for selected product/app scope; architecture proof for libraries | |
| 6 | Capabilities to exclude rather than fake? | Prevents fake providers/routes/exports/settings | Cut hard capabilities from scope unless they can be real | |

## Contextual questions — ask only if touched
- ...
```

## Question budget

- Required-now questions: max 5.
- Ask at most 1 blocking question in chat at a time.
- Non-blocking unknowns go to appendix.
- Do not ask questions the repo can answer.
- Do not ask product/business questions until the relevant subsystem is observed.

## Contextual question triggers

Ask only when the subsystem was actually observed or selected:

- Billing: pricing, trial, entitlement, cancellation/refund, webhook idempotency.
- Auth/RBAC: roles, session lifetime, account linking, guest access, permission denial.
- Admin/destructive actions: confirmation, audit trail, rollback, role restrictions.
- Canvas/editor: fidelity target, export formats, collaboration, undo depth, input devices.
- Search: ranking, filters, stale/deleted records, typo/no-result behavior.
- AI/tools: model/provider, tool permissions, safety boundaries, human approval, persistence.
- Data sync/offline: conflict strategy, retention, backup/restore, import/export compatibility.
- Public APIs: rate limits, auth, schema compatibility, versioning, error format.
- Multi-tenant product: tenant isolation, invitations, billing ownership, cross-tenant leakage.

## Safe defaults

When a question is not blocking, use a safe default and mark it `INFERRED`:

- portability: preserve behavior, adapt implementation,
- proof target: architecture proof for libraries; production-grade runtime proof for selected product/app scope,
- side effects: no external writes during mapping; in generated products, external capabilities are either real and explicitly selected or excluded, not mocked as product behavior,
- security: deny by default,
- data: preserve ownership and deletion semantics if observed,
- famous products: non-parity boundary unless explicit parity suite exists.

## Bad question behavior

Avoid:

- long pre-discovery questionnaires,
- asking about every possible subsystem,
- generic “what should this do?” questions when source evidence exists,
- asking multiple blocking questions in one chat turn,
- using questions to avoid making reasonable safe assumptions,
- ending without a chat handover that states outcome, selected scope, evidence, generated files, commands/evals, known gaps, and recommended next direction.
