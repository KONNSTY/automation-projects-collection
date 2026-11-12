// Synthetic-only reconciliation; no accounting system or payment API.
const demo = {invoice:{invoiceNumber:"INV-DEMO-1042",vendor:"Example Office Supplies",currency:"EUR",purchaseOrderNumber:"PO-DEMO-204",lines:[{quantity:2,unitPrice:45},{quantity:1,unitPrice:8}],declaredTotal:98},purchaseOrder:{purchaseOrderNumber:"PO-DEMO-204",vendor:"Example Office Supplies",currency:"EUR",approvedTotal:98},knownInvoiceNumbers:["INV-DEMO-1001"]};
const candidate = items?.[0]?.json ?? {};
const x = Object.keys(candidate).length > 0 ? candidate : demo;
const i = x.invoice ?? {}, p = x.purchaseOrder ?? {}, errors = [];
const total = (i.lines??[]).reduce((s,l)=>s+Number(l.quantity??0)*Number(l.unitPrice??0),0);
if (!i.invoiceNumber) errors.push("invoiceNumber is required");
if (!i.vendor || i.vendor!==p.vendor) errors.push("vendor does not match purchase order");
if (!i.purchaseOrderNumber || i.purchaseOrderNumber!==p.purchaseOrderNumber) errors.push("purchase order number does not match");
if (i.currency!==p.currency) errors.push("currency does not match");
if (Math.abs(total-Number(i.declaredTotal??0))>0.01) errors.push("line total does not match declared total");
if (Math.abs(total-Number(p.approvedTotal??0))>0.01) errors.push("invoice total does not match approved purchase order");
if ((x.knownInvoiceNumbers??[]).includes(i.invoiceNumber)) errors.push("duplicate invoice number");
return [{json:{project:"invoice-reconciliation",mode:"synthetic-demo",invoiceNumber:String(i.invoiceNumber??""),calculatedTotal:Number(total.toFixed(2)),currency:String(i.currency??""),reconciliation:{matched:errors.length===0,errors,status:errors.length===0?"MATCHED_PENDING_APPROVAL":"REVIEW_REQUIRED"},approval:{required:true,paymentInitiated:false,reason:"Human approval is required; demo cannot initiate payment."}}}];
