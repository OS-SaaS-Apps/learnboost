import type { Module } from "../types";

export const m9: Module = {
  id: "m9",
  number: 9,
  title: "Interview rehearsal",
  minutes: 15,
  summary: "Practice the questions most likely to come up, with rubrics and model answers.",
  objectives: [
    "Answer the core questions out loud in about 2 minutes each",
    "Use your software leadership stories as evidence",
    "Avoid the classic red flags",
  ],
  sections: [
    {
      kind: "text",
      title: "How to use this rehearsal",
      body: `Pick **two or three** questions below (you won't have time for all of them in 15 minutes). For each one:

1. Answer **out loud** first, as in the interview (about 2 minutes), then write the key points.
2. Tick the rubric honestly and read the model answer.
3. If AI feedback is enabled in Settings, ask for it. It also gives a follow-up question to practice.

**Answer structure that works:** *principle → approach in 3–5 steps → concrete example → how you'd measure success.* For behavioral questions, use **STAR** (Situation, Task, Action, Result) and finish with how it applies to a data team.

**Classic red flags:** naming a tool as the answer; absolute statements ("Data Mesh is the future"); no mention of the business or consumers; bluffing hands-on expertise; ignoring compliance in a pharma context.

**Questions to ask the interviewer** (they show seniority):

- Which decisions does the data platform support today that are GxP-relevant, and how is validation organized?
- What are the top three complaints the business has about data?
- How is the team split between platform work and data products? What are the open roles?
- How is AI governed here, and who decides on use cases?
- What would make this role a success after 12 months?`,
    },
    {
      kind: "open",
      id: "m9-q1",
      title: "Behavioral",
      prompt: "\"Tell me about a production incident you led. What would you do differently for a data incident?\"",
      rubric: [
        "Clear STAR story with their own role and actions",
        "Shows containment, communication and blameless postmortem practices",
        "Explains the data-specific differences: silent failures, impact on consumers who already used the data, backfill/reprocessing",
        "Mentions detection improvements (data tests, observability) and prevention (data contracts)",
        "Mentions GxP aspects where relevant (impact assessment, deviation, change control)",
      ],
      redFlags: ["No personal role in the story", "Blaming individuals", "No learning or follow-up actions"],
      modelAnswer: `*Situation/Task:* "A release broke the payment service at peak time and I was incident lead." *Action:* "I set up the incident channel, assigned roles, communicated status every 30 minutes, we rolled back within 40 minutes, and I ran a blameless postmortem that led to canary releases." *Result:* "Similar incidents dropped significantly."

**For a data incident I'd keep the same structure and add:** detection of *silent* failures, since the job may have succeeded; **impact analysis using lineage**, meaning which reports and decisions used the wrong data and since when; explicit communication to those consumers; **controlled reprocessing** (backfill) with reconciliation; and prevention through data tests, observability and data contracts with the source owner. In GxP, a Quality impact assessment, possibly a deviation, and changes under change control.`,
    },
    {
      kind: "open",
      id: "m9-q2",
      title: "Technical judgment",
      prompt: "\"When would you choose ETL rather than ELT?\"",
      rubric: [
        "Correct definitions of ETL and ELT",
        "ELT as today's default with cloud platforms: raw data kept, transformations in SQL/dbt, reprocessing possible",
        "ETL when data must be filtered/masked/pseudonymized before landing (e.g., patient data), or the target can't transform",
        "Notes they coexist and the decision is about security, cost, traceability and simplicity",
        "Gives a concrete pharma example",
      ],
      redFlags: ["'ETL is outdated' without nuance", "Confusing the two"],
      modelAnswer: `**ETL** transforms before loading into the target; **ELT** loads raw data first and transforms inside the platform. With elastic cloud platforms, **ELT is the default**: we keep raw data for reprocessing and audit, and transformations are versioned SQL/dbt that are easy to test.

I'd use **ETL-style processing before landing** when data must not reach the shared platform in raw form, for example pseudonymizing patient identifiers from clinical or pharmacovigilance systems, filtering out personal data we don't need, or when a source requires heavy specific processing (instrument files, historian compression). The two coexist; what matters is clear rules on where sensitive transformations happen and full traceability.`,
    },
    {
      kind: "open",
      id: "m9-q3",
      title: "Strategy",
      prompt: "\"How would you measure the value and ROI of the data platform?\"",
      rubric: [
        "Distinguishes value metrics (business outcomes) from activity metrics (pipelines, TB)",
        "Covers several dimensions: business value, operational efficiency, quality/reliability, adoption, cost",
        "Links each initiative to measurable expected benefits defined upfront, with business owners",
        "Includes full cost (people, licences, cloud, validation, run costs) in the business case",
        "Mentions tracking over time and stopping or redirecting low-value work",
      ],
      redFlags: ["Only counting pipelines or users", "ROI without costs", "Value claimed without the business confirming it"],
      modelAnswer: `I'd measure value at the level of **use cases**, not infrastructure. Each initiative starts with a business owner and an expected, measurable benefit: e.g., batch review preparation time reduced from 3 days to 1, fewer deviations caused by data errors, a monthly report automated (hours saved), inventory reduced thanks to better planning data.

Then I'd track four groups of metrics: **business outcomes** (confirmed with the owners), **adoption** (active consumers of certified data products), **reliability and quality** (SLOs met, incidents), and **cost** (platform cost per data product, total cost including people and validation effort).

The business case compares full costs to the confirmed benefits over 2–3 years. I'd review it quarterly and stop or redirect work that doesn't deliver. A technically excellent platform that nobody uses is not a success.`,
    },
    {
      kind: "open",
      id: "m9-q4",
      title: "Architecture & organization",
      prompt: "\"What's the difference between Data Mesh and a centralized data platform, and which would you choose here?\"",
      rubric: [
        "Correct description of a centralized model (one team builds and governs everything)",
        "Data Mesh's four principles (domain ownership, data as a product, self-serve platform, federated governance)",
        "Mesh as an organizational transformation with prerequisites and failure modes",
        "Recommends based on maturity, typically hybrid: central platform + domain-aligned data products",
        "GxP consideration: strong central standards and controls for regulated data",
      ],
      redFlags: ["Mesh as a product to buy", "Dogmatic answer without context"],
      modelAnswer: `In a **centralized** model, one data team ingests, transforms, governs and serves data for everyone. It is consistent and efficient early on, but can become a bottleneck far from the business.

**Data Mesh** distributes ownership to business domains, which build and run **data products**, supported by a **self-serve platform** and **federated governance** with automated global rules. It is an organizational transformation, not a technology, and it needs domains with skills, budget and accountability.

Here I'd start **hybrid**: a central platform team providing the infrastructure, standards, security, GxP controls and shared master data, plus domain-aligned product teams (e.g., Manufacturing & Quality) working closely with their business owners. As domains mature, more ownership can move to them. In a regulated environment, strong central standards for GxP data are non-negotiable.`,
    },
    {
      kind: "open",
      id: "m9-q5",
      title: "Pharma",
      prompt: "\"Our quality team says the data platform can't be used for GxP decisions. How would you change that?\"",
      rubric: [
        "Seeks to understand the specific concerns first (audit trail, access, validation, data integrity gaps)",
        "Proposes a GxP zone / qualified platform with ALCOA+ controls",
        "Risk-based validation of the specific use cases (GAMP 5 / CSA) with automated evidence",
        "Change control and periodic review to maintain the validated state",
        "Partnership with Quality/CSV and a pilot use case to prove the approach",
      ],
      redFlags: ["Arguing that GxP rules don't apply to analytics", "Promising everything will be validated quickly"],
      modelAnswer: `First I'd sit down with Quality to understand their exact concerns. Usually they are audit trails, uncontrolled access, unvalidated calculations, the lack of change control, or missing evidence of data integrity.

Then I'd propose a path together: **qualify the platform** (supplier assessment, documented configuration, infrastructure qualification), and create a **GxP zone** with ALCOA+ controls: named access, audit trails, retained raw data, controlled reprocessing and a retention plan. Next, pick **one pilot use case** (e.g., CPV for one product) and validate it with a **risk-based approach** (GAMP 5 2nd edition / CSA), using automated tests and CI records as evidence. Change control and periodic review keep it validated.

Success means Quality co-owns the process, and each next use case becomes cheaper to validate because components and evidence are reused.`,
    },
  ],
};
