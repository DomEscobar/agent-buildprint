# Project Setup

This setup contract is completed before phase implementation. It turns short human alignment and mapped source evidence into concrete project architecture, team operating rules, quality gates, and the future project `AGENTS.md` plan.

## Human preferences

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from source evidence and product goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks.

## Inferred project shape

- Product: Portable Novel-to-Storyboard Pipeline
- Frontend/UI surfaces: infer from phase UX/UI requirements and source evidence.
- Backend/API surfaces: infer from phase interfaces touched and source evidence.
- State/runtime surfaces: infer from phase state/runtime touched and source evidence.
- Tests/evaluation: derive from `04-evaluation.md` and phase proof gates.

## Stack decisions

Record decisions with short evidence, not bureaucracy:

- Framework/runtime:
  - Decision: AI best-fit unless human constrained it.
  - Evidence: mapped source, product requirements, and phase proof gates.
- Package manager:
  - Decision: choose source-faithful or ecosystem-standard default.
  - Evidence: lockfiles/workspace evidence if available.
- Data/storage:
  - Decision: real persistence where the product requires durable state.
  - Evidence: state/runtime requirements in phases.
- Auth/providers/deployment:
  - Decision: best-fit default unless credentials, cost, or irreversible deployment choices require human confirmation.

## Architecture rules

- Preserve product behavior and source-derived obligations; frameworks are replaceable when behavior and proof remain intact.
- Keep dependency direction explicit: UI -> application/service -> domain -> data/provider adapters.
- Keep routes/controllers thin; put business rules in domain/service layers.
- Put external API/provider/database access behind adapters or repositories.
- Do not claim durable behavior from in-memory-only state unless explicitly scoped as a prototype blocker.
- Generated code must be marked and regenerated through documented commands.
- Defaults must be appropriate, evidence-grounded, and no more complex than the product needs.

## Team operating model

Use these review lenses during every implementation loop:

- Architecture: boundaries, dependency direction, maintainability, source-faithful behavior.
- UX/UI: polished flows, empty/loading/error/success states, accessibility, responsive behavior.
- Backend/API: validation, auth/tenant/privacy boundaries, provider contracts, error semantics.
- State/runtime: persistence, migrations, env/config, workers/jobs, runtime observability.
- QA/evaluation: tests, build, browser/runtime checks, evidence quality, no fake proof.
- Security/infra: secrets, destructive actions, external writes, deployment and cost approvals.

## AGENTS.md plan

The blueprint packet must not contain `AGENTS.md`. The implementation project should create root/local `AGENTS.md` after this setup is resolved.

- Root `AGENTS.md`: project shape, architecture rules, quality gates, safety/permissions, workflow, and local instruction map.
- Local `AGENTS.md` files: create only at real architectural boundaries such as frontend/app, backend/API, packages/ui, data/db, infra, or tests/e2e.
- Local files may narrow rules for their subtree but must not weaken root safety, quality, or architecture invariants.

## Quality gates

Before claiming any phase done:

- Run the smallest meaningful typecheck/lint/test/build gate for changed code.
- For UI-facing work, verify user-visible behavior with browser/screenshot evidence when possible.
- For backend/provider/state work, verify real request/path, persistence/readback, or record an honest blocker.
- Do not skip tests, hide failures, or upgrade claims without proof.

## Safety and permissions

Ask before destructive actions, external writes/publishes/deploys, secret handling, paid services, irreversible migrations, or public data changes.

Never commit secrets, private logs, credentials, or provider tokens.

## Open questions and assumptions

For each unresolved choice, record:

- Assumption:
- Evidence:
- Risk:
- Blocks phase work: yes/no

Unanswered ordinary engineering choices should become AI-owned assumptions, not blockers.

## Phase start gate

Do not start `03-phases/*` until this file is explicit enough to generate project root/local `AGENTS.md` without inventing architecture.

Initial phase set:

- `03-phases/01-project-workspace-auth.md`
- `03-phases/02-novel-event-ingestion.md`
- `03-phases/03-script-agent-assets.md`
- `03-phases/04-production-storyboard-flow.md`
- `03-phases/05-media-preview-export.md`
- `03-phases/06-safety-runtime-boundary.md`
