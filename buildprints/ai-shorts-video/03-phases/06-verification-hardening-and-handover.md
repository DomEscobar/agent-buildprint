# Phase 06 - Verification, Hardening, And Handover

## How to implement this phase

Run the product as an operator would, then harden the gaps that block credible handover.

## Building objective

Verify the full OpenShorts path across setup, dashboard, backend, render worker, media outputs, provider blockers/live paths, error handling, and documentation. Repair visible slop, generic output, unsafe publishing flows, secret leakage, oversized/mobile UI failures, and unclear recovery states.

## DO NOT

- Do not treat Docker build success as product proof.
- Do not skip browser review for UI paths.
- Do not claim complete provider integration when only local seams were tested.
- Do not leave handover with ambiguous next steps.

## Minimum proof before moving on

- Build/lint/type/test commands for backend, dashboard, render service, or recorded blockers.
- Browser screenshots for settings, processing, completed output, blocked provider, and publish confirmation.
- API/runtime proof for health, job status, render status, and artifact readback.
- Secret scan of docs/examples/logs for accidental real keys.
- Updated README/HANDOVER with exact claim ceilings.

## Handoff note

Record final verified commands, screenshots/artifacts, unresolved blockers, not-proven claims, and safe next implementation route.
