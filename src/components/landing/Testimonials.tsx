import { useReveal } from "@/hooks/useMotion";

/* Copy unchanged. Presented as three premium cards — one subtly featured with
   a soft orange glow, two supporting on neutral surfaces. Quote reads first,
   the result second (a metric chip), attribution stays quieter. */

const testimonials = [
  {
    name: "SK",
    role: "Multi-Specialty Medical & Dental Clinic Owner",
    content:
      "The AI receptionist books more appointments and consultations than our old front desk system ever did.",
    metric: "87% booking rate",
    featured: true,
  },
  {
    name: "JL",
    role: "Regional Healthcare & Legal Services Group",
    content: "Our Google reviews exploded and new patients and clients trust us instantly.",
    metric: "+1.1 star rating in 60 days",
    featured: false,
  },
  {
    name: "DG",
    role: "Multi-location Medical, Dental & Law Office Network",
    content: "Ad costs dropped while lead quality went up across all departments.",
    metric: "42% lower cost per qualified lead",
    featured: false,
  },
];

const Testimonials = () => {
  const head = useReveal<HTMLDivElement>({ threshold: 0.2, stagger: 70 });
  const body = useReveal<HTMLDivElement>({ threshold: 0.1, stagger: 110 });

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-paper-deep py-[var(--chapter-y)]"
    >
      {/* One faint atmospheric glow, upper-right, away from the reading column. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span
          className="glow glow-b"
          style={{
            width: "min(46vw, 520px)",
            height: "min(30vw, 360px)",
            top: "-8%",
            right: "-6%",
            background: "radial-gradient(circle, hsl(var(--blue) / 0.5), transparent 70%)",
          }}
        />
      </div>

      <div className="relative shell">
        <div ref={head} className="mb-[clamp(3rem,7vw,5rem)] max-w-4xl">
          <p className="rv eyebrow label text-stone-mid mb-8">Real Results</p>
          <h2 className="rv-wipe display-lg text-ink">
            Real Results From Medical, Dental &amp; Law Offices
          </h2>
        </div>

        <div ref={body} className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className={`rv panel relative flex flex-col p-[clamp(1.5rem,3vw,2.25rem)] transition-transform duration-500 ease-editorial hover:-translate-y-1 ${
                t.featured ? "card-accent" : ""
              }`}
            >
              {t.featured && (
                <span
                  aria-hidden="true"
                  className="glow glow-a"
                  style={{
                    width: "min(60%, 300px)",
                    height: "min(60%, 300px)",
                    top: "-16%",
                    right: "-12%",
                    borderRadius: "9999px",
                    background:
                      "radial-gradient(circle, hsl(var(--peach) / 0.7), transparent 70%)",
                  }}
                />
              )}

              <blockquote className="relative">
                <p className="voice text-ink text-[clamp(1.25rem,1.9vw,1.625rem)]">
                  <span aria-hidden="true" className="text-stone-mid">
                    &ldquo;
                  </span>
                  {t.content}
                  <span aria-hidden="true" className="text-stone-mid">
                    &rdquo;
                  </span>
                </p>
              </blockquote>

              <div className="relative mt-auto pt-8">
                <span className="metric-chip">{t.metric}</span>
                <figcaption className="mt-6 flex items-baseline gap-3 pt-6 border-t border-[hsl(var(--ink)/0.08)]">
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
