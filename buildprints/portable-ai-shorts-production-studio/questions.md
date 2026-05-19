# Configuration Interview

Ask these only if the user did **not** say:

```txt
Use default studio preset.
```

Rules for the coding agent:

- Ask exactly these questions.
- Do not ask broad product strategy questions.
- Do not propose architecture changes.
- These answers configure the fixed full-webapp proof; they do not reduce acceptance.
- If the user skips a question, use `DEFAULT_PRESET.md`.

## Questions

1. **Stack preference** - keep stack flexible and let the agent choose the fastest full-webapp stack, or prefer React + FastAPI-compatible routes when practical?

2. **Sample product** - use the default LaunchPad CRM fixture, or provide a different product URL/manual description fixture?

3. **Studio visual style** - use clean SaaS/UGC production studio default, or choose another style direction?

4. **Provider validation mode** - mock/no-network only for this pass, or include optional live-provider sandbox validation after the mock proof passes and credentials/cost are approved?

5. **Publishing handoff** - mock/manual Upload-Post handoff only, or prepare selected platform payloads for TikTok/Instagram/YouTube while still not claiming direct platform publishing?

## Required Confirmation Summary

After answers, output:

```txt
Alignment summary
- Stack preference:
- Sample product fixture:
- Studio visual style:
- Provider validation mode:
- Publishing handoff target:
- Defaults kept:
- Defaults changed:

Reply "confirm" to build, or tell me what to change.
```

Do not implement before confirmation.
