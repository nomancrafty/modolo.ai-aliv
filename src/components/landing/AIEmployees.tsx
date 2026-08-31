import {
  Smartphone,
  RefreshCw,
  Star,
  MessageSquare,
  PhoneCall,
  GraduationCap,
  Megaphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ============================================================
   Seven AI Employees — the leaks, in chapters.

   The section reads as a sequence of numbered chapters: for each of the
   seven gaps a practice loses revenue through, the leak is stated in the
   customer's own words, then the employee that closes it is introduced.

   Static by design — no reveal, no scroll drive, no count-up — to stay
   consistent with the rest of the site's disabled motion.

   NOTE ON STATISTICS: some supplied statistics carry no numeric value
   (e.g. "Lower cost per qualified lead"). Those are intentionally omitted
   from `statistic` below and surfaced in the implementation report, rather
   than shown as an empty/broken readout or filled with invented numbers.
   Only chapters 01 and 04 ship a complete, numeric statistic.
   ============================================================ */

export type Employee = {
  /** Chapter number, e.g. "01". */
  n: string;
  /** Employee role — also feeds the hero trace marker labels. */
  name: string;
  icon: LucideIcon;
  /** The leak, in the customer's own words. */
  problem: string;
  /** The product/employee that closes the leak. */
  solution: string;
  description: string;
  benefits: string[];
  /** Present only when the supplied statistic carries a numeric value. */
  statistic?: string;
  status: string;
};

/** Seven employees, in narrative order. */
export const EMPLOYEES: Employee[] = [
  {
    n: "01",
    name: "The Digital Storefront",
    icon: Smartphone,
    problem: "The page never loaded.",
    solution: "The AI Website — Mobile + Load-Speed Optimized",
    description:
      "A patient taps your listing on a phone, on cellular, in someone else's waiting room. You have about three seconds. We rebuild the practice site around that moment: served fast, legible at arm's length, with booking reachable from anywhere on the page.",
    benefits: [
      "Sub-second load on mobile networks",
      "Booking reachable from every screen",
      "Built to convert the first visit, not the fifth",
    ],
    statistic: "Median mobile load 4.2s → 0.6s",
    status: "Leak sealed — 01/07",
  },
  {
    n: "02",
    name: "The Outreach Specialist",
    icon: RefreshCw,
    problem: "I forgot they existed.",
    solution: "Database Reactivation",
    description:
      "The cheapest revenue in your practice is already in your records — patients who lapsed, matters you closed, enquiries that went cold. The Outreach Specialist works that list continuously and re-opens the conversations worth re-opening.",
    benefits: [
      "Segments dormant records by recency and value",
      "Personal outreach by SMS and email, not blast campaigns",
      "Books directly into your calendar",
    ],
    // Supplied statistic text carried no number ("Of dormant records
    // reactivated in 90 days") — omitted; see report.
    status: "Leak sealed — 02/07",
  },
  {
    n: "03",
    name: "The Reputation Manager",
    icon: Star,
    problem: "I didn't trust them.",
    solution: "Reviews & Referrals",
    description:
      "Before anyone books a consultation, they read about you. The Reputation Manager asks every satisfied patient and client for a review at the moment they are most likely to leave one, routes unhappy feedback to you privately first, and turns your strongest relationships into referrals.",
    benefits: [
      "Review requests timed to the end of a good visit",
      "Private routing for negative feedback before it goes public",
      "Referral prompts to your strongest relationships",
    ],
    // Supplied statistic text carried no number ("Average rating gain in
    // 60 days") — omitted; see report.
    status: "Leak sealed — 03/07",
  },
  {
    n: "04",
    name: "The Website Manager",
    icon: MessageSquare,
    problem: "I reached out and heard nothing back.",
    solution: "Website Lead Nurturing",
    description:
      "A form submitted at nine on a Friday night is worth almost nothing by Monday. The Website Manager answers every enquiry the moment it arrives, asks the qualifying questions your front desk would ask, and keeps the thread alive until the person books or tells you to stop.",
    benefits: [
      "First reply in under thirty seconds, at any hour",
      "Qualifies intent, urgency and coverage before you spend time",
      "Multi-step follow-up that stops when it should",
    ],
    statistic: "First response time 6h 40m → <30s",
    status: "Leak sealed — 04/07",
  },
  {
    n: "05",
    name: "The Receptionist",
    icon: PhoneCall,
    problem: "I called and nobody picked up.",
    solution: "Missed-Call Text-Back / AI Receptionist",
    description:
      "Most people who reach a voicemail never leave one — they call the next practice on the list. The Receptionist answers the calls your team cannot, and any call that still goes unanswered gets a text back before the caller has put the phone down.",
    benefits: [
      "Answers overflow, after-hours and holiday calls",
      "Texts back every missed call within seconds",
      "Books, reschedules and cancels against your live calendar",
    ],
    // Supplied statistic text carried no number ("Of inbound calls answered
    // or texted back") — omitted; see report.
    status: "Leak sealed — 05/07",
  },
  {
    n: "06",
    name: "The Closer's Coach",
    icon: GraduationCap,
    problem: "I talked to them, but they didn't convince me.",
    solution: "The AI Sales Coach",
    description:
      "The consultation happened and the patient still went elsewhere. The Sales Coach reviews how those conversations actually go — which objections stall them, which explanations land — and gives your team the specific correction, per person, per call.",
    benefits: [
      "Reviews consultation and intake calls for objection patterns",
      "Per-person coaching notes, not generic scripts",
      "Tracks which explanations convert and which lose the room",
    ],
    // Supplied statistic text carried no number ("Lead-to-appointment
    // conversion") — omitted; see report.
    status: "Leak sealed — 06/07",
  },
  {
    n: "07",
    name: "The Marketing Director",
    icon: Megaphone,
    problem: "I never knew they existed in the first place.",
    solution: "Paid Ads with AI Nurturing",
    description:
      "Every leak above assumes someone found you. The Marketing Director is the one employee that pours in rather than plugs: paid campaigns across search and social, with each lead qualified and nurtured by the six employees already in place before it ever reaches your calendar.",
    benefits: [
      "High-intent search and local social campaigns",
      "Pre-qualification before spend reaches your front desk",
      "Every new lead handed to the six employees above",
    ],
    // Supplied statistic text carried no number ("Lower cost per qualified
    // lead") — omitted; see report.
    status: "Fuel poured — 07/07",
  },
];

function Chapter({ e }: { e: Employee }) {
  const Icon = e.icon;
  return (
    <li className="grid gap-x-12 gap-y-8 md:grid-cols-12 py-14 border-t border-ink">
      {/* Index + identity */}
      <div className="md:col-span-3">
        <div className="flex items-center gap-3 mb-4">
          <span className="figure block text-[2.5rem] leading-none text-coral">
            {e.n}
          </span>
          <Icon
            className="w-[18px] h-[18px] text-coral-ink"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
        <h3 className="display-sm !text-[1.125rem] lg:!text-[1.25rem] text-ink leading-tight">
          {e.name}
        </h3>
        <span className="label text-stone-mid block mt-3 leading-[1.7]">
          {e.status}
        </span>
      </div>

      {/* The leak, then the employee that closes it */}
      <div className="md:col-span-5">
        <blockquote className="voice text-[clamp(1.5rem,2.4vw,2rem)] text-ink mb-6">
          &ldquo;{e.problem}&rdquo;
        </blockquote>
        <h4 className="display-sm text-ink mb-4">{e.solution}</h4>
        <p className="text-[0.9375rem] leading-relaxed text-stone-mid max-w-[48ch]">
          {e.description}
        </p>
      </div>

      {/* What it does, then the reading */}
      <div className="md:col-span-4">
        <p className="label text-stone-mid mb-5">What it does</p>
        <ul className={e.statistic ? "mb-8" : ""}>
          {e.benefits.map((b) => (
            <li
              key={b}
              className="flex gap-4 py-2.5 border-t border-rule text-[0.9375rem] leading-relaxed text-stone-mid"
            >
              <span
                aria-hidden="true"
                className="mt-[0.62em] w-[4px] h-[4px] shrink-0 rotate-45 bg-coral"
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {e.statistic && (
          <div className="border-t border-ink pt-5">
            <p className="label text-stone-mid mb-2">Reading</p>
            <p className="figure text-[1.0625rem] md:text-lg text-ink leading-snug">
              {e.statistic}
            </p>
          </div>
        )}
      </div>
    </li>
  );
}

const AIEmployees = () => {
  return (
    <section
      id="employees"
      className="bg-paper py-[var(--chapter-y)]"
      aria-labelledby="employees-heading"
    >
      <div className="shell">
        {/* Masthead */}
        <div className="grid gap-x-16 gap-y-8 md:grid-cols-12 items-end mb-[clamp(3rem,7vw,5rem)]">
          <div className="md:col-span-7">
            <p className="label text-stone-mid mb-8">
              Seven leaks · Seven employees
            </p>
            <h2 id="employees-heading" className="display-lg text-ink">
              Revenue doesn&rsquo;t walk out. It leaks.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="prose-body">
              Not to price, and not to a better competitor. It escapes through
              the gaps between a lead arriving and someone acting on it — the
              same seven gaps in every practice we audit. Each one below is a
              chapter: the leak in the customer&rsquo;s own words, then the
              employee that closes it.
            </p>
          </div>
        </div>

        {/* The seven chapters */}
        <ol>
          {EMPLOYEES.map((e) => (
            <Chapter key={e.n} e={e} />
          ))}
        </ol>
        <div className="border-t border-ink" />
      </div>
    </section>
  );
};

export default AIEmployees;
