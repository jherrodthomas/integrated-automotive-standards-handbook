<a id="readme-top"></a>

<!-- ═══════════════════════════════════════════════════════════════════
     HERO SECTION
     ═══════════════════════════════════════════════════════════════════ -->

<div align="center">
  <img src="assets/readme/hero.svg" alt="Integrated Automotive Standards Handbook — Cross-mapping 9 standards, 17 chapters, 3 tool chains" width="960"/>
</div>

<!-- ═══════════════════════════════════════════════════════════════════
     BADGES
     ═══════════════════════════════════════════════════════════════════ -->

<div align="center">

[![Version](https://img.shields.io/badge/version-2.0-1479F5?style=flat-square&labelColor=10264D)](https://github.com/jherrodthomas/integrated-automotive-standards-handbook)
[![Standards](https://img.shields.io/badge/standards-9-0E7C7B?style=flat-square&labelColor=10264D)](https://github.com/jherrodthomas/integrated-automotive-standards-handbook)
[![Chapters](https://img.shields.io/badge/chapters-17-E0A33E?style=flat-square&labelColor=10264D)](https://github.com/jherrodthomas/integrated-automotive-standards-handbook)
[![Cross‑Maps](https://img.shields.io/badge/cross--maps-109+-D45B45?style=flat-square&labelColor=10264D)](https://github.com/jherrodthomas/integrated-automotive-standards-handbook)
[![License](https://img.shields.io/badge/license-CC_BY--SA_4.0-059669?style=flat-square&labelColor=10264D)](https://creativecommons.org/licenses/by-sa/4.0/)

</div>

&nbsp;

<!-- ═══════════════════════════════════════════════════════════════════
     STATISTICS STRIP
     ═══════════════════════════════════════════════════════════════════ -->

<div align="center">
  <img src="assets/readme/stats_strip.svg" alt="Quick stats: 9 standards, 17 chapters, 109+ cross-maps, 200+ tools, 3 tool chains, 50+ references" width="900"/>
</div>

&nbsp;

<!-- ═══════════════════════════════════════════════════════════════════
     TABLE OF CONTENTS
     ═══════════════════════════════════════════════════════════════════ -->

<details>
<summary><strong>📑 Table of Contents</strong></summary>

- [Why This Exists](#why-this-exists)
- [Standards Coverage](#standards-coverage)
- [What's Inside](#whats-inside)
- [Integrity Level Cross-Map](#integrity-level-cross-map)
- [Quick Start by Role](#quick-start-by-role)
- [Featured Diagrams](#featured-diagrams)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Disclaimer](#disclaimer)
- [License & Citation](#license--citation)

</details>

---

## Why This Exists

Automotive E/E teams typically implement safety, cybersecurity, quality, and process standards in silos — separate teams producing parallel documents and running independent review cycles. The result is redundant work, traceability gaps at domain interfaces, and audit fatigue.

This handbook solves that by organizing requirements **by lifecycle phase** rather than by standard. When you're in the concept phase doing HARA, you see exactly what TARA, SOTIF evaluation, AI safety analysis, and physical AI safety require — in one table, with one set of work products.

> **v2 expands from 6 to 9 standards**, adding IEC 61508, ISO 13849-1, and ISO 10218 for Physical AI and industrial safety coverage.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Standards Coverage

<div align="center">
  <img src="assets/readme/standards_grid.svg" alt="Nine standards covered: ISO 26262, ISO/SAE 21434, ISO 21448, ISO/PAS 8800, ISO 9001/IATF 16949, ASPICE v4.0, IEC 61508, ISO 13849-1, ISO 10218" width="940"/>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## What's Inside

<div align="center">
  <img src="assets/readme/whats_inside.svg" alt="Handbook structure: Part I Foundation (Ch 1-3), Part II Cross-Mapping (Ch 4-10), Part III Worked Examples (Ch 11-12), Part IV Practical Tools (Ch 13-16), Part V Physical AI Bridge (Ch 17)" width="920"/>
</div>

<details>
<summary><strong>Expand for chapter details</strong></summary>

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

</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Integrity Level Cross-Map

One of the handbook's most referenced tables — mapping integrity and performance levels across standard families:

<div align="center">
  <img src="assets/readme/crossmap.svg" alt="Integrity level cross-map: SIL to ASIL to PL to CAL equivalences" width="920"/>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Quick Start by Role

<div align="center">
  <img src="assets/readme/quick_start.svg" alt="Quick start guide by role: Safety Engineer, Cybersecurity Engineer, AI/ML Engineer, System Architect, Quality Manager, Physical AI Engineer" width="940"/>
</div>

| Role | Start Here | Key Chapters |
|:-----|:-----------|:-------------|
| **Functional Safety Engineer** | Ch 5–9 | Lifecycle phases, HARA → validation |
| **Cybersecurity Engineer** | Ch 5–9 + Ch 14 | TARA integration, audit readiness |
| **Software Developer** | Ch 8 | SW & AI/ML development phase |
| **AI/ML Engineer** | Ch 8 + Ch 12 | AI worked example, data safety |
| **System Architect** | Ch 6 + Ch 16 | System-level dev, tool chains |
| **Quality / Process Manager** | Ch 4 + Ch 14 | Org setup, audit readiness |
| **Physical AI / Robotics Eng.** | Ch 17 | IEC 61508, ISO 13849, ISO 10218 |
| **Auditor / Assessor** | Ch 14 + App A | Audit guide, master cross-ref |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Featured Diagrams

The `visuals/` directory contains publication-quality diagrams. Each diagram below is available as an SVG in the repository:

<div align="center">
  <img src="assets/readme/diagrams_gallery.svg" alt="Five featured diagrams: Standards Family Tree, System Boundary Map, SysML Block Diagram, Integrated V-Cycle, Integration Architecture" width="920"/>
</div>

&nbsp;

<details>
<summary><strong>Standards Family Tree</strong> — Hierarchical lineage from IEC 61508 through domain derivatives</summary>

<div align="center">
  <img src="visuals/readme_family_tree.svg" alt="Standards Family Tree" width="960"/>
</div>
</details>

<details>
<summary><strong>System Boundary Map</strong> — Standard scope across automotive domains</summary>

<div align="center">
  <img src="visuals/readme_boundary_map.svg" alt="System Boundary Map" width="960"/>
</div>
</details>

<details>
<summary><strong>SysML Block Definition</strong> — Structural architecture of standards as blocks</summary>

<div align="center">
  <img src="visuals/readme_sysml_bdd.svg" alt="SysML Block Definition Diagram" width="960"/>
</div>
</details>

<details>
<summary><strong>Integrated V-Cycle</strong> — 9 standards mapped to lifecycle phases</summary>

<div align="center">
  <img src="visuals/readme_vcycle.svg" alt="Integrated V-Cycle" width="960"/>
</div>
</details>

<details>
<summary><strong>Integration Architecture</strong> — Cross-domain data flow</summary>

<div align="center">
  <img src="visuals/readme_architecture.svg" alt="Integration Architecture" width="960"/>
</div>
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Roadmap

<div align="center">
  <img src="assets/readme/roadmap.svg" alt="Roadmap: v1.0 April 2026 (done), v2.0 October 2026 (current), v2.1 planned, v3.0 future" width="900"/>
</div>

<details>
<summary><strong>Expand roadmap details</strong></summary>

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

</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Contributing

Contributions are welcome. If you spot an incorrect clause reference, have a better worked example, or want to expand coverage to additional standards, please open an issue or submit a pull request.

**Areas where help is especially welcome:** clause reference verification against published standards, additional worked examples (powertrain, body electronics, chassis), regional regulatory mapping (China GB/T, Japan JASO, Korea KS), tool-specific qualification guidance, and Physical AI / collaborative robotics case studies.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Disclaimer

This handbook is a **reference guide** for educational and professional development purposes. It does not reproduce copyrighted standard text. Users must obtain and consult the official published standards from ISO, SAE, IEC, VDA, and AIAG for normative requirements. The authors make no warranty regarding completeness or accuracy — always verify against the published standard of record.

---

## License & Citation

This work is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). You are free to share and adapt the material with attribution.

> Jherrod Thomas, *Integrated Automotive Standards Handbook*, v2.0, ISH-2026-002, Oct. 2026. [Online]. Available: https://github.com/jherrodthomas/integrated-automotive-standards-handbook

---

<div align="center">
  <img src="assets/readme/footer.svg" alt="Integrated Automotive Standards Handbook v2.0 · CC BY-SA 4.0 · Jherrod Thomas · Vizology AI" width="960"/>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
