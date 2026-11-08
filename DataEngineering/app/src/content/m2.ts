import type { Module } from "../types";

export const m2: Module = {
  id: "m2",
  number: 2,
  title: "Storage & data modeling",
  minutes: 25,
  summary: "OLTP vs OLAP, file formats, partitioning, dimensional models, and one definition per KPI.",
  objectives: [
    "Explain why analytical systems store data differently from applications",
    "Discuss columnar formats, partitioning and why cost depends on data scanned",
    "Read a simple analytical SQL query and say what it does",
    "Define grain, facts, dimensions and SCD Type 2 with a pharma example",
    "Explain why a semantic layer and KPI ownership prevent 'two versions of the truth'",
  ],
  sections: [
    {
      kind: "text",
      title: "OLTP vs OLAP",
      body: `Your applications ran on **OLTP** databases. Analytics runs on **OLAP** systems, and the design goals are opposite.

| | OLTP (operational) | OLAP (analytical) |
|---|---|---|
| Typical system | PostgreSQL behind an app, SAP's database, MES | Snowflake, Databricks SQL, BigQuery, Synapse/Fabric |
| Workload | Many small reads/writes of single records | Few large queries scanning millions of rows |
| Modeling | Normalized (3NF), avoid redundancy | Denormalized (star schemas), optimized for reading |
| Storage | Row-oriented | Column-oriented |
| Priority | Transactional consistency, low latency | Scan throughput, aggregation, history |

**Why not query the source system directly?** It would load production systems such as MES or LIMS, history is often overwritten, data from several systems can't be joined, and you can't control quality. That's why data is copied into an analytical platform.`,
    },
    {
      kind: "text",
      title: "Formats and physical layout: where performance and cost come from",
      body: `**Row vs columnar.** CSV and JSON store row by row. **Parquet** (and ORC) store column by column, with compression and min/max statistics per block. A query like "average yield per site in 2025" reads only 3 columns and skips blocks outside 2025. That means 10–100× less data read.

**Avro** is row-based with an embedded schema. It is common for events in Kafka.

**Partitioning** splits a table into folders by a column, usually a date (e.g., production_date=2025-06-01). Queries filtering on that column skip all other partitions (**partition pruning**). Choose a partition column that queries actually filter on, with neither too many nor too few partitions.

**Clustering / Z-ordering / sort keys** co-locate similar values inside files, so more blocks can be skipped on other columns (e.g., product or site).

**The small-files problem.** Thousands of tiny files (typical with streaming or frequent small loads) make queries slow. Platforms need periodic **compaction**.

> **Lead's takeaway:** in cloud warehouses, **cost ≈ data scanned × compute time**. Layout decisions (format, partitioning, clustering) are cost decisions. When a report is slow *and* expensive, layout is the first suspect.`,
    },
    {
      kind: "text",
      title: "Reading SQL (you won't write it)",
      body: `You should be able to read a query in a design review. Example: average yield per site and month, plus a ranking of sites within each month.

\`\`\`sql
WITH monthly AS (
  SELECT
    s.site_name,
    DATE_TRUNC('month', b.production_date) AS month,
    AVG(b.yield_pct)                       AS avg_yield,
    COUNT(*)                               AS batches
  FROM fact_batch b
  JOIN dim_site s ON s.site_key = b.site_key
  WHERE b.production_date >= DATE '2025-01-01'   -- enables partition pruning
  GROUP BY s.site_name, DATE_TRUNC('month', b.production_date)
)
SELECT *,
       RANK() OVER (PARTITION BY month ORDER BY avg_yield DESC) AS site_rank
FROM monthly;
\`\`\`

- **WITH … AS** (a CTE) names an intermediate result, like a local variable.
- **JOIN** links the fact table to a dimension through a surrogate key.
- **GROUP BY** aggregates: one row per site and month.
- **RANK() OVER (PARTITION BY …)** is a **window function**: it computes a ranking *within* each month without collapsing rows.

**What makes queries slow:** scanning without a filter on the partition column, joins that multiply rows (wrong grain, duplicate keys), joining huge tables without filtering first, and **SELECT \\*** on wide tables. Engines show an **execution plan**. Engineers read it to find full scans and expensive shuffles (data moved between machines).`,
    },
    {
      kind: "text",
      title: "Dimensional modeling",
      body: `The classic analytical model (Kimball) separates:

- **Facts:** measurable events at a declared **grain**, e.g., *one row per manufactured batch* with yield, cycle time and number of deviations.
- **Dimensions:** the context you slice by, e.g., product, site, date, equipment, material.

Together they form a **star schema**: one fact table in the middle, dimensions around it. Snowflake schemas normalize dimensions further; this is less common today because storage is cheap and joins cost time.

**Grain first.** "One row per batch" and "one row per batch per QC test" are different tables. Mixing them causes double-counting, which is the most common source of wrong KPIs.

**History in dimensions (Slowly Changing Dimensions):**

| Type | Behavior | Example |
|---|---|---|
| SCD 1 | Overwrite the old value | Correcting a typo in a product name |
| SCD 2 | Add a new row with valid-from / valid-to | A product moves to another site, or its classification changes; old batches must still report the old value |

**Conformed dimensions** (one shared product dimension, one shared site dimension) are what let you combine manufacturing, quality and supply chain data. They usually depend on **master data** (Module 6).

**Other models you'll hear about:** Data Vault (auditable and flexible, more complex, used in some regulated companies) and wide denormalized tables ("one big table") for specific use cases.`,
    },
    {
      kind: "text",
      title: "Layers and the semantic layer: one definition per KPI",
      body: `Most platforms organize transformations in layers: **raw → cleaned/conformed → business-ready** (the medallion architecture, Module 4). The business-ready layer is where facts, dimensions and metrics live.

**The 'two dashboards, two numbers' problem.** If every dashboard computes "right-first-time rate" its own way (different exclusion rules, different date fields), leadership gets conflicting numbers and stops trusting data.

The fix is organizational *and* technical:

1. A **business owner** for each critical KPI (e.g., Head of Quality Operations for right-first-time), who signs off the definition.
2. The definition is implemented **once**, in a governed model or a **semantic/metrics layer** (dbt Semantic Layer, Power BI semantic models, Databricks metric views, AtScale, Cube).
3. Dashboards consume that definition instead of re-implementing it.
4. The definition is documented in the catalog with its lineage.`,
    },
    {
      kind: "scenario",
      id: "m2-scn",
      title: "Modeling batch performance for Quality Operations",
      context:
        "A Head of Quality Operations at a Swiss manufacturing site wants a dashboard of **batch yield and deviations by product, site and month**, with the ability to drill into individual batches. Data comes from MES (batches), LIMS (QC results) and QMS (deviations).",
      steps: [
        {
          prompt: "What grain do you propose for the central fact table?",
          options: [
            {
              text: "One row per batch",
              score: 2,
              feedback:
                "It matches the drill-down need, and monthly/site/product views are simple aggregations. QC results and deviations can live in their own fact tables at their own grain, linked by batch.",
            },
            {
              text: "One row per product, site and month",
              score: 1,
              feedback:
                "Fine for the summary view, but it loses the drill-down to individual batches. Build it as an aggregate *on top of* a batch-level fact, not as the base.",
            },
            {
              text: "One row per sensor reading from the historian",
              score: 0,
              feedback:
                "Far too fine for this need: billions of rows, and the yield and deviation questions are asked per batch. Sensor data belongs in a separate time-series model.",
            },
          ],
        },
        {
          prompt:
            "Products are sometimes reassigned to another site or packaging line. Reports for past batches must show the assignment that was valid at the time. How do you handle this in the product dimension?",
          options: [
            {
              text: "Overwrite the old value (SCD Type 1)",
              score: 0,
              feedback: "Past batches would suddenly appear under the new assignment, and historical reports would change silently.",
            },
            {
              text: "Keep versions with valid-from/valid-to dates (SCD Type 2)",
              score: 2,
              feedback: "This is exactly the 'as it was at the time' requirement. Each batch links to the product version valid on its production date.",
            },
            {
              text: "Ask users to export monthly snapshots to Excel",
              score: 0,
              feedback: "This creates uncontrolled copies, so no single truth, and in a GxP context it's a data integrity problem.",
            },
          ],
        },
        {
          prompt: "The dashboard is slow and expensive: each refresh scans 4 years of data although users mostly look at the last 12 months. First action?",
          options: [
            {
              text: "Buy a bigger compute cluster",
              score: 0,
              feedback: "It makes the symptom faster and the bill bigger. The problem is how much data is read.",
            },
            {
              text: "Check the layout: partition or cluster by production date, make sure dashboard filters use it, and pre-aggregate the monthly view",
              score: 2,
              feedback: "Pruning plus a small aggregate table typically cuts scan volume and cost by an order of magnitude.",
            },
            {
              text: "Delete data older than 12 months",
              score: 0,
              feedback: "GMP records have retention obligations. You'd also lose the trend analysis. Archive to cheaper storage if needed, but don't delete.",
            },
          ],
        },
      ],
    },
    {
      kind: "check",
      id: "m2-check",
      questions: [
        {
          id: "m2c1",
          prompt: "A fact table joins QC test results (several per batch) with batch yield (one per batch). Total yield suddenly looks 5× too high. Most likely cause?",
          options: [
            "The warehouse has a bug",
            "A grain mismatch: each batch's yield is repeated once per QC test row",
            "Partitioning is wrong",
            "The data is not compressed",
          ],
          answer: 1,
          explanation:
            "Joining a one-per-batch measure to a many-per-batch table multiplies rows. This is the classic double-counting bug. The fix is to keep facts at their own grain.",
        },
        {
          id: "m2c2",
          prompt: "Why do analytical tables usually use a star schema rather than the normalized model of the source application?",
          options: [
            "Star schemas use less storage",
            "Regulators require it",
            "Fewer joins and simpler, faster queries for analysis; storage redundancy is cheap",
            "Normalized models cannot store history",
          ],
          answer: 2,
          explanation:
            "Denormalization trades some redundancy for read simplicity and speed, which is the right trade for analytics.",
        },
        {
          id: "m2c3",
          prompt: "Who should own the business definition of a KPI such as 'right-first-time rate'?",
          options: [
            "The data engineer who implements it",
            "Each dashboard author",
            "The BI tool vendor",
            "A named business owner (e.g., Quality Operations), with the data team implementing it once in a governed layer",
          ],
          answer: 3,
          explanation: "The business owns the meaning, and the data team owns a single, tested implementation that everyone reuses.",
        },
      ],
    },
    {
      kind: "lead",
      body: `**Decisions a lead owns here:**

- **Modeling standards:** layer conventions, naming, mandatory grain declaration and documentation, and when to use SCD 2.
- **KPI governance:** which KPIs are 'certified', who owns them, and where they are implemented (the semantic layer).
- **Performance and cost guardrails:** partitioning conventions, and reviews of the most expensive queries.

**What interviewers listen for:** you ask "what's the grain?", you link performance problems to *data read* rather than 'more hardware', and you treat KPI consistency as a governance problem, not only a technical one.`,
    },
    {
      kind: "open",
      id: "m2-open",
      prompt:
        "\"Two dashboards show different values for the same quality KPI, and the site head is upset. How do you handle it, now and structurally?\"",
      rubric: [
        "Immediate: investigates the difference (definitions, filters, date fields, grain/double counting, refresh timing) and communicates transparently",
        "Identifies a business owner who decides the official definition",
        "Implements the definition once in a governed layer / semantic layer that dashboards reuse",
        "Adds tests or reconciliation checks so divergence is detected",
        "Documents the definition and lineage in a catalog, and certifies or deprecates dashboards",
      ],
      redFlags: ["Picking one number arbitrarily without the business owner", "Blaming the BI team or the users", "Proposing a new tool as the whole answer"],
      modelAnswer: `**Now:** I'd acknowledge it to the site head, then have the team compare both calculations side by side: definition, exclusions, which date field is used, refresh time, and whether a join is double counting. Usually the difference is one of these. I'd explain the cause in business terms and, until it's fixed, say which number to use, *with* the KPI owner's agreement.

**Structurally:**

1. Name a **business owner** for each critical KPI, who signs off one definition.
2. Implement it **once** in the governed business layer or semantic layer, and make dashboards consume it rather than re-calculating.
3. Add **tests and reconciliation** (e.g., the KPI recomputed from the source within tolerance).
4. **Document** it in the catalog with lineage, mark certified dashboards, and retire duplicates.

In a GxP context, if the KPI feeds quality decisions, the definition change goes through change control.`,
    },
  ],
};
