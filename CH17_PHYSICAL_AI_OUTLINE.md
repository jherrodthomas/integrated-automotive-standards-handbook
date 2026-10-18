# Chapter 17: Physical AI — Bridging Automotive Safety to Robotics & Industrial Systems

**Status:** Outline Draft  
**Author:** Jherrod Thomas  
**Created:** 2026-10-17  

---

## 1. Chapter Purpose

This chapter bridges the automotive V-cycle safety methodology (established in Chapters 1–16) to physical AI systems: humanoid robots, collaborative robots (cobots), autonomous mobile robots (AMRs), autonomous mobile manipulators (AMMs), industrial automation with AI/ML perception, and other safety-critical robotic systems.

The goal is NOT a full clause-level cross-mapping of industrial standards (that would be a separate handbook). Instead, this chapter answers a specific practitioner question: **"I know how to do functional safety for automotive — what changes when I'm building a robot?"**

---

## 2. Standards Covered

### Primary Standards (New to Handbook)

| Standard | Edition | Scope |
|----------|---------|-------|
| IEC 61508 | Ed. 2 (2010) | Functional safety of E/E/PE systems — the "parent" standard |
| ISO 13849-1 | 2023 | Safety of machinery — safety-related parts of control systems (Performance Levels) |
| ISO 10218-1/-2 | 2025 | Industrial robots — safety requirements (major revision, first since 2011) |

### Secondary Standards (Referenced)

| Standard | Scope |
|----------|-------|
| ISO/TS 15066 | Collaborative robot applications — now folded into ISO 10218:2025 |
| ISO 3691-4 | Automated guided vehicles / autonomous mobile robots |
| ISO 13482 | Personal care and service robots |
| ISO 12100 | General risk assessment for machinery |
| EU AI Act (2024) | Risk-based framework covering AI in robotics |
| EU Machinery Regulation 2023/1230 | Replaces Machinery Directive 2006/42/EC, effective Jan 2027 |

### Existing Handbook Standards (Bridge Points)

| Standard | Bridge Point |
|----------|-------------|
| ISO 26262 | V-cycle methodology, ASIL classification, tool qualification |
| ISO/SAE 21434 | Cybersecurity — ISO 10218:2025 now explicitly addresses cyber |
| ISO 21448 (SOTIF) | Perception sufficiency — directly applicable to robot vision/sensing |
| ISO/PAS 8800 | AI/ML safety — transfers to robotic ML inference |

---

## 3. Section-by-Section Outline

### 17.1 The Standards Family Tree

**Purpose:** Orient the reader in the standards landscape — show that automotive safety is a branch of a larger tree, not an isolated domain.

**Content:**

```
                    IEC 61508
              (Functional Safety — Generic)
                    /    |     \
                   /     |      \
          ISO 26262   IEC 62061   ISO 13849-1
         (Automotive) (Machinery  (Machinery
                       E/E/PE)    Control —
                                  Performance
                                  Levels)
              |            \        /
        ISO/PAS 8800    ISO 10218-1/-2
        (AI/ML Safety)  (Industrial Robots)
              |               |
        ISO 21448        ISO/TS 15066
        (SOTIF)         (Collaborative
                         Applications)
                              |
                        ISO 3691-4
                        (AMR / AGV)
```

- IEC 61508 as the parent: SIL 1–4, lifecycle model, Part 3 software requirements
- ISO 26262 as the automotive derivative: how it adapted 61508's SIL concept into ASIL, added HARA methodology, automotive-specific hardware metrics
- ISO 13849-1 as the machinery sibling: Performance Levels (PL a–e), Category architecture (B, 1, 2, 3, 4), MTTFd/DCavg/CCF methodology
- IEC 62061 as the other machinery sibling: SIL-based approach for complex programmable systems
- ISO 10218 as the robot-specific layer: sits on top of 13849/62061, adds robot-specific requirements

**Deliverable:** Standards family tree diagram (Mermaid), relationship table

### 17.2 Rosetta Stone: Integrity Levels Across Domains

**Purpose:** The cross-domain integrity level mapping that no published guide provides cleanly.

**Content:**

#### Integrity Level Mapping (Approximate)

