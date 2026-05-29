# Phase 01 — Content Skeleton

## Goal

Create the production-shaped file tree and command surface without empty module placeholders.

## Required actions

1. Create `config/content-os.config.json` and `config/sources.json` from the confirmed settings.
2. Create durable folders for `content-research`, `content-memory`, posts, visuals/components, `storage/{sources,drafts,approvals,seo-reports,publish-reports}`, and proof-fixtures/fixtures.
3. Add command wrappers for `scan-sources`, `score-ideas`, `draft-post`, `validate-claims`, `validate-seo`, `approve-draft`, `publish-or-schedule`, and `manager-audit`.
4. Each command must call implemented code or return a structured blocked status recorded in `VALIDATION.md`; empty stubs do not count.
5. Seed content memory files: `posts-index.json`, `used-angles.json`, `internal-links.json`, and `banned-claims.json`.

## Done when

- Static tests verify the required folders, commands, config files, and storage paths exist.
- Command wrappers fail closed for missing config and never imply real publishing is enabled by default.
- `VALIDATION.md` lists any intentionally blocked command with a reason and next action.
