# BUILDPRINT: Portable Durable Agent Graph Runtime

## Agent Operating Contract

Build a small, dependency-light runtime for checkpointed agent workflows. The runtime lets an implementer define typed state, register nodes that return partial state updates, connect nodes with directed and conditional edges, compile a graph, invoke or stream it, checkpoint state by thread, interrupt for human input, and resume from persisted checkpoint state.

The canonical contract is this file. Supporting files expand implementation details, evidence, security requirements, and acceptance tests, but they do not override this authority spine.

## Binding Implementation Slice

The included implementation slice is:

- `StateSchema`: declares state keys, value validators, default values, and optional reducers.
- `GraphBuilder`: mutable graph definition with node registry, edges, conditional routes, entrypoint/finish helpers, and compile validation.
- `CompiledGraph`: immutable runtime plan with `invoke`, `stream`, `get_state`, and `update_state`.
- `Channel`: per-key state container with `apply(updates)` and `snapshot()`.
- `CheckpointSaver`: persistence interface for checkpoint tuples and pending writes.
- `InMemoryCheckpointSaver`: test/debug saver only; it is not production durability.
- `Command`: control object for state update, resume, and goto.
- `Send`: optional fanout object for routing a custom argument to a node.
- `Interrupt`: resumable pause payload that requires checkpointing.
- `Serializer`: strict JSON-like serializer with an explicit allowlist for non-primitive tagged values.

Execution is deterministic and single process. The binding must not claim distributed execution, concurrent Pregel performance, production storage durability, provider/model integrations, cloud services, or exact source-project API compatibility.

## Non-Goals / Unsafe Claims

- Full LangGraph clone behavior.
- Full Python API compatibility or LangGraph.js compatibility.
- LangSmith, cloud deployment, hosted tracing, or managed storage behavior.
- Provider/model/tool ecosystem behavior.
- Production restart-safe storage unless a durable adapter is separately implemented and tested.
- Pregel concurrency or performance characteristics.
- Exact serializer byte compatibility, interrupt namespace hashing, or source-project event ordering beyond this contract.
- Complete `ToolNode`, `ValidationNode`, or ReAct agent factory behavior.
- In-memory checkpointing as production durability.

## Required Read Order

1. `BUILDPRINT.md`
2. `SPEC.md`
3. `CONTRACTS.md`
4. `THREAT_MODEL.md`
6. `QA_PLAN.md`
7. `PLAN.md`
8. `SOURCE_TRACE.md`
9. `TRACEABILITY_MATRIX.md`
10. `SYSTEM_MAP.md`
11. `PARITY_CLAIMS.md`

## Phase Gates

1. Schema and channels: implement last-value channels, reducer channels, schema validation, and deterministic reducer ordering.
2. Builder: implement node registration, directed edges, conditional routes, entrypoint/finish helpers, and compile-time topology validation.
3. Runtime: implement the deterministic superstep loop, state snapshots, update application, `invoke`, and `stream`.
4. Checkpointing: implement checkpoint objects, checkpoint tuples, thread/checkpoint config, pending writes, and the in-memory test/debug saver.
5. Interrupts: implement interrupt capture, `Command(resume=...)`, resume semantics, and snapshot tasks/interrupts.
6. Serializer safety: implement primitive JSON serialization, tagged allowlist handling, and default rejection of executable or unknown payloads.
7. Optional demos: keep local ToolNode/ReAct-style examples outside the core contract and label them non-core.
8. Validation: run the acceptance gates without network, API keys, provider calls, cloud services, or source-code copying.

## Acceptance Gates

- A `START -> A -> B -> END` graph invokes both nodes and returns final state.
- Conditional routing selects the correct destination.
- Same-step writes to a reducer key merge deterministically.
- Missing entrypoint, unknown target, duplicate node name, and reserved-name violations fail before execution.
- Reusing `thread_id` restores the latest checkpoint; explicit `checkpoint_id` restores selected state.
- Interrupt produces a stream-visible pause and `Command(resume=...)` continues from saved state.
- When one same-step task succeeds and another fails, successful pending writes are stored in the checkpoint path and can be replayed by the documented retry/resume simulation.
- Stream modes `values`, `updates`, `checkpoints`, and `tasks` emit documented local payload shapes. `debug` may compose checkpoint/task events. `custom` is local-only if implemented. Provider/LLM `messages` streaming is outside core unless a local test source is explicitly implemented and labeled.
- Strict serializer rejects unknown tagged values and default configuration has no pickle-equivalent arbitrary-code deserialization.
- Core tests pass without network access, model providers, LangSmith, cloud services, or production storage.

