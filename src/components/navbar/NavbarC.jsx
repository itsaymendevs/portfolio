import { useState, useEffect, useCallback } from "react";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import MobileOverlay, { NAV_LINKS } from "./MobileOverlay";

function NavbarC() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300 ${
          scrolled ? "" : "pointer-events-none"
        }`}
      >
        <nav
          className={`flex items-center transition-all duration-300 ease-out ${
            scrolled
              ? "h-14 max-w-[720px] rounded-full border border-black/[0.06] bg-white/90 px-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] backdrop-blur-xl"
              : "h-[72px] w-full max-w-7xl rounded-none border-transparent bg-transparent px-6 lg:px-10"
          }`}
        >
          <Logo
            size={scrolled ? 22 : 26}
            showText={!scrolled}
            className="pointer-events-auto flex shrink-0 items-center text-primary"
            textClassName="text-foreground"
          />

          {/* Links — split text reveal */}
          <ul
            className={`pointer-events-auto relative hidden items-center lg:flex ${
              scrolled ? "mx-auto gap-0" : "mx-auto ml-12 gap-5"
            }`}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {NAV_LINKS.map((link, i) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onMouseEnter={() => setHoveredIdx(i)}
                  className={`relative block overflow-hidden ${
                    scrolled ? "px-3 text-[13px]" : "px-2 text-[15px]"
                  }`}
                  style={{ lineHeight: "1.6" }}
                >
                  {/* Default text — slides up on hover */}
                  <span
                    className="block transition-all duration-300"
                    style={{
                      color: "var(--muted-foreground)",
                      transform: hoveredIdx === i ? "translateY(-110%)" : "translateY(0)",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {link.label}
                  </span>

                  {/* Hover text — slides up from below */}
                  <span
                    className="absolute inset-0 flex items-center px-2 font-medium transition-all duration-300"
                    style={{
                      color: "var(--foreground)",
                      transform: hoveredIdx === i ? "translateY(0)" : "translateY(110%)",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* CTA — bordered, gradient sweep */}
          <div className="pointer-events-auto shrink-0">
            <a
              href="#order"
              className={`group relative hidden overflow-hidden rounded-full sm:inline-flex ${
                scrolled
                  ? "px-5 py-1.5 text-[13px] font-semibold"
                  : "px-6 py-2.5 text-[15px] font-medium"
              }`}
            >
              {/* Gradient border via pseudo */}
              <span className="absolute inset-0 rounded-full border border-primary/30 transition-colors duration-300 group-hover:border-primary/60" />

              {/* Shimmer sweep */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative z-10 text-primary">
                Order Now
              </span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={`pointer-events-auto ml-3 flex size-9 items-center justify-center rounded-full bg-foreground text-background transition-all duration-200 hover:scale-105 lg:hidden ${
              scrolled ? "" : "ml-auto"
            }`}
            aria-label="Open menu"
          >
            <Menu size={18} strokeWidth={1.8} />
          </button>
        </nav>
      </header>

      <MobileOverlay isOpen={mobileOpen} onClose={closeMobile} />
    </>
  );
}

export default NavbarC;
