# 00-questions

Ask only questions that change implementation behavior. If no answer is available, continue with the safest high-quality default and record the unresolved decision in `HANDOVER.md`.

If a hard-stop question is unanswered, stop before `01-project-setup.md`.

## Hard-stop questions

These require explicit human confirmation before setup, UI identity, or implementation:

1. **Deployment posture** — trusted local, private authenticated, or public web? This changes auth, secrets, abuse controls, persistence, and deployment gates.
2. **Secrets and provider policy** — Which paid/live providers may be used, and where may credentials live? Never guess secret handling.
3. **Destructive/data-loss behavior** — Can the product delete, overwrite, migrate, publish, send, charge, or mutate external systems?
4. **Privacy/compliance exposure** — Does the product handle private data, regulated data, minors, financial/medical/legal claims, or public posting?
5. **Product/artifact identity** — If the central artifact or primary user is ambiguous, ask before building the wrong thing.

6. Should the implementation include live external provider calls during verification, or run deterministic local/provider-stub mode until credentials are supplied?
   - AI-best-judgment default: implement provider seams and validation, prove deterministic local behavior, and mark live provider calls blocked until sandbox credentials are provided.

7. What deployment posture should be assumed: `trusted_local`, `private_authenticated`, or `public_webapp`?
   - AI-best-judgment default: `private_authenticated` for web deployment and `trusted_local` for desktop/local packaging. Do not expose generated files or provider keys publicly.

8. Should OAuth-style ChatGPT sign-in be included in the selected implementation, or blocked behind a provider seam?
   - AI-best-judgment default: include the UI/provider seam and session model, but block live OAuth proof unless callback credentials and test accounts are supplied.

## Assumable Defaults

1. Persistence should be durable and readback-proven.
   - Default: SQL-backed presentation/slide/template/chat/task state plus file/object storage for uploads, assets, exports, and local user config.

2. Export should target editable PPTX and PDF.
   - Default: implement both, but qualify PDF/PPTX only after the export worker/browser runtime produces downloadable artifacts from the editor state.

3. The first implementation path should be prompt or document to outline to editable deck to export.
   - Default: include prompt-only and uploaded-document input in the first loop; defer exotic provider combinations until provider settings are in place.

## Deferrable Questions

1. Which optional model providers must be live-proven first?
   - Default: one text provider, one image provider, and one local/offline provider seam are enough for early proof; all others remain configured but not live-proven.

2. Which custom template formats must be accepted first?
   - Default: support built-in templates first, then custom template import/editing, then template generation from existing presentations.

## Decision ledger template

```md
| Question | Answer / assumption | Reversible? | Architectural impact | Blocks setup? |
|---|---|---:|---|---:|
| Deployment posture | private_authenticated assumed for server, trusted_local assumed for desktop/local | yes | auth, secrets, storage, provider proof, and deployment gates | no |
```

If a hard-stop is blank, write the blocker and ask. Do not continue because defaults are probably fine.
