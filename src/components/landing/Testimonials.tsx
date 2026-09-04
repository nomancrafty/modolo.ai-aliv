import { useReveal } from "@/hooks/useMotion";

/* Copy unchanged. Open editorial columns on the shared ground — one subtly
   featured (a coral top rule + soft glow behind it), two supporting. Quote
   reads first, the result second (a metric chip), attribution stays quiet. */

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
    <section id="testimonials" className="relative bg-paper py-[var(--chapter-y)]">
      {/* Full-width ambient wash, fading into the shared ground. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span
          className="glow glow-b"
          style={{
            width: "min(46vw, 560px)",
            height: "min(30vw, 380px)",
            top: "6%",
            right: "-6%",
            background: "radial-gradient(circle, hsl(var(--blue) / 0.4), transparent 72%)",
          }}
        />
        <span
          className="glow glow-a"
          style={{
            width: "min(44vw, 520px)",
            height: "min(30vw, 380px)",
            bottom: "-4%",
            left: "-6%",
            background: "radial-gradient(circle, hsl(var(--peach) / 0.34), transparent 72%)",
          }}
        />
      </div>

      <div className="relative shell">
        <div ref={head} className="mb-[clamp(2.5rem,6vw,4rem)] max-w-4xl">
          <p className="rv eyebrow label text-stone-mid mb-8">Real Results</p>
          <h2 className="rv-wipe display-lg text-ink">
            Real Results From Medical, Dental &amp; Law Offices
          </h2>
        </div>

        <div ref={body} className="grid gap-x-12 gap-y-14 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rv flex flex-col h-full">
              <span
                aria-hidden="true"
                className={
                  t.featured
                    ? "block h-[3px] w-16 bg-coral mb-7"
                    : "block h-px w-full bg-[hsl(var(--ink)/0.14)] mb-7"
                }
              />
              <blockquote>
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

              <div className="mt-auto pt-8">
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
