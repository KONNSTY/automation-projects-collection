# Implementation plan: WordPress → OpenAI drafts → Buffer drafts

## Demo state
- The n8n workflow `Content Repurposing Pipeline — Synthetic Demo` is imported and inactive.
- Its manual trigger and Code node use a synthetic brief only. It has been executed in n8n and emits LinkedIn, X, and newsletter drafts.
- It stops before publication; `published` is false.

## Target live flow
1. Trigger manually or when a WordPress post reaches an agreed editorial status. Fetch only approved post fields (title, excerpt, canonical URL, selected taxonomy).
2. Remove author contact details and unnecessary metadata. Send the approved content brief to OpenAI for channel-specific variations only after the data scope/model use are approved.
3. Validate required links, brand constraints, character limits, and prohibited claims. Preserve the WordPress canonical URL and source attribution.
4. Create a WordPress post in `draft` status and a Buffer post with `saveToDraft: true`; never schedule or publish automatically. Return both draft IDs for editorial review.
5. Prevent duplicates using source post ID + version + channel; use bounded retries and report partial completion without publishing.

## Data and controls
- Only approved editorial content is sent to OpenAI. Draft creation is an external write, and human editorial review remains required.
- No publish/schedule operation is configured. Buffer channel IDs and WordPress site details belong in n8n configuration, not source files.
- Store WordPress, Buffer, and OpenAI credentials in n8n Credentials. Keep API keys, webhook URLs, private briefs, and unreleased content out of Git.

## Setup still needed together
- Choose WordPress site, trigger/status, content fields, and target Buffer channels.
- Create WordPress, Buffer, and OpenAI credentials in n8n via user-entered secrets.
- Approve the content categories that may be sent to OpenAI.
- Test the synthetic fixture, then create one test draft in each destination and confirm both remain drafts.

## Acceptance
- Synthetic run emits channel-specific drafts with `published: false`.
- Live run is idempotent per source/version/channel and creates drafts only.
- No publish or scheduling operation is configured; a human takes the final editorial action.
