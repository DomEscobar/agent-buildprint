# AGENTS.md

<!-- AGB_HARNESS_START -->
## Buildprint Skill Harness

This project uses a local Buildprint skill harness. Keep it project-local unless the user explicitly asks for global agent configuration changes.

- Initialize or repair with `agb harness init .`.
- Verify with `agb harness check .` before phase implementation.
- Active skill targets: agents, codex.
- Portable skills live in `.agents/skills/`; agent-specific copies may live in `.codex/skills/` or `.claude/skills/` when those agents are detected or requested.
- Required skills: `frontend-ui-product-design`, `subagent-driven-implementation`.
- Do not copy third-party skill packs blindly. Use the Buildprint-native local skills unless the user explicitly installs an upstream skill/plugin.

Harness rules:

- Use `frontend-ui-product-design` before building or changing UI.
- Use `subagent-driven-implementation` for multi-task phase execution or implementation plans.
- Record missing global/plugin skills as blockers; do not pretend they are installed.
<!-- AGB_HARNESS_END -->
