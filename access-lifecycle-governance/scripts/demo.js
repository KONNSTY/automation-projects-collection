// Synthetic least-privilege and SoD evaluator; creates plans only.
const seen = new Set(), out = [];
const privileged = new Set(["cloud-admin"]), sodPairs = [["invoice-approve", "vendor-create"]];
for (const item of items) {
  const x = item.json ?? {}, reasons = [], requestId = String(x.requestId ?? "");
  if (!requestId || !x.subjectId || !["joiner", "mover", "leaver"].includes(x.action)) reasons.push("invalid request identity or lifecycle action");
  if (seen.has(requestId)) {
    out.push({ json: { project: "access-lifecycle-governance", mode: "synthetic-demo", requestId, route: "duplicate", plan: null, gate: { status: "SUPPRESSED", reasons: ["duplicate request ID"], accessChanged: false } } });
    continue;
  }
  seen.add(requestId);
  const entitlements = Array.isArray(x.entitlements) ? x.entitlements : [];
  if (entitlements.some(e => sodPairs.some(([a, b]) => entitlements.includes(a) && entitlements.includes(b)))) reasons.push("segregation-of-duties conflict");
  const isPrivileged = entitlements.some(e => privileged.has(e));
  if (!x.managerApproval) reasons.push("manager approval missing");
  if (isPrivileged && !x.securityApproval) reasons.push("security approval required for privileged access");
  const start = Date.parse(x.effectiveAt ?? ""), expiry = x.expiresAt ? Date.parse(x.expiresAt) : NaN;
  if (!Number.isFinite(start)) reasons.push("effective date missing or invalid");
  if (x.action !== "leaver" && (!Number.isFinite(expiry) || expiry <= start)) reasons.push("grant must have an expiry after its effective date");
  const action = x.action === "leaver" ? "revoke" : x.action === "mover" ? "reconcile_entitlements" : "grant";
  out.push({ json: { project: "access-lifecycle-governance", mode: "synthetic-demo", requestId, route: reasons.length ? "denied" : "approval", plan: reasons.length ? null : { action, subjectRef: x.subjectId, entitlementRefs: entitlements, effectiveAt: x.effectiveAt, expiresAt: x.expiresAt ?? null, approvalCountRequired: isPrivileged ? 2 : 1, evidenceRef: requestId }, gate: { status: reasons.length ? "BLOCKED" : "APPROVAL_REQUIRED", reasons, humanApprovalRequired: !reasons.length, accessChanged: false } } });
}
return out;
