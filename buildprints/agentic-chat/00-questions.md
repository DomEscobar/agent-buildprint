# 00 Questions

These questions are scoped to Agentic Chat.

Ask only questions that change implementation. Do not turn mapping into a long interview. If a hard-stop question is unanswered, stop before `01-project-setup.md`.

The stack is **not pre-committed**. Provider/model, framework, and visual direction are chosen here by the user, then recorded in `docs/architecture.md`. The packet enforces stack-independent behavior (real-model floor, error taxonomy, bounded retry, cancellation, durable persistence), not a fixed toolset.

## Hard-stop questions

These require `confirmed_by: user` or `confirmed_by: explicit_user_delegation` before setup, UI identity, or implementation. If the user explicitly says "you choose", "use your judgment", or equivalent, the agent may pick the answer only after recording the exact delegation phrase in `.buildprint/decisions.md`. `confirmed_by: agent_assumption` is invalid for every hard-stop row.

### Product-shaping questions (ask first)

1. **Intended end-user outcome and acceptance scenario** - who is the primary user, what concrete goal should they complete in their first successful session, what input/context do they bring, what useful result or decision should leave the product, and what would make that result unsafe, unhelpful, or out of scope? Record one representative natural-language goal plus observable acceptance criteria. This is the source intent for architecture, UI, runtime policy, tool choice, and proof; do not substitute a generic “chat assistant” answer.
2. **Provider and model** - which real provider(s) and model(s) drive the chat (local Ollama, OpenAI, Anthropic, OpenRouter, Bedrock-compatible, or other), and which is the default? Choose a provider/model that can carry the intended outcome and required tool/function-calling evidence; the deterministic provider is only a test double.
3. **Stack and framework** - frontend framework, backend/runtime, streaming transport, and persistence store, or explicit delegation to the suggested defaults. The stack must support the intended outcome, its safety boundary, and its proof path; it is not chosen independently of the user journey.
4. **Design direction / visual wishes** - desired aesthetic, brand or tone, reference products to emulate or avoid, density, and light/dark intent. This feeds `02-ui-identity.md`; exact palette can still be finalized there.

### Safety and scope gates

5. **Secrets and provider policy** - where may provider credentials live, which paid providers are allowed, and how are keys handled? Never guess secret handling.
6. **Deployment posture** - trusted local, private authenticated, or public web? This changes auth, secrets, abuse controls, persistence, and deployment gates.
7. **Destructive/data-loss behavior** - can the product delete, overwrite, migrate, publish, send, charge, or mutate external systems?
8. **Privacy/compliance exposure** - does the product handle private data, regulated data, minors, financial/medical/legal claims, or public posting?
9. **Product/artifact identity** - if the central artifact or primary user is ambiguous, ask before building the wrong thing.

## Intent inheritance contract

The answer to question 1 is the canonical **User Intent Contract**. It is not introductory copy. Every later document and proof artifact must inherit it:

- `docs/architecture.md` maps the representative goal to the chosen provider, context boundaries, tools, policy/approval decisions, persistence, and explicit non-goals.
- `docs/ui-identity.md` turns the primary user's goal, success result, and recovery path into the first-view and interaction hierarchy; it must not replace the journey with generic capability cards.
- Each active phase names the part of the representative journey it changes and preserves the acceptance criteria or records an exact blocker.
- Live evidence identifies the originating user goal, trace/session/run ids, produced result, acceptance-criterion verdict, and any blocked or unsafe action. A technically valid trace that solves a different generic task is not outcome proof.

If the intended outcome changes materially, return to this file, update `.buildprint/decisions.md`, and revalidate architecture, UI identity, affected phases, and claim evidence. Do not silently reinterpret the user's goal to fit a convenient provider, stack, or demo.

## Assumable defaults

Assumable defaults apply only to deferrable or reversible implementation choices. They never answer provider/model selection, stack/framework selection, design direction, secrets/provider policy, deployment posture, destructive/data-loss behavior, privacy/compliance exposure, ambiguous product/artifact identity, or scope-presentation mismatch.

After all hard-stop rows are user-confirmed, explicitly delegated, or recorded as blockers, the agent may choose reversible defaults and record them in setup:

- local-first storage unless public/private posture demands otherwise;
- deterministic provider only as a test double in tests; the selected real provider must stream real tokens;
- suggested stack starting points (local Ollama, Vercel AI SDK, SSE, SQLite, React + Vite + Tailwind) only when the user explicitly delegates the stack choice;
- conservative UI scope that proves the first useful loop before breadth;
- sample data only as novice/demo path, never as operator/live proof;
- the exact first tool/skill implemented for phase-04 tool-calling proof (for example a calculator, note/file lookup, or a real search/weather call) may be chosen by the building agent, provided it is a real, working capability the agent authors or wires itself — not an assumed pre-existing/external tool and not a mock.

**Scope-presentation mismatch is a hard-stop, not a default.** If the build will expose a broad product surface (full-featured UI, multi-panel workbench, multi-domain admin) while the runtime posture is a local proof or mock-only, that mismatch must be confirmed explicitly. Defaulting to a local proof stack while presenting as a full product is not a valid assumable default.

## Deferrable questions

Record these, but do not block setup:

- exact color palette after `02-ui-identity.md` refines the chosen design direction;
- deployment target when posture remains trusted local;
- additional secondary providers beyond the chosen default;
- secondary integrations not needed for the first real loop.

## Decision ledger

Record confirmed hard-stop answers in `.buildprint/decisions.md` before starting `01-project-setup.md`. The file must not still contain the empty placeholder stub when setup or phase work begins. Use the table template below. Every hard-stop question must appear with `answer`, `confirmed_by`, `reversible`, and `blocks_setup`.

Allowed hard-stop `confirmed_by` values:

- `confirmed_by: user`
- `confirmed_by: explicit_user_delegation`
- `confirmed_by: blocker`

`confirmed_by: agent_assumption` is invalid for hard-stop rows. If the user delegates the decision, `delegation_quote` must preserve the exact user phrase.

```md
| Question | answer | confirmed_by | delegation_quote | reversible | blocks_setup | architectural_impact |
|---|---|---|---|---:|---:|---|
| Intended end-user outcome and acceptance scenario |  |  |  | no | yes | source intent, user journey, tool/policy scope, and outcome evidence |
| Provider and model |  |  |  | no | yes | real-model outcome floor and provider interface |
| Stack and framework |  |  |  | no | yes | frontend/backend/transport/persistence choice |
| Design direction |  |  |  | yes | yes | UI identity and design system |
| Secrets and provider policy |  |  |  | no | yes | provider runtime and credential storage |
| Deployment posture |  |  |  | no | yes | auth/secrets/deploy gates |
| Destructive/data-loss behavior |  |  |  | no | yes | mutation and recovery model |
| Privacy/compliance exposure |  |  |  | no | yes | data handling and safety boundaries |
| Product/artifact identity |  |  |  | no | yes | central product loop and UI identity |
```

If a hard-stop is blank, write the blocker and ask. Do not continue because defaults are probably fine.
