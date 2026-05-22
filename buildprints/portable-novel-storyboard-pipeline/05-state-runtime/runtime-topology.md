# Runtime Topology

Minimum topology:

```text
browser workbench
  -> app/API boundary
  -> domain services
  -> provider adapters
  -> durable store
  -> preview manifest exporter
  -> proof harness
```

UI-only shells, route-shaped handlers without domain state, fake provider adapters, and static manifest textareas fail the architecture gate.

