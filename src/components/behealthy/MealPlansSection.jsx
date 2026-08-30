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
  const [captionVisible, setCaptionVisible] = useState(false);
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
          setTimeout(() => setCaptionVisible(true), 180);
          const afterTitle = 180 + TITLE_WORDS.length * 90 + 160;
          setTimeout(() => setButtonsVisible(true), afterTitle - 60);
          // description appears after scroll — no typewriting
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

  const [itemOffsets, setItemOffsets] = useState(() =>
    Array.from({ length: 2 }, () => ({ x: 0, y: 0 })),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setItemOffsets((prev) =>
        prev.map(() => ({
          x: (Math.random() - 0.5) * 24,
          y: (Math.random() - 0.5) * 16,
        })),
      );
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const UNIFORM_SIZE = "h-[108px] w-[108px] lg:h-[152px] lg:w-[152px]";
  const BW = "#0A0A0A";
  const floatingItems = [
    {
      type: "pepper",
      pos: "-left-8 top-6",
      size: UNIFORM_SIZE,
      rot: 18,
      delay: 0,
      dur: 5.6,
      y: [-6, 0],
      r: [18, 19, 18],
      color: BW,
    },
    {
      type: "tomato",
      pos: "-right-8 bottom-8",
      size: UNIFORM_SIZE,
      rot: -22,
      cls: "-scale-x-100",
      delay: 0.4,
      dur: 6.2,
      y: [-7, 0],
      r: [-22, -23, -22],
      color: BW,
    },
  ];

  return (
    <section
      id="plans"
      ref={sectionRef}
      className="relative flex min-h-[52vh] items-center justify-center overflow-hidden bg-[#f8f8f8] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
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
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {floatingItems.map((item, idx) => (
          <motion.div
            key={item.type + idx}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{
              opacity: cardVisible ? 1 : 0,
              scale: cardVisible ? 1 : 0.92,
              x: itemOffsets[idx].x,
              y: itemOffsets[idx].y,
            }}
            transition={{
              opacity: { duration: 0.6, delay: idx * 0.07 },
              scale: { duration: 0.6, delay: idx * 0.07 },
              x: { duration: 1.4, ease: "easeInOut" },
              y: { duration: 1.4, ease: "easeInOut" },
            }}
            className={`absolute block ${item.pos} ${item.cls || ""}`}
          >
            <motion.svg
              viewBox="0 0 120 120"
              fill="none"
              aria-hidden="true"
              className={`${item.size}`}
              style={{ color: item.color }}
              animate={{ y: item.y, rotate: item.r }}
              transition={{
                duration: item.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay,
              }}
            >
              {item.type === "carrot" && (
                <>
                  <path
                    d="M60 92 C54 74 52 48 60 18 C68 48 66 74 60 92 Z"
                    fill="currentColor"
                    fillOpacity="0.16"
                  />
                  <path
                    d="M60 18 C55 11 44 10 48 18"
                    stroke="currentColor"
                    strokeOpacity="0.22"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M60 18 C60 10 58 8 60 12"
                    stroke="currentColor"
                    strokeOpacity="0.22"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M60 18 C65 11 76 10 72 18"
                    stroke="currentColor"
                    strokeOpacity="0.22"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M55 52 L64 54"
                    stroke="white"
                    strokeOpacity="0.35"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <path
                    d="M54 64 L63 66"
                    stroke="white"
                    strokeOpacity="0.32"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <path
                    d="M55 76 L62 78"
                    stroke="white"
                    strokeOpacity="0.28"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                  />
                </>
              )}
              {item.type === "tomato" && (
                <>
                  <path
                    d="M60 90 C36 90 20 72 28 50 C34 30 86 30 92 50 C100 72 84 90 60 90 Z"
                    fill="currentColor"
                    fillOpacity="0.14"
                  />
                  <path
                    d="M60 30 C56 22 50 18 56 25 L60 16 L64 25 C70 18 64 22 60 30 Z"
                    fill="currentColor"
                    fillOpacity="0.22"
                  />
                  <path
                    d="M60 30 C58 24 52 22 56 28"
                    stroke="#1a4d2a"
                    strokeOpacity="0.18"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <ellipse
                    cx="44"
                    cy="54"
                    rx="9"
                    ry="6"
                    fill="white"
                    fillOpacity="0.22"
                  />
                </>
              )}
              {item.type === "broccoli" && (
                <>
                  <path
                    d="M52 64 L68 64 L64 92 L56 92 Z"
                    fill="currentColor"
                    fillOpacity="0.18"
                  />
                  <circle
                    cx="60"
                    cy="44"
                    r="16"
                    fill="currentColor"
                    fillOpacity="0.16"
                  />
                  <circle
                    cx="42"
                    cy="50"
                    r="12"
                    fill="currentColor"
                    fillOpacity="0.13"
                  />
                  <circle
                    cx="78"
                    cy="50"
                    r="12"
                    fill="currentColor"
                    fillOpacity="0.13"
                  />
                  <circle
                    cx="48"
                    cy="34"
                    r="9"
                    fill="currentColor"
                    fillOpacity="0.11"
                  />
                  <circle
                    cx="72"
                    cy="34"
                    r="9"
                    fill="currentColor"
                    fillOpacity="0.11"
                  />
                  <circle
                    cx="60"
                    cy="30"
                    r="7"
                    fill="currentColor"
                    fillOpacity="0.09"
                  />
                </>
              )}
              {item.type === "avocado" && (
                <>
                  <ellipse
                    cx="60"
                    cy="58"
                    rx="24"
                    ry="32"
                    fill="currentColor"
                    fillOpacity="0.14"
                  />
                  <ellipse
                    cx="60"
                    cy="60"
                    rx="16"
                    ry="22"
                    fill="white"
                    fillOpacity="0.38"
                  />
                  <ellipse
                    cx="60"
                    cy="68"
                    rx="8.5"
                    ry="9.5"
                    fill="currentColor"
                    fillOpacity="0.42"
                  />
                  <ellipse
                    cx="57"
                    cy="64"
                    rx="2.5"
                    ry="2.8"
                    fill="white"
                    fillOpacity="0.28"
                  />
                </>
              )}
              {item.type === "pepper" && (
                <>
                  <path
                    d="M60 20 C44 20 30 32 32 52 C34 70 42 90 60 90 C78 90 86 70 88 52 C90 32 76 20 60 20 Z"
                    fill="currentColor"
                    fillOpacity="0.14"
                  />
                  <path
                    d="M46 24 C43 42 43 72 46 88"
                    stroke="currentColor"
                    strokeOpacity="0.12"
                    strokeWidth="1.1"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M74 24 C77 42 77 72 74 88"
                    stroke="currentColor"
                    strokeOpacity="0.12"
                    strokeWidth="1.1"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M56 20 L64 20 L62 10 L58 10 Z"
                    fill="currentColor"
                    fillOpacity="0.24"
                  />
                  <ellipse
                    cx="48"
                    cy="46"
                    rx="6"
                    ry="4"
                    fill="white"
                    fillOpacity="0.16"
                  />
                </>
              )}
              {item.type === "mushroom" && (
                <>
                  <path
                    d="M52 52 L68 52 L66 90 L54 90 Z"
                    fill="white"
                    fillOpacity="0.55"
                    stroke="currentColor"
                    strokeOpacity="0.14"
                    strokeWidth="1"
                  />
                  <path
                    d="M28 56 C28 28 92 28 92 56 Z"
                    fill="currentColor"
                    fillOpacity="0.16"
                  />
                  <path
                    d="M28 56 C28 28 92 28 92 56"
                    stroke="currentColor"
                    strokeOpacity="0.16"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="42"
                    r="3"
                    fill="white"
                    fillOpacity="0.32"
                  />
                  <circle
                    cx="66"
                    cy="38"
                    r="2.4"
                    fill="white"
                    fillOpacity="0.26"
                  />
                  <circle
                    cx="58"
                    cy="46"
                    r="1.7"
                    fill="white"
                    fillOpacity="0.22"
                  />
                </>
              )}
              {item.type === "lemon" && (
                <>
                  <path
                    d="M28 60 C38 34 82 34 92 60 C82 86 38 86 28 60 Z"
                    fill="currentColor"
                    fillOpacity="0.14"
                  />
                  <path
                    d="M28 60 C38 34 82 34 92 60 C82 86 38 86 28 60 Z"
                    stroke="currentColor"
                    strokeOpacity="0.13"
                    strokeWidth="1"
                    fill="none"
                  />
                  <circle
                    cx="92"
                    cy="60"
                    r="3.5"
                    fill="currentColor"
                    fillOpacity="0.18"
                  />
                  <circle
                    cx="28"
                    cy="60"
                    r="2.8"
                    fill="currentColor"
                    fillOpacity="0.15"
                  />
                  <circle
                    cx="52"
                    cy="56"
                    r="1.3"
                    fill="white"
                    fillOpacity="0.22"
                  />
                  <circle
                    cx="60"
                    cy="64"
                    r="1.1"
                    fill="white"
                    fillOpacity="0.18"
                  />
                  <circle
                    cx="68"
                    cy="56"
                    r="1"
                    fill="white"
                    fillOpacity="0.18"
                  />
                </>
              )}
              {item.type === "corn" && (
                <>
                  <path
                    d="M44 78 C30 58 36 28 52 14 C48 32 46 60 44 78 Z"
                    fill="currentColor"
                    fillOpacity="0.11"
                  />
                  <path
                    d="M76 78 C90 58 84 28 68 14 C72 32 74 60 76 78 Z"
                    fill="currentColor"
                    fillOpacity="0.11"
                  />
                  <ellipse
                    cx="60"
                    cy="58"
                    rx="16"
                    ry="30"
                    fill="currentColor"
                    fillOpacity="0.16"
                  />
                  <ellipse
                    cx="60"
                    cy="58"
                    rx="16"
                    ry="30"
                    stroke="currentColor"
                    strokeOpacity="0.12"
                    strokeWidth="0.9"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="36"
                    r="3.2"
                    fill="white"
                    fillOpacity="0.22"
                  />
                  <circle
                    cx="52"
                    cy="42"
                    r="3"
                    fill="white"
                    fillOpacity="0.20"
                  />
                  <circle
                    cx="68"
                    cy="42"
                    r="3"
                    fill="white"
                    fillOpacity="0.20"
                  />
                  <circle
                    cx="52"
                    cy="54"
                    r="3"
                    fill="white"
                    fillOpacity="0.18"
                  />
                  <circle
                    cx="68"
                    cy="54"
                    r="3"
                    fill="white"
                    fillOpacity="0.18"
                  />
                  <circle
                    cx="60"
                    cy="48"
                    r="3"
                    fill="white"
                    fillOpacity="0.19"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="3"
                    fill="white"
                    fillOpacity="0.17"
                  />
                  <circle
                    cx="52"
                    cy="66"
                    r="2.8"
                    fill="white"
                    fillOpacity="0.16"
                  />
                  <circle
                    cx="68"
                    cy="66"
                    r="2.8"
                    fill="white"
                    fillOpacity="0.16"
                  />
                  <circle
                    cx="60"
                    cy="72"
                    r="2.8"
                    fill="white"
                    fillOpacity="0.16"
                  />
                </>
              )}
              {item.type === "eggplant" && (
                <>
                  <ellipse
                    cx="60"
                    cy="62"
                    rx="16"
                    ry="28"
                    fill="currentColor"
                    fillOpacity="0.15"
                    transform="rotate(-18 60 62)"
                  />
                  <ellipse
                    cx="60"
                    cy="62"
                    rx="16"
                    ry="28"
                    stroke="currentColor"
                    strokeOpacity="0.12"
                    strokeWidth="0.9"
                    fill="none"
                    transform="rotate(-18 60 62)"
                  />
                  <ellipse
                    cx="53"
                    cy="36"
                    rx="10"
                    ry="6"
                    fill="currentColor"
                    fillOpacity="0.18"
                    transform="rotate(-18 53 36)"
                  />
                  <path
                    d="M46 34 L52 26 L58 30 L54 36 Z"
                    fill="#4a7a3a"
                    fillOpacity="0.22"
                  />
                  <ellipse
                    cx="56"
                    cy="58"
                    rx="5"
                    ry="8"
                    fill="white"
                    fillOpacity="0.14"
                    transform="rotate(-18 56 58)"
                  />
                </>
              )}
              {item.type === "onion" && (
                <>
                  <ellipse
                    cx="60"
                    cy="62"
                    rx="20"
                    ry="22"
                    fill="currentColor"
                    fillOpacity="0.14"
                  />
                  <path
                    d="M46 42 C42 36 46 30 60 30 C74 30 78 36 74 42 C74 38 70 34 60 34 C50 34 46 38 46 42 Z"
                    fill="currentColor"
                    fillOpacity="0.18"
                  />
                  <path
                    d="M44 54 C44 54 50 46 60 46 C70 46 76 54 76 54"
                    stroke="white"
                    strokeOpacity="0.22"
                    strokeWidth="0.9"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M42 64 C42 64 50 56 60 56 C70 56 78 64 78 64"
                    stroke="white"
                    strokeOpacity="0.18"
                    strokeWidth="0.9"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <ellipse
                    cx="52"
                    cy="56"
                    rx="6"
                    ry="4"
                    fill="white"
                    fillOpacity="0.14"
                  />
                </>
              )}
              {item.type === "cucumber" && (
                <>
                  <ellipse
                    cx="60"
                    cy="60"
                    rx="12"
                    ry="30"
                    fill="currentColor"
                    fillOpacity="0.15"
                  />
                  <ellipse
                    cx="60"
                    cy="60"
                    rx="12"
                    ry="30"
                    stroke="white"
                    strokeOpacity="0.18"
                    strokeWidth="0.7"
                    fill="none"
                  />
                  <ellipse
                    cx="60"
                    cy="60"
                    rx="7"
                    ry="22"
                    fill="white"
                    fillOpacity="0.18"
                  />
                  <circle
                    cx="60"
                    cy="38"
                    r="1.6"
                    fill="white"
                    fillOpacity="0.28"
                  />
                  <circle
                    cx="60"
                    cy="48"
                    r="1.6"
                    fill="white"
                    fillOpacity="0.28"
                  />
                  <circle
                    cx="60"
                    cy="58"
                    r="1.6"
                    fill="white"
                    fillOpacity="0.28"
                  />
                  <circle
                    cx="60"
                    cy="68"
                    r="1.6"
                    fill="white"
                    fillOpacity="0.24"
                  />
                  <circle
                    cx="60"
                    cy="78"
                    r="1.6"
                    fill="white"
                    fillOpacity="0.20"
                  />
                </>
              )}
              {item.type === "chili" && (
                <>
                  <path
                    d="M60 18 C66 28 72 44 68 66 C64 78 58 88 52 92 C48 92 52 82 56 68 C58 48 54 28 60 18 Z"
                    fill="currentColor"
                    fillOpacity="0.16"
                  />
                  <path
                    d="M60 18 C58 12 56 8 60 10 C64 8 62 12 60 18 Z"
                    fill="currentColor"
                    fillOpacity="0.22"
                  />
                  <path
                    d="M60 18 C60 10 60 8 60 12"
                    stroke="#2d6a3a"
                    strokeOpacity="0.18"
                    strokeWidth="1.1"
                    fill="none"
                    strokeLinecap="round"
                  />
                </>
              )}
              {item.type === "garlic" && (
                <>
                  <path
                    d="M60 90 C42 90 32 72 38 56 C42 42 50 30 60 28 C70 30 78 42 82 56 C88 72 78 90 60 90 Z"
                    fill="currentColor"
                    fillOpacity="0.14"
                  />
                  <path
                    d="M60 28 L60 18 L64 20 L60 28"
                    stroke="currentColor"
                    strokeOpacity="0.18"
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M52 36 C50 48 48 66 52 86"
                    stroke="currentColor"
                    strokeOpacity="0.10"
                    strokeWidth="0.9"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M68 36 C70 48 72 66 68 86"
                    stroke="currentColor"
                    strokeOpacity="0.10"
                    strokeWidth="0.9"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M60 36 C60 50 60 70 60 88"
                    stroke="currentColor"
                    strokeOpacity="0.10"
                    strokeWidth="0.9"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <ellipse
                    cx="54"
                    cy="62"
                    rx="4"
                    ry="5"
                    fill="white"
                    fillOpacity="0.16"
                  />
                </>
              )}
              {item.type === "peas" && (
                <>
                  <path
                    d="M34 54 C34 34 52 28 60 42 C68 28 86 34 86 54 C86 72 68 84 60 70 C52 84 34 72 34 54 Z"
                    fill="currentColor"
                    fillOpacity="0.13"
                  />
                  <path
                    d="M34 54 C34 34 52 28 60 42 C68 28 86 34 86 54 C86 72 68 84 60 70 C52 84 34 72 34 54 Z"
                    stroke="currentColor"
                    strokeOpacity="0.12"
                    strokeWidth="0.9"
                    fill="none"
                  />
                  <circle
                    cx="42"
                    cy="54"
                    r="6.5"
                    fill="white"
                    fillOpacity="0.20"
                  />
                  <circle
                    cx="60"
                    cy="58"
                    r="7"
                    fill="white"
                    fillOpacity="0.20"
                  />
                  <circle
                    cx="78"
                    cy="54"
                    r="6.5"
                    fill="white"
                    fillOpacity="0.18"
                  />
                  <circle
                    cx="42"
                    cy="54"
                    r="3.5"
                    fill="currentColor"
                    fillOpacity="0.22"
                  />
                  <circle
                    cx="60"
                    cy="58"
                    r="4"
                    fill="currentColor"
                    fillOpacity="0.22"
                  />
                  <circle
                    cx="78"
                    cy="54"
                    r="3.5"
                    fill="currentColor"
                    fillOpacity="0.20"
                  />
                </>
              )}
            </motion.svg>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={cardVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between"
      >
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:justify-between relative z-10">
          <div className="w-full max-w-[480px] lg:w-[38%]">
            <motion.div
              className="relative mb-3 inline-flex items-center overflow-hidden rounded-full border border-black/5 px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-black/60"
              style={{
                background:
                  "linear-gradient(135deg, #f5f2eb 0%, #ffffff 45%, #ececec 75%, #f0ebe3 100%)",
                backgroundSize: "200% 200%",
                opacity: captionVisible ? 1 : 0,
                transform: captionVisible ? "translateY(0)" : "translateY(8px)",
                transition:
                  "opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)",
              }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            >
              <motion.span
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.06] to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatDelay: 2.8,
                  ease: "easeInOut",
                }}
                style={{ transform: "skewX(-12deg)" }}
              />
              <span className="relative z-10">//Your Smart Choice</span>
            </motion.div>
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
