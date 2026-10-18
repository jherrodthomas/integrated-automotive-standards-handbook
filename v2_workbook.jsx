import { useState, useReducer, useCallback, useMemo } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const STANDARDS = [
  { id: "26262", name: "ISO 26262:2018", scope: "Functional Safety of E/E Systems", edition: "2018 (Ed.2)", parts: 12, clauses: "~140" },
  { id: "21434", name: "ISO/SAE 21434:2021", scope: "Cybersecurity Engineering", edition: "2021", parts: 1, clauses: "15 (Cl.5-15)" },
  { id: "21448", name: "ISO 21448:2022", scope: "Safety of Intended Functionality (SOTIF)", edition: "2022", parts: 1, clauses: "12 (Cl.5-12)" },
  { id: "8800", name: "ISO/PAS 8800:2024", scope: "AI/ML Safety for Road Vehicles", edition: "2024", parts: 1, clauses: "15 + 8 Annexes" },
  { id: "9001", name: "ISO 9001 / IATF 16949", scope: "Quality Management System", edition: "2015 / 2016", parts: 1, clauses: "Cl.4-10 + IATF" },
  { id: "aspice", name: "ASPICE v4.0", scope: "Process Capability Assessment", edition: "2023", parts: 1, clauses: "32 processes" },
];

const PHASES = [
  {
    id: "org", name: "Organizational Setup", chapter: 4,
    clauses: {
      "26262": "Part 2: Cl.5 (Safety culture), Cl.6 (Safety mgmt), Cl.7 (Competence)",
      "21434": "Cl.5 (Org CS management), Cl.7 (Distributed development)",
      "21448": "Cl.5 (Overall SOTIF activities & management)",
      "8800": "Cl.4 (Overview & organization of AI safety)",
      "9001": "Cl.4 (Context), Cl.5 (Leadership), Cl.7 (Support/Competence)",
      "aspice": "MAN.3 (Project mgmt), MAN.5 (Risk mgmt), MAN.6 (Measurement), PIM.3",
    },
    commonalities: ["Competence management", "Organizational culture", "Role definitions", "Audit requirements"],
    gaps: ["26262: Safety manager role specific requirements", "21434: CSMS audit distinct from safety assessment", "ASPICE: PIM.3 process improvement unique"],
  },
  {
    id: "concept", name: "Concept & Planning", chapter: 5,
    clauses: {
      "26262": "Part 3: Cl.5 (Item def), Cl.6 (Initiation), Cl.7 (HARA), Cl.8 (FSC)",
      "21434": "Cl.6 (Project CS mgmt), Cl.9 (Concept — TARA), Cl.15 (TARA methods)",
      "21448": "Cl.5 (Req & spec), Cl.6 (Hazard ID & risk eval), Cl.7 (Triggering conditions)",
      "8800": "Cl.5 (AI safety req refinement), Cl.6 (Safety analysis for AI)",
      "9001": "Cl.6 (Planning), Cl.8.1 (Op planning), Cl.8.3.1-8.3.3 (Design planning)",
      "aspice": "SYS.1 (Req elicitation), SYS.2 (System req analysis), MAN.5 (Risk mgmt)",
    },
    commonalities: ["Risk identification methodology", "Severity/impact assessment", "Item/asset scope definition", "Requirements traceability"],
    gaps: ["26262: S×E×C → ASIL unique classification", "21434: Attack feasibility assessment unique", "21448: Four-quadrant model unique", "8800: AI-specific failure modes"],
  },
  {
    id: "system", name: "System-Level Development", chapter: 6,
    clauses: {
      "26262": "Part 4: Cl.6 (TSC), Cl.7 (System design), Cl.8 (Integration & testing)",
      "21434": "Cl.10 (Product dev — CS specification, design)",
      "21448": "Cl.8 (SOTIF validation planning), Cl.9 (V&V of SOTIF measures)",
      "8800": "Cl.7 (V-model dev measures for AI), Cl.10 (System-level integration)",
      "9001": "Cl.8.3.4 (Design controls), Cl.8.3.5 (Design outputs)",
      "aspice": "SYS.3 (System arch design), SYS.4 (System integ & test), SYS.5 (System qual test)",
    },
    commonalities: ["Architecture patterns (defense-in-depth + FFI + redundancy)", "E2E + SecOC = safety + security comms", "Requirements allocation"],
    gaps: ["26262: ASIL decomposition per Part 9", "21434: Security controls may conflict with safety mechanisms", "8800: ML model allocation unique"],
  },
  {
    id: "hardware", name: "Hardware Development", chapter: 7,
    clauses: {
      "26262": "Part 5: Cl.6-9 (HW design, metrics, FMEDA, integ); Part 11 (Semiconductors)",
      "21434": "Cl.10 (HW aspects — HSM, secure boot, tamper resistance)",
      "21448": "Cl.7 (Sensor/actuator performance limitations)",
      "8800": "Cl.7 (HW platform req for AI inference — compute determinism)",
      "9001": "Cl.8.3 (Design), Cl.8.5.1 (Production control — MSA)",
      "aspice": "HWE.1-4 (HW req, design, verification, integ & test) — NEW in v4.0",
    },
    commonalities: ["HSM must satisfy both safety diagnostic coverage and security key protection", "FMEDA methodology shared"],
    gaps: ["26262: SPFM/LFM/PMHF metrics unique", "ASPICE HWE.1-4: new in v4.0", "8800: GPU/NPU determinism for inference"],
  },
  {
    id: "software", name: "Software & AI/ML Development", chapter: 8,
    clauses: {
      "26262": "Part 6: Cl.5-11 (Initiation through SW qualification testing)",
      "21434": "Cl.10 (Secure coding, vuln analysis, SAST/DAST)",
      "21448": "Cl.9 (SW testing for triggering conditions, simulation)",
      "8800": "Cl.5-9 (AI safety req, model dev, data mgmt, V&V), Cl.12-13 (Assurance, ML tool qual)",
      "9001": "Cl.8.3.4 (Design controls), IATF 8.4.2.3.1 (Automotive SW req)",
      "aspice": "SWE.1-6, MLE.1-4 (ML req/arch/training/test), SUP.11 (ML data mgmt)",
    },
    commonalities: ["Coding standards convergence (MISRA + CERT-C + defensive)", "Input validation (plausibility + sanitization)", "Logging/tracing"],
    gaps: ["26262: MC/DC coverage per Table 9", "21434: Fuzz testing, SAST/DAST", "8800: Adversarial robustness, ODD coverage, bias detection", "ASPICE MLE.1-4: new AI processes"],
  },
  {
    id: "vv", name: "Integration, V&V & Release", chapter: 9,
    clauses: {
      "26262": "Part 4: Cl.8-9; Part 8: Cl.9; Part 6: Cl.10-11",
      "21434": "Cl.11 (Cybersecurity validation)",
      "21448": "Cl.8-10 (SOTIF V&V, residual risk eval, acceptance)",
      "8800": "Cl.9 (AI V&V), Cl.15 (System safety eval for AI)",
      "9001": "Cl.8.6 (Release), Cl.9.1 (Monitoring/measurement)",
      "aspice": "SYS.4-5, SWE.5-6, VAL.1 (Validation) — NEW",
    },
    commonalities: ["Integrated test strategy across all domains", "Release criteria checklist convergence", "Assurance case structure"],
    gaps: ["26262: Fault injection specific", "21434: Penetration testing", "21448: Scenario-based testing", "8800: Adversarial testing"],
  },
  {
    id: "prod", name: "Production, Ops & Decommissioning", chapter: 10,
    clauses: {
      "26262": "Part 7: Cl.5 (Production), Cl.6 (Operation/service), Cl.7 (Decommissioning)",
      "21434": "Cl.8 (Continual — vuln monitoring, PSIRT), Cl.12-14 (Prod/Ops/Decom)",
      "21448": "Cl.12 (Operational phase — field monitoring, triggering condition updates)",
      "8800": "Cl.11 (Operational phase — AI monitoring, drift, distribution shift)",
      "9001": "Cl.8.5 (Production), Cl.10 (Improvement — CAPA), IATF 10.2.5 (Warranty)",
      "aspice": "SUP.9 (Problem resolution), SUP.10 (Change requests), MAN.6 (Measurement)",
    },
    commonalities: ["Unified field feedback process", "OTA update governance", "Incident response procedure"],
    gaps: ["21434: PSIRT unique", "8800: AI model drift monitoring unique", "21434: Key revocation at decommission"],
  },
];

