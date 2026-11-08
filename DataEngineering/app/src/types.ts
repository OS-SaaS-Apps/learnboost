export interface MCQ {
  id: string;
  prompt: string;
  options: string[];
  /** Index of the correct option in `options`. */
  answer: number;
  explanation: string;
}

/** A quiz question belongs to a module so results can be compared per topic. */
export interface QuizQuestion extends MCQ {
  module: string;
}

export interface BridgeRow {
  know: string;
  data: string;
}

export interface ScenarioOption {
  text: string;
  /** 2 = best, 1 = acceptable, 0 = poor */
  score: 0 | 1 | 2;
  feedback: string;
}

export interface ScenarioStep {
  prompt: string;
  options: ScenarioOption[];
}

export interface OpenQuestion {
  id: string;
  prompt: string;
  /** Points a strong answer covers; used for self-assessment and AI grading. */
  rubric: string[];
  redFlags?: string[];
  modelAnswer: string;
}

export type Section =
  | { kind: "text"; title: string; body: string }
  | { kind: "lead"; title?: string; body: string }
  | { kind: "bridge"; title: string; intro?: string; rows: BridgeRow[] }
  | { kind: "check"; id: string; title?: string; questions: MCQ[] }
  | { kind: "scenario"; id: string; title: string; context: string; steps: ScenarioStep[] }
  | ({ kind: "open"; title?: string } & OpenQuestion);

export interface Module {
  id: string;
  number: number;
  title: string;
  minutes: number;
  summary: string;
  objectives: string[];
  sections: Section[];
}
