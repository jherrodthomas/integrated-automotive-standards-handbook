# Integrated Automotive Standards Handbook — v2.0 Release Plan

**Author:** Jherrod Thomas  
**Created:** 2026-10-17  
**Status:** Active Planning  

---

## 1. Where We Stand

### Completed Assets

| Asset | Format | Status |
|-------|--------|--------|
| v1 Handbook (clause-level cross-mapping) | .docx, .pdf, .md | Released (v1.0.0, 2026-04-11) |
| v2 Tool Stacks draft (Chapters 1–16 + appendices) | .docx, .pdf, .md | Research complete, initial compilation done |
| Master Tool Matrix (200+ tools) | .xlsx | Research complete |
| v2 Interactive Workbook (7 modules) | .jsx | Built — 49 tools loaded, expansion needed |
| Infographic series (5 plates) | .pdf | Complete |
| Audit Checklist (fillable + reference) | .xlsx, .pdf | Complete |
| Gap Analysis & Readiness Assessment | .xlsx, .pdf | Complete |
| Traceability Matrix (fillable + unified) | .xlsx, .pdf | Complete |
| Safety Analysis Reference Handbook | .pdf | Complete |
| Integrated Standards Process Handbook | .pdf | Complete |
| Cover artwork | .png | Complete |

### Known Gaps in v2 Draft

- **Tool dataset**: Workbook has 49 tools; plan calls for 200+. The xlsx research file has the full dataset but it hasn't been integrated into the workbook or fully written up in the chapter prose.
- **Missing tool categories**: Organizational setup tools (Ch 3), detailed system/HW tools (Ch 6), production/OTA/field monitoring (Ch 10) are outlined but not drafted.
- **Reference tool chain walkthroughs**: Chapters 11–13 (Vector-centric, Siemens-centric, Lean/OSS end-to-end traces) — planned but not written.
- **Mermaid data flow diagrams**: None built yet. Each reference chain needs artifact-flow diagrams.
- **Cost analysis detail**: Three-tier budgets defined at category level, not yet at per-tool level with license models and migration paths.
- **Glossary expansion**: Workbook has ~30 terms; v1 has 150+; v2 target is 200+ (adding tool-specific terminology).

---

## 2. Demand Signals

### Inbound Interest: Ved Sadashiv Dandekar, Applied Intuition

**Who:** Core OS team (Android Automotive OS, QNX platform)  
**What he valued:** Lifecycle-phase organization, Rosetta Stone cross-maps, worked examples designed for practicing engineers  
**Where he wants depth:** Software development chapter (Ch 7), ISO 26262 + 21434 at the platform level  
**Signal:** Applied Intuition is a Tier 1 simulation/infrastructure vendor (appears in our Ch 9 V&V tools list). Having a platform engineer from their team express interest validates that our audience extends beyond safety teams into the software platform layer — exactly the gap v2 fills.

### What This Tells Us About Prioritization

1. **Software development tools (Ch 7) should be the first chapter fully drafted.** Compilers, static analysis, model-based design, SCA — this is where the widest audience lives. Every embedded SW engineer on a safety-critical project needs this.
2. **Platform-level 26262/21434 integration is underserved in existing literature.** The intersection of functional safety and cybersecurity at the OS/hypervisor/BSP layer (QNX, Linux, Android Automotive) is a gap no published guide addresses well.
3. **The V&V chapter (Ch 9) is the natural follow-on** — Applied Intuition's own tools (simulation, scenario testing) sit here, and V&V tool selection is the second-most common question after "which static analyzer should I use?"
4. **Ved represents a potential expert reviewer network.** Not as a proofreader — as a domain expert who can validate tool accuracy for platform-level content. Building a small reviewer network of 3–5 practitioners (one per major domain) would massively increase credibility.

---

## 3. Work Streams

### WS-1: Chapter Drafting (Core Content)

The 16-chapter v2 handbook. Each chapter follows the template defined in V2_TOOL_STACK_PLAN.md: phase requirements summary → tool category breakdown → comparison matrix → tier recommendations → data flow diagram → integration gaps → TCL status → traced AEB requirement.

**Priority order** (based on demand signal + dependency):

| Priority | Chapter | Rationale |
|----------|---------|-----------|
| P0 | Ch 7: Software Development Tools | Widest audience, strongest demand signal |
| P0 | Ch 5: Risk Analysis Tools | Core safety/cyber workflow, enables Ch 11–13 traces |
| P1 | Ch 9: Verification & Validation Tools | Second-highest demand, Applied Intuition connection |
| P1 | Ch 4: Requirements & Architecture Tools | Foundation for all downstream chapters |
| P1 | Ch 8: AI/ML Development Tools | Unique value prop — no other guide covers ISO/PAS 8800 tooling |
| P2 | Ch 6: System & Hardware Development Tools | AUTOSAR-heavy, narrower audience |
| P2 | Ch 14: Tool Qualification Across Standards | Cross-cutting, high reference value |
| P2 | Ch 10: Production, OTA & Field Monitoring | Growing importance, less mature tool landscape |
| P3 | Ch 3: Organizational Setup & Process Tools | Important but less differentiated |
| P3 | Ch 15: Cost Analysis & Procurement | Valuable but depends on Ch 3–10 being done |
| P3 | Ch 16: Integration Architecture | Technical depth, requires Ch 11–13 first |
| P3 | Ch 1–2: How to Use / Integration Problem | Can be written last when full scope is known |
| P2 | Ch 17: Physical AI Bridge (61508/13849/10218) | Unique market position, plants v3 seed, timely with 10218:2025 + 13849:2023 |

