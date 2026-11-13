# Lead Intake & Polymath CRM Orchestration

Validates and scores a synthetic lead, then stops before writing to the user's Polymath CRM.

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

## CRM integration status
The CRM staging host is a static, read-only preview. Production API requests require Firebase authentication, and the normal login includes an email OTP. The existing lead-create route also runs CRM-side AI scoring and consumes the lead-scan quota. A personal login token is not appropriate as a persistent n8n credential.

Before live writes, the CRM needs a tenant-bound, least-privilege machine credential for n8n with explicit field scope, rotation/revocation, rate limits, audit logging, and idempotency. Do not use the read-only staging host for writes or bypass the Firebase login/OTP flow.

Store credentials directly in n8n Credentials. Keep API keys, webhook URLs/secrets, private payloads, and live exports out of this repository. Require human approval before CRM writes, sending messages, publication, or payment. See [PLAN.md](PLAN.md) for the integration prerequisites.
