# Verify

Run the strongest local checks available. Prefer:

```bash
npm test
npm run lint
npm run smoke
npm run build
```

If using another stack, equivalent checks are acceptable.

Manual smoke path:

1. Start the product.
2. Create project `Civic Rumor Drill`.
3. Paste evidence mentioning at least three actors, one platform, and one risk.
4. Generate ontology.
5. Confirm entities/relations/assumptions appear.
6. Change evidence and confirm output changes.
7. Reload/restart and confirm readback.
8. Export JSON and inspect it contains project, evidence digest, entities, relations, assumptions, provider status, and timestamp.

If any step fails, repair and rerun. If blocked, document exact blocker and remaining local proof.
