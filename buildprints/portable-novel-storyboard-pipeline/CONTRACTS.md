# CONTRACTS

## Stable Product Contracts

| Contract | Required behavior | Proof |
|---|---|---|
| Project workspace | Create/select project, model choices, and local auth/session gate. | API smoke, browser project flow, invalid token negative test. |
| Novel ingestion | Import 3 ordered chapters and preserve order through restart. | Persistence roundtrip and order assertion. |
| Event extraction | Deterministic provider returns 3 successful event records and malformed provider output fails without corrupting state. | Contract tests and evidence row. |
| Script pipeline | Outline, strategy, script, and asset extraction are structured artifacts, not prose-only UI. | Unit tests and rendered UI proof. |
| Storyboard flow | Director plan, storyboard table, and storyboard panel rows persist and hydrate into the workbench. | Restart/readback and browser screenshot. |
| Media jobs | Mock image/video adapters create task records with pending/running/success/failure states. | Adapter tests and UI task state proof. |
| Preview export | Export contains chapters, events, scripts, assets, storyboard rows, tracks, media records, task log, and limitations. | Manifest fixture parsed from rendered UI. |

Implementation choices are free when these contracts and proof gates are preserved.

