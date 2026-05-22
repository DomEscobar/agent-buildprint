# Persistence Contract

First slice may use local filesystem if restart/readback is proven. Qualification must document retention, export, delete, reset, and orphan cleanup semantics. In-memory task status may support live progress but cannot be the only durable source for user-facing history.
