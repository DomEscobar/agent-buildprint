# Test Matrix

| Risk | Required test / check | Evidence |
|---|---|---|
| API-only fake app | Browser happy path clicks rendered studio controls | runtime artifact: browser trace and screenshot |
| Empty/generic UI | Product-quality check rejects empty dashboard/raw JSON primary UI | runtime artifact: desktop/mobile screenshots |
| Manual input broken | Description-only request returns analysis and scripts | contract/integration test |
| URL path fake | URL fixture executes scrape/research/analyze/script adapters | adapter test with no-network fixture |
| Script shape drift | Scripts contain exactly five timed segments with b-roll requirements | schema test |
| Actor consent bypass | Upload/custom actor requires valid image and likeness consent | upload/validation test |
| Voice fallback missing | Voice list works in mock mode without keys | unit/integration test |
| Live mode fake success | Missing live keys return structured blocked state | negative test |
| Job lifecycle incomplete | Pending/running/success/failure/blocked/canceled/retry states work | job tests and browser negative path |
| Restart claim unsupported | Status/log/result survive restart or limitation is recorded | restart test or blocker |
| Provider record missing | Provider request records are persisted/summarized | manifest/provider test |
| Subtitle injection | Provider text is escaped for subtitle/media filters | media unit test |
| MP4 invalid | Output probes as playable 1080x1920 MP4 | probe evidence |
| Blank media proof | Nonblank visual/caption/b-roll timing is detected | media fixture check |
| Gallery privacy leak | Gallery pages show only explicitly consented videos | unit and browser test |
| Publish consent bypass | Handoff blocked without consent and prepared with consent | contract and browser test |
| Publishing overclaim | Completion wording never claims direct platform publishing | claim wording check |
| Live network in default tests | Default tests make no live provider calls | no-network gate |
| Secret leakage | Artifacts contain env names only, never values | secret scan |
| Validation handwave | Validation report includes commands, screenshots, MP4 probe, provider mode, gaps | report check |
