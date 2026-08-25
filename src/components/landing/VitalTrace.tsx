/**
 * VitalTrace — the site's signature element.
 *
 * The MODOLO mark is a slate M with a coral pulse running through it. That
 * pulse runs the length of the page: it degrades into a flatline at every
 * leak, and recovers into a stronger rhythm once the AI employee responsible
 * takes over.
 *
 * Geometry is generated rather than hand-drawn, so each of the seven chapters
 * gets its own failure signature instead of seven copies of one graphic.
 */

const MID = 60;
const BOUNDARY = 430;
const END = 1000;

/** One beat starting at x, spanning ~34 units. */
function beat(x: number, amp: number): string {
  return [
    `L ${x + 8} ${MID + amp * 0.16}`,
    `L ${x + 16} ${MID - amp}`,
    `L ${x + 25} ${MID + amp * 0.46}`,
    `L ${x + 34} ${MID}`,
  ].join(" ");
}

export type TraceConfig = {
  /** Beats before the failure. */
  preBeats: number;
  /** How hard each successive pre-beat fades — 1 = steady, <1 = dying. */
  decay: number;
  /** Beats after the AI employee takes over. */
  postBeats: number;
  /** Baseline amplitude. */
  amp: number;
};

/** Seven signatures — one per employee, in narrative order. */
export const TRACES: TraceConfig[] = [
  { preBeats: 3, decay: 0.42, postBeats: 4, amp: 46 }, // 01 page never loaded — collapses fast
  { preBeats: 2, decay: 0.8, postBeats: 4, amp: 38 },  // 02 forgotten — fades quietly
  { preBeats: 3, decay: 0.55, postBeats: 3, amp: 42 }, // 03 trust lost
  { preBeats: 2, decay: 0.35, postBeats: 4, amp: 44 }, // 04 no reply — drops off a cliff
  { preBeats: 1, decay: 1, postBeats: 5, amp: 50 },    // 05 missed call — one ring, then nothing
  { preBeats: 3, decay: 0.7, postBeats: 3, amp: 40 },  // 06 not convinced — peters out
  { preBeats: 0, decay: 1, postBeats: 5, amp: 48 },    // 07 never discovered — flat from the start
];

function buildPaths(cfg: TraceConfig) {
  // --- Problem: rhythm degrading into a flatline ---
  let problem = `M 0 ${MID}`;
  let x = 40;
  for (let i = 0; i < cfg.preBeats; i++) {
    const amp = cfg.amp * Math.pow(cfg.decay, i);
    problem += ` L ${x} ${MID} ${beat(x, amp)}`;
    x += 108;
  }
  problem += ` L ${BOUNDARY} ${MID}`;

  // --- Solution: a pause, then rhythm returning stronger than before ---
  let solution = `M ${BOUNDARY} ${MID}`;
  let sx = BOUNDARY + 56;
  const step = (END - 40 - sx) / Math.max(cfg.postBeats, 1);
  for (let i = 0; i < cfg.postBeats; i++) {
    solution += ` L ${sx} ${MID} ${beat(sx, cfg.amp * 1.12)}`;
    sx += step;
  }
  solution += ` L ${END} ${MID}`;

  return { problem, solution };
}

/**
 * The per-chapter trace. Drawing is driven entirely by the `--p` custom
 * property that `useScrollProgress` writes on the chapter root, so scrolling
 * only updates stroke-dashoffset — no React renders, no layout.
 */
export function ChapterTrace({ index }: { index: number }) {
  const cfg = TRACES[index % TRACES.length];
  const { problem, solution } = buildPaths(cfg);

  return (
    <svg
      viewBox={`0 0 ${END} 120`}
      className="w-full h-[84px] md:h-[112px] overflow-visible"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      {/* the flat reference the rhythm departs from */}
      <line
        x1="0"
        y1={MID}
        x2={END}
        y2={MID}
        stroke="hsl(var(--rule))"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* the leak: rhythm failing */}
      <path
        d={problem}
        className="trace-problem"
        stroke="hsl(var(--stone-soft))"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* the fix: rhythm restored, in brand coral */}
      <path
        d={solution}
        className="trace-solution"
        stroke="hsl(var(--coral))"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* the seal: hollow while leaking, filled once the employee takes over */}
      <circle
        cx={BOUNDARY}
        cy={MID}
        r="4.5"
        fill="hsl(var(--paper))"
        stroke="hsl(var(--stone-soft))"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={BOUNDARY}
        cy={MID}
        r="4.5"
        className="trace-seal"
        fill="hsl(var(--coral))"
        stroke="hsl(var(--coral))"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * The hero trace: one continuous rhythm carrying all seven leak points.
 * Each marker is a real button into its chapter, labelled 01–07.
 */
export function HeroTrace({
  onSeek,
  labels,
}: {
  onSeek: (index: number) => void;
  labels: string[];
}) {
  const W = 1200;
  const mid = 60;
  const gap = W / 7;

  // A steady rhythm, interrupted by a dropout at each of the seven leaks.
  let d = `M 0 ${mid}`;
  const markers: number[] = [];
  for (let i = 0; i < 7; i++) {
    const base = i * gap;
    const beatX = base + gap * 0.14;
    const markerX = base + gap * 0.64;
    d += ` L ${beatX} ${mid} ${beat(beatX, 34)}`;
    d += ` L ${markerX} ${mid}`;
    markers.push(markerX);
  }
  d += ` L ${W} ${mid}`;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} 120`}
        className="w-full h-[92px] md:h-[124px] overflow-visible"
        fill="none"
        role="img"
        aria-label="Seven points where revenue leaks out of a practice, each handled by one AI employee."
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1={mid}
          x2={W}
          y2={mid}
          stroke="hsl(var(--rule))"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={d}
          className="hero-trace"
          stroke="hsl(var(--coral))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1"
          vectorEffect="non-scaling-stroke"
        />
        {markers.map((mx, i) => (
          <circle
            key={i}
            cx={mx}
            cy={mid}
            r="4"
            className="hero-node"
            style={{ ["--i" as string]: (i / 7).toFixed(3) }}
            fill="hsl(var(--paper))"
            stroke="hsl(var(--coral))"
            strokeWidth="1.75"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Markers are real buttons — keyboard reachable, 44px touch targets. */}
      <div className="absolute inset-0">
        {markers.map((mx, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSeek(i)}
            style={{ left: `${(mx / W) * 100}%` }}
            className="group absolute top-1/2 -translate-x-1/2 w-11 h-11 flex items-end justify-center pb-0"
            aria-label={`Leak ${String(i + 1).padStart(2, "0")}: ${labels[i]}`}
          >
            <span className="figure text-[11px] text-stone-mid transition-colors duration-300 group-hover:text-coral-ink group-focus-visible:text-coral-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * The closing trace: after seven leaks are sealed, the practice reads steady.
 * Driven by `--p` from the footer so it draws as the reader arrives.
 */
export function SteadyTrace() {
  const W = 1200;
  const mid = 60;
  const gap = W / 8;

  let d = `M 0 ${mid}`;
  for (let i = 0; i < 8; i++) {
    const x = i * gap + gap * 0.3;
    d += ` L ${x} ${mid} ${beat(x, 32)}`;
  }
  d += ` L ${W} ${mid}`;

  return (
    <svg
      viewBox={`0 0 ${W} 120`}
      className="w-full h-[64px] md:h-[84px] overflow-visible"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <line
        x1="0"
        y1={mid}
        x2={W}
        y2={mid}
        stroke="hsl(var(--rule))"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={d}
        className="trace-steady"
        stroke="hsl(var(--coral))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
