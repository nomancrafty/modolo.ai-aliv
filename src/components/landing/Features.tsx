import {
  Phone,
  ClipboardList,
  Search,
  TrendingUp,
  Tv,
  Instagram,
  Share2,
  Award,
  FileText,
  Calendar,
  MessageSquare,
  Info,
  HelpCircle,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useReveal } from "@/hooks/useMotion";

/* Copy below is unchanged from the existing site. Only its presentation
   has moved: from bordered cards to a ruled capability index. */

type Service = {
  icon: LucideIcon;
  title: string;
  description?: string;
  bullets: string[];
};

const advertisingServices: Service[] = [
  {
    icon: Tv,
    title: "TV Advertising",
    description: "Local TV campaigns connected to AI call handling and booking.",
    bullets: ["Local TV campaign setup", "Appointment booking from ads", "Instant engagement with prospects"],
  },
  {
    icon: TrendingUp,
    title: "Google Ads",
    description: "High-intent search traffic with instant AI response.",
    bullets: ["High-intent keyword targeting", "Landing page optimization", "Call answering and appointment booking"],
  },
  {
    icon: Instagram,
    title: "Facebook / Instagram Ads",
    description: "Automated lead qualification and follow-ups.",
    bullets: ["Local audience targeting", "Offer & lead campaigns", "Automated Follow-up & Message Handling"],
  },
];

const marketingServices: Service[] = [
  {
    icon: Award,
    title: "Practice Brand",
    description: "Build authority and trust in your local market.",
    bullets: ["Brand positioning", "Reputation monitoring", "Creative Assets Production"],
  },
  {
    icon: Share2,
    title: "Social Media Exposure",
    description: "Consistent visibility on Facebook & Instagram.",
    bullets: ["Scheduled content", "AI-generated captions", "Engagement tracking"],
  },
  {
    icon: Search,
    title: "Search Optimization (SEO / AEO / GEO)",
    description: "Get found first on Google, Maps, and web search.",
    bullets: ["Local SEO optimization", "Google Maps ranking", "Voice with Web"],
  },
];

const receptionistServices: Service[] = [
  {
    icon: Info,
    title: "Provides Information",
    bullets: ["Services & pricing details", "Insurance & coverage guidance", "Office hours & locations", "Treatment / case process explanation"],
  },
  {
    icon: Users,
    title: "Collects Information",
    bullets: ["New patient & client details", "Contact information", "Insurance data", "Case / visit reason"],
  },
  {
    icon: HelpCircle,
    title: "Answers Questions",
    bullets: ["Common patient & client inquiries", "Appointment availability", "Preparation instructions", "Follow-up questions"],
  },
];

const assistantServices: Service[] = [
  {
    icon: FileText,
    title: "Fills Out Forms",
    bullets: ["Intake forms", "Patient & client profiles", "CRM updates", "Case documentation"],
  },
  {
    icon: Calendar,
    title: "Books Appointment",
    bullets: ["Real-time scheduling", "Calendar syncing", "Reschedules & cancellations", "Confirmation messages"],
  },
  {
    icon: MessageSquare,
    title: "Conducts Follow-Ups",
    bullets: ["SMS & email reminders", "No-show recovery", "Lead nurturing", "Post-visit check-ins"],
  },
];

function ServiceEntry({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <div className="rv panel p-6 md:p-7 h-full">
      <div className="flex items-center gap-3 mb-4">
        <Icon
          className="w-[18px] h-[18px] text-coral shrink-0"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h5 className="display-sm text-ink">{service.title}</h5>
      </div>
      {service.description && (
        <p className="text-[0.9375rem] leading-relaxed text-stone-mid mb-5 max-w-[38ch]">
          {service.description}
        </p>
      )}
      <ul>
        {service.bullets.map((bullet) => (
          <li
            key={bullet}
            className="text-[0.875rem] text-stone-mid py-2.5 border-t border-rule leading-[1.6]"
          >
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Division({
  title,
  services,
  columns,
}: {
  title: string;
  services: Service[];
  columns: string;
}) {
  return (
    <div>
      <p className="eyebrow eyebrow-muted mb-8 rv">{title}</p>
      <div className={`grid gap-4 ${columns}`}>
        {services.map((s) => (
          <ServiceEntry key={s.title} service={s} />
        ))}
      </div>
    </div>
  );
}

const Features = () => {
  const head = useReveal<HTMLDivElement>({ threshold: 0.15, stagger: 70 });
  const demand = useReveal<HTMLDivElement>({ threshold: 0.08, stagger: 45 });
  const office = useReveal<HTMLDivElement>({ threshold: 0.08, stagger: 45 });

  return (
    <section id="features" className="band-deep py-[var(--chapter-y)]">
      <div className="shell">
        {/* Masthead */}
        <div ref={head} className="grid gap-x-16 gap-y-8 md:grid-cols-12 items-end mb-[clamp(4rem,9vw,7rem)]">
          <div className="md:col-span-7">
            <p className="eyebrow mb-8 rv">MODOLO AI Technology Solutions</p>
            <h2 className="display-lg text-ink rv-wipe">
              MODOLO AI — Demand Generation &amp; AI Office Operations
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="prose-body rv">
              Specialized AI systems for medical clinics, dental practices, and
              law offices. We increase lead volume, qualify prospects, automate
              follow-ups, boost bookings, and reduce staff workload — fully
              compliant with regulated industries.
            </p>
          </div>
        </div>

        {/* Demand generation */}
        <div ref={demand} className="mb-[clamp(5rem,11vw,9rem)]">
          <div className="flex items-baseline gap-6 mb-14">
            <h3 className="display-md text-ink">Demand Generation</h3>
            <span className="rv-rule flex-1 h-px bg-ink origin-left" />
          </div>

          <div className="space-y-16">
            <Division
              title="Advertising"
              services={advertisingServices}
              columns="md:grid-cols-3"
            />
            <Division
              title="Marketing"
              services={marketingServices}
              columns="md:grid-cols-3"
            />
          </div>
        </div>

        {/* Office automation */}
        <div ref={office}>
          <div className="flex items-baseline gap-6 mb-14">
            <h3 className="display-md text-ink">Office Automation</h3>
            <span className="rv-rule flex-1 h-px bg-ink origin-left" />
          </div>

          <div className="grid gap-x-16 gap-y-16 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Phone className="w-[18px] h-[18px] text-ink" strokeWidth={1.5} aria-hidden="true" />
                <h4 className="label text-ink">Receptionist</h4>
              </div>
              <div className="grid gap-4">
                {receptionistServices.map((s) => (
                  <ServiceEntry key={s.title} service={s} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <ClipboardList className="w-[18px] h-[18px] text-ink" strokeWidth={1.5} aria-hidden="true" />
                <h4 className="label text-ink">Executive Assistant</h4>
              </div>
              <div className="grid gap-4">
                {assistantServices.map((s) => (
                  <ServiceEntry key={s.title} service={s} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
