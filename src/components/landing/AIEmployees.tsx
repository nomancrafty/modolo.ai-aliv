import {
  GraduationCap,
  Phone,
  RefreshCw,
  Star,
  Globe,
  Megaphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ============================================================
   AI Employees — monitoring bus.

   MOCK. MODOLO AI sits on a bar across the top; the six employees hang
   off it on a rail, the way modules hang off a monitored bus. Replaces
   the circular wheel.

   Static by design — no reveal, no scroll drive, no count-up.
   ============================================================ */

export type Employee = {
  n: string;
  name: string;
  icon: LucideIcon;
};

/** Six employees, left to right along the bus. */
export const EMPLOYEES: Employee[] = [
  { n: "01", name: "AI Sales Coaching", icon: GraduationCap },
  { n: "02", name: "AI Receptionist", icon: Phone },
  { n: "03", name: "AI Reengagement Campaigns", icon: RefreshCw },
  { n: "04", name: "AI Reviews & Referrals", icon: Star },
  { n: "05", name: "AI Website Lead Nurture", icon: Globe },
  { n: "06", name: "AI Lead Gen (Paid Ads)", icon: Megaphone },
];

function EmployeeCard({ e }: { e: Employee }) {
  const Icon = e.icon;
  return (
    <div className="h-full bg-paper-raised border border-rule p-5 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <span className="label text-stone-mid">{e.n}</span>
        <Icon
          className="w-[18px] h-[18px] text-coral-ink"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
      <h3 className="display-sm !text-[0.9375rem] lg:!text-base text-ink leading-tight">
        {e.name}
      </h3>
    </div>
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
              Six AI employees · One system
            </p>
            <h2 id="employees-heading" className="display-lg text-ink">
              Revenue doesn&rsquo;t walk out. It leaks.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="prose-body">
              Six employees run against the same monitored loop. Each one closes
              a gap between a lead arriving and someone acting on it.
            </p>
          </div>
        </div>

        {/* ---------- The bus bar ---------- */}
        <div className="bg-paper-raised border border-ink px-6 py-6 md:px-9 md:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="w-2.5 h-2.5 rotate-45 bg-coral shrink-0"
            />
            <span className="display-sm !text-[1.125rem] md:!text-[1.375rem] text-ink">
              MODOLO AI
            </span>
          </div>
          <span
            aria-hidden="true"
            className="hidden md:block flex-1 h-px bg-rule mx-8"
          />
          <span className="label text-stone-mid">Automation Monitoring</span>
        </div>

        {/* ---------- Rail + drops (md and up) ---------- */}
        <div className="hidden md:block" aria-hidden="true">
          {/* trunk out of the bar */}
          <span className="block w-px h-8 bg-rule mx-auto" />
          <span className="block h-px bg-rule" />
          {/* One drop per employee. This grid carries the same columns and
              gap as the card grid below, so each drop lands dead centre on
              its card at every width. */}
          <div className="grid grid-cols-6 gap-3">
            {EMPLOYEES.map((e) => (
              <span key={e.n} className="block w-px h-8 bg-rule mx-auto" />
            ))}
          </div>
        </div>

        {/* ---------- The six ---------- */}
        <ul className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-6 md:mt-0">
          {EMPLOYEES.map((e) => (
            <li key={e.n}>
              <EmployeeCard e={e} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AIEmployees;
