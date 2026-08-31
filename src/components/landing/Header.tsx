import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useScrolled } from "@/hooks/useMotion";

// New MODOLO AI logo, served from /public. Intrinsic size 2546×1664 — the
// width/height attrs below carry that ratio so the browser reserves the right
// box; `w-auto h-[54px]` drives the rendered size and preserves aspect ratio.
const LOGO_SRC = "/favicon.png";

// "MODOLO AI Solutions" points at the seven-employee section, which is the
// replacement for the removed Demand Generation solutions block.
// "How It Works" is intentionally NOT present: its section (#how-it-works)
// was removed and no destination has been confirmed yet — awaiting the client.
const NAV = [
  { label: "MODOLO AI Solutions", id: "employees" },
  { label: "Results", id: "testimonials" },
  { label: "Why MODOLO AI", id: "why-us" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrolled = useScrolled(32);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b ${
        scrolled ? "bg-paper/92 backdrop-blur-md border-rule" : "bg-transparent border-transparent"
      }`}
    >
      <div className="shell">
        <div className="flex items-center justify-between gap-8 h-[88px]">
          <a
            href="#top"
            onClick={(ev) => {
              ev.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center shrink-0"
            aria-label="MODOLO AI — back to top"
          >
            <img
              src={LOGO_SRC}
              alt="MODOLO AI"
              width={2546}
              height={1664}
              className="w-auto h-[54px]"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-9" aria-label="Main">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="label text-stone-mid hover:text-ink transition-colors duration-300 link-rule py-2"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block shrink-0">
            <button onClick={() => scrollToSection("cta")} className="btn-ink !py-3 !px-6">
              <span>Book Now</span>
            </button>
          </div>

          <button
            className="lg:hidden w-11 h-11 -mr-2 flex items-center justify-center text-ink"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-nav"
            className="lg:hidden pb-8 pt-2 border-t border-rule bg-paper"
          >
            <nav className="flex flex-col" aria-label="Main">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="label text-stone-mid hover:text-ink transition-colors text-left py-5 border-b border-rule min-h-[44px]"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("cta")}
                className="btn-ink mt-8 w-full justify-center"
              >
                <span>Book Now</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
