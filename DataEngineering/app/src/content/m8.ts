import type { Module } from "../types";

export const m8: Module = {
  id: "m8",
  number: 8,
  title: "Leading a data team",
  minutes: 25,
  summary: "Team topologies, hiring, intake and prioritization, stakeholders, metrics, cost/FinOps, build vs buy, and the first 90 days.",
  objectives: [
    "Propose a team structure and explain its trade-offs",
    "Describe what good looks like when hiring data engineers and analytics engineers",
    "Run intake and prioritization with many stakeholders",
    "Choose meaningful metrics and manage platform cost",
    "Present a credible 90-day plan",
  ],
  sections: [
    {
      kind: "text",
      title: "Team topologies for data",
      body: `| Model | How | Strengths | Risks |
|---|---|---|---|
| **Centralized** | One data team serves everyone | Consistent standards, efficient platform, easier GxP control | Bottleneck, far from the business, request queue |
| **Embedded / decentralized** | Data people sit in business units | Close to domain needs, fast | Duplication, inconsistent standards, isolated engineers |
| **Hub-and-spoke (hybrid)** | Central platform + standards; domain-aligned product teams (central or embedded) | Balance of consistency and proximity | Needs clear boundaries and a strong platform |

**Typical structure for ~10 people (illustrative):**

- **Platform team (3–4):** infrastructure, CI/CD, security, observability, cost guardrails, shared ingestion patterns
- **Domain data product teams (2 × 3):** e.g., Manufacturing & Quality, Supply chain & Commercial. Data engineers + analytics engineers, each with a business counterpart
- **Shared:** an architect (often shared with IT), and a governance/quality role or close partnership with Quality/CSV

Align teams with **business domains** and give each a clear ownership boundary (Team Topologies thinking: stream-aligned teams + a platform team).`,
    },
    {
      kind: "text",
      title: "Hiring and growing the team",
      body: `**What good looks like:**

| Role | Signals |
|---|---|
| **Data Engineer** | Strong SQL and data modeling; Python; pipeline reliability (idempotency, testing, monitoring); cloud platform experience; debugs data, not just code |
| **Analytics Engineer** | Excellent SQL and dimensional modeling; dbt-style engineering practices; business curiosity; communicates with stakeholders |
| **Platform Engineer** | Infrastructure as code, CI/CD, security, cost awareness; treats the platform as a product for internal users |

**Interview loop ideas:**

1. A **SQL / modeling exercise** on a realistic dataset (grain, joins, a window function)
2. **Data system design:** "design ingestion and modeling for QC results from three sites"
3. **Debugging a data incident:** "the KPI dropped 30% overnight, walk me through it"
4. **Stakeholder conversation:** explain a trade-off to a non-technical QA manager
5. **Values / collaboration**, and for pharma: comfort with documentation and controlled processes

**Growing people:** a career ladder with technical (IC) and management tracks; T-shaped skills; rotation between platform and domain work; communities of practice; certification where useful. Domain knowledge (GMP, quality processes) is a differentiator, so invest in it.`,
    },
    {
      kind: "text",
      title: "Intake and prioritization",
      body: `Data teams drown in requests. Make the work **visible and the trade-offs explicit**:

1. **One intake channel** (form or board), with requests categorized: *incident*, *small request* (< 1 day), *project / data product*, *platform work*.
2. **Clear criteria:** business value (decision supported, time saved, risk reduced, compliance), urgency, effort, and strategic fit.
3. **A regular prioritization forum** with key stakeholders: decisions and the reasons are published.
4. **Capacity allocation**, e.g., ~60% data products, ~20% reliability/tech debt, ~20% platform/enablement (illustrative; adapt and make it explicit).
5. **Self-service** for repetitive requests: certified datasets, a semantic layer, and training analysts, so the team isn't a reporting factory.

**Estimation under uncertainty:** data work hides surprises (quality issues, undocumented source logic). Use a short **discovery / data profiling spike** before committing to dates.`,
    },
    {
      kind: "text",
      title: "Stakeholders in pharma",
      body: `| Stakeholder | What they care about |
|---|---|
| Quality Assurance / QC | Data integrity, validated reports, batch release support, inspections |
| Manufacturing / MSAT | Process performance, yield, CPV, equipment data |
| CSV / Validation team | Validation approach, documentation, change control |
| IT / Infrastructure, InfoSec | Platform standards, identity, network, security |
| Data Protection Officer, Legal | Personal and health data, cross-border transfers |
| Supply chain, Commercial, Finance | Timely, consistent KPIs and planning data |
| Leadership | Value, cost, risk, AI strategy |

**Trust is the currency.** Quick wins that solve a visible pain point, transparent incident communication, and honest "no / not now" decisions build it faster than roadmaps.`,
    },
    {
      kind: "text",
      title: "Metrics, cost and build vs buy",
      body: `**Metrics that matter:**

| Dimension | Example metrics |
|---|---|
| Reliability | % of SLOs met, incidents by severity, MTTR, % incidents detected before users |
| Delivery | Lead time from request to data product, deployment frequency, change failure rate (DORA, adapted) |
| Adoption & value | Active consumers of certified products, decisions/processes supported, hours saved, use-case outcomes |
| Quality | Test pass rates on tier-1 products, open data quality issues |
| Cost | Platform cost per month and per data product; cost per domain |
| People | Engagement, attrition, skills coverage |

**Cost / FinOps.** Cloud data platforms bill compute (credits, DBUs, capacity units) and storage. Typical cost drivers: always-on clusters and warehouses, inefficient queries scanning everything, frequent full refreshes, duplicate copies, and dev environments left running.

Practices: **tagging and showback** per team/product, **auto-suspend and quotas**, reviewing the top 10 most expensive workloads monthly, right-sizing, incremental instead of full loads, and **budget alerts**. The vendor contract (commitments vs on-demand) is negotiated with Procurement once usage is understood.

**Build vs buy:** consider total cost of ownership (licences + people + operations + validation), time to value, differentiation (build only what is specific to you, e.g., MES/historian integration), skills available, lock-in and exit strategy, and the vendor's support for GxP (documentation, audit support, change notifications).`,
    },
    {
      kind: "text",
      title: "The first 90 days",
      body: `| Phase | Focus | Deliverables |
|---|---|---|
| **Days 1–30: Listen and learn** | Meet every team member 1:1; meet stakeholders (QA, Manufacturing, IT, CSV, DPO); map the platform, pipelines, incidents, costs, and the GxP landscape; read postmortems and audit findings | Current-state assessment, risk map, list of top pain points, team skills view |
| **Days 31–60: Stabilize and win trust** | Fix the top reliability issues on critical pipelines; set up intake and prioritization; define tiers and first SLOs; deliver 1–2 visible quick wins | Prioritized backlog, first SLO dashboard, incident process, quick wins delivered |
| **Days 61–90: Set direction** | Target architecture and roadmap (12–18 months); organization and hiring plan; governance with Quality; AI readiness plan | Strategy and roadmap, budget, org/hiring plan, agreed metrics |

**What interviewers want to hear:** understand before deciding; separate technical from organizational problems; prioritize by value and risk; **no premature migration or vendor announcement**; and don't let AI ambitions run on a fragile data foundation.`,
    },
    {
      kind: "scenario",
      id: "m8-scn",
      title: "Week 3 in the role",
      context:
        "You lead 9 data engineers. Requests arrive by email and chat to individual engineers. Two senior engineers are overloaded and one has hinted they might leave. QA complains about late data, Commercial wants a new dashboard 'by next week', and the CIO asks for your AI plan.",
      steps: [
        {
          prompt: "What do you tackle first?",
          options: [
            {
              text: "Write the AI strategy, because the CIO asked",
              score: 0,
              feedback: "Important, but your team's sustainability and core reliability are at risk. An AI plan on a burned-out team won't deliver.",
            },
            {
              text: "Stop requests going directly to individuals: one intake channel, a visible board, and a short prioritization with stakeholders, while you shield the overloaded seniors",
              score: 2,
              feedback: "This makes the work visible, protects people and creates the basis for every later trade-off.",
            },
            {
              text: "Work overtime with the team to clear the backlog",
              score: 0,
              feedback: "Unsustainable, and it rewards the chaotic intake that created the problem.",
            },
          ],
        },
        {
          prompt: "The senior engineer who may leave: what do you do?",
          options: [
            {
              text: "Wait and see",
              score: 0,
              feedback: "Losing a key engineer in a small team is a major risk, including knowledge loss on critical pipelines.",
            },
            {
              text: "Have an open 1:1 about workload and motivation, remove them from ad-hoc requests, give them meaningful ownership (e.g., reliability of a critical domain), and start reducing knowledge concentration",
              score: 2,
              feedback: "Addresses the cause (overload, meaning) and the risk (bus factor).",
            },
            {
              text: "Offer a raise immediately",
              score: 1,
              feedback: "It might help, but if the problem is workload and chaos, money alone rarely retains people.",
            },
          ],
        },
        {
          prompt: "Commercial's 'dashboard by next week' competes with QA's late-data issue. How do you decide?",
          options: [
            {
              text: "Whoever is most senior wins",
              score: 0,
              feedback: "Politics instead of criteria. The other stakeholder will lose trust.",
            },
            {
              text: "Apply the agreed criteria: QA's issue affects a GxP process and many users, so it comes first; offer Commercial a dated slot or an interim extract, and explain the decision openly",
              score: 2,
              feedback: "Transparent criteria, an explicit trade-off, and an alternative for the stakeholder who waits.",
            },
            {
              text: "Do both by splitting the team",
              score: 1,
              feedback: "Sometimes possible, but it hides the trade-off and often delays both.",
            },
          ],
        },
      ],
    },
    {
      kind: "check",
      id: "m8-check",
      questions: [
        {
          id: "m8c1",
          prompt: "What is the main risk of a purely centralized data team in a large company?",
          options: [
            "Inconsistent standards",
            "It becomes a bottleneck far from business needs, with a growing request queue",
            "Too much autonomy for domains",
            "It's always more expensive",
          ],
          answer: 1,
          explanation: "Centralization gives consistency but can't scale with demand. Hybrid models add domain alignment and self-service.",
        },
        {
          id: "m8c2",
          prompt: "Which interview exercise best reveals a data engineer's production skills?",
          options: [
            "Reciting definitions of ETL and ELT",
            "A LeetCode algorithm puzzle",
            "Walking through how they'd debug a KPI that dropped 30% overnight",
            "Listing tools on their CV",
          ],
          answer: 2,
          explanation: "Debugging a data incident shows reasoning about lineage, sources, quality checks and communication, which is the daily reality of the job.",
        },
        {
          id: "m8c3",
          prompt: "In your first 30 days, which action is most appropriate?",
          options: [
            "Assess the platform, team and stakeholders and identify the top risks and pain points",
            "Announce a migration to a new platform",
            "Reorganize the team",
            "Freeze all changes",
          ],
          answer: 0,
          explanation: "Understand before deciding. Early big announcements without diagnosis are a classic failure.",
        },
      ],
    },
    {
      kind: "lead",
      body: `**Your strongest card is here:** you have five years of leading engineers. Translate your stories:

- A team you restructured → a data team topology you'd propose
- A prioritization process you set up → data intake and capacity allocation
- Someone you retained or grew → career paths for data roles
- A stakeholder conflict you resolved → QA vs Commercial priorities
- A budget you managed → cloud data cost and FinOps

**Prepare 5–6 STAR stories** (Situation, Task, Action, Result) and end each with one sentence on *how you'd apply it in a data team*.`,
    },
    {
      kind: "open",
      id: "m8-open",
      prompt:
        "\"You take over a 10-person data engineering team in a 2,000-person pharma company. The platform is ageing, the business complains about data quality, and leadership wants to accelerate AI. What do you do in your first 90 days?\"",
      rubric: [
        "Phased approach: understand (1–30), stabilize (31–60), set direction (61–90), with concrete deliverables",
        "Listens to the team and to key stakeholders (QA, Manufacturing, IT, CSV/Quality, leadership) before deciding",
        "Stabilizes critical pipelines and data quality first (tiers, SLOs, incident process) and delivers quick wins",
        "Sets up intake/prioritization and defines metrics (reliability, adoption, cost, delivery)",
        "Connects AI ambitions to data foundations and GxP constraints, with a realistic roadmap, budget and org/hiring plan, and no premature vendor/migration decision",
      ],
      redFlags: ["Announcing a migration or new vendor in week one", "Launching AI projects before addressing data quality", "Ignoring the team's input and morale"],
      modelAnswer: `**Days 1–30: understand.** 1:1s with all ten engineers (what works, what hurts, ideas); meetings with QA, Manufacturing/MSAT, IT, the CSV/Quality team, the DPO and leadership. In parallel, an assessment of architecture, critical pipelines, incident history, costs, data quality pain points and the GxP/validation status. *Deliverables:* current-state assessment, risk map, top pain points.

**Days 31–60: stabilize and earn trust.** Fix the top reliability and quality issues on critical (especially GxP) pipelines; introduce data product tiers, first SLOs and a clear incident process; set up a single intake with transparent prioritization; deliver one or two visible quick wins for the stakeholders who complained most. *Deliverables:* prioritized backlog, SLO dashboard, quick wins.

**Days 61–90: direction.** A target architecture and a 12–18-month roadmap (incremental, with a platform choice based on criteria and a PoC if needed), an org and hiring plan, governance with Quality, and an **AI readiness plan**: which use cases are valuable and what data foundations they need, classified by GxP risk. *Deliverables:* strategy, roadmap, budget, metrics.

**Principles:** understand before deciding, fix foundations before scaling AI, make trade-offs visible, and keep the team with me.`,
    },
  ],
};
