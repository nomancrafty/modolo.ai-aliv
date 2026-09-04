import { Twitter, Linkedin, Facebook } from "lucide-react";
import { useReveal } from "@/hooks/useMotion";

// New MODOLO AI logo, served from /public (intrinsic 2546×1664). `h-14 w-auto`
// renders it and preserves aspect ratio; the attrs carry the intrinsic ratio.
const LOGO_SRC = "/favicon.png";

/* Copy unchanged. The old heartbeat trace across the top has been retired
   with the rest of the pulse identity; the section now opens on the same
   clean rule-and-diamond divider used between chapters. */

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const ref = useReveal<HTMLDivElement>({ threshold: 0.1, stagger: 40 });

  const links = {
    // The old #features section was removed; these keep their wording and now
    // point at the seven-employee solutions section (#employees).
    solutions: [
      { label: "AI Voice Receptionist", href: "#employees" },
      { label: "Calendar Management", href: "#employees" },
      { label: "Review Management", href: "#employees" },
      { label: "SEO & Advertising", href: "#employees" },
    ],
    // "How It Works" removed with its section; no confirmed destination yet.
    company: [
      { label: "About Us", href: "#" },
      { label: "Results", href: "#testimonials" },
      { label: "Contact", href: "#cta" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "HIPAA Compliance", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  return (
    <footer className="relative overflow-hidden bg-paper pt-[clamp(3rem,7vw,5rem)] pb-14">
      {/* A very faint, static corner haze — atmosphere, no motion. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span
          className="glow"
          style={{
            width: "min(50vw, 560px)",
            height: "min(30vw, 340px)",
            bottom: "-14%",
            right: "-6%",
            background: "radial-gradient(circle, hsl(var(--peach) / 0.4), transparent 72%)",
          }}
        />
      </div>
      <div ref={ref} className="relative shell">
        <div className="rv mb-[clamp(3rem,7vw,5rem)]" aria-hidden="true">
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-rule" />
            <span className="w-1.5 h-1.5 rotate-45 bg-coral shrink-0" />
            <span className="h-px flex-1 bg-rule" />
          </div>
        </div>

        <div className="grid gap-x-12 gap-y-14 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <img
              src={LOGO_SRC}
              alt="MODOLO AI"
              width={2546}
              height={1664}
              className="h-14 w-auto mb-7"
            />
            <p className="text-[1.0625rem] text-ink mb-1.5">
              Medical, Dental &amp; Law Office AI Solutions
            </p>
            <p className="label text-stone-mid mb-9">
              Demand Generation &amp; AI Office Operations
            </p>

            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-11 h-11 border border-rule flex items-center justify-center text-stone-mid hover:text-coral-ink hover:border-coral-ink transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-[18px] h-[18px]" strokeWidth={1.5} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <nav className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-12" aria-label="Footer">
            {(
              [
                ["Solutions", links.solutions],
                ["Company", links.company],
                ["Legal", links.legal],
              ] as const
            ).map(([heading, items]) => (
              <div key={heading}>
                <h4 className="label text-ink pb-4 mb-2 border-b border-ink">
                  {heading}
                </h4>
                <ul>
                  {items.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="block py-2.5 text-[0.9375rem] text-stone-mid hover:text-coral-ink transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Colophon */}
        <div className="mt-[clamp(3.5rem,8vw,6rem)] pt-8 border-t border-rule flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="label text-stone-mid">
            © {currentYear} MODOLO.AI All rights reserved.
          </p>
          <p className="label text-stone-mid">
            Medical, Dental &amp; Law Office AI Solutions
            <span className="text-stone-mid mx-2" aria-hidden="true">/</span>
            www.modolo.ai
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
