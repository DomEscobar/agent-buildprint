---
title: Automated AI Blog OS
slug: automated-ai-blog-os
category: Product OS
stack: [Astro/MDX, Markdown, Research workflow, SEO checks, Approval queue, Scheduled publishing]
difficulty: Advanced
status: publishable-draft
agentFile: true
---

# Automated AI Blog OS Buildprint

## Agent Operating Contract

Build an Automated AI Blog OS: a Markdown/MDX-first content pipeline that scans sources, scores ideas, reads content memory, drafts useful posts, validates claims and SEO/build outputs, queues approval, publishes or schedules only through configured gates, and audits stale or unsafe work.

Preserve this target shape:

```txt
research scanner + idea scorer + content memory + draft generator + visual post templates + SEO validator + approval queue + publisher/scheduler + manager audit
```

Default publishing is draft/manual approval. Direct publishing is never enabled by default.

## Binding Implementation Slice

The minimum included behavior is the content-operations pipeline, not a generic CMS or theme:

- configured sources are captured with URL, title, excerpt, observed signal, timestamp, quality, and retrieval status;
- ideas are scored with explicit rubric fields;
- previous posts, used angles, banned topics, and internal links are read before drafting;
- drafts include frontmatter, source map, claim map, reusable prompt/workflow value, visual plan, internal links, CTA or next step, and publish checklist state;
- factual claims are linked to source IDs or blocked;
- SEO validation checks metadata, canonical, robots, OG/Twitter, dates, tags, language, JSON-LD, schema where applicable, sitemap, RSS/feed, llms output, and build status;
- publishing refuses unapproved drafts and requires passing claim, SEO, feed, and build gates;
- manager audit reports stale drafts, weak sources, repeated angles, SEO drift, broken feeds, and blocked publish attempts;
- tests pass without network or real publishing credentials.

## Non-Goals / Unsafe Claims

- Do not replace the system with a plain blog template, CMS admin, or keyword list.
- Do not publish without approval by default.
- Do not invent sources.
- Do not include unsourced factual claims.
- Do not launder sources by attaching source IDs to unsupported claims.
- Do not present fake expertise, fake case studies, or generic SEO filler as product output.
- Do not hide broken sitemap, RSS/feed, llms, metadata, or build outputs.
- Do not call external source, LLM, deployment, or publishing services in tests.
- Do not count route-shaped, command-shaped, or service-shaped placeholders as implemented behavior.

## Required Read Order

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `DEFAULT_PRESET.md`
5. `questions.md`
6. `PLAN.md`
7. `plans/*.md` in listed phase order
8. `TEST_MATRIX.md`
9. `VALIDATION_TEMPLATE.md`
10. `checks/acceptance.md`
11. `policies/publishing.md`

## Phase Gates

1. Configuration: if the user says `Use default blog preset`, apply `DEFAULT_PRESET.md`; otherwise ask exactly `questions.md`, summarize answers with its template, and wait for confirmation.
2. Alignment: record content lane, audience, source types, publisher mode, approval policy, excluded capabilities, fixture policy, and blockers in `VALIDATION.md`.
3. Content structure: create the required config, source, memory, post, visual/component, storage, script, test, and fixture surfaces with implemented behavior or explicit blocked status.
4. Source scanner: capture `SourceRecord` files and mark inaccessible sources as `failed` or `skipped` without inventing content.
5. Idea scoring: generate `IdeaRecord` candidates from captured source IDs and explicit rubric fields.
6. Drafting and visuals: write `DraftRecord` and Markdown/MDX output with source maps, claim maps, original angle, visual plan, internal links, and checklist state.
7. Claim and SEO validation: block ungrounded factual claims and invalid metadata, schema, feeds, llms output, or build status.
8. Approval and publishing: require approval plus passing claim, SEO, feed, and build gates before manual preparation, scheduling, or publishing.
9. Manager audit: report stale, weak, repeated, broken, blocked, and contradictory records with evidence and recommended action.
10. Tests and validation: run the target test/build commands and map every `TEST_MATRIX.md` risk to evidence or an explicit blocker.

## Acceptance Gates

