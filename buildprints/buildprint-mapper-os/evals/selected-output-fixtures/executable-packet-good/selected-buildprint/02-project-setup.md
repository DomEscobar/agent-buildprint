# Project Setup

This setup contract is completed before phase implementation. It turns short human alignment and mapped source evidence into concrete project architecture, team operating rules, quality gates, and the future project `AGENTS.md` plan.

## Human preferences

- Human answers come from `01-questions.md`.
- Blank answers are not blockers. The implementation agent chooses best-fit, high-quality defaults from source evidence and product goals.
- Ask the human only for irreversible, expensive, credentialed, destructive, or product-defining forks.

## Inferred project shape

- Product: executable packet good fixture
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

## Source contract anchors

Promote concrete source observations into implementation contracts before starting phases:

- Route/API/job prefixes and handlers: source path api/records.ts records ingest capability; target route may differ if equivalent behavior is preserved.
- Request/response payloads and validation errors: submitted record requires validation for missing required fields and returns stored/readback result.
- Provider/runtime boundaries and env var names only: none required for this fixture.
- Durable state, generated artifacts, retention, import/export, and delete/reset behavior: durable record storage and readback are required; optional exports must be labeled as runtime artifacts, e.g. runtime artifact `records.json`.
- UI flow/state anchors including empty/loading/error/blocked/success states: ingest form/list states are UI-bearing if implemented.

## Source capability/surface ledger

- Surface id: SRC-INGEST-API
  - Source anchor: source path api/records.ts:1-20.
  - Source capability: accept user-submitted records, validate required fields, persist results, and expose readback.
  - Target disposition: preserve | replace | merge | defer | drop. This fixture uses preserve.
  - Target contract: equivalent ingest and readback behavior; route/function names may change.
  - Compatibility impact: source route name is an anchor only, not route/function parity.
  - Phase(s): `03-phases/01-ingest-record.md`.

Rules:

- This is not route/function parity. Prefer cleaner target architecture when it preserves or intentionally improves the capability.
- No source-backed surface may disappear silently. If it is merged, replaced, deferred, or dropped, record why and where the equivalent obligation or blocker lives.
- Source repository filenames such as package manifests, lockfiles, or route files are source anchors, not packet file references. Label them as source paths instead of ambiguous packet links.
- Future files produced by the implementation/product are runtime artifacts or generated outputs, not packet files. Label them inline, e.g. `runtime artifact: <name>` or `generated output: <name>`.
- Unlabeled backticked `.md`, `.yaml`, `.json`, or `.jsonl` references are reserved for actual packet files that exist in `selected-buildprint/`.

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


## Execution authority model

- Root `AGENTS.md` in the downstream implementation project is a scope governor, not the product brain. It keeps agents from broadening scope, skipping proof, or updating Buildprint state without assignment.
- `.buildprint/next-agent.md` is the continuity handoff for fresh main sessions and must identify current phase, objective, recommended next action, and known blockers.
- The current task prompt or bounded handoff is the only valid source of delegated role, scope, allowed edits, proof command, and evidence-row expectations. Do not rely on workers knowing whether they are subagents.
- If no bounded assignment exists, an agent must stop after reading continuity and propose the next action instead of choosing its own phase.

## Execution authority model

Root/local `AGENTS.md` files are scope governors, `.buildprint/next-agent.md` is continuity, and `03-phases/phase-flow.md` is the phase-entry constitution for bounded handoffs.

## Delegation and handoff protocol

For each phase, the orchestrating main session must create bounded assignments before delegating work. Each assignment includes phase id, proof gate, files to read, allowed edit scope, non-goals, success criteria, verification command, evidence row requirements, and risks/blockers. Specialist workers return changed files, proof results, an evidence row draft, and risks. The orchestrator reviews and integrates their output, runs the phase proof gate, appends runtime evidence to `.buildprint/evidence/evidence-ledger.jsonl`, and updates `.buildprint/progress.md` plus `.buildprint/next-agent.md` before moving on. Vague global delegation is invalid.

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

- `03-phases/01-ingest-record.md`
