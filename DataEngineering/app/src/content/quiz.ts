import type { QuizQuestion } from "../types";

/** Taken twice: as a baseline before the modules and as the final quiz after them. */
export const quiz: QuizQuestion[] = [
  // ── M1 · From software to data engineering
  {
    id: "q01",
    module: "m1",
    prompt:
      "A bug in a transformation job wrote wrong values into a reporting table for five days before anyone noticed. Compared with a bug in a web service, what is the main additional work?",
    options: [
      "Roll back the job to the previous version; the table will correct itself",
      "Restart the job with more resources",
      "Fix the code, then correct the historical data (backfill) and tell the consumers who used the wrong figures",
      "Delete the table and let users rebuild their reports",
    ],
    answer: 2,
    explanation:
      "Rolling back code does not roll back data. Wrong data persists and has already been consumed by reports, extracts and decisions. The fix has three parts: correct the code, reprocess (backfill) the affected period, and tell downstream consumers what was wrong and when.",
  },
  {
    id: "q02",
    module: "m1",
    prompt:
      "Which role typically builds tested, documented SQL models (for example with dbt) that turn cleaned data into business-ready tables for analysts and dashboards?",
    options: ["Data Scientist", "Analytics Engineer", "Platform Engineer", "Data Steward"],
    answer: 1,
    explanation:
      "The Analytics Engineer sits between data engineering and analysis. They own the business-facing transformation layer (models, tests, documentation, metric definitions). Data Engineers focus more on ingestion, pipelines and the platform.",
  },
  {
    id: "q03",
    module: "m1",
    prompt: "Why do data teams test the data itself, and not only the code?",
    options: [
      "Because data code cannot be unit-tested",
      "Because regulators require it in every industry",
      "Because data tests are cheaper to write than code tests",
      "Because inputs change outside the team's control, so correct code can still produce wrong output",
    ],
    answer: 3,
    explanation:
      "Source systems change schemas, send duplicates, late files or unexpected values without any deploy on your side. A job can succeed technically while publishing wrong numbers, so checks on the data (nulls, uniqueness, volumes, freshness, business rules) catch what code tests cannot.",
  },

  // ── M2 · Storage & modeling
  {
    id: "q04",
    module: "m2",
    prompt: "Why are columnar formats such as Parquet much faster for analytical queries than CSV?",
    options: [
      "Queries read only the columns they need, and similar values stored together compress very well",
      "They keep every row in memory",
      "They are encrypted by default",
      "They support SQL natively, while CSV does not",
    ],
    answer: 0,
    explanation:
      "Analytical queries usually touch a few columns over many rows. Columnar storage lets the engine read only those columns, skip blocks using min/max statistics, and benefit from high compression. In cloud warehouses this directly lowers cost, because you often pay for data scanned.",
  },
  {
    id: "q05",
    module: "m2",
    prompt: "In dimensional modeling, what does the 'grain' of a fact table define?",
    options: [
      "The level of data quality required",
      "The number of dimensions linked to it",
      "Exactly what one row represents (e.g., one batch, one order line, one sensor reading per minute)",
      "How often the table is refreshed",
    ],
    answer: 2,
    explanation:
      "Declaring the grain is the first modeling decision: it fixes what one row means. Mixing grains in one table is a classic cause of double-counting and wrong KPIs.",
  },
  {
    id: "q06",
    module: "m2",
    prompt: "A 'Slowly Changing Dimension Type 2' is used when you need to…",
    options: [
      "overwrite old attribute values with new ones",
      "keep the full history by adding a new row with validity dates when an attribute changes",
      "store the dimension in a separate database",
      "delete records that have not changed for a year",
    ],
    answer: 1,
    explanation:
      "SCD Type 2 keeps history: when, for example, a product's site or classification changes, a new version row is added with valid-from/valid-to dates. Facts can then be reported 'as it was at the time'. Type 1 simply overwrites.",
  },

  // ── M3 · Pipelines
  {
    id: "q07",
    module: "m3",
    prompt: "What does it mean for a pipeline to be idempotent?",
    options: [
      "It never fails",
      "It processes data in real time",
      "It runs on a single machine",
      "Running it several times for the same input or period gives the same result as running it once",
    ],
    answer: 3,
    explanation:
      "Idempotency makes retries and reruns safe: no duplicates, no gaps. It is typically achieved by overwriting a partition or merging (upserting) on a business key instead of blindly appending.",
  },
  {
    id: "q08",
    module: "m3",
    prompt: "What is Change Data Capture (CDC)?",
    options: [
      "Reading the source database's change log to propagate inserts, updates and deletes incrementally",
      "A nightly full copy of every table",
      "A data quality rule that detects changes in distributions",
      "A process that approves schema changes",
    ],
    answer: 0,
    explanation:
      "Log-based CDC (e.g., Debezium or cloud-native tools) reads the database transaction log and streams each change. It is lighter on the source than repeated full extracts, and it also captures deletes, which timestamp-based incremental loads often miss.",
  },
  {
    id: "q09",
    module: "m3",
    prompt: "In data engineering, a 'backfill' is…",
    options: [
      "a fallback server used during outages",
      "reprocessing historical periods, e.g., after a logic fix, a new column, or an outage",
      "filling missing values with averages",
      "a backup of the warehouse",
    ],
    answer: 1,
    explanation:
      "Backfills are routine and often expensive: they need planning (compute cost, order of dependencies, downstream impact, communication) and, in GxP contexts, documentation under change control.",
  },

  // ── M4 · Architecture & platforms
  {
    id: "q10",
    module: "m4",
    prompt: "What mainly makes a 'lakehouse' possible?",
    options: [
      "Storing all data in a relational database",
      "Moving data from the lake into a warehouse every night",
      "Open table formats (Delta Lake, Apache Iceberg, Hudi) that add transactions, schema enforcement and time travel to files in object storage",
      "Using only streaming pipelines",
    ],
    answer: 2,
    explanation:
      "Table formats add a metadata/transaction layer on top of Parquet files in cheap object storage. This gives warehouse-like guarantees (ACID, schema evolution, time travel) while keeping open files that several engines can read.",
  },
  {
    id: "q11",
    module: "m4",
    prompt: "Data Mesh is primarily…",
    options: [
      "a socio-technical operating model: domain ownership, data as a product, a self-serve platform and federated governance",
      "a product you can buy from a cloud vendor",
      "a network topology for data centers",
      "a replacement for data warehouses",
    ],
    answer: 0,
    explanation:
      "Data Mesh is mostly about organization and ownership, not technology. It requires mature domains and a strong self-serve platform. Many companies adopt a hybrid: a central platform team plus domain-owned data products.",
  },
  {
    id: "q12",
    module: "m4",
    prompt: "In a medallion architecture, what are the bronze, silver and gold layers?",
    options: [
      "Three price tiers of a cloud provider",
      "Development, test and production environments",
      "Raw data as ingested → cleaned and conformed data → business-ready data products",
      "Three levels of user access",
    ],
    answer: 2,
    explanation:
      "Bronze keeps raw data (useful for reprocessing and audit), silver cleans, deduplicates and conforms it, and gold serves curated, business-level tables and metrics.",
  },

  // ── M5 · DataOps & reliability
  {
    id: "q13",
    module: "m5",
    prompt: "What is a data contract?",
    options: [
      "A legal agreement with a data vendor",
      "An agreed, versioned specification between a data producer and its consumers: schema, meaning, quality expectations, SLAs and change process",
      "A license for a database",
      "A list of users allowed to access a table",
    ],
    answer: 1,
    explanation:
      "Data contracts bring the API-contract discipline of software to data. Upstream schema changes are a leading cause of data incidents, and contracts make them explicit, testable (often in the producer's CI) and negotiated.",
  },
  {
    id: "q14",
    module: "m5",
    prompt: "Which of these is a well-formed data SLO?",
    options: [
      "The pipeline should be fast",
      "The data team responds to tickets",
      "Zero data quality issues",
      "The batch-release dataset is complete and updated by 06:00 on 99% of business days, measured monthly",
    ],
    answer: 3,
    explanation:
      "A good SLO is specific, measurable and tied to consumer needs (here freshness and completeness for a morning QA process). 'Zero issues' is not a target you can manage; error budgets need a realistic percentage.",
  },
  {
    id: "q15",
    module: "m5",
    prompt: "Data observability adds what to classic job monitoring?",
    options: [
      "Monitoring the health of the data itself: freshness, volume, schema changes and distributions",
      "CPU and memory metrics of the cluster",
      "Logging of user logins",
      "Nothing; the two are the same",
    ],
    answer: 0,
    explanation:
      "Job monitoring tells you a task succeeded. Observability tells you whether the output makes sense: data arrived on time, row counts are normal, the schema didn't change, values look plausible. Silent failures are the main risk in data.",
  },

  // ── M6 · Governance, GxP & privacy
  {
    id: "q16",
    module: "m6",
    prompt: "In pharma, ALCOA+ describes…",
    options: [
      "a cloud certification for GxP workloads",
      "data integrity principles: Attributable, Legible, Contemporaneous, Original, Accurate, plus Complete, Consistent, Enduring, Available",
      "an algorithm for anonymizing patient data",
      "a method for statistical process control",
    ],
    answer: 1,
    explanation:
      "ALCOA+ is the vocabulary inspectors use for data integrity. For a data platform it translates into audit trails, attributable changes, reliable timestamps, protection of original records, retention and retrievability.",
  },
  {
    id: "q17",
    module: "m6",
    prompt: "21 CFR Part 11 (FDA) and EU GMP Annex 11 mainly cover…",
    options: [
      "pricing and reimbursement rules",
      "clinical trial design",
      "electronic records, electronic signatures and computerised systems used in GxP activities (validation, audit trails, access control)",
      "only paper-based batch records",
    ],
    answer: 2,
    explanation:
      "These are the core rules for computerised systems in regulated activities. Swissmedic applies the PIC/S GMP guide, which mirrors EU GMP including Annex 11; Part 11 matters for products sold in the US.",
  },
  {
    id: "q18",
    module: "m6",
    prompt: "What does a risk-based validation approach (GAMP 5, Computer Software Assurance) mean for a data team?",
    options: [
      "Every pipeline must be validated with the same full documentation",
      "Validation is optional if the cloud vendor is certified",
      "Only the final dashboard needs validation",
      "Validation effort is scaled to the impact on patient safety, product quality and data integrity, using critical thinking and automated testing as evidence",
    ],
    answer: 3,
    explanation:
      "Modern guidance pushes away from documenting everything equally. High-risk GxP uses get rigorous assurance, low-risk uses get lighter, and automated tests and supplier documentation can be leveraged as evidence. This is what makes agile delivery possible in GxP.",
  },

  // ── M7 · Data for ML & AI
  {
    id: "q19",
    module: "m7",
    prompt: "What is 'data leakage' in machine learning?",
    options: [
      "Training data includes information that will not be available at prediction time, so results look better than they will be in production",
      "A security breach that exposes training data",
      "Losing rows during ingestion",
      "A model that uses too much memory",
    ],
    answer: 0,
    explanation:
      "Example: predicting batch failure using a field that is only filled after the QC investigation. Offline metrics look excellent, production performance collapses. Data engineers help prevent it with point-in-time correct datasets.",
  },
  {
    id: "q20",
    module: "m7",
    prompt:
      "A company builds a GenAI assistant over thousands of internal SOPs (RAG). What is the data engineering team's core responsibility?",
    options: [
      "Choosing the LLM's prompt wording",
      "Training a new foundation model on the SOPs",
      "Building reliable ingestion, parsing, chunking and embedding pipelines, keeping them fresh, and enforcing document access rights at retrieval",
      "Nothing; RAG is fully handled by the vendor",
    ],
    answer: 2,
    explanation:
      "RAG quality is mostly a data problem: correct current versions of documents, good parsing of PDFs and tables, useful metadata, refresh when SOPs are superseded, and making sure a user never retrieves a document they are not allowed to read.",
  },
  {
    id: "q21",
    module: "m7",
    prompt: "What does the draft EU GMP Annex 22 (Artificial Intelligence, 2025 consultation) say about AI in critical GMP applications?",
    options: [
      "Any AI model can be used if a human signs off",
      "It focuses on static, deterministic models with a defined intended use and independent test data, and says generative AI/LLMs should not be used in critical GMP applications",
      "AI is forbidden everywhere in pharma",
      "It only applies to medical devices",
    ],
    answer: 1,
    explanation:
      "The draft targets machine learning models used in critical GMP applications and expects a defined intended use, representative test data and performance criteria. Dynamic models, probabilistic outputs and generative AI are excluded from critical uses. Non-critical uses with a human in the loop are treated differently.",
  },

  // ── M8 · Leading a data team
  {
    id: "q22",
    module: "m8",
    prompt:
      "You join as data engineering lead and find 40 open ad-hoc requests from many stakeholders, plus frequent pipeline incidents. What is the best first move?",
    options: [
      "Work through the requests oldest-first to show responsiveness",
      "Freeze all requests until the platform is rebuilt",
      "Set up visible intake and prioritization with stakeholders (value, risk, effort), and protect explicit capacity for reliability",
      "Hire contractors to clear the backlog",
    ],
    answer: 2,
    explanation:
      "Transparency plus explicit trade-offs: one intake channel, simple prioritization criteria agreed with stakeholders, and a protected share of capacity for incidents and reliability work. Saying yes to everything or freezing everything both lose trust.",
  },
  {
    id: "q23",
    module: "m8",
    prompt: "Which metric best shows the value of a data platform to leadership?",
    options: [
      "Number of pipelines in production",
      "Adoption of data products in business decisions, together with reliability (SLOs met) and cost per data product",
      "Terabytes stored",
      "Number of tools in the stack",
    ],
    answer: 1,
    explanation:
      "Volume metrics (pipelines, terabytes, tools) measure activity, not value. Leadership cares about outcomes (decisions, time saved, risk reduced), the trust they can place in the data (SLOs) and efficiency (cost per product).",
  },
  {
    id: "q24",
    module: "m8",
    prompt: "Cloud data platform costs are rising quickly. Which action addresses the root cause rather than the symptom?",
    options: [
      "Ask the vendor for a discount",
      "Block all new workloads",
      "Make cost visible per team/data product (tagging, showback), set guardrails (auto-suspend, quotas) and review the most expensive workloads",
      "Move everything back on-premises",
    ],
    answer: 2,
    explanation:
      "FinOps starts with visibility and ownership: who spends what, for which product. Then come guardrails and optimization of the top consumers (often a few queries or always-on clusters). Discounts help once; behavior drives the trend.",
  },
];
