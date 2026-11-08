import type { MCQ } from "../types";
import { useProgress } from "../progress";
import { Markdown } from "./Markdown";
import { Mascot } from "./Mascot";

export function Check({ title, questions }: { title?: string; questions: MCQ[] }) {
  const { progress, update } = useProgress();
  const answered = questions.filter((q) => progress.checks[q.id] !== undefined);
  const correct = answered.filter((q) => progress.checks[q.id] === q.answer).length;

  const choose = (qid: string, i: number) =>
    update((p) => (p.checks[qid] !== undefined ? p : { ...p, checks: { ...p.checks, [qid]: i } }));

  const retry = () =>
    update((p) => {
      const checks = { ...p.checks };
      questions.forEach((q) => delete checks[q.id]);
      return { ...p, checks };
    });

  return (
    <section className="card check">
      <div className="card-head">
        <span className="tag tag-check">✅ Check</span>
        <h2>{title ?? "Knowledge check"}</h2>
        {answered.length === questions.length && (
          <span className="score">
            {correct}/{questions.length}
          </span>
        )}
      </div>
      <div className="check-grid">
        {questions.map((q, qi) => {
          const chosen = progress.checks[q.id];
          const done = chosen !== undefined;
          const ok = chosen === q.answer;
          return (
            <div className="mcq" key={q.id}>
              <p className="mcq-prompt">
                <span className="qnum">{qi + 1}</span>
                {q.prompt}
              </p>
              <div className="options">
                {q.options.map((o, i) => {
                  let cls = "option";
                  if (done && i === q.answer) cls += " correct";
                  else if (done && i === chosen) cls += " wrong";
                  return (
                    <button key={i} className={cls} disabled={done} onClick={() => choose(q.id, i)}>
                      {o}
                    </button>
                  );
                })}
              </div>
              {done && (
                <div className={`feedback ${ok ? "ok" : "ko"}`}>
                  <Mascot size={40} mood={ok ? "happy" : "oops"} />
                  <div>
                    <strong>{ok ? "Yes!" : "Not quite."}</strong>
                    <Markdown>{q.explanation}</Markdown>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {answered.length > 0 && (
        <button className="btn-link" onClick={retry}>
          Reset this check
        </button>
      )}
    </section>
  );
}
