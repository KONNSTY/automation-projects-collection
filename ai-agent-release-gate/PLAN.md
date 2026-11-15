# AI agent regression and release gate

## Outcome
Evaluate a candidate agent/prompt against versioned golden cases and safety invariants before any release promotion.

## Demo flow
1. Load synthetic golden cases and candidate outputs with pinned candidate metadata.
2. Validate schema, expected intent, citation presence, prohibited-action language, and refusal behavior.
3. Compute per-case scores and aggregate pass rate; fail closed on missing cases or invalid output.
4. Route passing builds to a human approval package; block regressions and produce a minimized failure report.
5. Stop before calling a model or changing a production prompt alias.

## Production design
- Pin model, prompt, tool schema, retrieval corpus version, and evaluator version for every run.
- Keep independent safety checks deterministic; do not use a judge model as the sole release gate.
- Run shadow evaluation first, compare against the currently approved baseline, and require minimum sample sizes.
- Store redacted traces with retention limits, trace IDs, and rubric outcomes; do not retain unnecessary prompts or PII.
- Use a two-person release approval for high-impact tools, staged rollout, automatic rollback on guardrail breach, and an immutable release ledger.
- Track cost, latency, refusal rate, groundedness, schema validity, and task success by cohort.

## Demo boundary
Candidate outputs are fixed synthetic fixtures; no OpenAI call is made. The simple scoring rules demonstrate orchestration shape, not a validated evaluator for real models.

## Acceptance criteria
- Every golden case is evaluated exactly once per candidate version.
- Missing citations, unsafe tool intents, schema violations, or regression below threshold block promotion.
- A passing run requires an explicit approval artifact before production alias change.
- Output traces contain case IDs and failure reasons, never full user messages.
- A repeated candidate run is idempotent on candidate hash and suite version.
