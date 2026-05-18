# QA PLAN

## Static Review

- Check every `OBSERVED(...)` claim points to an exact source path and line range.
- Check every synthesis claim is labeled `INFERRED`.
- Check non-goals are labeled `OUT_OF_SCOPE`.
- Check unresolved design items are labeled `QUESTION`.
- Check no generated artifact contains large copied source chunks.

## Behavioral Tests

Implement and run the tests in `TEST_MATRIX.md`.

Required test conditions:
- No network access.
- No model provider dependency.
- No LangSmith/cloud dependency.
- Temporary in-memory storage only.
- Deterministic event ordering.

## Security Tests

- Strict serializer rejects unknown tagged type.
- Pickle/equivalent unsafe mode is unavailable or disabled by default.
- Checkpoint load from untrusted bytes is documented as unsafe unless strict allowlist is active.

## Reversal Proof

A future clean-room implementation should prove:
- It was written from this Buildprint and public concepts only.
- It does not copy LangGraph source.
- It passes the required tests.
- It does not claim unsupported parity.


---

## Consolidated notes from `HEAD_TO_FOOT_QA.md`

# HEAD TO FOOT QA

## Head: Does the Buildprint Match the Selected Candidate?

Yes. All core files describe the Portable Durable Agent Graph Runtime, not a broad LangGraph clone.

## Body: Are Core Subsystems Covered?

- Builder: covered in `SPEC.md`, `CONTRACTS.md`, and trace.
- Runtime: covered with deterministic supersteps, invoke, stream, state snapshots.
- State updates: covered with partial dict updates, LastValue, reducers.
- Streaming: covered with modes and payload expectations.
- Checkpointing: covered with checkpoint shape, tuple, in-memory saver, thread/checkpoint config, pending writes.
- Interrupt/resume: covered with `interrupt`, `Command`, and snapshot requirements.
- Serializer safety: covered with strict allowlist and no default pickle-equivalent behavior.

## Feet: Can a Future Implementer Walk It?

Yes. `PLAN.md` gives implementation sequence and `TEST_MATRIX.md` gives acceptance tests.

## Risk Review

- Risk: Over-claiming parity. Mitigation: `PARITY_CLAIMS.md` is explicit.
- Risk: Accidentally implementing provider/tool ecosystem. Mitigation: prebuilt tooling is optional and mocked.
- Risk: Unsafe deserialization. Mitigation: strict serializer safety gate is a core test.
- Risk: Ambiguous reducer ordering. Mitigation: documented question; implementation must choose deterministic order.
