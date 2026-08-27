/**
 * VitalTrace — the pulse from the MODOLO mark, drawn across the page.
 *
 * Two traces are in use: one in the hero carrying a marker per AI employee,
 * and one closing the footer. Both are static; the scroll-driven drawing was
 * removed along with the rest of the site's motion.
 */

const MID = 60;

/** One beat starting at x, spanning ~34 units. */
function beat(x: number, amp: number): string {
  return [
    `L ${x + 8} ${MID + amp * 0.16}`,
    `L ${x + 16} ${MID - amp}`,
    `L ${x + 25} ${MID + amp * 0.46}`,
    `L ${x + 34} ${MID}`,
  ].join(" ");
}

/**
 * The hero trace: one rhythm carrying a marker per AI employee. The beat and
 * marker count come from `labels`, so the trace always matches the number of
 * employees rather than assuming a fixed count.
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
  const count = labels.length;
  const gap = W / count;

  let d = `M 0 ${mid}`;
  const markers: number[] = [];
  for (let i = 0; i < count; i++) {
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
        aria-label={`${count} points where revenue leaks out of a practice, each handled by one AI employee.`}
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
            aria-label={`AI employee ${String(i + 1).padStart(2, "0")}: ${labels[i]}`}
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

/** The closing trace: a steady rhythm under the footer. */
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
