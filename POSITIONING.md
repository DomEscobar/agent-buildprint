# Agent Buildprint Positioning

Agent Buildprint is a marketplace/registry where people provide **building plans for coding agents**.

The core product is not a proprietary format.
The core product is distribution, discovery, trust, and agent-ready packaging for plans created by others.

## One-sentence promise

Agents can build better software by following Buildprints provided by people who know how that thing should be built.

## What creators provide

Creators can publish any useful construction plan for coding agents:

- comprehensive Markdown specs;
- architecture documents;
- prompt packs;
- reference implementations;
- test plans;
- diagrams;
- policies and constraints;
- optional machine-readable contracts;
- optional schemas/checks.

## What Agent Buildprint provides

Agent Buildprint provides:

- searchable registry;
- creator profiles;
- cards and detail pages;
- copyable agent prompts;
- GitHub/repo browsing;
- validation/trust badges where possible;
- optional alignment metadata;
- optional checks;
- mapper tooling for existing repos.

## Format philosophy

The Buildprint format is **optional alignment**, not a gate.

A creator should not need to rewrite a good plan into our YAML format just to be useful.

Accepted sources can include:

```txt
BUILDPRINT.md
SPEC.md
README.md
prompt-pack.md
examples/
diagrams/
tests/
policies/
buildprint.yaml        # optional
buildprint.meta.json   # optional registry metadata
```

## Alignment layer

Our format exists to help agents and the registry align around:

- title/slug/category/stack metadata;
- what this builds;
- assumptions;
- risks;
- acceptance checks;
- copyable prompts;
- optional machine-readable contracts;
- optional validation rules.

It should make plans easier to discover, compare, and execute — not force creators into a proprietary framework.

## Anti-goals

- Do not become a runtime framework.
- Do not require complex YAML for every Buildprint.
- Do not reject useful Markdown/spec-driven plans because they are not in our preferred structure.
- Do not make creators maintain duplicate docs if their existing spec already works.

## Product mental model

```txt
creator knowledge
→ packaged plan
→ registry listing
→ coding agent can use it
→ optional alignment/checks improve reliability
```

## Homepage language

Use language like:

> Building plans for coding agents, provided by people who know how things should be built.

Avoid language like:

> Our YAML standard for AI-generated software.
