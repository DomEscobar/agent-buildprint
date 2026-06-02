<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Buildprint v4 — Typed Product-Quality System</title>
  <style>
    :root {
      color-scheme: light dark;
      --bg: #faf8f4;
      --panel: #ffffff;
      --panel-soft: #f3eee7;
      --ink: #1d1712;
      --muted: #6f645b;
      --line: #e5dbcf;
      --accent: #d97706;
      --accent-soft: #fff3d0;
      --good: #047857;
      --bad: #b91c1c;
      --code: #17120d;
      --code-ink: #f3eadf;
      --shadow: 0 20px 60px rgba(29, 23, 18, 0.08);
      --radius: 22px;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #11100d;
        --panel: #1b1814;
        --panel-soft: #242019;
        --ink: #f2eadf;
        --muted: #a99d90;
        --line: #342e26;
        --accent: #f59e0b;
        --accent-soft: #2d2109;
        --code: #0b0907;
        --code-ink: #f3eadf;
        --shadow: 0 20px 60px rgba(0, 0, 0, 0.28);
      }
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      background:
        radial-gradient(circle at top left, color-mix(in srgb, var(--accent) 12%, transparent), transparent 34rem),
        var(--bg);
      color: var(--ink);
      line-height: 1.6;
    }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }
    .wrap { width: min(1180px, calc(100% - 36px)); margin: 0 auto; }
    header { padding: 72px 0 34px; }
    .eyebrow { color: var(--accent); font-weight: 800; letter-spacing: .12em; text-transform: uppercase; font-size: .76rem; }
    h1 { font-size: clamp(2.35rem, 6vw, 5.4rem); line-height: .96; letter-spacing: -.07em; max-width: 940px; margin: 14px 0 22px; }
    .lede { font-size: clamp(1.05rem, 2vw, 1.35rem); color: var(--muted); max-width: 820px; }
    .hero-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 22px; margin-top: 34px; }
    .card, .phase, .rule, .artifact, .callout {
      background: color-mix(in srgb, var(--panel) 92%, transparent);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
    }
    .card { padding: 24px; }
    .card h2, .card h3, .phase h3 { margin: 0 0 10px; line-height: 1.15; }
    .muted { color: var(--muted); }
    .pill-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
    .pill { border: 1px solid var(--line); background: var(--panel-soft); border-radius: 999px; padding: 7px 11px; font-size: .86rem; color: var(--muted); }
    nav { position: sticky; top: 0; z-index: 10; backdrop-filter: blur(14px); background: color-mix(in srgb, var(--bg) 86%, transparent); border-block: 1px solid var(--line); }
    nav .wrap { display: flex; gap: 14px; overflow: auto; padding: 10px 0; }
    nav a { white-space: nowrap; color: var(--muted); font-size: .9rem; padding: 6px 10px; border-radius: 999px; }
    nav a:hover { background: var(--panel-soft); color: var(--ink); text-decoration: none; }
    section { padding: 54px 0; border-bottom: 1px solid var(--line); }
    section h2 { font-size: clamp(1.65rem, 3vw, 2.7rem); line-height: 1.05; letter-spacing: -.04em; margin: 0 0 16px; }
    section > .wrap > p { max-width: 780px; color: var(--muted); }
    .two { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 22px; }
    .three { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 22px; }
    .phase { padding: 22px; position: relative; overflow: hidden; }
    .num { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--accent); font-weight: 800; font-size: .78rem; margin-bottom: 10px; }
    ul { margin: 12px 0 0; padding-left: 1.1rem; color: var(--muted); }
    li + li { margin-top: 6px; }
    .ok { color: var(--good); font-weight: 700; }
    .bad { color: var(--bad); font-weight: 700; }
    pre { margin: 20px 0 0; padding: 22px; overflow: auto; border-radius: 18px; background: var(--code); color: var(--code-ink); font-size: .9rem; line-height: 1.55; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
    :not(pre) > code { background: var(--panel-soft); border: 1px solid var(--line); border-radius: 6px; padding: .08em .32em; }
    .callout { padding: 24px; background: var(--accent-soft); border-color: color-mix(in srgb, var(--accent) 35%, var(--line)); }
    .callout strong { color: var(--accent); }
    .artifact { padding: 20px; }
    .artifact .path { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--accent); font-size: .85rem; margin-bottom: 8px; }
    .matrix { display: grid; gap: 10px; margin-top: 22px; }
    .row { display: grid; grid-template-columns: 210px 1fr; gap: 12px; padding: 14px 16px; border: 1px solid var(--line); border-radius: 14px; background: var(--panel); }
    .row strong { color: var(--ink); }
    footer { padding: 44px 0 70px; color: var(--muted); }
    @media (max-width: 820px) {
      .hero-grid, .two, .three { grid-template-columns: 1fr; }
      .row { grid-template-columns: 1fr; }
      header { padding-top: 46px; }
    }
  </style>
