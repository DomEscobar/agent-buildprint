# Product Contract: project-workspace-auth

The implementation must provide a local trusted-development workspace with:

- create/select project;
- model/provider choices stored with project context;
- auth/session gate for API and realtime paths;
- visible unauthenticated, expired-session, empty-project, success, and error states;
- durable persistence with restart/readback proof.

Do not copy Toonflow default credentials. Do not claim production auth until security review passes.

