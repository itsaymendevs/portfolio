import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TITLE_WORDS = ["How", "It", "Works"];
const DESC_LINES = [
  "— Simple steps to get started, choose your plan,",
  "customize your meals, and let us handle the rest.",
];
const DESC_MOBILE_HOW =
  "— Simple steps to get started, choose your plan, customize your meals, and let us handle the rest.";

const STEPS = [
  {
    number: "01",
    img: "/behealthy/images/how-it-work-1.png",
    lines: [
      "Pick your perfect plan.",
      "balanced, high-protein, or",
      "plant-based for you.",
    ],
  },
  {
    number: "02",
    img: "/behealthy/images/how-it-work-2.png",
    lines: [
      "Select favorite dishes,",
      "set excludes and",
      "preferences with ease.",
    ],
  },
  {
    number: "03",
    img: "/behealthy/images/how-it-work-3.png",
    lines: [
      "Fresh meals delivered,",
      "track progress, pause or",
      "extend anytime.",
    ],
  },
];

export default function HowItWorksSection() {
  const [titleWords, setTitleWords] = useState(0);
  const [descLines, setDescLines] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(0);
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
          const afterDesc = afterTitle + DESC_LINES.length * 200 + 300;
          STEPS.forEach((_, i) =>
            setTimeout(
              () => setCardsVisible((v) => v + 1),
              afterDesc + i * 180,
            ),
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
      className="relative z-0 flex min-h-[46vh] flex-col items-center justify-center overflow-hidden bg-white px-6 py-16 pt-32 sm:px-10 sm:py-20 lg:px-16 lg:py-24 lg:pt-40"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        {/* Left — title + desc */}
        <div className="w-full text-left lg:w-[32%] lg:text-left">
          <h2
            className="text-[42px] font-bold leading-[0.95] tracking-[-0.03em] text-black sm:text-[48px] lg:text-[56px] xl:text-[64px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {TITLE_WORDS.map((w, i) => (
              <span
                key={w}
                className="mr-[0.22em] inline-block"
                style={{
                  opacity: i < titleWords ? 1 : 0,
                  transform:
                    i < titleWords ? "translateY(0)" : "translateY(14px)",
                  transition:
                    "opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {w}
              </span>
            ))}
          </h2>
          <div
            className="mx-auto mt-6 max-w-[520px] lg:mx-0"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {/* <392px: single balanced paragraph to avoid orphan "plan," break */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={
                descLines === DESC_LINES.length ? { opacity: 1, y: 0 } : {}
              }
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hidden max-[392px]:block text-[14.5px] leading-[1.6] tracking-[0.01em] text-black/60 italic [text-wrap:balance]"
            >
              {DESC_MOBILE_HOW}
            </motion.p>
            {/* >=393px: two-line layout */}
            <div className="max-[392px]:hidden space-y-1">
              {DESC_LINES.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 8 }}
                  animate={i < descLines ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[16px] leading-[1.7] tracking-[0.01em] text-black/60 italic sm:text-[17px]"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={
              descLines === DESC_LINES.length ? { opacity: 1, y: 0 } : {}
            }
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mx-auto mt-10 hidden max-w-[520px] items-center gap-4 lg:mx-0 lg:flex"
          >
            <div className="h-px flex-1 bg-black/10" />
            <a
              href="#"
              className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] text-black transition hover:text-[#0f6437]"
            >
              Call For Help →
            </a>
          </motion.div>
        </div>

        {/* Right — three cards: desktop one row staircase, mobile zigzag left/right/left with lines from first card top-right */}
        <div className="relative flex w-full justify-center lg:w-[68%] lg:justify-end">
          <div className="relative flex w-full max-w-[360px] flex-col items-center gap-5 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6 lg:flex-row lg:flex-nowrap lg:items-start lg:justify-end lg:gap-4 xl:gap-5">
            {/* Desktop: three dashed lines from single top-right origin — one per card */}
            <motion.div
              className="pointer-events-none absolute -top-[64px] right-[2%] hidden h-[132px] w-[92%] lg:block"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: cardsVisible === 3 ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg
                viewBox="0 0 720 132"
                fill="none"
                preserveAspectRatio="none"
                className="h-full w-full overflow-visible"
              >
                {/* origin dot at top-right of section */}
                <circle cx="700" cy="8" r="3.5" fill="rgba(0,0,0,0.16)" />
                <motion.path
                  d="M 700 14 C 580 32, 380 42, 110 68"
                  stroke="rgba(0,0,0,0.14)"
                  strokeWidth="1.4"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -28 }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.path
                  d="M 700 14 C 620 36, 500 58, 360 92"
                  stroke="rgba(0,0,0,0.14)"
                  strokeWidth="1.4"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -28 }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.path
                  d="M 700 14 C 640 40, 560 74, 600 128"
                  stroke="rgba(0,0,0,0.14)"
                  strokeWidth="1.4"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -28 }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </svg>
            </motion.div>
            {/* Mobile: point above with three lines to each card */}
            <motion.div
              className="pointer-events-none absolute -top-[28px] left-1/2 hidden h-[60px] w-[90%] -translate-x-1/2 sm:block lg:hidden"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: cardsVisible === 3 ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg
                viewBox="0 0 300 60"
                fill="none"
                preserveAspectRatio="none"
                className="h-full w-full"
              >
                <circle cx="150" cy="8" r="3" fill="rgba(0,0,0,0.14)" />
                <motion.path
                  d="M 150 12 C 150 28, 80 32, 40 58"
                  stroke="rgba(0,0,0,0.14)"
                  strokeWidth="1.4"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -20 }}
                  transition={{
                    duration: 1.0,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.path
                  d="M 150 12 C 150 30, 150 40, 150 58"
                  stroke="rgba(0,0,0,0.14)"
                  strokeWidth="1.4"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -20 }}
                  transition={{
                    duration: 1.0,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.path
                  d="M 150 12 C 150 28, 220 32, 260 58"
                  stroke="rgba(0,0,0,0.14)"
                  strokeWidth="1.4"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -20 }}
                  transition={{
                    duration: 1.0,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </svg>
            </motion.div>
            {/* Mobile (<sm): zigzag — 3 dashed lines from top-right of FIRST card to each card */}
            <motion.div
              className="pointer-events-none absolute inset-0 block sm:hidden"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: cardsVisible === 3 ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg
                viewBox="0 0 360 620"
                fill="none"
                preserveAspectRatio="none"
                className="h-full w-full overflow-visible"
              >
                {/* origin dot at top-right of first card */}
                <circle cx="268" cy="14" r="3" fill="rgba(0,0,0,0.16)" />
                {/* line to first card (short curve to its top-center) */}
                <motion.path
                  d="M 268 16 C 230 24, 185 30, 152 42"
                  stroke="rgba(0,0,0,0.14)"
                  strokeWidth="1.4"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -20 }}
                  transition={{
                    duration: 1.0,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                {/* line to second card (right-aligned) — target ~ top-center of second card */}
                <motion.path
                  d="M 268 16 C 300 70, 300 140, 216 206"
                  stroke="rgba(0,0,0,0.14)"
                  strokeWidth="1.4"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -20 }}
                  transition={{
                    duration: 1.0,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                {/* line to third card (left-aligned) */}
                <motion.path
                  d="M 268 16 C 285 130, 140 290, 152 420"
                  stroke="rgba(0,0,0,0.14)"
                  strokeWidth="1.4"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -20 }}
                  transition={{
                    duration: 1.0,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </svg>
            </motion.div>

            {STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={
                  idx < cardsVisible ? { opacity: 1, y: 0, scale: 1 } : {}
                }
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex w-[280px] shrink-0 flex-col items-center rounded-[20px] border border-black/[0.06] bg-white/70 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] backdrop-blur-[8px] sm:w-[260px] lg:w-[228px] xl:w-[264px] ${
                  idx === 0
                    ? "max-sm:self-start"
                    : idx === 1
                      ? "max-sm:self-end"
                      : "max-sm:self-start"
                }`}
                style={{
                  marginTop: idx === 0 ? "0px" : idx === 1 ? "24px" : "48px",
                }}
              >
                <span className="absolute left-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-transparent text-[11px] font-bold text-black">
                  {step.number}
                  <motion.svg
                    viewBox="0 0 32 32"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    aria-hidden="true"
                  >
                    <circle
                      cx="16"
                      cy="16"
                      r="14.5"
                      fill="none"
                      stroke="black"
                      strokeOpacity="0.18"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
                <div className="mt-2 flex h-[88px] w-[88px] items-center justify-center">
                  <img
                    src={step.img}
                    alt={`Step ${step.number}`}
                    className="h-[72px] w-[72px] object-contain"
                  />
                </div>
                <div className="mt-4 space-y-0.5 text-center">
                  {step.lines.map((l) => (
                    <p
                      key={l}
                      className="text-[13px] leading-[1.6] tracking-[0.01em] text-black/60"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {l}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile: Call For Help + line — at end of section, under cards (mobile only) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={descLines === DESC_LINES.length ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="mx-auto mt-10 flex w-full max-w-[1440px] items-center gap-4 lg:hidden"
      >
        <div className="h-px flex-1 bg-black/10" />
        <a
          href="#"
          className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] text-black transition hover:text-[#0f6437]"
        >
          Call For Help →
        </a>
      </motion.div>
    </section>
  );
}
