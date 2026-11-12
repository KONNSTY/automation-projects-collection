// Synthetic-only demo; no CRM connection or external write is performed.
const demo = {leadId:"demo-lead-001",company:"Northstar Robotics",contact:{name:"Alex Morgan",email:"alex@example.test"},region:"DE",source:"portfolio-demo",consentToContact:false,budgetBand:"mid-market"};
const candidate = items?.[0]?.json ?? {};
const x = Object.keys(candidate).length > 0 ? candidate : demo;
const email = String(x.contact?.email ?? "").trim().toLowerCase();
const errors = [];
if (!x.leadId) errors.push("leadId is required");
if (!String(x.company ?? "").trim()) errors.push("company is required");
if (!email.includes("@") || email.endsWith("@")) errors.push("contact.email is invalid");
const score = (x.region?20:0) + (x.source==="portfolio-demo"?10:20) + (x.budgetBand==="mid-market"?30:10) + (x.consentToContact===true?20:0);
return [{json:{project:"lead-to-crm",mode:"synthetic-demo",normalizedLead:{leadId:String(x.leadId??"").trim(),company:String(x.company??"").trim(),contact:{name:String(x.contact?.name??"").trim(),email},region:String(x.region??"").trim().toUpperCase(),source:String(x.source??"unknown"),consentToContact:x.consentToContact===true},quality:{valid:errors.length===0,errors,score},approval:{required:true,crmWritePerformed:false,reason:"Demo stops before any external CRM write."}}}];
