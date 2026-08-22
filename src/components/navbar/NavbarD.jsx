import { useState, useEffect, useCallback, useRef } from "react";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import MobileOverlay, { NAV_LINKS } from "./MobileOverlay";

function NavbarD() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const linkRefs = useRef([]);
  const [dot, setDot] = useState({ left: 0, width: 0, visible: false });

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

  useEffect(() => {
    if (hoveredIdx !== null && linkRefs.current[hoveredIdx]) {
      const el = linkRefs.current[hoveredIdx];
      const parent = el.parentElement.parentElement;
      const elRect = el.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      setDot({
        left: elRect.left - parentRect.left + elRect.width / 2 - 2,
        width: 4,
        visible: true,
      });
    } else {
      setDot((d) => ({ ...d, visible: false }));
    }
  }, [hoveredIdx]);

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

          {/* Links — sliding dot accent */}
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
                  ref={(el) => { linkRefs.current[i] = el; }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  className={`relative block py-2 transition-colors duration-200 ${
                    scrolled ? "px-3 text-[13px]" : "px-2 text-[15px]"
                  } ${
                    hoveredIdx === i
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}

            {/* Sliding dot */}
            <span
              className="absolute bottom-0 h-1 rounded-full bg-primary"
              style={{
                left: dot.left,
                width: dot.width,
                opacity: dot.visible ? 1 : 0,
                transition:
                  "left 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease, width 200ms ease",
              }}
            />
          </ul>

          {/* CTA — with breathing glow */}
          <div className="pointer-events-auto shrink-0">
            <a
              href="#order"
              className={`group relative hidden rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 sm:inline-flex ${
                scrolled
                  ? "px-5 py-1.5 text-[13px] font-semibold"
                  : "px-6 py-2.5 text-[15px] font-medium"
              }`}
            >
              <span className="absolute inset-0 rounded-full bg-primary opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-30" />
              <span className="relative z-10">Order Now</span>
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

export default NavbarD;
