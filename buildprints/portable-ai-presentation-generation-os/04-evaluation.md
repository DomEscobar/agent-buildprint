# 04 — Evaluation and claim promotion

This Buildprint starts as `PROOF_REQUIRED`. Promote claims only with source-independent implementation evidence, not because the source project had the behavior.

## Required promotion proofs

- `provider_live` or `provider_integration_proof_or_blocker`: at least one text provider path proves successful deck generation or records an honest blocker; deterministic fake providers remain explicitly labelled.
- `image_provider_live_or_blocker`: generated/search/uploaded image path proves success or records provider blocker.
- `document_ingestion`: uploaded text/PDF/PPTX or equivalent parser path proves decomposition and failure states.
- `browser_runtime_trace`: user can authenticate/configure, create/generate/open/edit/export a presentation in browser or record a scoped blocker.
- `durable_persistence`: presentation, slide, config, template/theme, asset, chat, and async task state survive reload where claimed.
- `persistence_roundtrip`: concrete readback/reload proof for durable_persistence claims.
- `export_roundtrip`: PPTX and PDF export produce downloadable files that open or validate structurally.
- `api_contract`: authenticated API generation route validates request/response, auth failure, provider failure, and async status.
- `webhook_delivery_or_blocker`: subscribed webhook event delivery or explicit blocker.
- `security_boundary_review`: upload path, auth/session, provider-key handling, webhook URL handling, file paths, and generated exports are reviewed.
- `no_fake`: no placeholder-only UI, route-shaped stubs, mock-as-product behavior, or in-memory-only substitutes in claimed production scope.

## Evidence rules

Every proof row must include `phase_id`, `proof_type`, `command`, `artifact`, `provider_mode`, `result`, and whether it `upgrades_claim`.

Do not call the implementation production-ready until all required proofs pass in a source-independent target app.

## Loop completion rule

Loop completion requires passed proof gates and evidence ledger rows; edits alone are not completion.

## Blocker honesty

If a live provider, browser runtime, export renderer, webhook endpoint, desktop package, or persistence backend is unavailable, record a blocker instead of downgrading scope silently.
