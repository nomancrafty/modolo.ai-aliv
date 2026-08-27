import { useState } from "react";
import { Menu, X } from "lucide-react";
import modoloLogo from "@/assets/modolo-logo.png";
import { useScrolled } from "@/hooks/useMotion";

const NAV = [
  { label: "Solutions", id: "features" },
  { label: "AI Employees", id: "employees" },
  { label: "How It Works", id: "how-it-works" },
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
      className={`fixed top-0 inset-x-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-editorial ${
        scrolled
          ? "bg-paper/92 backdrop-blur-md border-rule"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="shell">
        <div
          className={`flex items-center justify-between gap-8 transition-[height] duration-500 ease-editorial ${
            scrolled ? "h-[76px]" : "h-[100px]"
          }`}
        >
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
              src={modoloLogo}
              alt="MODOLO AI"
              width={573}
              height={401}
              className={`w-auto transition-[height] duration-500 ease-editorial ${
                scrolled ? "h-12" : "h-[60px]"
              }`}
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
