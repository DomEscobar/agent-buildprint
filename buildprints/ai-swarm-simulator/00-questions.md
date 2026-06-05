# 00 Questions

Use this file to separate real blockers from assumable defaults. Do not turn it into a long preflight questionnaire. Stop before `01-project-setup.md` only when a hard-stop answer changes safety, data exposure, cost, or product identity.

## Hard-stop questions

1. **Deployment posture** — Is this still trusted_local, or must it be private_authenticated/public_webapp now? If public, stop and add auth, isolation, abuse, logging, and deployment controls before building.
2. **Secrets and provider policy** — Which OpenAI-compatible provider can be used, and may the app store local provider metadata? API keys must stay local/secret-managed and never enter snapshots, commits, reports, or logs.
3. **Destructive/data-loss behavior** — May uploaded seed material, graph memory, simulation runs, and reports be deleted or overwritten? If destructive behavior is allowed, require confirmation and recovery semantics.
4. **Privacy/compliance exposure** — Will users upload private, regulated, client, or third-party material? If yes, stop for retention, redaction, export, and local-only boundaries.
5. **Product/artifact identity** — Is the central artifact a local workbench, embeddable library, hosted app, or research demo? The default is local workbench; changing that changes architecture and proof.
6. **Audience and language level** — Is the user expected to understand graph memory, providers, runtimes, traces, and local persistence? The default is no: build for a non-technical first-time user, then reveal technical details progressively.

## Assumable defaults

- Deployment posture is `trusted_local`.
- Graph memory defaults to an open-source adapter such as Graphiti; Zep Cloud is not required.
- Provider config is OpenAI-compatible and runtime-editable.
- Seed material can use a local uploaded/sample fixture for first loop, but the UI must label sample-only proof honestly.
- Persistence can begin with local files or a lightweight local database if the interfaces can later harden.
- Primary UX labels default to plain-language workflow copy: add scenario, see what the system understood, check readiness, read the report, continue.

## Deferrable questions

- Exact production hosting, billing, team permissions, and public analytics.
- The final graph layout library if the first loop proves a simpler SVG/canvas implementation.
- Multi-project collaboration and long-term retention policy beyond trusted-local use.
