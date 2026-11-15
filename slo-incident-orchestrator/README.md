# SLO Incident Orchestrator

A reliability automation that evaluates multi-window SLO burn, groups duplicate symptoms, suppresses recovered alerts, and prepares an evidence-backed incident package for human review.

## Demo
- Manual trigger with synthetic metric windows.
- Covers validation, short/long window burn rates, impact scoring, alert fingerprint deduplication, recovery suppression, and safe runbook suggestions.
- No paging, chat notification, or remediation API is connected.

## Files
- `workflow.json`: importable inactive n8n workflow.
- `scripts/seed.js`: synthetic healthy, breach, duplicate, and recovery events.
- `scripts/demo.js`: deterministic incident evaluation.
- `PLAN.md`: production architecture and acceptance criteria.

Import `workflow.json` and inspect the incident-review and observe/suppressed branches. Thresholds are illustrative, not production SLO advice.
