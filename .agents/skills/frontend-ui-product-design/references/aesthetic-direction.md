# Aesthetic Direction

Use this when choosing the visual style, after the structure is picked. Anti-slop rules tell you what to avoid; this tells you what to commit to. The output is a named direction with concrete type, color, shape, and motion choices, not "modern, clean, minimal".

## Pick One Primary Direction From The Product Job

Commit to one of these as the base, then adapt it to the product. Do not blend three.

- Functional-minimal (Rams/Swiss lineage): operator tools, agent runtimes, review/decision tools, dense data. One tight neutral sans (for example Geist, Inter Tight, IBM Plex Sans) used strictly; mono for ids, code, timestamps, and data. Near-neutral base plus one functional accent where color means state, not decoration. Strict 4/8 spacing scale, generous gutters. Small consistent radii, hairline borders over shadows. Motion only on state change.
- Editorial/document: reading, writing, long-form, publishing. Display serif for headings (for example Fraunces, Instrument Serif) with a clean body sans; strong column rhythm, generous margins, one editorial accent, drop caps or pull quotes where earned.
- Warm-approachable (Scandinavian lineage): consumer onboarding, creator tools, friendly setup. Rounded humanist sans (for example Nunito, Cera, Plus Jakarta), warm neutrals (no pure black), soft large-blur shadows, 8-12px radii, gentle easing.
- Technical/terminal: power-user CLIs, dev runtimes, log/inspection surfaces. Monospace-forward, high density, keyboard-first affordances, restrained accent, visible structure.
- Expressive/brand-forward: marketing, landing, hero, launch pages only. Bold display type, color blocks, motion. Do not use this for an operational product surface.

## Commit To Concrete Tokens

After picking a direction, name the actual choices, not adjectives:

- The exact display and body font families, and the mono family if data is shown.
- The base background/surface neutrals and the single functional/brand accent.
- The spacing scale base and the radius scale.
- Borders-over-shadows or shadows-over-borders, stated once and kept.
- The motion stance: which moments animate and which do not.

## Rules

- Name the adjacent direction you rejected and why it does not fit the product job.
- Do not default a product that needs warmth or expression to functional-minimal, and do not default an operator tool to expressive.
- A direction is invalid if it reduces to "modern/clean/minimal/intuitive" with no committed type, color, shape, or motion choices.
- Never ship the unconsidered AI default: stock Inter plus a purple-to-blue gradient plus an even card grid is a slop signal, not a direction.
