# Configuration Interview

Ask these only if the user did **not** say:

```txt
Use default storyboard preset.
```

## Default Storyboard Preset

If the user says `Use default storyboard preset`, proceed with:

- Stack: Vite + React + TypeScript.
- Persistence: durable local JSON repository unless a later phase upgrades to SQLite.
- Providers: deterministic mock/no-network text, image, and video providers.
- Visuals: deterministic local fixture assets and thumbnails.
- Storyboard mode: image-assisted multi-reference mode.
- Export: PortablePreviewManifest/preview package only.
- UI target: creative workbench first; debug evidence secondary.

## Rules for the Coding Agent

- Ask exactly these questions.
- Do not ask broad product strategy questions.
- Do not propose architecture or parity upgrades.
- These answers configure the fixed portable storyboard proof; they do not replace the binding slice.
- If the user skips a question, use the default storyboard preset.

## Questions

1. **Stack and runtime** - keep Vite + React + TypeScript, or use an existing local stack if the target repo already has one?

2. **Persistence** - keep durable local JSON repository for the proof, or upgrade to SQLite immediately?

3. **Visual fixtures** - use bundled deterministic local SVG/PNG fixtures, or code-generated deterministic visual placeholders?

4. **Storyboard mode** - keep image-assisted multi-reference mode, or use pure text / first-frame mode as the default browser path?

5. **Provider boundary** - keep mock/no-network only, or add env-gated live adapter skeletons while keeping CI mock-only?

6. **Product-quality priority** - prioritize the completed creative workbench preview first, or prioritize deeper negative-path UI coverage first?

## Required Confirmation Summary

After answers, output:

```txt
Alignment summary
- Stack/runtime:
- Persistence:
- Visual fixtures:
- Storyboard mode:
- Provider boundary:
- Product-quality priority:
- Kept from default storyboard preset:
- Changed from default storyboard preset:

Reply "confirm" to build, or tell me what to change.
```

Do not implement before confirmation unless the user explicitly used the default storyboard preset.

