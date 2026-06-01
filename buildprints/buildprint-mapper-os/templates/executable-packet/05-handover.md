# Handover

Write a short honest handover at the end of the run.

Use these headings:

## Current status

Does the local product run? Is the core loop usable? What remains prototype-level?

## Built surfaces

List each major surface/capability as built, partial, blocked, or not started.

## Verification

Commands run, manual/browser paths checked, screenshots or artifact paths.

## Known defects and blockers

Concrete user-visible issues, real blockers, and next repair route.

## Not production-grade

Mandatory when `deployment_posture: trusted_local`. For each operability item from `04-review.md` `## Operability walkthrough`, report one of:

- built
- partial
- blocked
- unexercised

Use numbered items so the next engineer can map directly to review steps:

- 1. Durable persistence — <built|partial|blocked|unexercised>
- 2. Background task ownership — <built|partial|blocked|unexercised>
- 3. Provider blocked-state honesty — <built|partial|blocked|unexercised>
- 4. Dead-control scan — <built|partial|blocked|unexercised>
- 5. Auth/session boundary — <built|partial|blocked|unexercised>
- 6. Tenant isolation — <built|partial|blocked|unexercised>
- 7. Visual quality gate — <built|partial|blocked|unexercised>
- 8. CI or clean-checkout smoke — <built|partial|blocked|unexercised>

For `private_authenticated` and `public_webapp`, list only honest external blockers (for example unavailable credentials or environment limits). Missing posture-critical controls are release blockers and cannot be hidden here.

## Next atomic actions

Numbered next steps a human or agent can take without rereading the packet.
