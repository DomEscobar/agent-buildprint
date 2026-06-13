# 03 Host Wiring

## Objective

Connect the core capability to the host project's real routes, actions, middleware, components, jobs, or services.

## Implement

- route/action/middleware wiring
- persistence read/write integration
- auth/session/user identity connection
- existing UI or operator workflow entrypoints
- logs/audit events when required by risk profile

## Proof before moving on

- the host app actually calls the capability
- protected paths enforce the capability decision
- persisted state can be read back when durability is claimed
- conflicts with existing systems are resolved or explicitly blocked

## DO NOT

- Do not stop at an unused service/helper.
- Do not bypass the host's existing architecture without documenting why.
- Do not silently replace an existing auth, billing, permission, or persistence path.

