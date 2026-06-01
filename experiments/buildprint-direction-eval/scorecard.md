# Product Quality Scorecard

Score each dimension 1-5 before reading any handover/proof text.

1 = broken/fake/generic. 3 = acceptable prototype. 5 = product-quality for the constrained local build.

## 1. Central artifact quality

Does the core artifact feel real and useful, not decorative?

For Novel Storyboard/MiroFish: the graph/canvas/storyboard workbench should represent meaningful user input, support selection/inspection, and guide the next action. Token bubbles, static SVGs, inert cards, and generic dashboards score low.

## 2. Workflow completeness

Can a user complete the intended loop without guessing?

Intake -> workbench artifact -> simulation/runtime or deterministic substitute -> report/storyboard -> interaction/history. Partial loops are allowed only when the blockage is honest and product-shaped.

## 3. State survival and readback

Does meaningful work survive reload/restart where local persistence is expected? Can the user return to prior artifacts without redoing everything?

## 4. Honest boundaries

Are missing credentials, live providers, destructive actions, uploads, and deployment boundaries represented honestly? No fake live behavior. No mock path pretending to be production.

## 5. Interaction quality

Do visible controls work? Are loading/error/empty/retry states usable? Does changing input change output meaningfully? Are next actions obvious?

## 6. Product language and taste

Does the UI speak the domain language and have a distinct product direction? Penalize generic SaaS words, raw debug labels, proof/evidence jargon, and internal harness language leaking into product UI.

## 7. Slop resistance

How much AI residue remains?

Penalize placeholders, TODO-visible behavior, hallucinated imports, dead code, swallowed errors, fake comments, duplicate helpers, huge tangled functions, raw JSON escape hatches, canned outputs, and self-congratulatory handover that hides bad product.

## Critical notes

Record the top 3 concrete defects. Screenshots or file references are stronger than prose.

## Verdict

- Total: /35
- Critical regression? yes/no
- Would this embarrass us in a 60-second screen recording? yes/no
- First repair I would make:
