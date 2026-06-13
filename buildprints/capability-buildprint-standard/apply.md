# Apply A Capability Buildprint

Use this file when authoring or applying a Capability Buildprint. `apply.md` is not permission to start editing. It is the protocol that forces host assessment, integration planning, phased implementation, and receipt writing.

## How to author

1. Pick one bounded capability.
2. Name the host project types it supports.
3. Define host-detection signals before implementation steps.
4. Declare required secrets, services, migrations, providers, and user decisions.
5. List the integration surfaces the agent may touch.
6. Write an apply sequence that adapts to the host project instead of assuming a blank repo.
7. Write concrete verification checks.
8. Add composition notes for capabilities that commonly interact with it.

## Capability scope test

The capability is probably too broad if it needs a full product phase plan, a new brand/UI system, or more than one central user-visible promise.

The capability is probably valid if it can be described as:

```text
Add <capability> to a host project that already has <host assumptions>.
```

Examples:

- Add Stripe subscriptions to a Next.js app that already has user accounts.
- Add RBAC to an app that already has authentication.
- Add Supabase auth to a web app that needs login/session persistence.
- Add an admin dashboard to an app that already has persisted entities.

## Required host inspection

Before applying a capability, inspect:

- framework and router
- package manager
- auth/session model
- database and migration path
- env/config pattern
- existing API route style
- frontend component conventions
- test runner and verification commands
- deployment constraints when external services are involved

## Apply sequence model

Each Capability Buildprint should define:

```yaml
apply:
  inspect:
    - host signal to read first
  decisions:
    - implementation-changing question or safe default
  steps:
    - bounded implementation action
  forbidden:
    - action the agent must not take
```

## Required local outputs

Before implementation:

```text
.buildprint/host-assessment.md
.buildprint/capability-plan.md
```

After implementation:

```text
.buildprint/capability-receipt.md
```

The agent must not make source edits before the host assessment and capability plan exist. The plan must map the generic capability to this host repo's framework, auth, data, env, route, UI/operator, and verification reality.

## Phase order

Apply the capability through these phases:

1. Read `00-host-assessment.md` and create `.buildprint/host-assessment.md`.
2. Read `01-integration-plan.md` and create `.buildprint/capability-plan.md`.
3. Run `02-implementation-phases/01-contract-and-config.md`.
4. Run `02-implementation-phases/02-core-integration.md`.
5. Run `02-implementation-phases/03-host-wiring.md`.
6. Run `02-implementation-phases/04-user-operator-surface.md` when the capability has user/operator visible states.
7. Run `02-implementation-phases/05-verification-and-receipt.md`.
8. Read `verify.md` before claiming success.

## Boundaries

The applying agent must not:

- paste secret values into files
- replace the host app architecture without cause
- remove existing auth, database, or billing behavior silently
- count fixture-only behavior as live proof
- claim external integration success without configured credentials and runtime evidence
