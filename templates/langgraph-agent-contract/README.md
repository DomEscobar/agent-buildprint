# LangGraph-style Agent Contract for Vanilla TypeScript

This folder is an **Agent Buildprint contract**.

It captures the useful LangGraph mental model — state, nodes, edges, conditional routing, checkpointing, tools, and human interrupts — without requiring a LangGraph runtime dependency.

## Positioning

> Portable architecture contracts for AI-generated agents.

First wedge:

> LangGraph-style agents in Vanilla TypeScript.

## What this is

- A source-of-truth architecture contract for AI coding agents.
- A set of schemas, prompts, policies, and tests that guide code generation.
- A lightweight check target for `agent-buildprint check`.

## What this is not

- Not a runtime framework.
- Not a YAML programming language.
- Not a LangGraph clone.
- Not a replacement for TypeScript tests.

## Files

```txt
langgraph/
  agent.contract.yaml         # product/contract framing
  blueprint.yaml              # machine-checkable source of truth
  schemas/                    # state and output contracts
  prompts/                    # node prompts
  policies/                   # runtime, safety, side-effect rules
  tests/                      # graph behavior contracts
  examples/                   # generated-code shape examples
```

## Usage

From `/root/blueprint`:

```bash
node ./bin/xy.js check ./langgraph
# or, if linked/installed:
agent-buildprint check ./langgraph
```

When generated code exists:

```bash
agent-buildprint check ./langgraph --code ./generated-agent
```

## Prompt for an AI coding agent

```txt
Read /root/blueprint/langgraph/blueprint.yaml first.
Generate Vanilla TypeScript that satisfies the blueprint, schemas, policies, and tests.
Do not import LangGraph or any graph-agent runtime.
Keep the graph runner local, small, and explicit.
Run `node /root/blueprint/bin/xy.js check /root/blueprint/langgraph` before claiming done.
```
