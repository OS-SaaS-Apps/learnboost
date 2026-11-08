import { useRef, useState } from "react";
import { emptyProgress, normalize, useProgress } from "../progress";

export function Settings() {
  const { progress, update, replace } = useProgress();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const { aiEnabled, apiKey } = progress.settings;

  const setSettings = (patch: Partial<typeof progress.settings>) =>
    update((p) => ({ ...p, settings: { ...p.settings, ...patch } }));

  const exportProgress = () => {
    const data = { ...progress, settings: { ...progress.settings, apiKey: "" } };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `de-lead-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importProgress = async (file: File) => {
    try {
      const parsed = normalize(JSON.parse(await file.text()));
      replace({ ...parsed, settings: { ...parsed.settings, apiKey: progress.settings.apiKey } });
      setMsg("Progress imported.");
    } catch {
      setMsg("This file could not be read as progress data.");
    }
  };

  const reset = () => {
    if (confirm("Delete all progress, quiz results and answers? This cannot be undone.")) {
      replace({ ...emptyProgress(), settings: progress.settings });
      setMsg("Progress reset.");
    }
  };

  return (
    <div className="settings">
      <header className="page-head"><div><h1>Settings</h1><p>Optional AI feedback and your saved progress.</p></div></header>
      <div className="card">
        <h2>AI feedback (optional)</h2>
        <p>
          The course works fully without AI. If you enable this, interview answers can also be graded by Claude against
          the same rubric, with a follow-up question.
        </p>
        <label className="tick">
          <input type="checkbox" checked={aiEnabled} onChange={(e) => setSettings({ aiEnabled: e.target.checked })} />
          <span>Enable AI feedback</span>
        </label>
        {aiEnabled && (
          <>
            <label className="field">
              <span>Anthropic API key</span>
              <input
                type="password"
                value={apiKey}
                autoComplete="off"
                placeholder="sk-ant-…"
                onChange={(e) => setSettings({ apiKey: e.target.value })}
              />
            </label>
            <p className="muted small">
              The key is stored only in this browser and sent only to api.anthropic.com. Use this on a private machine.
              Model: Claude Opus 5.5.
            </p>
          </>
        )}
      </div>

      <div className="card">
        <h2>Progress</h2>
        <p className="muted">Progress is saved in this browser. Export it to back it up or move to another device.</p>
        <div className="row">
          <button className="btn btn-soft" onClick={exportProgress}>
            Export progress
          </button>
          <button className="btn btn-soft" onClick={() => fileRef.current?.click()}>
            Import progress
          </button>
          <button className="btn btn-danger" onClick={reset}>
            Reset everything
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => e.target.files?.[0] && importProgress(e.target.files[0])}
          />
        </div>
        {msg && <p className="small">{msg}</p>}
      </div>
    </div>
  );
}
