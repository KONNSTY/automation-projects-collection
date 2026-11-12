# Automation Projects Collection

Four senior-leaning n8n automation demos. Each project folder contains an importable workflow, its JavaScript Code-node script, and a guide.

## Demo safety
- Workflows use a manual trigger and synthetic sample data.
- No API credentials, live webhook URLs, private data, external writes, messages, posts, or payments are configured.
- Store future credentials in n8n Credentials. Never commit credentials or private payloads.

## Projects
- [Lead Intake & CRM Orchestration](lead-to-crm/README.md)
- [AI Support Triage Copilot](ai-support-triage/README.md)
- [Content Repurposing Pipeline](content-repurposing/README.md)
- [Invoice Intake & Reconciliation](invoice-reconciliation/README.md)

## Import and run
For each project, use **Overview → Add workflow → Import from File** and select its `workflow.json`. Save the workflow and click **Execute Workflow**. Inspect the Code node output. Workflows are inactive and have no webhook triggers.

Each `scripts/demo.js` is the source for the code embedded in the workflow. Keep both aligned when changing the demo.

