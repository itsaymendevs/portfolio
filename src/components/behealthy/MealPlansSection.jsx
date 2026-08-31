import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Salad,
  Dumbbell,
  Leaf,
  Feather,
} from "lucide-react";

const TITLE_WORDS = ["Our", "Meal", "Plans."];

const PLANS = [
  {
    id: 1,
    label: "Plan 01",
    title: "Balanced Bowl",
    desc: "Balanced nutrition for everyday wellness. Fresh, portioned and ready.",
    Icon: Salad,
    img: "/behealthy/images/meal-plan-1.png",
  },
  {
    id: 2,
    label: "Plan 02",
    title: "High Protein",
    desc: "Power up your day with protein-packed, chef-crafted meals.",
    Icon: Dumbbell,
    img: "/behealthy/images/meal-plan-2.png",
  },
  {
    id: 3,
    label: "Plan 03",
    title: "Plant Power",
    desc: "100% plant-based, vibrant and nourishing.",
    Icon: Leaf,
    img: "/behealthy/images/meal-plan-3.png",
  },
  {
    id: 4,
    label: "Plan 04",
    title: "Lean & Light",
    desc: "Light, lean and flavorful — perfect for mindful eating.",
    Icon: Feather,
    img: "/behealthy/images/meal-plan-1.png",
  },
];

const DESC =
  "— Choose from balanced, high-protein, or plant-based plans, crafted around your taste, schedule, and goals. Enjoy chef-crafted meals, flexible deliveries, easy swaps, and expert guidance to stay nourished and energized.";

