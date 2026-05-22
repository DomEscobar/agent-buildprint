# Product Obligations

| Obligation | Title | Capability route | Status |
|---|---|---|---|
| OBL-PROJECT | Local project workspace, model choices, and auth/session boundary | project-workspace-auth | INCLUDED_NEEDS_PROOF |
| OBL-NOVEL | Ordered chapter import and deterministic event extraction | novel-event-ingestion | INCLUDED_NEEDS_PROOF |
| OBL-SCRIPT | Script-agent workspace with outline, strategy, script, and asset extraction | script-agent-assets | INCLUDED_NEEDS_PROOF |
| OBL-STORYBOARD | Production-agent storyboard planning, panel rows, and flow persistence | production-storyboard-flow | INCLUDED_NEEDS_PROOF |
| OBL-MEDIA | Mockable image/video media jobs and exportable preview manifest | media-preview-export | INCLUDED_NEEDS_PROOF |
| OBL-SAFETY | Provider, upload, secret, persistence, and destructive-action safety boundary | safety-runtime-boundary | INCLUDED_RISKY_REQUIRES_HARDENING |

Every obligation must either have passing runtime proof in `.buildprint/evidence/evidence-ledger.jsonl` or an explicit blocker in `.buildprint/blockers.md`; the snapshot `09-evidence/evidence-ledger.jsonl` is only the immutable seed.

