# Buildprint Mapper OS

Turn an existing repo into a scoped, reviewable Buildprint submission.

Use it when:

- you have a project and want to publish its reusable architecture as a Buildprint,
- the repo is too large for a single prompt summary,
- you need candidate Buildprints before choosing scope,
- you want a full hierarchical System Buildprint.

Recommended flow:

```bash
agb map ./my-project --out .project.buildprint
```

Then use the mapper prompt to produce either:

- candidate Buildprints,
- one selected module Buildprint,
- or a full System Buildprint with submodules.

Safety posture: no secrets, no app-code modification, no invented validation results.
