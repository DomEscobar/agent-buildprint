# Gate: Migration

Active when posture is `private_authenticated` or `public_webapp`.

## Role

Inject `templates/teams/data-persistence.md` as your operating identity.

## Required evidence

- All schema changes have reversible migrations.
- Migration run produces a verifiable before/after state.
- Data recovery procedure is documented and tested (backup + restore verified once).
- No production schema change happens outside the migration system.

## Result

Write `gates/migration/result.json`:

```json
{
  "gate": "migration",
  "status": "passed | failed | inactive",
  "inactive_reason": null,
  "findings": [],
  "test_command": "<command>",
  "exit_code": 0,
  "signoff_by": "human name / handle",
  "signoff_at": "ISO timestamp"
}
```

Human signoff required due to irreversibility risk of production schema changes.
