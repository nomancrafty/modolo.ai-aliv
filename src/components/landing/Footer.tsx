import { Twitter, Linkedin, Facebook } from "lucide-react";
import modoloLogo from "@/assets/modolo-logo.png";
import { SteadyTrace } from "./VitalTrace";
import { useReveal, useScrollProgress } from "@/hooks/useMotion";

/* Copy unchanged. The trace across the top is the narrative's last beat:
   every leak sealed, the practice reading steady. */

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const ref = useReveal<HTMLDivElement>({ threshold: 0.1, stagger: 40 });
  const flowRef = useScrollProgress<HTMLDivElement>("--p", { start: 0.95, end: 0.55 });

  const links = {
    solutions: [
      { label: "AI Voice Receptionist", href: "#features" },
      { label: "Calendar Management", href: "#features" },
      { label: "Review Management", href: "#features" },
      { label: "SEO & Advertising", href: "#features" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "How It Works", href: "#how-it-works" },
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
    <footer className="bg-paper pt-[clamp(3rem,7vw,5rem)] pb-14">
      <div ref={ref} className="shell">
        <div ref={flowRef} className="mb-[clamp(3rem,7vw,5rem)]">
          <SteadyTrace />
        </div>

        <div className="grid gap-x-12 gap-y-14 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <img
              src={modoloLogo}
              alt="MODOLO AI"
              width={573}
              height={401}
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
            www.aifordp.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
