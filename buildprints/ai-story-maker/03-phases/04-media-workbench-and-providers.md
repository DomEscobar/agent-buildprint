# 04 Media Workbench And Providers

## How to implement this phase

Read `02-ui-identity.md`, generated `docs/ui-identity.md`, `blueprint.yaml`, `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, current project `AGENTS.md` if present, and previous phase handoffs. Preserve the canvas-first product shape while building media generation and workbench details. Provider work is a sensitive surface: missing credentials are blockers, not permission to fake output.

## Building objective

Implement the asset, storyboard, image-edit, and video workbench production loops. A creator must be able to inspect generated or pending assets, derive new asset variants, select storyboard frames, generate or edit frame images, configure model/aspect/resolution options, and open a video workbench where references, prompt text, generation history, and generated media states are visible.

Media state must be durable and inspectable. For each image or video item, represent enough data to recover the production decision: prompt, references, source asset/frame ids, model/provider id, requested settings, generation state, error reason, output URL/path, timestamps when useful, and flow id/job id when applicable. Failed generation should show a reason and retry path. Completed output should preview media and offer download or open controls. Pending/generating output should not look complete.

Build provider adapters that can support text, image, and video generation without hard-coding one vendor into the product contract. The UI should allow provider configuration and test actions. Live generation proof requires real credentials and sandbox access. If credentials are absent, implement the settings, request validation, job state, and blocked UI but mark live output proof blocked.

Preserve the Canva-like editing affordance in media surfaces: thumbnail strips, compact model controls, prompt panes, batch buttons, selected frame states, hover image tools, clear history, and no decorative hero panels. The workbench should feel like a production editor where images and videos are inspected, not a generic AI prompt form.

## DO NOT

- Do not use placeholder thumbnails as generated results.
- Do not ship placeholders, functionless buttons, or mocked/sample data counted as proof.
- Do not hide failed provider calls behind success messages.
- Do not collapse all media into raw links or JSON.
- Do not let batch actions run without selection or confirmation where destructive.
- Do not store provider secrets in generated docs, screenshots, logs, or handoff.
- Do not claim live image/video generation if only mocked/deterministic tests ran.

## Minimum proof before moving on

- Asset and storyboard media states render not-generated, generating, completed, and failed states.
- A provider settings/test path exists, or exact missing-credential blocker is recorded.
- At least one media item can be created or updated through a real persistence path and read back.
- If live credentials are available, one image or video generation is run and its output is previewed and persisted.
- If live credentials are unavailable, blocked-state UI is shown and no fake generated media is claimed.
- Workbench screenshot inspection confirms references, prompt controls, model/resolution controls, generated history, and batch actions remain usable.

## Handoff note

Record provider adapters, env names, storage paths, media schema, tested generation or blocked-state proof, screenshot paths, and exact live-provider claims that remain unproven.
