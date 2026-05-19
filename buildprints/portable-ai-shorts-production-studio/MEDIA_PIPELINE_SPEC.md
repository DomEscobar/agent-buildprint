# Media Pipeline Spec

## Default Fixture Pipeline

The default accepted media path is deterministic and no-network:

1. Use selected script/narration.
2. Create fixture voice/audio or deterministic silent/audio track with metadata.
3. Create deterministic actor/talking-head visual placeholder.
4. Create deterministic b-roll visual segments from script b-roll prompts.
5. Generate subtitle/caption layer from narration or fixture transcript.
6. Compose vertical MP4 with FFmpeg or equivalent.
7. Probe output and record metadata.

## MP4 Acceptance

The generated result must:

- be playable by browser video element;
- be MP4 or browser-compatible equivalent accepted by the app;
- probe as width `1080` and height `1920`;
- include nonblank visual content;
- include subtitles/caption layer;
- show b-roll timing or deterministic visual changes;
- expose duration and filename/URL metadata.

Blank, single solid-color, or metadata-only files do not satisfy the media proof.

## Subtitle and Text Safety

- Escape provider-generated text before FFmpeg drawtext/subtitle filters.
- Test quotes, colons, newlines, emojis/non-ASCII if supported by stack, and shell-sensitive characters.
- Invalid subtitle text must fail safely or sanitize with recorded behavior.

## B-Roll Timing

- Each script segment must have a b-roll requirement.
- Composition must map b-roll markers to time ranges.
- Tests must verify at least one b-roll timing marker or visual transition exists.

## Remotion

Optional Remotion post-processing may be implemented if:

- render request schema is validated;
- output path/URL conversion is tested;
- failure states do not corrupt the base MP4 result;
- browser proof does not depend on unvalidated live render service.
