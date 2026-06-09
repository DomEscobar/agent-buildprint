# Automated AI Blog OS

A Markdown/MDX-first editorial automation system for source scanning, idea scoring, grounded drafting, claim validation, SEO checks, approval, publishing gates, and audit.

![Version](https://img.shields.io/badge/version-v3-blue) ![Buildprint](https://img.shields.io/badge/buildprint-executable%20packet-2ea44f) ![Runtime](https://img.shields.io/badge/runtime-local%20first-555) ![Status](https://img.shields.io/badge/status-build%20required-f59e0b)

## Features

- Source scanner and rubric-based idea scorer.
- Content memory for used angles, internal links, and banned claims.
- Markdown/MDX draft generation with visual plan and source/claim maps.
- Claim, SEO, feed, llms, and build validation gates.
- Approval queue, publisher/scheduler seam, and manager audit.

## Requirements

- Local app/runtime stack with a build command for generated content.
- Fixture source data for tests; live crawling is blocked until configured.
- Publishing provider credentials only when live side effects are explicitly approved.

## Provider Keys

- Optional LLM/provider key for live drafting.
- Optional source/API credentials for private feeds.
- Optional deployment or publishing provider keys for live publish/schedule proof.

## Proof Boundary

Fixture tests can prove scanner, idea scoring, drafting, claim validation, SEO validation, approval refusal, and audit behavior. They do not prove live crawling, live LLM quality, deployed publishing, analytics, or scheduler delivery.

## Buildprint Flow

Start with `BUILDPRINT.md`, answer only hard-stop questions in `00-questions.md`, run setup through `01-project-setup.md`, generate UI/operator identity with `02-ui-identity.md`, then execute the active phase from `03-phases/phase-index.yaml` using `03-phases/phase-flow.md`.

