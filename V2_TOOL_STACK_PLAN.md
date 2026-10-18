# Integrated Automotive Standards Handbook — v2.0 Plan
## Focus: Tool Stacks for Every Lifecycle Phase

**Status:** Active Development  
**Target:** Q1 2027  
**See also:** [V2_RELEASE_PLAN.md](V2_RELEASE_PLAN.md) | [CH17_PHYSICAL_AI_OUTLINE.md](CH17_PHYSICAL_AI_OUTLINE.md)

---

## 1. Vision

v1 answers "what do the standards require?" — v2 answers "what tools do I actually use to satisfy those requirements, and how do they connect?"

The goal is a practical, opinionated guide that maps every lifecycle phase to specific tool recommendations at three budget tiers, with data flow diagrams showing how artifacts move between tools, where integration gaps exist, and what glue is needed.

---

## 2. Research Summary

Eight parallel research sweeps covered 200+ tools across:

| Category | Tools Found | Key Insight |
|----------|------------|-------------|
| Requirements & ALM | 12+ | DOORS, Polarion, codeBeamer dominate; Tuleap is viable OSS alternative |
| Safety Analysis | 16+ | Ansys medini is the only single-platform HARA+FMEA+FMEDA+FTA; exida dominates PMHF/FMEDA |
| Cybersecurity (ISO 21434) | 20+ | AI-driven TARA tools (PlaxidityX, ThreatZ) reduce manual effort 60-80%; C2A and Upstream lead fleet security |
| SOTIF (ISO 21448) | 12+ | CARLA dominates research; Ansys/dSPACE/Applied Intuition for commercial; no unified ODD tool exists |
| Static Analysis & MISRA | 15+ | Helix QAC deepest pedigree; Cppcheck now credible for MISRA C:2025; no OSS has TCL cert |
| AUTOSAR & MBD | 33+ | Vector (~40% share), ETAS (~25%), EB (~20%); Adaptive AUTOSAR tooling still maturing |
| Testing & Validation | 40+ | dSPACE SCALEXIO leads HIL; Vector CANoe universal for bus testing; CarMaker only TÜV-certified driving sim |
| AI/ML Lifecycle | 25+ | ISO/PAS 8800 tool chain doesn't exist yet — must be assembled from ML/data/monitoring pieces |
| CI/CD & Traceability | 20+ | codeBeamer/Polarion with embedded ASPICE templates replacing manual evidence collection; Omnex ASPICE-O-Bot automates assessments |

**Total tools cataloged: 200+**

---

## 3. v2 Chapter Structure

### Part I — Tool Landscape Overview (Chapters 1–2)

**Chapter 1: How to Use This Guide**
- Reading by role, by phase, by budget
- How to interpret the tool matrix
- TCL qualification primer

**Chapter 2: The Integration Problem**
- Why siloed tools create more work than they save
- Data flow architecture: what connects to what
- The five critical handoff points where artifacts are lost

### Part II — Phase-by-Phase Tool Stacks (Chapters 3–10)

Each chapter follows this template:
1. **Phase requirements summary** (from v1 cross-mapping)
2. **Tool category breakdown** with full comparison matrix
3. **Strengths/weaknesses table** for every tool found
4. **Recommended tool chain** at three tiers (Startup / Mid-Tier / Enterprise)
5. **Data flow diagram** showing artifact movement between tools
6. **Integration gaps** and workarounds
7. **Tool qualification status** (TCL classification, certification body, kit availability)
8. **Worked example**: trace one AEB requirement through the tools

**Chapter 3: Organizational Setup & Process Tools**
- ASPICE assessment tools (Omnex ASPICE-O-Bot)
- QMS / IATF 16949 tools (QT9, ComplianceQuest)
- APQP/PPAP management
- Document management

**Chapter 4: Requirements & Architecture Tools**
- Requirements management (DOORS, Polarion, codeBeamer, Jama, Visure, Tuleap, ReqView)
- SysML/UML modeling (Cameo, Enterprise Architect, Rhapsody, Papyrus)
- Variant management (PREEvision, pure::variants)
- Traceability platforms (Reqtify, native ALM)

**Chapter 5: Risk Analysis Tools**
- HARA tools (medini, EnCo SOX, Omnex, PREEvision)
- FMEA/FMEDA tools (APIS IQ, medini, exida SILcal/FMEDAx, ReliaSoft)
- FTA tools (medini, APIS, EMFTA)
- TARA tools (itemis SECURE, PlaxidityX, EnCo SOX, ThreatZ, SD Elements)
- Safety case / GSN tools (Astah System Safety, Visure)
- SOTIF analysis tools (CARLA, PreScan, VTD, MATLAB ADAS)

