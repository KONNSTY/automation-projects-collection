# AI Knowledge Release Control Plane

A governed RAG knowledge-ingestion pipeline: document changes are privacy-screened, versioned, chunked, evaluated against retrieval fixtures, and prepared for explicit review before publication.

## Demo
- Manual trigger with synthetic source events only.
- Demonstrates stable IDs, duplicate suppression, email redaction, classification gates, bounded chunking, quality checks, and quarantine routing.
- No OpenAI, embedding, document-store, or vector-database calls are connected.
- Candidate path ends in an approval package; blocked items end in a minimized quarantine record.

## Files
- `workflow.json`: importable inactive n8n workflow.
- `scripts/seed.js`: synthetic source events.
- `scripts/demo.js`: deterministic evaluation and transformation logic.
- `PLAN.md`: production architecture and acceptance criteria.

Import `workflow.json`, execute manually, then inspect both output branches. Keep the seed and Code-node source synchronized when editing.
