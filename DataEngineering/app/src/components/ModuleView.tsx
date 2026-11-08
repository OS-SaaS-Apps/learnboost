import { useEffect, useRef, useState } from "react";
import type { Module, Section } from "../types";
import { useProgress, type Progress } from "../progress";
import { modules } from "../content";
import { moduleColor } from "../theme";
import { Markdown } from "./Markdown";
import { Check } from "./Check";
import { Scenario } from "./Scenario";
import { OpenAnswer } from "./OpenAnswer";
import { Mascot, type Mood } from "./Mascot";

function SectionView({ s }: { s: Section }) {
  switch (s.kind) {
    case "text":
      return (
        <section className="card text">
          <h2>{s.title}</h2>
          <Markdown>{s.body}</Markdown>
        </section>
      );
    case "lead":
      return (
        <section className="card lead">
          <div className="card-head">
            <span className="tag tag-lead">👑 Lead's lens</span>
            <h2>{s.title ?? "What the lead decides, and what interviewers listen for"}</h2>
          </div>
          <Markdown>{s.body}</Markdown>
        </section>
      );
    case "bridge":
      return (
        <section className="card bridge">
          <div className="card-head">
            <span className="tag tag-bridge">🌉 Bridge</span>
            <h2>{s.title}</h2>
          </div>
          {s.intro && <Markdown>{s.intro}</Markdown>}
          <div className="bridge-grid">
            <div className="bridge-h">You know this from software</div>
            <div className="bridge-h">In data, it differs because…</div>
            {s.rows.map((r, i) => (
              <div className="bridge-row" key={i}>
                <div className="bridge-know">
                  <Markdown>{r.know}</Markdown>
                </div>
                <div className="bridge-data">
                  <Markdown>{r.data}</Markdown>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    case "check":
      return <Check title={s.title} questions={s.questions} />;
    case "scenario":
      return <Scenario id={s.id} title={s.title} context={s.context} steps={s.steps} />;
    case "open":
      return <OpenAnswer q={s} title={s.title} />;
  }
}

interface TocEntry {
  icon: string;
  label: string;
  /** undefined for reading sections, true/false for activities */
  done?: boolean;
}

/** Table-of-contents entry for a section, with completion state for activities. */
function tocEntry(s: Section, p: Progress): TocEntry {
  switch (s.kind) {
    case "text":
      return { icon: "📖", label: s.title };
    case "bridge":
      return { icon: "🌉", label: s.title };
    case "lead":
      return { icon: "👑", label: "Lead's lens" };
    case "scenario":
      return { icon: "🎬", label: s.title.replace(/^"|"$/g, ""), done: (p.scenarios[s.id]?.length ?? 0) >= s.steps.length };
    case "check":
      return { icon: "✅", label: s.title ?? "Knowledge check", done: s.questions.every((q) => p.checks[q.id] !== undefined) };
    case "open": {
      const st = p.open[s.id];
      return { icon: "🎤", label: s.title ? `Interview: ${s.title}` : "Interview question", done: !!st && (st.revealed || !!st.ai) };
    }
  }
}

export function ModuleView({ module: m }: { module: Module }) {
  const { progress, update } = useProgress();
  const done = progress.completed.includes(m.id);
  const idx = modules.findIndex((x) => x.id === m.id);
  const next = modules[idx + 1];
  const color = moduleColor(m.id);
  const toc = m.sections.map((s) => tocEntry(s, progress));
  const acts = toc.filter((t) => t.done !== undefined);
  const doneActs = acts.filter((t) => t.done).length;
  const mood: Mood = done || doneActs === acts.length ? "wow" : doneActs > 0 ? "happy" : "sleepy";

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Highlight the section currently being read.
  useEffect(() => {
    const els = sectionRefs.current.filter((e): e is HTMLDivElement => !!e);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          const first = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          setActive(Number((first.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [m.id]);

  const jump = (i: number) => sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });

  const nextHref = next ? `#/m/${next.id}` : "#/quiz/post";
  const nextLabel = next ? `module ${next.number}: ${next.title}` : "the final quiz";

  const finish = () => {
    if (!done) update((p) => ({ ...p, completed: [...p.completed, m.id] }));
    window.location.hash = nextHref;
  };
  const undo = () => update((p) => ({ ...p, completed: p.completed.filter((c) => c !== m.id) }));

  return (
    <article className="module" style={{ ["--mod" as string]: color }}>
      <header className="banner">
        <div className="banner-text">
          <div className="chips">
            <span className="chip">Module {m.number}</span>
            <span className="chip">{m.minutes} min</span>
            {done && <span className="chip chip-done">Completed</span>}
          </div>
          <h1>{m.title}</h1>
          <p>{m.summary}</p>
        </div>
        <Mascot size={150} mood={mood} color={color} />
      </header>

      <div className="module-layout">
        <div className="module-content">
          <section className="card objectives-card">
            <h2>After this module you can</h2>
            <ul className="objectives">
              {m.objectives.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </section>

          {m.sections.map((s, i) => (
            <div key={i} className="section-anchor" data-index={i} ref={(el) => {
                sectionRefs.current[i] = el;
              }}>
              <SectionView s={s} />
            </div>
          ))}

          <footer className="finish">
            <Mascot size={90} mood={mood} color={color} />
            <div className="finish-text">
              <h2>{done ? "Module completed" : "Done with this module?"}</h2>
              <p>
                {acts.length > 0 && doneActs < acts.length
                  ? `You've finished ${doneActs} of ${acts.length} activities. You can still move on and come back later.`
                  : "Nice work. On to the next one."}
              </p>
            </div>
            <div className="finish-actions">
              <button className="btn btn-primary btn-big" onClick={finish}>
                {done ? `Go to ${nextLabel}` : `Finish and go to ${nextLabel}`}
              </button>
              {done && (
                <button className="btn-link" onClick={undo}>
                  Mark as not completed
                </button>
              )}
            </div>
          </footer>
        </div>

        <nav className="toc" aria-label="In this module">
          <h2>In this module</h2>
          <ol>
            {toc.map((t, i) => (
              <li key={i}>
                <button className={`toc-item${i === active ? " active" : ""}`} onClick={() => jump(i)}>
                  <span className="toc-icon" aria-hidden="true">
                    {t.icon}
                  </span>
                  <span className="toc-label">{t.label}</span>
                  {t.done !== undefined && (
                    <span className={`toc-check${t.done ? " done" : ""}`} aria-label={t.done ? "done" : "to do"}>
                      {t.done ? "✓" : ""}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ol>
          <p className="toc-sum">
            Activities done: <strong>{doneActs} / {acts.length}</strong>
          </p>
        </nav>
      </div>
    </article>
  );
}
