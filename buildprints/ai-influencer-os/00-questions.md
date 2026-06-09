# 00 Questions

These questions are scoped to AI Influencer OS.

Ask only questions that change implementation. Do not turn mapping into a long interview. If a hard-stop question is unanswered, stop before `01-project-setup.md`.

## Hard-stop questions

These require explicit human confirmation before setup, UI identity, or implementation:

1. **Deployment posture** — trusted local, private authenticated, or public web? This changes auth, secrets, abuse controls, persistence, and deployment gates.
2. **Secrets and provider policy** — Which paid/live providers may be used, and where may credentials live? Never guess secret handling.
3. **Destructive/data-loss behavior** — Can the product delete, overwrite, migrate, publish, send, charge, or mutate external systems?
4. **Privacy/compliance exposure** — Does the product handle private data, regulated data, minors, financial/medical/legal claims, or public posting?
5. **Product/artifact identity** — If the central artifact or primary user is ambiguous, ask before building the wrong thing.

## Assumable defaults

If not answered, the agent may choose a reversible default and record it in setup:

- local-first storage unless public/private posture demands otherwise;
- mock/deterministic providers in tests, live providers blocked until configured;
- simple stack matching source/project constraints;
- conservative UI scope that proves the first useful loop before breadth;
- sample data only as novice/demo path, never as operator/live proof.

## Deferrable questions

Record these, but do not block setup:

- exact color palette after `02-ui-identity.md` sets the visual direction;
- deployment target when posture remains trusted local;
- advanced analytics, billing, or admin polish not required by the golden path;
- secondary integrations not needed for the first real loop.

## Decision ledger template

```md
| Question | Answer / assumption | Reversible? | Architectural impact | Blocks setup? |
|---|---|---:|---|---:|
| Deployment posture | trusted_local assumed | yes | local auth/secrets/deploy only | no |
```

If a hard-stop is blank, write the blocker and ask. Do not continue because defaults are probably fine.