## Purpose

The purpose is to provide a portable architecture contract for durable graph execution: typed shared state, deterministic node scheduling, partial updates, reducer-backed channels, checkpoint restore, pending-write recovery, interrupt/resume, streamable execution records, and serializer safety.

## Architecture

```text
GraphBuilder
  -> compile validation
  -> CompiledGraph
      -> deterministic superstep planner
      -> node executor
      -> channel update reducer
      -> CheckpointSaver
      -> stream event emitter
      -> interrupt/resume controller
```

Superstep loop:

1. Load the latest checkpoint for `thread_id`, load the selected `checkpoint_id`, or create an initial checkpoint.
2. Map input or `Command` to pending writes and control directives.
3. Plan runnable nodes from the entrypoint, updated channels, conditional routes, or command goto.
4. Execute planned nodes in deterministic order.
5. When a checkpointer exists and the configured durability permits it, persist each successful task's pending writes before applying the complete superstep.
6. If a task fails, keep successful pending writes in the checkpoint path and stop with an error event.
7. Apply writes through channel rules and reducers.
8. Advance channel versions and versions-seen.
9. Store the checkpoint.
10. Emit stream events.
11. Stop at `END`, no runnable nodes, interrupt, or error.

Minimal public API:

```text
GraphBuilder(schema)
  .add_node(name, fn)
  .add_edge(start, end)
  .add_conditional_edges(source, route_fn, path_map=None)
  .set_entry_point(name)
  .set_finish_point(name)
  .compile(checkpointer=None)

CompiledGraph
  .invoke(input, config=None, stream_mode="values")
  .stream(input, config=None, stream_mode="values")
  .get_state(config)
  .update_state(config, values, as_node=None)

Command(update=None, resume=None, goto=None)
Send(node, arg)
interrupt(value)
InMemoryCheckpointSaver()
```

## Evidence Boundary

Evidence anchors:

- OBSERVED(`libs/langgraph/langgraph/graph/state.py:130-144`): builder, shared state, partial updates, reducers, compile-before-run.
- OBSERVED(`libs/langgraph/langgraph/pregel/main.py:448-521`): actor/channel superstep execution.
- OBSERVED(`libs/checkpoint/langgraph/checkpoint/base/__init__.py:92-147`): checkpoint and checkpoint tuple shapes.
- OBSERVED(`libs/langgraph/langgraph/types.py:120-134`): stream modes.
- OBSERVED(`libs/langgraph/langgraph/types.py:748-924`): `Command`, `Send`, and `interrupt`.

The source trace supports architectural concepts only. Implementations must use original code and tests written from this Buildprint. Names may be similar only where they identify public concepts required by the contract.

## Required Validation

Run the behavioral, security, and static phase proof gates and `QA_PLAN.md`. Record exact commands, pass/fail status, and known gaps in the implementation validation report. Any implementation that adds production storage, provider integrations, concurrency, UI, or cloud behavior must add specific tests for those capabilities before claiming them.

## Copyable Agent Prompt

```text
Implement the Portable Durable Agent Graph Runtime from BUILDPRINT.md. Treat BUILDPRINT.md as the canonical authority. Implement only the binding slice: typed state schema, graph builder, compiled deterministic runtime, stream events, checkpoint tuples and pending writes, in-memory test/debug checkpoint saver, interrupt/resume, Command/Send controls, and strict serializer safety. Do not claim production durability from in-memory storage. Do not implement provider, cloud, LangSmith, full API compatibility, or source-project clone behavior unless separately scoped and tested. Run the acceptance gates from phase proof gates and record commands and results.
```
