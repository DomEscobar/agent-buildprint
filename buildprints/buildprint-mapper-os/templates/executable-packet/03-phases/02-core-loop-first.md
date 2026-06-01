# Phase 02 — Core loop first

requires_roles: [product-architect, integration-runtime, data-persistence]

## Product intention

Build one complete normal-user loop that proves the product promise end to end before expanding secondary features.

## Mapped obligations

- First-run path with clear input/start action.
- Primary action produces meaningful result tied to input.
- Data contracts cover inputs, transformation, persistence, outputs, and errors.
- Readback behavior and blocked-provider honesty are explicit.

## Stable vs free

- Stable: first-loop behavior, input/output semantics, and blocked-state honesty.
- Free: implementation details of services/components/adapters.

## Implementation scope

- Implement one full vertical path from input to user-visible result.
- Persist loop-critical state where continuity is required.
- Add provider boundary behavior for local vs live paths.
- Add core-loop checks for changed input and readback.

## Interfaces touched

- Main loop UI/API/command entrypoint.
- Domain transform/service boundary.
- Provider and persistence adapters.

## State / runtime touched

- Loop-owned entities and transition state.
- Persistence/readback fields for the loop.
- Provider runtime status for blocked/live behavior.

## UX / DX / operator requirements

- In 60 seconds a reviewer can run loop and see changed input change output.
- Error and blocked states keep trust and suggest next action.

## Required output (integration-runtime)

- Provider/runtime boundary includes config, errors, and blocked behavior.

## Blocks (integration-runtime)

- Fake provider success or canned output in production path.

## Required output (data-persistence)

- Claimed durable state survives restart/readback.

## Blocks (data-persistence)

- In-memory-only continuity where persistence is promised.

## Required output (product-architect)

- Vertical slice crosses UI/API/domain/provider/persistence boundaries coherently.

## Blocks (product-architect)

- Route/controller only with no domain and persistence ownership.

## Quality bar

In a 60-second demo, changed user input should visibly change the result, the result should be useful in plain language, and the next action should be obvious.

## Do not ship

Canned output, raw JSON as the experience, fake provider success, a form that does not change behavior, or a result that explains the system instead of helping the user.

## Repair routing

- loop behavior bug -> current phase
- boundary mismatch -> `02-project-setup.md`
- provider honesty failure -> `04-review.md`

## Unlock condition

One core loop is fully usable end-to-end with honest blocked states and durable readback where promised.
