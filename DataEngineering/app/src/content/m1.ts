import type { Module } from "../types";

export const m1: Module = {
  id: "m1",
  number: 1,
  title: "From software to data engineering",
  minutes: 15,
  summary: "What transfers, what is new, who does what, and the pharma data landscape.",
  objectives: [
    "Explain the five biggest differences between software and data engineering",
    "Name the roles in a data organization and what each owns",
    "Draw the layers of a modern data platform from memory",
    "Place the main pharma systems on the value chain and tell GxP from non-GxP data",
  ],
  sections: [
    {
      kind: "text",
      title: "What this course is for",
      body: `You are not trying to become a data engineer in four hours. You are preparing to **lead** data engineers: to understand their trade-offs, ask the right questions, spot weak designs, and explain decisions to the business and to Quality.

Interviewers for a data engineering lead role check three things:

1. **Credible technical understanding:** you use the vocabulary correctly and know *why* things are done.
2. **Operational judgment:** you think about failure, cost, quality and compliance, not just the happy path.
3. **Leadership:** you can organize, prioritize, hire and earn trust from stakeholders.

Your software leadership background is a real asset. The point of this module is to tell you precisely **what transfers and what does not**.`,
    },
    {
      kind: "bridge",
      title: "What transfers, and what changes",
      rows: [
        {
          know: "**Rollback.** A bad deploy is fixed by rolling back to the previous version.",
          data: "**Data is state.** Wrong data stays in tables and has already been consumed. Fixing it means correcting code *and* reprocessing history (a backfill) *and* telling consumers.",
        },
        {
          know: "**Errors are visible.** Exceptions, 500s and alerts tell you something broke.",
          data: "**Failures are silent.** The job succeeds, the dashboard loads, the number is wrong. You need checks on the data itself.",
        },
        {
          know: "**You control your inputs.** Requests follow your API contract.",
          data: "**Inputs change without a deploy.** Source systems (ERP, LIMS, MES) change fields, send duplicates or late files. Upstream schema change is the #1 cause of data incidents.",
        },
        {
          know: "**Test data is easy.** Fixtures and mocks.",
          data: "**Realistic test data is hard.** Logic depends on the messy reality of production data, which is often confidential (patients, batches) and large.",
        },
        {
          know: "**SLOs on uptime and latency.**",
          data: "**SLOs on freshness, completeness and correctness.** 'Was the batch-release dataset complete by 06:00?'",
        },
        {
          know: "**Cost scales with traffic.**",
          data: "**Cost scales with data scanned and compute time.** One careless query or an always-on cluster can cost thousands per month.",
        },
        {
          know: "**A product backlog with a PO.**",
          data: "**Many stakeholders and a stream of ad-hoc requests** ('can you pull this number?'). Value is harder to show, so intake and prioritization become a core leadership skill.",
        },
      ],
    },
    {
      kind: "text",
      title: "Who does what in a data organization",
      body: `| Role | Owns | Typical tools |
|---|---|---|
| **Data Engineer** | Ingestion from source systems, pipelines, reliability, performance | Python/SQL, Spark, Airflow/Dagster, Kafka, cloud services |
| **Analytics Engineer** | Business-ready models, tests, documentation, metric definitions | SQL, dbt, semantic layer |
| **Data Platform Engineer** | The shared platform: infrastructure, environments, CI/CD, security, cost guardrails | Terraform, Kubernetes, Databricks/Snowflake admin |
| **Data Architect** | Target architecture, standards, modeling principles | — |
| **Data Analyst / BI** | Analyses, dashboards, answers to business questions | Power BI, Tableau, Spotfire, SQL |
| **Data Scientist** | Statistical and ML models, experiments | Python, notebooks |
| **ML Engineer** | Putting models into production and keeping them healthy | MLflow, serving, monitoring |
| **Data Product Owner** | Value, users and priorities of data products | — |
| **Data Owner / Steward** (business side) | Accountability for and day-to-day quality of a data domain | Catalog, governance tools |

In a small team one person covers several roles. In interviews, show that you know **where the hand-offs are**: Data Engineer ↔ Analytics Engineer (the cleaned layer), DS ↔ MLE (the model), data team ↔ source system teams (the data contract).`,
    },
    {
      kind: "text",
      title: "The modern data platform in one picture",
      body: `Think of it as layers from left to right, with cross-cutting concerns underneath:

| Sources | Ingestion | Storage | Transformation | Serving | Consumption |
|---|---|---|---|---|---|
| ERP (SAP), MES, LIMS, historian, QMS, CRM, clinical, files, APIs | Connectors (Fivetran, Airbyte), CDC, Kafka, batch extracts | Object storage + table formats, or a cloud warehouse | SQL/dbt, Spark | Curated tables, semantic layer, APIs, feature store | BI dashboards, analysts, ML models, GenAI apps, operational systems |

**Cross-cutting:** orchestration (Airflow, Dagster, Databricks Workflows, Azure Data Factory) · quality and observability · catalog, lineage and governance · security and access control · CI/CD · cost management.

Most interview architecture questions are about **choices within each layer** and **how the layers fail**.`,
    },
    {
      kind: "text",
      title: "The pharma data landscape",
      body: `| Value chain | Typical systems | Typical data use |
|---|---|---|
| **Research & Development** | ELN, LIMS (R&D), clinical EDC, CTMS, safety database | Trial analytics, submissions (CDISC SDTM/ADaM), pharmacovigilance signals |
| **Manufacturing & Quality** | MES / electronic batch record, LIMS (QC), process historian (e.g., AVEVA PI), QMS (deviations, CAPA), SAP | Batch release support, yield, right-first-time, process monitoring (CPV), deviation trends |
| **Supply chain** | SAP, planning tools, serialization | Inventory, demand planning, shortages |
| **Commercial & Medical** | CRM, sales and market data | Market performance, field force analytics |

**GxP vs non-GxP.** Data is GxP-relevant when it supports decisions affecting **product quality, patient safety or regulatory submissions**. Examples: QC results feeding a batch-release dashboard, or process data used for continued process verification. A commercial sales dashboard is usually non-GxP.

The distinction drives everything that follows: validation, change control, audit trails and how fast you can ship. Many pharma data platforms therefore separate a **GxP zone** from a **non-GxP zone**.

**Regulators:** in Switzerland, Swissmedic (a PIC/S member, applying GMP rules equivalent to EU GMP). For export markets, the FDA (US) and EMA (EU) matter.`,
    },
    {
      kind: "scenario",
      id: "m1-scn",
      title: "\"The numbers are wrong\"",
      context:
        "Two weeks into your new role, the head of a QC laboratory emails you: *\"Your dashboard says we released 112 batches last month. We released 97. Nobody trusts your data.\"* All pipeline jobs show green.",
      steps: [
        {
          prompt: "What is your first reaction?",
          options: [
            {
              text: "Reply that all jobs succeeded, so the data must be correct",
              score: 0,
              feedback: "Job success says nothing about correctness. This reply also signals that you defend the system rather than solve the user's problem.",
            },
            {
              text: "Acknowledge the issue, ask for the source they compare against, and have the team reconcile the dashboard with the source system (LIMS/QMS) for last month",
              score: 2,
              feedback: "You take the user seriously and go to evidence: reconciliation against the system of record is the fastest way to locate the gap.",
            },
            {
              text: "Ask a data engineer to rewrite the pipeline",
              score: 0,
              feedback: "You don't know the cause yet. It may be a definition issue, not a code issue.",
            },
          ],
        },
        {
          prompt:
            "The reconciliation shows the dashboard counts every *release decision record*, including 15 batches released, then re-opened and released again. What kind of problem is this?",
          options: [
            {
              text: "A software bug in the pipeline",
              score: 0,
              feedback: "The code does what it was written to do. The problem is what 'released batch' should mean.",
            },
            {
              text: "A definition and grain problem: the metric counts events, the lab counts distinct batches. A business owner must confirm the definition, which is then implemented once",
              score: 2,
              feedback: "Very common in data: technically correct, semantically wrong. You'll see grain in Module 2 and KPI ownership in Modules 2 and 6.",
            },
            {
              text: "A data quality problem in the LIMS",
              score: 1,
              feedback: "Re-opened releases are legitimate events, not bad data. The issue is in how the KPI is defined on top of them.",
            },
          ],
        },
      ],
    },
    {
      kind: "check",
      id: "m1-check",
      questions: [
        {
          id: "m1c1",
          prompt: "A pipeline 'succeeded' every night, yet a KPI has been wrong for a week. Which software habit is least sufficient here?",
          options: [
            "Relying on job success/failure alerts",
            "Writing postmortems",
            "Peer review of changes",
            "Versioning code in Git",
          ],
          answer: 0,
          explanation:
            "Job success only tells you the code ran. Silent data failures need checks on the output: volumes, freshness, value ranges, reconciliation with the source.",
        },
        {
          id: "m1c2",
          prompt: "Which data is most likely GxP-relevant?",
          options: [
            "Field-force CRM call notes",
            "QC laboratory results used in a batch-release dashboard",
            "Website analytics",
            "Marketing campaign spend",
          ],
          answer: 1,
          explanation:
            "QC results supporting batch release directly affect product quality and patient safety, so the systems and pipelines involved fall under GxP expectations.",
        },
        {
          id: "m1c3",
          prompt: "Where is the hand-off between the Data Engineer and the Analytics Engineer usually located?",
          options: [
            "At the BI dashboard",
            "At the source system",
            "At the cleaned, conformed data layer that business models are built on",
            "At the ML model registry",
          ],
          answer: 2,
          explanation:
            "Data Engineers deliver reliable, cleaned and conformed data. Analytics Engineers turn it into business models and metric definitions. Making this boundary explicit avoids gaps and duplicated work.",
        },
      ],
    },
    {
      kind: "lead",
      body: `**How to use your background in an interview:**

- **Incidents → data incidents.** "I ran incident management for production services; in data I'd add detection for silent failures, impact analysis on downstream consumers and backfill planning."
- **SRE practices → data reliability.** SLOs, error budgets, on-call and blameless postmortems transfer directly. Say so explicitly.
- **API contracts → data contracts.** You know why interfaces between teams need to be explicit and versioned.
- **CI/CD → DataOps.** Same principles, plus tests on data and environments with realistic data.
- **Hiring and growing engineers.** Transfers fully. Learn what good looks like for data roles (Module 8).

**Be honest about the gap:** "I haven't built Spark pipelines myself; my role is to make sure the team builds the right thing reliably, and I've learned enough to challenge the design." Interviewers respect that far more than bluffing.`,
    },
    {
      kind: "open",
      id: "m1-open",
      prompt: "\"You come from software engineering. Why should we hire you to lead a data engineering team?\"",
      rubric: [
        "Names concrete transferable strengths (incident management, SRE/SLOs, CI/CD, contracts between teams, hiring and coaching)",
        "Shows awareness of what is different in data (state that can't be rolled back, silent failures, upstream changes, data quality)",
        "Acknowledges the gap honestly and explains how they bridge it (rely on senior engineers, learning plan, asking good questions)",
        "Connects to the business or to pharma (trust in data, compliance, decisions made on the data)",
        "Gives one concrete example or story from their past",
      ],
      redFlags: [
        "Claiming data engineering is 'just software engineering with SQL'",
        "Over-claiming hands-on expertise they don't have",
        "Talking only about technology, with nothing about people or stakeholders",
      ],
      modelAnswer: `"Leading a data team is first about **reliability, people and stakeholder trust**, and I've done all three for five years in software.

What transfers directly: I've run production incident management and introduced SLOs and postmortems; I've built CI/CD and testing culture; I've negotiated API contracts between teams; and I've hired and grown engineers.

What is different, and I've studied it: data is state, so a bug isn't fixed by a rollback but by a backfill and communication to consumers. Failures are often silent, so you test and monitor the data itself. Most incidents come from upstream changes, which is why I'd push data contracts with source system teams. In pharma there's also a GxP layer, where data integrity and risk-based validation shape how fast we can deliver.

I won't be the best Spark engineer on the team, and that's not the job. My job is to make sure we build the right things, reliably and compliantly, and that the business trusts the numbers. For example, in my current role I… *[one concrete story: an incident you led, a reliability improvement, or a cross-team contract you put in place]*."`,
    },
  ],
};
