# Capability Compatibility

Capability Buildprints compose only when their assumptions are explicit.

## Host compatibility

Declare the host project signals that make the capability applicable:

```yaml
host_frameworks:
  - nextjs
host_detection:
  package_files:
    - package.json
  routes:
    - app/
    - pages/api/
  auth_signals:
    - next-auth
    - supabase
  database_signals:
    - prisma
    - drizzle
    - supabase
```

If a host signal is optional, mark it optional. If it is required, the applying agent must block or ask before proceeding.

## Composition model

Use these fields:

```yaml
composition:
  provides:
    - billing.subscription_state
  expects:
    - auth.user_identity
  composes_with:
    - rbac-permissions
  conflicts_with:
    - existing custom billing provider
```

`provides`
: Capabilities or state this packet makes available to later packets.

`expects`
: Capabilities or state the host must already have.

`composes_with`
: Known compatible capability families.

`conflicts_with`
: Patterns that require human review before applying.

## Version and framework support

Prefer ranges and signals over vague claims:

```yaml
support:
  frameworks:
    nextjs:
      versions: ">=14"
      routers:
        - app
        - pages
  package_managers:
    - npm
    - pnpm
  proof_level: fixture
```

Unsupported does not mean impossible. It means the packet cannot honestly claim direct support without adaptation and proof.

