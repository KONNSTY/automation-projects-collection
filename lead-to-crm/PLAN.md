# Implementation plan: Lead intake → Polymath CRM

## CRM discovery
- Target is the user's Polymath CRM, not HubSpot.
- `staging.reglerproductions.com` is a static, read-only preview: it has no backend/API route or Firebase configuration.
- The production CRM API validates Firebase ID tokens. Its normal interactive login includes password, bot proof, and an email OTP, so a personal browser token is not a suitable persistent n8n credential.
- The existing lead-create API also performs CRM-side AI scoring and consumes the lead-scan quota. Do not call it with real data until the account, cost/side-effect scope, and test record are explicitly approved.

## Demo state
- The n8n workflow `Lead Intake & CRM Orchestration — Synthetic Demo` is imported and inactive.
- Its manual trigger and Code node use a synthetic fixture only. The fixture has been executed in n8n and emits a valid, normalized lead with a score of 60.
- It stops before any CRM write.

## Target live flow
1. Receive a lead through a signed n8n webhook from the agreed lead source. Keep the webhook URL and secret only in n8n; never commit them.
2. Validate required fields, normalize contact values, check contact consent, and reject malformed items without echoing personal values into logs.
3. Deduplicate by normalized email and CRM lead identity; apply deterministic scoring and record the score explanation and source.
4. Require a human approval before any CRM mutation. A negative decision ends the run.
5. Write only the explicitly approved lead fields to the user's tenant, then return a data-minimized execution reference and audit record. Use bounded retries and idempotency; route permanent failures to a restricted review path.

## Authentication prerequisite
- Implement or identify a dedicated machine-to-machine credential for n8n with only the ability to create/update approved lead fields in the selected CRM tenant. It must not impersonate an employee, bypass MFA, grant cross-tenant access, or expose the Firebase Admin service account.
- Bind the credential to one tenant and allowed fields; validate it server-side, rate-limit it, audit every mutation, support rotation/revocation, and make writes idempotent.
- If this requires a new CRM backend route, prepare and review the change first. Do not deploy or expand production access until the user approves the exact tenant, fields, and write behavior.
- Do not use the read-only staging preview for writes. Do not use a personal Firebase ID token or password/OTP as a long-lived automation secret.

## Data and controls
- Minimum fields: contact name/email, company text, source, region, consent flag, and received timestamp. No sensitive free-text is needed for scoring.
- No outreach is sent by this workflow. Consent false blocks outreach eligibility; human review is required before any CRM mutation.
- Store the machine credential in n8n Credentials. Keep credentials, webhook URLs/secrets, personal payloads, and live exports out of Git.

## Setup still needed together
- Confirm the lead source, target CRM tenant, field mapping, and approval destination.
- Approve and provision the least-privilege CRM machine credential; enter it directly in n8n.
- Configure the signed webhook in n8n and register it only with the approved source.
- Run synthetic dry runs, then one explicitly approved test record after the CRM service-auth path is ready.

## Acceptance
- Synthetic fixture succeeds and emits the expected normalized lead and score with `crmWritePerformed: false`.
- Invalid email, missing company, duplicate, and consent-false fixtures take the correct review/reject path.
- No CRM write occurs without approval. An authorized test record is tenant-bound, audited, idempotent, and uses only the approved fields.
- Staging remains read-only; no personal Firebase token, API credential, webhook URL, or private lead data is committed.
