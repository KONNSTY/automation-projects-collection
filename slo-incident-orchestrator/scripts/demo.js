// Deterministic, synthetic SLO evaluation; no paging or remediation call.
const seen = new Set(), out = [];
for (const item of items) {
  const x = item.json ?? {}, key = `${x.service}:${x.symptom}`;
  const reasons = [];
  if (!x.eventId || !x.service || !x.symptom) reasons.push("identity fields missing");
  if (!Number.isFinite(Number(x.requests)) || Number(x.requests) <= 0 || !Number.isFinite(Number(x.errors)) || Number(x.errors) < 0 || Number(x.errors) > Number(x.requests) || !Number.isFinite(Number(x.sloErrorBudgetRate)) || Number(x.sloErrorBudgetRate) <= 0 || !Number.isFinite(Number(x.longWindowErrorRate))) reasons.push("invalid metric window");
  const ageMs = Date.now() - Date.parse(x.observedAt ?? "");
  if (!Number.isFinite(ageMs) || ageMs < -300000 || ageMs > 15 * 60000) reasons.push("window is stale or timestamp is invalid");
  const duplicate = seen.has(key);
  seen.add(key);
  if (reasons.length) {
    out.push({ json: { project: "slo-incident-orchestrator", mode: "synthetic-demo", eventId: x.eventId ?? "unknown", route: "review", incident: null, gate: { status: "INPUT_REVIEW_REQUIRED", reasons, remediationPerformed: false } } });
    continue;
  }
  const shortRate = Number(x.errors) / Number(x.requests), budget = Number(x.sloErrorBudgetRate);
  const shortBurn = budget > 0 ? shortRate / budget : Infinity;
  const longBurn = budget > 0 ? Number(x.longWindowErrorRate) / budget : Infinity;
  const breach = shortBurn >= 14.4 && longBurn >= 3 || shortBurn >= 6 && longBurn >= 6;
  const severity = breach && Number(x.affectedUsers) >= 500 ? "SEV-1" : breach ? "SEV-2" : "OBSERVE";
  const route = x.recovered ? "suppressed" : duplicate ? "deduplicated" : breach ? "incident-review" : "observe";
  out.push({ json: { project: "slo-incident-orchestrator", mode: "synthetic-demo", eventId: x.eventId, fingerprint: key, route, incident: route === "incident-review" ? { service: x.service, symptom: x.symptom, severity, shortBurn: Number(shortBurn.toFixed(2)), longBurn: Number(longBurn.toFixed(2)), affectedUsers: Number(x.affectedUsers), evidenceWindowMinutes: Number(x.windowMinutes), suggestedRunbook: ["inspect_recent_deploy", "rollback_candidate_review", "observe_only"].includes(x.runbook) ? x.runbook : "manual_diagnosis" } : null, gate: { status: route === "incident-review" ? "HUMAN_ACK_REQUIRED" : route.toUpperCase(), reasons: route === "incident-review" ? ["multi-window SLO burn threshold exceeded"] : [], pageSent: false, remediationPerformed: false, humanApprovalRequired: route === "incident-review" } } });
}
return out;
