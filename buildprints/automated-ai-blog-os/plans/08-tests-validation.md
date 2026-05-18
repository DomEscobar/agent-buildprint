# Phase 08 — Tests And Validation

## Goal

Wire the command gates and complete evidence for the full content pipeline.

## Required actions

1. Implement the risks in `TEST_MATRIX.md`: pipeline module presence, source grounding, source-map integrity, content memory, approval gates, auto-publish defaults, SEO/build/feed checks, manager audit, and validation evidence.
2. Use fixtures/mocks for all external source, LLM, network, deployment, and publishing behavior.
3. Run `npm test` and `npm run build`; if the target is not npm-based, run equivalent commands and record the substitution.
4. Add static checks for required contracts: `SourceRecord`, `IdeaRecord`, `DraftRecord`, `ApprovalRecord`, `SeoReport`, and `PublishReport`.
5. Complete `VALIDATION.md` with configuration, files/modules built, commands and results, fixture evidence, deviations, blockers, and remaining risks.

## Done when

- Test evidence maps each `TEST_MATRIX.md` risk to a passing test/check or an explicit blocker.
- Build/feed/SEO checks are represented by actual command output or recorded blockers.
- `VALIDATION.md` is complete enough for a reviewer to reproduce what was run and why publishing is or is not allowed.