| Risk Level | IEC 61508 | ISO 26262 | ISO 13849-1 | Notes |
|------------|-----------|-----------|-------------|-------|
| Lowest | SIL 1 | ASIL A | PL a / PL b | Not directly equivalent — derived differently |
| Low-Medium | SIL 1 | ASIL B | PL c | ASIL B hardware metrics ≈ SIL 1 targets |
| Medium | SIL 2 | ASIL C | PL d | Category 3 architecture typically needed |
| High | SIL 2–3 | ASIL D | PL e | ASIL D exceeds SIL 2, approaches SIL 3 |
| Highest | SIL 3–4 | — | — | Nuclear/rail; no automotive or machinery equivalent |
| Non-safety | — | QM | PL a (below threshold) | Process quality only |

**Critical caveat:** These are NOT equivalences. The derivation methods differ fundamentally:
- **IEC 61508 SIL:** Derived from tolerable risk targets (probability of failure per hour)
- **ISO 26262 ASIL:** Derived from HARA (Severity × Exposure × Controllability)
- **ISO 13849 PL:** Derived from risk graph (Severity × Frequency × Possibility of avoidance)

#### Derivation Method Comparison

| Aspect | HARA (ISO 26262) | Risk Graph (ISO 13849) | Risk Assessment (IEC 61508) |
|--------|-------------------|------------------------|----------------------------|
| Severity | S0–S3 (4 levels) | S1–S2 (2 levels) | Consequence-based (qualitative → quantitative) |
| Exposure | E1–E4 (4 levels) | F1–F2 (Frequency, 2 levels) | Not separate parameter |
| Controllability | C1–C3 (3 levels) | P1–P2 (Possibility of avoidance, 2 levels) | Not separate parameter |
| Output | ASIL QM/A/B/C/D | PL a/b/c/d/e | SIL 1/2/3/4 |
| Quantitative target | Optional (PMHF) | MTTFd + DCavg + CCF | PFH (probability of dangerous failure per hour) |

#### Hardware Metric Comparison

| Metric | ISO 26262 | ISO 13849-1 | IEC 61508 |
|--------|-----------|-------------|-----------|
| Random HW failure target | SPFM, LFM, PMHF | PFHd (via MTTFd, DCavg, CCF, Category) | PFH |
| Architecture constraint | ASIL-dependent (single/dual channel) | Category B/1/2/3/4 | HFT 0/1/2 (Hardware Fault Tolerance) |
| Diagnostic coverage | DC (Low/Medium/High) | DCavg (None/Low/Medium/High) | DC (quantitative %) |
| Common cause | β-factor or qualitative checklist | CCF score (≥65 points required) | β-factor |

### 17.3 What Transfers Directly from Automotive

**Purpose:** Show the practitioner that ~70% of their automotive safety engineering knowledge applies as-is.

**Content — Direct transfers:**

1. **V-cycle development model** — 61508, 13849, and 10218 all assume V-model development. The automotive V-cycle from Ch 1 applies directly.
2. **Hazard analysis methodology** — HARA concepts transfer to robot risk assessment (ISO 12100 + ISO 10218 Clause 5). The structure is the same: identify hazards → assess risk → define safety functions → derive requirements.
3. **FMEA / FTA** — Identical analytical methods. Tools from Ch 5 (medini, APIS IQ, exida) work for robot FMEA.
4. **Software development process** — IEC 61508 Part 3 software requirements map closely to ISO 26262 Part 6. Same concepts: coding guidelines, static analysis, unit/integration testing, code coverage. Tools from Ch 7 apply directly.
5. **Tool qualification** — IEC 61508 Part 4 covers tool qualification. The methodology parallels ISO 26262 Part 8 Clause 11 (TCL determination). Same tools, similar process.
6. **Cybersecurity engineering** — ISO 10218:2025 now explicitly addresses cybersecurity. The TARA methodology from ISO 21434 applies to robot systems with network connectivity.
7. **AI/ML safety** — Perception, planning, and decision-making ML models in robots face the same challenges as automotive: dataset sufficiency, adversarial robustness, distributional shift, runtime monitoring. ISO/PAS 8800 concepts apply, though not yet normatively required for robots.
8. **SOTIF / perception sufficiency** — A cobot with a vision system determining human proximity has the same SOTIF challenge as an ADAS camera system. ISO 21448's four-quadrant model (known safe, known unsafe, unknown safe, unknown unsafe) transfers directly.
9. **Configuration management / traceability** — ASPICE process requirements map to IEC 61508 Part 1 lifecycle management. Same ALM tools, same traceability needs.

### 17.4 Where It Diverges

**Purpose:** The 30% that's different — this is where practitioners get tripped up.

**Content — Key divergences:**

#### 17.4.1 Collaborative Operation (No Automotive Equivalent)

ISO 10218-2:2025 + ISO/TS 15066 define four collaborative operation modes with no automotive parallel:

