# Phase 01 - Contract And Config

## Objective

Define the candidate, mutation, score, evaluator, sandbox, archive, selection, budget, and receipt contracts.

## How to implement this phase

Create schemas or typed interfaces for candidate records, score records, lineage records, evaluator output, sandbox limits, mutation requests, forbidden paths, and run budgets. Wire config loading without putting provider secrets into candidate-accessible state. Use the host assessment and `.buildprint/capability-plan.md` as the source of truth.

## Required output

- candidate and score schema;
- mutation scope config;
- forbidden file list;
- evaluator command config;
- sandbox limit config;
- archive/checkpoint config;
- budget and plateau stop config.

## Proof before moving on

Show config validation passing and a rejected config when evaluator, sandbox, or mutation scope is missing.

## DO NOT

- Do not use placeholders for evaluator output.
- Do not allow functionless buttons or mocked/sample data as proof.
- Do not make candidate code able to read secrets by default.

