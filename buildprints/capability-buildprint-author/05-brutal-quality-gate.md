# 05 Brutal Quality Gate

## Objective

Prove the authored Capability Buildprint deserves a 10/10 claim, or downgrade the claim with evidence.

## 10/10 acceptance bar

A capability packet is not 10/10 because it is complete-looking. It is 10/10 only when:

- the machine contract and markdown instructions cannot contradict each other on prerequisites, proof level, or composition
- high-risk/security-sensitive behavior has explicit negative tests and failure modes, not only happy-path proof
- credential, token, secret, or API-key capabilities forbid plaintext/recoverable storage, require one-time disclosure, require keyed or host-approved versioned hash material, and prove valid-prefix/wrong-secret denial when prefixes exist
- generated lookup prefixes or identifiers have host-appropriate entropy and collision handling when they participate in auth lookup
- every publishable claim is backed by docs, source evidence, runtime proof, or an explicit not-proven/blocker note
- at least one real host application proof exists for runtime claims, and additional framework claims are marked unproven until tested
- an adversarial review pass records material findings and either fixes them or marks the packet below 10/10

## Required creator self-review

Before publication, write a short self-review section in the packet receipt or publication notes:

- `Fixed`: issues found and corrected during authoring or dogfood
- `Proven`: commands, host repos, and runtime behaviors that passed
- `Blocked`: attempted checks that could not run, with concrete cause
- `Not proven`: claims intentionally not made
- `Score`: honest score and why it is not higher

## Hard downgrade rules

Downgrade below 10/10 when any of these remain:

- validator only checks file presence for a high-risk claim
- a real-host proof is mentioned but no command output, changed files, or receipt is recorded
- the packet adapts to a different owner/auth model without updating both `requires` and `composition`
- a credential capability stores unkeyed/unversioned hash material without an explicit host-approved reason
- a prefix lookup path lacks a wrong-secret negative test
- production-sensitive gaps such as migrations, rate limiting, rollback, admin auth, or tenant boundaries are hidden instead of listed under blockers/not-proven

## DO NOT

- Do not call a packet perfect because checks passed once.
- Do not let publication copy outrun evidence.
- Do not treat a blocker receipt as failure when it prevents a false success claim.
