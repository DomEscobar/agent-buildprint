# AGENTS.md

<!-- AGB_HARNESS_START -->
## Buildprint Skill Harness

This project uses a local Buildprint skill harness. Keep it project-local unless the user explicitly asks for global agent configuration changes.

- Initialize or repair with `agb harness init .`.
- Verify with `agb harness check .` before phase implementation; use `agb harness checkup .` for the stricter setup doctor.
- Active skill targets: agents, codex.
- Active profile: `default`.
- Default output is only `.agents/skills/` plus this AGENTS.md section. Provider folders are explicit and evidence-backed; do not create `.codex`, `.claude`, `.cline`, or `.cursor` folders unless requested by provider.
- Required core skills: `setup-runbook`, `frontend-ui-product-design`, `subagent-driven-implementation`, `verify-and-review`.
- Optional profiles: `webapp`, `backend`, `agentic`, `full`. Do not use `full` unless broad coverage is worth the extra context.
- Do not copy third-party skill packs blindly. Use the Buildprint-native local skills unless the user explicitly installs an upstream skill/plugin.

Harness rules:

- Use `setup-runbook` during `01-project-setup.md`; it must leave `docs/architecture.md`, `.env.example`, and `.buildprint/setup-receipt.md` or honest blockers.
- Use `frontend-ui-product-design` before building or changing UI.
- Use `subagent-driven-implementation` only for multi-task phases with clean file ownership.
- Use `verify-and-review` before claiming a phase, checkpoint, or handover is done.
- Respect each skill frontmatter `triggers`, `skips`, and `completion_signal`; completion signals are required in handoff notes when a skill governs the work.
- Record missing global/plugin skills as blockers; do not pretend they are installed.
<!-- AGB_HARNESS_END -->
