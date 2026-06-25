# Phase 02 - Core Evolution Loop

## Objective

Implement the population -> mutation -> sandboxed evaluation -> selection -> archive loop.

## How to implement this phase

Start with a small local loop: baseline plus at least two candidates. Generate mutations as patches against allowed paths, validate the patch, materialize candidate workspaces, run the evaluator inside sandbox limits, parse scores, store lineage, and select a winner or no-improvement result. Keep model-judge notes advisory.

## Required output

- mutation engine;
- candidate materialization;
- evaluator runner;
- score parser;
- selection policy;
- archive persistence;
- checkpoint/resume path.

## Proof before moving on

Run one complete bounded cycle with two or more candidates and record baseline, candidate scores, selected winner, and lineage.

## DO NOT

- Do not execute candidates without timeout and memory limits.
- Do not accept patches outside the mutation scope.
- Do not treat mocked/sample data or functionless buttons as runtime proof.