| Mode | Description | Safety Function |
|------|-------------|-----------------|
| Safety-rated monitored stop | Robot stops when human enters collaborative workspace | Position monitoring, speed = 0 verification |
| Hand guiding | Human physically guides robot | Force/torque limiting, enable switch |
| Speed & separation monitoring | Robot slows/stops based on human proximity | Real-time distance measurement, speed control |
| Power & force limiting | Robot limits contact forces | Force/torque sensing, biomechanical limits per ISO/TS 15066 |

These require force/torque sensors, 3D workspace monitoring (safety-rated LiDAR/cameras), and validated biomechanical injury models — none of which exist in the automotive tool stack.

#### 17.4.2 Performance Level Architecture (Category System)

ISO 13849-1 uses a Category architecture system that differs fundamentally from ASIL-based architecture:

| Category | Architecture | Behavior After Fault | Automotive Equivalent |
|----------|-------------|---------------------|----------------------|
| B | Single channel, basic | No fault detection | Below QM |
| 1 | Single channel, well-tried components | No fault detection | QM with constraints |
| 2 | Single channel + periodic testing | Detection at test rate | ASIL A (limited DC) |
| 3 | Dual channel | Single fault tolerated | ASIL B–C (redundant) |
| 4 | Dual channel + enhanced | Accumulation tolerated | ASIL D (high DC) |

The key difference: 13849 prescribes specific architectures per category, while 26262 specifies metrics (SPFM, LFM, PMHF) and lets the designer choose the architecture.

#### 17.4.3 Safety Function vs. Safety Goal

- **Automotive (26262):** Safety Goals → Functional Safety Requirements → Technical Safety Requirements → HW/SW Safety Requirements
- **Machinery (13849):** Safety Functions → Safety Function Requirements → Performance Level Required → Category + MTTFd + DCavg + CCF
- **Key difference:** 13849 focuses on discrete safety *functions* (e.g., "emergency stop", "guard interlock", "speed limitation") with individual PL assignments. 26262 derives from system-level safety *goals* that may span multiple functions.

#### 17.4.4 Validation Environment

Robot validation requires physical workspace assessment that automotive doesn't:
- Collaborative workspace geometry
- Reach envelope analysis
- Floor loading, anchor points, guarding layout
- Human ergonomic assessment (ISO/TS 15066 body model)
- Environmental conditions (lighting for vision systems, EMC, temperature)

#### 17.4.5 Regulatory Landscape

| Region | Automotive | Machinery / Robotics |
|--------|-----------|---------------------|
| EU | UN R155/R156, GSR | Machinery Regulation 2023/1230 (eff. Jan 2027), EU AI Act (2024) |
| US | FMVSS, NHTSA | OSHA, ANSI/A3 R15.06-2025, NFPA 79 |
| China | GB/T standards | GB 11291 (industrial robots) |

### 17.5 Tool Gap Analysis: Automotive → Physical AI

**Purpose:** Which tools from the 200+ automotive catalog work, which need adaptation, and what's missing.

#### Tools That Transfer Directly

| Category | Automotive Tools (from v2) | Robot Application |
|----------|---------------------------|-------------------|
| Static analysis | Polyspace, Helix QAC, LDRA, Cppcheck | Same code, same rules — MISRA C applies to robot firmware |
| FMEA/FTA | medini, APIS IQ, exida | Identical methodology |
| Requirements/ALM | DOORS, Polarion, codeBeamer | Same traceability needs |
| Model-based design | Simulink, SCADE, TargetLink | Control system modeling transfers |
| Unit testing | VectorCAST, Cantata, GoogleTest | Same coverage requirements |
| CI/CD | Jenkins, GitLab CI | Same pipeline architecture |
| ML lifecycle | DVC, W&B, MLflow, TensorRT | Same model training/deployment |
| Cybersecurity | TARA tools, SCA tools | ISO 10218:2025 now requires cyber assessment |

#### Tools That Need Adaptation

| Category | Automotive Tool | Adaptation Needed |
|----------|----------------|-------------------|
| Simulation | CARLA, CarMaker | Replace driving scenarios with manipulation/navigation scenarios |
| HIL | dSPACE SCALEXIO | Robot-specific I/O (force/torque, joint encoders, grippers) |
| Bus testing | CANoe (CAN/Ethernet) | Add EtherCAT, PROFINET, OPC UA (industrial protocols) |
| Sensor sim | Ansys AVxcelerate | Workspace sensing vs. road scene |
| Scenario testing | Applied Intuition | Navigation/manipulation scenarios vs. driving scenarios |

