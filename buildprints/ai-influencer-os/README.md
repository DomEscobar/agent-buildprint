# OpenClaw AI Influencer OS

> Build a OpenClaw AI creator system with OpenClaw, Wavespeed images, memory, life continuity, content drafts, QA, and social publishing handoff.

```txt
       chat          memory          life           content          publish
        │              │              │               │                │
        ▼              ▼              ▼               ▼                ▼
   ┌─────────┐   ┌─────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
   │OpenClaw │ → │ Persona │ → │ Life loop│ → │ Draft QA │ → │ Browser  │
   │ runtime │   │ + canon │   │ journal  │   │ + media  │   │ handoff  │
   └─────────┘   └─────────┘   └──────────┘   └──────────┘   └──────────┘
                                      │
                                      ▼
                              Wavespeed images
```

## What you get

Default persona name is generated fresh unless the user provides one.


- 🧠 persona + canon + boundaries
- 💬 Telegram/OpenClaw chat runtime
- 🗃️ per-user relationship memory
- 📆 simulated life state, calendar, journal
- 🖼️ Wavespeed image generation path
- 📝 social draft planner
- 🧯 manager QA / audit loop
- 🌐 visible browser/noVNC publishing handoff
- ✅ acceptance checks for agents

## Use it

Give this folder to a coding agent:

```txt
Read BUILDPRINT.md.
Ask questions.md unless I say “use default persona preset”.
Then build the OpenClaw AI Influencer OS.
```

Fast path:

```txt
Use default persona preset.
Build this in a new repo.
Keep real posting disabled until I approve it.
```

## Required production keys

```txt
TELEGRAM_BOT_TOKEN=
OPENROUTER_API_KEY=
WAVESPEED_API_KEY=
```

No key? The implementation must use mock mode and clearly mark the missing key as a blocker.

## Files

```txt
BUILDPRINT.md          agent alignment contract
questions.md           user alignment interview
prompts/implement.md   copyable coding-agent prompt
checks/acceptance.md   what must pass
policies/media.md      Wavespeed + public/private gates
policies/safety.md     safety boundaries
diagrams/architecture.md
schemas/buildprint.meta.json
```

## Build rule

This is **not** a generic chatbot blueprint.

It should build around:

```txt
OpenClaw + persona plugin + skills + life loops + Wavespeed + browser publishing
```
