// Synthetic source-change events; all identities and text are fictional.
return [
  { json: { tenantId: "demo-tenant", sourceId: "handbook-access", revision: 7, title: "Workspace access policy", classification: "internal", body: "Use company SSO for access. Contact alex@example.test for help. Ask a manager before granting elevated access.", goldenQueries: [{ query: "How do staff sign in?", expectedTerms: ["SSO", "manager"] }], fixtureRecall: 0.96 } },
  { json: { tenantId: "demo-tenant", sourceId: "handbook-access", revision: 7, title: "Workspace access policy", classification: "internal", body: "Use company SSO for access. Contact alex@example.test for help. Ask a manager before granting elevated access.", goldenQueries: [{ query: "How do staff sign in?", expectedTerms: ["SSO", "manager"] }], fixtureRecall: 0.96 } },
  { json: { tenantId: "demo-tenant", sourceId: "finance-export", revision: 2, title: "Finance export", classification: "restricted", body: "Synthetic restricted content must not be indexed.", goldenQueries: [], fixtureRecall: 0 } }
];
