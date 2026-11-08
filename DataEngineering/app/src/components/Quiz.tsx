import { quiz, modules } from "../content";
import { useProgress, type QuizAnswers } from "../progress";
import { scoreByModule } from "../scoring";
import { Mascot } from "./Mascot";

export function Quiz({ mode }: { mode: "pre" | "post" }) {
  const { progress, update } = useProgress();
  const attempt = progress[mode];
  const draft = progress.drafts[mode];
  const answered = quiz.filter((q) => draft[q.id] !== undefined).length;

  const skip = () => {
    update((p) => ({ ...p, preSkipped: true }));
    window.location.hash = `#/m/${modules[0].id}`;
  };

  if (mode === "pre" && progress.preSkipped && !progress.pre) {
    const canStillTake = progress.completed.length === 0 && !progress.post;
    return (
      <div className="panel center-panel">
        <Mascot size={120} mood="sleepy" />
        <h1>You skipped the baseline quiz</h1>
        <p>The final quiz will show your score and the explanations, without a before/after comparison.</p>
        <div className="row center">
          <a className="btn btn-primary" href={`#/m/${modules[0].id}`}>
            Go to module 1
          </a>
          {canStillTake && (
            <button className="btn btn-soft" onClick={() => update((p) => ({ ...p, preSkipped: false }))}>
              Take it after all
            </button>
          )}
        </div>
      </div>
    );
  }

  if (mode === "post" && !progress.pre && !progress.preSkipped) {
    return (
      <div className="panel center-panel">
        <Mascot size={120} mood="oops" />
        <h1>Final quiz</h1>
        <p>You haven't taken the baseline quiz. Take it first to get a before/after comparison, or skip it.</p>
        <div className="row center">
          <a className="btn btn-primary" href="#/quiz/pre">
            Take the baseline quiz
          </a>
          <button className="btn btn-soft" onClick={() => update((p) => ({ ...p, preSkipped: true }))}>
            Skip the comparison
          </button>
        </div>
      </div>
    );
  }

  if (attempt) {
    const scores = scoreByModule(attempt.answers);
    const total = scores.reduce((s, x) => s + x.correct, 0);
    const min = Math.min(...scores.map((s) => s.correct));
    return (
      <div className="panel quiz-done">
        <div className="quiz-done-head">
          <Mascot size={130} mood={total >= quiz.length * 0.75 ? "wow" : total >= quiz.length / 2 ? "happy" : "oops"} />
          <div>
            <h1>{mode === "pre" ? "Baseline quiz done" : "Final quiz done"}</h1>
            <p className="big-score">
              {total} <span>/ {quiz.length}</span>
            </p>
          </div>
        </div>
        {mode === "pre" ? (
          <>
            <p>
              Correct answers stay hidden for now, so the final quiz measures what you learned. Your weakest topics are
              highlighted: spend a bit more time there.
            </p>
            <ul className="mini-scores">
              {scores.map((s) => (
                <li key={s.module.id} className={s.correct === min ? "weak" : ""}>
                  <span>{s.module.title}</span>
                  <strong>
                    {s.correct}/{s.total}
                  </strong>
                </li>
              ))}
            </ul>
            <a className="btn btn-primary" href={`#/m/${modules[0].id}`}>
              Start module 1
            </a>
          </>
        ) : (
          <a className="btn btn-primary" href="#/results">
            See your results
          </a>
        )}
      </div>
    );
  }

  const choose = (qid: string, i: number) =>
    update((p) => ({ ...p, drafts: { ...p.drafts, [mode]: { ...p.drafts[mode], [qid]: i } } }));

  const submit = () => {
    const answers: QuizAnswers = {};
    quiz.forEach((q) => (answers[q.id] = draft[q.id] ?? -1));
    update((p) => ({ ...p, [mode]: { answers, completedAt: new Date().toISOString() } }));
    window.scrollTo(0, 0);
  };

  const unfinishedModules = modules.filter((m) => !progress.completed.includes(m.id));

  return (
    <div className="quiz">
      <header className="page-head">
        <div>
          <h1>{mode === "pre" ? "Baseline quiz" : "Final quiz"}</h1>
          <p>
            {quiz.length} questions, about 15 minutes. Pick <em>I don't know</em> rather than guessing: it keeps the
            comparison honest.{" "}
            {mode === "pre" ? "Answers are not revealed after this quiz." : "These are the same questions as the baseline quiz."}
          </p>
          {mode === "post" && unfinishedModules.length > 0 && (
            <p className="note-warn">{unfinishedModules.length} module(s) not marked as completed yet. You can still take the quiz.</p>
          )}
        </div>
        {mode === "pre" && (
          <button className="btn btn-soft" onClick={skip}>
            Skip this quiz
          </button>
        )}
      </header>

      <div className="quiz-grid">
        {quiz.map((q, qi) => {
          const chosen = draft[q.id];
          return (
            <div className={`card mcq${chosen !== undefined ? " answered" : ""}`} key={q.id}>
              <p className="mcq-prompt">
                <span className="qnum">{qi + 1}</span>
                {q.prompt}
              </p>
              <div className="options">
                {q.options.map((o, i) => (
                  <button key={i} className={`option${chosen === i ? " selected" : ""}`} onClick={() => choose(q.id, i)}>
                    {o}
                  </button>
                ))}
                <button className={`option idk${chosen === -1 ? " selected" : ""}`} onClick={() => choose(q.id, -1)}>
                  I don't know
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="submit-bar">
        <div className="submit-progress">
          <div style={{ width: `${(answered / quiz.length) * 100}%` }} />
        </div>
        <span>
          {answered} / {quiz.length} answered
        </span>
        <button className="btn btn-primary" disabled={answered < quiz.length} onClick={submit}>
          Submit quiz
        </button>
      </div>
    </div>
  );
}
