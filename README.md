<a id="readme-top"></a>

<!-- ═══════════════════════════════════════════════════════════════════
     HERO BANNER — inline SVG, Vizology palette
     ═══════════════════════════════════════════════════════════════════ -->

<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 280" width="900" height="280">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0B2D5C"/>
      <stop offset="100%" stop-color="#0E7C7B"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#5AB7C6"/>
      <stop offset="50%" stop-color="#E0A33E"/>
      <stop offset="100%" stop-color="#D45B45"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="900" height="280" rx="12" fill="url(#bg)"/>
  <!-- Subtle grid pattern -->
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="0.5">
    <line x1="0" y1="40" x2="900" y2="40"/>
    <line x1="0" y1="80" x2="900" y2="80"/>
    <line x1="0" y1="120" x2="900" y2="120"/>
    <line x1="0" y1="160" x2="900" y2="160"/>
    <line x1="0" y1="200" x2="900" y2="200"/>
    <line x1="0" y1="240" x2="900" y2="240"/>
    <line x1="100" y1="0" x2="100" y2="280"/>
    <line x1="200" y1="0" x2="200" y2="280"/>
    <line x1="300" y1="0" x2="300" y2="280"/>
    <line x1="400" y1="0" x2="400" y2="280"/>
    <line x1="500" y1="0" x2="500" y2="280"/>
    <line x1="600" y1="0" x2="600" y2="280"/>
    <line x1="700" y1="0" x2="700" y2="280"/>
    <line x1="800" y1="0" x2="800" y2="280"/>
  </g>
  <!-- Accent bar -->
  <rect x="0" y="268" width="900" height="12" rx="0" fill="url(#accent)"/>
  <!-- Decorative circles (standards nodes) -->
  <circle cx="120" cy="140" r="60" fill="#0E7C7B" fill-opacity="0.25" stroke="#5AB7C6" stroke-width="1"/>
  <circle cx="180" cy="100" r="35" fill="#E0A33E" fill-opacity="0.15" stroke="#E0A33E" stroke-width="0.5"/>
  <circle cx="780" cy="140" r="55" fill="#D45B45" fill-opacity="0.15" stroke="#D45B45" stroke-width="0.5"/>
  <circle cx="740" cy="190" r="30" fill="#5AB7C6" fill-opacity="0.2" stroke="#5AB7C6" stroke-width="0.5"/>
  <!-- Title -->
  <text x="450" y="100" text-anchor="middle" fill="#F4F1EA" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="700" letter-spacing="1">INTEGRATED AUTOMOTIVE</text>
  <text x="450" y="145" text-anchor="middle" fill="#F4F1EA" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="700" letter-spacing="1">STANDARDS HANDBOOK</text>
  <!-- Subtitle -->
  <text x="450" y="185" text-anchor="middle" fill="#5AB7C6" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="400" letter-spacing="3">CROSS-MAPPING 9 STANDARDS · 17 CHAPTERS · 3 TOOL CHAINS</text>
  <!-- Version pill -->
  <rect x="380" y="205" width="140" height="28" rx="14" fill="#E0A33E" fill-opacity="0.2" stroke="#E0A33E" stroke-width="1"/>
  <text x="450" y="224" text-anchor="middle" fill="#E0A33E" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600">v2.0 — Oct 2026</text>
  <!-- Author -->
  <text x="450" y="258" text-anchor="middle" fill="#C9D2DC" font-family="system-ui, -apple-system, sans-serif" font-size="11" letter-spacing="2">BY JHERROD THOMAS · VIZOLOGY AI</text>
</svg>

</div>

<!-- ═══════════════════════════════════════════════════════════════════
     BADGES
     ═══════════════════════════════════════════════════════════════════ -->

<div align="center">

