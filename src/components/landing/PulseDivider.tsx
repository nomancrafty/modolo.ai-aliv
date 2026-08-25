import { useReveal } from "@/hooks/useMotion";

/**
 * PulseDivider — the brand mark's pulse, used as a section rule.
 *
 * The MODOLO logo is a slate M with a coral pulse running through it. Here
 * that pulse becomes the page's separator: a steady rhythm between chapters,
 * drawn left to right as each divider comes into view. It stays a divider —
 * quiet, thin, and never competing with the revenue meters it sits between.
 */

const W = 1200;
const MID = 30;
const AMP = 17;

/** One beat starting at x. */
function beat(x: number): string {
  return [
    `L ${x + 7} ${MID + AMP * 0.2}`,
    `L ${x + 14} ${MID - AMP}`,
    `L ${x + 22} ${MID + AMP * 0.55}`,
    `L ${x + 30} ${MID}`,
  ].join(" ");
}

const BEATS = 8;

function buildPath(): string {
  let d = `M 0 ${MID}`;
  const gap = W / BEATS;
  for (let i = 0; i < BEATS; i++) {
    const x = i * gap + gap * 0.34;
    d += ` L ${x} ${MID} ${beat(x)}`;
  }
  return `${d} L ${W} ${MID}`;
}

const PATH = buildPath();

const PulseDivider = () => {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.4, stagger: 0 });

  return (
    <div ref={ref} className="shell py-[clamp(2rem,5vw,3.5rem)]" aria-hidden="true">
      <svg
        viewBox={`0 0 ${W} 60`}
        className="w-full h-[42px] md:h-[54px] overflow-visible"
        fill="none"
        focusable="false"
        preserveAspectRatio="none"
      >
        {/* the flat reference the rhythm departs from */}
        <line
          x1="0"
          y1={MID}
          x2={W}
          y2={MID}
          stroke="hsl(var(--rule))"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={PATH}
          className="rv-draw"
          stroke="hsl(var(--coral))"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default PulseDivider;
