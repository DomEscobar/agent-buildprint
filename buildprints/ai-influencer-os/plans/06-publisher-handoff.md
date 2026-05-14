# Phase 06 — Publisher Handoff

## Goal

Implement mock/manual-gated publishing and document browser/noVNC handoff.

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
3. Document browser/noVNC commands.
4. Add runnable browser handoff service shape: expose `SOCIAL_VISIBLE_BROWSER_PORT`, mount `storage/browser/profile`, and keep operator login persistent.
5. Keep real publishing disabled unless env flags and approval allow it.

## Do not

- auto-publish by default;
- bypass platform login/2FA/CAPTCHA;
- call real platforms in tests.

## Exit criteria

- unapproved draft is refused;
- approved mock draft records posted history;
- handoff docs exist;
- compose/Docker contains Chromium/noVNC service shape and persistent browser profile mount.
