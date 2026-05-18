# Phase 01 — OpenClaw Skeleton

## Goal

Create the runnable OpenClaw-shaped project skeleton.

## Files

- `package.json`
- `.env.example`
- `AGENTS.md`, `SOUL.md`, `USER.md`
- `config/openclaw.json`
- `docker/Dockerfile`
- `docker/docker-compose.yml`
- `docker/entrypoint.sh`
- `docker/novnc.Dockerfile`
- skill folders with `SKILL.md` and executable command wrappers

## Steps

1. Create `package.json` for the generated app with `name: "openclaw-ai-influencer-os"`; do not use the Buildprint CLI name `agb`.
2. Create scripts required by `BUILDPRINT.md`; each command wrapper must dispatch to a real module or emit a structured blocked status such as `openclaw_runtime_missing`.
3. Add all env names from the environment contract exactly; do not enable test/mock flags in `.env.example` by default.
4. Create Docker/runtime structure.
5. Create OpenClaw config that loads extension and skills.
6. Make the entrypoint call `OPENCLAW_RUNTIME_CMD` or emit a structured `openclaw_runtime_missing` blocker; do not silently run a generic Node app as if it were OpenClaw.
7. Add Chromium/noVNC service shape or Dockerfile for browser publishing handoff with persistent `storage/browser/profile`, default bind host `127.0.0.1`, and mandatory secret-backed VNC/noVNC auth. Passwordless/no-auth handoff is forbidden.

## Do not

- build Express/Next as the main runtime;
- omit OpenClaw config/skills;
- pretend generic Node startup is the OpenClaw runtime;
- name the generated app package `agb`, `xy`, or `agent-buildprint`;
- put real secrets in files;
- set `TEST_MODE=true` or mock mode as a default in `.env.example`.

## Exit criteria

- file tree exists;
- `package.json.name` is `openclaw-ai-influencer-os`;
- `npm run test:static` can be added later without changing structure;
- missing keys are placeholders only;
- env names match `BUILDPRINT.md` exactly;
- `.env.example` does not default to test/mock mode;
- entrypoint/config exposes the OpenClaw runtime command or structured blocker;
- command wrappers are not empty placeholders: they either call implemented modules or fail with a documented blocked status;
- noVNC/Chromium service shape exists for browser handoff, binds local-only by default, and refuses to start without non-empty secret-backed auth.