</head>
<body>
  <header>
    <div class="wrap">
      <div class="eyebrow">Buildprint v4 draft</div>
      <h1>Typed Product-Quality System</h1>
      <p class="lede">A Buildprint family for different artifact types: keep the same goal, boundary, quality, and verification kernel, then specialize the execution spine for product apps, integrations, frameworks, services, and automations.</p>
      <div class="hero-grid">
        <div class="card">
          <h2>The v4 invariant</h2>
          <p class="muted">Every Buildprint must produce a usable artifact for its real consumer. The artifact type changes the spine; the quality contract does not: goal, first loop, boundaries, state/failure honesty, verification, handover.</p>
          <div class="pill-row">
            <span class="pill">typed kernel</span>
            <span class="pill">consumer/operator-first</span>
            <span class="pill">loop-first</span>
            <span class="pill">boundary-aware</span>
            <span class="pill">quality gates</span>
          </div>
        </div>
        <div class="card">
          <h3>Why v4 exists</h3>
          <p class="muted">The evals showed two things at once: Consumer-First wins normal-user product apps, while Developer-First wins plugin/integration slices. v4 should not force one universal phase list; it should select the right spine for the artifact type.</p>
        </div>
      </div>
    </div>
  </header>

  <nav>
    <div class="wrap">
      <a href="#shift">Shift</a>
      <a href="#types">Types</a>
      <a href="#structure">Structure</a>
      <a href="#phases">Phases</a>
      <a href="#loops">Loops</a>
      <a href="#states">States</a>
      <a href="#slices">Slices</a>
      <a href="#gates">Gates</a>
      <a href="#template">Template</a>
    </div>
  </nav>

  <section id="shift">
    <div class="wrap">
      <h2>From one winning structure to a typed family</h2>
      <p>Consumer-First v2 worked for normal-user product slices. CheckoutBridge showed a plugin/integration needs a different spine: adoption contract, adapter seams, idempotency, recovery, audit trail. Buildprint v4 keeps the shared quality kernel, but stops pretending every artifact is a product app.</p>
      <div class="two">
        <div class="card">
          <h3>Shared kernel</h3>
          <pre><code>observable goal
acceptance criteria
first successful loop
state/boundary honesty
verification evidence
handover</code></pre>
        </div>
        <div class="card">
          <h3>Typed spine</h3>
          <pre><code>product app: UX/result/state
