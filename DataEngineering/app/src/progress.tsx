import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

/** -1 means "I don't know". */
export type QuizAnswers = Record<string, number>;

export interface QuizAttempt {
  answers: QuizAnswers;
  completedAt: string;
}

export interface OpenState {
  text: string;
  ticked: number[];
  revealed: boolean;
  ai?: string;
}

export interface Progress {
  version: 1;
  pre?: QuizAttempt;
  /** The learner chose to skip the baseline quiz: the final quiz then shows a score without comparison. */
  preSkipped?: boolean;
  post?: QuizAttempt;
  drafts: { pre: QuizAnswers; post: QuizAnswers };
  checks: Record<string, number>;
  scenarios: Record<string, number[]>;
  open: Record<string, OpenState>;
  completed: string[];
  settings: { aiEnabled: boolean; apiKey: string };
}

const STORAGE_KEY = "de-lead-course-v1";

export function emptyProgress(): Progress {
  return {
    version: 1,
    drafts: { pre: {}, post: {} },
    checks: {},
    scenarios: {},
    open: {},
    completed: [],
    settings: { aiEnabled: false, apiKey: "" },
  };
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    return normalize(JSON.parse(raw));
  } catch {
    return emptyProgress();
  }
}

/** Merge a parsed object onto defaults so older or partial files still load. */
export function normalize(data: unknown): Progress {
  const base = emptyProgress();
  if (!data || typeof data !== "object") return base;
  const d = data as Partial<Progress>;
  return {
    ...base,
    ...d,
    version: 1,
    drafts: { ...base.drafts, ...(d.drafts ?? {}) },
    settings: { ...base.settings, ...(d.settings ?? {}) },
  };
}

interface Ctx {
  progress: Progress;
  update: (fn: (p: Progress) => Progress) => void;
  replace: (p: Progress) => void;
}

const ProgressContext = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      /* storage unavailable: progress lives in memory only */
    }
  }, [progress]);

  const update = useCallback((fn: (p: Progress) => Progress) => setProgress((p) => fn(p)), []);
  const replace = useCallback((p: Progress) => setProgress(p), []);

  return <ProgressContext.Provider value={{ progress, update, replace }}>{children}</ProgressContext.Provider>;
}

export function useProgress(): Ctx {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}
