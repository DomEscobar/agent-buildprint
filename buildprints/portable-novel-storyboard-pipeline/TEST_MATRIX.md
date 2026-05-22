# TEST_MATRIX

| Gate | Required evidence |
|---|---|
| Unit/contract | Domain model, parser, adapter, and manifest tests pass. |
| Browser runtime | Desktop and mobile screenshots cover empty, loading, blocked, error, and success states. |
| Persistence | Restart/readback proves projects, chapters, scripts, assets, storyboard rows, media tasks, and manifest state. |
| Provider | Deterministic provider proof passes; live provider proof remains blocked unless credentials are explicitly supplied. |
| Security | Auth/session, upload, provider secret, and destructive/admin paths have negative tests or blockers. |
| Clean-room | Implementation uses this Buildprint, not Toonflow source imports. |

