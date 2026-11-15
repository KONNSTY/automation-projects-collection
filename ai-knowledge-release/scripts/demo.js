// Deterministic, synthetic-only RAG ingestion gate. No model or external write.
const seen = new Set();
const out = [];
const maxBodyChars = 12000, maxChunkChars = 900, maxChunks = 20, minRecall = 0.85;
for (const item of items) {
  const x = item.json ?? {};
  const sourceId = String(x.sourceId ?? "").trim();
  const revision = String(x.revision ?? "").trim();
  const eventKey = `${x.tenantId}:${sourceId}:${revision}`;
  if (seen.has(eventKey)) {
    out.push({ json: { project: "ai-knowledge-release", mode: "synthetic-demo", eventKey, route: "duplicate", gate: { status: "SUPPRESSED", reasons: ["duplicate source revision"] }, contentEmitted: false } });
    continue;
  }
  seen.add(eventKey);
  const reasons = [];
  if (!/^[a-z0-9-]{3,80}$/i.test(sourceId) || !revision) reasons.push("invalid source identity");
  if (x.classification === "restricted") reasons.push("restricted classification");
  if (!x.title || !String(x.body ?? "").trim()) reasons.push("missing title or body");
  if (String(x.body ?? "").length > maxBodyChars) reasons.push("source exceeds size bound");
  if (reasons.length) {
    out.push({ json: { project: "ai-knowledge-release", mode: "synthetic-demo", eventKey, route: "quarantine", gate: { status: "BLOCKED", reasons }, contentEmitted: false } });
    continue;
  }
  const redacted = String(x.body).replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[REDACTED_EMAIL]");
  const chunks = [];
  for (let i = 0; i < redacted.length; i += maxChunkChars) chunks.push(redacted.slice(i, i + maxChunkChars));
  const quality = { fixtureRecall: Number(x.fixtureRecall ?? 0), goldenQueryCount: Array.isArray(x.goldenQueries) ? x.goldenQueries.length : 0, chunkCount: chunks.length };
  if (quality.fixtureRecall < minRecall) reasons.push("retrieval recall below threshold");
  if (!quality.goldenQueryCount) reasons.push("golden query set missing");
  if (chunks.length > maxChunks) reasons.push("chunk count exceeds bound");
  out.push({ json: {
    project: "ai-knowledge-release", mode: "synthetic-demo", eventKey, route: reasons.length ? "quarantine" : "approval",
    candidate: { documentId: `${sourceId}:r${revision}`, title: String(x.title).trim(), classification: x.classification, chunks: chunks.map((text, i) => ({ chunkId: `${sourceId}:r${revision}:c${i + 1}`, text, ordinal: i + 1 })), quality },
    gate: { status: reasons.length ? "BLOCKED" : "APPROVAL_REQUIRED", reasons, humanApprovalRequired: !reasons.length, vectorWritePerformed: false }
  } });
}
return out;
