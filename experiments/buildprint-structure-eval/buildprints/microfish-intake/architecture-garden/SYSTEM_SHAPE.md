# System Shape

Microfish will eventually include intake, ontology/graph memory, simulation prep, runtime, reports, and interaction/history.

For this slice, build only intake + ontology preview, but shape it so later phases can plug in:

- UI/workbench boundary;
- domain ontology generator boundary;
- provider adapter boundary with deterministic local mode;
- persistence repository boundary;
- export/handoff boundary;
- tests around domain and persistence.
