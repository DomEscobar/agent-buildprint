# Agent Buildprint Mapper

Goal: map an existing codebase into a Buildprint so coding agents can understand, extend, refactor, or reproduce the project without guessing architecture from scattered files.

## Core idea

Do not ask the user to write a buildprint manually.

Instead:

```txt
existing repo
→ repo scan
→ architecture inference
→ confidence-scored buildprint draft
→ human review
→ generated checks
→ reusable buildprint
```

The mapper is an inspector, not a magical reverse-engineer. It should expose uncertainty clearly.

## Inputs

- repository path or GitHub URL
- optional product description from user
- optional target stack or goal
- optional ignore paths

## Outputs

```txt
.project.buildprint/
  facts.json                 # deterministic scan facts, no LLM guesses
  buildprint.yaml
  discovered-map.md
  confidence-report.md
  ui/screens.yaml
  backend/api.yaml
  data/entities.yaml
  integrations/services.yaml
  policies/security.md
  tests/architecture.yaml
  prompts/continue-building.md
```

## Clever mapping pipeline

### 1. Inventory pass

Collect boring facts deterministically:

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

### 2. Architecture clustering

Group files into product modules:

- UI surfaces
- backend routes
- domain services
- data layer
- integrations
- auth/permissions
- jobs/workers
- observability

This should use file paths, imports, route conventions, and naming patterns before LLM inference.

### 3. Behavior extraction

Infer user-visible flows:

- signup/login
- billing
- dashboard
- CRUD flows
- admin flows
- agent/tool flows

Sources:

- route names
- page titles/components
- API verbs
- tests
- README/docs
- seed data

### 4. Risk and policy detection

Detect risky areas:

- payments
- external writes
- destructive actions
- PII handling
- auth/role checks
- file uploads
- public posting
- email/SMS sending
- AI tool calls

Generate policies/checks for these areas.

### 5. Confidence scoring

Every inferred item gets confidence:

```yaml
confidence:
  api_map: high
  ui_flows: medium
  permission_model: low
  billing_rules: medium
```

Low-confidence areas become questions, not fake certainty.

### 6. Human review loop

Ask only high-leverage questions:

- “Is this app single-tenant or team-based?”
- “Who can delete records?”
- “Is Stripe subscription state the source of truth?”
- “Which flows are legacy and should not be copied?”

### 7. Buildprint generation

Create a buildprint that can be used for:

- onboarding a coding agent
- refactoring safely
- rebuilding the project in another stack
- extracting reusable public buildprints
- documenting architecture drift

## Commands / UX

```bash
agb map ./my-project
agb map ./my-project --out ./my-project.buildprint
# planned later: agb map https://github.com/acme/app
agent-buildprint explain ./.project.buildprint
agent-buildprint diff ./.project.buildprint ./my-project
```

## Website UX

A detail page/card should say:

> Turn an existing repo into a Buildprint. The mapper scans structure, routes, data models, integrations, and risks, then creates an architecture contract coding agents can follow.

## Anti-goals

- Do not leak secrets.
- Do not claim perfect understanding.
- Do not generate a huge unreadable YAML dump.
- Do not overwrite source code.
- Do not make LLM guesses look like facts.

## Killer feature

The mapper should produce a **confidence report** and **question list**. That is what makes it trustworthy.

```txt
I wrote facts.json from deterministic scanning. I found your API and data model with high confidence.
I am unsure about permission rules and billing lifecycle.
Answer these 4 questions to finalize the Buildprint.
```
