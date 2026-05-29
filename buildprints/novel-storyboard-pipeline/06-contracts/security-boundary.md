# Security Boundary Contract

## When Active

Use this role when a phase touches auth, sessions/tokens, provider secrets, uploads/media, arbitrary code execution, user/project data, destructive actions, or public deployment posture.

## Handoff Scope

- Protect users, projects, provider credentials, generated media, and task traces.
- Require secure first-run admin setup for public posture.
- Ensure all sensitive behavior has hardening artifacts before qualification.

## Reject If

- Source default credentials are shipped as production credentials.
- Secrets appear in frontend state, logs, screenshots, fixtures, or evidence.
- Arbitrary provider code can run without sandboxing and audit controls.
- Media URLs bypass project/user authorization.
- Destructive actions lack confirmation, authorization, or recovery strategy.

## Required Return Headings

- Sensitive Surfaces
- Auth/Session Review
- Secret Handling Review
- Media/Data Access Review
- Abuse/Rate Limit Review
- Required Repairs

## Proof/Evidence Expectations

Require tests for unauthorized access, cross-project isolation, secret redaction, upload/media access policy, and secure bootstrap.
