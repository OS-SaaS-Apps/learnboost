/** One pastel per module, used for tiles, banners and the mascot. */
export const MODULE_COLORS: Record<string, string> = {
  m1: "#FFB3CF",
  m2: "#A8D8FF",
  m3: "#9FE6CF",
  m4: "#C9B8FF",
  m5: "#FFC9A8",
  m6: "#FFE58F",
  m7: "#9EE7EF",
  m8: "#FFADA8",
  m9: "#F0B8F0",
};

export const QUIZ_COLOR = "#FFD6E7";

export function moduleColor(id: string): string {
  return MODULE_COLORS[id] ?? QUIZ_COLOR;
}
