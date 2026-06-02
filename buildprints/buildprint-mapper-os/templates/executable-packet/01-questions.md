# Questions

These questions are a decision gate, not a survey.

Do not proceed to `02-project-setup.md` while any hard-stop question is unanswered. Stop and ask the human, unless the packet already contains a clear answer.

Every question has one of three classes:

- **Hard-stop**: unanswered means stop. These affect identity, exposure, cost, secrets, destructive behavior, privacy, compliance, or deployment posture.
- **Assumable**: unanswered may receive a safe reversible default, but the assumption must be recorded.
- **Deferrable**: unanswered may be parked for later, but the deferral must be recorded.

## Hard-stop questions

If any hard-stop answer is missing, stop before setup. Do not invent an answer.

1. Deployment posture: `trusted_local`, `private_authenticated`, or `public_webapp`?
2. Primary consumer: who is this being built for, and what must they accomplish first?
3. Product/artifact identity: what is the central artifact, public interface, boundary transaction, service state, task, dataflow, or operation?
4. Exposure boundary: will this handle uploaded files, private data, user accounts, team data, public traffic, or external callbacks?
5. Secrets and paid services: which provider credentials, paid APIs, local models, or external services may be used?
6. Destructive or data-loss actions: what actions can delete, overwrite, publish, send, charge money, or affect external systems?
7. Compliance/privacy constraint: is there any data that must stay local, encrypted, tenant-isolated, auditable, or excluded from providers?
8. Source fidelity constraint: which source behavior must be preserved because losing it would make the remap wrong?

## Assumable questions

If blank, choose the safest reversible default and record it in `02-project-setup.md`.

1. Exact frontend/component framework or non-UI package framework.
2. Exact local database/storage engine.
3. File/folder naming conventions.
4. Minor layout choices and navigation grouping.
5. Local-only default model/provider placeholders when no live credential is available.
6. Test runner/build tool when the selected stack has an obvious mainstream default.

## Deferrable questions

If blank, park these in the setup receipt or handover. They do not block setup unless the human marks them required.

1. Advanced export formats or secondary integrations.
2. Optional themes, templates, examples, or demo data.
3. Nice-to-have observability dashboards under `trusted_local` posture.
4. Future deployment providers when posture is local.
5. Advanced role/permission models before private/public posture.

## Consumption rule

`02-project-setup.md` must create a question-to-decision ledger from this file:

| Question | Class | Answer / assumption / deferral | Architectural impact | Reversible? | Blocks setup? |
|---|---|---|---|---|---|

Hard-stop blanks block setup. Assumable blanks become reversible assumptions. Deferrable blanks become parking-lot entries.

Posture changes operability only (auth, deployment, observability, backup, CI). It never lowers the product-craft floor: every UI-bearing product, including `trusted_local`, uses a real component/UI framework with a build step and a design/styling system. No single-file hand-rolled shell at any posture. See `02-project-setup.md`.
