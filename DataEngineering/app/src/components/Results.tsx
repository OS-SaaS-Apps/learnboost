import { quiz, modules } from "../content";
import { useProgress } from "../progress";
import { outcome, scoreByModule, type Outcome } from "../scoring";
import { moduleColor } from "../theme";
import { Markdown } from "./Markdown";
import { Mascot } from "./Mascot";

const OUTCOME_LABEL: Record<Outcome, string> = {
  learned: "Learned (wrong before, right after)",
  missed: "Still to review",
  lost: "Slipped (right before, wrong after)",
  kept: "Already known",
};
const ORDER: Outcome[] = ["missed", "lost", "learned", "kept"];

function pct(n: number, d: number) {
  return d === 0 ? 0 : Math.round((n / d) * 100);
}

function answerText(qid: string, idx: number | undefined) {
  const q = quiz.find((x) => x.id === qid)!;
  if (idx === undefined || idx === -1) return "I don't know";
  return q.options[idx];
}

export function Results() {
  const { progress } = useProgress();
  const { pre, post } = progress;

  if (!pre && !post) {
    return (
      <div className="panel center-panel">
        <Mascot size={120} mood="sleepy" />
        <h1>No results yet</h1>
        <p>Results appear once you've taken a quiz.</p>
        <div className="row center">
          {!progress.preSkipped && (
            <a className="btn btn-primary" href="#/quiz/pre">
              Take the baseline quiz
            </a>
          )}
          <a className="btn btn-soft" href="#/quiz/post">
            Go to the final quiz
          </a>
        </div>
      </div>
    );
  }

  const preScores = pre ? scoreByModule(pre.answers) : null;
  const postScores = post ? scoreByModule(post.answers) : null;
  const sum = (s: typeof preScores, k: "correct" | "unknown") => s?.reduce((a, x) => a + x[k], 0) ?? 0;
  const preTotal = sum(preScores, "correct");
  const postTotal = sum(postScores, "correct");
  const comparison = !!pre && !!post;
  const mood = post ? (postTotal >= quiz.length * 0.75 ? "wow" : "happy") : "happy";

  // Without a baseline, each question is simply right or to review.
  const groups: { key: string; label: string; ids: string[] }[] = comparison
    ? ORDER.map((o) => ({
        key: o,
        label: OUTCOME_LABEL[o],
        ids: quiz.filter((q) => outcome(pre!.answers[q.id], post!.answers[q.id], q.answer) === o).map((q) => q.id),
      }))
    : post
      ? [
          { key: "missed", label: "To review", ids: quiz.filter((q) => post.answers[q.id] !== q.answer).map((q) => q.id) },
          { key: "kept", label: "Right", ids: quiz.filter((q) => post.answers[q.id] === q.answer).map((q) => q.id) },
        ]
      : [];

  return (
    <div className="results">
      <header className="results-head">
        <Mascot size={120} mood={mood} />
        <div>
          <h1>{comparison ? "Before and after" : post ? "Your final results" : "Your baseline"}</h1>
          {!post && <p>Work through the modules, then take the final quiz to see your progress.</p>}
          {post && !pre && <p>You skipped the baseline quiz, so there is no before/after comparison.</p>}
        </div>
        <div className="kpis">
          {pre && (
            <div className="kpi">
              <span className="kpi-label">Baseline</span>
              <span className="kpi-value">{pct(preTotal, quiz.length)}%</span>
              <span className="kpi-sub">
                {preTotal}/{quiz.length} right, {sum(preScores, "unknown")} "I don't know"
              </span>
            </div>
          )}
          {post && (
            <div className="kpi">
              <span className="kpi-label">Final</span>
              <span className="kpi-value">{pct(postTotal, quiz.length)}%</span>
              <span className="kpi-sub">
                {postTotal}/{quiz.length} right, {sum(postScores, "unknown")} "I don't know"
              </span>
            </div>
          )}
          {comparison && (
            <div className="kpi kpi-hero">
              <span className="kpi-label">Progress</span>
              <span className={`kpi-value ${postTotal - preTotal >= 0 ? "up" : "down"}`}>
                {postTotal - preTotal >= 0 ? "+" : ""}
                {postTotal - preTotal}
              </span>
              <span className="kpi-sub">questions</span>
            </div>
          )}
        </div>
      </header>

      <div className="results-grid">
        <section className="card">
          <h2>By module</h2>
          <div className="bars">
            {(preScores ?? postScores)!.map((s, i) => {
              const b = preScores?.[i];
              const a = postScores?.[i];
              return (
                <div className="bar-row" key={s.module.id}>
                  <a className="bar-label" href={`#/m/${s.module.id}`}>
                    <span className="dot" style={{ background: moduleColor(s.module.id) }} />
                    {s.module.title}
                  </a>
                  <div className="bar-pair">
                    {b && (
                      <div className="bar">
                        <div className="bar-fill pre" style={{ width: `${pct(b.correct, b.total)}%` }} />
                        <span className="bar-text">
                          Before {b.correct}/{b.total}
                        </span>
                      </div>
                    )}
                    {a && (
                      <div className="bar">
                        <div
                          className="bar-fill post"
                          style={{ width: `${pct(a.correct, a.total)}%`, background: moduleColor(s.module.id) }}
                        />
                        <span className="bar-text">
                          After {a.correct}/{a.total}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {post && (
          <section className="card">
            <h2>By question</h2>
            {groups.map((g) => {
              if (g.ids.length === 0) return null;
              return (
                <details key={g.key} open={g.key === "missed" || g.key === "lost"} className={`outcome outcome-${g.key}`}>
                  <summary>
                    {g.label} <span className="count">{g.ids.length}</span>
                  </summary>
                  {g.ids.map((id) => {
                    const q = quiz.find((x) => x.id === id)!;
                    const m = modules.find((x) => x.id === q.module)!;
                    return (
                      <div className="q-review" key={q.id}>
                        <p className="mcq-prompt">{q.prompt}</p>
                        <p className="small">
                          {pre && (
                            <>
                              Before: <em>{answerText(q.id, pre.answers[q.id])}</em>
                              <br />
                            </>
                          )}
                          {pre ? "After" : "Your answer"}: <em>{answerText(q.id, post.answers[q.id])}</em>
                          <br />
                          Right answer: <strong>{q.options[q.answer]}</strong>
                        </p>
                        <Markdown>{q.explanation}</Markdown>
                        <a className="small" href={`#/m/${m.id}`}>
                          Review module {m.number}: {m.title}
                        </a>
                      </div>
                    );
                  })}
                </details>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
}
