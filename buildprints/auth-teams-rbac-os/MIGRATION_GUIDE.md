# Migration, Backfill, Rollout, Recovery

## Existing app census

Before migrations, produce:

- current user/auth table map;
- current user-owned entities;
- entities requiring `teamId`;
- legacy admin checks;
- routes affected by tenant filtering.

## Backfill plan

Recommended default:

1. Create one team per existing account owner or solo user.
2. Seed that user as owner.
3. Attach existing user-owned records to the new team.
4. Flag orphan records for manual review.
5. Add indexes and constraints after backfill validation.
6. Enable team route guards behind rollout flag if risk is high.

## Rollback

Rollback plan must preserve:

- original user ownership columns until rollout is accepted;
- reversible migration scripts or backup snapshots;
- admin recovery path to restore owner access;
- audit trail of automated backfill actions.

## Recovery

Provide an operator-only recovery action to add an owner to a team when all owners are lost due to data corruption. It must be logged and unavailable through normal user UI.
