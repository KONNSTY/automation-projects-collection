# Content Repurposing Pipeline

Creates channel-specific drafts from a synthetic content brief and waits for editorial approval.

## Demo behavior
- Trigger: manual run in n8n.
- Input: synthetic fixture in `scripts/demo.js`.
- Processing: deterministic JavaScript in the n8n Code node.
- Safety: inactive by default; no live webhook, credentials, or external side effect.
- Approval: output requires a human; production action is intentionally not connected.

## Files
- `workflow.json`: importable n8n demo workflow.
- `scripts/demo.js`: Code-node source.

## Run
Import `workflow.json` into n8n, save, then select **Execute Workflow**. Inspect **Process Demo Input** output. If editing the script, copy the same code into the workflow Code node.

## Production integration points
Add real systems only after credentials and data scope are approved. Store credentials directly in n8n Credentials. Keep API keys, webhook URLs/secrets, and private payloads out of this public repository. Require human approval before CRM writes, sending messages, publication, or payment.
