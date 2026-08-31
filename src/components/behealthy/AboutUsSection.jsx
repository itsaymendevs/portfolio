import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const LINES = [
  "Be Healthy started as a simple idea: eating well should feel personal, joyful and easy.",
  "Today we are a meal plan kitchen and a welcoming restaurant — with a full menu and relaxed dine-in, all crafted around your body, your taste and your daily life.",
  "Fresh ingredients, thoughtful portions and genuine support make healthy eating sustainable, delicious and truly yours.",
];

const STATS = [
  { value: 8000, suffix: "+", label: "Happy Clients" },
  { value: 30000, suffix: "+", label: "Meals Served" },
  { value: 600, suffix: "+", label: "Recipes" },
  { value: 70000, suffix: "+", label: "Deliveries" },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AboutUsSection() {
  const leaves = [
    {
      pos: "-left-4 top-10",
      size: "h-[110px] w-[110px] sm:h-[140px] sm:w-[140px] lg:h-[170px] lg:w-[170px]",
      rot: 22,
      cls: "rotate-[22deg]",
      delay: 0,
      dur: 5.8,
      y: [-7, 0],
      r: [22, 23, 22],
    },
    {
      pos: "-right-4 bottom-8",
      size: "h-[120px] w-[120px] sm:h-[150px] sm:w-[150px] lg:h-[190px] lg:w-[190px]",
      rot: -28,
      cls: "-scale-x-100 rotate-[-28deg]",
      delay: 0.5,
      dur: 6.4,
      y: [-8, 0],
      r: [-28, -29, -28],
    },
    {
      pos: "right-[12%] top-[14%]",
      size: "h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] lg:h-[110px] lg:w-[110px]",
      rot: 24,
      cls: "rotate-[24deg]",
      delay: 1.2,
      dur: 7,
      y: [-6, 0],
      r: [24, 25, 24],
    },
    {
      pos: "left-[8%] bottom-[22%]",
      size: "h-[52px] w-[52px] sm:h-[68px] sm:w-[68px] lg:h-[84px] lg:w-[84px]",
      rot: 28,
      cls: "rotate-[28deg]",
      delay: 0.3,
      dur: 5.4,
      y: [-5, 0],
      r: [28, 29.5, 28],
    },
    {
      pos: "right-[10%] top-[38%]",
      size: "h-[48px] w-[48px] sm:h-[62px] sm:w-[62px] lg:h-[78px] lg:w-[78px]",
      rot: -26,
      cls: "rotate-[-26deg]",
      delay: 0.9,
      dur: 6,
      y: [-6, 0],
      r: [-26, -27.2, -26],
    },
    {
      pos: "left-[36%] bottom-[10%]",
      size: "h-[44px] w-[44px] sm:h-[56px] sm:w-[56px] lg:h-[72px] lg:w-[72px]",
      rot: 16,
      cls: "rotate-[16deg]",
      delay: 1.6,
      dur: 5,
      y: [-4, 0],
      r: [16, 17, 16],
    },
    {
      pos: "left-[22%] top-[30%]",
      size: "h-[42px] w-[42px] sm:h-[52px] sm:w-[52px] lg:h-[68px] lg:w-[68px]",
      rot: -18,
      cls: "rotate-[-18deg]",
      delay: 0.2,
      dur: 5.6,
      y: [-6, 0],
      r: [-18, -19, -18],
    },
    {
      pos: "right-[26%] bottom-[16%]",
      size: "h-[46px] w-[46px] sm:h-[58px] sm:w-[58px] lg:h-[76px] lg:w-[76px]",
      rot: 26,
      cls: "rotate-[26deg]",
      delay: 0.7,
      dur: 6.2,
      y: [-5, 0],
      r: [26, 27.5, 26],
    },
    {
      pos: "left-[46%] top-[6%]",
      size: "h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] lg:h-[60px] lg:w-[60px]",
      rot: 14,
      cls: "rotate-[14deg]",
      delay: 1.1,
      dur: 5.2,
      y: [-4, 0],
      r: [14, 15, 14],
    },
    {
      pos: "left-[14%] top-[52%]",
      size: "h-[38px] w-[38px] sm:h-[48px] sm:w-[48px] lg:h-[62px] lg:w-[62px]",
      rot: 32,
      cls: "rotate-[32deg]",
      delay: 0.4,
      dur: 5.2,
      y: [-5, 0],
      r: [32, 33, 32],
    },
    {
      pos: "right-[34%] top-[8%]",
      size: "h-[36px] w-[36px] sm:h-[46px] sm:w-[46px] lg:h-[58px] lg:w-[58px]",
      rot: -20,
      cls: "rotate-[-20deg]",
      delay: 0.8,
      dur: 5.9,
      y: [-4, 0],
      r: [-20, -21, -20],
    },
    {
      pos: "right-[4%] bottom-[38%]",
      size: "h-[40px] w-[40px] sm:h-[52px] sm:w-[52px] lg:h-[66px] lg:w-[66px]",
      rot: 18,
      cls: "rotate-[18deg]",
      delay: 1.4,
      dur: 6,
      y: [-6, 0],
      r: [18, 19, 18],
    },
  ];

  return (
    <section
      id="about"
      className="relative flex min-h-[52vh] items-center justify-center overflow-hidden bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.13 } },
        }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {leaves.map((leaf, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 12, scale: 0.92 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className={`absolute block ${leaf.pos} ${leaf.cls || ""}`}
          >
            <motion.svg
              viewBox="0 0 120 120"
              fill="none"
              aria-hidden="true"
              className={`${leaf.size}`}
              style={{ color: "#0f6437" }}
              animate={{ y: leaf.y, rotate: leaf.r }}
              transition={{
                duration: leaf.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: leaf.delay,
              }}
            >
              <path
                d={
                  idx % 3 === 0
                    ? "M 60 16 C 74 22, 88 36, 84 56 C 80 70, 68 82, 60 96 C 52 82, 40 70, 36 56 C 32 36, 46 22, 60 16 Z"
                    : idx % 3 === 1
                      ? "M 60 14 C 74 20, 88 34, 84 54 C 80 68, 68 80, 60 94 C 52 80, 40 68, 36 54 C 32 34, 46 20, 60 14 Z"
                      : "M 60 20 C 70 26, 80 36, 76 52 C 72 64, 64 74, 60 86 C 56 74, 48 64, 44 52 C 40 36, 50 26, 60 20 Z"
                }
                fill="currentColor"
                fillOpacity={idx < 2 ? 0.09 : idx < 5 ? 0.07 : 0.06}
              />
              <path
                d="M 60 96 L 60 26"
                stroke="currentColor"
                strokeOpacity={idx < 2 ? 0.22 : 0.16}
                strokeWidth="0.85"
              />
              <path
                d="M 60 60 C 66 54, 74 48, 82 44"
                stroke="currentColor"
                strokeOpacity="0.16"
                strokeWidth="0.6"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 60 60 C 54 54, 46 48, 38 44"
                stroke="currentColor"
                strokeOpacity="0.16"
                strokeWidth="0.6"
                fill="none"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.14, delayChildren: 0.1 },
          },
        }}
        className="mx-auto w-full max-w-[1400px] text-left"
      >
        <div className="space-y-1">
          {LINES.map((line) => {
            const highlights = [
              "Be Healthy",
              "meal plan kitchen",
              "restaurant",
              "full menu",
              "dine-in",
              "body",
              "taste",
              "life",
            ];
            const pattern = new RegExp(
              `(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
              "g",
            );
            const parts = line.split(pattern);
            return (
              <motion.p
                key={line}
                variants={{
                  hidden: { y: 16, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="w-full font-medium leading-[1.45] tracking-[0.018em] text-[18px] sm:text-[21px] lg:text-[25px] xl:text-[28px] text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {parts.map((part, j) =>
                  highlights.includes(part) ? (
                    <span key={j} className="relative inline-block px-0.5">
                      <span
                        className="absolute bottom-[0.12em] left-0 right-0 h-[0.38em] rounded-[2px] bg-[#FFF59D]"
                        aria-hidden="true"
                      />
                      <span className="relative font-medium italic text-black">
                        {part}
                      </span>
                    </span>
                  ) : (
                    <span key={j}>{part}</span>
                  ),
                )}
              </motion.p>
            );
          })}
        </div>
        <div className="mt-8 h-px w-12 opacity-0" aria-hidden="true" />
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.9, duration: 0.6, staggerChildren: 0.08 },
            },
          }}
          className="relative mt-10 flex flex-wrap justify-between gap-8 pt-10 sm:gap-10 lg:flex-nowrap lg:gap-8"
        >
          <div
            className="pointer-events-none absolute left-0 right-0 top-0 h-px overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-[200%]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(10,46,31,0.18) 0 10px, transparent 10px 20px)",
              }}
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
            />
          </div>
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={{
                hidden: { y: 10, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="min-w-[140px] flex-1 text-left lg:flex-none"
            >
              <div
                className="font-display text-[28px] font-bold leading-none tracking-[0.02em] text-black sm:text-[32px] lg:text-[36px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.15em] text-black/50">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
