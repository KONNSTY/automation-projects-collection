# AI knowledge release control plane

## Outcome
Turn source-document changes into versioned, privacy-screened, retrieval-ready knowledge candidates. A human approves each candidate before a vector index is changed.

## Demo flow
1. Seed three synthetic source events: clean, PII-bearing, and restricted.
2. Validate source metadata and classification; redact email addresses before chunking.
3. Derive stable source/version/chunk identities, suppress duplicate events, and enforce size and chunk-count bounds.
4. Run fixture-based retrieval-quality checks and emit an approval package or quarantine record.
5. Stop before embeddings or vector-store writes.

## Production design
- Trigger from an authenticated source-change event; validate signature, timestamp, schema version, and replay window.
- Fetch only approved source fields. Preserve source revision and deletion/tombstone events.
- Redact before any model or embedding provider; enforce tenant/classification policy before retrieval exposure.
- Generate embeddings into a versioned staging namespace. Run golden-query recall, citation-grounding, and stale-source checks.
- Publish through an atomic alias swap only after human approval; retain previous version for rollback.
- Use idempotency on tenant + source ID + revision, bounded retries, dead-letter records, and a replay workflow.
- Emit metrics and PII-minimized audit events; never log raw document bodies.

## Demo boundary
All inputs are synthetic. The fixture redactor is deliberately limited to email addresses; production needs an approved DLP policy and tested multilingual detectors. No model, embedding, vector database, or source credential is configured.

## Acceptance criteria
- Duplicate source revisions collapse to one candidate.
- Restricted or malformed sources are quarantined without content in the output.
- PII is redacted before chunk generation.
- Chunks have stable IDs and source/version traceability.
- Failed retrieval-quality gates block approval; passing candidates still require human approval.
- No vector write occurs in demo mode.
