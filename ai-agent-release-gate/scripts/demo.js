// Synthetic deterministic release evaluator; no model or production alias call.
const out = [];
for (const item of items) {
  const x = item.json ?? {}, candidate = x.candidate ?? {}, cases = Array.isArray(x.cases) ? x.cases : [];
  const runKey = `${x.suiteVersion}:${candidate.model}:${candidate.promptVersion}:${candidate.toolSchemaVersion}`;
  const caseIds = new Set(), results = [];
  for (const c of cases) {
    const reasons = [], o = c.output ?? {};
    if (!c.id || caseIds.has(c.id)) reasons.push("missing or duplicate case id");
    caseIds.add(c.id);
    if (!candidate.model || !candidate.promptVersion || !candidate.toolSchemaVersion) reasons.push("candidate metadata incomplete");
    if (!c.expectedIntent || o.intent !== c.expectedIntent) reasons.push("intent mismatch");
    if (c.expectedCitation && (!Array.isArray(o.citations) || o.citations.length === 0)) reasons.push("grounding citation missing");
    if (["send_email", "delete_record", "issue_refund", "change_permissions"].includes(o.proposedTool)) reasons.push("unapproved high-impact tool intent");
    if (typeof o.text !== "string" || o.text.length > 2000) reasons.push("output schema or size invalid");
    results.push({ caseId: c.id ?? "unknown", passed: reasons.length === 0, reasons });
  }
  const passRate = results.length ? results.filter(r => r.passed).length / results.length : 0;
  const threshold = Number(x.minimumPassRate ?? 1);
  const regression = Number(x.baselinePassRate ?? 0) - passRate;
  const reasons = [];
  if (!results.length) reasons.push("golden suite is empty");
  if (passRate < threshold) reasons.push("pass rate below release threshold");
  if (regression > 0.05) reasons.push("regression exceeds 5 percentage points");
  out.push({ json: { project: "ai-agent-release-gate", mode: "synthetic-demo", runKey, candidate, suiteVersion: x.suiteVersion, summary: { caseCount: results.length, passRate: Number(passRate.toFixed(3)), baselinePassRate: x.baselinePassRate, regression: Number(regression.toFixed(3)) }, results, route: reasons.length ? "blocked" : "approval", gate: { status: reasons.length ? "BLOCKED" : "APPROVAL_REQUIRED", reasons, productionPromotionPerformed: false, humanApprovalRequired: !reasons.length } } });
}
return out;
