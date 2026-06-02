# Phase 06 — Runtime, Deployment, And Hardening Pass

## Product intention

Make the artifact operable for its declared deployment posture. Local demos should be easy to run; private/public deployments need honest security, privacy, and provider controls.

## Build

- Provide setup commands for dependencies, env configuration, local frontend/backend startup, health check, and build.
- Validate required env vars at startup and before provider actions.
- Add storage directory creation, file size/type controls, and clear cleanup behavior.
- Add authentication/access control if deployment is private or public.
- Restrict CORS appropriately for deployment posture.
- Add confirmation and audit/log visibility for delete, reset, stop, and close operations.
- Add focused tests or smoke scripts for project creation, provider-blocked states, persisted readback, and report/simulation state.
- Ensure bilingual labels, empty states, and errors do not contain debug/proof vocabulary.

## Quality bar

- A new developer can start the app locally and see either the first loop or clear provider-blocked guidance.
- Public deployment is not implied unless auth/privacy/storage/rate-limit boundaries are implemented.
- Health checks and smoke tests catch broken boot, broken build, and missing required env names.
- Sensitive uploads are not logged or copied into handover.

## Do not ship

- Wildcard CORS in a public deployment.
- Secret values in logs, reports, screenshots, or handover.
- Destructive actions without confirmation.
- A "production-ready" claim from local-only checks.


### Provider configurability

Hardcoded vendor assumptions are a defect. LLM provider configuration must support dynamic OpenAI-compatible base URL/model/key settings and show which features are available or blocked for the current provider config. Graph-memory configuration must not require Zep Cloud.
