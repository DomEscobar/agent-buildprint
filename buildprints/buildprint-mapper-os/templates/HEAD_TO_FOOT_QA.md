# Head-to-Foot QA Plan

Purpose: prove the selected fidelity target with layered evidence, not just unit tests.

## Selected fidelity target

- Selected target:
- Excluded targets:
- Product/app surface:
- Runtime proof required? yes/no
- Browser UI exists? yes/no
- Production-grade selected scope? yes/no
- Mock/fixture boundary documented? yes/no

## Level 0 — Static safety

- [ ] Buildprint/package is self-contained.
- [ ] No secrets/API keys/tokens copied.
- [ ] Environment variable names only; no values.
- [ ] Safe/unsafe claims are present.
- [ ] No mock/fixture path is counted as product implementation.
- [ ] Included capabilities are either real or explicitly excluded.

Evidence/result:

## Level 1 — Unit/contract tests

Cover scope-specific contracts:

- [ ] inputs/outputs
- [ ] state mappings
- [ ] edge cases/failures
- [ ] parser/validation behavior
- [ ] idempotency/retry/rollback where relevant
- [ ] no-network default gate where providers exist

Command:

```bash
npm test
```

Evidence/result:

## Level 2 — Build/typecheck

Command:

```bash
npm run build
```

Evidence/result:

## Level 3 — Real runtime happy path

Required for `runtime-parity` or any generated product/app proof.

Flow:

1. Start app/service.
2. Open actual runtime URL.
3. Execute the core user journey through rendered UI or real API calls.
4. Verify visible state / returned artifacts.
5. Capture screenshot/log/artifact sample.

Browser command/harness:

```bash
# Playwright CLI, browser tool, or equivalent CDP harness
```

Assertions:

- 

Evidence/result:

## Level 4 — Persistence/restart and no-fake implementation

Required for product/app/feature scopes.

- [ ] Product data written through real app/API survives process restart, reload, or durable adapter re-open.
- [ ] Primary routes/links resolve to real pages/handlers.
- [ ] Primary controls perform real state changes or real errors.
- [ ] No placeholder/coming-soon/TODO/no-op/skeleton adapter appears inside included scope.
- [ ] Mocks/fixtures are isolated to test/demo paths and not selected in production mode.

Evidence/result:

## Level 5 — Runtime negative paths

Test the highest-risk failures in the real runtime, not only unit tests.

- [ ] validation failure shows useful error and preserves prior state
- [ ] provider/job failure persists error reason
- [ ] cancellation does not create false success artifact
- [ ] retry is idempotent
- [ ] export/manifest/result remains consistent

Evidence/result:

## Level 6 — Responsive/UX smoke

Required for browser UI scopes.

- [ ] desktop screenshot
- [ ] mobile/narrow screenshot
- [ ] critical controls visible
- [ ] no parity-overclaiming text
- [ ] limitations visible near export/preview/result surfaces

Evidence/result:

## Level 7 — Optional live provider/export gate

Only if selected by user.

- [ ] explicit env gate enabled
- [ ] credentials not persisted
- [ ] one live smoke succeeds or fails with normalized error
- [ ] fixture/no-network tests still pass without credentials
- [ ] live provider/export is either real and tested or excluded from product scope

Evidence/result:

## Required QA artifacts

- `BUILD_REPORT.md`
- `RUNTIME_LIVE_TEST_REPORT.md` when runtime proof exists
- screenshots / logs / parsed artifact sample
- test/build command summaries
- remaining gaps

## Remaining gaps

- Buildprint gaps:
- Scratch harness issues:
- Product proof defects:
- Intentional omissions:
