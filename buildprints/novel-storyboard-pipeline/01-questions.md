# Implementation Alignment Questions

Let the user answer these before coding. If no user answer is available and the question is not sensitive, use the AI-best-judgment default and record it in `.buildprint/progress.md`.

1. What deployment posture should the implementation target?
   AI-best-judgment default: public webapp, but require secure first-run admin setup and never ship Toonflow's source-observed default credentials as production credentials.

2. Which scope is selected?
   AI-best-judgment default: selected core webapp flow only: project setup, ScriptAgent planning, ProductionAgent Canvas workbench, generation queues, video tracks, and export-ready boundary. Marketplace/community/docs, desktop Electron packaging, and full frontend parity are outside this selected packet unless explicitly re-added.

3. Which persistence default should be used?
   AI-best-judgment default: durable relational database with migrations for app state, plus durable object/file storage for generated media. SQLite is acceptable for trusted local deployment; Postgres-compatible schema is preferred for public or team deployments.

4. Are sandbox credentials or provider test accounts available for text, image, video, and TTS proof?
   AI-best-judgment default: no live credentials available. Implement provider interfaces, sandbox/live split, validation, retries, and failure states; mark live provider proof as blocked until credentials exist.

5. Should programmable vendor code be supported in the first implementation?
   AI-best-judgment default: support provider adapters through typed plugin modules and config, but block arbitrary user-supplied executable code in public webapp posture until sandboxing, audit logging, and secret isolation are proven.

6. What is the visual quality target for the Canvas UI?
   AI-best-judgment default: product-grade creative workstation. Preserve the good Canvas feel with spatial node layout, media thumbnails, generation state badges, inspector panels, timeline/track affordances, drag/drop, zoom/pan, keyboard-safe focus, and polished empty/loading/error states.

7. Should agent collaboration use real delegated workers?
   AI-best-judgment default: use real subagents/workers if supported by the implementation environment; otherwise self-simulate decision, execution, supervision, and verification roles and write the same handoff/return artifacts.
