export type Mood = "happy" | "wow" | "oops" | "sleepy";

const LABEL: Record<Mood, string> = {
  happy: "Smiling database mascot",
  wow: "Delighted database mascot",
  oops: "Worried database mascot",
  sleepy: "Sleepy database mascot",
};

/** Byte, the course mascot: a little database cylinder with a face. */
export function Mascot({
  mood = "happy",
  size = 96,
  color = "#FFB3CF",
  className,
}: {
  mood?: Mood;
  size?: number;
  color?: string;
  className?: string;
}) {
  const ink = "#3B2A55";
  const top = `color-mix(in srgb, ${color} 55%, white)`;
  return (
    <svg
      className={`mascot ${className ?? ""}`}
      viewBox="0 0 120 132"
      width={size}
      height={(size * 132) / 120}
      role="img"
      aria-label={LABEL[mood]}
    >
      <ellipse cx="60" cy="125" rx="36" ry="5" fill={ink} opacity="0.12" />
      {/* body */}
      <path d="M18 32 V100 A42 16 0 0 0 102 100 V32" fill={color} stroke={ink} strokeWidth="4" strokeLinejoin="round" />
      <path d="M18 54 A42 16 0 0 0 102 54" fill="none" stroke={ink} strokeWidth="3" opacity="0.22" />
      {/* lid */}
      <ellipse cx="60" cy="32" rx="42" ry="16" style={{ fill: top }} stroke={ink} strokeWidth="4" />
      <ellipse cx="45" cy="27" rx="13" ry="4" fill="#fff" opacity="0.75" />

      {/* cheeks */}
      <ellipse cx="33" cy="92" rx="7.5" ry="4.5" fill="#FF7EB0" opacity="0.55" />
      <ellipse cx="87" cy="92" rx="7.5" ry="4.5" fill="#FF7EB0" opacity="0.55" />

      {/* eyes */}
      {mood === "sleepy" && (
        <g fill="none" stroke={ink} strokeWidth="3.5" strokeLinecap="round">
          <path d="M37 80 q7 5 14 0" />
          <path d="M69 80 q7 5 14 0" />
        </g>
      )}
      {mood === "oops" && (
        <g fill="none" stroke={ink} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M38 75 l9 5 l-9 5" />
          <path d="M82 75 l-9 5 l9 5" />
        </g>
      )}
      {(mood === "happy" || mood === "wow") && (
        <g>
          <ellipse cx="44" cy="80" rx={mood === "wow" ? 7 : 5.5} ry={mood === "wow" ? 8.5 : 7} fill={ink} />
          <ellipse cx="76" cy="80" rx={mood === "wow" ? 7 : 5.5} ry={mood === "wow" ? 8.5 : 7} fill={ink} />
          <circle cx="46.5" cy="77" r="2.2" fill="#fff" />
          <circle cx="78.5" cy="77" r="2.2" fill="#fff" />
        </g>
      )}

      {/* mouth */}
      {mood === "happy" && <path d="M53 92 q7 7 14 0" fill="none" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />}
      {mood === "wow" && <path d="M52 91 q8 12 16 0 z" fill={ink} />}
      {mood === "oops" && <path d="M51 97 q4.5 -5 9 0 q4.5 5 9 0" fill="none" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />}
      {mood === "sleepy" && <ellipse cx="60" cy="95" rx="4" ry="3.5" fill={ink} />}

      {/* extras */}
      {mood === "sleepy" && (
        <text x="96" y="18" fontSize="18" fontWeight="800" fill={ink} fontFamily="inherit">
          z
        </text>
      )}
      {mood === "wow" && (
        <g fill="#FFD84D" stroke={ink} strokeWidth="2" strokeLinejoin="round">
          <path d="M104 6 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 z" />
          <path d="M10 6 l2 4.5 l4.5 2 l-4.5 2 l-2 4.5 l-2 -4.5 l-4.5 -2 l4.5 -2 z" />
        </g>
      )}
      {mood === "oops" && (
        <path d="M100 58 q6 9 0 12 q-6 -3 0 -12 z" fill="#8CC8FF" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
      )}
    </svg>
  );
}
