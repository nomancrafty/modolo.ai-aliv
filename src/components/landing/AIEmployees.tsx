import {
  Smartphone,
  RefreshCw,
  Star,
  MessageSquare,
  PhoneCall,
  GraduationCap,
  Megaphone,
  Check,
  X,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useReveal } from "@/hooks/useMotion";
import EmployeeJourney from "./EmployeeJourney";

/* ============================================================
   Seven AI Employees — the road and its seven exits.

   Every lead is a driver on the same road; there are seven exits where they
   leave before reaching the front door. Each chapter is one exit: the moment
   in the customer's own words, the narrative, a stats/callouts panel, and a
   full-width "Exit closed by" banner naming the AI employee that closes it.

   Data-driven: each exit is a record in EXITS, and the callouts panel renders
   from a typed list of blocks so every chapter reuses the same components.
   All copy is the client's, verbatim.
   ============================================================ */

/** One panel block on the right of a chapter. */
type Block =
  | { type: "lead"; text: string }
  | { type: "note"; text: string }
  | { type: "stats"; big?: boolean; items: { value: string; label: string }[] }
  | { type: "stack"; items: string[] }
  | {
      type: "bars";
      caption?: string;
      max?: number;
      items: { label: string; value: number; display: string }[];
    }
  | {
      type: "versus";
      caption?: string;
      a: { label: string; value: string };
      b: { label: string; value: string };
    }
  | { type: "verdict"; items: { status: "check" | "x"; tag: string; text: string }[] }
  | { type: "steps"; items: string[] };

type Exit = {
  /** Exit number, "1"–"7". */
  n: string;
  /** Employee identity. */
  name: string;
  icon: LucideIcon;
  /** The moment, in the customer's own words. */
  title: string;
  /** The supplied narrative, one entry per paragraph. */
  narrative: string[];
  /** Stats / callouts panel. */
  blocks: Block[];
  /** Full-width "Exit closed by" banner. */
  banner: { tag: string; solution: string; detail: string };
};

