# Mapper OS Production-Grade Roundtable — 2026-05-18

## Trigger

Dom identified a serious Mapper OS failure mode: mapped Buildprints can become lazy MVP/proof apps. The problem is not exact source parity. The problem is fake completeness: mocked services, route-shaped links, in-memory persistence, skeleton adapters, and UI controls counted as implemented product behavior.

## Roundtable voices

### 1. Product owner

A Buildprint is a promise to an implementer. If it says a route, provider, queue, export, settings screen, or workflow is included, that included surface must work end-to-end. Users should not discover that “implemented” means “mocked demo”. Scope can be smaller, but the selected scope must be serious.

Decision: Mapper must prefer smaller complete scope over broader fake scope.

### 2. Principal engineer

Production-grade means boring real foundations where the feature requires them: durable persistence, migrations, API validation, async queue semantics, retry/cancel behavior, secret handling, error states, and runtime tests. Mocks belong in tests and local fixtures, not in the claimed product path.

Decision: every included capability needs a production contract and a test/QA gate. If there is no real implementation path, exclude it from scope.

### 3. QA lead

Current acceptance can pass a proof with mocked providers and a small browser smoke. That is insufficient for product-grade output. QA must actively search for fake implementation: placeholder links, no-op controls, coming-soon text, in-memory-only data, skeleton adapters, and success states without real side effects.

Decision: add a no-fake-implementation gate and runtime persistence/restart checks where product state exists.

### 4. Security/platform reviewer

Production-grade output must not smuggle insecure defaults. If auth, uploads, external providers, billing, admin actions, or user data are included, threat model, data lifecycle, observability, limits, and secret handling become required. It is better to cut those capabilities than include unsafe stubs.

Decision: conditional hardening artifacts become mandatory when those surfaces are included.

### 5. Marketplace reviewer

Public Buildprints need clear claim language. “Validated” should not mean “toy app was possible”. It should mean the Buildprint can drive a real implementation of its selected scope. Marketplace copy must distinguish excluded scope from fake implementation.

Decision: require an implementation completeness contract in every Mapper output.

## New Mapper principle

> Scope may be limited, but implemented scope must be complete.

## Concrete policy

1. Production-grade selected scope is the default.
2. Scope cuts remove capabilities; they do not replace them with mocks/placeholders.
3. Mocks are allowed only as test fixtures or demo fixtures, clearly outside the production path.
4. No in-memory product state when the feature claims persistence.
5. No route-shaped links without real pages/handlers.
6. No no-op UI controls, fake success states, fake auth/billing/export/provider/queue behavior, or skeleton adapters counted as implemented.
7. Every included feature must define data flow, validation, errors, persistence/durability where relevant, observability, and QA evidence.
8. Buildprints must include a no-fake-implementation scan and production completeness score.

## Mapper edits required

- Replace default `workflow-proof` mindset with production-grade selected-scope default.
- Keep fidelity/parity language, but make it secondary to implementation completeness.
- Add `IMPLEMENTATION_COMPLETENESS.md` template.
- Add schema fields for production-grade posture and mock policy.
- Update discovery/extraction prompts to ask: “Which smaller scope can be implemented fully?”
- Update acceptance checks with no fake implementation rules.
- Update website copy to stop advertising mock-first provider behavior as a virtue for Mapper-derived product Buildprints.
