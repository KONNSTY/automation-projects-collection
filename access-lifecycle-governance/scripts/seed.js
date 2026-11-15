// Synthetic lifecycle requests and policy; no real people or IdP actions.
return [
  { json: { requestId: "req-joiner-001", action: "joiner", subjectId: "user-demo-17", department: "engineering", role: "developer", entitlements: ["repo-read", "cloud-admin"], managerApproval: true, securityApproval: false, effectiveAt: "2026-11-16T09:00:00Z", expiresAt: "2026-12-16T09:00:00Z", requestedBy: "manager-demo-4" } },
  { json: { requestId: "req-mover-002", action: "mover", subjectId: "user-demo-29", department: "finance", role: "analyst", entitlements: ["invoice-approve", "vendor-create"], managerApproval: true, securityApproval: true, effectiveAt: "2026-11-16T09:00:00Z", expiresAt: "2026-12-16T09:00:00Z", requestedBy: "manager-demo-7" } },
  { json: { requestId: "req-leaver-003", action: "leaver", subjectId: "user-demo-31", department: "support", role: "agent", entitlements: ["support-console"], managerApproval: true, securityApproval: false, effectiveAt: "2026-11-16T17:00:00Z", expiresAt: null, requestedBy: "manager-demo-8" } },
  { json: { requestId: "req-joiner-001", action: "joiner", subjectId: "user-demo-17", department: "engineering", role: "developer", entitlements: ["repo-read", "cloud-admin"], managerApproval: true, securityApproval: false, effectiveAt: "2026-11-16T09:00:00Z", expiresAt: "2026-12-16T09:00:00Z", requestedBy: "manager-demo-4" } }
];
