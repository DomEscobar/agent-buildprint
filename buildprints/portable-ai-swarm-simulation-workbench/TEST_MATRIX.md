# Test Matrix

| Area | Required proof |
|---|---|
| Intake / ontology | Upload, invalid file, durable readback, deterministic LLM adapter, live LLM blocker/proof |
| Zep graph | Graph create/read/stat/delete adapter tests, fake/live split, live Zep blocker/proof |
| Simulation prep | Dataflow lineage, profile/config artifacts, force regeneration, partial/final readback |
| OASIS runtime | Start/stop/force, max_rounds, process lifecycle, action JSONL monitoring, graph memory update |
| Observability | Action timeline, stats, posts/comments, filters, pagination, missing DB empty states |
| Report / chat | Async report sections, download/readback, report chat, tool/debug search, redaction |
| IPC / interviews | Command/response lifecycle, timeout/cancel/retry, batch/all interviews, blocked env states |
| Lifecycle / ops | Reset/delete/download, denied paths, cleanup, health/readiness, rollback, drift, observability |
| UI | Repeatable browser/e2e, visual quality gate, responsive workbench states |
