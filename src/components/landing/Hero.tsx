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
    <div className="rv border-t border-ink pt-4">
      <span ref={ref} className="figure block text-3xl md:text-[2.75rem] text-ink leading-none">
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
    <section id="top" className="relative bg-paper pt-[132px] md:pt-[168px]">
      <div ref={ref} className="shell">
        {/* Eyebrow — the three practice types, set as an instrument label */}
        <div className="rv flex items-center gap-5 pb-[clamp(2.5rem,6vw,4.5rem)]">
          <p className="label text-stone-mid">
            Medical
            <span className="text-stone-soft mx-2.5" aria-hidden="true">|</span>
            Dental
            <span className="text-stone-soft mx-2.5" aria-hidden="true">|</span>
            Law
          </p>
          <span className="rv-rule hidden sm:block flex-1 h-px bg-rule origin-left" />
        </div>

        {/* The thesis — two intentional lines */}
        <h1 className="display-xl mb-[clamp(2rem,5vw,3.5rem)]">
          <span className="rv-wipe text-ink">Acquire More Patients &amp; Clients</span>
          <span className="rv-wipe text-coral mt-3 md:mt-4">
            Eliminate Manual Work &amp; Waste
          </span>
        </h1>

        {/* The promise, then the invitation */}
        <div className="grid gap-x-16 gap-y-10 md:grid-cols-12 pb-[clamp(4rem,9vw,7rem)]">
          <div className="md:col-span-6">
            <p className="prose-body rv">
              Every day without AI, competitors win clients while your team loses
              time to repetitive work.
            </p>
          </div>

          <div className="md:col-span-6 flex flex-col items-start gap-7">
            <p className="display-sm !text-[clamp(1.5rem,2.6vw,2.125rem)] text-ink rv">
              Ready to scale your practice?
            </p>
            <button
              onClick={() => scrollToSection("cta")}
              className="btn-ink rv"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Trust ledger */}
        <div className="pb-[var(--chapter-y)]">
          <p className="label text-stone-mid mb-8 rv">
            Trusted by leading medical, dental, and law offices
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
            <Stat value={150} suffix="+" label="Medical, Dental & Law Offices" />
            <Stat value={1.8} decimals={1} suffix="M+" label="Patient Interactions" />
            <Stat value={22} suffix="+" label="Years Healthcare Tech" />
            <Stat value={4.9} decimals={1} suffix="★" label="Average Client Rating" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
