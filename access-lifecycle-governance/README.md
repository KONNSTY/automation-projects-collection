# Access Lifecycle Governance

A policy-driven joiner/mover/leaver workflow that checks least privilege, separation of duties, approval requirements, and expiry before producing an identity-change plan.

## Demo
- Manual trigger with synthetic requests and an entitlement policy.
- Covers privileged approval thresholds, SoD conflict denial, expiry, duplicate request suppression, and leaver review plans.
- Produces plans only; no account or permission changes are possible in demo mode.

## Files
- `workflow.json`: importable inactive n8n workflow.
- `scripts/seed.js`: synthetic lifecycle requests.
- `scripts/demo.js`: deterministic policy evaluator.
- `PLAN.md`: production architecture and acceptance criteria.

Import `workflow.json`, execute manually, then inspect approval-required and denied branches. Never use synthetic policy as a substitute for an organization’s approved access policy.
