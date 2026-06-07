# 00 Questions

Ask only questions that change implementation. Do not turn this packet into a long interview. If a hard-stop question is unanswered, stop before `01-ui-identity.md`.

## Hard-stop questions

These require explicit human confirmation before UI identity, setup, or implementation:

1. **Deployment posture** - Is this trusted local, private authenticated, or public-facing? Public-facing use changes auth, upload screening, abuse controls, persistence, cost controls, and deployment proof.
2. **Secrets and provider policy** - Which AI providers, model tiers, or paid generation services may be used, and where may credentials live? Never guess secret handling.
3. **Destructive/data-loss behavior** - Can the product overwrite story packages, delete projects, publish exports, send files externally, or mutate connected storage?
4. **Privacy/compliance exposure** - Will uploaded notes include private manuscripts, minors' content, regulated data, client IP, or public posting obligations?
5. **Product/artifact identity** - If the desired output is not an editable story package with storyboard, outline, cast, continuity, and export surfaces, ask before building a different product.

## Assumable defaults

If not answered, the agent may choose a reversible default and record it in setup:

- trusted local posture for first build, with private-auth/public hardening blocked until explicitly chosen;
- local project storage first, upgraded only when deployment posture requires shared persistence;
- deterministic provider fixtures for tests, with live AI generation blocked until credentials are configured;
- import text/markdown/plain document notes before rich binary manuscript parsing;
- export markdown and JSON package first, then PDF/docx only after export proof exists;
- focus the first loop on premise, cast, outline, storyboard, one scene regeneration, and package export.

## Deferrable questions

Record these, but do not block setup:

- exact AI model selection after provider policy is known;
- exact export formats beyond markdown/JSON;
- collaboration, comments, and version history beyond local draft readback;
- advanced image generation for storyboard frames;
- marketplace publication copy and screenshots after the packet itself passes structure checks.

## Decision ledger template

```md
| Question | Answer / assumption | Reversible? | Architectural impact | Blocks setup? |
|---|---|---:|---|---:|
| Deployment posture | trusted_local assumed | yes | local auth/secrets/deploy only | no |
```

If a hard-stop is blank, write the blocker and ask. Do not continue because defaults are probably fine.
