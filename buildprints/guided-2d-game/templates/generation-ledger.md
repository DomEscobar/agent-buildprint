# Private generation request-ID ledger

Keep outside public source/export; publish only sanitized totals and approved asset hashes. This operational money/recovery record is not a general evidence product. No credentials, signed URLs, raw private prompts or reference images in it.

One row per submission intent:

| Intent | Provider/operation | Parameter + reference hashes | Quote/currency + approved cap/attempts | Approval ref | State | Request/task IDs | Reserved/actual charge | Recovery action | Final asset hashes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

States: `prepared → submitting → pending → completed` or `unknown_acceptance / failed / reconciled`. Persist intent before submitting and IDs immediately on response. Use one submitter; enforce the aggregate cap including all unknown charges and edits. This local ledger is not provider idempotency.

Recovery example: a strip submission times out → reserve possible charge and mark unknown_acceptance → Retro Diffusion recent-job lookup recovers its task ID → poll existing job → retrieve and hash output → reconcile charge. **No second generation.** If WaveSpeed submission loses its ID and no documented lookup exists, stop for operator history/support reconciliation; do not assume retry is safe. Terminal failure needs billing reconciliation, not automatic refund assumptions. Further generation after unresolved ambiguity needs renewed approval acknowledging possible double cost.