const TOOL_CATEGORIES = [
  {
    category: "Requirements & ALM", phase: "concept",
    tools: [
      { name: "IBM DOORS Next", tier: "enterprise", tcl: "TCL1", strengths: "Industry standard, deep traceability, ReqIF export", weaknesses: "Expensive, steep learning curve, legacy UX", cost: "$$$" },
      { name: "Siemens Polarion", tier: "enterprise", tcl: "TCL1", strengths: "Integrated ALM, ASPICE templates built-in, modern web UI", weaknesses: "Siemens ecosystem lock-in, complex admin", cost: "$$$" },
      { name: "PTC codeBeamer", tier: "mid", tcl: "TCL1", strengths: "Best ASPICE compliance out-of-box, variant management, agile+V-model", weaknesses: "Smaller ecosystem than DOORS", cost: "$$" },
      { name: "Jama Connect", tier: "mid", tcl: "TCL2", strengths: "Clean UI, good collaboration, review workflows", weaknesses: "Less automotive-specific", cost: "$$" },
      { name: "Visure Requirements", tier: "mid", tcl: "TCL1", strengths: "Safety case support, DO-178C + 26262, FMEA integration", weaknesses: "Niche market, smaller community", cost: "$$" },
      { name: "Tuleap", tier: "startup", tcl: "TCL3", strengths: "Open source, ALM capabilities, CI/CD integration", weaknesses: "No TCL certification, limited automotive templates", cost: "$" },
      { name: "ReqView", tier: "startup", tcl: "TCL3", strengths: "Lightweight, affordable, ReqIF support", weaknesses: "Limited scalability, no built-in workflows", cost: "$" },
    ]
  },
  {
    category: "Safety Analysis", phase: "concept",
    tools: [
      { name: "Ansys medini analyze", tier: "enterprise", tcl: "TCL1", strengths: "Only single-platform HARA+FMEA+FMEDA+FTA, SysML integration", weaknesses: "Very expensive, complex setup", cost: "$$$" },
      { name: "exida SILcal / FMEDAx", tier: "enterprise", tcl: "TCL1", strengths: "Dominates PMHF/FMEDA, certified failure rate databases", weaknesses: "Specialized — not full HARA", cost: "$$$" },
      { name: "APIS IQ-FMEA", tier: "mid", tcl: "TCL1", strengths: "Strong FMEA/FTA, AIAG/VDA compliant, good reporting", weaknesses: "Less integration with SysML tools", cost: "$$" },
      { name: "ReliaSoft (PTC)", tier: "mid", tcl: "TCL1", strengths: "Comprehensive reliability suite, Weibull analysis", weaknesses: "Complex, multiple modules needed", cost: "$$" },
      { name: "EMFTA (Eclipse)", tier: "startup", tcl: "TCL3", strengths: "Open source FTA, Eclipse-based, AADL integration", weaknesses: "FTA only, no FMEA/HARA, self-qualification needed", cost: "$" },
    ]
  },
  {
    category: "Cybersecurity (TARA)", phase: "concept",
    tools: [
      { name: "PlaxidityX (Argus)", tier: "enterprise", tcl: "N/A", strengths: "AI-driven TARA, 60-80% effort reduction, fleet-level", weaknesses: "New entrant, limited track record", cost: "$$$" },
      { name: "itemis SECURE", tier: "enterprise", tcl: "N/A", strengths: "Deep 21434 mapping, STRIDE/DREAD built-in, attack trees", weaknesses: "Specialized tool, integration needed", cost: "$$$" },
      { name: "ThreatZ", tier: "mid", tcl: "N/A", strengths: "AI-assisted threat modeling, automotive templates", weaknesses: "Newer product", cost: "$$" },
      { name: "SD Elements (Security Compass)", tier: "mid", tcl: "N/A", strengths: "Policy-based security req generation, CI/CD integration", weaknesses: "Not automotive-specific", cost: "$$" },
      { name: "OWASP Threat Dragon", tier: "startup", tcl: "N/A", strengths: "Open source, good for basic threat modeling", weaknesses: "Manual, no automotive templates, no 21434 mapping", cost: "$" },
    ]
  },
  {
    category: "Static Analysis & MISRA", phase: "software",
    tools: [
      { name: "MathWorks Polyspace", tier: "enterprise", tcl: "TCL1", strengths: "Exhaustive analysis (proves absence of errors), TÜV certified", weaknesses: "Expensive, long analysis times for large codebases", cost: "$$$" },
      { name: "Perforce Helix QAC", tier: "enterprise", tcl: "TCL1", strengths: "Deepest MISRA pedigree, oldest automotive tool, compliance reports", weaknesses: "Legacy UI, complex configuration", cost: "$$$" },
      { name: "LDRA TBvision", tier: "enterprise", tcl: "TCL1", strengths: "Full lifecycle verification, DO-178C + 26262, structural coverage", weaknesses: "Complex setup, expensive", cost: "$$$" },
      { name: "Parasoft C/C++test", tier: "mid", tcl: "TCL1", strengths: "CI/CD friendly, broad rule sets (MISRA+CERT+CWE), good UX", weaknesses: "Shallower analysis than Polyspace", cost: "$$" },
      { name: "Axivion Suite", tier: "mid", tcl: "TCL1", strengths: "Architecture erosion detection, MISRA+AUTOSAR, delta analysis", weaknesses: "Smaller market presence", cost: "$$" },
      { name: "Cppcheck + MISRA addon", tier: "startup", tcl: "TCL3", strengths: "Open source, credible MISRA C:2025, CI/CD native", weaknesses: "No TCL certification, self-qualification needed", cost: "$" },
    ]
  },
  {
    category: "AUTOSAR & MBD", phase: "system",
    tools: [
      { name: "Vector DaVinci", tier: "enterprise", tcl: "TCL1", strengths: "~40% market share, complete Classic platform, MICROSAR", weaknesses: "Expensive, vendor lock-in", cost: "$$$" },
      { name: "ETAS ISOLAR", tier: "enterprise", tcl: "TCL1", strengths: "~25% share, strong Bosch ecosystem, RTA-BSW", weaknesses: "Bosch-centric ecosystem", cost: "$$$" },
      { name: "EB tresos", tier: "enterprise", tcl: "TCL1", strengths: "~20% share, Continental heritage, EB corbos for Adaptive", weaknesses: "Less intuitive than DaVinci", cost: "$$$" },
      { name: "MathWorks Simulink/EC", tier: "enterprise", tcl: "TCL1", strengths: "Model-based design standard, code generation, TÜV certified", weaknesses: "License cost, model complexity at scale", cost: "$$$" },
      { name: "ESTEREL SCADE", tier: "enterprise", tcl: "TCL1", strengths: "Formally verified code gen, DO-178C heritage, deterministic", weaknesses: "Niche, steep learning curve", cost: "$$$" },
      { name: "ERIKA Enterprise", tier: "startup", tcl: "TCL3", strengths: "Open source AUTOSAR-like RTOS, OSEK compliant", weaknesses: "Not full AUTOSAR, self-qualification", cost: "$" },
    ]
  },
  {
    category: "Testing & HIL", phase: "vv",
    tools: [
      { name: "dSPACE SCALEXIO", tier: "enterprise", tcl: "TCL1", strengths: "Leads HIL market, real-time simulation, sensor simulation", weaknesses: "Very expensive, complex setup", cost: "$$$" },
      { name: "Vector CANoe", tier: "enterprise", tcl: "TCL1", strengths: "Universal bus testing (CAN/LIN/ETH/FlexRay), CAPL scripting", weaknesses: "License per protocol, Windows only", cost: "$$$" },
      { name: "NI PXI / VeriStand", tier: "enterprise", tcl: "TCL1", strengths: "Flexible FPGA-based, customizable, LabVIEW ecosystem", weaknesses: "More DIY than turnkey", cost: "$$$" },
      { name: "VectorCAST", tier: "mid", tcl: "TCL1", strengths: "Automated unit/integration testing, MC/DC coverage, TÜV cert", weaknesses: "Primarily C/C++", cost: "$$" },
      { name: "IPG CarMaker", tier: "mid", tcl: "TCL1", strengths: "Only TÜV-certified driving simulator, ADAS scenario testing", weaknesses: "Specialized for vehicle dynamics", cost: "$$" },
      { name: "CARLA Simulator", tier: "startup", tcl: "TCL3", strengths: "Open source, dominant in research, sensor sim, scenario API", weaknesses: "No TCL cert, research-grade not production", cost: "$" },
    ]
  },
  {
    category: "AI/ML Lifecycle", phase: "software",
    tools: [
      { name: "Weights & Biases", tier: "mid", tcl: "TCL3", strengths: "Best experiment tracking UX, model registry, sweeps", weaknesses: "No automotive-specific features, cloud dependency", cost: "$$" },
      { name: "CVAT", tier: "startup", tcl: "TCL3", strengths: "Open source annotation, auto-labeling, good for images/video", weaknesses: "Self-hosted complexity, needs scaling work", cost: "$" },
      { name: "NVIDIA TensorRT", tier: "mid", tcl: "TCL3", strengths: "Best inference optimization for NVIDIA GPUs, INT8 quantization", weaknesses: "NVIDIA lock-in, qualification needed per 8800", cost: "$$" },
      { name: "DVC (Data Version Control)", tier: "startup", tcl: "TCL3", strengths: "Git-like data versioning, pipeline DAGs, open source", weaknesses: "Learning curve, storage backend needed", cost: "$" },
      { name: "Arize AI", tier: "mid", tcl: "N/A", strengths: "ML observability, drift detection, performance monitoring", weaknesses: "Cloud-only, newer product", cost: "$$" },
    ]
  },
];

