import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Salad, Dumbbell, Leaf } from "lucide-react";

const TITLE_WORDS = ["Our", "Meal", "Plans"];

const PLANS = [
  {
    id: 1,
    label: "Plan 01",
    title: "Lunch Plan",
    desc: "Balanced lunch bowls, portioned and ready for your midday refuel.",
    Icon: Salad,
    img: "/aleens/images/meal-plan-1.png",
  },
  {
    id: 2,
    label: "Plan 02",
    title: "Weight Loss",
    desc: "Calorie-smart meals crafted to support your weight loss goals.",
    Icon: Dumbbell,
    img: "/aleens/images/meal-plan-2.png",
  },
  {
    id: 3,
    label: "Plan 03",
    title: "Wellness",
    desc: "Wholesome, nutrient-rich meals for everyday energy and balance.",
    Icon: Leaf,
    img: "/aleens/images/meal-plan-3.png",
  },
  {
    id: 4,
    label: "Plan 04",
    title: "Lunch Plan",
    desc: "Balanced lunch bowls, portioned and ready for your midday refuel.",
    Icon: Salad,
    img: "/aleens/images/meal-plan-1.png",
  },
  {
    id: 5,
    label: "Plan 05",
    title: "Weight Loss",
    desc: "Calorie-smart meals crafted to support your weight loss goals.",
    Icon: Dumbbell,
    img: "/aleens/images/meal-plan-2.png",
  },
  {
    id: 6,
    label: "Plan 06",
    title: "Wellness",
    desc: "Wholesome, nutrient-rich meals for everyday energy and balance.",
    Icon: Leaf,
    img: "/aleens/images/meal-plan-3.png",
  },
];

