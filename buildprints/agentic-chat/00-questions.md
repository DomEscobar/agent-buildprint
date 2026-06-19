# 00 Questions

These questions are scoped to Agentic Chat.

Ask only questions that change implementation. Do not turn mapping into a long interview. If a hard-stop question is unanswered, stop before `01-project-setup.md`.

The stack is **not pre-committed**. Provider/model, framework, and visual direction are chosen here by the user, then recorded in `docs/architecture.md`. The packet enforces stack-independent behavior (real-model floor, error taxonomy, bounded retry, cancellation, durable persistence), not a fixed toolset.

## Hard-stop questions

These require `confirmed_by: user` or `confirmed_by: explicit_user_delegation` before setup, UI identity, or implementation. If the user explicitly says "you choose", "use your judgment", or equivalent, the agent may pick the answer only after recording the exact delegation phrase in `.buildprint/decisions.md`. `confirmed_by: agent_assumption` is invalid for every hard-stop row.

### Product-shaping questions (ask first)

1. **Provider and model** - which real provider(s) and model(s) drive the chat (local Ollama, OpenAI, Anthropic, OpenRouter, Bedrock-compatible, or other), and which is the default? This sets the real-model outcome floor; the deterministic provider is only a test double.
2. **Stack and framework** - frontend framework, backend/runtime, streaming transport, and persistence store, or explicit delegation to the suggested defaults. The stack is independent and must be chosen, not assumed.
3. **Design direction / visual wishes** - desired aesthetic, brand or tone, reference products to emulate or avoid, density, and light/dark intent. This feeds `02-ui-identity.md`; exact palette can still be finalized there.

### Safety and scope gates

4. **Secrets and provider policy** - where may provider credentials live, which paid providers are allowed, and how are keys handled? Never guess secret handling.
5. **Deployment posture** - trusted local, private authenticated, or public web? This changes auth, secrets, abuse controls, persistence, and deployment gates.
6. **Destructive/data-loss behavior** - can the product delete, overwrite, migrate, publish, send, charge, or mutate external systems?
7. **Privacy/compliance exposure** - does the product handle private data, regulated data, minors, financial/medical/legal claims, or public posting?
8. **Product/artifact identity** - if the central artifact or primary user is ambiguous, ask before building the wrong thing.

## Assumable defaults

Assumable defaults apply only to deferrable or reversible implementation choices. They never answer provider/model selection, stack/framework selection, design direction, secrets/provider policy, deployment posture, destructive/data-loss behavior, privacy/compliance exposure, ambiguous product/artifact identity, or scope-presentation mismatch.

After all hard-stop rows are user-confirmed, explicitly delegated, or recorded as blockers, the agent may choose reversible defaults and record them in setup:

- local-first storage unless public/private posture demands otherwise;
- deterministic provider only as a test double in tests; the selected real provider must stream real tokens;
- suggested stack starting points (local Ollama, Vercel AI SDK, SSE, SQLite, React + Vite + Tailwind) only when the user explicitly delegates the stack choice;
- conservative UI scope that proves the first useful loop before breadth;
- sample data only as novice/demo path, never as operator/live proof.

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
