/**
 * AmbientWaves — the reference site's flowing line art, rebuilt in MODOLO coral.
 *
 * A fan of thin parallel curves sweeping across the ground. Purely atmospheric:
 * it sits behind content, never carries meaning, and holds still for anyone who
 * asks for reduced motion.
 */

const W = 1200;
const H = 800;

/**
 * One curve of the fan, offset vertically by `k`. Each successive line is
 * pushed a little further and flattened slightly, so the fan opens as it
 * travels right — the same behaviour as the reference's sweep.
 */
function curve(k: number): string {
  const drop = k * 26;
  const amp = 150 - k * 3.5;
  return [
    `M ${-80} ${H * 0.62 + drop}`,
    `C ${W * 0.2} ${H * 0.62 + drop - amp * 0.7}`,
    `${W * 0.36} ${H * 0.28 + drop + amp * 0.9}`,
    `${W * 0.56} ${H * 0.4 + drop}`,
    `C ${W * 0.74} ${H * 0.5 + drop - amp * 0.55}`,
    `${W * 0.88} ${H * 0.1 + drop}`,
    `${W + 80} ${H * 0.16 + drop - amp * 0.2}`,
  ].join(" ");
}

const LINES = 16;

export default function AmbientWaves({
  className = "",
  opacity = 0.5,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="ambient-drift absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        focusable="false"
      >
        <defs>
          {/* The fan fades out toward the left so it never crowds the type. */}
          <linearGradient id="aw-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--coral))" stopOpacity="0" />
            <stop offset="38%" stopColor="hsl(var(--coral))" stopOpacity="0.28" />
            <stop offset="72%" stopColor="hsl(var(--coral))" stopOpacity="0.62" />
            <stop offset="100%" stopColor="hsl(var(--coral))" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {Array.from({ length: LINES }, (_, i) => (
          <path
            key={i}
            d={curve(i)}
            stroke="url(#aw-fade)"
            strokeWidth={i % 4 === 0 ? 1.1 : 0.7}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