const EXITS: Exit[] = [
  {
    n: "1",
    name: "The Digital Storefront",
    icon: Smartphone,
    title: "The page never loaded.",
    narrative: [
      "Exit one: the page never loaded.",
      "They found the business, clicked the website... and sat there.",
      "The average local business site takes around 15 seconds to load — and Google’s own data says 53% of people are gone after 3.",
      "The ones who stay land on a site built on a computer that breaks on their phone — and 70% of these sites never even ask for their info.",
      "So the first thing you do is rebuild the website: under 2 seconds, mobile-first, one clear offer — like a ‘Get Pricing’ button that captures their name, phone, and email.",
      "Exit one closes, and the traffic they already have finally makes it through.",
    ],
    blocks: [
      { type: "stack", items: ["No offer.", "No form.", "Nothing to click."] },
      {
        type: "stats",
        items: [
          {
            value: "53%",
            label: "are gone in 3 seconds — before the door even opens (Google)",
          },
        ],
      },
      { type: "note", text: "Chance of losing the driver as load time grows" },
      {
        type: "bars",
        caption: "Bounce probability vs. a 1-second load — Google/SOASTA",
        items: [
          { label: "1 second", value: 32, display: "32" },
          { label: "2 seconds", value: 90, display: "90" },
          { label: "3 seconds", value: 123, display: "123" },
        ],
      },
    ],
    banner: {
      tag: "AI Employee #1",
      solution: "The AI Website",
      detail: "mobile-first, under 2 seconds, one clear offer",
    },
  },
  {
    n: "2",
    name: "The Outreach Specialist",
    icon: RefreshCw,
    title: "I forgot they existed.",
    narrative: [
      "Exit two: I forgot they existed.",
      "Every business is sitting on a database of old leads and past customers that nobody ever follows up with — the average rep makes just 1.3 attempts before giving up on a lead forever.",
      "But 93% of the leads that ever convert are reached by the sixth attempt.",
      "Almost everyone quits five attempts too early.",
      "The automation reaches back out to every old lead and past customer in the database and pulls them back onto the road.",
      "And it does it by text, not email — a 45% response rate instead of 6%.",
    ],
    blocks: [
      { type: "lead", text: "Free money, collecting dust." },
      { type: "note", text: "Old leads convert on the 6th touch — not the 1st." },
      {
        type: "stats",
        items: [
          { value: "1.3", label: "Attempts the average rep makes" },
          { value: "6th", label: "Where 93% of conversions happen" },
        ],
      },
      {
        type: "bars",
        caption: "Response rate: text vs. email (Gartner)",
        items: [
          { label: "Text message", value: 45, display: "45%" },
          { label: "Email", value: 6, display: "6%" },
        ],
      },
    ],
    banner: {
      tag: "AI Employee #2",
      solution: "Database Reactivation",
      detail: "texts every old lead back onto the road",
    },
  },
  {
    n: "3",
    name: "The Reputation Manager",
    icon: Star,
    title: "I didn’t trust them.",
    narrative: [
      "Exit three: I didn’t trust them.",
      "They checked the business, and found no reviews — or worse, bad ones.",
      "98% of people check reviews before they buy, but only 11% of local businesses ever ask for one.",
      "And research out of Harvard found that a single extra star can lift revenue 5 to 9%.",
      "The automation asks every happy customer for a review and a referral automatically — and quietly routes the unhappy ones to a private form, so only the good ones go public.",
    ],
    blocks: [
      { type: "lead", text: "The AI asks every customer." },
      {
        type: "stats",
        items: [
          { value: "98%", label: "of prospects reference reviews before they buy" },
          { value: "11%", label: "of businesses ever ask for one" },
        ],
      },
      {
        type: "verdict",
        items: [
          {
            status: "check",
            tag: "4–5 stars",
            text: "Posted to Google + referral ask to win a coupon",
          },
          {
            status: "x",
            tag: "1–3 stars",
            text: "Never published — owner gets the feedback privately",
          },
        ],
      },
    ],
    banner: {
      tag: "AI Employee #3",
      solution: "Reviews & Referrals",
      detail: "asks every customer, gates the bad ones",
    },
  },
  {
    n: "4",
    name: "The Website Manager",
    icon: MessageSquare,
    title: "I reached out and heard nothing back.",
    narrative: [
      "Exit four: I reached out and heard nothing back.",
      "They filled out the form and waited.",
      "The average business takes 42 hours to reply — and by the time anyone did, they’d already booked somewhere else.",
      "Hit a lead within 5 minutes and conversion jumps 400%.",
      "Wait hours, and that lead becomes someone else’s customer.",
      "The automation follows up within 5 minutes, 24/7, and works the conversation until they book.",
    ],
    blocks: [
      { type: "lead", text: "A reply in minutes — any hour, any day." },
      {
        type: "versus",
        caption: "Time to reply to a new website lead",
        a: { label: "The average business", value: "42+ hours" },
        b: { label: "Your AI employee", value: "under 5 minutes" },
      },
      {
        type: "stats",
        items: [
          { value: "400%", label: "Hit the 5-minute window and conversion jumps" },
        ],
      },
    ],
    banner: {
      tag: "AI Employee #4",
      solution: "Website Lead Nurturing",
      detail: "replies in minutes, books the appointment",
    },
  },
  {
    n: "5",
    name: "The Receptionist",
    icon: PhoneCall,
    title: "I called and nobody picked up.",
    narrative: [
      "Exit five: I called and nobody picked up.",
      "62 out of every 100 calls to local businesses go completely unanswered.",
      "That’s people ready to buy right now.",
      "They don’t leave a voicemail.",
      "They just call the next business on Google.",
      "The business is losing money just by not answering the phone.",
      "The automation texts them back within seconds, answers their questions, and books the appointment — even if the business owner is sleeping.",
    ],
    blocks: [
      { type: "lead", text: "Every call picked up — 24/7." },
      {
        type: "stats",
        big: true,
        items: [{ value: "62%", label: "of calls to local businesses go unanswered" }],
      },
      {
        type: "note",
        text: "Every missed call is a driver taking the exit to the competitor.",
      },
    ],
    banner: {
      tag: "AI Employee #5",
      solution: "AI Receptionist",
      detail: "missed-call text-back in seconds, 24/7",
    },
  },
  {
    n: "6",
    name: "The Closer’s Coach",
    icon: GraduationCap,
    title: "I talked to them, but they didn’t convince me.",
    narrative: [
      "Exit six: I talked to them, but they didn’t convince me.",
      "You can close every exit before this one and the business can still lose the client at the finish line — and they’ll blame it on you.",
      "70% of salespeople never got any formal sales training, and most are taking sales calls without a script.",
      "Without a process, the sale is lost 85% of the time.",
      "That’s why you build an AI sales coach on a proven process that trains the team to close.",
      "Scripts, objection handling, and graded role-play — before a real prospect ever walks in.",
    ],
    blocks: [
      { type: "lead", text: "Train the play before the prospect walks in." },
      {
        type: "stats",
        items: [
          { value: "70%", label: "of salespeople never got formal sales training" },
          { value: "85%", label: "of sales lost without a process" },
        ],
      },
      {
        type: "verdict",
        items: [
          { status: "x", tag: "Objection", text: "“Too expensive”" },
          { status: "x", tag: "Objection", text: "“Need to ask my spouse”" },
          { status: "x", tag: "Objection", text: "“I’ll come back later”" },
          { status: "check", tag: "Result", text: "Objection handled. Deal closed." },
        ],
      },
    ],
    banner: {
      tag: "AI Employee #6",
      solution: "AI Sales Coach",
      detail: "a proven process that trains the team to close",
    },
  },
  {
    n: "7",
    name: "The Marketing Director",
    icon: Megaphone,
    title: "I never knew they existed in the first place.",
    narrative: [
      "Exit seven: I never knew they existed in the first place.",
      "This is the last part of the system — running ads to make sure they know the business exists, and putting more drivers on the road.",
      "Most local businesses already spend around $5,000 a month on marketing.",
      "But they’re pouring it onto a road with six open exits.",
      "Close the first six exits first.",
      "Then the ads go on, the AI works every click instantly, and every new driver actually makes it to the front door.",
    ],
    blocks: [
      { type: "lead", text: "Every click gets worked." },
      {
        type: "stats",
        items: [
          {
            value: "$5K/mo",
            label:
              "average local business marketing spend — poured onto a road with six open exits",
          },
        ],
      },
      {
        type: "steps",
        items: [
          "Someone clicks the ad and submits their info",
          "The AI reaches out instantly — any hour",
          "Booked on the calendar, 24/7",
        ],
      },
    ],
    banner: {
      tag: "AI Employee #7",
      solution: "Paid Ads + AI Nurturing",
      detail: "new drivers on a road with no exits",
    },
  },
];

