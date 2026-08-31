import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TITLE_WORDS = ["Download", "The", "BeHealthy", "App"];
const DESC_LINES = [
  "— Manage your profile and subscription with ease",
  "pause, extend, or adjust your plan anytime, change",
  "your meals and handle excludes in just a few taps.",
];

export default function MobileAppSection() {
  const [titleWords, setTitleWords] = useState(0);
  const [descLines, setDescLines] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          TITLE_WORDS.forEach((_, i) =>
            setTimeout(() => setTitleWords(i + 1), 120 + i * 90),
          );
          const afterTitle = 120 + TITLE_WORDS.length * 90 + 180;
          DESC_LINES.forEach((_, i) =>
            setTimeout(() => setDescLines(i + 1), afterTitle + i * 200),
          );
          obs.disconnect();
        }
      },
      { threshold: 0.22 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex min-h-[60vh] items-center justify-center overflow-visible bg-[#1a1a1a] px-6 py-16 sm:px-10 sm:py-20 lg:overflow-visible lg:px-16 lg:py-24 lg:pb-32"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        {/* Left — two phones upright straight, facing viewer, near each other, no floating, appear one by one */}
        <div className="flex w-full justify-center gap-4 sm:gap-6 lg:w-1/2 mb-[-120px] mb-[-120px] lg:mb-[-180px] lg:justify-start order-2 lg:order-1">
          {/* Phone 1 — logo — same level, overlapping next section without moving top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative w-[160px] h-[340px] max-[400px]:h-[300px] max-[400px]:w-[140px] sm:w-[190px] sm:h-[400px] lg:w-[260px] lg:h-[540px] rounded-[28px] sm:rounded-[32px] lg:rounded-[36px] bg-[#151515] p-[6px] sm:p-[7px] shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-[#2a2a2a]/50">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[22px] sm:rounded-[26px] lg:rounded-[28px] bg-white p-4">
                <img
                  src="/behealthy/images/logo-black.png"
                  alt="BeHealthy logo"
                  className="h-auto max-h-[110px] w-full max-w-[150px] object-contain"
                />
                {/* Galaxy S26 Ultra punch-hole camera */}
                <div className="absolute left-1/2 top-[9px] h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-[#0a0a0a] border border-[#1e1e1e] shadow-[0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_2px_rgba(0,0,0,0.5)]" aria-hidden="true">
                  <div className="absolute inset-[2px] rounded-full bg-[#1a1a1a] shadow-[inset_0_0.5px_1px_rgba(255,255,255,0.15)]" />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[22px] sm:rounded-[26px] lg:rounded-[28px] ring-1 ring-black/5" aria-hidden="true" />
              </div>
              {/* Galaxy S26 Ultra — flat titanium frame, buttons on right, S Pen slot bottom */}
              <div className="absolute -right-[1.5px] top-[68px] h-[28px] w-[2.5px] rounded-l-[2px] bg-[#2e2e2e] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.08)]" aria-hidden="true" />
              <div className="absolute -right-[1.5px] top-[104px] h-[42px] w-[2.5px] rounded-l-[2px] bg-[#2e2e2e] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.08)]" aria-hidden="true" />
              <div className="absolute -right-[1.5px] top-[152px] h-[42px] w-[2.5px] rounded-l-[2px] bg-[#2e2e2e] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.08)]" aria-hidden="true" />
              <div className="absolute bottom-[4px] left-1/2 flex -translate-x-1/2 items-center gap-1.5" aria-hidden="true">
                <div className="h-[2px] w-6 rounded-full bg-[#1e1e1e] opacity-70" />
                <div className="h-[3px] w-1 rounded-full bg-[#0f0f0f] border border-white/5" />
                <div className="h-[2px] w-4 rounded-full bg-[#1e1e1e] opacity-70" />
              </div>
            </div>
          </motion.div>

          {/* Phone 2 — hero image — same level, overlapping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative w-[160px] h-[340px] max-[400px]:h-[300px] max-[400px]:w-[140px] sm:w-[190px] sm:h-[400px] lg:w-[260px] lg:h-[540px] rounded-[28px] sm:rounded-[32px] lg:rounded-[36px] bg-[#151515] p-[6px] sm:p-[7px] shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-[#2a2a2a]/50">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[22px] sm:rounded-[26px] lg:rounded-[28px] bg-white p-4">
                <img
                  src="/behealthy/images/logo-black.png"
                  alt="BeHealthy logo"
                  className="h-auto max-h-[110px] w-full max-w-[150px] object-contain"
                />
                {/* Galaxy S26 Ultra punch-hole camera */}
                <div className="absolute left-1/2 top-[9px] h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-[#0a0a0a] border border-[#1e1e1e] shadow-[0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_2px_rgba(0,0,0,0.5)]" aria-hidden="true">
                  <div className="absolute inset-[2px] rounded-full bg-[#1a1a1a] shadow-[inset_0_0.5px_1px_rgba(255,255,255,0.15)]" />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[22px] sm:rounded-[26px] lg:rounded-[28px] ring-1 ring-black/5" aria-hidden="true" />
              </div>
              {/* Galaxy S26 Ultra — flat titanium frame, buttons on right, S Pen slot bottom */}
              <div className="absolute -right-[1.5px] top-[68px] h-[28px] w-[2.5px] rounded-l-[2px] bg-[#2e2e2e] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.08)]" aria-hidden="true" />
              <div className="absolute -right-[1.5px] top-[104px] h-[42px] w-[2.5px] rounded-l-[2px] bg-[#2e2e2e] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.08)]" aria-hidden="true" />
              <div className="absolute -right-[1.5px] top-[152px] h-[42px] w-[2.5px] rounded-l-[2px] bg-[#2e2e2e] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.08)]" aria-hidden="true" />
              <div className="absolute bottom-[4px] left-1/2 flex -translate-x-1/2 items-center gap-1.5" aria-hidden="true">
                <div className="h-[2px] w-6 rounded-full bg-[#1e1e1e] opacity-70" />
                <div className="h-[3px] w-1 rounded-full bg-[#0f0f0f] border border-white/5" />
                <div className="h-[2px] w-4 rounded-full bg-[#1e1e1e] opacity-70" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right — title, desc, badges — order first on mobile so badges above phones */}
        <div className="w-full max-w-[560px] lg:w-1/2 order-1 lg:order-2">
          <h2
            className="text-[44px] font-bold leading-[0.95] tracking-[-0.03em] text-white sm:text-[52px] lg:text-[60px] xl:text-[72px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {TITLE_WORDS.map((w, i) => (
              <span
                key={w}
                className="mr-[0.22em] inline-block"
                style={{
                  opacity: i < titleWords ? 1 : 0,
                  transform: i < titleWords ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {w}
              </span>
            ))}
          </h2>
          <div className="mt-6 max-w-[480px] pb-2" style={{ fontFamily: "var(--font-sans)" }}>
            {/* Mobile: single line together */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={descLines > 0 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="block whitespace-nowrap text-[14px] leading-[1.7] tracking-[0.01em] text-white/60 italic sm:hidden"
            >
              Manage your profile and subscription with ease
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={descLines > 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="block whitespace-nowrap text-[14px] leading-[1.7] tracking-[0.01em] text-white/60 italic sm:hidden"
            >
              pause, extend, or adjust your plan anytime
            </motion.p>
            {/* Desktop: 3 lines */}
            <div className="hidden space-y-1 sm:block">
              {DESC_LINES.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 8 }}
                  animate={i < descLines ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[16px] leading-[1.7] tracking-[0.01em] text-white/60 italic sm:text-[17px]"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={descLines === DESC_LINES.length ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#" className="pointer-events-none block transition hover:opacity-90 hover:scale-[1.02]"
              aria-label="Download on the App Store"
            >
              <img
                src="/behealthy/images/app-store.svg"
                alt="Download on the App Store"
                className="h-12 w-auto sm:h-14"
              />
            </a>
            <a
              href="#" className="pointer-events-none block transition hover:opacity-90 hover:scale-[1.02]"
              aria-label="Get it on Google Play"
            >
              <img
                src="/behealthy/images/play-store.svg"
                alt="Get it on Google Play"
                className="h-12 w-auto sm:h-14"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
