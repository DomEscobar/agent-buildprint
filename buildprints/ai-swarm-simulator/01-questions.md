# Pre-Implementation Questions

Blank answers authorize AI best judgment for the highest-quality appropriate implementation. Ask only if the answer changes product identity, irreversible cost, credentialed provider access, destructive behavior, or public deployment posture.

1. Deployment posture: trusted local workstation, private authenticated server, or public webapp?
   - Default: trusted local workstation with optional private server hardening later.

Should the first implementation optimize for analyst-grade public-opinion rehearsal, creative scenario rehearsal, or a balanced general social-prediction workbench? Default: balanced general social-prediction workbench, with domain language that works for policy, finance, news, and narrative scenarios.

4. Simulation runtime: should the implementation run OASIS live locally, provide a local deterministic simulator first, or support both?
   - Default: support both, with a deterministic local simulator as the first reliable loop and OASIS as a live runtime behind explicit setup checks.

Do you require a specific frontend, backend, runtime, storage, job queue, or deployment stack? Default: choose a mainstream actively maintained UI framework with component state, a schema-validated API service, durable project/report storage, background job ownership, and browser-testable local development.

## 3. UX/UI preferences

Should the product use a quiet analyst workbench style, a more cinematic simulation-lab style, or match an existing design system? Default: quiet high-density simulation lab with a central graph canvas, restrained controls, readable inspectors, live state cues, and no marketing-page hero after the product starts.

## 4. Architecture preferences

Are provider adapters allowed to support both deterministic sandbox mode and live LLM/Zep/OASIS mode behind the same contracts? Default: yes. Local deterministic mode must be credible and domain-shaped, but must never be claimed as live-provider proof.

## 5. Quality bar

Which gates are mandatory in your environment: typecheck, lint, unit/API tests, build, browser/e2e screenshots, worker/runtime smoke tests, security review? Default: run all gates the stack supports and record blockers for credentials or live-provider checks that cannot run locally.

## 6. Constraints / things to avoid

Are there data-handling, provider, cost, destructive-action, or deployment limits beyond this packet? Default: no external writes without explicit credentials and approval, no secrets in output, no production data in fixtures, no single-file UI shell, no token-bubble substitute for the graph workbench, no fake success states, and no generic dashboard/list/form replacement for the product surfaces.

> Use AI best judgment to produce the highest-quality appropriate implementation. Full-suite mapped Buildprints default to production-grade architecture on a mainstream, actively-maintained stack: for UI-bearing products a real component/UI framework with a build step and a recognized styling system (utility-first or design-token based), a typed or schema-validated backend, auth/session/tenant boundaries, durable persistence, worker/runtime ownership, deployment shape, observability, CI/e2e proof, security controls, and maintainable code. Keep the implementation as simple as the obligations allow, but simplicity ranks below production-grade: it never justifies a single-file HTML/CSS/JS shell, hand-rolled UI/CSS/routing/data layers that a mainstream library already solves, or skipping a build system or component model for a real product UI. Do not block on ordinary engineering choices. Ask only for irreversible, expensive, credentialed, destructive, or product-defining forks. Missing credentials block live proof only; they do not remove provider adapters, config contracts, tests, or runtime wiring from scope.
