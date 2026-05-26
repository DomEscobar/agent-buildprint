# Evaluation

Use this file after each phase proof gate and before making any public or implementation claim.

## Required evaluation dimensions

- provider_live: deterministic test provider proof is required for baseline; live OpenAI/Anthropic/Bedrock/Ollama-compatible behavior remains blocked until env-gated smoke tests run with real credentials and network.
- durable_persistence: sessions, messages, checkpoints, memory, traces, team tasks, and telemetry require persistence/readback proof; in-memory-only stores are prototype blockers.
- security_boundary: tool/schema policy, denied shell/write/network/browser actions, secret handling, MCP timeouts, and audit events must be proven or recorded as blockers.
- no_fake: no fake provider/live/MCP/browser/security/build claim may pass from copy checks, static text, or synthetic evidence alone.
- ui_api_workbench: chat stream, provider diagnostics, tools, skills, MCP, memory, team, tokens, and config views must be wired to runtime state or explicitly blocked.
- memory_context: compaction must retain recent messages and not silently drop user instructions.
- team_delegation: subagent tasks must be bounded, evented, summarized, and policy-constrained.
- claim_boundaries: exact Emperor Agent clone parity, source UI parity, production auth, billing, hosted SaaS, publishing, browser/network/shell safety, media/retrieval integrations, and JARVIS/ToFu completeness are unsafe unless separately proven.

## Loop completion rule

A phase is complete only when:

1. Required phase-run artifacts exist under `.buildprint/phase-runs/<phase-id>/`.
2. Quality gates in the phase file ran or produced an honest blocker.
3. Architecture, UX, and QA reviews answer the review contracts from `03-phases/phase-flow.md`.
4. Runtime evidence or blocker rows are appended to `.buildprint/evidence/evidence-ledger.jsonl`, not to the packet seed ledger.
5. The evidence row conforms to `05-evidence/evidence-ledger.schema.json` and does not over-upgrade blocked, missing, synthetic, partial, sandbox-limited, network-limited, credential-limited, or dry-run-only proof.

## Blocker honesty

Blocked proof is acceptable when the blocker is scoped and does not inflate the claim. Examples:

- missing live provider credentials blocks `provider_live`;
- no configured MCP server blocks real MCP interoperability;
- unavailable browser automation blocks browser screenshot proof but not local HTTP proof;
- network restriction blocks external retrieval/media/provider smoke tests;
- absent production auth or billing implementation blocks hosted/multi-user/billing claims;
- in-memory-only persistence blocks durable_persistence.

Blocked, missing, synthetic, partial, sandbox-limited, network-limited, credential-limited, and dry-run-only evidence must set `upgrades_claim: false`.
