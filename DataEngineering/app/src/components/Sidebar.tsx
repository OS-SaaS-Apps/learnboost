import { modules } from "../content";
import { useProgress } from "../progress";
import { moduleColor, QUIZ_COLOR } from "../theme";
import { Mascot } from "./Mascot";

export function Sidebar({ route }: { route: string }) {
  const { progress } = useProgress();
  const steps = modules.length + 2;
  const preDone = !!progress.pre || !!progress.preSkipped;
  const doneSteps = (preDone ? 1 : 0) + progress.completed.length + (progress.post ? 1 : 0);
  const pct = Math.round((doneSteps / steps) * 100);

  const item = (href: string, key: string, label: string, badge: string, color: string, done: boolean, skipped = false) => (
    <li key={key}>
      <a href={href} className={`path-item${route === href.slice(2) ? " current" : ""}${done ? " done" : ""}`}>
        <span className="path-badge" style={{ background: done ? color : undefined }}>
          {done ? (skipped ? "–" : "✓") : badge}
        </span>
        <span className="path-label">{label}</span>
      </a>
    </li>
  );

  return (
    <aside className="sidebar">
      <a href="#/" className="brand">
        <Mascot size={44} mood={pct === 100 ? "wow" : "happy"} />
        <span>
          <strong>DE Lead Prep</strong>
          <small>Software lead to data lead</small>
        </span>
      </a>

      <div className="overall" aria-label={`Course progress ${pct}%`}>
        <div className="overall-bar">
          <div style={{ width: `${pct}%` }} />
        </div>
        <span>{pct}% done</span>
      </div>

      <nav className="quicknav">
        <a href="#/" className={route === "" ? "active" : ""}>
          Course
        </a>
        <a href="#/results" className={route === "results" ? "active" : ""}>
          Results
        </a>
        <a href="#/settings" className={route === "settings" ? "active" : ""}>
          Settings
        </a>
      </nav>

      <ol className="path">
        {item("#/quiz/pre", "pre", progress.preSkipped ? "Baseline quiz (skipped)" : "Baseline quiz", "?", QUIZ_COLOR, preDone, !!progress.preSkipped)}
        {modules.map((m) =>
          item(`#/m/${m.id}`, m.id, m.title, String(m.number), moduleColor(m.id), progress.completed.includes(m.id)),
        )}
        {item("#/quiz/post", "post", "Final quiz", "!", QUIZ_COLOR, !!progress.post)}
      </ol>
    </aside>
  );
}
