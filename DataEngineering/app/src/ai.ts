import Anthropic from "@anthropic-ai/sdk";
import type { OpenQuestion } from "./types";

const SYSTEM = `You are a demanding but fair interviewer for a Data Engineering Team Lead role in Swiss pharma.
The candidate is an experienced software engineering team lead moving into data engineering leadership.
Grade the candidate's answer against the rubric. Be concrete and brief. Use Markdown with exactly these sections:

## Score
One line: "X / 4" using this scale: 0-1 insufficient, 2 theoretical knowledge, 3 autonomous in technical discussions, 4 able to lead and challenge. Then one sentence of justification.

## Rubric
One bullet per rubric point: "Covered", "Partial" or "Missing", followed by a short reason.

## Red flags
Bullets for any red flag present, or "None".

## How to improve
Up to 3 bullets, each an actionable improvement.

## Follow-up question
One probing follow-up question a real interviewer would ask next.`;

export async function gradeWithClaude(apiKey: string, q: OpenQuestion, answer: string): Promise<string> {
  // The key is the learner's own and the app runs locally/privately, so browser use is acceptable here.
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

  const user = [
    `<question>\n${q.prompt}\n</question>`,
    `<rubric>\n${q.rubric.map((r, i) => `${i + 1}. ${r}`).join("\n")}\n</rubric>`,
    q.redFlags?.length ? `<red_flags>\n${q.redFlags.map((r) => `- ${r}`).join("\n")}\n</red_flags>` : "",
    `<reference_answer>\n${q.modelAnswer}\n</reference_answer>`,
    `<candidate_answer>\n${answer}\n</candidate_answer>`,
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "medium" },
      system: SYSTEM,
      messages: [{ role: "user", content: user }],
    });

    if (response.stop_reason === "refusal") {
      return "_The model declined to grade this answer. Try rephrasing your answer._";
    }
    const text = response.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();
    if (response.stop_reason === "max_tokens") return `${text}\n\n_(Feedback was truncated.)_`;
    return text || "_No feedback returned._";
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) throw new Error("Invalid API key. Check it in Settings.");
    if (error instanceof Anthropic.PermissionDeniedError) throw new Error("This API key is not allowed to use this model.");
    if (error instanceof Anthropic.RateLimitError) throw new Error("Rate limited. Wait a moment and try again.");
    if (error instanceof Anthropic.APIConnectionError) throw new Error("Could not reach the Claude API. Check your connection.");
    if (error instanceof Anthropic.APIError) throw new Error(`Claude API error ${error.status ?? ""}: ${error.message}`);
    throw error;
  }
}
