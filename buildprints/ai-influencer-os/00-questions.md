# 00 Questions

Ask only questions that change implementation. Do not turn mapping into a long interview. If a hard-stop question is unanswered, stop before `01-project-setup.md`.

## Hard-stop questions

These require `confirmed_by: user` or `confirmed_by: explicit_user_delegation` before setup, UI identity, or implementation. If the user explicitly says "you choose", "use your judgment", or equivalent, the agent may pick the answer only after recording the exact delegation phrase in `.buildprint/decisions.md`.

1. **Deployment posture** - trusted local, private authenticated, or public web? This changes auth, secrets, abuse controls, persistence, and deployment gates.
2. **Secrets and provider policy** - Which paid/live providers may be used, and where may credentials live? Never guess secret handling.
3. **Destructive/data-loss behavior** - Can the product delete, overwrite, migrate, publish, send, charge, or mutate external systems?
4. **Privacy/compliance exposure** - Does the product handle private data, regulated data, minors, financial/medical/legal claims, or public posting?
5. **Product/artifact identity** - If the central artifact or primary user is ambiguous, ask before building the wrong thing.

## Assumable defaults

Assumable defaults apply only to deferrable or reversible implementation choices. They never answer deployment posture, secrets/provider policy, destructive/data-loss behavior, privacy/compliance exposure, ambiguous product/artifact identity, or scope-presentation mismatch.

After all hard-stop rows are user-confirmed, explicitly delegated, or recorded as blockers, the agent may choose reversible defaults and record them in setup:

- local-first storage unless public/private posture demands otherwise;
- mock/deterministic providers in tests, live providers blocked until configured;
- simple stack matching source/project constraints;
- conservative UI scope that proves the first useful loop before breadth;
- sample data only as novice/demo path, never as operator/live proof.

**Scope-presentation mismatch is a hard-stop, not a default.** If the build will expose a broad product surface (full-featured UI, multi-panel workbench, multi-domain admin) while the runtime posture is a local proof or mock-only, that mismatch must be confirmed explicitly. Record the intended scope ("local proof of the core loop only" vs. "full product") before building. Defaulting to a local proof stack while presenting as a full product is not a valid assumable default.

## Deferrable questions

Record these, but do not block setup:

- exact color palette after `02-ui-identity.md` sets the visual direction;
- deployment target when posture remains trusted local;
- advanced analytics, billing, or admin polish not required by the golden path;
- secondary integrations not needed for the first real loop.

## Decision ledger

Record confirmed hard-stop answers in `.buildprint/decisions.md` before starting `01-project-setup.md`. The file must not still contain the empty placeholder stub when setup or phase work begins. Use the table template below. Every hard-stop question (1-5) must appear with `answer`, `confirmed_by`, `reversible`, and `blocks_setup`.

Allowed hard-stop `confirmed_by` values:

- `confirmed_by: user`
- `confirmed_by: explicit_user_delegation`
- `confirmed_by: blocker`

`confirmed_by: agent_assumption` is invalid for hard-stop rows. If the user delegates the decision, `delegation_quote` must preserve the exact user phrase.

```md
| Question | answer | confirmed_by | delegation_quote | reversible | blocks_setup | architectural_impact |
|---|---|---|---|---:|---:|---|
| Deployment posture |  |  |  | no | yes | auth/secrets/deploy gates |
| Secrets and provider policy |  |  |  | no | yes | provider runtime and credential storage |
| Destructive/data-loss behavior |  |  |  | no | yes | mutation and recovery model |
| Privacy/compliance exposure |  |  |  | no | yes | data handling and safety boundaries |
| Product/artifact identity |  |  |  | no | yes | central product loop and UI identity |
```

If a hard-stop is blank, write the blocker and ask. Do not continue because defaults are probably fine.
