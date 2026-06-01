# Verify And Review

Run local tests and a user-like smoke path.

Product smoke:

1. Start locally.
2. Create project `Civic Rumor Drill`.
3. Paste evidence with actors/platform/risk.
4. Generate ontology and inspect results.
5. Change evidence and verify output changes.
6. Reload/restart and verify persistence.
7. Export JSON.

Architecture review:

- Is domain extraction testable without UI?
- Is persistence testable without browser?
- Are provider boundaries honest?
- Does UX make the next action obvious?
- Did architecture work improve the product, or just add ceremony?
