# Mapper OS Spec

## Must

- Accept local source folders and Git URLs as source inputs for an agent-run mapping session.
- Treat source checkouts as read-only.
- Record source input, checkout path, commit SHA when available, generation timestamp, output mode, discovery status, qualification status, production posture, mock policy, no-fake scan status, completeness score, and executable-blueprint readiness counts.
- Keep census facts as `CENSUS_HINT` or `PENDING_AGENT_DISCOVERY` until source evidence promotes them.
- Require every `OBSERVED` claim to cite source path and line or section evidence.
- Treat absence as a claim requiring positive search evidence.
- Preserve the user-requested scope. If no target is selected, remain discovery-only; if a target is selected, classify the full relevant behavior surface and sequence implementation without dropping behavior. Scope reduction requires explicit user confirmation.
- Preserve requested quality/depth, not just labels. Selected outputs must make real implementation depth measurable and must not let endpoint/label/seam presence stand in for product behavior.
- Classify every extracted behavior/slice as `INCLUDED_READY`, `INCLUDED_NEEDS_PROOF`, `INCLUDED_BLOCKED`, `INCLUDED_RISKY_REQUIRES_HARDENING`, `OUT_OF_SCOPE_BY_USER_ONLY`, or `TEST_ONLY_MOCK`.
- Emit implementation signals that help a downstream harness choose its implementation team/passes without turning the Buildprint into an architecture prescription.
- Emit architecture topology and capability-depth gates for medium, large, full-suite, UI-bearing, provider-backed, stateful, or runtime-heavy selected outputs.
- Emit selected implementation output only under `selected-buildprint/`.
- Use executable-blueprint v5 proof-gated phases for medium, large, and full-suite selected outputs.
- Include downstream-agent execution planning in every source-independent selected package.
- Keep qualification label exactly one of `DISCOVERY_ONLY`, `SELECTED_UNQUALIFIED`, or `QUALIFIED_SOURCE_INDEPENDENT`.

## Must Not

- Must not modify source project files.
- Must not copy secrets or production data.
- Must not treat static scanning as product authority.
- Must not create root implementation scaffold in discovery mode.
- Must not use broad architecture prose as a substitute for proof-gated phase packets.
- Must not include placeholder-backed or mock-backed behavior in production scope, and must not hide unproven behavior by shrinking scope without user confirmation.
- Must not call route-shaped endpoints, static UI shells, deterministic adapters, skeleton providers, or flat single-file prototypes “implemented” unless the applicable product behavior is proven; otherwise mark `CONTRACT_SEAM_ONLY` or `BLOCKED_WITH_REASON`.
- Must not emit legacy selected-output v1-v4 shapes, `START_HERE.md`, `PRE_IMPLEMENTATION_QUESTIONS.md`, `03-capabilities/`, `04-interfaces/`, `05-state-runtime/`, `06-safety/`, `08-evaluation/`, `09-evidence/`, packet `AGENTS.md`, root `manifest.json`, or fragmented per-capability mini-files.
- Must not claim source-independent readiness while implementation order, verification gates, or stop conditions are missing.
- Must not require downstream implementers to reopen the original source after qualification.

## Execution Slice Contract

Each selected slice must answer:

- what the user or system can do;
- accepted inputs and observable outputs;
- important state and transitions;
- failure, loading, empty, and blocked states;
- provider, persistence, runtime, operational, or security boundaries;
- stable behavior vs free implementation choices;
- required implementation depth across UI/UX, API, domain logic, persistence/state, provider/runtime, failure states, tests, and proof;
- implementation-team signals/passes required by product shape;
- verification gate;
- stop or escalation condition;
- unlock/dependency relation to later capabilitys.

## Qualification Contract

Qualification requires:

- source-independent capability packets for all included selected-scope behavior;
- traceability from requirement to source evidence to Buildprint slice to implementation check to QA/reversal check;
- architecture topology proof and capability-depth matrix for medium, large, full-suite, UI-bearing, provider-backed, stateful, or runtime-heavy scopes;
- runtime/test/reversal proof where behavior requires runtime evidence;
- runtime evidence rows in `.buildprint/evidence/evidence-ledger.jsonl` using `capability_id`;
- zero unresolved critical no-fake findings;
- required hardening artifacts for auth, uploads, external providers, billing, admin actions, or user-data operations;
- no unresolved high/critical security risks;
- no secret values in generated outputs, logs, screenshots, or evidence artifacts.
