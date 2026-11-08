import { useState } from "react";
import type { OpenQuestion } from "../types";
import { useProgress, type OpenState } from "../progress";
import { Markdown } from "./Markdown";

const EMPTY: OpenState = { text: "", ticked: [], revealed: false };

/** Map the share of rubric points covered to the 0-4 interview scale. */
export function rubricScore(ticked: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((ticked / total) * 4);
}

export function OpenAnswer({ q, title }: { q: OpenQuestion; title?: string }) {
  const { progress, update } = useProgress();
  const state = progress.open[q.id] ?? EMPTY;
  const [showRubric, setShowRubric] = useState(state.revealed);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ai = progress.settings.aiEnabled && progress.settings.apiKey.trim().length > 0;

  const set = (patch: Partial<OpenState>) =>
    update((p) => ({ ...p, open: { ...p.open, [q.id]: { ...(p.open[q.id] ?? EMPTY), ...patch } } }));

  const toggle = (i: number) =>
    set({ ticked: state.ticked.includes(i) ? state.ticked.filter((t) => t !== i) : [...state.ticked, i] });

  const askAI = async () => {
    setLoading(true);
    setError(null);
    try {
      // Loaded on demand so the SDK isn't part of the main bundle when AI is off.
      const { gradeWithClaude } = await import("../ai");
      const feedback = await gradeWithClaude(progress.settings.apiKey.trim(), q, state.text);
      set({ ai: feedback });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  const tooShort = state.text.trim().length < 40;

  return (
    <section className="card open">
      <div className="card-head">
        <span className="tag tag-open">🎤 Interview question</span>
        <h2>{title ?? "Answer as you would in an interview"}</h2>
      </div>
      <p className="open-prompt">{q.prompt}</p>
      <div className="open-grid">
        <div className="open-answer">
          <textarea
            value={state.text}
            onChange={(e) => set({ text: e.target.value })}
            placeholder="Write your answer (bullet points are fine). Aim for what you would say in 2 minutes."
            rows={10}
            aria-label="Your answer"
          />
          <div className="row">
            {!showRubric && (
              <button className="btn btn-primary" disabled={tooShort} onClick={() => setShowRubric(true)}>
                Assess my answer
              </button>
            )}
            {ai && (
              <button className="btn btn-ai" disabled={tooShort || loading} onClick={askAI}>
                {loading ? "Asking Claude…" : state.ai ? "Ask Claude again" : "Get AI feedback"}
              </button>
            )}
            {tooShort && <span className="hint">Write at least a few sentences first.</span>}
          </div>
          {error && <div className="feedback ko">{error}</div>}
        </div>

        {(showRubric || state.ai) && (
          <div className="open-review">
            {showRubric && (
              <div className="rubric">
                <h3>Tick what your answer actually covers</h3>
                {q.rubric.map((r, i) => (
                  <label key={i} className="tick">
                    <input type="checkbox" checked={state.ticked.includes(i)} onChange={() => toggle(i)} />
                    <span>{r}</span>
                  </label>
                ))}
                {q.redFlags && q.redFlags.length > 0 && (
                  <>
                    <h3>Red flags to avoid</h3>
                    <ul className="redflags">
                      {q.redFlags.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </>
                )}
                <p className="self-score">
                  Self-score <strong>{rubricScore(state.ticked.length, q.rubric.length)} / 4</strong>
                  <span className="muted small">
                    0–1 insufficient, 2 theoretical, 3 autonomous, 4 can lead and challenge
                  </span>
                </p>
                {!state.revealed && (
                  <button className="btn btn-soft" onClick={() => set({ revealed: true })}>
                    Show model answer
                  </button>
                )}
              </div>
            )}
            {state.ai && (
              <div className="ai-feedback">
                <h3>AI feedback</h3>
                <Markdown>{state.ai}</Markdown>
              </div>
            )}
          </div>
        )}
      </div>
      {state.revealed && (
        <div className="model-answer">
          <h3>Model answer</h3>
          <Markdown>{q.modelAnswer}</Markdown>
        </div>
      )}
    </section>
  );
}