- Source scanner produces valid `SourceRecord` fixtures.
- Idea scorer produces rubric-based `IdeaRecord` files.
- Draft generator writes frontmatter, source map, claim map, visual plan, internal links, CTA or next step, and checklist state.
- Content memory is read before drafting and repeated angles are avoided or flagged.
- Claim validator blocks ungrounded factual claims.
- SEO validator checks metadata, structured data, sitemap/RSS/feed, llms output, and build command.
- Publisher refuses unapproved drafts by default.
- Schedule or auto mode requires explicit configuration and the same gates.
- Manager audit reports stale drafts, repeated angles, weak sources, SEO/feed failures, failed builds, and blocked publish attempts.
- Tests pass without network or publishing credentials.
- `VALIDATION.md` follows `VALIDATION_TEMPLATE.md`.

## Purpose

Use this Buildprint to create an editorial automation system for practical, source-grounded blog publishing. The output should be useful workflow-first posts with visible evidence and human-controlled publishing gates.

## Architecture

```txt
Sources
  -> Scanner
  -> SourceRecords
  -> Idea Scorer
  -> IdeaRecords
  -> Content Memory
  -> Draft Generator
  -> DraftRecord + Markdown/MDX
  -> Claim Validator
  -> SEO Validator
  -> Approval Queue
  -> Publisher/Scheduler

All storage
  -> Manager Audit
  -> Audit Report
```

Required project surface:

```txt
Automated AI Blog OS
  |-- config
  |   |-- content-os.config.json
  |   `-- sources.json
  |-- content-research
  |   |-- README.md
  |   |-- YYYY-MM-DD.md
  |   `-- ideas/*.json
  |-- content-memory
  |   |-- posts-index.json
  |   |-- used-angles.json
  |   |-- internal-links.json
  |   `-- banned-claims.json
  |-- src/content/blog or content/blog
  |   `-- draft/published Markdown/MDX posts
  |-- src/content/visuals or components
  |   |-- FlowGraphic
  |   |-- CompareGrid
  |   |-- DoDont
  |   |-- MetricStrip
  |   `-- Checklist
  |-- scripts
  |   |-- scan-sources
  |   |-- score-ideas
  |   |-- draft-post
  |   |-- validate-claims
  |   |-- validate-seo
  |   |-- approve-draft
  |   |-- publish-or-schedule
  |   `-- manager-audit
  |-- storage
  |   |-- sources/*.json
  |   |-- drafts/*.json
  |   |-- approvals/*.json
  |   |-- seo-reports/*.json
  |   `-- publish-reports/*.json
  `-- tests
      |-- fixtures
      |-- content-pipeline.test.*
      |-- seo-validation.test.*
      `-- approval-publishing.test.*
```

## Evidence Boundary

Fixture and local tests are evidence for pipeline behavior, source grounding, validation gates, and fail-closed publishing. They are not evidence of live source access, live LLM generation, deployed publishing, analytics, or external scheduler behavior.

Any unavailable source access, LLM/provider integration, deployment access, or publishing integration must be recorded in `VALIDATION.md` as blocked or excluded, not represented as working.

## Required Validation

Default command gate:

```bash
npm test
npm run build
```

If the target project does not use npm, run equivalent test/build commands and record the substitution in `VALIDATION.md`.

`VALIDATION.md` must include configuration, generated modules/files, exact commands and results, risk coverage mapped to `TEST_MATRIX.md`, deviations, blockers, and the publish safety statement.

## Copyable Agent Prompt

Build the Automated AI Blog OS from this Buildprint. If I say `Use default blog preset`, use `DEFAULT_PRESET.md`; otherwise ask exactly `questions.md`, summarize the answers using its template, and wait for confirmation. Then implement a Markdown/MDX-first pipeline with source scanning, idea scoring, content memory, draft generation, visual post templates, claim validation, SEO/build/feed validation, approval queue, publisher/scheduler, manager audit, tests, and `VALIDATION.md`. Default publishing must be draft/manual approval. Tests must use fixtures and must not call real source, LLM, deployment, or publishing services. Every represented command, route, service, or capability must work end to end or be recorded as blocked/excluded.
