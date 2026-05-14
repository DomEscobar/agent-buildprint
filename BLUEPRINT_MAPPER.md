# Agent Buildprint Mapper

Goal: map an existing codebase into a Buildprint package so coding agents can understand, extend, refactor, or reproduce the project without guessing architecture from scattered files.

The mapper is an inspector, not a magical reverse-engineer. It must expose uncertainty clearly.

## Pipeline

```txt
existing repo
→ deterministic facts
→ observed / inferred / unknown split
→ package-tier selection
→ Buildprint package draft
→ confidence report + questions
→ human review
→ safer coding-agent work
```

## Inputs

- repository path or GitHub URL later
- optional product description
- optional target goal
- optional ignore paths

## Output package

```txt
.project.buildprint/
  facts.json                 # deterministic scan facts, no LLM guesses
  BUILDPRINT.md              # architecture / agent contract
  SPEC.md                    # observed/inferred/unknown behavior contract
  PLAN.md                    # phase index
  plans/                     # tiny task plans for complex projects
  CONTRACTS.md               # route/env/interface contracts
  TEST_MATRIX.md             # risk → checks
  VALIDATION_TEMPLATE.md     # honest completion report
  buildprint.yaml            # machine-readable summary, optional legacy-compatible
  discovered-map.md
  confidence-report.md
  risks.md
  questions.md
  policies/security.md       # planned deeper output
  tests/architecture.yaml
  prompts/continue-building.md
```

## Core rule

Every mapped item must be one of:

```txt
observed   = deterministic scan found it
inferred   = likely from code shape, needs review
unknown    = ask user before coding
```

Never turn unknown business rules into fake facts.

## Deterministic inventory

Collect:

- package manager and scripts
- frameworks and dependencies
- routes/pages/API endpoints
- database schema/migrations/models
- auth libraries/middleware
- env vars by name only, never values
- background jobs/queues/crons
- external integrations
- tests and coverage shape
- Docker/deploy files

## Risk detection

Flag:

- payments
- external messaging
- destructive actions
- PII handling
- auth/role checks
- file uploads
- public posting
- email/SMS sending
- AI tool calls

Risks become `TEST_MATRIX.md` rows and review questions.

## Package tiers

```txt
simple      = small repo / few risks
strong      = normal app with routes/integrations
agent-grade = multi-module, high-risk, many routes, or many integrations
```

Mapper should generate stronger packages automatically as complexity rises.

## Human review loop

Ask only high-leverage questions:

- “Is this app single-tenant or team-based?”
- “Who can delete records?”
- “Is Stripe subscription state the source of truth?”
- “Which flows are legacy and should not be copied?”

## Anti-goals

- Do not leak secrets.
- Do not claim perfect understanding.
- Do not generate huge unreadable dumps.
- Do not overwrite source code.
- Do not make LLM guesses look like facts.
- Do not treat legacy code as desired architecture without review.

## Killer feature

The mapper should produce a confidence report and question list that coding agents must read before changing low-confidence behavior.
