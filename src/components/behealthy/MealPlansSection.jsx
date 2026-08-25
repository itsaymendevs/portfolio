import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Salad, Dumbbell, Leaf, Feather } from "lucide-react";

const TITLE_WORDS = ["Our", "Meal", "Plans."];
const DESC = "Choose from balanced, high-protein, or plant-based plans — each crafted to fit your taste, your schedule and your goals.";

const PLANS = [
  { id: 1, label: "Plan 01", title: "Balanced Bowl", desc: "Balanced nutrition for everyday wellness. Fresh, portioned and ready.", Icon: Salad, img: "/behealthy/images/meal-plan-1.png" },
  { id: 2, label: "Plan 02", title: "High Protein", desc: "Power up your day with protein-packed, chef-crafted meals.", Icon: Dumbbell, img: "/behealthy/images/meal-plan-2.png" },
  { id: 3, label: "Plan 03", title: "Plant Power", desc: "100% plant-based, vibrant and nourishing.", Icon: Leaf, img: "/behealthy/images/meal-plan-3.png" },
  { id: 4, label: "Plan 04", title: "Lean & Light", desc: "Light, lean and flavorful — perfect for mindful eating.", Icon: Feather, img: "/behealthy/images/meal-plan-1.png" },
];

export default function MealPlansSection() {
  const [cardVisible, setCardVisible] = useState(false);
  const [titleWords, setTitleWords] = useState(0);
  const [captionVisible, setCaptionVisible] = useState(false);
  const [typed, setTyped] = useState("");
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
          TITLE_WORDS.forEach((_, i) => setTimeout(() => setTitleWords(i + 1), 180 + i * 90));
          setTimeout(() => setCaptionVisible(true), 180);
          const afterTitle = 180 + TITLE_WORDS.length * 90 + 160;
          setTimeout(() => setButtonsVisible(true), afterTitle - 60);
          setTimeout(() => {
            let i = 0;
            const iv = setInterval(() => {
              i++;
              setTyped(DESC.slice(0, i));
              if (i >= DESC.length) clearInterval(iv);
            }, 12);
          }, afterTitle);
          setTimeout(() => {
            PLANS.forEach((_, idx) => setTimeout(() => setCardsVisible((v) => v + 1), afterTitle + 320 + idx * 110));
          }, 0);
          obs.disconnect();
        }
      },
      { threshold: 0.22 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const trackItems = [...PLANS, ...PLANS];

  const go = useCallback(
    (dir) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      setCurrent((c) => (c + dir + PLANS.length) % PLANS.length);
      setTimeout(() => (isTransitioning.current = false), 620);
    },
    []
  );

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

  const [leafOffsets, setLeafOffsets] = useState(() =>
    Array.from({ length: 8 }, () => ({ x: 0, y: 0 }))
  );
  const [cardLeafOffsets, setCardLeafOffsets] = useState(() =>
    Array.from({ length: 6 }, () => ({ x: 0, y: 0 }))
  );
  useEffect(() => {
    const id = setInterval(() => {
      setLeafOffsets((prev) => prev.map(() => ({ x: (Math.random() - 0.5) * 24, y: (Math.random() - 0.5) * 16 })));
    }, 4000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const id = setInterval(() => {
      setCardLeafOffsets((prev) => prev.map(() => ({ x: (Math.random() - 0.5) * 18, y: (Math.random() - 0.5) * 12 })));
    }, 3800);
    return () => clearInterval(id);
  }, []);

  const mealLeaves = [
    { pos: "-left-6 top-6", size: "h-[90px] w-[90px] lg:h-[120px] lg:w-[120px]", rot: 18, delay: 0, dur: 5.6, y: [-6, 0], r: [18, 19, 18] },
    { pos: "-right-6 bottom-10", size: "h-[100px] w-[100px] lg:h-[140px] lg:w-[140px]", rot: -22, cls: "-scale-x-100", delay: 0.4, dur: 6.2, y: [-7, 0], r: [-22, -23, -22] },
    { pos: "right-[22%] top-[10%]", size: "h-[56px] w-[56px] lg:h-[72px] lg:w-[72px]", rot: 24, delay: 1, dur: 6.8, y: [-5, 0], r: [24, 25, 24] },
    { pos: "left-[18%] bottom-[18%]", size: "h-[48px] w-[48px] lg:h-[64px] lg:w-[64px]", rot: -16, delay: 0.6, dur: 5.2, y: [-4, 0], r: [-16, -17, -16] },
    { pos: "right-[36%] top-[36%]", size: "h-[42px] w-[42px] lg:h-[58px] lg:w-[58px]", rot: 12, delay: 1.1, dur: 5.4, y: [-4, 0], r: [12, 13, 12] },
    { pos: "left-[42%] top-[8%]", size: "h-[38px] w-[38px] lg:h-[50px] lg:w-[50px]", rot: -10, delay: 0.3, dur: 5, y: [-5, 0], r: [-10, -11, -10] },
    { pos: "left-[30%] bottom-[8%]", size: "h-[36px] w-[36px] lg:h-[48px] lg:w-[48px]", rot: 20, delay: 0.8, dur: 5.6, y: [-4, 0], r: [20, 21, 20] },
    { pos: "right-[8%] bottom-[28%]", size: "h-[44px] w-[44px] lg:h-[60px] lg:w-[60px]", rot: -18, delay: 1.3, dur: 6, y: [-5, 0], r: [-18, -19, -18] },
  ];

  const cardLeaves = [
    { pos: "-left-3 top-8", size: "h-[70px] w-[70px] lg:h-[90px] lg:w-[90px]", rot: 16, delay: 0.2, dur: 5.4, y: [-5, 0], r: [16, 17, 16] },
    { pos: "right-[6%] top-[12%]", size: "h-[54px] w-[54px] lg:h-[72px] lg:w-[72px]", rot: -18, delay: 0.6, dur: 6, y: [-6, 0], r: [-18, -19, -18] },
    { pos: "left-[18%] bottom-[14%]", size: "h-[48px] w-[48px] lg:h-[64px] lg:w-[64px]", rot: 22, delay: 1, dur: 5.8, y: [-4, 0], r: [22, 23, 22] },
    { pos: "right-[28%] bottom-[20%]", size: "h-[42px] w-[42px] lg:h-[56px] lg:w-[56px]", rot: -14, delay: 0.4, dur: 5.2, y: [-4, 0], r: [-14, -15, -14] },
    { pos: "left-[44%] top-[16%]", size: "h-[38px] w-[38px] lg:h-[52px] lg:w-[52px]", rot: 10, delay: 0.9, dur: 6.2, y: [-5, 0], r: [10, 11, 10] },
    { pos: "right-[14%] bottom-[6%]", size: "h-[36px] w-[36px] lg:h-[48px] lg:w-[48px]", rot: 26, delay: 1.3, dur: 5.6, y: [-4, 0], r: [26, 27, 26] },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white px-4 py-6 sm:px-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {mealLeaves.map((leaf, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{
              opacity: cardVisible ? 1 : 0,
              scale: cardVisible ? 1 : 0.92,
              x: leafOffsets[idx].x,
              y: leafOffsets[idx].y,
            }}
            transition={{ opacity: { duration: 0.6, delay: idx * 0.07 }, scale: { duration: 0.6, delay: idx * 0.07 }, x: { duration: 1.4, ease: "easeInOut" }, y: { duration: 1.4, ease: "easeInOut" } }}
            className={`absolute block ${leaf.pos} ${leaf.cls || ""}`}
          >
            <motion.svg
              viewBox="0 0 120 120"
              fill="none"
              aria-hidden="true"
              className={`${leaf.size}`}
              style={{ color: "#0f6437" }}
              animate={{ y: leaf.y, rotate: leaf.r }}
              transition={{ duration: leaf.dur, repeat: Infinity, ease: "easeInOut", delay: leaf.delay }}
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
                fillOpacity="0.07"
              />
              <path d="M 60 96 L 60 26" stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.7" />
              <path d="M 60 60 C 66 54, 74 48, 82 44" stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.55" fill="none" strokeLinecap="round" />
              <path d="M 60 60 C 54 54, 46 48, 38 44" stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.55" fill="none" strokeLinecap="round" />
            </motion.svg>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={cardVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto flex w-full max-w-[1440px] flex-col overflow-hidden rounded-[28px] bg-[#f7f7f7] px-8 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-start lg:justify-between lg:px-14 lg:py-14 xl:px-16"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]" aria-hidden="true">
          {cardLeaves.map((leaf, idx) => (
            <motion.div
              key={`card-${idx}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{
                opacity: cardVisible ? 1 : 0,
                scale: cardVisible ? 1 : 0.92,
                x: cardLeafOffsets[idx].x,
                y: cardLeafOffsets[idx].y,
              }}
              transition={{ opacity: { duration: 0.6, delay: idx * 0.06 }, scale: { duration: 0.6, delay: idx * 0.06 }, x: { duration: 1.4, ease: "easeInOut" }, y: { duration: 1.4, ease: "easeInOut" } }}
              className={`absolute block ${leaf.pos} ${leaf.cls || ""}`}
            >
              <motion.svg
                viewBox="0 0 120 120"
                fill="none"
                aria-hidden="true"
                className={`${leaf.size}`}
                style={{ color: "#0f6437" }}
                animate={{ y: leaf.y, rotate: leaf.r }}
                transition={{ duration: leaf.dur, repeat: Infinity, ease: "easeInOut", delay: leaf.delay }}
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
                  fillOpacity="0.06"
                />
                <path d="M 60 96 L 60 26" stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.65" />
                <path d="M 60 60 C 66 54, 74 48, 82 44" stroke="currentColor" strokeOpacity="0.11" strokeWidth="0.5" fill="none" strokeLinecap="round" />
                <path d="M 60 60 C 54 54, 46 48, 38 44" stroke="currentColor" strokeOpacity="0.11" strokeWidth="0.5" fill="none" strokeLinecap="round" />
              </motion.svg>
            </motion.div>
          ))}
        </div>
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:justify-between relative z-10">
          <div className="w-full max-w-[480px] lg:w-[38%]">
            <div
              className="mb-3 inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-[#0A2E1F]/60"
              style={{
                opacity: captionVisible ? 1 : 0,
                transform: captionVisible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              //Your Smart Choice
            </div>
            <h2
              className="whitespace-nowrap text-[42px] font-bold leading-[0.95] tracking-[-0.03em] text-[#0A2E1F] sm:text-[48px] lg:text-[56px] xl:text-[62px]"
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
            <p
              className="mt-6 min-h-[72px] text-[16px] leading-[1.7] tracking-[0.01em] text-[#0A2E1F]/60 sm:text-[17px] lg:text-[18px]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {typed}
              <span className="ml-0.5 inline-block h-[1em] w-px animate-pulse bg-[#0A2E1F]/30 align-middle" />
            </p>
            <div
              className="hidden w-full items-center gap-4 lg:flex"
              style={{
                opacity: buttonsVisible ? 1 : 0,
                transform: buttonsVisible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)",
                marginTop: "64px",
              }}
            >
              <div className="flex gap-3">
                <button
                  type="button"
                  aria-label="Previous plan"
                  onClick={prev}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#0A2E1F] text-white shadow-[0_4px_16px_rgba(10,46,31,0.22)] transition hover:bg-black"
                >
                  <ArrowLeft size={16} strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  aria-label="Next plan"
                  onClick={next}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#0A2E1F] text-white shadow-[0_4px_16px_rgba(10,46,31,0.22)] transition hover:bg-black"
                >
                  <ArrowRight size={16} strokeWidth={1.8} />
                </button>
              </div>
              <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-[#0A2E1F]/10">
                <div
                  className="h-full rounded-full bg-[#0A2E1F] transition-all duration-500"
                  style={{ width: `${((current + 1) / PLANS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden lg:w-[692px] lg:shrink-0">
            <div
              ref={trackRef}
              className="flex w-max gap-5 sm:gap-8 pb-2"
              style={{ transition: "transform 600ms cubic-bezier(0.25,1,0.5,1)", willChange: "transform" }}
            >
              {trackItems.map((p, idx) => {
                const originalIdx = idx % PLANS.length;
                const isActive = originalIdx === current;
                const Icon = p.Icon;
                return (
                  <div
                    key={`${p.id}-${idx}`}
                    className="group flex h-[380px] w-[85vw] max-w-[320px] shrink-0 flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:h-[420px] sm:w-[310px] lg:h-[440px] lg:w-[330px]"
                    style={{
                      opacity: idx % PLANS.length < cardsVisible ? 1 : idx < cardsVisible ? 1 : 0,
                      transform: idx % PLANS.length < cardsVisible ? "translateY(0)" : "translateY(16px)",
                      transition: "opacity 600ms ease, transform 600ms cubic-bezier(0.16,1,0.3,1)",
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
                      <div className="mt-8 text-[11px] font-medium uppercase tracking-[0.14em] text-[#0f6437]">{p.label}</div>
                      <div className="mt-1 text-[18px] font-semibold leading-tight text-[#0A2E1F] sm:text-[19px]" style={{ fontFamily: "var(--font-display)" }}>
                        {p.title}
                      </div>
                      <div className="mt-2 line-clamp-2 text-[14px] leading-[1.6] text-[#0A2E1F]/60">{p.desc}</div>
                    </div>
                    <div className="flex h-[52%] w-full shrink-0 items-center justify-center bg-white p-3">
                      <img src={p.img} alt={p.title} className="h-full w-full object-contain" />
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
              transition: "opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Previous plan"
                onClick={prev}
                className="grid h-9 w-9 place-items-center rounded-full bg-[#0A2E1F] text-white shadow-[0_4px_16px_rgba(10,46,31,0.22)] transition hover:bg-black"
              >
                <ArrowLeft size={15} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                aria-label="Next plan"
                onClick={next}
                className="grid h-9 w-9 place-items-center rounded-full bg-[#0A2E1F] text-white shadow-[0_4px_16px_rgba(10,46,31,0.22)] transition hover:bg-black"
              >
                <ArrowRight size={15} strokeWidth={1.8} />
              </button>
            </div>
            <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-[#0A2E1F]/10">
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