integration: configure/adapter/events
framework: adoption/seams/examples
service: state/failure/observability
automation: task/approval/trace</code></pre>
        </div>
      </div>
    </div>
  </section>

  <section id="types">
    <div class="wrap">
      <h2>Artifact type comes before phase design</h2>
      <p>The first Buildprint decision is not “which files do we generate?” It is “what kind of artifact is the agent building, and who experiences success?”</p>
      <div class="three">
        <div class="phase"><div class="num">APP</div><h3>Product app</h3><p class="muted">Use Consumer-First: first-run UX, result composition, domain state/export, architecture garden, screenshot critique.</p></div>
        <div class="phase"><div class="num">INT</div><h3>Plugin / integration</h3><p class="muted">Use Developer/Integration-First: install/configure loop, adapter seams, first host action, events, idempotency, recovery, audit trail.</p></div>
        <div class="phase"><div class="num">SVC</div><h3>Backend service</h3><p class="muted">Use Reliability-First: state machine, transaction path, retry/failure recovery, observability, runbook, regression checks.</p></div>
      </div>
    </div>
  </section>

  <section id="structure">
    <div class="wrap">
      <h2>Recommended v4 directory structures</h2>
      <p>These are typed specializations. Product apps use Consumer-First. Plugins, SDKs, integrations, frameworks, CLIs, and agent tools use Developer-First. Both share the same quality kernel, but the files make different work obvious.</p>
      <h3>Consumer-First product app</h3>
      <pre><code>product-app-consumer-first/
├── BUILDPRINT.md
├── 00-product-system-alignment/
│   ├── product-promise.md
│   ├── user-segments.md
│   ├── primary-loops.md
│   ├── feature-map.md
│   ├── state-model.md
│   ├── architecture-boundaries.md
│   └── quality-bar.md
├── 01-shell-and-navigation/
│   ├── app-shell.md
│   ├── routes-and-views.md
│   ├── empty-loading-error-states.md
│   └── permission-and-auth-states.md
├── 02-core-loop-first/
│   ├── loop-goal.md
│   ├── first-run-path.md
│   ├── primary-action.md
│   ├── data-contracts.md
│   └── acceptance.md
├── 03-feature-slices/
│   ├── slice-template.md
│   ├── slice-001-*.md
│   └── slice-002-*.md
├── 04-state-and-data/
│   ├── state-machines.md
│   ├── persistence.md
│   ├── sync-and-cache.md
│   ├── import-export.md
│   └── failure-recovery.md
├── 05-domain-and-intelligence/
│   ├── domain-model.md
│   ├── evidence-grounding.md
│   ├── provider-boundaries.md
│   └── actionability-rules.md
├── 06-design-system-and-copy/
│   ├── visual-quality-bar.md
│   ├── components.md
│   ├── copy-quality-bar.md
│   └── progressive-disclosure.md
├── 07-architecture-garden/
│   ├── module-boundaries.md
│   ├── refactor-budget.md
│   ├── test-strategy.md
│   └── dependency-rules.md
├── 08-verification/
│   ├── user-journeys.md
│   ├── smoke-tests.md
│   ├── regression-checks.md
│   ├── screenshot-review.md
│   └── release-gates.md
└── HANDOVER.md</code></pre>

      <h3 style="margin-top:28px">Developer-First framework / integration</h3>
      <p class="muted">Use this when the real consumer is a developer or operator adopting a boundary: plugin, SDK, integration, CLI, framework, agent tool, or backend capability.</p>
      <pre><code>developer-first-framework/
