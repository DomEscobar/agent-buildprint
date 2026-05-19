# UI Flows

UI communicates permission state but never replaces server authorization.

## Required screens

- team switcher;
- team settings page;
- members page;
- invite modal;
- pending invites list;
- role dropdown / role change confirmation;
- audit log page if `audit.read` is included;
- billing/API key surfaces if those permissions are included.

## UX rules

- hide unavailable primary actions when it reduces clutter;
- disabled controls must explain missing permission;
- role dropdown only shows grantable transitions;
- team switcher must clear or refetch team-scoped state;
- no stale previous-team data flash after switching;
- removed users must be redirected/blocked after membership invalidation;
- error messages must not reveal another team's private resource existence.
