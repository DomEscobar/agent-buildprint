# 00 Questions

Ask only questions that alter implementation. OpenShorts has enough source evidence to map the product, so do not block setup on visual taste or stack preference.

## Hard-stop questions

| Question | Current answer / assumption | Reversible? | Architectural impact | Blocks setup? |
|---|---|---:|---|---:|
| Deployment posture | `trusted_local` self-hosted Docker default, with later private/public deployment possible | yes | local operator key entry, local storage, no public multi-tenant auth claim | no |
| Secrets and provider policy | provider keys are operator-supplied; `.env.example` must contain blanks only; browser-local key storage is not production-grade secret storage | partly | settings surface, server-side header forwarding, claim ceiling on public deployment | no |
| Destructive/data-loss behavior | social posting, scheduling, S3 upload, cleanup, and file deletion are real side effects; default phase proof must use dry-run/blockers unless keys and target accounts are explicitly supplied | yes | side-effect confirmation, audit logs, blocked live publish gates | no |
| Privacy/compliance exposure | user uploads long-form videos, website URLs, generated media, actors, API keys, and social accounts; assume copyrighted/private content may appear | partly | ownership attestation, retention policy, upload validation, no silent public gallery upload | no |
| Product/artifact identity | central artifact is a publish-ready vertical short-video package with script/captions/metadata and optional platform publishing | yes | central output contract and UI layout | no |

## Deferrable questions

- Exact production auth model for public/multi-user hosting.
- Whether social publishing should default to private/draft instead of public per platform.
- S3 bucket layout and retention policy for public gallery pages.
- Live provider spending limits, per-job budget caps, and approval workflow.

## Claim ceiling until answered

The packet may claim a local self-hosted operator console and provider seams. It must not claim safe public SaaS readiness, strong client-side secret encryption, compliant copyright handling, guaranteed provider costs, or successful live publishing without explicit proof.
