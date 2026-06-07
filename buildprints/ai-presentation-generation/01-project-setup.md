# 01 Project Setup

This is the foundation pour. Do not start `03-phases/*` until this setup creates a durable implementation base. The goal is to prevent a polished but generic deck demo that ignores Presenton's actual source mechanics.

## Required setup artifacts

Create or update these in the implementation project, not inside `.buildprint/snapshots/**`:

- `AGENTS.md` with required read rules, ownership boundaries, quality bar, source-fidelity requirements, and stop conditions.
- `docs/architecture.md` describing the browser workbench, local API/service boundary, provider config, document ingestion, outline generation, deck model, template/layout system, export runtime, API/webhook/MCP/desktop seams, and persistence.
- `docs/product-loop.md` describing the configure provider -> upload/prompt/template -> decompose documents -> generate outline -> choose layout/template -> stream deck -> edit/chat -> export/API/webhook loop and visible states.
- `docs/output-quality.md` defining the central deck artifact quality bar: editable slide model, content-grounded outline, layout selection, speaker notes, assets, theme, export readiness, chat provenance, and automation state.
- `docs/plain-language-ux.md` mapping technical terms to user-facing copy, including provider readiness, parser blocked, export runtime missing, webhook not configured, MCP seam, and desktop-only behavior.
- `docs/proof-strategy.md` listing build/typecheck/lint commands, upload/generation/export smoke paths, browser screenshot paths, provider-blocked checks, API checks, and what cannot be proven without live keys/runtime. It must name the generated app commands or scripts for desktop screenshot capture, mobile screenshot capture, content-specificity assertions, and long-text stress proof.
- `.env.example` with provider variables, image provider variables, app data path, temp path, export runtime path, webhook secret/config, auth toggles, and local model endpoint placeholders; never include real secrets.
- `.buildprint/setup-receipt.md` summarizing chosen stack, created files, source assumptions, verification commands, blockers, and unresolved hard-stop questions. It must separate proven runtime behavior from intentionally blocked provider, parser, export, API, webhook, MCP, desktop, auth/privacy, and deployment claims.

## Foundation decisions

Pick a stack that can deliver a real editor-like workbench quickly. The implementation may be simpler than Presenton's Next.js plus FastAPI split, but it must preserve the source-shaped boundaries: provider readiness, document ingestion, structured outline generation, layout/template selection, persisted deck model, slide editing, chat iteration, export runtime, and automation seams. Define the deck data model before building UI. Define provider and export blocked states before adding generate/export buttons. Define upload/file retention before accepting files. Define verification commands before handoff so the generated app can prove the Deck view at desktop and mobile widths, content specificity, and long-text stress without relying on prose claims.

## DO NOT

Do not ship a static slide gallery, fake thumbnails, hard-coded decks counted as generation, raw JSON as the main product surface, dead export buttons, real secrets, provider success without a probe, or template names that are not tied to layout behavior. Do not hide missing export/runtime/API/MCP/desktop work behind optimistic copy.