├── BUILDPRINT.md
├── 01-questions.md
├── 02-project-setup.md
├── blueprint.yaml
├── 03-phases/
│   ├── phase-index.yaml
│   ├── phase-flow.md
│   ├── 01-adoption-contract.md
│   ├── 02-framework-seams.md
│   ├── 03-first-host-action.md
│   ├── 04-events-failures-observability.md
│   ├── 05-examples-and-docs.md
│   └── 99-final-review-handover.md
├── 04-review.md
├── 05-handover.md
└── generated/
    └── agent-prompt.md</code></pre>

      <div class="matrix">
        <div class="row"><strong>01-adoption-contract</strong><span class="muted">Developer persona, install/start/configure path, first success, extension promise.</span></div>
        <div class="row"><strong>02-framework-seams</strong><span class="muted">Adapter interfaces, provider boundary, event store, persistence, CLI/API/UI seams.</span></div>
        <div class="row"><strong>03-first-host-action</strong><span class="muted">One real example action: create session, run command, call SDK method, trigger workflow.</span></div>
        <div class="row"><strong>04-events-failures-observability</strong><span class="muted">Retries, idempotency, recovery states, logs, audit history, export/debug trace.</span></div>
        <div class="row"><strong>05-examples-and-docs</strong><span class="muted">Seeded examples, README snippets, inline safety notes, how to add one more adapter/event/action.</span></div>
      </div>
    </div>
  </section>

  <section id="phases">
    <div class="wrap">
      <h2>The product-app phase sequence</h2>
      <p>The Consumer-First specialization scales product apps by forcing the agent to stabilize shell, loops, state, slices, and architecture before piling on features.</p>
      <div class="three">
        <div class="phase"><div class="num">00</div><h3>Product system alignment</h3><p class="muted">Promise, users, primary loops, feature map, state model, boundaries, quality bar.</p></div>
        <div class="phase"><div class="num">01</div><h3>Shell + navigation</h3><p class="muted">Routes, app shell, global states, permissions, empty/loading/error states.</p></div>
        <div class="phase"><div class="num">02</div><h3>Core loop first</h3><p class="muted">One complete user loop that proves the product works end-to-end.</p></div>
        <div class="phase"><div class="num">03</div><h3>Feature slices</h3><p class="muted">Each feature lands vertically: UX, state, data, domain, tests, handover.</p></div>
        <div class="phase"><div class="num">04</div><h3>State + data</h3><p class="muted">State machines, persistence, sync/cache, import/export, recovery.</p></div>
        <div class="phase"><div class="num">05</div><h3>Domain intelligence</h3><p class="muted">Domain model, evidence grounding, provider boundaries, actionability.</p></div>
        <div class="phase"><div class="num">06</div><h3>Design + copy</h3><p class="muted">Visual quality, components, copy quality, progressive disclosure.</p></div>
        <div class="phase"><div class="num">07</div><h3>Architecture garden</h3><p class="muted">Refactor budget, module seams, dependency rules, test strategy.</p></div>
        <div class="phase"><div class="num">08</div><h3>Verification</h3><p class="muted">User journeys, smoke/regression tests, screenshots, release gates.</p></div>
      </div>
    </div>
  </section>

  <section id="loops">
    <div class="wrap">
      <h2>Primary loops, not page lists</h2>
      <p>For larger products, the Buildprint should define the loops a user repeats. Pages are implementation details of those loops.</p>
      <div class="matrix">
        <div class="row"><strong>Capture loop</strong><span class="muted">User adds evidence, context, files, notes, or inputs.</span></div>
        <div class="row"><strong>Generate loop</strong><span class="muted">Product produces analysis, draft, recommendation, or computed output.</span></div>
        <div class="row"><strong>Review loop</strong><span class="muted">User corrects, accepts, edits, or gives feedback.</span></div>
        <div class="row"><strong>Return loop</strong><span class="muted">User comes back later and continues without losing state.</span></div>
        <div class="row"><strong>Share/export loop</strong><span class="muted">User sends, exports, publishes, or hands off the result.</span></div>
      </div>
      <pre><code>Each loop must define:
