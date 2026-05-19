# Decomposition Strategy Contract

Mapper OS must classify repository size and decompose medium/large/high-pressure/system projects before implementation extraction.

## Required classification

Every discovery output must record:

- size class: `small`, `medium`, `large`, or `monorepo-system`;
- evidence for the classification;
- recommended output mode;
- latest safe starting phase;
- why a one-giant-Buildprint path is safe or unsafe.

## Required decomposition for medium/large/high-pressure/system repos

For each domain, feature, app, package, worker, or system slice, record:

- responsibilities;
- included paths;
- excluded paths;
- dependencies and shared contracts;
- cross-slice risks;
- recommended candidate order;
- implementation phase depth;
- validation/test strategy;
- blockers before extraction;
- capabilities to exclude rather than fake.

## Safe extraction rule

Large repos and monorepos must not proceed to one broad implementation Buildprint unless the user supplied a bounded scope/candidate or explicitly requested an architecture-only System Buildprint.

Default safe path:

```txt
repo census
-> size/topology classification
-> system map
-> decomposition strategy
-> candidate Buildprints
-> scope decision
-> selected feature-slice extraction
-> focused reversal/product proof
-> later system synthesis only when requested or evidence exists
```

## Candidate readiness

A candidate is ready for extraction only when it has:

- a testable feature slice;
- clear included/excluded paths;
- dependency boundaries;
- edge/failure-mode inventory;
- concrete QA commands or proof strategy;
- no-fake boundary for mocks, providers, persistence, routes, controls, and exports.

If these are missing, the latest safe starting phase is candidate refinement, not implementation.
