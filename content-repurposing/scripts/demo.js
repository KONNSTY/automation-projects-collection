// Synthetic template drafts; no social account or publishing action.
const demo = {contentId:"demo-content-001",topic:"A practical automation portfolio built with n8n",keyPoint:"Each workflow uses synthetic data and explicit human review."};
const x = items.length ? items[0].json : demo;
const topic = String(x.topic??"").trim();
const point = String(x.keyPoint??"").trim();
if (!topic) return [{json:{project:"content-repurposing",mode:"synthetic-demo",valid:false,errors:["topic is required"],drafts:[],approval:{required:true,published:false}}}];
const drafts = [{channel:"linkedin",text:topic+". "+point+" Built as a reviewable n8n demo."},{channel:"x",text:topic+": "+point},{channel:"newsletter",text:"This week's focus: "+topic+". "+point+" Human review is required before publication."}];
return [{json:{project:"content-repurposing",mode:"synthetic-demo",contentId:String(x.contentId??"demo-content"),drafts,approval:{required:true,published:false,reason:"Drafts are for human review only."}}}];
