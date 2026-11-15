# Access lifecycle governance

## Outcome
Evaluate joiner, mover, and leaver requests against least-privilege policy, separation of duties, approvals, and time-bounded access before any identity provider change.

## Demo flow
1. Load synthetic lifecycle requests and a versioned entitlement policy.
2. Normalize subject, manager, target role, requested entitlements, and effective date.
3. Block prohibited combinations and stale/incomplete approvals; calculate minimum required approvals.
4. Generate a dry-run plan: grant, change, or revoke actions with expiry and evidence references.
5. Route policy-compliant requests to approval; deny or quarantine unsafe/ambiguous requests.
6. Stop before creating accounts or changing permissions.

## Production design
- Authenticate HRIS events, verify signatures and replay windows, and reconcile against a source-of-truth identity record.
- Use a versioned entitlement catalog, SoD graph, manager-chain validation, and explicit emergency-access policy.
- Require maker/checker approval for privileged access; time-bound grants and schedule recertification/removal.
- Use an idempotent state machine, durable approval evidence, bounded retries, and compensating revocation where safe.
- Keep a minimal immutable audit ledger; redact HR payloads and restrict access to exception queues.
- Use a dry-run mode and drift reconciliation before any IdP or SaaS mutation is enabled.

## Demo boundary
All people, roles, and entitlements are synthetic. The demo produces plans only; it does not provision or revoke access. Production policy must be reviewed by the organization’s security and HR owners.

## Acceptance criteria
- Segregation-of-duties conflicts are denied without exposing unnecessary HR fields.
- Privileged grants require two distinct approvers and an expiry.
- Duplicate request IDs do not create duplicate plans.
- Leaver actions produce a reviewable revoke plan with effective time and evidence.
- No identity or SaaS write occurs without explicit approval and a separately enabled executor.
