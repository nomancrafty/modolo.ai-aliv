import { useReveal } from "@/hooks/useMotion";

/* Copy unchanged. Set as a numbered schedule of terms — the way a firm
   states what it commits to — rather than a grid of ticked boxes. */

const reasons = [
  "Built specifically for medical clinics, dental practices & law offices",
  "Compliance-ready for regulated industries (healthcare & legal workflows)",
  "No long-term contracts",
  "Results typically in 2–4 weeks",
  "Human-like AI conversations for patients & clients",
  "Works for appointments, consultations & case inquiries",
];

const WhyUs = () => {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.12, stagger: 60 });

  return (
    <section id="why-us" className="bg-paper py-[var(--chapter-y)]">
      <div ref={ref} className="shell">
        <div className="grid gap-x-16 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label text-stone-mid mb-8 rv">Why MODOLO AI</p>
            <h2 className="display-lg text-ink rv-wipe md:sticky md:top-32">
              Why Medical, Dental &amp; Law Offices Choose MODOLO AI Technology
            </h2>
          </div>

          <div className="md:col-span-7">
            <ol className="border-t border-ink">
              {reasons.map((reason, i) => (
                <li
                  key={reason}
                  className="rv group flex items-baseline gap-6 md:gap-10 py-7 border-b border-rule"
                >
                  <span className="figure text-sm text-stone-mid shrink-0 transition-colors duration-500 group-hover:text-coral-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.0625rem] md:text-[1.125rem] leading-snug text-ink">
                    {reason}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
