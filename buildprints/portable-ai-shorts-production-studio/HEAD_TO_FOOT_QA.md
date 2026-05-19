# Head-To-Foot QA

## Preflight

- Buildprint package snapshots were read from `.buildprint/snapshots`.
- Alignment choices are recorded.
- Default provider mode is mock/no-network.
- Safe and unsafe claims are visible in docs or UI.
- No provider secrets are committed or printed.

## Static / Unit

- Contract/schema tests pass.
- Provider mocks are deterministic.
- No-network default gate passes.
- Claim wording check passes.
- Secret scan passes.

## Media

- Fixture generation creates an MP4.
- `ffprobe` reports width `1080` and height `1920`.
- Video is playable.
- Output is not blank or solid-color-only.
- Subtitle/caption layer is visible or test-detected.
- B-roll timing markers or deterministic visual changes are present.
- Provider text is escaped before FFmpeg/subtitle filters.

## Browser Happy Path

- Rendered source input is used.
- Analyze button is clicked.
- Script card is selected.
- Voice/actor/video controls are used.
- Narration edit is changed.
- Generate button is clicked.
- Pollable status/log UI updates.
- Review player displays completed MP4.
- Gallery consent control is used.
- Gallery displays only consented metadata.
- Publish handoff form is filled and consented.
- Mock/manual handoff result is visible.

## Browser Negative Paths

Run or document blockers for every scenario in `BROWSER_QA_SCENARIOS.md`.

## Screenshot Acceptance

Desktop and mobile screenshots must show completed studio state, not loading or empty state. They must include:

- product analysis;
- script cards;
- selected configuration;
- player/result area;
- status/log affordance;
- gallery/publish consent controls;
- limitations/non-claims.

## Final Report Required Fields

- commands run;
- test/build result;
- browser evidence;
- screenshot paths;
- MP4 file path and ffprobe output;
- provider mode;
- live-provider evidence if any;
- gaps/blockers;
- safe claims only.
