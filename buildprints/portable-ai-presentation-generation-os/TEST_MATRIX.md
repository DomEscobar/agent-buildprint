# TEST_MATRIX

| Risk | Required test |
|---|---|
| Provider keys leak | secret redaction and log/evidence scan |
| Auth bypass | protected API rejects unauthenticated requests |
| Fake deck generation | no-fake scan plus persisted slide content proof |
| Parser accepts unsafe uploads | file type/size/path traversal negative tests |
| Provider failure hides errors | normalized provider failure test |
| Export is placeholder | PPTX/PDF structural/openability proof |
| UI only works happy path | browser traces for empty/loading/error/blocked/success |
| Webhook SSRF or silent failure | webhook URL policy and failure/retry evidence |
| In-memory-only state | reload/persistence roundtrip |
| Desktop/API/MCP overclaim | explicit blocker unless packaging/tool proof exists |
