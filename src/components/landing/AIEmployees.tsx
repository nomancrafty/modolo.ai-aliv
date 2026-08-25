import { ChapterTrace } from "./VitalTrace";
import { useReveal, useScrollProgress, useCountUp } from "@/hooks/useMotion";

/* ============================================================
   The seven AI Employees.

   Each is a chapter, not a feature card: the problem is stated in the
   customer's own voice (serif italic), the trace flatlines, and the
   solution arrives in the agency's voice (grotesque). Employees 01-06
   seal a leak. 07 is the one that pours the fuel back in.
   ============================================================ */

type Readout = {
  /** Optional "from" figure, shown struck through before the arrow. */
  before?: string;
  prefix?: string;
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
};

type Employee = {
  n: string;
  name: string;
  problem: string;
  solution: string;
  body: string;
  capabilities: string[];
  readout: Readout;
  outcome: string;
};

export const EMPLOYEES: Employee[] = [
  {
    n: "01",
    name: "The Digital Storefront",
    problem: "The page never loaded.",
    solution: "The AI Website — Mobile + Load-Speed Optimized",
    body: "A patient taps your listing on a phone, on cellular, in someone else's waiting room. You have about three seconds. We rebuild the practice site around that moment: served fast, legible at arm's length, with booking reachable from anywhere on the page.",
    capabilities: [
      "Sub-second load on mobile networks",
      "Booking reachable from every screen",
      "Built to convert the first visit, not the fifth",
    ],
    readout: {
      before: "4.2s",
      value: 0.6,
      decimals: 1,
      suffix: "s",
      label: "Median mobile load",
    },
    outcome: "Leak sealed",
  },
  {
    n: "02",
    name: "The Outreach Specialist",
    problem: "I forgot they existed.",
    solution: "Database Reactivation",
    body: "The cheapest revenue in your practice is already in your records — patients who lapsed, matters you closed, enquiries that went cold. The Outreach Specialist works that list continuously and re-opens the conversations worth re-opening.",
    capabilities: [
      "Segments dormant records by recency and value",
      "Personal outreach by SMS and email, not blast campaigns",
      "Books directly into your calendar",
    ],
    readout: {
      value: 18,
      suffix: "%",
      label: "Of dormant records reactivated in 90 days",
    },
    outcome: "Leak sealed",
  },
  {
    n: "03",
    name: "The Reputation Manager",
    problem: "I didn't trust them.",
    solution: "Reviews & Referrals",
    body: "Before anyone books a consultation, they read about you. The Reputation Manager asks every satisfied patient and client for a review at the moment they are most likely to leave one, routes unhappy feedback to you privately first, and turns your strongest relationships into referrals.",
    capabilities: [
      "Review requests timed to the end of a good visit",
      "Private routing for negative feedback before it goes public",
      "Referral prompts to your strongest relationships",
    ],
    readout: {
      prefix: "+",
      value: 1.1,
      decimals: 1,
      suffix: "★",
      label: "Average rating gain in 60 days",
    },
    outcome: "Leak sealed",
  },
  {
    n: "04",
    name: "The Website Manager",
    problem: "I reached out and heard nothing back.",
    solution: "Website Lead Nurturing",
    body: "A form submitted at nine on a Friday night is worth almost nothing by Monday. The Website Manager answers every enquiry the moment it arrives, asks the qualifying questions your front desk would ask, and keeps the thread alive until the person books or tells you to stop.",
    capabilities: [
      "First reply in under thirty seconds, at any hour",
      "Qualifies intent, urgency and coverage before you spend time",
      "Multi-step follow-up that stops when it should",
    ],
    readout: {
      before: "6h 40m",
      prefix: "<",
      value: 30,
      suffix: "s",
      label: "First response time",
    },
    outcome: "Leak sealed",
  },
  {
    n: "05",
    name: "The Receptionist",
    problem: "I called and nobody picked up.",
    solution: "Missed-Call Text-Back / AI Receptionist",
    body: "Most people who reach a voicemail never leave one — they call the next practice on the list. The Receptionist answers the calls your team cannot, and any call that still goes unanswered gets a text back before the caller has put the phone down.",
    capabilities: [
      "Answers overflow, after-hours and holiday calls",
      "Texts back every missed call within seconds",
      "Books, reschedules and cancels against your live calendar",
    ],
    readout: {
      value: 100,
      suffix: "%",
      label: "Of inbound calls answered or texted back",
    },
    outcome: "Leak sealed",
  },
  {
    n: "06",
    name: "The Closer's Coach",
    problem: "I talked to them, but they didn't convince me.",
    solution: "The AI Sales Coach",
    body: "The consultation happened and the patient still went elsewhere. The Sales Coach reviews how those conversations actually go — which objections stall them, which explanations land — and gives your team the specific correction, per person, per call.",
    capabilities: [
      "Reviews consultation and intake calls for objection patterns",
      "Per-person coaching notes, not generic scripts",
      "Tracks which explanations convert and which lose the room",
    ],
    readout: {
      value: 2.4,
      decimals: 1,
      suffix: "×",
      label: "Lead-to-appointment conversion",
    },
    outcome: "Leak sealed",
  },
  {
    n: "07",
    name: "The Marketing Director",
    problem: "I never knew they existed in the first place.",
    solution: "Paid Ads with AI Nurturing",
    body: "Every leak above assumes someone found you. The Marketing Director is the one employee that pours in rather than plugs: paid campaigns across search and social, with each lead qualified and nurtured by the six employees already in place before it ever reaches your calendar.",
    capabilities: [
      "High-intent search and local social campaigns",
      "Pre-qualification before spend reaches your front desk",
      "Every new lead handed to the six employees above",
    ],
    readout: {
      value: 42,
      suffix: "%",
      label: "Lower cost per qualified lead",
    },
    outcome: "Fuel poured",
  },
];

