# Product Quality Bar

## North Star

The primary result must feel like a usable AI shorts production studio. A user should be able to move from product input to script selection, actor/voice configuration, generation progress, video review, gallery consent, and publish handoff from rendered UI.

## Required First Impression

- The first screen is a workflow surface, not documentation.
- Product URL/manual description input is visible.
- Progress through the studio is clear: source -> scripts -> configure -> generate -> review -> gallery/handoff.
- The UI contains realistic fixture data after the happy path, not empty cards.
- Limitations/non-claims are visible but secondary.

## Required Studio Surfaces

- Source input panel with URL/manual modes.
- Analysis summary with product/audience/value props.
- Script cards with hook, five segments, b-roll notes, and selection/edit affordance.
- Voice picker, actor picker/upload/generate controls, video mode control, narration edit area.
- Generation panel with status, ordered logs, retry/cancel affordances, and provider mode label.
- Review player with playable result, 1080x1920 metadata, output manifest summary, and download/open affordance.
- Gallery consent and private-by-default state.
- Publish handoff form with platforms, title, description, schedule, timezone, and explicit consent.
- Secondary debug drawer for raw logs, provider refs, validation details, and manifests.

## Visual Rejection Rules

Reject the implementation if the primary proof is:

- API-only;
- a generic admin dashboard;
- gallery-only HTML;
- raw JSON/manifest textarea;
- task log as the main page;
- route list or compliance report;
- empty-state screenshot;
- blank/solid-color-only video as the only media proof;
- controls that look enabled but do nothing.

## Screenshots

Completed-state desktop and mobile screenshots must show:

- at least one analyzed product;
- at least two script cards;
- selected actor/voice/video mode;
- generation completed or inspectable failed state;
- playable result/player area;
- gallery/publish consent controls;
- visible but secondary limitations/non-claims.
