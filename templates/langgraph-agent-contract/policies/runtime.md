# Runtime Policy

This blueprint wants LangGraph-like behavior, not LangGraph dependency lock-in.

Generated code must:
- use local TypeScript modules;
- model nodes as plain async functions;
- model edges as explicit routing data or functions;
- keep the runner small and understandable;
- expose interfaces for LLMs, tools, and checkpoints;
- support tests with fake adapters;
- avoid hidden global state.

Generated code must not:
- import LangGraph or a graph-agent runtime;
- hide routing inside prompt text;
- let nodes mutate state in place;
- perform network or external writes in tests;
- add abstractions that are not required by this blueprint.
