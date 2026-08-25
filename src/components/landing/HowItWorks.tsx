import { useReveal } from "@/hooks/useMotion";

/* Copy unchanged. This section is a real sequence — ad click through to a
   confirmed appointment — so the 01-04 numbering carries information rather
   than decorating the layout. */

const steps = [
  {
    number: "01",
    title: "AI-Optimized Advertising",
    subtitle: "Top Funnel",
    description:
      "We run Meta (Facebook & Instagram) ads with interactive questionnaires and quizzes to pre-qualify leads.",
    bullets: [
      "Automatically qualify / disqualify prospects",
      "Filter out low-intent traffic",
      "Collect key intent data before contact",
    ],
    metrics: [
      { value: "3.1×", label: "higher click-through rate" },
      { value: "42%", label: "lower cost per qualified lead" },
      { value: "60-70%", label: "of low-intent leads filtered out" },
    ],
  },
  {
    number: "02",
    title: "Human-Like AI Agents Qualify Leads",
    subtitle: "Lead Qualification",
    description: "AI agents instantly call, text, or chat with every new lead.",
    bullets: [
      "Ask qualification questions",
      "Verify intent, urgency, and budget",
      "Perform multi-step follow-ups",
    ],
    metrics: [
      { value: "<30s", label: "first response time" },
      { value: "2.4×", label: "higher lead-to-appointment conversion" },
    ],
  },
  {
    number: "03",
    title: "Automatic Booking",
    subtitle: "Conversion",
    description: "Qualified leads are booked directly into your calendar.",
    bullets: ["Real-time scheduling", "No double bookings", "Automated rescheduling"],
    metrics: [{ value: "65-80%", label: "booking rate from qualified leads" }],
  },
  {
    number: "04",
    title: "Higher Show-Up Rate & Revenue",
    subtitle: "Results",
    description: "AI manages confirmations and reminders.",
    bullets: ["Smart SMS & email reminders", "Pre-visit instructions"],
    metrics: [
      { value: "30-60%", label: "fewer no-shows" },
      { value: "20-35%", label: "increase in monthly revenue" },
    ],
  },
];

function Step({ step }: { step: (typeof steps)[number] }) {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.15, stagger: 50 });

  return (
    <div ref={ref} className="grid gap-x-12 gap-y-8 md:grid-cols-12 panel p-7 md:p-10 mb-5">
      {/* Index */}
      <div className="md:col-span-2">
        <span className="figure block text-[2.5rem] leading-none text-coral rv">
          {step.number}
        </span>
        <span className="label text-stone-mid block mt-3 rv">{step.subtitle}</span>
      </div>

      {/* Substance */}
      <div className="md:col-span-6">
        <h3 className="display-sm text-ink mb-4 rv">{step.title}</h3>
        <p className="text-[0.9375rem] leading-relaxed text-stone-mid mb-6 max-w-[46ch] rv">
          {step.description}
        </p>
        <ul>
          {step.bullets.map((bullet) => (
            <li
              key={bullet}
              className="rv flex gap-4 py-2.5 border-t border-rule text-[0.9375rem] leading-relaxed text-stone-mid"
            >
              <span
                aria-hidden="true"
                className="mt-[0.62em] w-[4px] h-[4px] shrink-0 rotate-45 bg-stone-soft"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Readings */}
      <div className="md:col-span-4">
        <p className="eyebrow eyebrow-muted mb-5 rv">Results</p>
        <dl className="space-y-5">
          {step.metrics.map((m) => (
            <div key={m.label} className="rv">
              <dt className="figure text-2xl md:text-[1.75rem] text-ink leading-none">
                {m.value}
              </dt>
              <dd className="text-sm text-stone-mid mt-1.5 leading-snug">{m.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

const HowItWorks = () => {
  const head = useReveal<HTMLDivElement>({ threshold: 0.2, stagger: 70 });

  return (
    <section id="how-it-works" className="bg-paper py-[var(--chapter-y)]">
      <div className="shell">
        <div
          ref={head}
          className="grid gap-x-16 gap-y-8 md:grid-cols-12 items-end mb-[clamp(3rem,7vw,5rem)]"
        >
          <div className="md:col-span-7">
            <p className="eyebrow mb-8 rv">How It Works</p>
            <h2 className="display-lg text-ink rv-wipe">
              From Ad Click to Confirmed Appointment
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="prose-body rv">A Proven 4-Step Growth System</p>
          </div>
        </div>

        <div>
          {steps.map((step) => (
            <Step key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
