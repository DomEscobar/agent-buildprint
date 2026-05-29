# Phase 07 — Provider And Skill Operations

## How to implement this phase

Read `03-phases/phase-flow.md`, `.buildprint/next-agent.md`, and current project `AGENTS.md` before code edits. Execute through phase-flow and block evidence until `.buildprint/phase-runs/07-provider-skill-operations/plan.md` and proof exist.

## Capability outcome

An operator can configure model providers, edit or import adapter definitions safely, test text/image/video/TTS models, manage prompt and skill content, and see sandbox/live split status without exposing secret values. Failed provider calls show retry and error mapping rather than fake success.

## Phase mode contract

blueprint_mode: integration

phase_style: boundary_transaction_contract

Glance surfaces delivered: Provider and skill operations

This phase is an integration boundary: it must define config/secrets, request/response contracts, webhook/callback or polling callbacks for async jobs, idempotency, sandbox/live split, retry/error mapping, credential redaction, and fake-provider proof.

## Mapped capability obligations

- Bundled and user-editable provider adapters for text, image, video, and TTS.
- Vendor config inputs/models/enablement/code updates/model tests.
- Prompt, model-map, skill management, agent deployment model config.

## Behavior compatibility contract

Preserve programmable provider capability and model tests, but do not require unsafe arbitrary code execution. If code execution remains, it must be sandboxed, auditable, and reviewed.

## Implementation scope

- Provider registry with adapter schema, config inputs, secret storage, enablement, model list, and test execution.
- Adapter editor/import with validation, versioning, rollback, static checks, and VM/sandbox boundary.
- Deterministic fake providers for text/image/video/audio, async polling callback path, idempotency keys, retry/error mapping.
- Skill/prompt/model-map management with edit history, attribution, and safe file/database sync.

## Interfaces touched

Provider settings UI, adapter editor, model-test UI, prompt/skill management UI, provider adapter runtime, secret manager, integration test harness, audit repository.

## State/runtime touched

Owns provider configs, secret references, adapter code/versions, models, enablement, test results, prompts, skills, model maps, audit logs, and provider job traces. Does not own generated media files except test artifacts.

## UX/UI requirements

Operator experience must make secrets hidden by default, live/sandbox status clear, test output readable, adapter validation actionable, and skill/prompt editing safe. Avoid raw code textarea as the only safety mechanism.

## Safety/security constraints

No secret values in evidence/logs/screenshots. Adapter code execution requires sandbox/allowlist, timeout, network policy, dependency restriction, and rollback. Provider calls need explicit live mode and cost warning.

## Quality gates

- provider_adapter_config_test_required for config schema and secret redaction.
- Fake-provider tests for text/image/video/TTS.
- Integration tests for webhook/callback or polling, idempotency, retry, and error mapping.
- Security boundary review for adapter execution.
- Browser e2e for provider config, model test, blocked live proof, prompt/skill edit.
- `verify:no-fake` and `PHASE_ID=07-provider-skill-operations verify:phase-artifacts`.

## Proof gate

Required labels: `provider_adapter_config_test_required`, `fake_provider_proof`, `live_provider_proof_blocker_only`, `security_boundary`, `no_fake`.

Proof must show deterministic provider tests pass, live provider absence is non-upgrading, retry/error mapping works, idempotency prevents duplicate async jobs, and secrets are redacted.

## Repair routing

Provider config, sandbox, secret, adapter validation, skill persistence, or fake-provider failures route to this phase. Live credentials route to blocker evidence, not scope removal.

