import type { Module } from "../types";

export const m3: Module = {
  id: "m3",
  number: 3,
  title: "Pipelines & integration",
  minutes: 25,
  summary: "Ingestion patterns, batch vs streaming, orchestration, idempotency, late data and backfills.",
  objectives: [
    "Compare ETL and ELT and the main ingestion patterns (full, incremental, CDC, events)",
    "Judge when streaming is really needed",
    "Explain orchestration, retries, idempotency and delivery guarantees",
    "Plan recovery after an outage and a backfill",
  ],
  sections: [
    {
      kind: "text",
      title: "Getting data in: ETL, ELT and ingestion patterns",
      body: `**ETL** (Extract → Transform → Load) transforms before loading into the target. **ELT** (Extract → Load → Transform) loads raw data first, then transforms inside the platform with SQL/dbt or Spark. ELT dominates today because cloud platforms have elastic compute and keeping raw data allows reprocessing.

ETL-style transformation before loading still makes sense when data must be **filtered, masked or pseudonymized before it lands**, e.g., patient identifiers from clinical systems, or when the target can't transform at scale. The two coexist.

**Ingestion patterns:**

| Pattern | How | When | Watch out |
|---|---|---|---|
| **Full load** | Copy the whole table each time | Small reference tables | Costly at scale, no deletes history |
| **Incremental (watermark)** | Load rows with updated_at > last run | Tables with a reliable timestamp | Misses deletes, and depends on the timestamp being trustworthy |
| **CDC (log-based)** | Read the database change log (Debezium, cloud CDC tools, SAP SLT/ODP for SAP) | Core operational databases | Operational complexity, schema changes |
| **Events / streaming** | Producers publish to Kafka / Event Hubs / Kinesis | Real-time needs, event-driven apps | Ordering, duplicates, schema governance |
| **Files** | SFTP/object storage drops (CSV, XML, instrument exports) | Partners, lab instruments, legacy | Late, partial or malformed files |
| **APIs** | Pull from SaaS/REST APIs | SaaS tools (CRM, QMS in the cloud) | Rate limits, pagination, API changes |

**Build vs buy for connectors:** managed connectors (Fivetran, Airbyte, cloud-native services) are usually cheaper than building and maintaining your own for standard SaaS sources. Custom work goes where sources are special (MES, historians, instruments).`,
    },
    {
      kind: "text",
      title: "Batch vs streaming: do you really need real time?",
      body: `| | Batch | Micro-batch | Streaming |
|---|---|---|---|
| Latency | Hours | Minutes | Seconds |
| Complexity / cost | Low | Medium | High |
| Example | Daily QC and yield reporting | Hourly supply chain refresh | Process alarms on equipment sensors |

**Most business needs are batch or micro-batch.** When someone asks for "real time", ask: *what decision changes if the data arrives in 5 seconds instead of 1 hour, and who acts on it?* Streaming adds permanent complexity (state, ordering, replays, 24/7 operations).

**Kafka basics** you should know:

- **Topic:** a named stream of events, split into **partitions** for parallelism.
- **Ordering** is guaranteed only *within* a partition, which is why events for one batch or one device use the same key.
- **Offset:** the position of a consumer in a partition. Consumers commit offsets to resume after failures.
- **Consumer group:** several consumers share the partitions of a topic.
- **Retention:** events are kept for a configured time and can be **replayed**.

**Late and out-of-order events** are normal (network issues, buffering on the shop floor). Streaming engines use **event time** (when it happened) rather than processing time, plus **watermarks** that decide how long to wait for late data.

> **Historical note:** the *Lambda* architecture (separate batch and streaming paths) and *Kappa* (streaming only) are mostly history. Modern engines (Spark Structured Streaming, Flink, Delta Live Tables) unify both on one codebase.`,
    },
    {
      kind: "text",
      title: "Orchestration",
      body: `An orchestrator schedules and coordinates tasks as a **DAG** (directed acyclic graph): *extract LIMS → load → transform → test → publish*. It handles dependencies, schedules or data-aware triggers, retries, alerting and run history.

Common choices: **Apache Airflow** (the most widespread), **Dagster** (asset-centric, good lineage), **Prefect**, and platform-native options (**Databricks Workflows, Azure Data Factory, AWS Step Functions**).

Keep three concerns separate:

- **Transport** (moving data): connectors, CDC, Kafka
- **Transformation** (changing data): SQL/dbt, Spark
- **Orchestration** (deciding when and in what order): Airflow, Dagster…

When business logic hides inside orchestrator scripts, it becomes hard to test and to reuse.`,
    },
    {
      kind: "text",
      title: "Making pipelines safe to retry: idempotency and delivery guarantees",
      body: `Failures *will* happen: the source is down, the network breaks, the job dies at 70%. The question is whether a **rerun** is safe.

**Idempotent** means running twice gives the same result as running once. Typical techniques:

- **Overwrite a partition** (e.g., replace the data for 2025-06-01 entirely) instead of appending.
- **MERGE / upsert** on a business key (batch ID, sample ID) instead of INSERT.
- **Deduplicate** on a unique event ID.
- **Checkpoints** to resume from the last committed position.

**Delivery guarantees:**

| Guarantee | Meaning | Risk |
|---|---|---|
| At-most-once | Each record is delivered 0 or 1 times | Data loss |
| At-least-once | Each record is delivered 1 or more times | Duplicates |
| Exactly-once | Each record has its effect exactly once | Hard end-to-end. In practice: at-least-once + idempotent writes |

**Other resilience tools:** retries with backoff for transient errors; a **dead-letter queue** for records that fail validation (isolate them, don't block everything, alert someone); and **circuit breakers** that stop publishing when quality checks fail.`,
    },
    {
      kind: "text",
      title: "Backfills: the routine operation nobody plans for",
      body: `A **backfill** reprocesses historical periods. Common reasons: a logic bug fix, a new column, a new source, recovery after an outage, or a changed KPI definition.

Planning a backfill:

1. **Scope:** which tables and periods, and all downstream dependents (lineage helps).
2. **Cost and time:** reprocessing three years can be expensive. Estimate it, and run it off-peak.
3. **Order:** upstream first; respect dependencies.
4. **Validation:** compare before/after on control totals, and explain the expected differences.
5. **Communication:** tell consumers which figures will change, when, and why.
6. **GxP:** if the data supports regulated decisions, the reprocessing is a change under **change control**, with a documented rationale, impact assessment and verification evidence.

Pipelines designed to be idempotent and partitioned by date make backfills cheap and safe. That's a strong design argument in reviews.`,
    },
    {
      kind: "scenario",
      id: "m3-scn",
      title: "A six-hour outage in a manufacturing data pipeline",
      context:
        "An hourly pipeline loads electronic batch record events from the MES into the data platform. A network issue stops it for **six hours overnight**. After the automatic restart, the morning dashboards show **some batches twice and some steps missing**. Quality Assurance uses these dashboards for batch review preparation.",
      steps: [
        {
          prompt: "It's 07:30. What do you do first?",
          options: [
            {
              text: "Ask an engineer to rerun everything immediately",
              score: 0,
              feedback: "Rerunning a pipeline that just produced duplicates can make it worse, and QA is still looking at wrong data.",
            },
            {
              text: "Declare an incident: assess which data and periods are affected, warn QA and other consumers not to rely on the affected dashboards, and assign an incident lead",
              score: 2,
              feedback: "Contain first: protect the people making decisions on the data, then fix. Same reflex as in software, plus explicit consumer communication.",
            },
            {
              text: "Wait for the next hourly run to see if it self-corrects",
              score: 0,
              feedback: "Hoping is not a strategy, and QA may act on wrong data meanwhile.",
            },
          ],
        },
        {
          prompt: "Why did duplicates appear after the restart?",
          options: [
            {
              text: "The MES sent duplicates",
              score: 1,
              feedback: "Possible, but the pattern (duplicates *and* gaps right after a restart) points to how the pipeline resumes and writes.",
            },
            {
              text: "The pipeline appends records, and the restart re-read a window it had partly loaded. Missing steps came from a watermark that skipped records arriving late",
              score: 2,
              feedback:
                "Classic: append-only writes plus retries give duplicates, and a time-based watermark plus late events give gaps. Both are design issues, not bad luck.",
            },
            {
              text: "The dashboard tool cached old data",
              score: 0,
              feedback: "A cache doesn't create duplicate rows in the underlying table.",
            },
          ],
        },
        {
          prompt: "How do you recover the data?",
          options: [
            {
              text: "Delete the duplicate rows manually in production with SQL",
              score: 0,
              feedback:
                "Manual, unreviewed changes to production data are risky and, for GxP-relevant data, a data integrity issue (no controlled, documented change).",
            },
            {
              text: "Reprocess the affected hours from the source with an idempotent load (overwrite those partitions or merge on event ID), then reconcile counts with the MES",
              score: 2,
              feedback: "Using the source as truth and a deterministic, repeatable load gives a verifiable result. Reconciliation is your evidence.",
            },
            {
              text: "Append the missing records only",
              score: 1,
              feedback: "This fixes the gaps but leaves the duplicates, and how do you know exactly which records are missing?",
            },
          ],
        },
        {
          prompt: "Which prevention measures do you prioritize?",
          options: [
            {
              text: "Ask QA to double-check dashboards every morning",
              score: 0,
              feedback: "This shifts the burden to consumers and erodes trust. Detection must be built into the platform.",
            },
            {
              text: "Make the load idempotent (merge on event ID), handle late data with a lookback window, add freshness/volume/duplicate checks that block publishing, and write a runbook",
              score: 2,
              feedback: "It fixes the root cause, detects recurrence automatically, and gives on-call a clear procedure.",
            },
            {
              text: "Move to real-time streaming",
              score: 0,
              feedback: "Streaming doesn't fix non-idempotent writes or late data. It makes both harder.",
            },
          ],
        },
      ],
    },
    {
      kind: "check",
      id: "m3-check",
      questions: [
        {
          id: "m3c1",
          prompt: "A watermark-based incremental load (updated_at > last run) has a blind spot. Which one?",
          options: ["It can't load new rows", "It misses deleted rows and rows whose timestamp isn't updated reliably", "It can't run hourly", "It always creates duplicates"],
          answer: 1,
          explanation: "Deletes leave no row to pick up, and some applications don't update timestamps on every change. Log-based CDC addresses both.",
        },
        {
          id: "m3c2",
          prompt: "A business user asks for a 'real-time' dashboard of monthly batch yield. Best response?",
          options: [
            "Build it on Kafka to be future-proof",
            "Refuse; real time is too expensive",
            "Ask which decision depends on the latency, and propose the simplest refresh rate that meets it (probably daily or hourly)",
            "Let the BI tool query the MES directly",
          ],
          answer: 2,
          explanation: "Latency requirements should come from decisions. Monthly yield trends don't need seconds-level freshness.",
        },
        {
          id: "m3c3",
          prompt: "Exactly-once processing is usually achieved in practice by…",
          options: [
            "at-least-once delivery combined with idempotent writes",
            "buying an exactly-once product",
            "turning off retries",
            "running on a single thread",
          ],
          answer: 0,
          explanation: "Guaranteeing exactly-once end-to-end across systems is hard; tolerating duplicates and making writes idempotent achieves the same effect.",
        },
      ],
    },
    {
      kind: "lead",
      body: `**Decisions a lead owns here:**

- **Standard ingestion patterns:** buy managed connectors for SaaS, CDC for core databases, events where truly needed, and a defined approach for files and instruments.
- **One orchestration standard** for the team, and code conventions (idempotent loads, partitioning, testing) as part of the definition of done.
- **Latency tiers** agreed with the business (daily / hourly / near-real-time), each with its cost.
- **On-call and runbooks** for critical pipelines; backfill procedure and change control for GxP data.

**What interviewers listen for:** "I'd make reruns safe by design"; you question real-time requirements; you mention communication to consumers and data reconciliation, not only the technical fix.`,
    },
    {
      kind: "open",
      id: "m3-open",
      prompt: "\"How would you make sure the pipelines in your team are resilient and scalable?\"",
      rubric: [
        "Idempotent design (overwrite partitions / merge on keys / dedup) so reruns and backfills are safe",
        "Retries for transient errors, isolation of bad records (dead-letter), checkpoints",
        "Monitoring of both jobs and data (freshness, volume, quality checks gating publication) with alerting and on-call",
        "Decoupling and scalability: separating ingestion/transformation/consumption, partitioning and parallelism, avoiding over-engineering (resilience proportional to criticality)",
        "Testing failure scenarios and having runbooks/SLOs, not just the happy path",
      ],
      redFlags: ["'We use Kafka, so it's resilient'", "Only talking about adding more hardware", "No mention of data correctness after recovery"],
      modelAnswer: `I'd set a few non-negotiable design principles and make them part of our definition of done:

1. **Safe to rerun:** every load is idempotent (overwrite a partition or merge on a business key), so retries and backfills never create duplicates or gaps.
2. **Fail well:** retries with backoff for transient errors; bad records go to a quarantine/dead-letter area with an alert instead of blocking everything; checkpoints so we resume rather than restart.
3. **Detect silent failures:** monitor freshness, volumes and quality checks on outputs. Critical checks block publication ('circuit breaker'), so consumers never see wrong data unknowingly.
4. **Scale by design:** partition data by date, process partitions in parallel, decouple ingestion from transformation, and choose batch unless a decision really needs low latency.
5. **Proportional resilience:** pipelines are tiered by criticality. A GxP batch-release feed gets SLOs, on-call and tested runbooks; an exploratory dataset doesn't.

And we **test failure**: kill a job mid-run in a test environment and check that the rerun gives the same result.`,
    },
  ],
};
