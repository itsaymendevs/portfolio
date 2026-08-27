import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MEAL_IMAGES = [
  "/behealthy/images/meal-1.png",
  "/behealthy/images/meal-2.png",
  "/behealthy/images/meal-3.png",
  "/behealthy/images/meal-4.png",
  "/behealthy/images/meal-5.png",
  "/behealthy/images/meal-6.png",
  "/behealthy/images/meal-7.png",
  "/behealthy/images/meal-8.png",
  "/behealthy/images/meal-plan-1.png",
  "/behealthy/images/meal-plan-2.png",
];

const WORDS = [
  { text: "Check", bold: false },
  { text: "Our", bold: false },
  { text: "Branch", bold: false },
  { text: "Menu", bold: true },
];

export default function BranchMenuSection() {
  const [visibleWords, setVisibleWords] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          WORDS.forEach((_, i) =>
            setTimeout(() => setVisibleWords((v) => Math.max(v, i + 1)), 120 + i * 110)
          );
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative z-0 w-full overflow-hidden border-y border-black/[0.06] bg-white"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-3 sm:px-10 sm:py-4 lg:px-16 lg:py-3.5">
        {/* Left — 10 circled meal images overlapping */}
        <div className="flex items-center">
          <div className="flex -space-x-2 sm:-space-x-2.5">
            {MEAL_IMAGES.map((src, i) => (
              <motion.div
                key={`${src}-${i}`}
                initial={{ opacity: 0, scale: 0.85, y: 6 }}
                animate={visibleWords > 0 ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  duration: 0.45,
                  delay: 0.15 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative h-7 w-7 shrink-0 overflow-hidden rounded-full border-2 border-white bg-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:h-8 sm:w-8 lg:h-9 lg:w-9 ${i >= 4 ? "hidden sm:block" : ""}`}
              >
                <img src={src} alt={`Meal ${i + 1}`} className="h-full w-full object-cover" />
              </motion.div>
            ))}
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={visibleWords > 0 ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="ml-3 hidden text-[11px] font-medium tracking-[0.08em] text-black/40 sm:inline lg:ml-4"
          >
            +250 Fresh Meals
          </motion.span>
        </div>

        {/* Right — word by word text */}
        <div
          className="flex shrink-0 items-center gap-[0.3em] text-right text-[13px] font-medium tracking-[-0.01em] text-black sm:text-[14px] lg:text-[15px]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {WORDS.map((w, i) => (
            <span
              key={w.text}
              className={`inline-block ${w.bold ? "font-bold text-black" : "font-normal text-black/80"}`}
              style={{
                opacity: i < visibleWords ? 1 : 0,
                transform: i < visibleWords ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 420ms ease, transform 420ms cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${i * 40}ms`,
              }}
            >
              {w.text}
            </span>
          ))}
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={visibleWords === WORDS.length ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative ml-2 grid h-7 w-7 place-items-center rounded-full bg-transparent text-black sm:h-8 sm:w-8"
            aria-hidden="true"
          >
            <motion.svg
              viewBox="0 0 32 32"
              className="pointer-events-none absolute inset-0 h-full w-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <circle
                cx="16"
                cy="16"
                r="14.5"
                fill="none"
                stroke="rgba(0,0,0,0.18)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                strokeLinecap="round"
              />
            </motion.svg>
            <span className="relative text-[11px] leading-none">→</span>
          </motion.span>
        </div>
      </div>
    </section>
  );
}
