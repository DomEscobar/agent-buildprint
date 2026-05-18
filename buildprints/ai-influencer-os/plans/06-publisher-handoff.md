# Phase 06 — Publisher Handoff

## Goal

Implement mock/manual-gated publishing and document secured browser/noVNC handoff.

## Files

- `life/social-publisher.mjs`
- `skills/influencer-post/SKILL.md`
- `skills/influencer-post/influencer-post`
- `storage/social/posted-history.json`
- `storage/browser/profile/.gitkeep`
- `dashboard/public/index.html`

## Steps

1. Implement mock publisher.
2. Refuse unapproved drafts.
3. Document browser/noVNC commands with local-only access and required auth.
4. Add runnable browser handoff service shape: bind to `SOCIAL_VISIBLE_BROWSER_HOST=127.0.0.1` by default, expose `SOCIAL_VISIBLE_BROWSER_PORT` only on the local/operator interface, mount `storage/browser/profile`, and keep operator login persistent.
5. Require `SOCIAL_VISIBLE_BROWSER_PASSWORD` or equivalent secret-backed auth before the noVNC/VNC service starts; reject empty/default/hard-coded passwords.
6. Keep real publishing disabled unless env flags, approval, and browser auth/session checks allow it.

## Do not

- auto-publish by default;
- bypass platform login/2FA/CAPTCHA;
- run unauthenticated VNC/noVNC or expose it publicly by default;
- call real platforms in tests.

## Exit criteria

- unapproved draft is refused;
- approved mock draft records posted history;
- handoff docs exist and warn that passwordless/public VNC is forbidden;
- compose/Docker contains Chromium/noVNC service shape, local-only default binding, mandatory non-empty secret-backed auth, and persistent browser profile mount.
