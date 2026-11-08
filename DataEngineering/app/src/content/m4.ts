import type { Module } from "../types";

export const m4: Module = {
  id: "m4",
  number: 4,
  title: "Architecture & platforms",
  minutes: 25,
  summary: "Warehouse, lake, lakehouse, open table formats, the vendor landscape, Data Mesh and GxP zoning.",
  objectives: [
    "Compare warehouse, lake and lakehouse with their trade-offs",
    "Explain what open table formats bring (ACID, schema evolution, time travel)",
    "Discuss the main platforms (Databricks, Snowflake, Fabric, BigQuery…) using selection criteria rather than preference",
    "Present Data Mesh as an operating model with known failure modes",
    "Describe how pharma companies separate GxP and non-GxP zones",
  ],
  sections: [
    {
      kind: "text",
      title: "Warehouse, lake, lakehouse",
      body: `| | Data warehouse | Data lake | Lakehouse |
|---|---|---|---|
| Storage | Proprietary, managed | Files in object storage (S3, ADLS, GCS) | Files in object storage + **open table format** |
| Data | Structured, modeled | Anything: raw files, logs, images, documents | Anything, with tables on top |
| Strength | SQL performance, governance, simplicity | Cheap, flexible, ML-friendly | Both: ACID tables on open files, BI + ML on one copy |
| Weakness | Less suited to unstructured data / ML, lock-in | 'Data swamp': no transactions, weak governance | More engineering maturity needed |
| Examples | Snowflake¹, BigQuery¹, Redshift, Synapse | Plain S3/ADLS + Spark | Databricks (Delta), Iceberg on Snowflake/AWS/…, Microsoft Fabric (OneLake, Delta) |

¹ The lines are blurring. Snowflake and BigQuery read and write Iceberg tables; Databricks offers a full SQL warehouse. **Today the question is less "which category?" than "which platform, operating model and format fit our workloads and skills?"**

**Open table formats** (Delta Lake, Apache Iceberg, Apache Hudi) add a transaction log on top of Parquet files:

- **ACID transactions:** readers never see half-written data.
- **Schema enforcement and evolution:** reject bad writes; add columns safely.
- **Time travel:** query a table as of a past version, useful for reproducibility and audits. *Note: time travel is limited by retention and vacuum settings. It is not a GxP archive.*
- **Interoperability:** several engines can read the same tables. This reduces lock-in (Iceberg in particular has broad multi-vendor support).

**Separation of storage and compute** is the key cloud economics point: storage is cheap and always on; compute is expensive and should scale to zero when idle.`,
    },
    {
      kind: "text",
      title: "Medallion architecture",
      body: `A common way to organize a lakehouse (and many warehouses):

| Layer | Content | Purpose |
|---|---|---|
| **Bronze** (raw) | Data as received, append-only, with ingestion metadata | Reprocessing, audit trail, debugging |
| **Silver** (cleaned/conformed) | Deduplicated, typed, validated, joined to master data | A reliable base for many uses |
| **Gold** (business) | Facts, dimensions, aggregates, metrics, data products | Dashboards, analytics, ML features |

It's a convention, not a law. What matters is that each layer has a clear contract, owner and quality bar.`,
    },
    {
      kind: "text",
      title: "The vendor landscape, and how to choose",
      body: `| Platform | Positioning | Often chosen when |
|---|---|---|
| **Databricks** | Lakehouse, Spark-native, strong for data engineering + ML/AI, Unity Catalog | Heavy engineering/ML workloads, multi-cloud, open formats |
| **Snowflake** | SQL-first cloud warehouse, simple to operate, strong data sharing | BI/SQL-heavy workloads, analysts and analytics engineers in the lead |
| **Microsoft Fabric** | SaaS analytics suite on OneLake (Delta), integrated with Power BI | Microsoft/Azure-centric companies with Power BI everywhere |
| **Google BigQuery** | Serverless warehouse | GCP-centric companies |
| **AWS native** (S3, Glue, Athena, Redshift, EMR) | Building blocks | AWS-centric, strong in-house platform team |
| **Palantir Foundry** | Integrated data + operations platform with strong lineage | Seen in several large pharma/life-science operations; high cost, strong lock-in |

**Selection criteria to name in an interview:**

1. **Workloads:** BI/SQL vs data engineering vs ML/GenAI, batch vs streaming
2. **Skills:** what the team (and hiring market) knows, SQL-first vs code-first
3. **Existing ecosystem:** cloud provider, identity (Entra ID), BI tool, SAP integration
4. **Governance and compliance:** fine-grained access, lineage, audit logs, support for GxP qualification (supplier assessment, documentation)
5. **Cost model and predictability:** credits/DBUs vs capacity, and the FinOps tooling available
6. **Openness and lock-in:** open formats, exit strategy
7. **Data residency:** Swiss/EU regions, cross-border transfer constraints

> **Interview stance:** "I've no religion on platforms. I'd score options against workloads, skills, ecosystem, compliance and total cost, run a proof of concept on two real use cases, and keep data in open formats to preserve options."`,
    },
    {
      kind: "text",
      title: "Data Mesh: operating model, not technology",
      body: `Data Mesh (Zhamak Dehghani) has four principles:

1. **Domain ownership:** the business domain that produces data (e.g., Manufacturing, Quality, Clinical) owns it analytically too.
2. **Data as a product:** datasets have owners, users, documentation, SLOs and versioning.
3. **Self-serve data platform:** a central platform team makes it easy for domains to build and run data products.
4. **Federated computational governance:** global rules (security, interoperability, quality) set together and enforced automatically.

**Known failure modes:**

- Domains have no data engineering skills or budget, so products are abandoned.
- The 'self-serve' platform isn't self-serve, so the central team becomes a bottleneck anyway.
- Governance is too weak, so incompatible definitions and duplication follow.
- "Mesh" becomes a relabel for a reorganization without changing incentives.

**What most companies actually do:** a **hybrid**. A central platform team provides infrastructure, standards and shared data (master data, core dimensions); domain-aligned teams (central or embedded) build data products for their area. Decentralize where domains are mature and data-intensive.`,
    },
    {
      kind: "text",
      title: "Pharma specifics: GxP zoning and qualification",
      body: `- **GxP and non-GxP zones.** Many companies separate a qualified/validated area (controlled changes, restricted access, audit trails, validated pipelines) from a non-GxP area (fast, exploratory). Data can flow from the GxP zone to non-GxP; the reverse needs controls.
- **Platform qualification.** The cloud platform and its configuration are **qualified** (supplier assessment, documented configuration, infrastructure qualification). Individual GxP pipelines and reports are then **validated** for their intended use.
- **Reproducibility.** Being able to show what data a report used at the time: versioned code, table versions or snapshots, and retained raw data.
- **Retention.** GMP records have long retention periods (often beyond product expiry). Plan archival explicitly; don't rely on time travel.
- **Residency and privacy.** Patient-related data and some HR data may need Swiss/EU hosting and controlled cross-border transfer (Module 6).`,
    },
    {
      kind: "scenario",
      id: "m4-scn",
      title: "Choosing a target architecture",
      context:
        "A Swiss pharma company has a 10-year-old on-premises SQL warehouse for manufacturing and quality reporting, plus scattered data science notebooks on laptops. Leadership wants a modern platform supporting **BI, process analytics on historian data, and ML/GenAI**. The company is Microsoft-centric (Azure, Entra ID, Power BI). Part of the data is GxP.",
      steps: [
        {
          prompt: "What do you recommend as the overall direction?",
          options: [
            {
              text: "A lakehouse on Azure (e.g., Databricks or Fabric) with open table formats, a medallion structure and separate GxP / non-GxP zones",
              score: 2,
              feedback:
                "Fits the mix of BI, large time-series data and ML; open formats preserve options; zoning addresses GxP. The specific vendor comes after a scored evaluation and proof of concept.",
            },
            {
              text: "Keep the on-prem warehouse and add a separate data lake for data science",
              score: 1,
              feedback: "Lower risk short-term, but two copies, two governance models and continued limits on scale. It could be a transition state, not a target.",
            },
            {
              text: "Data Mesh across all departments from day one",
              score: 0,
              feedback: "Domains aren't ready, there's no self-serve platform yet, and GxP governance needs strong central standards first.",
            },
          ],
        },
        {
          prompt: "How do you decide between two candidate platforms?",
          options: [
            {
              text: "Pick the one the most senior engineer prefers",
              score: 0,
              feedback: "Preference isn't a decision record, and it won't survive a challenge from IT, Quality or Procurement.",
            },
            {
              text: "Weighted criteria (workloads, skills, ecosystem fit, governance/GxP support, TCO, lock-in, residency) plus a time-boxed proof of concept on two real use cases, documented in an architecture decision record",
              score: 2,
              feedback: "Transparent, evidence-based and defensible, and the ADR documents the rationale for future audits and newcomers.",
            },
            {
              text: "Choose the cheapest license",
              score: 0,
              feedback: "License price is a fraction of TCO. Skills, migration and operating costs often dominate.",
            },
          ],
        },
        {
          prompt: "How do you approach the migration from the old warehouse?",
          options: [
            {
              text: "Big bang: migrate everything over one weekend",
              score: 0,
              feedback: "Huge risk, especially with validated GxP reports that need re-verification.",
            },
            {
              text: "Incremental: start with a high-value non-GxP use case to prove the platform, then migrate domain by domain, running old and new in parallel with reconciliation; validated reports migrate under change control",
              score: 2,
              feedback: "This delivers value early, limits risk, and handles GxP properly. Parallel run plus reconciliation is your verification evidence.",
            },
            {
              text: "Rebuild every report from scratch with new requirements",
              score: 1,
              feedback: "An opportunity to clean up, but scope explodes. Retire unused reports, but don't redesign everything at once.",
            },
          ],
        },
      ],
    },
    {
      kind: "check",
      id: "m4-check",
      questions: [
        {
          id: "m4c1",
          prompt: "Why is a plain data lake at risk of becoming a 'data swamp'?",
          options: [
            "Object storage is unreliable",
            "Without transactions, schemas, ownership and a catalog, nobody knows what data is there, whether it's correct, or who owns it",
            "Lakes can't store structured data",
            "Lakes are too expensive",
          ],
          answer: 1,
          explanation: "The swamp is a governance failure as much as a technical one. Table formats, catalogs and ownership address it.",
        },
        {
          id: "m4c2",
          prompt: "Why do open table formats reduce vendor lock-in?",
          options: [
            "They are free",
            "They encrypt data",
            "Data stays in open files and metadata that several engines can read, so you can change or combine compute engines",
            "They only work on-premises",
          ],
          answer: 2,
          explanation: "Lock-in moves from the data to the tooling around it. Openness gives you options and negotiating power.",
        },
        {
          id: "m4c3",
          prompt: "Which is a realistic prerequisite for Data Mesh to work?",
          options: [
            "Domains with data skills and accountability, plus a genuinely self-serve platform",
            "A single central team doing all the work",
            "Buying a mesh product",
            "No governance at all",
          ],
          answer: 0,
          explanation: "Without domain capability and a strong platform, mesh recreates silos or a bottleneck.",
        },
      ],
    },
    {
      kind: "lead",
      body: `**Decisions a lead owns here:**

- The **target architecture** and its **transition path**, documented in architecture decision records (ADRs)
- **Platform selection** criteria and the proof-of-concept design, together with IT, Security, Quality/CSV and Procurement
- **Zoning and environments** (GxP / non-GxP, dev / test / prod) and promotion rules
- **Standardization:** one main platform and a limited toolset, versus every team picking its own

**What interviewers listen for:** "it depends" *followed by the factors it depends on*, an incremental migration with parallel run, and awareness of GxP qualification and lock-in. Avoid announcing a vendor before understanding the context, which is a classic red flag.`,
    },
    {
      kind: "open",
      id: "m4-open",
      prompt:
        "\"What is the difference between a data warehouse, a data lake and a lakehouse, and what would you recommend for us?\" (Assume a pharma company with heavy BI needs and growing ML ambitions.)",
      rubric: [
        "Correct distinction: warehouse (structured, managed, SQL performance), lake (cheap, any format, swamp risk), lakehouse (open table formats with ACID on object storage)",
        "Mentions that the categories are converging (Snowflake/BigQuery with Iceberg, Databricks SQL)",
        "Recommendation based on explicit criteria (workloads, skills, ecosystem, governance/GxP, cost, lock-in)",
        "Addresses GxP: zoning, qualification/validation, reproducibility",
        "Proposes an incremental path / PoC, not a big bang",
      ],
      redFlags: ["Naming a vendor before asking about the context", "'Lakes are outdated' or other absolute statements", "Ignoring the existing estate and skills"],
      modelAnswer: `**Distinction:** a **warehouse** stores structured, modeled data in a managed engine; it is excellent for SQL and BI, less suited to raw or unstructured data and ML. A **lake** stores any data cheaply as files in object storage; it is flexible but, without transactions and governance, risks becoming a swamp. A **lakehouse** adds an open table format (Delta, Iceberg) on top of the lake, so you get ACID tables, schema control and time travel on open files, serving BI and ML from one copy. The categories are converging: warehouses read Iceberg, and lakehouses offer SQL warehouses.

**Recommendation:** I'd first look at workloads, skills, the existing ecosystem and GxP needs. With heavy BI plus growing ML, large historian data and documents for GenAI, I'd lean towards a **lakehouse-style platform with open formats**, with the specific vendor chosen through weighted criteria and a PoC on two real use cases. I'd structure it in medallion layers, with **separate GxP and non-GxP zones**, a qualified platform and validated GxP pipelines.

**Path:** start with a high-value non-GxP use case, then migrate domain by domain with parallel runs and reconciliation; validated reports move under change control.`,
    },
  ],
};
