# Security Boundary Contract

## Role

Protect auth, provider secrets, uploads/media paths, destructive actions and generated evidence.

## Requirements

- API and socket reject unauthorized users.
- Default credentials are setup-only, force-rotated or otherwise not production-ready.
- Provider secrets stay server-side and never appear in logs, client bundle, screenshots or evidence files.
- Upload/media paths prevent traversal and unauthorized reads.
- Destructive actions require authorization and confirmation.

## Must Reject

- Hardcoded production credentials.
- Secret values copied into generated docs or evidence.
- Public provider keys in browser code.
- Delete/clear actions without guardrails.

## Review Gate

Security tests are required for auth rejection, invalid socket token, default credential mitigation and secret redaction.