const ROLES = [
  { id: "safety", name: "Functional Safety Engineer", icon: "🛡", focus: ["26262", "concept", "system", "vv"] },
  { id: "cyber", name: "Cybersecurity Engineer", icon: "🔐", focus: ["21434", "concept", "software", "prod"] },
  { id: "swdev", name: "Software Developer", icon: "⌨", focus: ["26262", "aspice", "software", "vv"] },
  { id: "aiml", name: "AI/ML Engineer", icon: "🧠", focus: ["8800", "aspice", "software", "vv"] },
  { id: "quality", name: "Quality / Process Manager", icon: "📋", focus: ["9001", "aspice", "org", "prod"] },
  { id: "auditor", name: "Auditor / Assessor", icon: "🔍", focus: ["26262", "21434", "aspice", "9001"] },
];

const DMAIC_TEMPLATE = {
  define: { title: "Define", fields: ["Problem Statement", "Project Charter", "Voice of Customer", "SIPOC Diagram", "CTQ (Critical to Quality)"] },
  measure: { title: "Measure", fields: ["Current Process Map", "Data Collection Plan", "Measurement System Analysis", "Baseline Metrics", "Process Capability (Cp/Cpk)"] },
  analyze: { title: "Analyze", fields: ["Fishbone / Ishikawa Diagram", "5 Whys Analysis", "Pareto Chart Data", "Regression / Correlation", "Root Cause Verification"] },
  improve: { title: "Improve", fields: ["Solution Selection Matrix", "Pilot Plan", "Implementation Timeline", "Risk Mitigation (FMEA)", "Before/After Comparison"] },
  control: { title: "Control", fields: ["Control Plan", "Control Charts (X-bar, R)", "Standard Operating Procedure", "Training Plan", "Monitoring Dashboard"] },
};

const DOWNTIME_WASTES = [
  { letter: "D", name: "Defects", auto: "Escaped defects found post-release, rework from audit findings" },
  { letter: "O", name: "Overproduction", auto: "Redundant artifacts across siloed standards, duplicate test cases" },
  { letter: "W", name: "Waiting", auto: "Tool license bottlenecks, supplier approval delays, gate review queues" },
  { letter: "N", name: "Non-utilized talent", auto: "Engineers doing manual traceability instead of engineering work" },
  { letter: "T", name: "Transportation", auto: "Manual artifact handoffs between tools (DOORS → Excel → SharePoint)" },
  { letter: "I", name: "Inventory", auto: "Backlog of unreviewed work products, unprocessed field data" },
  { letter: "M", name: "Motion", auto: "Context switching between 6+ tool interfaces per phase" },
  { letter: "E", name: "Extra processing", auto: "Separate audits for each standard instead of integrated assessment" },
];

const AUDIT_CHECKLISTS = {
  "26262": [
    { item: "Safety plan exists and is maintained", clause: "Part 2, Cl.6.4.1" },
    { item: "HARA completed with ASIL classification", clause: "Part 3, Cl.7" },
    { item: "Functional safety concept documented", clause: "Part 3, Cl.8" },
    { item: "Technical safety concept with safety mechanisms", clause: "Part 4, Cl.6" },
    { item: "HW architectural metrics meet targets (SPFM, LFM, PMHF)", clause: "Part 5, Cl.7-8" },
    { item: "SW safety requirements traced to architecture", clause: "Part 6, Cl.6-7" },
    { item: "Unit testing with MC/DC coverage per ASIL", clause: "Part 6, Cl.9, Table 9" },
    { item: "Integration testing evidence complete", clause: "Part 6, Cl.10-11" },
    { item: "Safety validation report", clause: "Part 4, Cl.8-9" },
    { item: "Tool qualification for TCL2/3 tools", clause: "Part 8, Cl.11" },
    { item: "Confirmation reviews / assessments completed", clause: "Part 2, Cl.6.4.6-8" },
    { item: "Safety case / safety argument documented", clause: "Part 4, Cl.9" },
  ],
  "21434": [
    { item: "CSMS policy and organization established", clause: "Cl.5" },
    { item: "Cybersecurity responsibilities assigned", clause: "Cl.5.4" },
    { item: "TARA completed for all items", clause: "Cl.9, Cl.15" },
    { item: "Cybersecurity goals defined with CAL", clause: "Cl.9" },
    { item: "Cybersecurity concept documented", clause: "Cl.9" },
    { item: "Secure coding practices followed", clause: "Cl.10" },
    { item: "Vulnerability analysis (SAST/DAST) performed", clause: "Cl.10" },
    { item: "Cybersecurity validation completed", clause: "Cl.11" },
    { item: "Production cybersecurity controls in place", clause: "Cl.12" },
    { item: "PSIRT / vulnerability monitoring active", clause: "Cl.8" },
    { item: "Cybersecurity case documented", clause: "Cl.11" },
  ],
  "aspice": [
    { item: "SYS.1: Stakeholder requirements elicited and agreed", clause: "SYS.1 BP.1-5" },
    { item: "SYS.2: System requirements analyzed and allocated", clause: "SYS.2 BP.1-6" },
    { item: "SYS.3: System architecture designed and evaluated", clause: "SYS.3 BP.1-5" },
    { item: "SWE.1: Software requirements specified", clause: "SWE.1 BP.1-6" },
    { item: "SWE.2: Software architecture designed", clause: "SWE.2 BP.1-6" },
    { item: "SWE.3: Software detailed design and unit construction", clause: "SWE.3 BP.1-5" },
    { item: "SWE.4: Software unit verification (testing)", clause: "SWE.4 BP.1-4" },
    { item: "SWE.5: Software integration and integration test", clause: "SWE.5 BP.1-5" },
    { item: "SWE.6: Software qualification test", clause: "SWE.6 BP.1-4" },
    { item: "MLE.1-4: ML engineering processes (if AI)", clause: "MLE.1-4" },
    { item: "SUP.8: Configuration management in place", clause: "SUP.8 BP.1-6" },
    { item: "Bidirectional traceability maintained", clause: "All SYS/SWE GPs" },
  ],
  "9001": [
    { item: "Quality policy defined and communicated", clause: "Cl.5.2" },
    { item: "Risk-based thinking applied to planning", clause: "Cl.6.1" },
    { item: "APQP phases executed", clause: "IATF 8.3.2.1" },
    { item: "PPAP submission package complete", clause: "IATF 8.3.4.4" },
    { item: "Control plan established", clause: "IATF 8.5.1.1" },
    { item: "MSA (Measurement System Analysis) performed", clause: "IATF 7.1.5.1.1" },
    { item: "Internal audit program executed", clause: "Cl.9.2" },
    { item: "Nonconformity and corrective action process active", clause: "Cl.10.2" },
    { item: "Customer satisfaction monitored", clause: "Cl.9.1.2" },
    { item: "Management review conducted", clause: "Cl.9.3" },
  ],
};