**Chapter 6: System & Hardware Development Tools**
- AUTOSAR Classic config (Vector DaVinci, ETAS ISOLAR, EB tresos)
- AUTOSAR Adaptive (EB corbos, Vector Adaptive)
- ARXML editors/validators (AutoSAR.io, RED, vArxmlEditor)
- EDA tools for FMEDA (Synopsys VC, Renesas CAR Tool)
- AUTOSAR RTOS (ERIKA, INTEGRITY, EB AutoCore OS)

**Chapter 7: Software Development Tools**
- Compilers (Green Hills, IAR, HighTec, TASKING, GCC)
- Model-based design (Simulink/Embedded Coder, SCADE, TargetLink)
- Static analysis (Polyspace, Helix QAC, LDRA, Parasoft, Axivion, Coverity, Klocwork, Cppcheck, PVS-Studio, PC-lint)
- Dynamic analysis (Valgrind, AddressSanitizer, Parasoft Runtime)
- Code coverage (RapiCover, Coco, built-in tool coverage)
- Code review (Gerrit, SmartBear Collaborator, GitLab MR)
- SCA for cybersecurity (Black Duck, Snyk, Checkmarx, Sonatype)

**Chapter 8: AI/ML Development Tools**
- Data labeling (CVAT, Segments.ai, Ango Hub, Deepen AI, BasicAI)
- Synthetic data (CARLA ecosystem, NVIDIA Alpamayo)
- Dataset versioning (DVC, Pachyderm)
- Data quality (Great Expectations)
- ML frameworks (PyTorch, TensorFlow 3D)
- Experiment tracking (W&B, MLflow, Neptune)
- Model compression (TensorRT, OpenVINO, SNPE, ONNX Runtime)
- Adversarial testing (AutoAttack, Foolbox, Marabou)
- Interpretability (SHAP, LIME)
- Corner case mining (CORTEX-AVD, AutoScenario)
- Monitoring (Arize, Fiddler, WhyLabs)

**Chapter 9: Verification & Validation Tools**
- Unit test (VectorCAST, Cantata, Parasoft, BTC EmbeddedTester, GoogleTest)
- HIL platforms (dSPACE SCALEXIO, NI PXI, OPAL-RT, Speedgoat)
- SIL/MIL (MATLAB/Simulink, dSPACE VEOS, Vector vVIRTUALtarget)
- Vehicle bus testing (CANoe, CANalyzer, NI-XNET, Intrepid neoVI)
- Automotive Ethernet compliance (Tektronix, Keysight)
- Scenario/ADAS testing (VTD, CarMaker, CARLA, AVL SCENIUS, Applied Intuition)
- Sensor simulation (Ansys AVxcelerate, dSPACE AURELION, LeddarSim)
- Test automation (TraceTronic ecu.test, NI VeriStand/TestStand)
- Data logging (TTTech, Intrepid, Xylon)

**Chapter 10: Production, OTA & Field Monitoring Tools**
- OTA platforms (Mender, AUTOCRYPT, EB zentur, NVIDIA Metropolis)
- PKI/certificate management (AUTOCRYPT, Thales CrystalKey, Diconium)
- IDS (PlaxidityX, Vector, AUTOCRYPT)
- Secure boot (L4B Automotive)
- CSMS tools (C2A Security EVSec, Upstream, Elektrobit)
- Runtime monitoring for ML (Arize, Fiddler, WhyLabs)
- Fleet data collection (AWS IoT FleetWise, CSS Electronics, AutoPi)

### Part III — Reference Tool Chains (Chapters 11–13)

**Chapter 11: Vector-Centric Enterprise Chain**
Full traced requirement through: DOORS → EA → DaVinci → GHS MULTI → Polyspace + VectorCAST → CANoe → SCALEXIO → Reqtify → Jenkins/Artifactory

**Chapter 12: Siemens-Centric Enterprise Chain**
Full traced requirement through: Polarion → Cameo → EB tresos → IAR → LDRA + Cantata → CANoe → OPAL-RT → GitLab CI/Nexus