#### Tools Missing from Automotive Stack

| Need | Tool Category | Examples |
|------|--------------|----------|
| Safety-rated workspace monitoring | 3D safety LiDAR/camera systems | SICK, Pilz, Keyence safety controllers |
| Force/torque monitoring | Collaborative robot safety | ATI, OnRobot, Robotiq F/T sensors |
| Performance Level calculation | ISO 13849 PL verification | SISTEMA (free, from IFA/DGUV), Pilz PAScal, SICK Safety Designer |
| Robot simulation | Manipulation/navigation | ROS 2 + Gazebo, NVIDIA Isaac Sim, MuJoCo |
| Motion planning safety | Certified path planning | Realtime Robotics, Mujin, proprietary OEM planners |
| Cobot risk assessment | ISO/TS 15066 body model | Pilz PRMS, SICK Safe Robotics, Fraunhofer IFF |
| Industrial protocol stacks | EtherCAT, PROFINET, OPC UA | Beckhoff TwinCAT, CODESYS, Siemens TIA Portal |
| Safety PLC programming | IEC 61131-3 + safety | Pilz PSS, Siemens Fail-safe, Allen-Bradley GuardLogix |

### 17.6 Integrated V-Cycle for Physical AI

**Purpose:** A unified V-cycle that shows where automotive and industrial safety activities overlap and where they diverge.

**Content:** Adapted V-model diagram showing:

Left side (development):
1. Concept → Risk assessment (ISO 12100 + HARA + TARA)
2. Safety concept → Safety functions (13849) + Safety goals (26262)
3. System design → Architecture (Category selection + ASIL allocation)
4. HW/SW design → Detailed design (61508 Part 2/3 + 26262 Part 5/6)

Right side (verification):
5. Unit/integration testing → Code coverage + structural testing
6. System validation → Robot cell validation + collaborative workspace assessment
7. Acceptance → Risk residual assessment, CE marking / type approval

Cross-cutting:
- Tool qualification (61508 Part 4 / 26262 Part 8 Clause 11)
- Cybersecurity (21434 + 10218:2025 cybersecurity clauses)
- AI/ML safety (8800 concepts applied to robot perception/planning)
- SOTIF (21448 four-quadrant model for robot perception sufficiency)

### 17.7 Worked Example: Collaborative Mobile Manipulator

**Purpose:** Trace one safety requirement through the integrated physical AI process, using tools from both automotive and industrial stacks.

**Scenario:** AMM (Autonomous Mobile Manipulator) — a cobot arm on a mobile base — operating in a mixed human-robot warehouse environment. AI vision system for human detection, navigation, and pick-and-place.

**Trace:**
1. Risk assessment (ISO 12100 + HARA): Identify hazard — robot arm contact with human during pick operation
2. Safety function (ISO 13849): Speed & separation monitoring, PL d required
3. Safety goal (ISO 26262 concepts): "Prevent undetected human presence in robot workspace"
4. TARA (ISO 21434 concepts): Network-connected robot — assess cyber threats to safety functions
5. SOTIF analysis (ISO 21448 concepts): Vision system limitations — occlusion, lighting, reflective surfaces
6. AI safety (ISO/PAS 8800 concepts): ML human detection model — dataset requirements, adversarial testing, runtime monitoring
7. Implementation: Safety PLC (Pilz PSS) + safety LiDAR (SICK) + AI inference (NVIDIA Jetson) + force limiting (OnRobot)
8. Verification: SISTEMA PL calculation + HIL testing (modified SCALEXIO) + collaborative workspace validation (Pilz PRMS)
9. Validation: Full system test per ISO 10218-2 Clause 5 + ISO/TS 15066 force/pressure limits

### 17.8 What Comes Next: The Case for v3

**Purpose:** Plant the seed for the full cross-domain handbook.

**Content:**
- This chapter is the bridge; a full cross-mapping at clause level (like v1 does for automotive) would require its own volume
- Natural v3 scope: full Rosetta Stone cross-mapping of IEC 61508, ISO 13849-1, ISO 10218, ISO 3691-4, ISO 13482 alongside the existing six automotive standards
- Growing market: humanoid robots (Tesla Optimus, Figure, 1X, Apptronik), cobot market ($12B+ by 2028), AMRs in logistics/manufacturing
- Regulatory convergence: EU AI Act + Machinery Regulation 2023/1230 create a unified compliance landscape that mirrors the automotive world's GSR + UN R155/R156

---