### WS-2: Reference Tool Chain Traces (Chapters 11–13)

Three end-to-end traced requirements through complete tool chains. Each needs:

- Mermaid data flow diagram (artifact movement between tools)
- Step-by-step walkthrough with screenshots/mockups
- Integration gap analysis at each handoff point
- Cost rollup at each tier

| Chain | Tools | Status |
|-------|-------|--------|
| Vector-Centric (Ch 11) | DOORS → EA → DaVinci → GHS → Polyspace + VectorCAST → CANoe → SCALEXIO → Reqtify → Jenkins | Planned |
| Siemens-Centric (Ch 12) | Polarion → Cameo → EB tresos → IAR → LDRA + Cantata → CANoe → OPAL-RT → GitLab CI | Planned |
| Lean/OSS (Ch 13) | codeBeamer/Tuleap → Papyrus → ERIKA → GCC/HighTec → Cppcheck + GoogleTest → python-can → Speedgoat → Jenkins | Planned |

### WS-3: Interactive Workbook Expansion

The v2_workbook.jsx needs:

- Tool dataset expansion from 49 → 200+ tools
- Three missing category modules (Org Setup, System/HW detail, Production/OTA)
- Granular clause references (currently condensed like "Cl.6-9" → individual clauses)
- Glossary expansion from ~30 → 200+ terms
- Data flow visualization (integrate Mermaid diagrams from WS-2)

### WS-4: Supporting Materials

| Deliverable | Format | Dependencies |
|-------------|--------|-------------|
| Updated Tool Matrix with all 200+ tools | .xlsx | WS-1 chapters |
| Mermaid data flow diagrams (3 chains) | .mermaid / .svg | WS-2 |
| Traced AEB requirement walkthrough per chain | Section in Ch 11–13 | WS-2 |
| Tool qualification evidence checklist (Appendix B) | .xlsx, .pdf | WS-1 Ch 14 |
| Vendor contact & pricing guide (Appendix C) | .xlsx | WS-1 Ch 15 |
| Updated glossary (Appendix D) | .md | WS-1 all chapters |

### WS-5: Community & Review Network

- **Respond to Ved**: Position as domain expert reviewer for SW/platform chapters, not proofreader. Offer early access to Ch 7 draft in exchange for technical accuracy review.
- **Recruit 3–5 additional domain reviewers**: Target one per major domain (safety analysis, cybersecurity, AUTOSAR/embedded, AI/ML, V&V/HIL).
- **GitHub community**: Update CONTRIBUTING.md with v2-specific review process. Add "Tool Accuracy Verification" as contribution type.
- **Early access program**: Share draft chapters with reviewer network for feedback before full release.

---

## 4. Release Strategy: Phased Approach

### Phase 1: Foundation Sprint (Weeks 1–4)

**Goal:** Get the two highest-demand chapters to reviewable draft quality.

- [ ] Draft Ch 7 (Software Development Tools) — full template
- [ ] Draft Ch 5 (Risk Analysis Tools) — full template
- [ ] Build Mermaid diagrams for Vector-centric chain (Ch 11)
- [ ] Expand workbook tool dataset to 100+ tools (covering Ch 5 + Ch 7 tools)
- [ ] Respond to Ved; share Ch 7 draft for review

**Exit criteria:** Two chapters complete with comparison matrices, tier recommendations, and integration gap analysis. One reference chain diagrammed.

### Phase 2: Core Chapters (Weeks 5–10)

**Goal:** Complete all P1 chapters and second reference chain.

- [ ] Draft Ch 9 (V&V Tools)
- [ ] Draft Ch 4 (Requirements & Architecture Tools)
- [ ] Draft Ch 8 (AI/ML Development Tools)
- [ ] Build Mermaid diagrams for Siemens-centric chain (Ch 12)
- [ ] Expand workbook tool dataset to 150+ tools
- [ ] Incorporate reviewer feedback from Phase 1

**Exit criteria:** Five of eight phase-by-phase chapters complete. Two reference chains diagrammed.

### Phase 3: Full Coverage (Weeks 11–16)

**Goal:** Complete remaining chapters, third reference chain, and physical AI bridge.

- [ ] Draft Ch 6 (System & HW Development Tools)
- [ ] Draft Ch 10 (Production, OTA & Field Monitoring)
- [ ] Draft Ch 3 (Organizational Setup & Process Tools)
- [ ] Draft Ch 14 (Tool Qualification Across Standards)
- [ ] Draft Ch 17 (Physical AI Bridge — 61508/13849/10218 integration)
- [ ] Build Lean/OSS chain diagram (Ch 13)
- [ ] Complete end-to-end AEB traced requirement for all three chains
- [ ] Build AMM (Autonomous Mobile Manipulator) worked example for Ch 17
- [ ] Expand workbook to full 200+ tool dataset (including physical AI tools)

