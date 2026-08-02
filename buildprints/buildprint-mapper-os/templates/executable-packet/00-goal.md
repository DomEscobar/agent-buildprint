# 00 Goal

Lock the observable goal before setup. If a hard-stop question is unanswered, stop before `01-setup.md`.

## Goal

Replace this template with the mapped artifact's observable goal: what a user or operator can do, and what changes in the world when they succeed.

## Acceptance criteria

- Named success path the user/operator can trigger
- Named output, state, or artifact that proves success
- Named failure/blocked path that stays honest
- Central output quality bar (not merely that an output exists)

## Hard-stop questions

These require `confirmed_by: user` or `confirmed_by: explicit_user_delegation` before setup, identity, or implementation. If the user explicitly says "you choose", "use your judgment", or equivalent, the agent may pick the answer only after recording the exact delegation phrase in `.buildprint/decisions.md`.

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

**Scope-presentation mismatch is a hard-stop, not a default.** If the build will expose a broad product surface while the runtime posture is a local proof or mock-only, that mismatch must be confirmed explicitly.

## Deferrable questions

Record these, but do not block setup:

- exact color palette after `02-identity.md` sets the visual direction;
- deployment target when posture remains trusted local;
- advanced analytics, billing, or admin polish not required by the golden path;
- secondary integrations not needed for the first real loop.

## Decision ledger

Record confirmed hard-stop answers in `.buildprint/decisions.md` before starting `01-setup.md`. Every hard-stop question (1-5) must appear with `answer`, `confirmed_by`, `reversible`, and `blocks_setup`.

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
