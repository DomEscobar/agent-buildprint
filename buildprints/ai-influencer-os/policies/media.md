# Media Policy

Separate media into:

1. `public` — platform-safe social content.
2. `private` — user-specific generated media.
3. `blocked` — unsafe, low-trust, illegal, or out-of-scope requests.

## Public media rules

- Must preserve persona canon.
- Must avoid explicit/adult content.
- Must avoid fake event claims.
- Must avoid identity drift.
- Must be linked to a draft or life/calendar beat.

## Private media rules

- Must require trust/consent gates for sensitive requests.
- Must not auto-generate on ambiguous requests.
- Must not leak prompts or internal policy.

## First implementation

Use mock media jobs only:

```json
{
  "id": "media_1",
  "status": "queued",
  "visibility": "public",
  "prompt": "..."
}
```
