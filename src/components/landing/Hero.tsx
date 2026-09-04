import { ArrowRight } from "lucide-react";
import { useReveal, useCountUp } from "@/hooks/useMotion";

/** One trust figure. Labels are unchanged. */
function Stat({
  value,
  decimals = 0,
  suffix,
  label,
}: {
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
}) {
  const { ref, value: shown } = useCountUp(value, { decimals, duration: 1800 });
  const text = decimals > 0 ? shown.toFixed(decimals) : Math.round(shown).toString();

  return (
    <div className="rv border-t border-[hsl(var(--ink)/0.10)] pt-4">
      <span ref={ref} className="figure block text-[1.75rem] md:text-[2.25rem] text-ink leading-none">
        {text}
        <span className="text-coral">{suffix}</span>
      </span>
      <span className="label text-stone-mid block mt-3 leading-[1.7]">{label}</span>
    </div>
  );
}

const Hero = () => {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.05, stagger: 90 });

  const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-paper pt-[112px] md:pt-[128px] pb-[var(--chapter-y)]"
    >
      {/* Full-width soft wash, fading into the shared page ground — no panel,
          no border, no rounded edge. Peach and blue drift; lavender/mint rest. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(44% 52% at 46% 2%, hsl(var(--lavender) / 0.5), transparent 68%)",
              "radial-gradient(40% 48% at 104% 46%, hsl(var(--mint) / 0.34), transparent 68%)",
            ].join(", "),
          }}
        />
        <span
          className="glow hero-glow-1"
          style={{
            width: "min(44vw, 560px)",
            height: "min(44vw, 560px)",
            top: "-16%",
            left: "-8%",
            background: "radial-gradient(circle, hsl(var(--peach) / 0.5), transparent 66%)",
          }}
        />
        <span
          className="glow hero-glow-2"
          style={{
            width: "min(46vw, 600px)",
            height: "min(46vw, 600px)",
            bottom: "-22%",
            right: "-10%",
            background: "radial-gradient(circle, hsl(var(--blue) / 0.48), transparent 68%)",
          }}
        />
      </div>

      {/* Composition sits above the wash, aligned in the shared container. */}
      <div ref={ref} className="relative shell">
        <div>
            {/* Top — two columns: identity/headline left, promise + CTAs right */}
            <div className="grid gap-x-12 gap-y-9 lg:grid-cols-12 lg:items-center">
              {/* Left: eyebrow + headline */}
              <div className="lg:col-span-7">
                <div className="rv flex items-center gap-5 mb-[clamp(1.5rem,4vw,2.5rem)]">
                  <p className="label text-stone-mid">
                    Medical
                    <span className="text-stone-soft mx-2.5" aria-hidden="true">|</span>
                    Dental
                    <span className="text-stone-soft mx-2.5" aria-hidden="true">|</span>
                    Law
                  </p>
                  <span className="rv-rule hidden sm:block flex-1 h-px bg-rule origin-left" />
                </div>

                <h1 className="hero-title">
                  <span className="rv-wipe block text-ink">
                    Acquire More Patients &amp; Clients
                  </span>
                  <span className="rv-wipe block text-coral mt-2.5 md:mt-3">
                    Eliminate Manual Work &amp; Waste
                  </span>
                </h1>
              </div>

              {/* Right: supporting copy, then the two CTAs */}
              <div className="lg:col-span-5 flex flex-col items-start gap-6">
                <p className="prose-body rv">
                  Every day without AI, competitors win clients while your team
                  loses time to repetitive work.
                </p>
                <p className="display-sm !text-[clamp(1.375rem,2.2vw,1.75rem)] text-ink rv">
                  Ready to scale your practice?
                </p>
                <div className="rv flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => scrollToSection("cta")}
                    className="btn-ink group w-full sm:w-auto justify-center"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="btn-arrow w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => scrollToSection("employees")}
                    className="btn-line w-full sm:w-auto"
                  >
                    <span>Explore solutions</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom — compact trust proof, divided from the composition above */}
            <div className="mt-[clamp(2.25rem,5vw,3.5rem)] pt-[clamp(1.75rem,3.5vw,2.75rem)] border-t border-[hsl(var(--ink)/0.08)]">
              <p className="label text-stone-mid mb-7 rv">
                Trusted by leading medical, dental, and law offices
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
                <Stat value={150} suffix="+" label="Medical, Dental & Law Offices" />
                <Stat value={1.8} decimals={1} suffix="M+" label="Patient Interactions" />
                <Stat value={22} suffix="+" label="Years Healthcare Tech" />
                <Stat value={4.9} decimals={1} suffix="★" label="Average Client Rating" />
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Hero;
