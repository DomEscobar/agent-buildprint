# 00 Goal

Install the bounded `capability-buildprint-standard` capability into a compatible host so the declared verify checks pass or blockers are honest.

## Acceptance criteria

- Host assessment completed and hard stops confirmed or blocked
- Capability seams wired without whole-product rewrite
- `verify.md` structural/runtime checks pass or blockers recorded
- Independent contract review against this goal

## Hard-stop questions


These require confirmed_by user or explicit_user_delegation before host wiring.

1. **Deployment posture** - trusted local, private authenticated, or public web?
2. **Secrets and provider policy** - Which credentials may be used and where may they live?
3. **Destructive/data-loss behavior** - Can this capability delete, overwrite, charge, or mutate external systems?
4. **Privacy/compliance exposure** - Private/regulated data implications?
5. **Product/artifact identity** - Is this still a bounded capability install (not a whole product rebuild)?

## Assumable defaults

- Keep host stack; do not redesign the product
- Block live providers until configured
- Record claim ceilings honestly

## Deferrable questions

- Non-blocking polish after verify
