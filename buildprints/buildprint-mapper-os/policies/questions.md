# Buildprint Mapper Question Policy

The mapper asks minimal, high-impact questions only.

## Ask Only When

- the answer changes selected scope;
- the answer changes hardening requirements;
- provider access or credentials affect qualification;
- user intent is required to choose full-suite vs smaller complete scope;
- source evidence reveals a preserve-vs-fix decision.

## Do Not Ask

- broad product strategy questions;
- questions answerable from source;
- architecture preference questions for downstream implementation;
- long pre-discovery questionnaires.

## Default

If a question is non-blocking, record it in the output as `QUESTION` and continue with discovery. If it affects auth, billing, user data, providers, destructive actions, or qualification, block instead of guessing.
