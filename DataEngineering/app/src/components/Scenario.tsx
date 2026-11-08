import type { ScenarioStep } from "../types";
import { useProgress } from "../progress";
import { Markdown } from "./Markdown";
import { Mascot, type Mood } from "./Mascot";

const LABEL = ["Weak choice", "Acceptable", "Best choice"];
const MOOD: Mood[] = ["oops", "happy", "wow"];

export function Scenario({ id, title, context, steps }: { id: string; title: string; context: string; steps: ScenarioStep[] }) {
  const { progress, update } = useProgress();
  const choices = progress.scenarios[id] ?? [];
  const current = choices.length;
  const finished = current >= steps.length;
  const total = choices.reduce((s, c, i) => s + (steps[i]?.options[c]?.score ?? 0), 0);

  const choose = (i: number) =>
    update((p) => ({ ...p, scenarios: { ...p.scenarios, [id]: [...(p.scenarios[id] ?? []), i] } }));
  const restart = () =>
    update((p) => {
      const scenarios = { ...p.scenarios };
      delete scenarios[id];
      return { ...p, scenarios };
    });

  return (
    <section className="card scenario">
      <div className="card-head">
        <span className="tag tag-scenario">🎬 Scenario</span>
        <h2>{title}</h2>
        {finished && (
          <span className="score">
            {total}/{steps.length * 2}
          </span>
        )}
      </div>
      <div className="scenario-body">
        <div className="scenario-context">
          <Markdown>{context}</Markdown>
          <ol className="step-dots" aria-label="Scenario progress">
            {steps.map((_, i) => (
              <li key={i} className={i < current ? `s${steps[i].options[choices[i]].score}` : i === current ? "now" : ""}>
                {i + 1}
              </li>
            ))}
          </ol>
        </div>
        <div className="scenario-steps">
          {steps.map((step, si) => {
            if (si > current) return null;
            const chosen = choices[si];
            const done = chosen !== undefined;
            const best = step.options.find((o) => o.score === 2);
            return (
              <div className="step" key={si}>
                <p className="step-title">
                  Step {si + 1} of {steps.length}
                </p>
                <Markdown>{step.prompt}</Markdown>
                <div className="options">
                  {step.options.map((o, i) => {
                    let cls = "option";
                    if (done) {
                      if (i === chosen) cls += ` chosen s${o.score}`;
                      else if (o.score === 2) cls += " best-hint";
                    }
                    return (
                      <button key={i} className={cls} disabled={done} onClick={() => choose(i)}>
                        {o.text}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div className={`feedback s${step.options[chosen].score}`}>
                    <Mascot size={40} mood={MOOD[step.options[chosen].score]} />
                    <div>
                      <strong>{LABEL[step.options[chosen].score]}.</strong>
                      <Markdown>{step.options[chosen].feedback}</Markdown>
                      {step.options[chosen].score < 2 && best && (
                        <div className="best">
                          <strong>Best choice:</strong> {best.text}
                          <Markdown>{best.feedback}</Markdown>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {current > 0 && (
            <button className="btn-link" onClick={restart}>
              Restart scenario
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
