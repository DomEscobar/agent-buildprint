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
- skill folders with `SKILL.md` and executable placeholders

## Steps

1. Create scripts required by `BUILDPRINT.md`.
2. Add all env names from the environment contract.
3. Create Docker/runtime structure.
4. Create OpenClaw config that loads extension and skills.
5. Make the entrypoint call `OPENCLAW_RUNTIME_CMD` or emit a structured `openclaw_runtime_missing` blocker; do not silently run a generic Node app as if it were OpenClaw.
6. Add Chromium/noVNC service shape or Dockerfile and persistent `storage/browser/profile` mount for browser publishing handoff.

## Do not

- build Express/Next as the main runtime;
- omit OpenClaw config/skills;
- pretend generic Node startup is the OpenClaw runtime;
- put real secrets in files.

## Exit criteria

- file tree exists;
- `npm run test:static` can be added later without changing structure;
- missing keys are placeholders only;
- entrypoint/config exposes the OpenClaw runtime command or structured blocker;
- noVNC/Chromium service shape exists for browser handoff.
