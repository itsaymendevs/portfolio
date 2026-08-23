import { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

const NAVIGATE = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Plans", href: "#meal-plans" },
  { label: "Catering", href: "#catering" },
];

const SUPPORT = [
  { label: "FAQs", href: "#faqs" },
  { label: "Contact Us", href: "#contact" },
  { label: "Help Centre", href: "#faqs" },
  { label: "Live Chat", href: "#contact" },
];

const SOCIAL = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const TAGLINE_WORDS = ["—", "We're", "More", "than", "a", "restaurant,", "Real", "Meal", "is", "a", "community", "that", "lives", "for", "good", "food."];

const COLUMN_GROUPS = [
  { heading: "Let's Talk", desktopOnly: true, items: [
    { label: "hello@realmeal.ae", href: "mailto:hello@realmeal.ae" },
    { label: "+971 50 123 4567", href: "tel:+971501234567" },
  ]},
  { heading: "Navigate", items: NAVIGATE },
  { heading: "Support", items: SUPPORT },
  { heading: "Social Media", items: SOCIAL },
];

export default function Footer() {
  const [wordsVisible, setWordsVisible] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const footerRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          TAGLINE_WORDS.forEach((_, i) => {
            setTimeout(() => setWordsVisible(i + 1), 50 + i * 35);
          });
          const contentDelay = 50 + TAGLINE_WORDS.length * 35 + 80;
          setTimeout(() => setContentVisible(true), contentDelay);
          obs.disconnect();
        }
      },
      { threshold: 0.22 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const footerBg = "bg-[#090909]";
  const taglineColor = "text-white";
  const headingColor = "text-white";
  const linkColor = "text-white/50";
  const hoverColor = "hover:text-white";
  const borderColor = "border-[#191919]";
  const copyrightColor = "text-white/30";
  const copyrightHover = "hover:text-white/60";

  return (
    <footer ref={footerRef} id="contact" className={`relative overflow-hidden px-6 pt-16 sm:px-12 md:px-16 lg:px-20 border-t ${borderColor} ${footerBg}`}>
      {/* subtle pattern — footer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.045) 1px, transparent 0)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 80% 68% at 50% 28%, black 30%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 68% at 50% 28%, black 30%, transparent 78%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 76% 62% at 50% 35%, black 22%, transparent 74%)",
            WebkitMaskImage: "radial-gradient(ellipse 76% 62% at 50% 35%, black 22%, transparent 74%)",
          }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-xl">
            <h2 className={`text-lg font-medium leading-[1.6] sm:text-xl md:text-2xl lg:text-3xl ${taglineColor}`}>
              {TAGLINE_WORDS.map((word, i) => (
                <span
                  key={i}
                  className="mr-[0.3em] inline-block"
                  style={{
                    opacity: i < wordsVisible ? 1 : 0,
                    transform: i < wordsVisible ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:gap-x-16 lg:flex lg:gap-24"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {COLUMN_GROUPS.map((col, colIdx) => (
              <div
                key={col.heading}
                className={col.desktopOnly ? "hidden lg:block" : ""}
              >
                <h3 className={`mb-4 font-semibold ${colIdx < 1 ? "text-base" : "text-sm"} ${headingColor}`}>
                  {col.heading}
                </h3>
                <ul className="space-y-3">
                  {col.items.map((link) => {
                    const isNoop = link.href === "#";
                    // keep Home ("#") functional — only Social placeholders are noop
                    const isSocialNoop = isNoop && col.heading === "Social Media";
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={isSocialNoop ? (e) => e.preventDefault() : undefined}
                          className={`text-sm transition-colors ${linkColor} ${hoverColor} ${isSocialNoop ? "pointer-events-none cursor-default" : ""}`}
                          aria-disabled={isSocialNoop || undefined}
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 sm:-mb-6 md:-mb-8 lg:-mb-10">
          <div
            className="flex flex-col items-center gap-4 lg:hidden"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <h1 className="font-bold leading-none tracking-tight footer-title-dimmed" style={{ fontSize: "clamp(60px, 20vw, 120px)" }}>
              Real Meal
            </h1>
          </div>
          <div
            className="hidden items-end justify-between lg:flex"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <h1 className="whitespace-nowrap font-bold leading-none tracking-tight footer-title-dimmed" style={{ fontSize: "clamp(50px, 12vw, 180px)" }}>
              Real Meal
            </h1>
            <div className="mb-8 flex items-center gap-6 md:mb-12 lg:mb-16">
              <span className={`text-sm ${copyrightColor}`}>&copy; 2026 All rights reserved.</span>
              <a href="#" onClick={(e) => e.preventDefault()} className={`pointer-events-none cursor-default text-sm transition-colors ${copyrightColor}`}>Privacy</a>
              <a href="#" onClick={(e) => e.preventDefault()} className={`pointer-events-none cursor-default text-sm transition-colors ${copyrightColor}`}>Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
