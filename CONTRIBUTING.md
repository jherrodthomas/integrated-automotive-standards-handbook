# Contributing to the Integrated Automotive Standards Handbook

Thank you for your interest in improving this resource. Contributions from practicing engineers, auditors, and researchers make this handbook more accurate and useful for everyone.

---

## How to Contribute

### 1. Report an Issue

If you find an incorrect clause reference, a factual error, or a gap in coverage, [open an issue](https://github.com/jherrodthomas/integrated-automotive-standards-handbook/issues/new/choose) using the appropriate template:

- **Clause Correction** — An incorrect or outdated clause reference (e.g., "Table 5.3 maps ISO 26262 Part 4 Clause 7 but the requirement moved to Clause 8 in the 2018 edition")
- **New Worked Example** — A proposal for a new end-to-end worked example (e.g., powertrain inverter, body controller, chassis domain)
- **Standard Coverage Request** — A request to add or expand coverage of a standard not yet included (e.g., ISO 24089, UN R155/R156, GB/T 40857)

### 2. Submit a Pull Request

For direct contributions:

1. Fork the repository
2. Create a feature branch (`git checkout -b fix/clause-ref-ch5-table3`)
3. Make your changes
4. Submit a pull request with a clear description of what changed and why

---

## Contribution Types

### Clause Reference Corrections

This is the highest-value contribution. If you have access to the published standard and can verify a clause reference:

- Identify the specific table, section, or paragraph in the handbook
- State the current (incorrect) reference
- Provide the correct reference with the standard edition and clause number
- If possible, include the relevant requirement text summary (do not reproduce copyrighted standard text verbatim)

**Example:**
> Chapter 6, Table 6.2, Row "Technical Safety Concept" currently references ISO 26262-4:2018 Clause 6. The correct reference is ISO 26262-4:2018 Clause 7 (Technical Safety Concept), as Clause 6 covers System Design Specification.

### New Worked Examples

The handbook currently includes two end-to-end worked examples (ADAS Forward Camera ECU and AI Pedestrian Detection). Additional examples are welcome, particularly for:

- Powertrain (inverter, motor controller, BMS)
- Body electronics (door module, lighting, HVAC)
- Chassis (electric power steering, braking, suspension)
- Infotainment with cybersecurity focus
- V2X communication modules

A good worked example should:

- Define the item/component with a clear scope boundary
- Assign ASIL and CAL classifications with rationale
- Walk through at least 4 lifecycle phases showing cross-standard integration
- Include at least one cross-mapping table per phase
- Reference specific clauses from all six standards where applicable

### Regional Regulatory Mapping

The v1.0 handbook focuses on ISO/SAE international standards. Contributions mapping regional regulations are especially welcome:

- China: GB/T 40857, GB/T 40856, GB 44495
- Japan: JASO TP 15002, JAMA guidelines
- Korea: KS R ISO 26262, KATRI requirements
- India: AIS-189, AIS-190

### Tool-Specific Qualification Guidance

Practical guidance for qualifying specific tools under the integrated framework:

- Static analysis tools (Polyspace, LDRA, Coverity, PC-lint)
- Requirements management (DOORS, Polarion, Jama)
- Model-based design (Simulink, SCADE, TargetLink)
- Test automation (VectorCAST, Tessy, Cantata)
- Configuration management (Git-based workflows for ASPICE compliance)

---

## Style Guidelines

### Writing Style

- Write for practicing engineers, not academics — clear, direct, and actionable
- Use present tense and active voice
- Define acronyms on first use within each chapter
- Reference specific clause numbers (e.g., "ISO 26262-3:2018 Clause 7.4.2") rather than vague references

### Table Format

- Use the "Rosetta Stone" cross-mapping format established in the handbook: one column per standard, activities as rows
- Include clause references in every cell, not just standard names
- Mark cells "N/A" (not "—" or blank) when a standard has no corresponding requirement

### Citation Format

- Use IEEE citation style for all references
- Format: `[n] Author(s), *Title*, Standard/Edition, Publisher, Year.`
- SAE papers: `[n] Author(s), "Title," SAE Technical Paper YYYY-01-NNNN, Year.`

---

## Code of Conduct

Be respectful, constructive, and professional. This is a technical resource — contributions should be grounded in published standards and engineering practice. Disagreements about interpretation are welcome when supported by clause references.

---

## License

By contributing, you agree that your contributions will be licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), consistent with the rest of the handbook.
