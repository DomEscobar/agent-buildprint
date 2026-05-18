# Phase 06 — Approval And Publishing

## Goal

Implement the approval queue and publisher state machine with fail-closed defaults.

## Required actions

1. Store `ApprovalRecord` files with `pending`, `approved`, `rejected`, or `changes_requested` status.
2. Keep default draft status as `draft` or `needs_review`; unapproved drafts must be refused.
3. Publishing requires approved status, passing claim validation, passing SEO/build/feed checks, and an allowed publisher mode.
4. In `manual` mode, write a prepared `PublishReport` without deploying.
5. In `schedule` or `auto` mode, require explicit config and the same gates; otherwise write `status: "refused"` with a reason.

## Done when

- Tests cover unapproved refusal, rejected approval, passing manual preparation, and schedule/auto refusal when config or checks are missing.
- Publish reports include `draftId`, `mode`, `status`, `reason`, `publishedUrl`, and timestamp.
- No default config path can publish or schedule raw drafts.
