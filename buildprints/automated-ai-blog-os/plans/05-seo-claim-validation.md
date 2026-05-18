# Phase 05 — SEO And Claim Validation

## Goal

Block ungrounded claims and invalid publish outputs before approval or publishing.

## Required actions

1. Validate each factual claim has one or more source IDs present in the draft `sourceMap`.
2. Allow opinion/experience claims only when explicitly typed; do not use that label to hide factual assertions.
3. Write claim validation status into the draft checklist and block publishing on failures.
4. Validate title, description, canonical, robots, OG/Twitter, dates, tags, language, BlogPosting JSON-LD, breadcrumbs, and FAQ schema when applicable.
5. Verify generated sitemap, RSS/feed, and llms outputs include publishable posts and that the build command passes.

## Done when

- Tests cover grounded factual claims, ungrounded factual claims, and opinion labels.
- SEO report files include pass/fail/blocked status, individual check results, and errors.
- Publish gates cannot pass when claim validation, SEO validation, feed checks, or build checks fail.
