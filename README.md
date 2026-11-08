# LearnBoost

Short, focused learning paths that help experienced professionals move into a new role fast. Each course is a self-contained interactive web app: no backend, progress saved in the browser, optional AI feedback.

## Courses

| Course | For | Duration | Folder |
|---|---|---|---|
| **Data Engineering Lead Prep** | A software engineering team lead preparing for Data Engineering Team Lead interviews (Swiss pharma context) | 4 hours | [`DataEngineering/`](DataEngineering/) |

### Data Engineering Lead Prep

- A baseline quiz (optional), 8 modules plus an interview rehearsal, then the same quiz again with a before/after comparison
- Each module: a bridge from software engineering, concepts, a decision scenario, a knowledge check, the lead's lens, and an interview question with a rubric and a model answer
- Pharma context throughout: GxP, data integrity (ALCOA+), Part 11 / Annex 11 / draft Annex 22, risk-based validation, Swiss privacy law
- Optional AI grading of interview answers with Claude (bring your own API key)

Design notes: [`DataEngineering/course_plan_v2.md`](DataEngineering/course_plan_v2.md) · App details: [`DataEngineering/app/README.md`](DataEngineering/app/README.md)

## Run a course locally

Requirements: Node.js 20 or later.

```bash
cd DataEngineering/app
npm install
npm run dev      # opens on http://localhost:5173
npm test         # content integrity and scoring tests
npm run build    # static site in dist/
```

The build output is a static site and can be hosted on any static host (e.g., GitHub Pages).

## Repository layout

```
Education/
├── README.md
├── LICENSE
└── DataEngineering/
    ├── initial_course_plan.md   # first draft of the program (French)
    ├── course_plan_v2.md        # revised 4-hour design
    └── app/                     # interactive course (React + TypeScript + Vite)
        └── src/content/         # all course content: quiz.ts, m1.ts … m9.ts
```

## Contributing

Course content lives in plain TypeScript files under `src/content/`. Edit a module, run `npm test` to check the content (answer keys, scenario scoring, time budget), and open a pull request.

## License

[MIT](LICENSE)