- trigger
- user goal
- primary action
- success state
- empty/loading/error states
- data touched
- views involved
- verification path</code></pre>
    </div>
  </section>

  <section id="states">
    <div class="wrap">
      <h2>State model is a first-class artifact</h2>
      <p>Agents fail medium products when they invent UI states ad hoc. v4 makes states explicit before feature work.</p>
      <div class="two">
        <div class="card">
          <h3>Example states</h3>
          <ul>
            <li>anonymous</li>
            <li>onboarded</li>
            <li>project empty</li>
            <li>project has input</li>
            <li>analysis pending</li>
            <li>analysis ready</li>
            <li>analysis edited</li>
            <li>exported</li>
            <li>error / recovery</li>
          </ul>
        </div>
        <div class="card">
          <h3>State invariant</h3>
          <p class="muted">No UI without state. No state without UI. Every important state needs copy, primary action, recovery path, and test coverage.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="slices">
    <div class="wrap">
      <h2>Feature slices land vertically</h2>
      <p>A v4 feature is not a page or backend endpoint. It is a complete user-visible slice across UI, state, domain, data, tests, and handover.</p>
      <div class="three">
        <div class="artifact"><div class="path">slice-001-create-project.md</div><p class="muted">Create project, empty state, persistence, route, tests.</p></div>
        <div class="artifact"><div class="path">slice-002-add-evidence.md</div><p class="muted">Input UI, validation, storage, changed-state proof.</p></div>
        <div class="artifact"><div class="path">slice-003-generate-analysis.md</div><p class="muted">Domain logic, result UI, loading/error states, smoke test.</p></div>
        <div class="artifact"><div class="path">slice-004-review-analysis.md</div><p class="muted">Edit/accept workflow, state transitions, undo/recovery.</p></div>
        <div class="artifact"><div class="path">slice-005-export-report.md</div><p class="muted">Export action, payload contract, download-after-reload test.</p></div>
        <div class="artifact"><div class="path">slice-template.md</div><p class="muted">Reusable contract for future feature drops.</p></div>
      </div>
    </div>
  </section>

  <section id="gates">
    <div class="wrap">
      <h2>Quality gates from eval lessons</h2>
      <p>v4 combines the best pieces from Microfish product-app evals and CheckoutBridge plugin/integration evals.</p>
      <div class="two">
        <div class="card">
          <h3 class="ok">Do</h3>
          <ul>
            <li>Choose artifact type before choosing phase spine.</li>
            <li>Product apps: consumer-first UX before expert detail.</li>
            <li>Integrations: test-mode configure loop and adapter seams before polish.</li>
            <li>One obvious primary action per state or operator step.</li>
            <li>Observable idempotency/recovery where the artifact requires it.</li>
            <li>Real local checks and user/operator journey review before handover.</li>
          </ul>
        </div>
        <div class="card">
          <h3 class="bad">Reject</h3>
          <ul>
            <li>One universal phase list forced onto every artifact.</li>
            <li>Expert dashboard first screens for product apps.</li>
            <li>Fake live-mode success for integrations.</li>
            <li>Secrets, credentials, retries, or failures handled only in prose.</li>
            <li>Generic next actions like “check if this matters.”</li>
            <li>Tests that do not match real selectors, commands, or operator flows.</li>
          </ul>
        </div>
      </div>
      <div class="callout" style="margin-top:22px">
        <strong>v4 scoring rule:</strong> An artifact is not done because components exist. It is done when the artifact-type loop works, boundaries are honest, failure states are observable, and verification evidence names the exact journeys or operator flows that passed.
      </div>
    </div>
  </section>

  <section id="template">
    <div class="wrap">
      <h2>Minimal slice template</h2>
      <p>Every feature slice in v4 should answer this before implementation starts.</p>
      <pre><code># Slice: &lt;name&gt;

## User loop
Which primary loop does this slice complete or improve?

## User-visible outcome
What can the user do after this slice that they could not do before?

## Views and states
- routes/views touched
- empty state
- loading state
- success state
- error/recovery state

## Primary action
One primary action for this state. Name the button/link exactly.

## Data and domain contracts
- inputs
- outputs
- persistence
- provider boundaries
- export/import shape if relevant

## Copy and evidence rules
- plain-language labels
- no jargon before value
- evidence/grounding if intelligence is used
- concrete next action rule

## Tests and gates
- unit tests
- state transition tests
- smoke/user journey
- screenshot review
- npm run check

## Handover evidence
Commands run, artifacts produced, known blockers, next slice.</code></pre>
    </div>
  </section>

  <footer>
    <div class="wrap">
      <p>Buildprint v4 draft — synthesized from Consumer-First product-app lessons, CheckoutBridge integration/plugin lessons, and the typed Buildprint family conclusion.</p>
    </div>
  </footer>
</body>
</html>