const DESC =
  "— Choose from lunch, weight loss, or wellness plans, crafted around your taste, schedule, and goals. Enjoy chef-crafted meals, flexible deliveries, easy swaps";

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

  const goTo = useCallback((index) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrent((index + PLANS.length) % PLANS.length);
    setTimeout(() => (isTransitioning.current = false), 620);
  }, []);

  const scrollToConsultation = useCallback(() => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

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
      className="relative flex min-h-[52vh] items-center justify-center overflow-hidden bg-white px-6 pt-24 pb-20 sm:px-10 sm:pt-28 sm:pb-24 lg:px-16 lg:pt-32 lg:pb-28"
    >
      {/* Floating meal plates in the background */}
      <motion.img
        src="/aleens/images/sub-1.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-16 z-0 h-20 w-20 rotate-[-12deg] object-contain opacity-[0.14] sm:h-24 sm:w-24 lg:top-24 lg:h-28 lg:w-28"
        animate={{ y: [0, -14, 0], rotate: [-12, -6, -12] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src="/aleens/images/sub-2.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-14 z-0 h-16 w-16 rotate-[10deg] object-contain opacity-[0.12] sm:h-20 sm:w-20 lg:top-20 lg:h-24 lg:w-24"
        animate={{ y: [0, 12, 0], rotate: [10, 4, 10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src="/aleens/images/sub-3.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 bottom-24 z-0 h-24 w-24 rotate-[8deg] object-contain opacity-[0.12] sm:right-0 sm:h-28 sm:w-28 lg:bottom-32 lg:h-32 lg:w-32"
        animate={{ y: [0, -10, 0], rotate: [8, 14, 8] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src="/aleens/images/sub-4.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] bottom-16 z-0 hidden h-20 w-20 rotate-[-8deg] object-contain opacity-[0.12] sm:block sm:left-[14%] sm:h-24 sm:w-24 lg:h-28 lg:w-28"
        animate={{ y: [0, 10, 0], rotate: [-8, -2, -8] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src="/aleens/images/sub-6.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[22%] top-1/2 z-0 hidden h-16 w-16 rotate-[-6deg] object-contain opacity-[0.12] lg:block lg:h-20 lg:w-20"
        animate={{ y: [0, 9, 0], rotate: [-6, 2, -6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src="/aleens/images/sub-5.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[20%] top-1/3 z-0 hidden h-16 w-16 rotate-[7deg] object-contain opacity-[0.12] lg:block lg:h-20 lg:w-20"
        animate={{ y: [0, -8, 0], rotate: [7, -3, 7] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Rectangle lines pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,166,81,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,166,81,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
{/* Vertical Book Consultation — removed */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={cardVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between"
      >
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:justify-between relative z-10">
          <div className="w-full max-w-[480px] lg:w-[38%]">
            <h2
              className="whitespace-nowrap text-[40px] font-bold leading-[0.95] tracking-[-0.03em] text-black sm:text-[48px] lg:text-[56px] xl:text-[64px]"
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
              transition={{
                duration: 0.6,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-6 min-h-[72px] text-[16px] leading-[1.7] tracking-[0.01em] text-black/60 sm:min-h-[72px] sm:text-[17px] italic [text-wrap:pretty]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {DESC}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={cardVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-6 flex flex-wrap items-center gap-2"
            >
              <div className="flex -space-x-1.5">
                {Array.from({ length: 8 }).map((_, i) => {
                  const idx = (current * 2 + i) % 8;
                  const src = `/aleens/images/meal-${idx + 1}.png`;
                  return (
                    <motion.div
                      key={`${current}-${i}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                      className="h-7 w-7 shrink-0 overflow-hidden rounded-full border border-black/10 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:h-8 sm:w-8"
                    >
                      <img
                        src={src}
                        alt={`Sample ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  );
                })}
              </div>
              <span className="whitespace-nowrap text-[11px] font-medium tracking-[0.04em] text-black/50">
                +100 options
              </span>
            </motion.div>
            <div
              className="hidden w-full items-center lg:flex"
              style={{
                opacity: buttonsVisible ? 1 : 0,
                transform: buttonsVisible ? "translateY(0)" : "translateY(8px)",
                transition:
                  "opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)",
                marginTop: "64px",
              }}
            >
              <div className="flex items-center gap-2.5">
                {PLANS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to plan ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`h-[2px] rounded-full transition-all duration-500 ${
                      i === current
                        ? "w-10 bg-[#00a651]"
                        : "w-4 bg-black/15 hover:bg-black/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto w-[75vw] overflow-hidden pb-5 pt-2 sm:w-[310px] lg:mx-0 lg:w-[732px] lg:shrink-0">
            <div
              ref={trackRef}
              className="flex w-max gap-5 sm:gap-8"
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
                    className="group flex h-[380px] w-[75vw] max-w-[280px] shrink-0 flex-col overflow-hidden rounded-[20px] border border-black/10 bg-white/80 shadow-[0_6px_16px_rgba(0,0,0,0.05)] backdrop-blur-[12px] sm:h-[420px] sm:max-w-none sm:w-[310px] lg:h-[440px] lg:w-[350px]"
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
                            ? "border-[#00a651]/50 bg-[#00a651] text-white shadow-[0_4px_12px_rgba(0,166,81,0.35)]"
                            : "border-black/15 bg-white text-black/60 group-hover:border-black/30 group-hover:bg-black/5"
                        }`}
                      >
                        <Icon size={16} strokeWidth={1.8} />
                      </div>
                      <div className="mt-8 text-[11px] font-medium uppercase tracking-[0.14em] text-black/50">
                        {p.label}
                      </div>
                      <div
                        className="mt-1 text-[18px] font-semibold leading-tight text-black sm:text-[19px]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {p.title}
                      </div>
                      <div className="mt-2 line-clamp-2 text-[14px] leading-[1.6] text-black/55">
                        {p.desc}
                      </div>
                    </div>
                    <div className="flex h-[52%] w-full shrink-0 items-center justify-center p-3">
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
            className="mt-6 flex w-full items-center justify-center lg:hidden"
            style={{
              opacity: buttonsVisible ? 1 : 0,
              transform: buttonsVisible ? "translateY(0)" : "translateY(8px)",
              transition:
                "opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="flex items-center gap-2.5">
              {PLANS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to plan ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-[2px] rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-10 bg-[#00a651]"
                      : "w-4 bg-black/15 hover:bg-black/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
