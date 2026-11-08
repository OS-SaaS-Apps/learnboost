import type { Module } from "../types";

export const m6: Module = {
  id: "m6",
  number: 6,
  title: "Governance, GxP & privacy",
  minutes: 30,
  summary: "Ownership, catalog, lineage, master data, ALCOA+, Part 11 / Annex 11, risk-based validation and Swiss privacy law.",
  objectives: [
    "Explain data owner, steward and custodian and set up lightweight governance",
    "Explain master data management and why it matters in pharma",
    "Apply ALCOA+ to a data platform",
    "Describe what Part 11 / Annex 11 and GAMP 5 / CSA mean for a data team",
    "Explain how to stay agile while delivering validated GxP pipelines",
    "Name the Swiss and EU privacy rules relevant to patient and employee data",
  ],
  sections: [
    {
      kind: "text",
      title: "Data governance without bureaucracy",
      body: `**Governance = who decides what about data, and how it's enforced.**

| Role | Side | Responsibility |
|---|---|---|
| **Data Owner** | Business (senior) | Accountable for a data domain: definitions, access approvals, quality thresholds |
| **Data Steward** | Business (operational) | Day-to-day quality, metadata, issue resolution |
| **Data Custodian** | IT / data team | Technical implementation: storage, security, pipelines, backups |

**Building blocks:**

- **Catalog:** searchable inventory of datasets with descriptions, owners, classification and usage (Collibra, Alation, Atlan, Microsoft Purview, Databricks Unity Catalog, open source DataHub/OpenMetadata).
- **Lineage:** where data comes from and where it goes, used for impact analysis ("which reports break if LIMS changes?") and audits.
- **Classification:** e.g., public / internal / confidential / strictly confidential, plus tags such as GxP, personal data, health data.
- **Access control:** role- or attribute-based, least privilege, approval workflows, periodic access reviews.

**Keep it lightweight:** start with the critical domains (e.g., product/material master, batch and quality data), name owners, automate what you can (classification tags, lineage from the platform), and avoid committees without decisions.`,
    },
    {
      kind: "text",
      title: "Master data and data quality",
      body: `**Master data** is the shared reference data the business runs on: materials, products, sites, equipment, suppliers, customers. In pharma, the **material and product master** (often in SAP) is central: the same product may have different codes per site, per market and per regulatory registration.

**Master Data Management (MDM)** creates a **golden record** through:

- **Matching:** identify records that represent the same entity
- **Survivorship rules:** which source wins for each attribute
- **Stewardship workflows:** humans resolve ambiguous cases
- **Distribution:** golden records flow back to consumers

Regulatory context: **IDMP** (Identification of Medicinal Products, ISO standards; implemented in the EU via EMA's SPOR services) pushes companies to have consistent, structured product data.

**Data quality dimensions:** accuracy, completeness, consistency, validity, uniqueness, timeliness. Define them per use case (Module 5).

> Without good master data, conformed dimensions fail and cross-site comparisons are wrong. Master data is often the hidden root cause behind "the data platform doesn't work".`,
    },
    {
      kind: "text",
      title: "GxP and data integrity: ALCOA+",
      body: `**GxP** = good practices: GMP (manufacturing), GCP (clinical), GLP (laboratory), GDP (distribution), GVP (pharmacovigilance). Data supporting GxP decisions must meet **data integrity** expectations, described by **ALCOA+**:

| Principle | Meaning | On a data platform |
|---|---|---|
| **A**ttributable | Who did what, when | Named accounts (no shared logins), audit logs of changes |
| **L**egible | Readable and understandable over time | Documented formats and definitions |
| **C**ontemporaneous | Recorded when it happened | Reliable timestamps, time zones handled |
| **O**riginal | The original record or a certified copy | Keep raw data (bronze), controlled copies |
| **A**ccurate | Correct and truthful | Validated transformations, reconciliation |
| **C**omplete | Nothing lost, including changes and reruns | No silent deletes, audit trail of reprocessing |
| **C**onsistent | Coherent sequence and format | Consistent processing, controlled changes |
| **E**nduring | Lasts for the retention period | Archival strategy, durable storage |
| **A**vailable | Retrievable for review and inspection | Can be found and produced during audits |

Key guidance documents: MHRA GxP Data Integrity Guidance (2018), PIC/S PI 041 (2021), FDA Data Integrity and Compliance with CGMP (2018).`,
    },
    {
      kind: "text",
      title: "Computerised system rules: Part 11, Annex 11, Annex 22",
      body: `- **FDA 21 CFR Part 11:** electronic records and signatures. Validation, audit trails, access control, record retention, and e-signature controls. Relevant for anything supporting products for the US market.
- **EU GMP Annex 11, Computerised Systems:** risk management, supplier assessment, validation, data integrity checks, audit trails, change and configuration management, periodic review, business continuity. **Switzerland:** Swissmedic applies the PIC/S GMP guide, equivalent to EU GMP including Annex 11. A substantially **revised Annex 11** was published for consultation in 2025.
- **Draft Annex 22, Artificial Intelligence (2025 consultation):** expectations for AI/ML models in critical GMP applications (Module 7).

**What 'validated' means:** documented evidence that a system consistently does what it's intended to do. For a data pipeline feeding a GxP decision, that means requirements, a risk assessment, testing against requirements, controlled release, then staying in a **validated state** through change control and periodic review.`,
    },
    {
      kind: "text",
      title: "Risk-based validation and staying agile",
      body: `**Classic CSV** (computer system validation) often meant heavy documents: URS → functional spec → IQ/OQ/PQ protocols → traceability matrix. Done naively for every change, it freezes delivery.

**Modern guidance is risk-based:**

- **GAMP 5 (2nd edition, 2022)** encourages critical thinking, scaling effort to risk, leveraging supplier documentation, and supports agile and automated testing.
- **FDA Computer Software Assurance (CSA)** shifts effort from documentation to assurance activities proportional to risk: scripted testing for high-risk functions, unscripted/exploratory testing for lower-risk ones.

**How a data team stays agile in GxP:**

1. **Qualify the platform once** (infrastructure, configuration, supplier assessment); don't re-validate it for every pipeline.
2. **Risk-tier the pipelines:** direct impact on patient safety / product quality / data integrity → rigorous; indirect → lighter; non-GxP → normal DataOps.
3. **Automated tests as evidence:** CI test runs, PR reviews and deployment logs are generated, retained and linked to requirements.
4. **Standardized, pre-assessed components** (ingestion patterns, test frameworks) reduce validation per use case.
5. **Change control proportional to risk:** pre-approved standard changes for low-risk updates; full impact assessment for significant ones.
6. **Release cadence by zone:** continuous delivery in the non-GxP zone, planned releases (e.g., every 2–4 weeks) in the GxP zone.
7. **Partner with Quality / CSV early**, as co-designers of the process, not as a gate at the end.`,
    },
    {
      kind: "text",
      title: "Privacy: Swiss and EU rules",
      body: `| Rule | Scope | Data team implications |
|---|---|---|
| **Swiss revised FADP** (in force since 1 Sept 2023) | Personal data processed in Switzerland | Privacy by design/default, records of processing, data protection impact assessments for high-risk processing, breach notification, cross-border transfer rules. Health data is *sensitive*. |
| **EU GDPR** | When processing data of people in the EU (e.g., trial participants, EU employees) | Lawful basis, purpose limitation, minimization, data subject rights, DPIAs |
| **Swiss Human Research Act (HRA)** | Research involving persons and health-related data | Coding of data, ethics approval, consent and further-use rules |

**Techniques to know:**

- **Pseudonymization:** replace identifiers with codes; re-identification remains possible with the key. Still personal data. Typical for clinical data ('coded' data).
- **Anonymization:** re-identification is no longer reasonably possible. Harder than it looks for rich datasets.
- **Masking** in non-production environments, **column/row-level security**, **purpose-based access**, and minimization (don't ingest what you don't need).

Work with the **Data Protection Officer** and Legal early, especially for clinical, pharmacovigilance and HR data.`,
    },
    {
      kind: "scenario",
      id: "m6-scn",
      title: "A new pipeline for continued process verification",
      context:
        "Manufacturing Science & Technology (MSAT) wants a pipeline that combines **historian process data, LIMS QC results and MES batch data** to monitor critical process parameters for **continued process verification (CPV)**. The output will support quality decisions and annual product reviews.",
      steps: [
        {
          prompt: "How do you classify this pipeline?",
          options: [
            {
              text: "Non-GxP: it's just analytics",
              score: 0,
              feedback: "CPV supports quality decisions and regulatory obligations. Treating it as non-GxP is an inspection finding waiting to happen.",
            },
            {
              text: "GxP-relevant with direct quality impact: needs a risk assessment, validation proportional to risk, audit trail and change control",
              score: 2,
              feedback: "Correct. The classification should be confirmed with Quality, and then it drives the rest of the design.",
            },
            {
              text: "Decide later, once it's built",
              score: 0,
              feedback: "Retrofitting validation and data integrity controls is far more expensive than designing them in.",
            },
          ],
        },
        {
          prompt: "How do you validate it without a six-month documentation exercise?",
          options: [
            {
              text: "Full IQ/OQ/PQ documentation of the entire data platform for this one pipeline",
              score: 0,
              feedback: "The platform should already be qualified. Re-validating it per pipeline is the anti-pattern that kills agility.",
            },
            {
              text: "Rely on the qualified platform; define requirements and a risk assessment for the pipeline; test critical calculations rigorously (scripted) and others with automated tests; keep CI evidence; release under change control",
              score: 2,
              feedback: "This is GAMP 5 / CSA thinking: effort where the risk is, automation as evidence.",
            },
            {
              text: "Skip validation; the vendor's platform is certified",
              score: 0,
              feedback: "Vendor certification covers the vendor's product, not your intended use, configuration and calculations.",
            },
          ],
        },
        {
          prompt: "An engineer wants to fix a small calculation bug directly in production because it's 'obvious'. What do you say?",
          options: [
            {
              text: "Fine, it's a small fix",
              score: 0,
              feedback: "Uncontrolled changes to a validated pipeline break the validated state and data integrity, even when the fix is right.",
            },
            {
              text: "Raise a change: impact assessment (which outputs and periods were affected, whether past decisions need review), fix through the normal pipeline with tests, documented reprocessing, and inform Quality",
              score: 2,
              feedback: "The fix is the easy part. The impact on past quality decisions is what Quality needs to assess.",
            },
            {
              text: "Wait for the next annual review",
              score: 0,
              feedback: "A known error in GxP data needs timely handling, possibly as a deviation.",
            },
          ],
        },
      ],
    },
    {
      kind: "check",
      id: "m6-check",
      questions: [
        {
          id: "m6c1",
          prompt: "Which practice violates the 'Attributable' principle of ALCOA+?",
          options: ["Using named service accounts", "A shared admin login used by several engineers to modify GxP tables", "Logging every change with user and timestamp", "Role-based access control"],
          answer: 1,
          explanation: "With a shared login, you can't tell who made a change. It's a frequent inspection finding.",
        },
        {
          id: "m6c2",
          prompt: "Pseudonymized clinical trial data is…",
          options: [
            "anonymous, so privacy law no longer applies",
            "only regulated in the EU",
            "safe to share publicly",
            "still personal data, because re-identification is possible with the key",
          ],
          answer: 3,
          explanation: "Pseudonymization reduces risk but the data stays personal (and health data is sensitive). Access control and purpose limitation still apply.",
        },
        {
          id: "m6c3",
          prompt: "Who should be accountable for the definition and quality thresholds of batch data?",
          options: [
            "A business Data Owner (e.g., in Quality or Manufacturing), with stewards and the data team as custodian",
            "The data engineer who built the pipeline",
            "The cloud vendor",
            "The data protection officer",
          ],
          answer: 0,
          explanation: "The business owns meaning and fitness for use; the data team implements and operates.",
        },
      ],
    },
    {
      kind: "lead",
      body: `**Decisions a lead owns here:**

- With Quality: the **GxP classification approach**, the **validation strategy** for the platform and for pipelines (risk tiers, evidence from automation), and the **change control** model
- **Zoning and access:** who can access what, approval workflows, periodic access reviews
- **Ownership model:** naming data owners for critical domains, and the minimum catalog/lineage standard
- **Privacy by design:** minimization, pseudonymization, masking in non-prod, DPIAs with the DPO

**What interviewers listen for:** you treat Quality as a partner; you know ALCOA+ and can translate it into platform features; you can explain *how* you keep delivery fast under GxP (qualified platform, risk-based validation, automated evidence). Saying "validation slows everything down, so let's avoid GxP" is a red flag.`,
    },
    {
      kind: "open",
      id: "m6-open",
      prompt: "\"How would you run an agile data engineering team in a GxP-regulated environment?\"",
      rubric: [
        "Distinguishes GxP from non-GxP work and zones; classification done with Quality",
        "Platform qualified once; pipelines validated proportionally to risk (GAMP 5 2nd ed. / CSA)",
        "Automation as validation evidence: CI tests, PR reviews, deployment logs, traceability to requirements",
        "Change control proportional to risk (standard pre-approved changes vs significant changes) and different release cadences per zone",
        "Data integrity by design (ALCOA+: audit trails, named access, raw data retention) and early partnership with Quality/CSV",
      ],
      redFlags: ["Avoiding GxP classification to go faster", "Validation as a document-writing exercise at the end", "Treating Quality as an obstacle"],
      modelAnswer: `I'd make compliance part of the delivery system rather than a phase at the end.

1. **Classify and zone:** with Quality, classify each data product. GxP products live in a qualified zone with stricter controls; non-GxP work runs at normal DataOps speed in a separate zone.
2. **Qualify the platform once:** supplier assessment, documented configuration and infrastructure qualification, so individual pipelines don't re-validate the platform.
3. **Risk-based validation (GAMP 5 2nd edition, CSA):** for each GxP pipeline, requirements plus a risk assessment. Critical calculations get rigorous scripted tests; the rest gets automated tests.
4. **Automation is the evidence:** every change goes through a PR with review and CI tests. Results and deployment logs are retained and traced to requirements, so validation evidence is produced as a by-product of engineering.
5. **Proportional change control:** pre-approved standard changes for low-risk updates; impact assessment for significant ones. GxP releases on a regular cadence (e.g., every two weeks); continuous delivery elsewhere.
6. **Data integrity by design:** named accounts, audit trails, raw data retained, controlled reprocessing.
7. **Quality as a partner:** a CSV/Quality counterpart joins planning and design, not just the final approval.`,
    },
  ],
};