**Exit criteria:** All phase-by-phase chapters complete. All three reference chains fully traced. Physical AI bridge chapter drafted with integrity level mapping and tool gap analysis.

### Phase 4: Cross-Cutting & Polish (Weeks 17–20)

**Goal:** Complete remaining chapters, appendices, and final integration.

- [ ] Draft Ch 15 (Cost Analysis & Procurement)
- [ ] Draft Ch 16 (Integration Architecture)
- [ ] Draft Ch 1–2 (How to Use / Integration Problem)
- [ ] Complete Appendices A–D
- [ ] Full workbook verification (200+ tools, 200+ glossary terms)
- [ ] Reviewer network final review pass
- [ ] Generate final .docx, .pdf, .xlsx deliverables

**Exit criteria:** Complete v2 manuscript. All supporting materials finalized. Reviewer sign-off.

### Phase 5: Release (Week 21)

- [ ] Update CHANGELOG.md
- [ ] Update README.md with v2 content summary
- [ ] GitHub release with all artifacts
- [ ] Announce to reviewer network
- [ ] Update CITATION.cff

---

## 5. Lean Six Sigma Integration (v2 Differentiator)

The interactive workbook includes a Lean Six Sigma module that maps process improvement methodology to automotive tool infrastructure. This is a unique differentiator — no other handbook connects DMAIC/VSM/SIPOC to automotive tool selection.

**How it integrates with the chapter content:**

| Lean Tool | Application in v2 |
|-----------|-------------------|
| DMAIC | Framework for each chapter's tool evaluation methodology |
| VSM (Value Stream Map) | Data flow diagrams in Ch 11–13 are essentially VSMs of artifact flow |
| SIPOC | Each tool comparison table implicitly defines Supplier-Input-Process-Output-Customer |
| DOWNTIME wastes | Integration gap analysis uses waste categories (Defects, Overproduction, Waiting, Non-utilized talent, Transportation, Inventory, Motion, Extra-processing) mapped to automotive tool chain problems |
| Control Charts | Tool qualification confidence tracking over time |
| Fishbone / 5 Whys | Root cause framework for integration gap analysis |

---

## 6. v2 Unique Value Propositions (Updated)

1. **First resource to map ISO/PAS 8800 AI/ML lifecycle to actual tools** — no published guide exists
2. **Traced requirement through three complete tool chains** — not just tool lists, but actual data flow with integration gaps identified
3. **Three-tier budget recommendations** ($50K startup → $10M+ OEM) with license model analysis
4. **Tool qualification status for every tool** — TCL classification, certification body, kit availability
5. **Integration gap analysis** — where manual work is still needed, with specific workarounds
6. **200+ tools** — most comprehensive automotive tool survey published
7. **Lean Six Sigma process optimization** — maps DMAIC/VSM to tool infrastructure decisions
8. **Platform-level 26262/21434 intersection** — OS, hypervisor, BSP tool coverage (validated by Applied Intuition interest)
9. **Expert-reviewed** — domain practitioners, not just desk research
10. **Physical AI bridge (Ch 17)** — first published practitioner's guide mapping automotive V-cycle safety methodology to robotics/industrial systems. Covers IEC 61508↔ISO 26262↔ISO 13849↔ISO 10218 integrity level mapping, tool gap analysis (automotive → physical AI), and worked AMM example. Positions the handbook for v3 expansion into full cross-domain safety engineering.

---

## 7. Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| Tool landscape shifts (vendor acquisitions, new releases) | Chapters become outdated before release | Pin to Q2 2026 vendor landscape; add "last verified" dates |
| Scope creep — 200+ tools is a lot of prose | Timeline slips | Prioritize comparison matrices over narrative; template-driven chapters |
| Reviewer availability | Quality gap in niche areas | Start with 2–3 committed reviewers, not 5 aspirational ones |
| ISO/PAS 8800 tooling too immature | Ch 8 feels speculative | Frame as "emerging" with clear maturity ratings; this is actually a feature (first-mover advantage) |
| Workbook JSX file becomes too large | Performance issues | Consider splitting into module files or migrating to a bundled React app |

---

## 8. Immediate Next Actions

1. **Reply to Ved** — thank him, position as domain expert reviewer (not proofreader), offer early access to Ch 7 draft when ready. Mention Applied Intuition's relevance to Ch 9 V&V tools section.
2. **Start Ch 7 (Software Development Tools)** — highest demand, clearest data available. Follow the 8-section template from V2_TOOL_STACK_PLAN.md.
3. **Start Ch 5 (Risk Analysis Tools)** — enables the reference chain traces, and HARA/TARA/SOTIF tool selection is the most-asked question in the domain.
4. **Expand the tool matrix** — integrate the full xlsx research data into a structured format that can feed both chapters and the workbook.
5. **Update V2_TOOL_STACK_PLAN.md** — mark status as "Active Development" with link to this release plan.
