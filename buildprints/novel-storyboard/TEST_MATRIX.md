# Test Matrix

| Area | Required Proof |
|---|---|
| Storyboard UI | Browser trace, desktop screenshot and narrow screenshot showing shot frames, inspector, canvas controls and no overlap. |
| Canvas topology | Unit test for required node IDs, edges and layout stability. |
| Persistence | Save/reload/restart roundtrip for board data, storyboard order, frame metadata and media state. |
| Agent loop | Socket auth tests, stop behavior, parser tests and visible storyboard frame mutation. |
| Media generation | Fake-provider pending/success/failure/retry tests plus live-provider blocker or live proof. |
| Security | Auth rejection, project/episode isolation, no client secrets and destructive confirmation tests. |
| Runtime | Build/start/login/reload/restart smoke proof with health/readiness. |
