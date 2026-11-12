# Implementation plan: Lead intake → HubSpot

## Demo state
- The n8n workflow `Lead Intake & CRM Orchestration — Synthetic Demo` is imported and inactive.
- Its manual trigger and Code node use a synthetic fixture only. The fixture has been executed in n8n and emits a valid, normalized lead with a score of 60.
- The demo stops before any CRM write.

## Target live flow
1. Receive a lead through a signed n8n webhook from the agreed lead source. The HubSpot Service Key is for the CRM API; HubSpot Service Keys do not support webhook subscriptions.
2. Validate required contact/company fields, normalize email and region, and check contact consent. Reject malformed items into a restricted error path without echoing personal values into logs.
3. Deduplicate by normalized email and existing HubSpot contact ID. Apply deterministic scoring and record score explanation/source.
4. Present a proposed HubSpot contact create/update action for human approval. A negative decision ends the run; an approved decision writes only the agreed contact properties with a least-privilege service key.
5. Return an execution reference and a data-minimized audit record. Retry transient API errors with bounded backoff; route permanent validation/API errors to a restricted failure queue.

## Data and controls
- Minimum fields: name, email, company text, source, region, consent flag, and received timestamp. No sensitive free-text is needed for scoring.
- The service key should have only `crm.objects.contacts.read` and `crm.objects.contacts.write` for this design. Store it in n8n Credentials; keep its use restricted to the native HubSpot node. No outreach is sent by this workflow.
- Consent false blocks outreach eligibility; human review is required before any CRM mutation.
- No live contact data, credential, webhook URL, or webhook secret belongs in this repository.

## Setup still needed together
- Confirm the lead source, contact-property mapping, and approval destination.
- Create the scoped HubSpot Service Key in HubSpot, enter it directly in n8n, and create the signed webhook/auth credential in n8n. Register the webhook only with the approved source.
- Run a synthetic dry run, then one explicitly approved test contact before enabling the live trigger.

## Acceptance
- Synthetic fixture succeeds and emits the expected normalized lead and score with `crmWritePerformed: false`.
- Invalid email, missing company, duplicate, and consent-false fixtures take the correct review/reject path.
- No HubSpot write occurs without approval; after authorized setup, an approved test record is idempotent.
