import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import Logo from "./Logo";
import MobileOverlay, { NAV_LINKS } from "./MobileOverlay";
import { useTheme } from "../ThemeProvider";

function NavbarA() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS
      .map((l) => l.href.replace("#", ""))
      .filter(Boolean);

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const idx = NAV_LINKS.findIndex((l) => l.href === `#${id}`);
            if (idx !== -1) setActiveIdx(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const scrolledBg = isDark
    ? "bg-white/10 border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.15)]"
    : "bg-white/50 border-white/30 shadow-[0_2px_16px_rgba(0,0,0,0.05)] backdrop-blur-2xl";

  const defaultBg = "bg-transparent border-transparent";

  const hamburgerBg = scrolled
    ? (isDark ? "bg-white/15 text-white" : "bg-black/10 text-black")
    : (isDark ? "bg-white text-black" : "bg-white/20 text-white backdrop-blur-sm");

  // At top in light mode → white text like dark mode; when scrolled → black text on white pill
  const atTop = !scrolled;
  const lightAtTop = !isDark && atTop;

  const linkColor = (isDark || lightAtTop) ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)";
  const linkActiveColor = (isDark || lightAtTop) ? "#fff" : "#000";
  const underlineColor = (isDark || lightAtTop) ? "bg-white" : "bg-black";

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
              ? `h-14 max-w-[860px] rounded-full border px-4 backdrop-blur-2xl ${scrolledBg}`
              : `h-[72px] w-full max-w-7xl rounded-none border px-6 lg:px-10 ${defaultBg}`
          }`}
        >
          <Logo
            size={scrolled ? 32 : 42}
            showText={!scrolled}
            invert={isDark || lightAtTop}
            className={`pointer-events-auto flex shrink-0 items-center ${(isDark || lightAtTop) ? "text-white" : "text-black"}`}
            textClassName={(isDark || lightAtTop) ? "text-white" : "text-black"}
            imgClassName={scrolled ? "w-[52px]! h-[52px]! max-lg:w-[52px]! max-lg:h-[52px]!" : ""}
          />

          <ul
            className={`pointer-events-auto relative hidden items-center lg:flex ${
              scrolled ? "mx-auto gap-0" : "mx-auto ml-12 gap-1"
            }`}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {NAV_LINKS.map((link, i) => {
              const isActive = activeIdx === i;
              const isHovered = hoveredIdx === i;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onMouseEnter={() => setHoveredIdx(i)}
                    className={`relative block overflow-hidden py-2 ${
                      scrolled ? "px-3 text-[13px]" : "px-2 text-[15px]"
                    }`}
                  >
                    <span
                      className="block transition-colors duration-200"
                      style={{
                        color: isActive || isHovered ? linkActiveColor : linkColor,
                        fontWeight: isActive || isHovered ? 500 : 400,
                      }}
                    >
                      {link.label}
                    </span>
                    <span
                      className={`absolute bottom-1 left-2 h-[1.5px] ${underlineColor}`}
                      style={{
                        width: isHovered || isActive ? "calc(100% - 16px)" : "0%",
                        opacity: isActive && !isHovered ? 0.4 : 1,
                        transition: "width 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease",
                        transitionDelay: isHovered ? "40ms" : "0ms",
                      }}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="pointer-events-auto flex items-center gap-3">
            {/* Desktop theme toggle — left of Order Now */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`hidden size-9 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 lg:flex ${
                (isDark || lightAtTop)
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-black/5 text-black hover:bg-black/10"
              }`}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun size={16} strokeWidth={1.8} /> : <Moon size={16} strokeWidth={1.8} />}
            </button>

            <a
              href="#meal-plans"
              className={`nav-cta-gradient relative hidden overflow-hidden rounded-full px-6 py-2.5 text-[15px] font-medium text-primary-foreground shadow-md transition-all duration-300 hover:shadow-lg sm:inline-flex ${
                scrolled ? "px-5 py-1.5 text-[13px]" : ""
              }`}
            >
              Order Now
            </a>
          </div>

          <div className="pointer-events-auto ml-auto flex items-center gap-2 lg:ml-0">
            {/* Mobile theme toggle — next to hamburger */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`flex size-9 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 lg:hidden ${
                (isDark || lightAtTop)
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-black/5 text-black hover:bg-black/10"
              }`}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun size={16} strokeWidth={1.8} /> : <Moon size={16} strokeWidth={1.8} />}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={`pointer-events-auto flex size-9 items-center justify-center rounded-full transition-all duration-200 hover:scale-105 lg:hidden ${
                hamburgerBg
              }`}
              aria-label="Open menu"
            >
              <Menu size={18} strokeWidth={1.8} />
            </button>
          </div>
        </nav>
      </header>

      <MobileOverlay isOpen={mobileOpen} onClose={closeMobile} />
    </>
  );
}

export default NavbarA;
