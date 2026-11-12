# Implementation plan: Gmail support → OpenAI triage → Gmail draft

## Demo state
- The n8n workflow `AI Support Triage Copilot — Synthetic Demo` is imported and inactive.
- Its manual trigger and Code node use a synthetic ticket only. The fixture has been executed in n8n and emits a technical/normal classification plus a reply draft.
- It stops before Gmail or an AI call; `messageSent` is false.

## Target live flow
1. Gmail Trigger watches only a dedicated support label and unread messages; exclude sent mail, spam, attachments, and messages outside the agreed mailbox.
2. Minimize/redact personal data and secrets before classification. Never pass passwords, authentication codes, payment data, or unnecessary identifiers to a model.
3. After explicit approval of the exact support-data scope and OpenAI destination, send only the minimized subject/body to OpenAI for category, priority, summary, and reply suggestion. Validate structured output against an allowlist; fall back to deterministic rules on errors or invalid output.
4. Create a Gmail draft only. Do not send, forward, mark resolved, or alter the source message beyond an agreed processing label.
5. Log message ID, category, priority, model/version, and outcome without storing full body text. Bound retries and route repeated failures to a restricted review queue.

## Data and controls
- Live Gmail content can contain private or sensitive information. OpenAI transmission is disabled until the user approves the specific data categories and destination.
- The automation must never send a reply, process attachments, or infer decisions about eligibility, billing, or account access.
- Store Gmail and OpenAI credentials in n8n Credentials; do not place tokens, message exports, mailbox identifiers, or webhook details in Git.

## Setup still needed together
- Select the exact Gmail account, support label, retention policy, and allowed message scope.
- Create Gmail OAuth and OpenAI credentials in n8n by user-entered secrets.
- Approve the data-minimization/redaction policy and model use for this mailbox.
- Generate drafts from synthetic/redacted fixtures and review several before connecting the live label.

## Acceptance
- Synthetic fixture emits a category, priority, and response draft with `messageSent: false`.
- No Gmail read or OpenAI request happens while the workflow is in demo mode.
- With approved setup, an allowed test ticket produces a draft only; sensitive patterns are redacted or blocked; no send action exists in the flow.
