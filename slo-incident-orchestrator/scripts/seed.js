// Synthetic metric windows and alert events. No live telemetry is read.
const observedAt = new Date(Date.now() - 60000).toISOString();
return [
  { json: { eventId: "evt-healthy-01", service: "catalog-api", symptom: "5xx-rate", observedAt, windowMinutes: 5, requests: 10000, errors: 2, longWindowErrorRate: 0.0002, sloErrorBudgetRate: 0.01, affectedUsers: 2, recovered: false, runbook: "inspect_recent_deploy" } },
  { json: { eventId: "evt-checkout-01", service: "checkout-api", symptom: "5xx-rate", observedAt, windowMinutes: 5, requests: 4000, errors: 600, longWindowErrorRate: 0.035, sloErrorBudgetRate: 0.01, affectedUsers: 900, recovered: false, runbook: "rollback_candidate_review" } },
  { json: { eventId: "evt-checkout-02", service: "checkout-api", symptom: "5xx-rate", observedAt, windowMinutes: 5, requests: 4000, errors: 610, longWindowErrorRate: 0.034, sloErrorBudgetRate: 0.01, affectedUsers: 910, recovered: false, runbook: "rollback_candidate_review" } },
  { json: { eventId: "evt-search-recovered", service: "search-api", symptom: "latency-p99", observedAt, windowMinutes: 5, requests: 8000, errors: 0, longWindowErrorRate: 0.002, sloErrorBudgetRate: 0.01, affectedUsers: 0, recovered: true, runbook: "observe_only" } }
];
