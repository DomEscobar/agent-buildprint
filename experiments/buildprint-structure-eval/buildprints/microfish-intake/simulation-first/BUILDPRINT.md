# Simulation-First Buildprint — Microfish Intake Slice

## Operating rule

Before building, simulate the target operator attempting the Microfish intake journey. Turn every predicted failure into `FAILURE_MAP.md`. The failure map is the build plan. The product is done only when the same simulated journey can be replayed successfully against the built product.

## Required read order

1. `BUILDPRINT.md`
2. `USER_SIMULATION.md`
3. `FAILURE_MAP.md`
4. `BUILD_RESPONSE.md`
5. `VERIFY_AS_USER.md`
6. `HANDOVER.md`

## Execution loop

```text
simulate user -> name failures -> build to remove failures -> replay journey -> repair -> handover
```

Do not build generic CRUD. Build the smallest product that makes the simulated Microfish operator succeed.
