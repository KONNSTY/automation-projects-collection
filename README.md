# Automation Projects Collection

Eight n8n automation portfolio projects: four synthetic integration demos and four advanced control-plane demos. Each folder contains its own implementation plan, importable workflow, JavaScript Code-node scripts, and guide.

## Demo safety
- Workflows use a manual trigger and synthetic sample data.
- No API credentials, live webhook URLs, private data, external writes, messages, posts, or payments are configured.
- Store future credentials in n8n Credentials. Never commit credentials or private payloads.
- Live integration work is pending the credential and data-scope setup described in each `PLAN.md`.

## Projects
- [Lead Intake & CRM Orchestration](lead-to-crm/README.md)
- [AI Support Triage Copilot](ai-support-triage/README.md)
- [Content Repurposing Pipeline](content-repurposing/README.md)
- [Invoice Intake & Reconciliation](invoice-reconciliation/README.md)
- [AI Knowledge Release Control Plane](ai-knowledge-release/README.md)
- [AI Agent Regression & Release Gate](ai-agent-release-gate/README.md)
- [SLO Incident Orchestrator](slo-incident-orchestrator/README.md)
- [Access Lifecycle Governance](access-lifecycle-governance/README.md)

## Implementation plans
- [Lead → Polymath CRM](lead-to-crm/PLAN.md)
- [Gmail → OpenAI triage → Gmail draft](ai-support-triage/PLAN.md)
- [WordPress → OpenAI → Buffer drafts](content-repurposing/PLAN.md)
- [Lexware Office read-only reconciliation](invoice-reconciliation/PLAN.md)
- [Governed RAG knowledge release](ai-knowledge-release/PLAN.md)
- [AI agent regression and release gates](ai-agent-release-gate/PLAN.md)
- [SLO-based incident orchestration](slo-incident-orchestrator/PLAN.md)
- [Joiner/mover/leaver access governance](access-lifecycle-governance/PLAN.md)

## Import and run
For each project, use **Overview → Add workflow → Import from File** and select its `workflow.json`. Save the workflow and click **Execute Workflow**. Inspect the branch outputs. Workflows are inactive and have no webhook triggers.

Each `scripts/demo.js` is the source for the code embedded in the workflow. Keep both aligned when changing the demo.

The original four n8n demo workflows were executed with synthetic data on 2026-11-13. The four advanced workflows were imported and executed successfully with synthetic scenarios on 2026-11-15. All eight remain inactive and use no live accounts or credentials.
