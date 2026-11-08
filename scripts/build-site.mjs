#!/usr/bin/env node
/**
 * Builds every course app and assembles the GitHub Pages site in _site/.
 *
 * A course is any top-level folder with an app/package.json, e.g. DataEngineering/app.
 * It is published at /<kebab-case folder name>/ (DataEngineering -> /data-engineering/).
 * Optional "course" block in package.json: { title, description, duration, color }.
 *
 * Usage: node scripts/build-site.mjs [--skip-tests]
 * In CI (CI env var set) dependencies are installed with `npm ci`.
 */
import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "_site");
const inCI = !!process.env.CI;
const skipTests = process.argv.includes("--skip-tests");

const slug = (name) => name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function run(cmd, cwd) {
  console.log(`\n> ${cmd}   [${relative(root, cwd) || "."}]`);
  execSync(cmd, { cwd, stdio: "inherit" });
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const courses = [];
const folders = readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith(".") && !d.name.startsWith("_") && d.name !== "node_modules")
  .map((d) => d.name)
  .sort();

for (const folder of folders) {
  const app = join(root, folder, "app");
  const pkgPath = join(app, "package.json");
  if (!existsSync(pkgPath)) continue;

  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  if (inCI) run("npm ci", app);
  else if (!existsSync(join(app, "node_modules"))) run("npm install", app);
  if (!skipTests && pkg.scripts?.test) run("npm test", app);
  run("npm run build", app);

  const dist = join(app, "dist");
  if (!existsSync(join(dist, "index.html"))) throw new Error(`${folder}: build did not produce dist/index.html`);
  const s = slug(folder);
  cpSync(dist, join(out, s), { recursive: true });
  courses.push({
    slug: s,
    title: pkg.course?.title ?? folder,
    description: pkg.course?.description ?? pkg.description ?? "",
    duration: pkg.course?.duration ?? "",
    color: pkg.course?.color ?? "#C9B8FF",
  });
}

if (courses.length === 0) throw new Error("No course found: expected <Course>/app/package.json");

writeFileSync(join(out, "index.html"), landingPage(courses));
console.log(`\nSite ready in ${relative(process.cwd(), out) || out}: ${courses.map((c) => `/${c.slug}/`).join(", ")}`);

function landingPage(list) {
  const cards = list
    .map(
      (c) => `
      <li>
        <a class="course" href="./${esc(c.slug)}/" style="--tile:${esc(c.color)}">
          <span class="title">${esc(c.title)}</span>
          <span class="desc">${esc(c.description)}</span>
          ${c.duration ? `<span class="time">${esc(c.duration)}</span>` : ""}
        </a>
      </li>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>LearnBoost</title>
<meta name="description" content="Short, focused learning paths to move into a new role fast." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;800&display=swap" rel="stylesheet" />
<style>
  :root { --bg:#f7f2ff; --dots:#e9defb; --surface:#fff; --ink:#3b2a55; --muted:#7a6b94; --on:#3b2a55; color-scheme: light; }
  @media (prefers-color-scheme: dark) {
    :root { --bg:#1e1730; --dots:#2a2142; --surface:#2a2140; --ink:#f4ecff; --muted:#b8a9d8; color-scheme: dark; }
  }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100vh; background-color:var(--bg); background-image:radial-gradient(var(--dots) 1.6px, transparent 1.8px); background-size:26px 26px;
         color:var(--ink); font-family:"M PLUS Rounded 1c", "Segoe UI", system-ui, sans-serif; line-height:1.6; }
  main { padding: clamp(24px, 5vw, 72px) clamp(16px, 4vw, 64px); }
  h1 { font-size: clamp(2.4rem, 5vw, 4rem); line-height:1.1; margin:0 0 .5rem; font-weight:800; }
  .lede { font-size:1.15rem; color:var(--muted); max-width:60ch; margin:0 0 2.5rem; }
  ul { list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:22px; }
  .course { display:flex; flex-direction:column; gap:8px; height:100%; padding:24px; background:var(--tile); color:var(--on); text-decoration:none;
            border:3px solid var(--on); border-radius:28px; box-shadow:0 7px 0 var(--on); transition:transform .12s ease; }
  .course:hover { transform:translateY(-3px); }
  .course:focus-visible { outline:3px solid #4fa8ff; outline-offset:4px; }
  .title { font-size:1.4rem; font-weight:800; line-height:1.2; }
  .desc { flex:1; }
  .time { align-self:flex-start; font-weight:800; font-size:.85rem; padding:2px 12px; border-radius:999px; background:rgba(255,255,255,.7); }
  footer { margin-top:3rem; color:var(--muted); font-size:.9rem; }
  footer a { color:inherit; }
  @media (prefers-reduced-motion: reduce) { .course { transition:none; } }
</style>
</head>
<body>
<main>
  <h1>LearnBoost</h1>
  <p class="lede">Short, focused learning paths to move into a new role fast. Pick a course: your progress stays in your browser.</p>
  <ul>${cards}
  </ul>
  <footer>Open source on <a href="https://github.com/OS-SaaS-Apps/learnboost">GitHub</a>, MIT licence.</footer>
</main>
</body>
</html>
`;
}
