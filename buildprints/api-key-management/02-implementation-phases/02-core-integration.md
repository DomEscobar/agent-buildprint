# 02 Core Integration

## Objective

Implement the reusable API key core that routes, middleware, and UI can call.

## Required inputs

- API key contract from phase 01
- owner identity contract
- persistence helper or model
- selected scope model
- host crypto/runtime primitives

## Instructions

Implement or adapt:

- secure random key generation
- stable key format with non-secret prefix
- one-time secret return path
- hash derivation and verification helper
- prefix lookup plus full hash comparison
- scope check helper
- revoke helper
- rotate or replacement helper
- last-used or audit event update helper

The core must keep key generation, verification, persistence, and route handling separate where the host architecture allows it.

## Proof before moving on

- generated key returns full secret only from creation helper
- stored state contains hash and prefix, not the full secret
- verify helper denies missing, malformed, revoked, expired, and wrong-scope keys
- scope helper defaults to deny when scope is unknown

## DO NOT

- Do not use predictable key material.
- Do not compare only prefixes.
- Do not log full key secrets.
- Do not mix request parsing, hash verification, persistence, and UI in one untestable block unless the host is extremely small and the plan says so.
