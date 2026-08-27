import { ArrowRight } from "lucide-react";
import { HeroTrace } from "./VitalTrace";
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

  const seekEmployee = (i: number) =>
    document
      .getElementById(`employee-${EMPLOYEES[i].n}`)
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="top" className="relative bg-paper pt-[132px] md:pt-[168px]">
      <div ref={ref} className="shell">
        {/* Eyebrow — the MODOLO acronym, set as an instrument label */}
        <div className="rv flex items-center gap-5 pb-[clamp(2.5rem,6vw,4.5rem)]">
          {/* MODOLO reads out of the first letters: MO-DO-LO */}
          <p className="label text-stone-mid">
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
          <span className="rv-rule hidden sm:block flex-1 h-px bg-rule origin-left" />
        </div>

        {/* The thesis */}
        <h1 className="display-xl mb-[clamp(2rem,5vw,3.5rem)]">
          <span className="rv-wipe text-ink">Plug the leaks.</span>
          <span className="rv-wipe text-coral">Pour the fuel.</span>
        </h1>

        {/* The thesis, drawn: one rhythm carrying all seven leaks.
            Each marker is a real button into its chapter. */}
        <div className="rv mb-[clamp(3rem,7vw,4.5rem)]">
          <HeroTrace onSeek={seekEmployee} labels={EMPLOYEES.map((e) => e.problem)} />
        </div>

        {/* The existing promise, kept word for word */}
        <div className="grid gap-x-16 gap-y-10 md:grid-cols-12 pb-[clamp(4rem,9vw,7rem)]">
          {/* Subordinate to the thesis above: the promise, then the method. */}
          <div className="md:col-span-6">
            <h2 className="display-sm !text-[clamp(1.5rem,2.6vw,2.125rem)] text-ink rv">
              Get More Patients &amp; Clients
            </h2>
            <p className="display-sm !text-[clamp(1.5rem,2.6vw,2.125rem)] text-stone-mid rv mt-2">
              Operate Your Office More Effectively With Less Staff
            </p>
          </div>

          <div className="md:col-span-6 flex flex-col items-start gap-9">
            <p className="prose-body rv">
              Instant engagement with prospects. We make sure every appointment
              booking is handled automatically. Never miss a call. Never forget a
              follow-up. Never lose a patient or client to a faster competitor.
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
            Trusted by Modern Medical, Dental &amp; Law Offices
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
