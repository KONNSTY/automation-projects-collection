// Synthetic, deterministic triage; no external AI, mailbox, or send action.
const demo = {ticketId:"demo-ticket-001",subject:"Cannot sign in after password reset",message:"I reset my password but still cannot access my workspace."};
const candidate = items?.[0]?.json ?? {};
const x = Object.keys(candidate).length > 0 ? candidate : demo;
const subject = String(x.subject??"");
const text = (subject+" "+String(x.message??"")).toLowerCase();
const category = /invoice|billing|payment/.test(text) ? "billing" : /bug|error|broken|cannot|can't|failed/.test(text) ? "technical" : /cancel|refund/.test(text) ? "account" : "general";
const priority = /outage|security|data loss|urgent/.test(text) ? "high" : category==="technical" ? "normal" : "low";
const drafts = {technical:"Thanks for reporting this. We are reviewing the sign-in issue. Please do not share passwords or authentication codes.",billing:"Thanks for reaching out. We will review the billing details through the verified support channel.",account:"Thanks for contacting us. A support specialist will review the account request.",general:"Thanks for contacting us. A support specialist will review your question."};
return [{json:{project:"ai-support-triage",mode:"synthetic-demo",ticket:{ticketId:String(x.ticketId??"demo-ticket"),subject},triage:{category,priority,confidence:"rule-based-demo"},responseDraft:drafts[category],approval:{required:true,messageSent:false,reason:"A human must review and send the draft."}}}];
