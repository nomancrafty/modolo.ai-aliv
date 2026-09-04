import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/useMotion";

/* Copy unchanged. A numbered schedule of terms — what the firm commits to —
   with a stable heading on the left and six compact rows on the right. */

const reasons = [
  "Built specifically for medical clinics, dental practices & law offices",
  "Compliance-ready for regulated industries (healthcare & legal workflows)",
  "No long-term contracts",
  "Results typically in 2–4 weeks",
  "Human-like AI conversations for patients & clients",
  "Works for appointments, consultations & case inquiries",
];

const WhyUs = () => {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.12, stagger: 70 });

  return (
    <section id="why-us" className="relative overflow-hidden bg-paper py-[var(--chapter-y)]">
      {/* One faint glow, lower-left, well away from the reading column. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span
          className="glow glow-a"
          style={{
            width: "min(48vw, 520px)",
            height: "min(34vw, 400px)",
            bottom: "-10%",
            left: "-6%",
            background: "radial-gradient(circle, hsl(var(--peach) / 0.5), transparent 70%)",
          }}
        />
      </div>

      <div ref={ref} className="relative shell">
        <div className="grid gap-x-16 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="rv eyebrow label text-stone-mid mb-8">Why MODOLO AI</p>
            <h2 className="rv-wipe display-lg !text-[clamp(2rem,4.8vw,3.7rem)] text-ink md:sticky md:top-32">
              Why Medical, Dental &amp; Law Offices Choose MODOLO AI Technology
            </h2>
          </div>

          <div className="md:col-span-7">
            <ol className="border-t border-[hsl(var(--ink)/0.10)]">
              {reasons.map((reason, i) => (
                <li
                  key={reason}
                  className="rv group flex items-center gap-6 md:gap-8 py-6 border-b border-[hsl(var(--ink)/0.10)]"
                >
                  <span className="figure text-sm text-stone-mid shrink-0 w-7 transition-colors duration-300 group-hover:text-coral-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.0625rem] md:text-[1.125rem] leading-snug text-ink">
                    {reason}
                  </span>
                  <ArrowUpRight
                    className="ml-auto w-[18px] h-[18px] shrink-0 text-stone-soft opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-coral-ink"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
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
