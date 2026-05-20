# Mapper OS Spec

## Must

- Accept local source folders and Git URLs as source inputs for an agent-run mapping session.
- Treat source checkouts as read-only.
- Record source input, checkout path, commit SHA when available, generation timestamp, output mode, discovery status, qualification status, production posture, mock policy, no-fake scan status, completeness score, and included/excluded capability counts.
- Keep census facts as `CENSUS_HINT` or `PENDING_AGENT_DISCOVERY` until source evidence promotes them.
- Require every `OBSERVED` claim to cite source path and line or section evidence.
- Treat absence as a claim requiring positive search evidence.
- Select the smallest fully implementable production-complete capability set unless the user explicitly chooses full-suite.
- Classify every extracted capability as `INCLUDED`, `OUT_OF_SCOPE`, `BLOCKED`, or `TEST_ONLY_MOCK`.
- Emit selected implementation output only under `selected-buildprint/`.
- Use capability packs for medium, large, and full-suite selected outputs.
- Include downstream-agent execution planning in every source-independent selected package.
- Keep qualification label exactly one of `DISCOVERY_ONLY`, `SELECTED_UNQUALIFIED`, or `QUALIFIED_SOURCE_INDEPENDENT`.

## Must Not

- Must not modify source project files.
- Must not copy secrets or production data.
- Must not treat static scanning as product authority.
- Must not create root implementation scaffold in discovery mode.
- Must not use broad architecture prose as a substitute for capability contracts.
- Must not include placeholder-backed or mock-backed capabilities in production scope.
- Must not claim source-independent readiness while implementation order, verification gates, or stop conditions are missing.
- Must not require downstream implementers to reopen the original source after qualification.

## Capability Contract

Each selected capability must answer:

- what the user or system can do;
- accepted inputs and observable outputs;
- important state and transitions;
- failure, loading, empty, and blocked states;
- provider, persistence, runtime, operational, or security boundaries;
- stable behavior vs free implementation choices;
- first implementation slice;
- first verification gate;
- stop or escalation condition.

## Qualification Contract

Qualification requires:

- source-independent contracts for all included capabilities;
- per-capability traceability from requirement to source evidence to Buildprint contract to implementation check to QA/reversal check;
- runtime/test/reversal proof where behavior requires runtime evidence;
- zero unresolved critical no-fake findings;
- required hardening artifacts for auth, uploads, external providers, billing, admin actions, or user-data operations;
- no unresolved high/critical security risks;
- no secret values in generated outputs, logs, screenshots, or evidence artifacts.
