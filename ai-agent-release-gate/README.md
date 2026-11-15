# AI Agent Regression & Release Gate

A release-control workflow for tool-using AI agents. It runs synthetic golden cases through deterministic safety and quality checks, blocks regressions, and creates a human approval package for passing candidates.

## Demo
- Manual trigger with a synthetic golden suite and fixed candidate outputs.
- Covers schema checks, grounded citation presence, unsafe tool intent, refusal cases, regression thresholds, candidate/suite identity, and review routing.
- No model call, production prompt update, or agent tool execution occurs.

## Files
- `workflow.json`: importable inactive n8n workflow.
- `scripts/seed.js`: synthetic candidate and golden suite.
- `scripts/demo.js`: deterministic evaluator.
- `PLAN.md`: release-control architecture and acceptance criteria.

Import `workflow.json`, execute manually, and inspect the approval and blocked branches. Scores are portfolio fixtures, not real-world benchmark claims.
