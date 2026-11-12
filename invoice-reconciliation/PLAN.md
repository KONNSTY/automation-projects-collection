# Implementation plan: Lexware Office invoices → deterministic reconciliation

## Demo state
- The n8n workflow `Invoice Intake & Reconciliation — Synthetic Demo` is imported and inactive.
- Its manual trigger and Code node compare a synthetic invoice with a purchase order. It has been executed in n8n and matches the 98 EUR fixture.
- It stops before accounting writes or payment; `paymentInitiated` is false.

## Target live flow
1. Run manually or on an agreed schedule and read purchase invoices plus the agreed reference records from Lexware Office using a least-privilege credential.
2. Normalize invoice number, supplier ID, currency, dates, net/tax/gross totals, and the agreed purchase-order reference. Do not download attachments unless that scope is approved.
3. Reconcile deterministically: duplicate invoice number, supplier mismatch, missing/unmatched PO, currency mismatch, and amount/tax tolerance. Do not use OpenAI for financial data.
4. Produce a restricted exception report with status, reason codes, and links/IDs for human review. Do not edit vouchers, mark invoices paid, create accounting entries, or initiate payments.
5. Keep a bounded, deduplicated execution checkpoint; retry only transient read failures and fail closed on ambiguous/missing references.

## Data and controls
- Invoice/vendor records are financial/private data. Read only fields required; redact account data and avoid full invoice payloads in execution logs.
- No invoice content is sent to OpenAI. No write, payment approval, or payment action is part of this automation.
- Store the Lexware Office credential in n8n Credentials. Do not commit invoice samples, exports, API tokens, or private webhook URLs.

## Setup still needed together
- Confirm the Lexware Office account, purchase-order reference field/format, amount tolerance, and restricted report destination.
- Create the API credential in n8n by user-entered secret.
- Run synthetic matches, duplicates, amount mismatches, missing PO, and currency mismatch.
- After review, run a read-only test against a small explicitly selected date range.

## Acceptance
- Synthetic invoice produces `MATCHED_PENDING_APPROVAL`; duplicate/mismatch cases produce `REVIEW_REQUIRED` with reason codes.
- Live process is read-only and idempotent, does not fetch attachments unless approved, and never calls OpenAI or performs payment/accounting writes.
