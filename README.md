# Automation Projects Collection

Four mid/senior-level n8n automation projects. Each folder contains its own implementation plan, importable workflow, JavaScript Code-node script, and guide.

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

## Implementation plans
- [Lead → HubSpot](lead-to-crm/PLAN.md)
- [Gmail → OpenAI triage → Gmail draft](ai-support-triage/PLAN.md)
- [WordPress → OpenAI → Buffer drafts](content-repurposing/PLAN.md)
- [Lexware Office read-only reconciliation](invoice-reconciliation/PLAN.md)

## Import and run
For each project, use **Overview → Add workflow → Import from File** and select its `workflow.json`. Save the workflow and click **Execute Workflow**. Inspect the Code node output. Workflows are inactive and have no webhook triggers.

Each `scripts/demo.js` is the source for the code embedded in the workflow. Keep both aligned when changing the demo.

The four n8n demo workflows were each executed successfully with synthetic data on 2026-11-13. They remain inactive and do not connect to live accounts.
