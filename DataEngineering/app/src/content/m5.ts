import type { Module } from "../types";

export const m5: Module = {
  id: "m5",
  number: 5,
  title: "DataOps & reliability",
  minutes: 25,
  summary: "Data tests, observability, data contracts, SLOs, CI/CD for data and data incidents.",
  objectives: [
    "Map your SRE/DevOps experience onto data reliability",
    "Explain what to test in data, where, and what should block publication",
    "Describe a data contract and how it is enforced",
    "Write a data SLO and tier data products by criticality",
    "Lead a data incident from detection to postmortem",
  ],
  sections: [
    {
      kind: "bridge",
      title: "This is your home turf: SRE practices applied to data",
      rows: [
        { know: "**Unit and integration tests** on code", data: "Plus **tests on the data**: schema, nulls, uniqueness, accepted values, referential integrity, volume, freshness, business rules." },
        { know: "**Monitoring and alerting** (latency, errors, saturation)", data: "Plus **data observability**: did data arrive on time, in normal volume, with the expected schema and plausible values?" },
        { know: "**API contracts and versioning**", data: "**Data contracts** between source system teams (producers) and the data platform (consumers)." },
        { know: "**SLOs and error budgets** on availability", data: "**Data SLOs** on freshness, completeness and accuracy, per data product tier." },
        { know: "**CI/CD with staging environments**", data: "**CI/CD for data**: test transformations on realistic data (zero-copy clones), slim CI on changed models, write-audit-publish." },
        { know: "**Incident management and blameless postmortems**", data: "The same, plus **impact on consumers who already used the wrong data**, and backfill." },
      ],
    },
    {
      kind: "text",
      title: "Testing data: what, where, and what blocks",
      body: `**What to test:**

| Category | Examples |
|---|---|
| Schema | Expected columns and types are present |
| Integrity | Primary key unique and not null; foreign keys exist in dimensions |
| Validity | Values in accepted sets/ranges (yield between 0 and 110%, status in {released, rejected, quarantined}) |
| Volume | Row count within the expected range vs history |
| Freshness | Latest record not older than X hours |
| Business rules | A released batch has all mandatory QC results; sum of lines = header total |
| Reconciliation | Counts/totals match the source system |

**Where:** at **ingestion** (reject malformed input early), after **transformation** (logic errors), and **before publishing** (last gate for consumers).

**Severity:** not every failed test should stop the line. Define **blocking** tests (critical data products, GxP: don't publish, alert) vs **warning** tests (log, notify the owner). This 'circuit breaker' is what prevents a wrong dashboard from going out.

**Tools:** dbt tests, Great Expectations, Soda, platform-native expectations (e.g., Databricks DLT expectations).`,
    },
    {
      kind: "text",
      title: "Data observability",
      body: `Job monitoring answers *did the task run?* Data observability answers *is the data healthy?* It usually covers five areas:

1. **Freshness:** is the data up to date?
2. **Volume:** are row counts normal?
3. **Schema:** did columns or types change?
4. **Distribution:** are values plausible (null rate, averages, categories)?
5. **Lineage:** what's upstream and downstream, so you can find the cause and the impact?

Tools such as Monte Carlo, Bigeye, Elementary, Soda or platform features learn normal patterns and alert on anomalies. The key leadership point: **you want to detect problems before your consumers do.** Every incident first reported by a business user is a trust hit.`,
    },
    {
      kind: "text",
      title: "Data contracts",
      body: `A data contract is an agreed, versioned specification for a dataset exchanged between a **producer** (e.g., the LIMS team or a SaaS QMS) and **consumers** (the data platform and its users). It typically includes:

- **Schema:** fields, types, keys
- **Semantics:** what each field means, units, allowed values
- **Quality expectations:** completeness, uniqueness, validity rules
- **Service levels:** delivery time, frequency, availability
- **Ownership and support:** who to contact, escalation
- **Change process:** how breaking changes are announced, versioned and migrated (deprecation period)

**Enforcement:** ideally checked automatically **in the producer's CI** (a schema change that breaks the contract fails their build) and at ingestion. Open standards exist (e.g., the Open Data Contract Standard, ODCS).

**Why it matters for a lead:** most data incidents start upstream. Contracts turn "the data team discovers a change in production" into "the change is negotiated before it ships". It's as much a relationship tool with application teams as a technical artifact, and your software background is a credible asset here.`,
    },
    {
      kind: "text",
      title: "SLOs and tiering",
      body: `**Well-formed data SLOs** are specific, measurable and tied to consumer needs:

- *Freshness:* "The batch-release dataset is updated by 06:00 CET on 99% of business days."
- *Completeness:* "≥ 99.5% of QC results from LIMS are present within 2 hours of approval."
- *Accuracy:* "Reconciliation with MES batch counts within 0.1% daily."

**Tier your data products.** Not everything deserves the same rigor:

| Tier | Example | Expectations |
|---|---|---|
| 1 — critical / GxP | Batch-release support, PV reporting | Blocking tests, SLOs, on-call, validated, change-controlled |
| 2 — important | Supply chain dashboards, management KPIs | Tests, monitoring, business-hours support |
| 3 — exploratory | Ad-hoc analysis, sandboxes | Best effort |

Tiering lets you concentrate effort and cost where the business impact is.`,
    },
    {
      kind: "text",
      title: "CI/CD for data",
      body: `- **Everything in version control:** SQL/dbt models, pipeline code, orchestration, infrastructure (Terraform), tests, data contracts.
- **Pull requests with review** and automated tests.
- **Realistic test environments:** zero-copy clones or sampled/masked production data, because logic bugs only appear on real data distributions.
- **Slim CI:** build and test only changed models and their dependents.
- **Write-Audit-Publish (WAP):** write to a staging location, run checks, then swap/publish. This is blue/green for data.
- **Schema migrations:** additive changes first, deprecate before removing, and coordinate with consumers.

In GxP zones, automated test results and PR history can become **validation evidence**, which is a strong argument for investing in automation (Module 6).`,
    },
    {
      kind: "scenario",
      id: "m5-scn",
      title: "Wrong figures on a quality dashboard for three days",
      context:
        "On Thursday, a QA manager notices that the **deviation trend dashboard** shows 40% fewer open deviations since Monday. Investigation shows that the QMS vendor released an update on Monday that **renamed a status field**. Records with the new status value are filtered out by the transformation. The dashboard is used in the weekly quality review and in management reporting.",
      steps: [
        {
          prompt: "First hour: what do you do?",
          options: [
            {
              text: "Fix the transformation quickly and say nothing, since the numbers will be right tomorrow",
              score: 0,
              feedback: "People already made decisions and reports on wrong data. Hiding it destroys trust when it comes out, and in GxP it's a data integrity concern.",
            },
            {
              text: "Open an incident, assess impact (which reports, periods and decisions), notify QA and report consumers with a clear 'do not use' message and an ETA, then fix",
              score: 2,
              feedback: "Transparency and containment first. Consumers need to know what was affected and whether past decisions need review.",
            },
            {
              text: "Ask the QMS vendor to roll back their update",
              score: 1,
              feedback: "It may be part of the solution, but it doesn't inform the people using wrong data now, and you can't rely on it.",
            },
          ],
        },
        {
          prompt: "Root cause analysis: what is the real root cause?",
          options: [
            {
              text: "The vendor renamed a field",
              score: 1,
              feedback: "That's the trigger. Vendors and source systems *will* change things. The question is why it went undetected for three days.",
            },
            {
              text: "No contract or change notification with the source, and no checks on accepted values or volume anomalies, so a silent failure passed",
              score: 2,
              feedback: "This addresses both prevention (contract and change process) and detection (tests and observability).",
            },
            {
              text: "The engineer who wrote the filter made a mistake",
              score: 0,
              feedback: "Blaming individuals hides the system gap and kills openness in future incidents. Postmortems are blameless.",
            },
          ],
        },
        {
          prompt: "Which preventive actions go into the postmortem?",
          options: [
            {
              text: "An accepted-values test on status (blocking for this tier-1 product), a volume anomaly monitor, a data contract and release-note review with the QMS owner, and a lineage-based impact list for fast communication",
              score: 2,
              feedback: "Detection, prevention and faster response, each with an owner and a date.",
            },
            {
              text: "A manual weekly review of the dashboard by QA",
              score: 0,
              feedback: "This puts the burden on consumers and doesn't scale.",
            },
            {
              text: "Retrain the team on SQL",
              score: 0,
              feedback: "The SQL was correct for the old data. The gap is in contracts and monitoring.",
            },
          ],
        },
      ],
    },
    {
      kind: "check",
      id: "m5-check",
      questions: [
        {
          id: "m5c1",
          prompt: "Which test should usually *block* publication of a tier-1 dataset?",
          options: [
            "A slight change in the average of a non-critical column",
            "Duplicate primary keys in the batch table",
            "A new optional column appearing",
            "The job taking 10% longer than usual",
          ],
          answer: 1,
          explanation: "Duplicate keys break joins and inflate counts, so downstream numbers will be wrong. The others are warnings at most.",
        },
        {
          id: "m5c2",
          prompt: "Where is a data contract most effectively enforced?",
          options: [
            "In a PDF signed once a year",
            "Only in the BI tool",
            "Automatically, in the producer's CI and at ingestion, plus an agreed change process",
            "By the data steward reviewing data monthly",
          ],
          answer: 2,
          explanation: "Automated checks catch breaking changes before they ship; the process handles intentional evolution.",
        },
        {
          id: "m5c3",
          prompt: "What does Write-Audit-Publish (WAP) achieve?",
          options: [
            "Consumers only see a new version of the data after it has passed checks",
            "It speeds up writes",
            "It removes the need for tests",
            "It replaces orchestration",
          ],
          answer: 0,
          explanation: "It's the data equivalent of a blue/green deployment with automated verification.",
        },
      ],
    },
    {
      kind: "lead",
      body: `**Decisions a lead owns here:**

- **Tiering** of data products and the reliability standard per tier
- **SLOs** agreed with consumers, and the on-call model (often business hours for tier 2, extended for tier 1)
- **Data contracts** with key source system owners, as a governance and relationship initiative
- **Incident process:** severity levels, communication templates, blameless postmortems and follow-up of actions
- **Investment in automation** (tests, CI, observability), justified by fewer incidents and cheaper validation

**What interviewers listen for:** "we should detect it before the business does", tiering, contracts with source teams, and transparent communication in incidents. This is where you can tell your strongest stories from software.`,
    },
    {
      kind: "open",
      id: "m5-open",
      prompt: "\"How do you ensure data quality in a platform fed by dozens of source systems?\"",
      rubric: [
        "Quality defined per data product and use (dimensions, thresholds) with business owners",
        "Checks at several stages (ingestion, transformation, before publishing), with blocking vs warning severity",
        "Data observability (freshness, volume, schema, distribution) to detect silent failures",
        "Prevention upstream: data contracts and change processes with source system owners",
        "Ownership and process: tiering, SLOs, incident management, quality metrics tracked over time",
      ],
      redFlags: ["Quality as a one-time cleanup project", "Only a check at the end of the pipeline", "Data team alone responsible for business definitions"],
      modelAnswer: `Quality can't be inspected in at the end; it has to be designed into the whole flow.

1. **Define it per use:** with the business owner of each critical data product, agree what 'good enough' means (completeness, validity, timeliness…) and the thresholds. Tier products by criticality.
2. **Check at every stage:** schema and validity at ingestion, logic and integrity after transformation, business rules and reconciliation before publishing. Critical checks **block publication**; others warn.
3. **Observe:** monitor freshness, volume, schema and distributions to catch silent failures. The goal is to detect issues before consumers do.
4. **Prevent upstream:** data contracts with source system owners, covering schema, semantics and change notification, enforced automatically where possible.
5. **Run it like operations:** SLOs, incident management, blameless postmortems, and quality metrics reported monthly.

For example, if transaction volume from a site drops 40% overnight, the anomaly monitor blocks the dashboard refresh and alerts the owner, instead of publishing a misleading KPI.`,
    },
  ],
};
