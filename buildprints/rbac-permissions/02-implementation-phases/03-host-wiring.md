# 03 Host Wiring

## Objective

Connect the RBAC helper to actual host routes, actions, middleware, or server components.

## Required inputs

- central RBAC helper from phase 02
- host route/action pattern
- selected protected surface from `.buildprint/capability-plan.md`
- current user/session lookup

## Instructions

Wire at least one meaningful protected surface:

- admin-only route
- write/update/delete action
- billing/admin/settings action
- API endpoint with privileged behavior

Server-side enforcement is required. Client-side hiding can be added only as a companion state.

## Proof before moving on

- protected surface calls the central helper
- non-privileged users cannot bypass through direct API/action calls
- denied state is distinguishable from generic failure

## DO NOT

- Do not protect only navigation links or buttons.
- Do not bypass the helper for special cases without documenting them.
- Do not create a protected surface that no user path can reach.

