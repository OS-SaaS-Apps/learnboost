import { modules, quiz } from "../content";
import { useProgress } from "../progress";
import { moduleColor, QUIZ_COLOR } from "../theme";
import { Mascot } from "./Mascot";

export function Home() {
  const { progress, update } = useProgress();
  const totalMinutes = 15 + modules.reduce((s, m) => s + m.minutes, 0) + 15;
  const started = !!progress.pre || !!progress.preSkipped;
  const nextModule = modules.find((m) => !progress.completed.includes(m.id));

  const skip = () => {
    update((p) => ({ ...p, preSkipped: true }));
    window.location.hash = `#/m/${modules[0].id}`;
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>From software lead to data engineering lead, in {Math.round(totalMinutes / 60)} hours</h1>
          <p className="hero-lede">
            A focused interview prep for an experienced software engineering manager aiming at a Data Engineering Team
            Lead role in Swiss pharma. No coding. You'll learn to understand, discuss, challenge and decide like a data
            engineering lead.
          </p>
          <div className="hero-actions">
            {!started ? (
              <>
                <a className="btn btn-primary btn-big" href="#/quiz/pre">
                  Take the baseline quiz
                </a>
                <button className="btn btn-soft btn-big" onClick={skip}>
                  Skip it and start module 1
                </button>
              </>
            ) : nextModule ? (
              <a className="btn btn-primary btn-big" href={`#/m/${nextModule.id}`}>
                Continue with module {nextModule.number}: {nextModule.title}
              </a>
            ) : (
              <a className="btn btn-primary btn-big" href={progress.post ? "#/results" : "#/quiz/post"}>
                {progress.post ? "See your results" : "Take the final quiz"}
              </a>
            )}
          </div>
          {!started && (
            <p className="hero-note">
              The baseline quiz takes 15 minutes. Taking it lets you compare before and after at the end; skipping it
              still gives you a final score.
            </p>
          )}
        </div>
        <div className="hero-art">
          <div className="bubble">Hi! I'm Byte. Let's get you ready for that interview.</div>
          <Mascot size={210} mood="happy" className="bob" />
        </div>
      </section>

      <h2 className="section-title">Your path</h2>
      <ol className="tiles">
        <li>
          <a href="#/quiz/pre" className={`tile${started ? " done" : ""}`} style={{ ["--tile" as string]: QUIZ_COLOR }}>
            <span className="tile-num">?</span>
            <span className="tile-title">Baseline quiz</span>
            <span className="tile-sub">
              {quiz.length} questions, 15 min
              {progress.preSkipped ? ". Skipped" : progress.pre ? ". Done" : ""}
            </span>
          </a>
        </li>
        {modules.map((m) => {
          const done = progress.completed.includes(m.id);
          return (
            <li key={m.id}>
              <a href={`#/m/${m.id}`} className={`tile${done ? " done" : ""}`} style={{ ["--tile" as string]: moduleColor(m.id) }}>
                <span className="tile-num">{done ? "✓" : m.number}</span>
                <span className="tile-title">{m.title}</span>
                <span className="tile-sub">{m.summary}</span>
                <span className="tile-time">{m.minutes} min</span>
              </a>
            </li>
          );
        })}
        <li>
          <a href="#/quiz/post" className={`tile${progress.post ? " done" : ""}`} style={{ ["--tile" as string]: QUIZ_COLOR }}>
            <span className="tile-num">!</span>
            <span className="tile-title">Final quiz</span>
            <span className="tile-sub">The same {quiz.length} questions, then your results by module and by question</span>
            <span className="tile-time">15 min</span>
          </a>
        </li>
      </ol>
    </div>
  );
}
