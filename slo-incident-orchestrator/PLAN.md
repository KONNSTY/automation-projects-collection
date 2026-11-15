# SLO anomaly and incident orchestration

## Outcome
Convert service-health windows into deduplicated, evidence-backed incident review packages without unsafe automatic remediation.

## Demo flow
1. Load synthetic service windows, including healthy, burn-rate breach, and duplicate alert events.
2. Validate metric windows and compute error-budget burn over short and long windows.
3. Group by service + symptom fingerprint; deduplicate repeated alerts and suppress recovered signals.
4. Assign severity from SLO burn, impact, and affected cohort; attach only allowlisted runbook suggestions.
5. Route a page-ready package for human review or record a watch/suppression result.

## Production design
- Use authenticated metric/event sources, timestamp validation, clock-skew limits, and explicit SLO registry versions.
- Apply multi-window burn-rate rules, maintenance windows, dependency correlation, and alert flapping controls.
- Persist idempotency keys and incident state in a shared store; use a dead-letter queue and replay with bounded attempts.
- Notify through approved on-call channels after escalation policy; maintain a human acknowledgement timeout and escalation ladder.
- Permit only reversible, allowlisted remediations with separate approval, blast-radius checks, and compensating action.
- Emit trace IDs, decisions, latency, false-positive rate, and suppression reason without sensitive telemetry.

## Demo boundary
Metrics and incidents are synthetic. No PagerDuty/Slack/API call or remediation runs. Burn-rate thresholds are illustrative and must be calibrated to each service SLO.

## Acceptance criteria
- Duplicate fingerprints yield one page candidate.
- Missing or stale windows fail closed into review.
- Severity is traceable to the configured SLO and impact inputs.
- Recovery signals suppress escalation and preserve a resolution record.
- No destructive action executes; every page-ready result requires human acknowledgement.
