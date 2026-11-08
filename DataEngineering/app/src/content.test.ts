// Runs with Node's built-in test runner (see "test" script): Vite bundles this file, Node executes it.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { modules, quiz } from "./content";
import { outcome, scoreByModule } from "./scoring";
import { normalize } from "./progress";
import { rubricScore } from "./components/OpenAnswer";
import type { MCQ } from "./types";

const allChecks: MCQ[] = modules.flatMap((m) => m.sections.flatMap((s) => (s.kind === "check" ? s.questions : [])));

describe("course content", () => {
  it("fits the 4-hour budget (15 min quiz before + modules + 15 min quiz after)", () => {
    assert.equal(15 + modules.reduce((s, m) => s + m.minutes, 0) + 15, 240);
  });

  it("has unique module ids and sequential numbers", () => {
    assert.equal(new Set(modules.map((m) => m.id)).size, modules.length);
    modules.forEach((m, i) => assert.equal(m.number, i + 1));
  });

  it("has 3 quiz questions for each of modules 1-8 and none for the rehearsal", () => {
    for (const m of modules) {
      assert.equal(quiz.filter((q) => q.module === m.id).length, m.id === "m9" ? 0 : 3, m.id);
    }
    assert.ok(quiz.every((q) => modules.some((m) => m.id === q.module)));
  });

  it("uses unique ids across quiz, checks, scenarios and open questions", () => {
    const ids = [
      ...quiz.map((q) => q.id),
      ...allChecks.map((q) => q.id),
      ...modules.flatMap((m) => m.sections.flatMap((s) => ("id" in s ? [s.id] : []))),
    ];
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    assert.deepEqual(dupes, []);
  });

  it("has valid answer indexes, at least 3 options and an explanation per question", () => {
    for (const q of [...quiz, ...allChecks]) {
      assert.ok(q.options.length >= 3, q.id);
      assert.ok(q.answer >= 0 && q.answer < q.options.length, q.id);
      assert.ok(q.explanation.length > 20, q.id);
    }
  });

  it("does not reuse quiz questions inside module checks (keeps the final quiz meaningful)", () => {
    const quizPrompts = new Set(quiz.map((q) => q.prompt));
    assert.equal(allChecks.filter((q) => quizPrompts.has(q.prompt)).length, 0);
  });

  it("spreads correct quiz answers across all positions", () => {
    assert.equal(new Set(quiz.map((q) => q.answer)).size, 4);
  });

  it("gives every scenario step exactly one best option", () => {
    for (const m of modules) {
      for (const s of m.sections) {
        if (s.kind !== "scenario") continue;
        s.steps.forEach((step, i) =>
          assert.equal(step.options.filter((o) => o.score === 2).length, 1, `${s.id} step ${i + 1}`),
        );
      }
    }
  });

  it("gives every module except the rehearsal a scenario, a check, a lead's lens and an open question", () => {
    for (const m of modules.filter((x) => x.id !== "m9")) {
      const kinds = new Set<string>(m.sections.map((s) => s.kind));
      for (const k of ["scenario", "check", "open", "lead"]) assert.ok(kinds.has(k), `${m.id} is missing ${k}`);
    }
  });

  it("gives every open question a rubric and a model answer", () => {
    for (const m of modules) {
      for (const s of m.sections) {
        if (s.kind !== "open") continue;
        assert.ok(s.rubric.length >= 3, s.id);
        assert.ok(s.modelAnswer.length > 200, s.id);
      }
    }
  });

  it("does not mention a fictional company", () => {
    assert.doesNotMatch(JSON.stringify({ modules, quiz }), /Lumora/i);
  });
});

describe("scoring", () => {
  it("scores per module and counts 'I don't know' as unknown", () => {
    const answers: Record<string, number> = {};
    quiz.forEach((q) => (answers[q.id] = q.module === "m1" ? q.answer : -1));
    const scores = scoreByModule(answers);
    assert.equal(scores.length, 8);
    const m1 = scores.find((s) => s.module.id === "m1")!;
    const m2 = scores.find((s) => s.module.id === "m2")!;
    assert.deepEqual([m1.correct, m1.unknown, m1.total], [3, 0, 3]);
    assert.deepEqual([m2.correct, m2.unknown, m2.total], [0, 3, 3]);
  });

  it("classifies before/after outcomes", () => {
    assert.equal(outcome(0, 1, 1), "learned");
    assert.equal(outcome(1, 1, 1), "kept");
    assert.equal(outcome(1, -1, 1), "lost");
    assert.equal(outcome(-1, 0, 1), "missed");
    assert.equal(outcome(undefined, undefined, 1), "missed");
  });

  it("maps rubric coverage to the 0-4 scale", () => {
    assert.equal(rubricScore(0, 5), 0);
    assert.equal(rubricScore(5, 5), 4);
    assert.equal(rubricScore(3, 5), 2);
    assert.equal(rubricScore(4, 5), 3);
    assert.equal(rubricScore(0, 0), 0);
  });
});

describe("progress normalization", () => {
  it("returns defaults for garbage input", () => {
    const p = normalize("nope");
    assert.deepEqual(p.completed, []);
    assert.equal(p.settings.aiEnabled, false);
  });

  it("keeps saved data and fills missing fields", () => {
    const p = normalize({ completed: ["m1"], drafts: { pre: { q01: 2 } } });
    assert.deepEqual(p.completed, ["m1"]);
    assert.deepEqual(p.drafts.pre, { q01: 2 });
    assert.deepEqual(p.drafts.post, {});
    assert.equal(p.settings.apiKey, "");
  });

  it("keeps the skipped-baseline flag", () => {
    const p = normalize({ preSkipped: true });
    assert.equal(p.preSkipped, true);
    assert.equal(p.pre, undefined);
  });
});