const GLOSSARY_TERMS = [
  { term: "ASIL", definition: "Automotive Safety Integrity Level (QM, A, B, C, D) — risk classification per ISO 26262", standard: "26262" },
  { term: "CAL", definition: "Cybersecurity Assurance Level (1-4) — risk classification per ISO/SAE 21434", standard: "21434" },
  { term: "HARA", definition: "Hazard Analysis and Risk Assessment — systematic identification of hazardous events", standard: "26262" },
  { term: "TARA", definition: "Threat Analysis and Risk Assessment — systematic identification of cybersecurity threats", standard: "21434" },
  { term: "SOTIF", definition: "Safety Of The Intended Functionality — addresses hazards from functional insufficiencies", standard: "21448" },
  { term: "FMEA", definition: "Failure Mode and Effects Analysis — systematic evaluation of potential failure modes", standard: "26262/9001" },
  { term: "FMEDA", definition: "Failure Mode Effects and Diagnostic Analysis — quantitative analysis for HW safety metrics", standard: "26262" },
  { term: "FTA", definition: "Fault Tree Analysis — top-down deductive failure analysis method", standard: "26262" },
  { term: "SPFM", definition: "Single Point Fault Metric — percentage of safe/detected single-point faults", standard: "26262" },
  { term: "LFM", definition: "Latent Fault Metric — percentage of safe/detected latent faults", standard: "26262" },
  { term: "PMHF", definition: "Probabilistic Metric for Hardware Failures — target failure rate per hour", standard: "26262" },
  { term: "FSC", definition: "Functional Safety Concept — safety goals allocated to functional safety requirements", standard: "26262" },
  { term: "TSC", definition: "Technical Safety Concept — safety requirements allocated to HW/SW architecture", standard: "26262" },
  { term: "CSMS", definition: "Cybersecurity Management System — organizational framework for vehicle cybersecurity", standard: "21434" },
  { term: "PSIRT", definition: "Product Security Incident Response Team — handles vulnerability disclosures", standard: "21434" },
  { term: "ODD", definition: "Operational Design Domain — conditions under which a system is designed to function", standard: "21448/8800" },
  { term: "TCL", definition: "Tool Confidence Level (1-3) — classification for software tool qualification", standard: "26262" },
  { term: "MC/DC", definition: "Modified Condition/Decision Coverage — structural code coverage criterion", standard: "26262" },
  { term: "DMAIC", definition: "Define-Measure-Analyze-Improve-Control — Lean Six Sigma improvement cycle", standard: "Six Sigma" },
  { term: "SIPOC", definition: "Supplier-Input-Process-Output-Customer — process mapping tool", standard: "Six Sigma" },
  { term: "VSM", definition: "Value Stream Mapping — visualization of material and information flow", standard: "Lean" },
  { term: "CTQ", definition: "Critical To Quality — key measurable characteristics of a product/process", standard: "Six Sigma" },
  { term: "DPMO", definition: "Defects Per Million Opportunities — Six Sigma quality metric", standard: "Six Sigma" },
  { term: "FFI", definition: "Freedom From Interference — ensuring SW elements don't interfere across ASIL levels", standard: "26262" },
  { term: "SecOC", definition: "Secure Onboard Communication — AUTOSAR module for authenticated communication", standard: "AUTOSAR" },
  { term: "E2E", definition: "End-to-End Protection — AUTOSAR library for communication integrity", standard: "AUTOSAR" },
  { term: "HSM", definition: "Hardware Security Module — dedicated crypto processor for key storage and operations", standard: "21434" },
  { term: "ReqIF", definition: "Requirements Interchange Format — OMG standard for requirements exchange", standard: "Industry" },
  { term: "ARXML", definition: "AUTOSAR XML — configuration file format for AUTOSAR systems", standard: "AUTOSAR" },
  { term: "SIL/MIL/HIL", definition: "Software/Model/Hardware-In-the-Loop — simulation test levels", standard: "Industry" },
];

// ─── STYLES ─────────────────────────────────────────────────────────────────

const c = {
  navy: "#0F2B46", navyLight: "#1B3A5C", navyMid: "#2C6FAC",
  teal: "#0D9488", tealLight: "#14B8A6", tealBg: "#F0FDFA",
  slate: "#334155", slateLight: "#64748B", slatePale: "#F1F5F9",
  bg: "#FAFBFC", card: "#FFFFFF", border: "#E2E8F0",
  warn: "#D97706", warnBg: "#FFFBEB",
  success: "#059669", successBg: "#ECFDF5",
  danger: "#DC2626",
  accent: "#7C3AED",
};

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function Badge({ children, color = c.teal, bg = c.tealBg }) {
  return <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 3, fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", color, background: bg, border: `1px solid ${color}22` }}>{children}</span>;
}

function Pill({ children, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "6px 16px", borderRadius: 4, fontSize: 13, fontWeight: active ? 600 : 400, cursor: "pointer", transition: "all 0.15s",
      background: active ? c.navy : "transparent", color: active ? "#fff" : c.slate, border: `1px solid ${active ? c.navy : c.border}`,
    }}>{children}</button>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: c.navy, margin: 0, lineHeight: 1.3 }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 13, color: c.slateLight, margin: "4px 0 0", lineHeight: 1.4 }}>{subtitle}</p>}
      <div style={{ marginTop: 16 }}>{children}</div>
    </div>
  );
}

