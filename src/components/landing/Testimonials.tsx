import { useReveal } from "@/hooks/useMotion";

/* Copy unchanged. Presented as attributed testimony rather than quote cards:
   the client's words in the same serif voice used for the seven problems,
   with the result set as a ledger figure beneath. */

const testimonials = [
  {
    name: "SK",
    role: "Multi-Specialty Medical & Dental Clinic Owner",
    content:
      "The AI receptionist books more appointments and consultations than our old front desk system ever did.",
    metric: "87% booking rate",
  },
  {
    name: "JL",
    role: "Regional Healthcare & Legal Services Group",
    content: "Our Google reviews exploded and new patients and clients trust us instantly.",
    metric: "+1.1 star rating in 60 days",
  },
  {
    name: "DG",
    role: "Multi-location Medical, Dental & Law Office Network",
    content: "Ad costs dropped while lead quality went up across all departments.",
    metric: "42% lower cost per qualified lead",
  },
];

const Testimonials = () => {
  const head = useReveal<HTMLDivElement>({ threshold: 0.2, stagger: 70 });
  const body = useReveal<HTMLDivElement>({ threshold: 0.1, stagger: 90 });

  return (
    <section id="testimonials" className="bg-paper-deep py-[var(--chapter-y)]">
      <div className="shell">
        <div ref={head} className="mb-[clamp(3.5rem,8vw,6rem)] max-w-4xl">
          <p className="label text-stone-mid mb-8 rv">Real Results</p>
          <h2 className="display-lg text-ink rv-wipe">
            Real Results From Medical, Dental &amp; Law Offices
          </h2>
        </div>

        <div ref={body} className="grid gap-x-12 gap-y-16 md:grid-cols-3">
          {/* h-full + mt-auto keeps the result figures on one line across the
              row, however long each quote runs. */}
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rv border-t border-ink pt-8 flex flex-col h-full"
            >
              <blockquote>
                <p className="voice text-ink text-[clamp(1.375rem,2.1vw,1.75rem)]">
                  <span aria-hidden="true" className="text-stone-mid">“</span>
                  {t.content}
                  <span aria-hidden="true" className="text-stone-mid">”</span>
                </p>
              </blockquote>

              <div className="mt-auto pt-8">
                <p className="figure text-coral-ink text-lg pt-6 border-t border-rule">
                  {t.metric}
                </p>

                <figcaption className="mt-6 flex items-baseline gap-3">
                  <span className="label text-ink">{t.name}</span>
                  <span className="text-sm text-stone-mid leading-snug">{t.role}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
