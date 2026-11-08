import type { Module } from "../types";

export const m7: Module = {
  id: "m7",
  number: 7,
  title: "Data for ML & AI",
  minutes: 25,
  summary: "The ML lifecycle at lead level, MLOps hand-offs, RAG and agents as data problems, evaluation, and AI rules in pharma.",
  objectives: [
    "Describe the ML lifecycle and where data engineering is involved",
    "Explain leakage, drift, training–serving skew and reproducibility",
    "Explain a RAG pipeline and what the data team owns in it",
    "Choose between RAG, fine-tuning, an agent or a plain workflow",
    "Explain the draft Annex 22 and EU AI Act implications for pharma",
  ],
  sections: [
    {
      kind: "text",
      title: "The ML lifecycle, from a data lead's point of view",
      body: `| Step | Main owner | Data engineering involvement |
|---|---|---|
| Problem framing | Business + DS | Is the data available, at the right grain and history? |
| Data preparation | DS + DE | Reliable, documented datasets; **point-in-time correct** history |
| Feature engineering | DS (+ DE for production features) | Feature pipelines, feature store, reuse |
| Training & evaluation | DS | Reproducible snapshots of training data |
| Deployment | ML Engineer | Batch scoring pipelines, real-time features, serving |
| Monitoring | MLE + DS | Data quality and drift monitoring on inputs |

Most ML projects fail on **data and operations**, not algorithms. "The model worked in the notebook" is the start, not the end.

**Concepts to use correctly:**

- **Train / validation / test split:** evaluate on data the model hasn't seen. For time-dependent processes, split by time.
- **Overfitting:** the model memorizes training data and generalizes badly.
- **Data leakage:** training uses information that won't exist at prediction time (e.g., a field filled in after the QC investigation), so offline results are far too optimistic.
- **Metrics:** with rare events (batch failures, fraud, adverse events), **accuracy misleads**. A model that always predicts 'no failure' is 99% accurate. Use precision and recall and discuss the cost of false positives vs false negatives.
- **Training–serving skew:** features computed differently in training and production. Shared feature pipelines or a feature store prevent it.
- **Drift:** *data drift* (inputs change: new raw material supplier, new equipment) vs *concept drift* (the relationship changes). Monitor, and retrain under a defined policy.
- **Reproducibility:** be able to recreate a model: code version, data snapshot (table versions/time travel), parameters. MLflow-style registries track this.`,
    },
    {
      kind: "text",
      title: "Generative AI: what an LLM needs from the data team",
      body: `**LLM basics:** a large language model predicts text token by token. It has a limited **context window**, no knowledge of your internal documents, and no knowledge after its training date. It can **hallucinate** (produce fluent but wrong answers).

**RAG (Retrieval-Augmented Generation)** gives the model relevant internal content at question time:

1. **Ingest** documents (SOPs, deviation reports, specifications) from their systems of record, using only the current approved versions.
2. **Parse:** extract text, tables and structure from PDFs and Word files (often the hardest step).
3. **Chunk:** split into passages of sensible size, keeping titles and section context.
4. **Embed:** convert chunks into vectors that capture meaning.
5. **Index:** store them in a vector index (pgvector, a vector database, or the search built into the data platform), with **metadata** (document ID, version, site, classification, access groups).
6. **Retrieve:** at question time, find relevant chunks using **hybrid search** (keywords + vectors), filtered by metadata and **the user's permissions**, then **rerank**.
7. **Generate:** the LLM answers using the retrieved passages, **with citations**.

**What the data team owns:** steps 1–6. Freshness (superseded SOPs must disappear), parsing quality, metadata, **access control propagation** (a user must never retrieve a document they can't open), PII handling, and the evaluation datasets.`,
    },
    {
      kind: "text",
      title: "RAG, fine-tuning, agent, or just a workflow?",
      body: `| Need | Approach |
|---|---|
| Answer questions from internal, changing documents | **RAG** |
| Adapt style, format or a narrow task with many examples | **Fine-tuning** (rarely the first step today) |
| Multi-step task using tools: look up a ticket, query a system, draft an action | **Agent** (LLM + tools + guardrails) |
| Predictable, well-defined steps | **A deterministic workflow**, possibly with an LLM in one step |

**Agents** call tools (APIs, SQL, search) in a loop to reach a goal. Leadership concerns: **least-privilege tool access**, **human approval** for actions with impact, logging, cost and latency limits, and evaluation. The data team's role is to provide **governed tools**: a semantic layer or certified APIs rather than raw table access, so an agent's "how many deviations last month?" uses the official definition.

**Evaluation** is the core discipline: a **golden set** of real questions with expected answers, automated checks (correctness, citations present, retrieval found the right document), LLM-as-a-judge calibrated against human reviewers, and user feedback in production. No evaluation, no go-live.`,
    },
    {
      kind: "text",
      title: "AI regulation in pharma",
      body: `**Draft EU GMP Annex 22, Artificial Intelligence (published for consultation in 2025)** covers AI/ML models used in **critical GMP applications** (with direct impact on patient safety, product quality or data integrity):

- It targets **static** models with **deterministic** output, with a clearly defined **intended use**.
- It expects **representative, independent test data**, predefined acceptance criteria, explainability where relevant, and monitoring in operation.
- **Dynamic models** (continuously learning), models with **probabilistic outputs**, and **generative AI / LLMs** should **not** be used in critical GMP applications.
- In **non-critical** applications, they can be used with a **human in the loop** who remains responsible.

**EU AI Act:** risk-based regulation with obligations phased in between 2025 and 2027. Pharma is mostly concerned through AI in medical devices, HR and some safety-relevant uses. Swiss companies are concerned when they place AI systems on the EU market or use their output in the EU. Switzerland itself is taking a sector-based approach, aligned with the Council of Europe AI Convention.

**Typical pharma GenAI use cases and their risk:**

| Use case | Typical classification |
|---|---|
| Search/Q&A over SOPs for employees | Non-critical, with human use of the answer |
| Drafting deviation or CAPA summaries for human review | Non-critical if a qualified person reviews and owns the content |
| Pharmacovigilance case intake support | Regulated process: strong controls, human verification |
| Automated batch disposition decisions | Critical GMP: no generative AI under the draft Annex 22 |`,
    },
    {
      kind: "scenario",
      id: "m7-scn",
      title: "GenAI over deviation reports",
      context:
        "Quality leadership asks your team to support a GenAI assistant that **summarizes deviation reports and suggests similar past deviations and CAPAs**. Deviations live in a cloud QMS; attachments are PDFs. The assistant would be used by QA specialists who write investigation reports.",
      steps: [
        {
          prompt: "What do you clarify first?",
          options: [
            {
              text: "Which LLM is the best on public benchmarks",
              score: 0,
              feedback: "Model choice matters far less than intended use, data access and evaluation. Decide it later, with tests on your data.",
            },
            {
              text: "Intended use and GxP impact (decision support with QA review vs automated decision), users and access rights, data available, and how success will be measured",
              score: 2,
              feedback: "This determines the classification (non-critical with a human in the loop), the controls, and whether the project is worth it.",
            },
            {
              text: "Whether we can fine-tune a model on all deviations",
              score: 0,
              feedback: "Fine-tuning isn't the natural starting point for retrieving changing documents, and it raises data governance questions.",
            },
          ],
        },
        {
          prompt: "What is the main data engineering work?",
          options: [
            {
              text: "Ingest deviations and attachments with their metadata (site, product, status, classification), parse PDFs, chunk and embed, keep it in sync with the QMS, and enforce the QMS access rights at retrieval",
              score: 2,
              feedback: "That's the RAG backbone. Access control and freshness are the parts most often forgotten.",
            },
            {
              text: "Export all deviations once to a shared folder for the AI vendor",
              score: 0,
              feedback: "Uncontrolled copies, stale data, and no access control: a data integrity and confidentiality problem.",
            },
            {
              text: "Nothing: the QMS vendor's AI feature will handle it",
              score: 1,
              feedback: "A vendor feature may be the right *buy* decision, but you still need to assess data access, evaluation and validation impact.",
            },
          ],
        },
        {
          prompt: "How do you decide whether it's ready for production?",
          options: [
            {
              text: "A demo to leadership that looks impressive",
              score: 0,
              feedback: "Demos select good cases. You need evidence across representative cases.",
            },
            {
              text: "A golden set of real deviations evaluated by QA experts (relevance of similar cases, factual correctness, citations), acceptance criteria agreed with Quality, a pilot with feedback, and monitoring of quality and usage after go-live",
              score: 2,
              feedback: "Evidence-based, owned by Quality, and continuing after go-live.",
            },
            {
              text: "When the hallucination rate is zero",
              score: 1,
              feedback: "The intent is right but the target is unrealistic. Define acceptable error rates for the use and keep a human review step.",
            },
          ],
        },
      ],
    },
    {
      kind: "check",
      id: "m7-check",
      questions: [
        {
          id: "m7c1",
          prompt: "A batch-failure model shows 99% accuracy, but only 1% of batches fail. What do you ask?",
          options: [
            "Can we deploy it now?",
            "What are precision and recall on the failing batches, and what does a false negative cost?",
            "Which algorithm was used?",
            "Can we get 99.9%?",
          ],
          answer: 1,
          explanation: "With 1% failures, always predicting 'OK' gives 99% accuracy. For rare events, performance on the rare class matters.",
        },
        {
          id: "m7c2",
          prompt: "A RAG assistant over SOPs keeps citing superseded versions. Where is the problem?",
          options: [
            "The LLM is not large enough",
            "The prompt is too short",
            "Users ask bad questions",
            "The ingestion pipeline: it doesn't sync document status/versions from the document management system and remove superseded content",
          ],
          answer: 3,
          explanation: "Freshness and versioning are data pipeline responsibilities, and in GxP, using a superseded SOP is a real compliance issue.",
        },
        {
          id: "m7c3",
          prompt: "Data drift means…",
          options: [
            "the distribution of the model's inputs has changed (e.g., new supplier, new equipment)",
            "the database moved to another server",
            "the model's code changed",
            "data was deleted",
          ],
          answer: 0,
          explanation: "Data drift concerns inputs; concept drift concerns the relationship between inputs and outcome. Both call for monitoring and possibly retraining.",
        },
      ],
    },
    {
      kind: "lead",
      body: `**Decisions a lead owns here:**

- **AI readiness of the platform:** documents and unstructured data as first-class sources, a vector search capability, governed access, evaluation tooling
- **Hand-offs** with data science and ML engineering: who owns feature pipelines, model serving and monitoring
- **Governed interfaces** for AI (semantic layer, certified APIs) rather than raw table access
- **Use-case triage** with Quality/Legal: intended use, GxP criticality, privacy, and value. Say no to AI where a simple workflow would do.

**What interviewers listen for:** "AI quality is mostly data quality"; access control and freshness in RAG; evaluation before go-live; awareness of the draft Annex 22 and human-in-the-loop for non-critical uses; and not building AI on a fragile data foundation.`,
    },
    {
      kind: "open",
      id: "m7-open",
      prompt: "\"Leadership wants GenAI everywhere. When would you use RAG, fine-tuning or an agent, and what's your team's role?\"",
      rubric: [
        "RAG for knowledge in internal, changing documents; fine-tuning for style/format/narrow tasks; agents for multi-step tasks with tools; simple workflows when steps are predictable",
        "Starts from the business need and intended use, and prefers the simplest solution",
        "Data team role: ingestion, parsing, metadata, freshness, access control, governed tools/semantic layer",
        "Evaluation before and after go-live (golden sets, expert review, monitoring)",
        "Regulatory awareness: GxP criticality, draft Annex 22 (no GenAI in critical GMP uses), human in the loop, privacy",
      ],
      redFlags: ["'Fine-tune a model on all our data' as the default", "No mention of access control", "Agents with broad write access to systems"],
      modelAnswer: `I'd start from the use case and its risk, not from the technology.

- **RAG** when people need answers from internal, changing knowledge (SOPs, deviations, specifications). It keeps the model current without retraining and can cite sources.
- **Fine-tuning** when we need a specific style, format or narrow classification with many examples. It's rarely the first step today.
- **An agent** when a task needs several steps with tools: look up a ticket, query a system, draft an action. It needs least-privilege tools and human approval for anything with impact.
- **A plain workflow** when the steps are predictable. It's often cheaper and more reliable than an agent.

**My team's role:** make enterprise knowledge AI-ready. That means reliable ingestion, parsing and metadata, freshness (superseded documents removed), **access control enforced at retrieval**, and governed tools such as a semantic layer so AI uses official KPI definitions.

**Guardrails:** golden-set evaluation with business experts before go-live, monitoring after. In pharma, classify intended use with Quality: under the draft Annex 22, generative AI stays out of critical GMP decisions, and non-critical uses keep a qualified human in the loop.`,
    },
  ],
};
