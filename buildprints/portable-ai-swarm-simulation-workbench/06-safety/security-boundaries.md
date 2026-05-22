# Security Boundaries

Sensitive surfaces: uploads, provider credentials, graph memory content, generated reports/logs, subprocess simulation runtime, delete/reset actions, and user-provided simulation prompts.

Requirements: extension and size validation, content-type checking where practical, path traversal prevention, secret redaction, provider-log minimization, destructive confirmations, subprocess argument allowlists, rate/round limits, and explicit test-double/live-provider labeling.
