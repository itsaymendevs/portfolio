import { useState, useEffect, useCallback } from "react";
import { ArrowDown, ChevronDown } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const WORDS = [
  "Freshness.",
  "Nourishment.",
  "Wellness.",
  "Flavor.",
  "Quality.",
];

const TYPING_SPEED = 110;
const DELETING_SPEED = 65;
const PAUSE_AFTER_TYPE = 2200;

function HeroV2() {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const timer = setTimeout(() => setMoveRight(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const current = WORDS[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
          }
        } else {
          setText(current.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setIsDeleting(false);
            setWordIdx((prev) => (prev + 1) % WORDS.length);
          }
        }
      },
      isDeleting ? DELETING_SPEED : TYPING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx]);

  const scrollToContent = useCallback(() => {
    const target = document.getElementById("meal-plans");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative flex h-screen w-full items-end overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
        <source src="/realmeal/hero.mp4" type="video/mp4" />
      </video>

      <div className={`absolute inset-0 ${isDark ? "bg-black/55" : "bg-black/40"}`} />

      <div className="absolute top-44 left-8 z-10 sm:left-12 md:left-16 lg:left-20">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Chef Crafted</p>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Meals Delivered</p>
        <p className="mt-1 text-base font-normal uppercase tracking-[0.25em] text-white/50">Across The UAE</p>
      </div>

      <a href="#meal-plans" className="absolute top-1/2 right-8 z-10 -translate-y-1/2 sm:right-12 md:right-16 lg:right-20">
        <div
          className="group flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition-colors duration-300 group-hover:text-white">
            Pick Your Meal Plan
          </span>
          <ArrowDown size={14} strokeWidth={2} className="text-white/60 transition-colors duration-300 group-hover:text-white" />
        </div>
      </a>

      <div
        className="relative z-10 mb-16 px-8 sm:mb-20 sm:px-12 md:mb-24 md:px-16 lg:mb-28 lg:px-20"
        style={{
          transform: moveRight ? "translateX(40px)" : "translateX(0)",
          transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <h1 className="text-[14vw] font-bold leading-none tracking-tight text-white sm:text-[12vw] md:text-[11vw] lg:text-[10vw]">
          {text}
          <span className="ml-1 inline-block h-[0.8em] w-[3px] bg-white align-bottom" />
        </h1>
      </div>

      <button
        type="button"
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/40 transition-colors duration-300 hover:text-white"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} strokeWidth={1.5} className="animate-bounce" />
      </button>
    </section>
  );
}

export default HeroV2;
