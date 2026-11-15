#!/usr/bin/env python3
"""Build importable n8n workflow JSON from each advanced project's script sources."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROJECTS = {
    "ai-knowledge-release": ("AI Knowledge Release Control Plane", "approval", "Prepare Approval Package", "Prepare Quarantine Record"),
    "ai-agent-release-gate": ("AI Agent Regression & Release Gate", "approval", "Prepare Approval Package", "Prepare Blocked Report"),
    "slo-incident-orchestrator": ("SLO Incident Orchestrator", "incident-review", "Prepare Incident Review", "Prepare Observe / Suppression Record"),
    "access-lifecycle-governance": ("Access Lifecycle Governance", "approval", "Prepare Approval Package", "Prepare Denial Record"),
}

def code_node(node_id, name, code, position):
    return {
        "parameters": {"mode": "runOnceForAllItems", "jsCode": code},
        "id": node_id,
        "name": name,
        "type": "n8n-nodes-base.code",
        "typeVersion": 2,
        "position": position,
    }

for slug, (title, pass_route, pass_name, fail_name) in PROJECTS.items():
    project = ROOT / slug
    seed = (project / "scripts/seed.js").read_text()
    demo = (project / "scripts/demo.js").read_text()
    nodes = [
        {"parameters": {}, "id": f"manual-{slug}", "name": "Run Synthetic Scenarios", "type": "n8n-nodes-base.manualTrigger", "typeVersion": 1, "position": [240, 320]},
        code_node(f"seed-{slug}", "Seed Synthetic Scenarios", seed, [460, 320]),
        code_node(f"evaluate-{slug}", "Evaluate Policy and Invariants", demo, [700, 320]),
        {
            "parameters": {
                "conditions": {
                    "options": {"caseSensitive": True, "leftValue": "", "typeValidation": "strict", "version": 2},
                    "conditions": [{"id": f"gate-{slug}", "leftValue": "={{ $json.route }}", "rightValue": pass_route, "operator": {"type": "string", "operation": "equals"}}],
                    "combinator": "and",
                },
                "options": {},
            },
            "id": f"if-{slug}", "name": "Route by Gate Decision", "type": "n8n-nodes-base.if", "typeVersion": 2.2, "position": [940, 320],
        },
        code_node(f"pass-{slug}", pass_name, 'return items.map(item => ({ json: { ...item.json, reviewArtifact: { created: true, requiresHumanApproval: true, externalWritePerformed: false } } }));', [1200, 220]),
        code_node(f"block-{slug}", fail_name, 'return items.map(item => ({ json: { ...item.json, reviewArtifact: { created: true, requiresHumanApproval: false, externalWritePerformed: false, contentMinimized: true } } }));', [1200, 440]),
    ]
    workflow = {
        "name": f"{title} — Synthetic Demo",
        "nodes": nodes,
        "connections": {
            "Run Synthetic Scenarios": {"main": [[{"node": "Seed Synthetic Scenarios", "type": "main", "index": 0}]]},
            "Seed Synthetic Scenarios": {"main": [[{"node": "Evaluate Policy and Invariants", "type": "main", "index": 0}]]},
            "Evaluate Policy and Invariants": {"main": [[{"node": "Route by Gate Decision", "type": "main", "index": 0}]]},
            "Route by Gate Decision": {"main": [[{"node": pass_name, "type": "main", "index": 0}], [{"node": fail_name, "type": "main", "index": 0}]]},
        },
        "settings": {"executionOrder": "v1"},
        "active": False,
    }
    (project / "workflow.json").write_text(json.dumps(workflow, ensure_ascii=False, indent=2) + "\n")