/** A single instrument reading, counted up on arrival. */
function ReadoutPanel({ readout }: { readout: Readout }) {
  const { ref, value } = useCountUp(readout.value, {
    decimals: readout.decimals ?? 0,
  });
  const shown = (readout.decimals ?? 0) > 0
    ? value.toFixed(readout.decimals)
    : Math.round(value).toString();

  return (
    <div className="rv border-t border-ink pt-5">
      <div className="flex items-baseline gap-3 flex-wrap">
        {readout.before && (
          <>
            <span className="figure text-lg text-stone-mid line-through decoration-stone-mid/50">
              {readout.before}
            </span>
            <span aria-hidden="true" className="text-stone-mid text-sm">
              →
            </span>
          </>
        )}
        <span
          ref={ref}
          className="figure text-4xl md:text-5xl text-coral tabular-nums"
        >
          {readout.prefix}
          {shown}
          {readout.suffix}
        </span>
      </div>
      <p className="label text-stone-mid mt-3 leading-[1.6]">{readout.label}</p>
    </div>
  );
}

function Chapter({ e, index }: { e: Employee; index: number }) {
  const revealRef = useReveal<HTMLDivElement>({ threshold: 0.12, stagger: 60 });
  const progressRef = useScrollProgress<HTMLElement>("--p", {
    start: 0.85,
    end: 0.3,
  });
  // Alternating the problem's alignment weaves the page left-to-right
  // without giving each chapter a different design.
  const flip = index % 2 === 1;

  return (
    <article
      id={`employee-${e.n}`}
      ref={progressRef}
      className="relative scroll-mt-24"
      aria-labelledby={`employee-${e.n}-heading`}
    >
      <div ref={revealRef} className="shell">
        {/* --- Chapter head: a ruled masthead --- */}
        <div className="rv-rule h-px bg-ink origin-left" />
        <header className="flex items-baseline justify-between gap-6 pt-5 pb-[var(--chapter-gap)] flex-wrap">
          <span className="label text-stone-mid">
            AI Employee <span className="text-coral-ink">{e.n}</span>
          </span>
          <h2
            id={`employee-${e.n}-heading`}
            className="display-sm text-ink"
          >
            {e.name}
          </h2>
        </header>

        {/* --- Beat one: the problem, in the patient's voice --- */}
        <div
          className={`max-w-3xl ${flip ? "md:ml-auto md:text-right" : ""}`}
        >
          <p className="label text-stone-mid mb-6 rv">The Problem</p>
          <blockquote className="rv-wipe">
            <p className="voice text-ink text-[clamp(2rem,6.2vw,4.5rem)]">
              <span aria-hidden="true" className="text-stone-mid">“</span>
              {e.problem}
              <span aria-hidden="true" className="text-stone-mid">”</span>
            </p>
          </blockquote>
        </div>

        {/* --- The turn: the trace flatlines, then recovers --- */}
        <div className="my-[clamp(2.25rem,4.5vw,3.75rem)]">
          <ChapterTrace index={index} />
        </div>

        {/* --- Beat two: the solution, in the system's voice --- */}
        <div className="grid gap-x-16 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label text-coral-ink mb-6 rv">The Solution</p>
            <h3 className="display-md text-ink mb-8 rv text-balance">
              {e.solution}
            </h3>
            <p className="prose-body rv">{e.body}</p>
          </div>

          <div className="md:col-span-5 md:pt-[3.25rem]">
            <ul className="mb-12 space-y-0">
              {e.capabilities.map((c) => (
                <li
                  key={c}
                  className="rv flex gap-5 py-4 border-t border-rule text-[0.9375rem] leading-relaxed text-stone-mid"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6em] w-[5px] h-[5px] shrink-0 rotate-45 bg-coral"
                  />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <ReadoutPanel readout={e.readout} />
          </div>
        </div>

        {/* --- Chapter close: the ledger stamp --- */}
        <div className="flex items-center gap-4 pt-[clamp(2.5rem,5vw,4rem)] pb-[clamp(3.5rem,7vw,6rem)]">
          <span className="label text-coral-ink">{e.outcome}</span>
          <span className="rv-rule flex-1 h-px bg-rule origin-left" />
          <span className="label text-stone-mid">{e.n} / 07</span>
        </div>
      </div>
    </article>
  );
}

const AIEmployees = () => {
  const introRef = useReveal<HTMLDivElement>({ threshold: 0.2, stagger: 70 });

  return (
    <section
      id="employees"
      className="relative bg-paper pt-[var(--chapter-y)]"
      aria-labelledby="employees-heading"
    >
      {/* --- Section masthead --- */}
      <div ref={introRef} className="shell pb-[clamp(4rem,10vw,8rem)]">
        <div className="grid gap-x-16 gap-y-8 md:grid-cols-12 items-end">
          <div className="md:col-span-7">
            <p className="label text-stone-mid mb-8 rv">
              Seven leaks · Seven employees
            </p>
            <h2 id="employees-heading" className="display-lg text-ink rv-wipe">
              Revenue doesn't walk out. It leaks.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="prose-body rv">
              Not to price, and not to a better competitor. It escapes through
              the gaps between a lead arriving and someone acting on it — the
              same seven gaps in every practice we audit. Each one below is a
              chapter: the leak in the customer's own words, then the employee
              that closes it.
            </p>
          </div>
        </div>
      </div>

      {EMPLOYEES.map((e, i) => (
        <Chapter key={e.n} e={e} index={i} />
      ))}
    </section>
  );
};

export default AIEmployees;