/* ---------- Panel blocks ---------- */

function Callouts({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "lead":
            return (
              <p
                key={i}
                className="rv display-sm !text-[1.0625rem] md:!text-[1.1875rem] text-ink leading-snug"
              >
                {block.text}
              </p>
            );

          case "note":
            return (
              <p key={i} className="rv text-[0.875rem] leading-relaxed text-stone-mid">
                {block.text}
              </p>
            );

          case "stats":
            return (
              <div key={i} className="rv space-y-6">
                {block.items.map((s) => (
                  <div key={s.label}>
                    <p
                      className={`figure text-ink leading-none ${
                        block.big
                          ? "text-[3rem] md:text-[3.5rem]"
                          : "text-[2rem] md:text-[2.25rem]"
                      }`}
                    >
                      {s.value}
                    </p>
                    <p className="label text-stone-mid mt-2.5 leading-[1.6]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            );

          case "stack":
            return (
              <div key={i} className="rv space-y-2.5">
                {block.items.map((t) => (
                  <p
                    key={t}
                    className="display-sm !text-[1.125rem] md:!text-[1.375rem] text-ink flex items-center gap-3"
                  >
                    <span
                      aria-hidden="true"
                      className="w-[6px] h-[6px] rotate-45 bg-coral shrink-0"
                    />
                    {t}
                  </p>
                ))}
              </div>
            );

          case "bars": {
            const max = block.max ?? Math.max(...block.items.map((b) => b.value));
            return (
              <div key={i} className="rv">
                {block.caption && (
                  <p className="label text-stone-mid mb-4 leading-[1.6]">
                    {block.caption}
                  </p>
                )}
                <div className="space-y-3.5">
                  {block.items.map((b) => (
                    <div key={b.label}>
                      <div className="flex items-baseline justify-between gap-4 mb-1.5">
                        <span className="text-[0.875rem] text-stone-mid">{b.label}</span>
                        <span className="figure text-[0.9375rem] text-ink">
                          {b.display}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-rule overflow-hidden">
                        <span
                          className="rv-bar block h-full bg-coral"
                          style={{ width: `${(b.value / max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          case "versus":
            return (
              <div key={i} className="rv">
                {block.caption && (
                  <p className="label text-stone-mid mb-4">{block.caption}</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <div className="border-t border-rule pt-4">
                    <p className="figure text-[1.5rem] md:text-[1.75rem] text-ink leading-none">
                      {block.a.value}
                    </p>
                    <p className="label text-stone-mid mt-2.5">{block.a.label}</p>
                  </div>
                  <div className="border-t border-coral-ink pt-4">
                    <p className="figure text-[1.5rem] md:text-[1.75rem] text-coral-ink leading-none">
                      {block.b.value}
                    </p>
                    <p className="label text-stone-mid mt-2.5">{block.b.label}</p>
                  </div>
                </div>
              </div>
            );

          case "verdict":
            return (
              <ul key={i} className="rv">
                {block.items.map((v, vi) => (
                  <li
                    key={vi}
                    className="flex items-start gap-3 py-3 border-t border-rule"
                  >
                    {v.status === "check" ? (
                      <Check
                        className="rv-pop w-[18px] h-[18px] text-coral-ink shrink-0 mt-0.5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    ) : (
                      <X
                        className="rv-pop w-[18px] h-[18px] text-stone-mid shrink-0 mt-0.5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    )}
                    <div className="min-w-0">
                      <span className="label text-ink block mb-1">
                        <span className="sr-only">
                          {v.status === "check" ? "Passes — " : "Filtered out — "}
                        </span>
                        {v.tag}
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-stone-mid">
                        {v.text}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );

          case "steps":
            return (
              <ol key={i} className="space-y-4">
                {block.items.map((t, si) => (
                  <li key={si} className="rv flex items-baseline gap-4">
                    <span className="figure text-[1.25rem] leading-none text-coral-ink shrink-0">
                      {String(si + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-ink">{t}</span>
                  </li>
                ))}
              </ol>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

function Chapter({ e }: { e: Exit }) {
  const Icon = e.icon;
  // Each exit reveals on entry, its parts staggered in reading order.
  const ref = useReveal<HTMLLIElement>({ stagger: 45 });

  return (
    <li
      ref={ref}
      id={`exit-${e.n}`}
      className="scroll-mt-[168px] md:scroll-mt-[184px] pt-[clamp(3rem,7vw,5rem)] first:pt-0"
    >
      <div className="grid gap-x-12 gap-y-10 md:grid-cols-12 border-t border-ink pt-[clamp(2rem,4vw,3rem)]">
        {/* Left — exit number + identity */}
        <div className="md:col-span-3">
          <div className="rv flex items-baseline gap-3 mb-4">
            <span className="label text-stone-mid">Exit</span>
            <span className="figure text-[3rem] md:text-[3.5rem] leading-none text-coral">
              {e.n}
            </span>
          </div>
          <div className="rv flex items-center gap-2.5">
            <Icon
              className="w-[18px] h-[18px] text-coral-ink shrink-0"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h3 className="display-sm !text-[1.125rem] lg:!text-[1.25rem] text-ink leading-tight">
              {e.name}
            </h3>
          </div>
        </div>

        {/* Center — title + narrative */}
        <div className="md:col-span-5">
          <blockquote className="rv-wipe voice text-[clamp(1.5rem,2.6vw,2.125rem)] text-ink mb-7">
            &ldquo;{e.title}&rdquo;
          </blockquote>
          <div className="space-y-4 max-w-[54ch]">
            {e.narrative.map((p, pi) => (
              <p
                key={pi}
                className="rv text-[0.9375rem] md:text-base leading-relaxed text-stone-mid"
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Right — stats and callouts */}
        <div className="md:col-span-4">
          <Callouts blocks={e.blocks} />
        </div>
      </div>

      {/* Bottom — full-width "Exit closed by" banner */}
      <div className="rv mt-[clamp(1.5rem,3.5vw,2.75rem)] bg-ink text-on-ink px-6 py-5 md:px-8 md:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-5 gap-y-2.5">
          <span className="label text-coral-bright inline-flex items-center gap-2 shrink-0">
            Exit closed by
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </span>
          <span className="text-[0.9375rem] leading-snug">
            <span className="label text-on-ink">
              {e.banner.tag} • {e.banner.solution}
            </span>
            <span className="text-on-ink-muted"> — {e.banner.detail}</span>
          </span>
        </div>
      </div>
    </li>
  );
}

const AIEmployees = () => {
  const head = useReveal<HTMLDivElement>({ threshold: 0.2, stagger: 80 });

  return (
    <section
      id="employees"
      className="relative bg-paper py-[var(--chapter-y)]"
      aria-labelledby="employees-heading"
    >
      {/* One extremely faint glow behind the introduction — atmosphere only,
          never over the long body copy below. In its own clip layer so it
          never adds page scroll and never blocks the sticky rail. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span
          className="glow"
          style={{
            width: "min(60vw, 640px)",
            height: "min(40vw, 420px)",
            top: "-6%",
            left: "-4%",
            background:
              "radial-gradient(circle, rgba(255,176,132,0.16), transparent 70%)",
          }}
        />
      </div>

      {/* Masthead */}
      <div className="relative shell">
        <div
          ref={head}
          className="grid gap-x-16 gap-y-8 md:grid-cols-12 items-end mb-[clamp(2.5rem,6vw,4rem)]"
        >
          <div className="md:col-span-7">
            <p className="rv label text-stone-mid mb-8">
              Seven exits · Seven AI employees
            </p>
            <h2 id="employees-heading" className="rv-wipe display-lg text-ink">
              Revenue doesn&rsquo;t walk out. It takes the exit.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="rv prose-body">
              Picture every lead as a driver on the same road — and seven exits
              where they leave before they ever reach the front door. Each
              chapter below is one exit: the moment in the customer&rsquo;s own
              words, then the AI employee that closes it.
            </p>
          </div>
        </div>
      </div>

      {/* The seven-stage system line — sticky on md+, tracks the reader. */}
      <EmployeeJourney stages={EXITS.map((e) => ({ n: e.n, name: e.name }))} />

      {/* The seven exits */}
      <div className="relative shell mt-[clamp(2.5rem,6vw,4rem)]">
        <ol>
          {EXITS.map((e) => (
            <Chapter key={e.n} e={e} />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default AIEmployees;
