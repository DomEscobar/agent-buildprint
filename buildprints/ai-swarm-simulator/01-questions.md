# Implementation Questions

Use these as an alignment gate before coding. If answers are unavailable, apply the AI-best-judgment default and record the decision in handover.

1. Deployment posture: trusted local app, private authenticated webapp, or public webapp?
   - Default: trusted local or private authenticated webapp. Public deployment blocks until auth, CORS, upload privacy, storage isolation, and rate limits are specified.

2. Provider verification: are sandbox credentials and budget available for the OpenAI-compatible dynamic LLM provider, open-source graph-memory runtime, and OASIS/CAMEL runtime?
   - Default: implement provider adapters and blocked/sandbox states; do not claim live success without credentials.

3. Persistence posture: should task state be durable across process restarts?
   - Default: persist project, simulation, report, logs, and outputs durably. Use durable task state if deployment is not trusted-local; otherwise clearly label volatile local task progress.

4. Destructive actions: should project deletion, graph deletion, report deletion, reset, stop, and close-environment controls be included?
   - Default: include stop/close with clear status. Include delete/reset only behind explicit confirmation and visible consequences.

5. Simulation defaults: what maximum rounds and agent counts are acceptable for first-run safety?
   - Default: small demo defaults, visible cost/runtime warning, and ability to increase only deliberately.

6. Data privacy: may uploaded seed text be sent to external providers?
   - Default: yes only after clear local/private deployment assumption and visible provider-boundary notice; otherwise block provider submission until policy is configured.

7. Bilingual surface: is Chinese/English parity required at launch?
   - Default: preserve bilingual-ready structure and the main workflow labels in both languages.
