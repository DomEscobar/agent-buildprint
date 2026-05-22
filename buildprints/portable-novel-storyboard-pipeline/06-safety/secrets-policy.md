# Secrets Policy

- Default proof uses deterministic no-network providers.
- Store only secret names or environment variable references in docs and manifests.
- Never print provider keys, auth secrets, cookies, or tokens.
- Live provider proof is optional and blocked until credentials are explicitly supplied.
- Evidence artifacts must redact request headers and provider payloads that contain secrets.

