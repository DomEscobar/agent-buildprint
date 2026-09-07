# Private generation request-ID ledger

Keep outside public source/export; publish only sanitized totals and approved asset hashes. This operational money/recovery record is not a general evidence product. No credentials, signed URLs, raw private prompts or reference images in it.

Before preparing a paid intent, link the verified Asset-Maker access/capability evidence and user approval required by `../references/providers-and-sources.md#asset-maker-quality-contract`. Track WaveSpeed Seedream edits and Bria background removal as billable operations alongside companion generation; include all in the approved cap. Missing access invokes the disclosed free-only fallback policy, not an unapproved substitute.

One row per submission intent:

| Intent | Provider/operation | Parameter + reference hashes | Quote/currency + approved cap/attempts | Approval ref | State | Request/task IDs | Reserved/actual charge | Recovery action | Final asset hashes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

States: `prepared → submitting → pending → completed` or `unknown_acceptance / failed / reconciled`. Persist intent before submitting and IDs immediately on response. Use one submitter; enforce the aggregate cap including all unknown charges and edits. This local ledger is not provider idempotency.

Recovery example: a strip submission times out → reserve possible charge and mark unknown_acceptance → Retro Diffusion recent-job lookup recovers its task ID → poll existing job → retrieve and hash output → reconcile charge. **No second generation.** If WaveSpeed submission loses its ID and no documented lookup exists, stop for operator history/support reconciliation; do not assume retry is safe. Terminal failure needs billing reconciliation, not automatic refund assumptions. Further generation after unresolved ambiguity needs renewed approval acknowledging possible double cost.
