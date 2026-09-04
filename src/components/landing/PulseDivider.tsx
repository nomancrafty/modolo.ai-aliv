import { useReveal } from "@/hooks/useMotion";

/**
 * Section divider — a restrained editorial rule.
 *
 * The old heartbeat/pulse separator belonged to the previous logo identity
 * and has been retired. In its place: a thin hairline broken by a single
 * small coral diamond at centre — the same rotated-square motif already used
 * for markers and bullets across the site. Quiet on every width, no wave, no
 * medical pulse. It fades in gently as it enters view.
 */

const PulseDivider = () => {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.4 });

  return (
    <div ref={ref} className="shell py-[clamp(2rem,5vw,3.5rem)]" aria-hidden="true">
      <div className="rv flex items-center gap-4">
        <span className="h-px flex-1 bg-rule" />
        <span className="w-1.5 h-1.5 rotate-45 bg-coral shrink-0" />
        <span className="h-px flex-1 bg-rule" />
      </div>
    </div>
  );
};

export default PulseDivider;
