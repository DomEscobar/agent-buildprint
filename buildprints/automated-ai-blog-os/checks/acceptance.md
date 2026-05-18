# Acceptance checks

- Source scanner produces SourceRecord fixtures.
- Idea scorer produces rubric-based IdeaRecord files.
- Draft generator writes frontmatter, source map, claim map, visual plan, and checklist state.
- Claim validator blocks ungrounded factual claims.
- SEO validator checks metadata, structured data, sitemap/RSS/llms, and build command.
- Publisher refuses unapproved drafts by default.
- Manager audit reports stale/weak/blocked items.
- Tests pass without network/publishing credentials.


---

## Consolidated notes from `qa.md`

Review an Automated AI Blog OS implementation against BUILDPRINT.md, SPEC.md, CONTRACTS.md, TEST_MATRIX.md, and VALIDATION_TEMPLATE.md. Focus on source grounding, anti-slop protections, SEO/feed/build validation, approval-gated publishing, and test isolation.
