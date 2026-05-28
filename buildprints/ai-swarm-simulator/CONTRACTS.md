# Contracts

Authoritative contracts live in `06-contracts/*.md` and are resolved by phase through `03-phases/phase-flow.md`.

Core contract themes:

- Product workflow preserves the MiroFish user outcome without requiring route/function parity.
- Backend services own API, provider, worker/runtime, persistence, and configuration boundaries.
- Frontend workbench owns product-specific UI, state transitions, graph/report/simulation surfaces, responsive behavior, and visual quality.
- QA/security owns no-fake claims, secret redaction, deterministic blocker exit behavior, e2e proof, and evidence ceilings.
- Foundation scaffold must create implementation-project `AGENTS.md`, `architecture.md`, `engineering-standards.md`, `test-strategy.md`, and `ui-identity.md` before Phase 01 code.