function DataTable({ headers, rows, compact }) {
  return (
    <div style={{ overflowX: "auto", border: `1px solid ${c.border}`, borderRadius: 4 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: compact ? 12 : 13 }}>
        <thead>
          <tr style={{ background: c.navy }}>
            {headers.map((h, i) => <th key={i} style={{ padding: compact ? "8px 10px" : "10px 14px", textAlign: "left", color: "#fff", fontWeight: 600, fontSize: compact ? 11 : 12, letterSpacing: 0.3, textTransform: "uppercase", borderBottom: `2px solid ${c.teal}` }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : c.slatePale, borderBottom: `1px solid ${c.border}` }}>
              {row.map((cell, j) => <td key={j} style={{ padding: compact ? "6px 10px" : "10px 14px", color: c.slate, lineHeight: 1.4, verticalAlign: "top" }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Checklist({ items, checked, onToggle }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map((item, i) => (
        <label key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 12px", borderRadius: 4, cursor: "pointer", background: checked[i] ? c.successBg : "#fff", border: `1px solid ${checked[i] ? c.success + "44" : c.border}`, transition: "all 0.15s" }}>
          <input type="checkbox" checked={!!checked[i]} onChange={() => onToggle(i)} style={{ marginTop: 2, accentColor: c.teal }} />
          <div>
            <div style={{ fontSize: 13, color: c.slate, textDecoration: checked[i] ? "line-through" : "none", opacity: checked[i] ? 0.7 : 1 }}>{item.item || item}</div>
            {item.clause && <div style={{ fontSize: 11, color: c.slateLight, marginTop: 2 }}>{item.clause}</div>}
          </div>
        </label>
      ))}
    </div>
  );
}

function ProgressBar({ value, max, label }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ marginBottom: 8 }}>
      {label && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: c.slate, fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 12, color: c.teal, fontWeight: 700 }}>{pct}%</span>
      </div>}
      <div style={{ height: 6, background: c.slatePale, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${c.teal}, ${c.tealLight})`, borderRadius: 3, transition: "width 0.3s ease" }} />
      </div>
    </div>
  );
}

function Callout({ children, type = "info" }) {
  const styles = { info: { border: c.teal, bg: c.tealBg }, warn: { border: c.warn, bg: c.warnBg }, success: { border: c.success, bg: c.successBg } };
  const s = styles[type];
  return <div style={{ padding: "12px 16px", borderLeft: `4px solid ${s.border}`, background: s.bg, borderRadius: "0 4px 4px 0", fontSize: 13, color: c.slate, lineHeight: 1.5 }}>{children}</div>;
}

function CollapsibleCard({ title, badge, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: `1px solid ${c.border}`, borderRadius: 4, marginBottom: 8, overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: open ? c.slatePale : "#fff", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontSize: 12, color: c.slateLight, transition: "transform 0.2s", transform: open ? "rotate(90deg)" : "rotate(0)" }}>▶</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: c.navy, flex: 1 }}>{title}</span>
        {badge && <Badge>{badge}</Badge>}
      </button>
      {open && <div style={{ padding: "12px 16px", borderTop: `1px solid ${c.border}` }}>{children}</div>}
    </div>
  );
}

function TextInput({ label, value, onChange, multiline }) {
  const shared = { width: "100%", padding: "8px 12px", border: `1px solid ${c.border}`, borderRadius: 4, fontSize: 13, color: c.slate, background: "#fff", fontFamily: "inherit", outline: "none", boxSizing: "border-box" };
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: c.slateLight, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label>
      {multiline ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} style={{ ...shared, resize: "vertical" }} /> : <input value={value} onChange={e => onChange(e.target.value)} style={shared} />}
    </div>
  );
}

// ─── MODULE 1: Standards Compliance Navigator ───────────────────────────────

function ModuleStandards({ role }) {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [selectedStandard, setSelectedStandard] = useState(null);

  const filteredPhases = role ? PHASES.filter(p => ROLES.find(r => r.id === role)?.focus.includes(p.id)) : PHASES;

  return (
    <div>
      <Section title="Standards Compliance Navigator" subtitle="Interactive cross-mapping of 6 automotive standards across 7 lifecycle phases — from v1 Rosetta Stone tables">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          <Pill active={!selectedStandard} onClick={() => setSelectedStandard(null)}>All Standards</Pill>
          {STANDARDS.map(s => <Pill key={s.id} active={selectedStandard === s.id} onClick={() => setSelectedStandard(s.id)}>{s.name.split(":")[0].split("/")[0]}</Pill>)}
        </div>
        {!selectedStandard && (
          <DataTable
            headers={["Standard", "Edition", "Scope", "Structure"]}
            rows={STANDARDS.map(s => [<strong style={{ color: c.navy }}>{s.name}</strong>, s.edition, s.scope, `${s.parts} Part(s), ${s.clauses}`])}
          />
        )}
      </Section>

      <Section title="Lifecycle Phase Cross-Mapping" subtitle={`${filteredPhases.length} phases shown${role ? ` (filtered for ${ROLES.find(r=>r.id===role)?.name})` : ""}`}>
        {filteredPhases.map(phase => (
          <CollapsibleCard key={phase.id} title={`Ch.${phase.chapter}: ${phase.name}`} badge={`${Object.keys(phase.clauses).length} standards`} defaultOpen={selectedPhase === phase.id}>
            <DataTable
              headers={["Standard", "Applicable Clauses"]}
              rows={Object.entries(phase.clauses)
                .filter(([sid]) => !selectedStandard || sid === selectedStandard)
                .map(([sid, clauses]) => [
                  <strong style={{ color: c.teal }}>{STANDARDS.find(s => s.id === sid)?.name || sid}</strong>,
                  clauses
                ])}
              compact
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: c.success, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 0.5 }}>Commonalities (Do Once)</h4>
                {phase.commonalities.map((item, i) => <div key={i} style={{ fontSize: 12, color: c.slate, padding: "4px 0", borderBottom: `1px solid ${c.border}` }}>✓ {item}</div>)}
              </div>
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: c.warn, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 0.5 }}>Gaps (Can't Skip)</h4>
                {phase.gaps.map((item, i) => <div key={i} style={{ fontSize: 12, color: c.slate, padding: "4px 0", borderBottom: `1px solid ${c.border}` }}>⚠ {item}</div>)}
              </div>
            </div>
          </CollapsibleCard>
        ))}
      </Section>
    </div>
  );
}

// ─── MODULE 2: Tool Stack Explorer ──────────────────────────────────────────

function ModuleTools({ role }) {
  const [tierFilter, setTierFilter] = useState(null);
  const [phaseFilter, setPhaseFilter] = useState(null);

  const filtered = TOOL_CATEGORIES.filter(cat => {
    if (phaseFilter && cat.phase !== phaseFilter) return false;
    return true;
  }).map(cat => ({
    ...cat,
    tools: cat.tools.filter(t => !tierFilter || t.tier === tierFilter)
  })).filter(cat => cat.tools.length > 0);

  const totalTools = filtered.reduce((sum, cat) => sum + cat.tools.length, 0);

  return (
    <div>
      <Section title="Tool Stack Explorer" subtitle={`200+ tools cataloged across ${TOOL_CATEGORIES.length} categories — filter by budget tier and lifecycle phase`}>
        <Callout type="info">
          <strong>Budget Tiers:</strong> Startup ($50K–200K) | Mid-Tier ($500K–2M) | Enterprise ($2M–10M+) — per the v2 cost analysis
        </Callout>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "16px 0" }}>
          <Pill active={!tierFilter} onClick={() => setTierFilter(null)}>All Tiers</Pill>
          <Pill active={tierFilter === "startup"} onClick={() => setTierFilter("startup")}>$ Startup</Pill>
          <Pill active={tierFilter === "mid"} onClick={() => setTierFilter("mid")}>$$ Mid-Tier</Pill>
          <Pill active={tierFilter === "enterprise"} onClick={() => setTierFilter("enterprise")}>$$$ Enterprise</Pill>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          <Pill active={!phaseFilter} onClick={() => setPhaseFilter(null)}>All Phases</Pill>
          {PHASES.map(p => <Pill key={p.id} active={phaseFilter === p.id} onClick={() => setPhaseFilter(p.id)}>{p.name}</Pill>)}
        </div>
        <p style={{ fontSize: 12, color: c.slateLight }}>{totalTools} tools shown across {filtered.length} categories</p>
      </Section>

      {filtered.map(cat => (
        <Section key={cat.category} title={cat.category} subtitle={`Phase: ${PHASES.find(p=>p.id===cat.phase)?.name || cat.phase}`}>
          <DataTable
            headers={["Tool", "Tier", "TCL", "Strengths", "Weaknesses", "Cost"]}
            rows={cat.tools.map(t => [
              <strong style={{ color: c.navy, whiteSpace: "nowrap" }}>{t.name}</strong>,
              <Badge color={t.tier === "enterprise" ? c.accent : t.tier === "mid" ? c.teal : c.warn} bg={t.tier === "enterprise" ? "#F3F0FF" : t.tier === "mid" ? c.tealBg : c.warnBg}>{t.tier}</Badge>,
              <Badge color={t.tcl.includes("1") ? c.success : t.tcl.includes("3") ? c.warn : c.slateLight} bg={t.tcl.includes("1") ? c.successBg : t.tcl.includes("3") ? c.warnBg : c.slatePale}>{t.tcl}</Badge>,
              <span style={{ fontSize: 12 }}>{t.strengths}</span>,
              <span style={{ fontSize: 12, color: c.slateLight }}>{t.weaknesses}</span>,
              <strong>{t.cost}</strong>,
            ])}
            compact
          />
        </Section>
      ))}

      <Section title="Reference Tool Chains" subtitle="Three traced requirement paths from v2 Chapters 11-13">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          {[
            { name: "Vector-Centric Enterprise", flow: "DOORS → EA → DaVinci → GHS MULTI → Polyspace + VectorCAST → CANoe → SCALEXIO → Reqtify → Jenkins/Artifactory", cost: "$2M–10M+" },
            { name: "Siemens-Centric Enterprise", flow: "Polarion → Cameo → EB tresos → IAR → LDRA + Cantata → CANoe → OPAL-RT → GitLab CI/Nexus", cost: "$1.5M–8M+" },
            { name: "Lean / Open-Source", flow: "codeBeamer/Tuleap → Papyrus → ERIKA → GCC/HighTec → Cppcheck + GoogleTest → python-can → Speedgoat → Jenkins + Git LFS", cost: "$50K–200K" },
          ].map((chain, i) => (
            <div key={i} style={{ padding: 16, border: `1px solid ${c.border}`, borderLeft: `4px solid ${c.teal}`, borderRadius: "0 4px 4px 0", background: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <strong style={{ color: c.navy, fontSize: 14 }}>{chain.name}</strong>
                <Badge color={c.accent} bg="#F3F0FF">{chain.cost}</Badge>
              </div>
              <div style={{ fontSize: 12, color: c.slate, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", lineHeight: 1.6, wordBreak: "break-word" }}>{chain.flow}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── MODULE 3: Release Planning & Governance ────────────────────────────────

function ModuleRelease() {
  const gates = [
    { name: "G0 — Project Kickoff", phase: "org", checks: ["Safety plan approved", "CSMS established", "ASPICE process baseline", "Quality plan reviewed", "Tool chain selected"], status: "pending" },
    { name: "G1 — Concept Complete", phase: "concept", checks: ["HARA + TARA + SOTIF eval complete", "Safety/CS/SOTIF goals defined", "AI safety requirements (if applicable)", "Functional safety concept approved", "ASPICE SYS.1-2 evidence"], status: "pending" },
    { name: "G2 — Architecture Approved", phase: "system", checks: ["TSC + CS specification reviewed", "Architecture satisfies all domain requirements", "ASIL decomposition justified (if used)", "E2E + SecOC specified", "SYS.3 evidence complete"], status: "pending" },
    { name: "G3 — Design & Code Complete", phase: "software", checks: ["MISRA compliance report clean", "Static analysis (SAST/DAST) passed", "AI model trained and validated", "MC/DC coverage meets ASIL target", "SWE.1-6 + MLE.1-4 evidence"], status: "pending" },
    { name: "G4 — V&V Complete", phase: "vv", checks: ["HIL/SIL/MIL testing passed", "Penetration testing completed", "Scenario testing (SOTIF) passed", "Adversarial testing (AI) passed", "Integrated assurance case reviewed"], status: "pending" },
    { name: "G5 — Production Release", phase: "prod", checks: ["All audit findings closed", "PPAP package submitted", "OTA infrastructure verified", "PSIRT operational", "Field monitoring active"], status: "pending" },
  ];

  const [gateState, setGateState] = useState(gates.map(g => g.checks.map(() => false)));

  const toggleGateCheck = (gi, ci) => {
    setGateState(prev => {
      const next = prev.map(g => [...g]);
      next[gi][ci] = !next[gi][ci];
      return next;
    });
  };

  return (
    <div>
      <Section title="Release Planning & Governance" subtitle="Phase-gate tracker aligned to the unified V-model — 6 gates from kickoff to production release">
        <Callout type="info">
          Each gate maps directly to handbook lifecycle phases (Ch.4-10) and requires evidence from all applicable standards before proceeding.
        </Callout>
      </Section>

      <Section title="Gate Progress Overview">
        {gates.map((gate, gi) => {
          const done = gateState[gi].filter(Boolean).length;
          const total = gate.checks.length;
          return <ProgressBar key={gi} value={done} max={total} label={`${gate.name} — ${done}/${total} checks`} />;
        })}
      </Section>

      {gates.map((gate, gi) => (
        <Section key={gi} title={gate.name} subtitle={`Phase: ${PHASES.find(p=>p.id===gate.phase)?.name}`}>
          <Checklist items={gate.checks.map(ch => ({ item: ch }))} checked={gateState[gi]} onToggle={(ci) => toggleGateCheck(gi, ci)} />
        </Section>
      ))}

      <Section title="RACI Matrix" subtitle="Responsibility assignment for key integrated activities">
        <DataTable
          headers={["Activity", "Safety Eng", "Cyber Eng", "SW Dev", "AI/ML Eng", "Quality Mgr", "Auditor"]}
          rows={[
            ["HARA Workshop", "R/A", "C", "I", "C", "I", "I"],
            ["TARA Workshop", "C", "R/A", "C", "C", "I", "I"],
            ["SOTIF Analysis", "R", "C", "C", "R", "I", "I"],
            ["Architecture Review", "A", "R", "R", "C", "C", "I"],
            ["Code Review (MISRA)", "C", "C", "R/A", "R", "I", "I"],
            ["AI Model Validation", "C", "C", "C", "R/A", "I", "I"],
            ["Integrated V&V", "R", "R", "R", "R", "A", "I"],
            ["Assurance Case", "R", "R", "C", "C", "A", "R"],
            ["Audit Preparation", "C", "C", "C", "C", "R", "A"],
            ["Field Monitoring", "R", "R", "C", "R", "A", "I"],
          ]}
          compact
        />
        <p style={{ fontSize: 11, color: c.slateLight, marginTop: 8 }}>R = Responsible, A = Accountable, C = Consulted, I = Informed</p>
      </Section>
    </div>
  );
}

// ─── MODULE 4: Testing & Validation Workbook ────────────────────────────────

function ModuleTesting() {
  const [testChecks, setTestChecks] = useState({});
  const toggleTest = (category, idx) => {
    setTestChecks(prev => {
      const key = `${category}-${idx}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  const testLevels = [
    {
      level: "Unit Testing", standard_reqs: [
        { item: "MC/DC coverage per ASIL (26262-6 Table 9): ASIL A=Statement, B=Branch, C/D=MC/DC", clause: "ISO 26262-6:Cl.9" },
        { item: "Fuzz testing of input interfaces (security)", clause: "ISO 21434:Cl.10" },
        { item: "Edge case coverage for triggering conditions", clause: "ISO 21448:Cl.9" },
        { item: "Adversarial robustness testing for ML models", clause: "ISO/PAS 8800:Cl.9" },
        { item: "SWE.4 base practice compliance evidence", clause: "ASPICE SWE.4" },
      ]
    },
    {
      level: "Integration Testing", standard_reqs: [
        { item: "Interface testing between safety-relevant components", clause: "ISO 26262-6:Cl.10" },
        { item: "Security boundary testing (isolation verification)", clause: "ISO 21434:Cl.10" },
        { item: "Sensor fusion integration verification", clause: "ISO 21448:Cl.9" },
        { item: "ML pipeline integration (data → model → inference → output)", clause: "ISO/PAS 8800:Cl.7" },
        { item: "SWE.5 / SYS.4 evidence collection", clause: "ASPICE SWE.5, SYS.4" },
      ]
    },
    {
      level: "System Testing", standard_reqs: [
        { item: "Fault injection testing (single-point and multi-point)", clause: "ISO 26262-4:Cl.8" },
        { item: "Penetration testing of vehicle interfaces", clause: "ISO 21434:Cl.11" },
        { item: "Scenario-based testing (known unsafe + unknown scenarios)", clause: "ISO 21448:Cl.8-10" },
        { item: "ODD boundary testing for AI functions", clause: "ISO/PAS 8800:Cl.9" },
        { item: "SYS.5 / SWE.6 qualification test evidence", clause: "ASPICE SYS.5, SWE.6" },
        { item: "Control plan verification per APQP phase", clause: "IATF 16949:Cl.8.5.1.1" },
      ]
    },
    {
      level: "Vehicle-Level Validation", standard_reqs: [
        { item: "Safety validation on target vehicle (real driving)", clause: "ISO 26262-4:Cl.9" },
        { item: "Cybersecurity validation (real-world attack scenarios)", clause: "ISO 21434:Cl.11" },
        { item: "SOTIF residual risk acceptance (field exposure testing)", clause: "ISO 21448:Cl.10-11" },
        { item: "AI performance validation in production environment", clause: "ISO/PAS 8800:Cl.15" },
        { item: "VAL.1 validation evidence (NEW in ASPICE v4.0)", clause: "ASPICE VAL.1" },
      ]
    },
  ];

  return (
    <div>
      <Section title="Testing & Validation Workbook" subtitle="Integrated test plan builder — every test requirement traced to its standard, organized by test level">
        <Callout type="warn">
          A single test can satisfy multiple standards simultaneously. The commonality column shows where integrated testing reduces total effort.
        </Callout>
      </Section>

      {testLevels.map((level, li) => {
        const checkedCount = level.standard_reqs.filter((_, i) => testChecks[`${li}-${i}`]).length;
        return (
          <Section key={li} title={level.level} subtitle={`${checkedCount}/${level.standard_reqs.length} requirements addressed`}>
            <ProgressBar value={checkedCount} max={level.standard_reqs.length} />
            <Checklist
              items={level.standard_reqs}
              checked={level.standard_reqs.map((_, i) => testChecks[`${li}-${i}`])}
              onToggle={(i) => toggleTest(li, i)}
            />
          </Section>
        );
      })}

      <Section title="Coverage Targets by ASIL" subtitle="ISO 26262-6 Table 9 structural coverage requirements">
        <DataTable
          headers={["Coverage Method", "ASIL A", "ASIL B", "ASIL C", "ASIL D"]}
          rows={[
            ["Statement Coverage", "++", "++", "++", "++"],
            ["Branch Coverage", "+", "++", "++", "++"],
            ["MC/DC Coverage", "o", "+", "++", "++"],
            ["Equivalence Classes", "++", "++", "++", "++"],
            ["Boundary Value Analysis", "+", "++", "++", "++"],
            ["Error Guessing", "+", "+", "++", "++"],
          ]}
          compact
        />
        <p style={{ fontSize: 11, color: c.slateLight, marginTop: 8 }}>++ = Highly recommended, + = Recommended, o = No recommendation</p>
      </Section>
    </div>
  );
}

// ─── MODULE 5: Lean Six Sigma Process Engine ────────────────────────────────

function ModuleSixSigma() {
  const [dmaicData, setDmaicData] = useState(() => {
    const init = {};
    Object.keys(DMAIC_TEMPLATE).forEach(phase => {
      init[phase] = {};
      DMAIC_TEMPLATE[phase].fields.forEach(f => { init[phase][f] = ""; });
    });
    return init;
  });

  const [wasteNotes, setWasteNotes] = useState(DOWNTIME_WASTES.map(() => ""));
  const [activePhase, setActivePhase] = useState("define");

  const updateDmaic = (phase, field, value) => {
    setDmaicData(prev => ({ ...prev, [phase]: { ...prev[phase], [field]: value } }));
  };

  const filledFields = Object.values(dmaicData).reduce((sum, phase) => sum + Object.values(phase).filter(v => v.trim()).length, 0);
  const totalFields = Object.values(DMAIC_TEMPLATE).reduce((sum, phase) => sum + phase.fields.length, 0);

  return (
    <div>
      <Section title="Lean Six Sigma Process Engine" subtitle="Full DMAIC cycle with SIPOC, VSM, Fishbone, 5 Whys, and Control Charts — the v2 differentiator">
        <Callout type="info">
          This module ties waste identification directly to standards gaps and tool integration gaps. Every process improvement maps back to specific lifecycle phases from Module 1.
        </Callout>
        <ProgressBar value={filledFields} max={totalFields} label={`DMAIC Completion: ${filledFields}/${totalFields} fields`} />
      </Section>

      <Section title="DMAIC Improvement Cycle">
        <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
          {Object.entries(DMAIC_TEMPLATE).map(([key, val]) => {
            const phaseComplete = Object.values(dmaicData[key] || {}).filter(v => v.trim()).length;
            const phaseTotal = val.fields.length;
            return (
              <button key={key} onClick={() => setActivePhase(key)} style={{
                flex: 1, padding: "12px 8px", border: `2px solid ${activePhase === key ? c.teal : c.border}`, borderRadius: 4, cursor: "pointer",
                background: activePhase === key ? c.tealBg : "#fff", textAlign: "center", transition: "all 0.15s"
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: activePhase === key ? c.teal : c.navy }}>{val.title}</div>
                <div style={{ fontSize: 11, color: c.slateLight, marginTop: 2 }}>{phaseComplete}/{phaseTotal}</div>
              </button>
            );
          })}
        </div>

        <div style={{ padding: 16, border: `1px solid ${c.border}`, borderRadius: 4, background: "#fff" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: c.navy, margin: "0 0 16px" }}>{DMAIC_TEMPLATE[activePhase].title} Phase</h3>
          {DMAIC_TEMPLATE[activePhase].fields.map(field => (
            <TextInput key={field} label={field} value={dmaicData[activePhase][field] || ""} onChange={v => updateDmaic(activePhase, field, v)} multiline />
          ))}
        </div>
      </Section>

      <Section title="DOWNTIME Waste Identification" subtitle="8 categories of waste mapped to automotive standards implementation">
        {DOWNTIME_WASTES.map((waste, i) => (
          <CollapsibleCard key={i} title={`${waste.letter} — ${waste.name}`} badge={wasteNotes[i] ? "Noted" : null}>
            <Callout type="warn">{waste.auto}</Callout>
            <div style={{ marginTop: 12 }}>
              <TextInput label="Your observations / identified waste" value={wasteNotes[i]} onChange={v => setWasteNotes(prev => { const next = [...prev]; next[i] = v; return next; })} multiline />
            </div>
          </CollapsibleCard>
        ))}
      </Section>

      <Section title="SIPOC Template" subtitle="Map Suppliers → Inputs → Process → Outputs → Customers for any lifecycle phase">
        <DataTable
          headers={["Suppliers", "Inputs", "Process", "Outputs", "Customers"]}
          rows={[
            ["OEM / Customer", "Vehicle requirements, regulations, standards", "Concept & Planning (Ch.5)", "Safety/CS/SOTIF goals, FSC, TARA results", "System Engineering"],
            ["System Engineering", "Architecture spec, TSC, CS specification", "System Development (Ch.6)", "HW/SW requirements, architecture docs", "HW & SW Teams"],
            ["SW Team + AI Team", "SW requirements, ML requirements", "SW & AI/ML Development (Ch.8)", "Verified code, trained models, test reports", "V&V Team"],
            ["V&V Team", "Test plans, test specifications", "Integration & V&V (Ch.9)", "Test reports, assurance case, release package", "Production / Customer"],
            ["Field Operations", "Field data, vulnerability reports", "Production & Ops (Ch.10)", "Updates, patches, monitoring reports", "End Users / Regulators"],
          ]}
          compact
        />
      </Section>

      <Section title="5 Whys Template" subtitle="Drill to root cause — connect to Fishbone/Ishikawa categories">
        {[1, 2, 3, 4, 5].map(n => (
          <TextInput key={n} label={`Why #${n}?`} value="" onChange={() => {}} />
        ))}
        <Callout type="info">
          <strong>Fishbone Categories for Automotive:</strong> Man (competence gaps), Machine (tool limitations), Method (process gaps), Material (data quality), Measurement (metrics gaps), Mother Nature (environmental factors)
        </Callout>
      </Section>

      <Section title="Key Metrics for Control Charts" subtitle="Track these metrics to sustain improvements">
        <DataTable
          headers={["Metric", "Formula", "Target", "Six Sigma Level"]}
          rows={[
            ["Defect Escape Rate", "Field defects / Total defects found", "< 5%", "4σ"],
            ["First Pass Yield", "Units passing all tests first time / Total units", "> 95%", "4σ"],
            ["Cycle Time", "End date − Start date per lifecycle phase", "Per project baseline", "—"],
            ["Rework Rate", "Rework hours / Total engineering hours", "< 10%", "3.5σ"],
            ["Audit Finding Density", "Findings / Work products reviewed", "< 0.1", "4σ"],
            ["Requirements Churn", "Changed req / Total req after concept freeze", "< 15%", "3σ"],
            ["Tool Integration Coverage", "Automated handoffs / Total handoff points", "> 80%", "4σ"],
            ["DPMO (Defects per Million)", "Defects × 1,000,000 / Opportunities", "< 6,210 (4σ)", "4σ+"],
          ]}
          compact
        />
      </Section>
    </div>
  );
}

// ─── MODULE 6: Audit & Assessment Readiness ─────────────────────────────────

function ModuleAudit() {
  const [auditChecks, setAuditChecks] = useState(() => {
    const init = {};
    Object.keys(AUDIT_CHECKLISTS).forEach(std => {
      init[std] = AUDIT_CHECKLISTS[std].map(() => false);
    });
    return init;
  });

  const toggleAudit = (std, idx) => {
    setAuditChecks(prev => {
      const next = { ...prev };
      next[std] = [...prev[std]];
      next[std][idx] = !next[std][idx];
      return next;
    });
  };

  const stdNames = { "26262": "ISO 26262 Assessment", "21434": "ISO 21434 CSMS Audit", "aspice": "ASPICE Assessment", "9001": "ISO 9001 / IATF 16949 Audit" };

  return (
    <div>
      <Section title="Audit & Assessment Readiness" subtitle="Interactive checklists per standard — track evidence preparation and identify cross-audit reuse opportunities">
        <Callout type="info">
          <strong>Key insight from v1 Ch.14:</strong> A single integrated assurance case with domain-specific chapters can satisfy all four audit types simultaneously, reducing preparation effort by 40-60%.
        </Callout>
      </Section>

      <Section title="Readiness Overview">
        {Object.entries(stdNames).map(([std, name]) => {
          const done = auditChecks[std]?.filter(Boolean).length || 0;
          const total = AUDIT_CHECKLISTS[std]?.length || 0;
          return <ProgressBar key={std} value={done} max={total} label={`${name}: ${done}/${total}`} />;
        })}
      </Section>

      {Object.entries(AUDIT_CHECKLISTS).map(([std, items]) => (
        <Section key={std} title={stdNames[std]}>
          <Checklist items={items} checked={auditChecks[std] || []} onToggle={(i) => toggleAudit(std, i)} />
        </Section>
      ))}

      <Section title="Cross-Audit Evidence Reuse" subtitle="Artifacts that satisfy multiple auditors — from v1 Ch.13 consolidation guide">
        <DataTable
          headers={["Integrated Work Product", "Satisfies"]}
          rows={[
            ["Integrated Item/Asset Definition", "26262 Item Def + 21434 Asset ID + 21448 SOTIF Scope + 8800 AI Scope"],
            ["Unified Risk Assessment Report", "HARA + TARA + SOTIF Eval + AI Safety Analysis + FMEA (IATF)"],
            ["Consolidated Requirements Spec", "Safety req + Security req + SOTIF req + AI req + Quality req"],
            ["Integrated Architecture Document", "TSC + CS Specification + SOTIF Architecture + AI Architecture"],
            ["Unified V&V Plan & Report", "Safety V&V + CS Validation + SOTIF V&V + AI V&V + SYS.4/5 + SWE.5/6"],
            ["Integrated Assurance Case", "Safety Case + CS Case + SOTIF Argument + AI Assurance Case"],
            ["Unified Field Monitoring Procedure", "Safety anomaly + Vuln monitoring + SOTIF monitoring + AI drift monitoring"],
          ]}
          compact
        />
        <Callout type="success">These 7 integrated work products replace 30+ siloed documents — from v1 Chapter 13.</Callout>
      </Section>
    </div>
  );
}

// ─── MODULE 7: Reference Library ────────────────────────────────────────────

function ModuleReference() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGlossary = GLOSSARY_TERMS.filter(t =>
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Section title="Reference Library" subtitle="Glossary, bibliography, and quick reference — from v1 Appendices A-D">
        <TextInput label="Search glossary" value={searchTerm} onChange={setSearchTerm} />
      </Section>

      <Section title={`Glossary (${filteredGlossary.length} terms)`}>
        <DataTable
          headers={["Term", "Definition", "Standard"]}
          rows={filteredGlossary.map(t => [
            <strong style={{ color: c.navy, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{t.term}</strong>,
            t.definition,
            <Badge>{t.standard}</Badge>,
          ])}
          compact
        />
      </Section>

      <Section title="Key References (IEEE Format)" subtitle="From v1 Appendix B — 50+ references">
        {[
          { ref: "[1]", text: 'ISO, "Road vehicles — Functional safety," ISO 26262:2018, Parts 1-12, 2018.' },
          { ref: "[2]", text: 'ISO/SAE, "Road vehicles — Cybersecurity engineering," ISO/SAE 21434:2021, 2021.' },
          { ref: "[3]", text: 'ISO, "Road vehicles — Safety of the intended functionality," ISO 21448:2022, 2022.' },
          { ref: "[4]", text: 'ISO, "Road vehicles — Safety and artificial intelligence," ISO/PAS 8800:2024, 2024.' },
          { ref: "[5]", text: 'ISO, "Quality management systems — Requirements," ISO 9001:2015, 2015.' },
          { ref: "[6]", text: 'IATF, "Quality management system requirements for automotive production," IATF 16949:2016, 2016.' },
          { ref: "[7]", text: 'VDA QMC / intacs, "Automotive SPICE Process Assessment / Reference Model," v4.0, 2023.' },
          { ref: "[8]", text: 'UNECE, "Cyber security and cyber security management system," UN Regulation No. 155, 2021.' },
          { ref: "[9]", text: 'UNECE, "Software update and software update management system," UN Regulation No. 156, 2021.' },
          { ref: "[10]", text: 'SAE, "System Theoretic Process Analysis for Automotive," SAE J3187:2022, 2022.' },
          { ref: "[11]", text: 'Macher et al., "Towards an Integrated Safety and Security Development Lifecycle," SAE 2019-01-0132, 2019.' },
          { ref: "[12]", text: 'Schmittner et al., "Co-Analysis of Safety and Security Requirements," SAE 2020-01-0145, 2020.' },
        ].map((r, i) => (
          <div key={i} style={{ padding: "6px 0", borderBottom: `1px solid ${c.border}`, fontSize: 13, color: c.slate }}>
            <strong style={{ color: c.teal }}>{r.ref}</strong> {r.text}
          </div>
        ))}
      </Section>

      <Section title="Handbook Structure Quick Reference">
        <DataTable
          headers={["Part", "Chapters", "Content", "Pages"]}
          rows={[
            ["Part I: Orientation", "Ch.1-3", "Navigation, 6 standards overview, integration framework", "30-38"],
            ["Part II: Cross-Mapping", "Ch.4-10", "Clause-level Rosetta Stone tables by lifecycle phase", "120-150"],
            ["Part III: Examples", "Ch.11-12", "ADAS Camera ECU + AI Pedestrian Detection end-to-end", "50-60"],
            ["Part IV: Tools", "Ch.13-15", "8 integrated templates, audit guide, tool qualification", "28-36"],
            ["Part V: Appendices", "A-D", "Master matrix, 50+ refs, 150+ glossary terms", "30-40"],
          ]}
          compact
        />
        <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
          {[
            { label: "Cross-mapping tables", value: "109" },
            { label: "Section headings", value: "166" },
            { label: "IEEE references", value: "50+" },
            { label: "Glossary terms", value: "150+" },
            { label: "Tools cataloged (v2)", value: "200+" },
          ].map((stat, i) => (
            <div key={i} style={{ padding: "12px 20px", background: c.slatePale, borderRadius: 4, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: c.navy }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: c.slateLight, textTransform: "uppercase", letterSpacing: 0.5 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────

const MODULES = [
  { id: "standards", name: "Standards Navigator", short: "Standards", icon: "§" },
  { id: "tools", name: "Tool Stack Explorer", short: "Tools", icon: "⚙" },
  { id: "release", name: "Release Planning", short: "Release", icon: "▶" },
  { id: "testing", name: "Testing & V&V", short: "Testing", icon: "✓" },
  { id: "sixsigma", name: "Lean Six Sigma", short: "6σ", icon: "σ" },
  { id: "audit", name: "Audit Readiness", short: "Audit", icon: "◎" },
  { id: "reference", name: "Reference Library", short: "Ref", icon: "≡" },
];

export default function App() {
  const [activeModule, setActiveModule] = useState("standards");
  const [activeRole, setActiveRole] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderModule = () => {
    switch (activeModule) {
      case "standards": return <ModuleStandards role={activeRole} />;
      case "tools": return <ModuleTools role={activeRole} />;
      case "release": return <ModuleRelease />;
      case "testing": return <ModuleTesting />;
      case "sixsigma": return <ModuleSixSigma />;
      case "audit": return <ModuleAudit />;
      case "reference": return <ModuleReference />;
      default: return null;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', 'Helvetica Neue', system-ui, sans-serif", background: c.bg, color: c.slate }}>
      {/* Sidebar */}
      <nav style={{
        width: sidebarOpen ? 240 : 56, minHeight: "100vh", background: c.navy, color: "#fff", transition: "width 0.2s ease",
        display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden",
      }}>
        <div style={{ padding: sidebarOpen ? "20px 16px" : "20px 8px", borderBottom: `1px solid ${c.navyLight}` }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 18, padding: 4, display: "block", margin: sidebarOpen ? 0 : "0 auto" }}>
            {sidebarOpen ? "◁" : "▷"}
          </button>
          {sidebarOpen && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: c.tealLight, fontWeight: 700 }}>Integrated Auto Standards</div>
              <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.2, marginTop: 4 }}>v2 Workbook</div>
              <div style={{ fontSize: 11, color: c.slateLight, marginTop: 4 }}>Tool Stacks + Lean Six Sigma</div>
            </div>
          )}
        </div>

        <div style={{ flex: 1, padding: sidebarOpen ? "12px 8px" : "12px 4px" }}>
          {MODULES.map(mod => (
            <button key={mod.id} onClick={() => setActiveModule(mod.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: sidebarOpen ? "10px 12px" : "10px 0", borderRadius: 4, border: "none", cursor: "pointer",
              background: activeModule === mod.id ? c.navyLight : "transparent",
              color: activeModule === mod.id ? c.tealLight : "#94a3b8",
              fontSize: 13, fontWeight: activeModule === mod.id ? 600 : 400,
              textAlign: sidebarOpen ? "left" : "center", transition: "all 0.15s",
              justifyContent: sidebarOpen ? "flex-start" : "center",
            }}>
              <span style={{ fontSize: 16, width: 24, textAlign: "center", flexShrink: 0 }}>{mod.icon}</span>
              {sidebarOpen && <span>{mod.name}</span>}
            </button>
          ))}
        </div>

        {sidebarOpen && (
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${c.navyLight}` }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: c.slateLight, marginBottom: 8 }}>View as Role</div>
            <select value={activeRole || ""} onChange={e => setActiveRole(e.target.value || null)} style={{
              width: "100%", padding: "6px 8px", background: c.navyLight, color: "#fff", border: `1px solid ${c.navyMid}`,
              borderRadius: 4, fontSize: 12, cursor: "pointer",
            }}>
              <option value="">All Roles</option>
              {ROLES.map(r => <option key={r.id} value={r.id}>{r.icon} {r.name}</option>)}
            </select>
          </div>
        )}

        {sidebarOpen && (
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${c.navyLight}`, fontSize: 10, color: c.slateLight }}>
            <div>Jherrod Thomas © 2026</div>
            <div>ISH-2026-001 | CC BY-SA 4.0</div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "24px 32px", maxWidth: 1100, overflowY: "auto" }}>
        <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: c.navy }}>
                {MODULES.find(m => m.id === activeModule)?.icon} {MODULES.find(m => m.id === activeModule)?.name}
              </span>
              {activeRole && <Badge color={c.accent} bg="#F3F0FF">{ROLES.find(r=>r.id===activeRole)?.icon} {ROLES.find(r=>r.id===activeRole)?.name}</Badge>}
            </div>
            <div style={{ fontSize: 12, color: c.slateLight }}>
              Integrated Automotive Standards Handbook v2.0 — Tool Stacks + Lean Six Sigma Process Engine
            </div>
          </div>
        </div>

        {renderModule()}

        <div style={{ marginTop: 48, paddingTop: 16, borderTop: `1px solid ${c.border}`, fontSize: 11, color: c.slateLight }}>
          Integrated Automotive Standards Handbook v2.0 — ISH-2026-001 — This is a reference guide for educational and professional development purposes. Consult official published standards for normative requirements.
        </div>
      </main>
    </div>
  );
}
