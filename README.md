# Integrated Automotive Standards Handbook

A single-source reference that cross-maps **six major automotive standards** at the clause level, organized by lifecycle phase for practicing engineers.

| Standard | Edition | Scope |
|----------|---------|-------|
| ISO 26262 | 2018 (Ed.2) | Functional safety of E/E systems |
| ISO/SAE 21434 | 2021 | Cybersecurity engineering |
| ISO 21448 | 2022 | Safety of the intended functionality (SOTIF) |
| ISO/PAS 8800 | 2024 | AI/ML safety for road vehicles |
| ISO 9001 / IATF 16949 | 2015 / 2016 | Quality management system |
| ASPICE | v4.0 (2023) | Process capability assessment |

---

## Why This Exists

Automotive E/E teams typically implement these standards in silos — separate safety teams, cybersecurity teams, quality teams, each producing parallel documents and running independent review cycles. The result is redundant work, traceability gaps at domain interfaces, and audit fatigue.

This handbook solves that by organizing requirements **by lifecycle phase** rather than by standard. When you're in the concept phase doing HARA, you see exactly what TARA, SOTIF evaluation, and AI safety analysis require — in one table.

---

## What's Inside

### Part I — Foundation & Framework (Chapters 1-3)
How to navigate the handbook, six standards at a glance (structural overview, key concepts, regulatory context for each), and the integration framework with unified V-model.

### Part II — Clause-Level Cross-Mapping (Chapters 4-10)
The heart of the handbook. Seven chapters covering every lifecycle phase from organizational setup through decommissioning. Each chapter includes:
- Standard-by-standard clause requirements
- "Rosetta Stone" cross-mapping table (6 columns, one per standard)
- Commonality analysis (do once, satisfy many)
- Gap analysis (unique requirements you can't skip)
- Integrated activity checklist with clause references
- Worked AEB mini-example

### Part III — End-to-End Worked Examples (Chapters 11-12)
- **Chapter 11**: ADAS Forward Camera ECU (ASIL B(D), CAL 3) — complete lifecycle from item definition through field monitoring
- **Chapter 12**: AI Pedestrian Detection on NVIDIA Orin (ASIL C, CAL 4) — full AI/ML lifecycle including dataset requirements, model training, adversarial testing, and assurance case

### Part IV — Practical Tools (Chapters 13-15)
- 8 integrated work product templates (replacing 30+ siloed documents)
- Audit & assessment readiness guide
- Tool qualification across standards

### Part V — Reference (Appendices A-D)
- Master cross-reference matrix (80+ activities mapped across all standards)
- 50+ IEEE-format references
- 150+ acronyms & glossary

---

## Quick Stats

| Metric | Count |
|--------|-------|
| Chapters | 15 |
| Appendices | 4 |
| Cross-mapping tables | 109 |
| Section headings | 166 |
| IEEE references | 50+ |
| Glossary terms | 150+ |

---

## Who This Is For

| Role | Start Here |
|------|-----------|
| Functional Safety Engineer | Chapters 5-9 (lifecycle phases) |
| Cybersecurity Engineer | Chapters 5-9 + Chapter 14 (audit readiness) |
| Software Developer | Chapter 8 (SW & AI/ML development) |
| AI/ML Engineer | Chapter 8 + Chapter 12 (AI worked example) |
| Quality / Process Manager | Chapter 4 + Chapter 14 |
| System Architect | Chapter 6 (system-level development) |
| Auditor / Assessor | Chapter 14 + Appendix A |

---

## Roadmap

### v1.0 (April 2026) — Current Release
- Complete clause-level cross-mapping for all six standards
- Two end-to-end worked examples (ADAS camera ECU + AI pedestrian detection)
- 8 consolidated work product templates
- Audit readiness guides

### v1.1 (Planned)
- Expanded worked examples with filled-in artifact templates (downloadable)
- Additional diagrams and visual cross-reference maps
- Community-reported errata fixes

### v2.0 (Planned)
- Coverage of ISO 24089:2023 (Software Update Engineering)
- UN R155/R156 regulatory mapping overlay
- STPA integration (SAE J3187)
- Tool-specific implementation guides (Vector, dSPACE, Polyspace, LDRA)
- Interactive web-based cross-reference explorer

---

## Contributing

Contributions are welcome. If you spot an incorrect clause reference, have a better worked example, or want to expand coverage to additional standards, please open an issue or submit a pull request.

**Areas where help is especially welcome:**
- Clause reference verification against published standards
- Additional worked examples (powertrain, body electronics, chassis)
- Regional regulatory mapping (China GB/T, Japan JASO, Korea KS)
- Tool-specific qualification guidance

---

## Disclaimer

This handbook is a **reference guide** for educational and professional development purposes. It does not reproduce copyrighted standard text. Users must obtain and consult the official published standards from ISO, SAE, VDA, and AIAG for normative requirements. The authors make no warranty regarding completeness or accuracy — always verify against the published standard of record.

---

## License

This work is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). You are free to share and adapt the material with attribution.

---

## Citation

If you reference this handbook in publications:

> Jherrod Thomas, *Integrated Automotive Standards Handbook*, v1.0, ISH-2026-001, Apr. 2026. [Online]. Available: https://github.com/jherrod/integrated-automotive-standards-handbook
