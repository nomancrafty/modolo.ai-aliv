import { ArrowUpRight } from "lucide-react";
import { HeroTrace } from "./VitalTrace";
import AmbientWaves from "./AmbientWaves";
import { EMPLOYEES } from "./AIEmployees";
import { useReveal, useCountUp } from "@/hooks/useMotion";

/** One trust figure, counted up on arrival. Labels are unchanged. */
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
    <div className="rv panel px-6 py-7 text-center">
      <span ref={ref} className="figure block text-3xl md:text-[2.5rem] text-ink leading-none">
        {text}
        <span className="text-coral-ink">{suffix}</span>
      </span>
      <span className="label text-stone-mid block mt-3 leading-[1.7]">{label}</span>
    </div>
  );
}

const Hero = () => {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.05, stagger: 90 });

  const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const seekEmployee = (i: number) =>
    document
      .getElementById(`employee-${EMPLOYEES[i].n}`)
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="top" className="relative overflow-hidden pt-[132px] md:pt-[176px]">
      <AmbientWaves opacity={0.55} />

      <div ref={ref} className="shell relative">
        {/* Eyebrow — the MODOLO acronym, centred above the thesis */}
        <div className="rv flex justify-center pb-[clamp(2rem,5vw,3.25rem)]">
          {/* MODOLO reads out of the first letters: MO-DO-LO */}
          <p className="label text-stone-mid text-center leading-[2]">
            <span className="text-coral-ink">M</span>edical{" "}
            <span className="text-coral-ink">O</span>ffice
            <span className="text-stone-mid mx-2" aria-hidden="true">/</span>
            <span className="text-coral-ink">D</span>ental{" "}
            <span className="text-coral-ink">O</span>ffice
            <span className="text-stone-mid mx-2" aria-hidden="true">/</span>
            <span className="text-coral-ink">L</span>aw{" "}
            <span className="text-coral-ink">O</span>ffice
            <span className="text-stone-mid mx-2" aria-hidden="true">/</span>AI
          </p>
        </div>

        {/* The thesis */}
        <h1 className="display-xl text-center mb-[clamp(1.25rem,3vw,2rem)]">
          <span className="rv-wipe text-ink">Plug the leaks.</span>
          <span className="rv-wipe text-coral">Pour the fuel.</span>
        </h1>

        {/* The existing promise, kept word for word and in its own two lines */}
        <h2 className="rv display-sm !text-[clamp(1.25rem,2.2vw,1.75rem)] !font-medium text-ink text-center max-w-3xl mx-auto mb-2">
          Get More Patients &amp; Clients
        </h2>
        <p className="rv display-sm !text-[clamp(1.125rem,2vw,1.5rem)] !font-normal text-stone-mid text-center max-w-3xl mx-auto mb-10">
          Operate Your Office More Effectively With Less Staff
        </p>

        <div className="rv flex justify-center mb-[clamp(3rem,7vw,5rem)]">
          <button onClick={() => scrollToSection("cta")} className="btn-accent">
            <span>Book Now</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* The thesis, drawn: one rhythm carrying all seven leaks. */}
        <div className="rv mb-[clamp(3rem,7vw,4.5rem)]">
          <HeroTrace onSeek={seekEmployee} labels={EMPLOYEES.map((e) => e.problem)} />
        </div>

        {/* The paragraph, kept word for word */}
        <p className="rv prose-body mx-auto text-center mb-[clamp(3rem,7vw,5rem)]">
          Instant engagement with prospects. We make sure every appointment
          booking is handled automatically. Never miss a call. Never forget a
          follow-up. Never lose a patient or client to a faster competitor.
        </p>

        {/* Trust ledger */}
        <div className="pb-[var(--chapter-y)]">
          <p className="rv eyebrow eyebrow-muted mb-8 justify-center mx-auto">
            Trusted by Modern Medical, Dental &amp; Law Offices
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
