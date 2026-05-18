# Quality Scorecard

Scores are 0-3 unless marked N/A.

| Dimension | Score | Evidence | Notes |
|---|---:|---|---|
| Evidence coverage |  |  |  |
| Edge-case coverage |  |  |  |
| Contract completeness |  |  |  |
| State/lifecycle precision |  |  |  |
| Security/threat model coverage |  |  |  |
| Data lifecycle coverage |  |  |  |
| Reversal result |  |  |  |
| Product setup result |  |  |  |
| QA journey pass rate |  |  |  |
| Product readiness |  |  |  |

## Publish threshold

- Product-proofed: no critical gaps; included capabilities are real; persistence/restart, route/control, runtime/browser QA, and no-fake scans pass where applicable.
- Architecture-proofed: reversal passes for contracts/architecture, but product setup/QA is incomplete or intentionally out of scope. This status must not be marketed as implemented product behavior.
- Blocked: any included route/control/provider/job/export/persistence/auth/billing/upload/admin/API path is placeholder, no-op, mock-as-product, skeleton-only, or in-memory-only where durability is claimed.
- Draft only: evidence or scope gaps remain.
