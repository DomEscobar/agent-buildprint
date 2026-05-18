# Portable Personal Agent Chat OS

Clean-room Buildprint for a self-hosted personal agent chatbot inspired by the mapped architecture of [`TheSyart/emperor-agent`](https://github.com/TheSyart/emperor-agent), with comparison references from JARVIS and ToFu so the result covers a complete personal-agent OS contract.

## Scope

Build a portable personal agent OS with:

- streaming chat UI/runtime boundary
- multi-provider LLM routing
- tool registry and dispatch
- skill registry
- MCP-style external tool adapter
- three-tier memory and context compaction
- subagent/team delegation
- token telemetry
- safety gates for filesystem/shell/network tools
- head-to-foot QA and explicit unsafe-claim boundaries

## Clean-room boundary

This package is a mapped-project Buildprint, not a source copy. It captures portable architecture and contracts. Do not copy Emperor Agent implementation files, art assets, prompts, or UI styling. Use the contracts and proof here to rebuild the architecture in your own stack.

## Authority

`BUILDPRINT.md` is the canonical authority and contains the required read order.

## Validation status

Current validation is local deterministic proof only. No live model providers, MCP servers, shell execution, browser automation, or external network calls are required for the proof.
