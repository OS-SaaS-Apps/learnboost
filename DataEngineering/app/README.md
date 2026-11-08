# DE Lead Prep

Interactive 4-hour course to prepare a Software Engineering lead for Data Engineering Team Lead interviews (Swiss pharma).
Design: `../course_plan_v2.md`.

## Run

```
npm install
npm run dev        # http://localhost:5173
```

`npm run build` creates a static site in `dist/` that can be opened from any private static host (`npm run preview` to check it).

## Use

1. Baseline quiz (24 questions; answers are not revealed). It can be skipped; the final quiz then shows a score without the before/after comparison.
2. Modules 1–9: bridge, concepts, scenario, check, lead's lens, interview question (rubric + model answer)
3. Final quiz (same 24 questions)
4. Results: before/after per module and per question

Progress is stored in the browser; use **Settings → Export/Import** to back it up.
**AI feedback** is optional: enable it in Settings with an Anthropic API key (stored only in this browser, used to call Claude Opus 5.5 directly from the page, with server-side refusal fallback enabled).

## Edit content

All content is in `src/content/` (`quiz.ts`, `m1.ts` … `m9.ts`). `npm test` checks content integrity (time budget, ids, answer keys, scenario scoring, rubrics) and the scoring logic.