[![Version](https://img.shields.io/badge/version-2.0-E0A33E?style=flat-square&labelColor=0B2D5C)](https://github.com/jherrodthomas/integrated-automotive-standards-handbook)
[![Standards](https://img.shields.io/badge/standards-9-5AB7C6?style=flat-square&labelColor=0B2D5C)](https://github.com/jherrodthomas/integrated-automotive-standards-handbook)
[![Chapters](https://img.shields.io/badge/chapters-17-0E7C7B?style=flat-square&labelColor=0B2D5C)](https://github.com/jherrodthomas/integrated-automotive-standards-handbook)
[![Cross‑Maps](https://img.shields.io/badge/cross--maps-109+-D45B45?style=flat-square&labelColor=0B2D5C)](https://github.com/jherrodthomas/integrated-automotive-standards-handbook)
[![License](https://img.shields.io/badge/license-CC_BY--SA_4.0-2E6B43?style=flat-square&labelColor=0B2D5C)](https://creativecommons.org/licenses/by-sa/4.0/)

</div>

---

<!-- ═══════════════════════════════════════════════════════════════════
     TABLE OF CONTENTS
     ═══════════════════════════════════════════════════════════════════ -->

<details>
<summary><strong>Table of Contents</strong></summary>

- [Why This Exists](#why-this-exists)
- [Standards Coverage](#standards-coverage)
- [Standards Family Tree](#standards-family-tree)
- [System Boundary Map](#system-boundary-map)
- [SysML Block Definition](#sysml-block-definition)
- [Integrated V-Cycle](#integrated-v-cycle)
- [Integration Architecture](#integration-architecture)
- [What's Inside](#whats-inside)
- [Quick Stats](#quick-stats)
- [Who This Is For](#who-this-is-for)
- [Visual Assets](#visual-assets)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Disclaimer](#disclaimer)
- [License](#license)
- [Citation](#citation)

</details>

---

## Why This Exists

Automotive E/E teams typically implement safety, cybersecurity, quality, and process standards in silos — separate teams producing parallel documents and running independent review cycles. The result is redundant work, traceability gaps at domain interfaces, and audit fatigue.

This handbook solves that by organizing requirements **by lifecycle phase** rather than by standard. When you're in the concept phase doing HARA, you see exactly what TARA, SOTIF evaluation, AI safety analysis, and physical AI safety require — in one table, with one set of work products.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Standards Coverage

> **v2 expands from 6 to 9 standards**, adding IEC 61508, ISO 13849-1, and ISO 10218 for Physical AI and industrial safety coverage.

| Standard | Edition | Domain |
|:---------|:--------|:-------|
| **ISO 26262** | 2018 (Ed.2) | Functional safety — E/E systems |
| **ISO/SAE 21434** | 2021 | Cybersecurity engineering |
| **ISO 21448** | 2022 | Safety of the intended functionality (SOTIF) |
| **ISO/PAS 8800** | 2024 | AI/ML safety for road vehicles |
| **ISO 9001 / IATF 16949** | 2015 / 2016 | Quality management system |
| **ASPICE** | v4.0 (2023) | Process capability assessment |
| **IEC 61508** | Ed.2 (2010) | Functional safety — industrial (parent standard) |
| **ISO 13849-1** | 2023 | Safety of machinery — control systems |
| **ISO 10218-1/-2** | 2025 | Robot safety — industrial & collaborative |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Standards Family Tree

How these 9 standards relate hierarchically — from the parent functional safety standard through domain-specific derivatives:

<div align="center">
  <img src="visuals/readme_family_tree.svg" alt="Standards Family Tree — IEC 61508 parent branching to ISO 26262, ISO 13849, and domain derivatives" width="960"/>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## System Boundary Map

Where each standard's scope applies across automotive system domains — showing overlaps that create integration challenges (and opportunities):

<div align="center">
  <img src="visuals/readme_boundary_map.svg" alt="System Boundary Map — standard scope across automotive domains" width="960"/>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## SysML Block Definition

A SysML-style Block Definition Diagram (BDD) showing the handbook's structural architecture — standards as blocks with integrity levels, key work products, and inter-standard relationships:

<div align="center">
  <img src="visuals/readme_sysml_bdd.svg" alt="SysML Block Definition Diagram — standards as blocks with relationships" width="960"/>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Integrated V-Cycle

The unified lifecycle model maps each standard's activities to the V-model phases — revealing where parallel work products can be consolidated:

<div align="center">
  <img src="visuals/readme_vcycle.svg" alt="Integrated V-Cycle — 9 standards mapped to lifecycle phases" width="960"/>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Integration Architecture

How the handbook's domains interconnect — showing data flow between safety, cybersecurity, quality, and process disciplines:

<div align="center">
  <img src="visuals/readme_architecture.svg" alt="Integration Architecture — cross-domain data flow" width="960"/>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Integrity Level Cross-Map

One of the handbook's most referenced tables — mapping integrity/performance levels across the standard families:

| IEC 61508 | ISO 26262 | ISO 13849-1 | ISO/SAE 21434 | Typical Application |
|:---------:|:---------:|:-----------:|:-------------:|:--------------------|
| SIL 1 | ASIL A | PL b | CAL 1 | Body electronics, comfort |
| SIL 2 | ASIL B | PL c / PL d | CAL 2 | Adaptive headlights, park assist |
| SIL 3 | ASIL C / D | PL d / PL e | CAL 3 | AEB, lane keeping, steering |
| SIL 4 | — | — | CAL 4 | Nuclear/rail (not automotive) |

> *Mappings are approximate and context-dependent. See Chapter 17 for detailed derivation.*

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## What's Inside

### Part I — Foundation & Framework (Ch 1–3)
How to navigate the handbook, nine standards at a glance (structural overview, key concepts, regulatory context for each), and the integration framework with unified V-model.

### Part II — Clause-Level Cross-Mapping (Ch 4–10)
The heart of the handbook. Seven chapters covering every lifecycle phase from organizational setup through decommissioning. Each chapter includes standard-by-standard clause requirements, "Rosetta Stone" cross-mapping tables (9 columns), commonality analysis, gap analysis, integrated activity checklists, and a worked AEB mini-example.

### Part III — End-to-End Worked Examples (Ch 11–12)
**Chapter 11**: ADAS Forward Camera ECU (ASIL B(D), CAL 3) — complete lifecycle from item definition through field monitoring.
**Chapter 12**: AI Pedestrian Detection on NVIDIA Orin (ASIL C, CAL 4) — full AI/ML lifecycle including dataset requirements, model training, adversarial testing, and assurance case.

### Part IV — Practical Tools (Ch 13–16)
8 integrated work product templates (replacing 30+ siloed documents), audit & assessment readiness guide, tool qualification across standards, and three complete reference tool chains (Vector $2–10M+, Siemens $1.5–8M, Lean/OSS $50K–500K).

### Part V — Physical AI Bridge (Ch 17)
The new v2 chapter bridging automotive functional safety into industrial and collaborative robotics — IEC 61508, ISO 13849-1, and ISO 10218 integration with the six automotive standards.

### Appendices (A–D)
Master cross-reference matrix (80+ activities mapped across all standards), 50+ IEEE-format references, 150+ acronyms & glossary, and the tool chain decision matrix.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Quick Stats

<div align="center">

| Metric | Count |
|:-------|------:|
| Standards covered | 9 |
| Chapters | 17 |
| Appendices | 4 |
| Cross-mapping tables | 109+ |
| Section headings | 200+ |
| Reference tool chains | 3 |
| Tools cataloged | 200+ |
| IEEE references | 50+ |
| Glossary terms | 150+ |

</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Who This Is For

| Role | Start Here | Key Chapters |
|:-----|:-----------|:-------------|
| Functional Safety Engineer | Ch 5–9 | Lifecycle phases, HARA → validation |
| Cybersecurity Engineer | Ch 5–9 + Ch 14 | TARA integration, audit readiness |
| Software Developer | Ch 8 | SW & AI/ML development phase |
| AI/ML Engineer | Ch 8 + Ch 12 | AI worked example, data safety |
| System Architect | Ch 6 + Ch 16 | System-level dev, tool chains |
| Quality / Process Manager | Ch 4 + Ch 14 | Org setup, audit readiness |
| Physical AI / Robotics Engineer | Ch 17 | IEC 61508, ISO 13849, ISO 10218 |
| Auditor / Assessor | Ch 14 + App A | Audit guide, master cross-ref |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Visual Assets

The `visuals/` directory contains publication-quality infographic plates designed in the Vizology "Systematic Precision" style:

| Plate | Description |
|:------|:------------|
| `plate01_standards_family_tree.pdf` | Hierarchical lineage from IEC 61508 through domain derivatives |
| `plate02_integrity_level_mapping.pdf` | SIL ↔ ASIL ↔ PL ↔ CAL cross-reference matrix |
| `plate03_physical_ai_vcycle.pdf` | V-cycle lifecycle with all 9 standards mapped |
| `plate04_tool_chain_data_flow.pdf` | Three reference tool chains with data flow architecture |
| `plate05_tool_gap_analysis.pdf` | Gap/overlap analysis across tool chain tiers |
| `plate06_collaborative_operation_modes.pdf` | ISO 10218 collaborative robot operation modes |

> See [`visuals/v2_design_philosophy.md`](visuals/v2_design_philosophy.md) for the design system documentation.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Roadmap

### v1.0 (April 2026) — Initial Release
- Complete clause-level cross-mapping for 6 standards
- Two end-to-end worked examples (ADAS camera ECU + AI pedestrian detection)
- 8 consolidated work product templates

### v2.0 (October 2026) — Current Release
- Expanded to **9 standards** with IEC 61508, ISO 13849-1, ISO 10218
- **Chapter 17**: Physical AI bridge (machinery & collaborative robotics)
- **3 reference tool chains** with 200+ tools cataloged
- **6 publication-quality infographic plates**
- Interactive workbook prototype

### v2.1 (Planned)
- Downloadable filled-in artifact templates
- Additional worked examples (powertrain, body electronics, chassis)
- ISO 24089:2023 (Software Update Engineering) overlay
- UN R155/R156 regulatory mapping

### v3.0 (Future)
- Interactive web-based cross-reference explorer
- STPA integration (SAE J3187)
- Regional regulatory mapping (China GB/T, Japan JASO, Korea KS)
- Community contributions and errata

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Contributing

Contributions are welcome. If you spot an incorrect clause reference, have a better worked example, or want to expand coverage to additional standards, please open an issue or submit a pull request.

**Areas where help is especially welcome:**

- Clause reference verification against published standards
- Additional worked examples (powertrain, body electronics, chassis)
- Regional regulatory mapping (China GB/T, Japan JASO, Korea KS)
- Tool-specific qualification guidance
- Physical AI / collaborative robotics case studies

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Disclaimer

This handbook is a **reference guide** for educational and professional development purposes. It does not reproduce copyrighted standard text. Users must obtain and consult the official published standards from ISO, SAE, IEC, VDA, and AIAG for normative requirements. The authors make no warranty regarding completeness or accuracy — always verify against the published standard of record.

---

## License

This work is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). You are free to share and adapt the material with attribution.

---

## Citation

If you reference this handbook in publications:

> Jherrod Thomas, *Integrated Automotive Standards Handbook*, v2.0, ISH-2026-002, Oct. 2026. [Online]. Available: https://github.com/jherrodthomas/integrated-automotive-standards-handbook

<p align="right">(<a href="#readme-top">back to top</a>)</p>
