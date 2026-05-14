# Agent Buildprint Formats

Agent Buildprint is format-flexible.

A Buildprint is not “a YAML file”. It is a package of instructions, contracts, examples, policies, and checks that help coding agents build reliably.

Different creators should be able to publish in the format that best fits the job.

## Supported format types

### 1. Markdown-first Buildprint

Best for comprehensive plans, spec-driven design, product requirements, architecture rationale, and implementation guidance.

```txt
stripe-billing.buildprint/
  BUILDPRINT.md
  acceptance.md
  risks.md
  prompts/implement.md
```

Use when:
- the plan is mostly human-readable;
- the build requires judgment;
- the creator wants narrative explanation;
- coding agents need context, constraints, and tradeoffs.

### 2. Contract-first Buildprint

Best for machine validation, graph workflows, APIs, permissions, tests, and strict implementation contracts.

```txt
langgraph-agent.buildprint/
  buildprint.yaml
  schemas/state.ts
  policies/side-effects.yaml
  tests/routes.spec.yaml
```

Use when:
- structure must be validated;
- routes, nodes, permissions, or APIs must be explicit;
- checks should fail on missing pieces.

### 3. Hybrid Buildprint

Recommended default for serious Buildprints.

```txt
saas-billing.buildprint/
  BUILDPRINT.md          # human-readable master plan
  buildprint.yaml        # machine-readable summary/check target
  diagrams/
  prompts/
  policies/
  tests/
  examples/
```

Use Markdown for intent and explanation. Use YAML/JSON for metadata and checkable structure.

### 4. Example-first Buildprint

Best when the creator has a reference implementation.

```txt
admin-dashboard.buildprint/
  BUILDPRINT.md
  examples/nextjs/
  tests/acceptance.yaml
  prompts/adapt-to-my-repo.md
```

Use when:
- users want to adapt a known-good implementation;
- examples are clearer than abstract schemas.

## Minimal valid Buildprint

A minimal Buildprint can be just:

```txt
BUILDPRINT.md
```

Required sections for registry listing:

```md
# Title

## What this builds

## When to use

## Inputs / assumptions

## Implementation plan

## Acceptance checks

## Risks / when not to use

## Copyable agent prompt
```

## Recommended registry metadata

For search cards and marketplace listing, add either frontmatter in `BUILDPRINT.md`:

```md
---
title: Stripe Billing for Next.js
slug: stripe-billing-nextjs
category: Integration
stack: [Next.js, TypeScript, Stripe, Postgres]
difficulty: Medium
creator: Alice
license: MIT
---
```

or a separate file:

```txt
buildprint.meta.json
```

## Design principle

Do not make creators write complex YAML unless the Buildprint actually needs strict machine validation.

The product promise is:

```txt
Any good software construction plan
→ packaged as a Buildprint
→ readable by humans
→ usable by coding agents
→ optionally checkable by tools
```
