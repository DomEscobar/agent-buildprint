# 02 UI Identity

OpenShorts is UI-bearing. Load `.agents/skills/frontend-ui-product-design/SKILL.md` before implementation, then write `docs/ui-identity.md`. Do not proceed to phase code with a generic dashboard identity.

## Product identity thesis

OpenShorts is a short-video production desk for self-hosted creators and operators. The first screen must make it obvious that the user can feed in long video or product context, watch a production job move through stages, inspect vertical short outputs, and publish or export them. It must not feel like an analytics dashboard, generic admin console, proof panel, or marketing landing page.

## Creative product concept

Use a "production timeline and output reel" concept. The dominant object is a vertical 9:16 short-card with script, captions, hook text, render status, and platform readiness attached. The primary gesture is submitting or selecting source input and then moving through a visible production chain: ingest, analyze, render, review, publish.

## Silhouette rejection

Desktop should be a dense operator console: left rail for product areas, central production lane, right-side settings/detail drawer only when needed, and a visible reel/result strip. Mobile should prioritize one active job or generated short at a time with bottom navigation and collapsible details.

Reject generic dashboard, renamed workbench, card-grid homepage, admin shell, proof console, static gallery, and any page that could pass unchanged by changing labels and colors.

## First-run comprehension contract

Within 10 seconds a non-technical creator should understand:

- Required setup: provider keys are missing or ready.
- First action: upload a video, paste a URL/product description, or open YouTube Studio.
- Current state: no active job, queued job, processing stage, completed clips, failed provider, or blocked publishing.
- Next action: review a generated short, retry a failed stage, edit captions/hooks, export, or publish.

## User-language map

Use user-facing words like `Source video`, `Short`, `Hook`, `Caption`, `Actor`, `Voice`, `Render`, `Gallery`, `Publish`, `Schedule`, `Provider key`, and `Blocked`.

Do not show internal terms like `Buildprint`, `phase`, `proof`, `semantic output`, `saasshorts`, `job map`, `provider seam`, `stderr`, or raw JSON in the main product UI.

## Style direction

Use a media-production control-room style: neutral dark base, crisp high-contrast video surfaces, platform/status accents, compact controls, and real thumbnails/previews. Avoid purple-gradient SaaS hero styling, beige editorial palettes, and decorative-only motion.

## Layout model

- Desktop: persistent left navigation; top status strip for provider readiness and current job; central vertical-preview/output lane; stage timeline; contextual edit/publish drawer.
- Mobile: single-column active short preview; sticky stage/status controls; settings and logs behind drawers.
- Scroll ownership: generated result lists scroll independently from the active preview and action drawer.
- Fixed-format regions: every video preview keeps 9:16 aspect ratio with stable controls outside the frame.

## Screen-state contract

Visible now: selected product area, provider readiness, active job stage, primary action, and the active output or empty state.

Reachable but hidden: raw logs, advanced provider settings, social account details, transcript JSON, retry diagnostics, and destructive cleanup controls.

Do not show clip generation, AI actor creation, thumbnail publishing, and gallery management as equal full-width panels on one screen. The user must always know which production path is active.

## Interaction model

Users create by uploading/pasting input, inspect through video preview plus script/caption metadata, edit captions/hooks/titles with readback, recover through retry per failed stage, confirm before social publish/public gallery upload, and navigate by production area. Blocked actions must name the missing key, account, file, provider, or permission.

## Component language

Use icon buttons for media actions, segmented controls for modes, toggles for optional stages, sliders/inputs for caption/render parameters, clear stage chips, progress with real logs behind a disclosure, and disabled buttons only with visible blocker reasons. Repeated shorts are compact cards with preview, title/hook, readiness, cost, and publish state.

## Tokens

- Background: `#0B0D10`
- Surface: `#151922`
- Preview frame: `#050608`
- Text primary: `#F5F7FA`
- Text secondary: `#A7B0BF`
- Action: `#2DD4BF`
- Render/progress: `#60A5FA`
- Publish/social: `#F97316`
- Warning: `#F59E0B`
- Error: `#EF4444`
- Success: `#22C55E`

Typography should be compact and readable: 12-14px metadata, 15-16px controls/body, 20-28px section headings, no viewport-scaled text, no negative letter spacing.

## Stress fixtures

Test long source filenames, long generated titles, 15 generated clips, missing provider keys, failed fal.ai render, failed Upload-Post account lookup, failed S3 gallery upload, expired job output, 2GB file rejection, mobile 360px width, and long logs.

## Proof obligations

Before UI completion, capture desktop and mobile screenshots for settings-blocked, processing, completed output, edit/readback, provider failure, and publish confirmation. Check no clipping/overlap/horizontal overflow, keyboard focus on forms/modals, stable 9:16 previews, and blocked-state copy specificity.

UI_IDENTITY_DONE
