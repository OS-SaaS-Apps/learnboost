import { quiz, modules } from "./content";
import type { QuizAnswers } from "./progress";
import type { Module } from "./types";

export interface ModuleScore {
  module: Module;
  correct: number;
  unknown: number;
  total: number;
}

export function scoreByModule(answers: QuizAnswers): ModuleScore[] {
  return modules
    .map((m) => {
      const qs = quiz.filter((q) => q.module === m.id);
      return {
        module: m,
        correct: qs.filter((q) => answers[q.id] === q.answer).length,
        unknown: qs.filter((q) => answers[q.id] === -1 || answers[q.id] === undefined).length,
        total: qs.length,
      };
    })
    .filter((s) => s.total > 0);
}

export type Outcome = "learned" | "kept" | "lost" | "missed";

export function outcome(pre: number | undefined, post: number | undefined, answer: number): Outcome {
  const a = pre === answer;
  const b = post === answer;
  if (!a && b) return "learned";
  if (a && b) return "kept";
  if (a && !b) return "lost";
  return "missed";
}