**Chapter 13: Lean / Open-Source Chain**
Full traced requirement through: codeBeamer/Tuleap → Papyrus → ERIKA → GCC/HighTec → Cppcheck + GoogleTest → python-can → Speedgoat → Jenkins + Git LFS

### Part IV — Cross-Cutting Concerns (Chapters 14–17)

**Chapter 14: Tool Qualification Across Standards**
- ISO 26262 Part 8 Clause 11 deep dive with every tool's TCL status
- TCL determination methodology (use-case dependent)
- Self-qualification guidance for OSS tools (GCC, Cppcheck, CARLA)
- ML tool qualification per ISO/PAS 8800

**Chapter 15: Cost Analysis & Procurement Guide**
- Three-tier budgets (Startup $50K-200K, Mid $500K-2M, Enterprise $2M-10M+)
- License models (perpetual vs subscription vs SaaS)
- Vendor lock-in risk assessment
- Migration paths (legacy → modern)

**Chapter 16: Integration Architecture**
- OSLC / ReqIF / ARXML / SARIF data exchange standards
- API-based integration patterns
- CI/CD pipeline architecture for automotive
- Container-based development environments
- PLM-to-ALM linkage (Teamcenter ↔ Polarion, Windchill ↔ codeBeamer)

**Chapter 17: Physical AI — Bridging Automotive Safety to Robotics & Industrial Systems**
- Standards family tree: IEC 61508 → ISO 26262 / ISO 13849-1 / IEC 62061 → ISO 10218
- Rosetta Stone integrity level mapping: SIL ↔ ASIL ↔ PL (with derivation method comparison)
- What transfers from automotive (~70%): V-cycle, HARA, FMEA/FTA, SW process, tool qualification, cyber, AI/ML, SOTIF
- What diverges (~30%): Collaborative operation modes (ISO 10218/TS 15066), Category architecture (13849), safety functions vs. safety goals, workspace validation
- Tool gap analysis: automotive tools that transfer, tools needing adaptation, missing tool categories (safety PLCs, workspace monitoring, force/torque, SISTEMA)
- Integrated V-cycle for physical AI systems
- Worked example: Collaborative Mobile Manipulator (AMM) — full safety trace through both automotive and industrial tool stacks
- Regulatory landscape comparison (EU Machinery Reg 2023/1230, EU AI Act, OSHA/ANSI R15.06)
- Seeds v3 scope: full clause-level cross-mapping of 61508/13849/10218/3691-4/13482 alongside the six automotive standards

### Part V — Appendices

**Appendix A: Complete Tool Matrix** (200+ tools, all columns)
**Appendix B: Tool Qualification Evidence Checklist**
**Appendix C: Vendor Contact & Pricing Guide**
**Appendix D: Acronyms & Glossary**

---

## 4. Key Deliverables

| Deliverable | Format | Status |
|-------------|--------|--------|
| Master Tool Matrix (200+ tools) | .xlsx | Complete (v1) |
| v2 Chapter Plan | .md | Complete |
| Reference Tool Chain diagrams | Mermaid / PNG | Planned |
| Cost tier analysis | .xlsx tab | Complete (v1) |
| Tool qualification status matrix | .xlsx tab | Complete (v1) |
| Full v2 handbook | .docx + .pdf | Planned |

---

## 5. Unique Value Propositions

1. **First resource to map ISO/PAS 8800 AI/ML lifecycle to actual tools** — no published guide exists
2. **Traced requirement through entire tool chain** — not just tool lists, but actual data flow
3. **Three-tier budget recommendations** — from $50K startup to $10M+ OEM
4. **Tool qualification status for every tool** — saves months of procurement research
5. **Integration gap analysis** — shows where manual work is still needed between tools
6. **200+ tools** — most comprehensive automotive tool survey published

---

## 6. Next Steps

1. Draft Ch 7 (Software Development Tools) and Ch 5 (Risk Analysis Tools) — highest-demand chapters
2. Build Mermaid data flow diagrams for Vector-centric reference chain
3. Draft Ch 17 (Physical AI Bridge) — unique market position, timely with ISO 10218:2025 and ISO 13849-1:2023
4. Expand workbook tool dataset from 49 → 200+ tools
5. Engage community reviewers: Ved Dandekar (Applied Intuition) for SW/platform chapters
6. Draft remaining chapters per priority order in V2_RELEASE_PLAN.md
7. Create traced AEB requirement walkthrough for each reference chain
8. Build AMM (Autonomous Mobile Manipulator) worked example for Ch 17