export default function MealPlansSection() {
  const [cardVisible, setCardVisible] = useState(false);
  const [titleWords, setTitleWords] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(0);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const isTransitioning = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setCardVisible(true);
          TITLE_WORDS.forEach((_, i) =>
            setTimeout(() => setTitleWords(i + 1), 180 + i * 90),
          );
          const afterTitle = 180 + TITLE_WORDS.length * 90 + 160;
          setTimeout(() => setButtonsVisible(true), afterTitle - 60);
          setTimeout(() => {
            PLANS.forEach((_, idx) =>
              setTimeout(
                () => setCardsVisible((v) => v + 1),
                afterTitle + 320 + idx * 110,
              ),
            );
          }, 0);
          obs.disconnect();
        }
      },
      { threshold: 0.22 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const trackItems = [...PLANS, ...PLANS];

  const go = useCallback((dir) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrent((c) => (c + dir + PLANS.length) % PLANS.length);
    setTimeout(() => (isTransitioning.current = false), 620);
  }, []);

  const next = useCallback(() => go(1), [go]);
  const prev = useCallback(() => go(-1), [go]);

  useEffect(() => {
    if (!cardVisible) return;
    const id = setInterval(() => next(), 3800);
    return () => clearInterval(id);
  }, [cardVisible, next]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !track.children[0]) return;
    const gap = parseInt(getComputedStyle(track).gap) || 32;
    const cardW = track.children[0].offsetWidth + gap;
    track.style.transform = `translateX(-${current * cardW}px)`;
  }, [current]);

  // For true infinite seamless, duplicate track and handle jump without transition when wrapping
  // We use a simpler modulo approach with transition; the duplicate ensures no empty gap
  // To avoid long slide on wrap, we handle via instant jump
  const handleTransitionEnd = () => {
    const track = trackRef.current;
    if (!track) return;
    // no-op for now, the modulo keeps it within 0-3, dup ensures visual continuity
  };
  return (
    <section
      id="plans"
      ref={sectionRef}
      className="relative flex min-h-[52vh] items-center justify-center overflow-hidden bg-[#f8f8f8] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      {/* Rectangle lines pattern — dots removed */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.11]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.11) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      {/* Vertical Book Consultation — desktop only, right edge, greenish with animated background */}
      <motion.button
        type="button"
        initial={{ opacity: 0, x: 16, backgroundPosition: "0% 50%" }}
        animate={
          cardVisible
            ? {
                opacity: 1,
                x: 0,
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }
            : { opacity: 0, x: 16 }
        }
        transition={{
          opacity: { duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] },
          x: { duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] },
          backgroundPosition: { duration: 6, ease: "easeInOut", repeat: Infinity },
        }}
        className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center justify-center gap-3 overflow-hidden rounded-l-[14px] px-3 py-7 shadow-[0_4px_16px_rgba(0,0,0,0.14)] lg:flex"
        style={{
          background: "linear-gradient(135deg, #0a4a28 0%, #0f6437 35%, #14914f 65%)",
          backgroundSize: "200% 200%",
        }}
        aria-label="Book Consultation"
      >
        <motion.span
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.8, ease: "easeInOut" }}
          style={{ transform: "skewX(-12deg)" }}
        />
        <span className="relative z-10 text-[12px] font-semibold uppercase tracking-[0.16em] text-white" style={{ writingMode: "vertical-rl" }}>
          Book Consultation
        </span>
        <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-white/80" aria-hidden="true" />
      </motion.button>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={cardVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between"
      >
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:justify-between relative z-10">
          <div className="w-full max-w-[480px] lg:w-[38%]">
            <h2
              className="whitespace-nowrap text-[42px] font-bold leading-[0.95] tracking-[-0.03em] text-black sm:text-[48px] lg:text-[56px] xl:text-[62px]"
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
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={cardVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 min-h-[72px] text-[16px] leading-[1.7] tracking-[0.01em] text-black/60 sm:min-h-[72px] sm:text-[17px] lg:text-[18px] italic"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {DESC}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={cardVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-wrap items-center gap-2"
            >
              <div className="flex -space-x-1.5">
                {Array.from({ length: 10 }).map((_, i) => {
                  const idx = (current * 2 + i) % 10;
                  const src = `/behealthy/images/meal-${idx + 1}.png`;
                  return (
                    <motion.div
                      key={`${current}-${i}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                      className="h-7 w-7 shrink-0 overflow-hidden rounded-full border border-white bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:h-8 sm:w-8"
                    >
                      <img src={src} alt={`Sample ${i + 1}`} className="h-full w-full object-cover" />
                    </motion.div>
                  );
                })}
              </div>
              <span className="whitespace-nowrap text-[11px] font-medium tracking-[0.04em] text-black/40">
                +100 options
              </span>
            </motion.div>
            <div
              className="hidden w-full items-center gap-4 lg:flex"
              style={{
                opacity: buttonsVisible ? 1 : 0,
                transform: buttonsVisible ? "translateY(0)" : "translateY(8px)",
                transition:
                  "opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)",
                marginTop: "64px",
              }}
            >
              <div className="flex gap-3">
                <button
                  type="button"
                  aria-label="Previous plan"
                  onClick={prev}
                  className="grid h-10 w-10 place-items-center rounded-full bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.22)] transition hover:bg-[#1a1a1a]"
                >
                  <ArrowLeft size={16} strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  aria-label="Next plan"
                  onClick={next}
                  className="grid h-10 w-10 place-items-center rounded-full bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.22)] transition hover:bg-[#1a1a1a]"
                >
                  <ArrowRight size={16} strokeWidth={1.8} />
                </button>
              </div>
              <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-black/10">
                <div
                  className="h-full rounded-full bg-[#0A2E1F] transition-all duration-500"
                  style={{ width: `${((current + 1) / PLANS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden lg:w-[692px] lg:shrink-0 p-2 -m-2 pr-2 sm:pr-0 lg:p-4 lg:-m-4 lg:pr-0">
            <div
              ref={trackRef}
              className="flex w-max gap-5 sm:gap-8 pb-2 pr-6 sm:pr-0 lg:pb-6"
              style={{
                transition: "transform 600ms cubic-bezier(0.25,1,0.5,1)",
                willChange: "transform",
              }}
            >
              {trackItems.map((p, idx) => {
                const originalIdx = idx % PLANS.length;
                const isActive = originalIdx === current;
                const Icon = p.Icon;
                return (
                  <div
                    key={`${p.id}-${idx}`}
                    className="group flex h-[380px] w-[75vw] max-w-[280px] shrink-0 flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] sm:shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:h-[420px] sm:w-[310px] lg:h-[440px] lg:w-[330px]"
                    style={{
                      opacity:
                        idx % PLANS.length < cardsVisible
                          ? 1
                          : idx < cardsVisible
                            ? 1
                            : 0,
                      transform:
                        idx % PLANS.length < cardsVisible
                          ? "translateY(0)"
                          : "translateY(16px)",
                      transition:
                        "opacity 600ms ease, transform 600ms cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <div className="flex flex-1 flex-col p-5 pb-4">
                      <div
                        className={`grid h-9 w-9 place-items-center rounded-full border text-[13px] transition-all duration-300 ${
                          isActive
                            ? "border-[#0f6437] bg-[#0f6437] text-white shadow-[0_4px_12px_rgba(15,100,55,0.2)]"
                            : "border-[#0f6437]/15 bg-[#0f6437]/10 text-[#0f6437] group-hover:border-[#0f6437]/30 group-hover:bg-[#0f6437]/15"
                        }`}
                      >
                        <Icon size={16} strokeWidth={1.8} />
                      </div>
                      <div className="mt-8 text-[11px] font-medium uppercase tracking-[0.14em] text-[#0f6437]">
                        {p.label}
                      </div>
                      <div
                        className="mt-1 text-[18px] font-semibold leading-tight text-black sm:text-[19px]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {p.title}
                      </div>
                      <div className="mt-2 line-clamp-2 text-[14px] leading-[1.6] text-black/60">
                        {p.desc}
                      </div>
                    </div>
                    <div className="flex h-[52%] w-full shrink-0 items-center justify-center bg-white p-3">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="h-[85%] w-[85%] object-contain sm:h-full sm:w-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="mt-6 flex w-full items-center gap-4 lg:hidden"
            style={{
              opacity: buttonsVisible ? 1 : 0,
              transform: buttonsVisible ? "translateY(0)" : "translateY(8px)",
              transition:
                "opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Previous plan"
                onClick={prev}
                className="grid h-9 w-9 place-items-center rounded-full bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.22)] transition hover:bg-[#1a1a1a]"
              >
                <ArrowLeft size={15} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                aria-label="Next plan"
                onClick={next}
                className="grid h-9 w-9 place-items-center rounded-full bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.22)] transition hover:bg-[#1a1a1a]"
              >
                <ArrowRight size={15} strokeWidth={1.8} />
              </button>
            </div>
            <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-black/10">
              <div
                className="h-full rounded-full bg-[#0A2E1F] transition-all duration-500"
                style={{ width: `${((current + 1) / PLANS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