## 4. Rosetta Stone Cross-Reference Table: Lifecycle Activities

This is the core reference table — mapping the same lifecycle activity across automotive and industrial standards.

| Lifecycle Activity | ISO 26262 | IEC 61508 | ISO 13849-1 | ISO 10218 |
|-------------------|-----------|-----------|-------------|-----------|
| Hazard identification | Part 3 Cl.7 (HARA) | Part 1 Cl.7.4 | Cl.4 (Risk assessment input) | Cl.5 (Hazard identification) |
| Risk classification | ASIL (S×E×C) | SIL (tolerable risk) | PL required (risk graph) | References 13849/62061 |
| Safety concept | Part 3 Cl.8 (FSC) | Part 1 Cl.7.5 | Cl.5 (Safety function spec) | Cl.5.4 (Protective measures) |
| Architecture design | Part 4 Cl.6 (TSC) | Part 2 Cl.7.4 | Cl.6 (Category selection) | References 13849/62061 |
| HW random failure targets | Part 5 Cl.8-9 (SPFM/LFM/PMHF) | Part 2 Cl.7.4 (PFH) | Cl.4.5 (PFHd via MTTFd/DC/CCF) | References 13849 |
| SW development | Part 6 Cl.5-9 | Part 3 Cl.7 | Cl.4.6 (SW aspects — new in 2023) | References 62061/61508-3 |
| Tool qualification | Part 8 Cl.11 (TCL) | Part 4 (Tool requirements) | N/A (manual verification) | N/A |
| V&V | Part 4 Cl.8 (Integration/testing) | Part 1 Cl.7.7-7.9 | Cl.8 (Validation) | Cl.6 (Verification/validation) |
| Modification management | Part 8 Cl.12 | Part 1 Cl.7.16 | N/A | Cl.7 (Information for use) |
| Cybersecurity | ISO 21434 (separate) | Not addressed | Not addressed | Cl.5.x (new in 2025) |
| AI/ML safety | ISO/PAS 8800 (separate) | Not addressed | Not addressed (SW in 2023 ed. limited) | Not addressed |
| SOTIF / perception | ISO 21448 (separate) | Not addressed | Not addressed | Not addressed |
| Collaborative operation | N/A | N/A | N/A | Cl.5.10 + ISO/TS 15066 |

---

## 5. Estimated Chapter Length

| Section | Est. Pages |
|---------|-----------|
| 17.1 Standards Family Tree | 3–4 |
| 17.2 Integrity Level Mapping | 5–6 |
| 17.3 What Transfers | 4–5 |
| 17.4 Where It Diverges | 8–10 |
| 17.5 Tool Gap Analysis | 6–8 |
| 17.6 Integrated V-Cycle | 3–4 |
| 17.7 Worked Example (AMM) | 8–10 |
| 17.8 What Comes Next | 2–3 |
| **Total** | **~40–50 pages** |

---

## 6. Key References

- [1] IEC, *IEC 61508: Functional Safety of Electrical/Electronic/Programmable Electronic Safety-Related Systems*, Ed. 2, 2010.
- [2] ISO, *ISO 13849-1:2023: Safety of Machinery — Safety-Related Parts of Control Systems — Part 1: General Principles for Design*, 2023.
- [3] ISO, *ISO 10218-1:2025: Robotics — Safety Requirements for Industrial Robots — Part 1: Robots*, 2025.
- [4] ISO, *ISO 10218-2:2025: Robotics — Safety Requirements for Industrial Robot Applications and Robot Cells — Part 2: Industrial Robot System Integration*, 2025.
- [5] ISO, *ISO/TS 15066:2016: Robots and Robotic Devices — Collaborative Robots*, 2016 (content integrated into ISO 10218:2025).
- [6] ISO, *ISO 3691-4:2020: Industrial Trucks — Safety Requirements and Verification — Part 4: Driverless Industrial Trucks and Their Systems*, 2020.
- [7] ISO, *ISO 13482:2014: Robots and Robotic Devices — Safety Requirements for Personal Care Robots*, 2014.
- [8] ISO, *ISO 12100:2010: Safety of Machinery — General Principles for Design — Risk Assessment and Risk Reduction*, 2010.
- [9] EU, *Regulation (EU) 2023/1230 on Machinery Products*, 2023 (effective 20 January 2027).
- [10] EU, *Regulation (EU) 2024/1689 (AI Act)*, 2024.
- [11] A3/ANSI, *ANSI/A3 R15.06-2025: Industrial Robot Safety Standard*, 2025.
