# Architecture Diagram

```txt
Telegram/app input
  ↓
Runtime context builder ← user memory + self-state + journal + social drafts
  ↓
Persona response / planner
  ↓
Memory reflection     Life tick/calendar/journal
  ↓                   ↓
User memory       Self-state + content backlog
                      ↓
                Social planner
                      ↓
                Manager QA
                      ↓
              Mock publisher / handoff
```
