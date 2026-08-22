import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const TITLE_WORDS = ["Pick", "Your", "Meal", "Plan."];

const PLANS = [
  { name: "Power Up", price: "AED 201 per day", img: "/realmeal/meal-plan-1.avif" },
  { name: "Healthy Balanced", price: "AED 177 per day", img: "/realmeal/meal-plan-2.avif" },
  { name: "Lean Lifestyle", price: "AED 149 per day", img: "/realmeal/meal-plan-3.avif" },
  { name: "Weight Loss", price: "AED 127 per day", img: "/realmeal/meal-plan-4.avif" },
];

function BrandSection() {
  const [visible, setVisible] = useState(false);
  const [visibleWords, setVisibleWords] = useState(0);
  const [showCards, setShowCards] = useState(false);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const autoRef = useRef(null);
  const progressRef = useRef(null);
  const posRef = useRef(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), 300);
          TITLE_WORDS.forEach((_, i) => {
            setTimeout(() => setVisibleWords((v) => v + 1), 600 + i * 200);
          });
          setTimeout(() => setShowCards(true), 600 + TITLE_WORDS.length * 200 + 400);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const doScroll = useCallback((dir) => {
    if (autoRef.current) clearTimeout(autoRef.current);
    if (progressRef.current) cancelAnimationFrame(progressRef.current);
    setProgress(0);
    const track = trackRef.current;
    if (!track) return;
    const cardW = track.children[0]?.offsetWidth + 24 || 300;
    posRef.current += dir * cardW;
    const max = track.scrollWidth - cardW * 3;
    posRef.current = Math.max(-max, Math.min(0, posRef.current));
    track.style.transform = `translateX(${posRef.current}px)`;
    startProgress();
  }, []);

  const startProgress = useCallback(() => {
    const duration = 4000;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        progressRef.current = requestAnimationFrame(animate);
      } else {
        doScroll(-1);
      }
    };
    progressRef.current = requestAnimationFrame(animate);
  }, [doScroll]);

  useEffect(() => {
    if (!showCards) return;
    startProgress();
    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };
  }, [showCards, startProgress]);

  const scrollTo = useCallback((dir) => {
    if (progressRef.current) cancelAnimationFrame(progressRef.current);
    setProgress(0);
    doScroll(dir);
  }, [doScroll]);

  const trackItems = [...PLANS, ...PLANS, ...PLANS];

  // Theme-aware section/text — cards stay dark
  const sectionBg = isDark ? "bg-neutral-950" : "bg-white";
  const subtitleColor = isDark ? "text-white/50" : "text-black/45";
  const titleColor = isDark ? "text-white" : "text-black";
  const priceColor = "text-white/70";
  const planNameColor = "text-white";
  const arrowBorder = isDark ? "border-white/10" : "border-black/10";
  const arrowBg = isDark ? "bg-white/5" : "bg-black/5";
  const arrowIconColor = isDark ? "text-white/60" : "text-black/50";
  const arrowHoverBg = isDark ? "bg-white/10" : "bg-black/10";
  const arrowHoverBorder = isDark ? "hover:border-white/25" : "hover:border-black/25";

  return (
    <section ref={sectionRef} className={`relative px-6 py-20 sm:px-12 sm:py-24 md:px-16 md:py-28 lg:px-20 lg:py-32 border-y ${isDark ? "border-[#191919]" : "border-black/10"} ${sectionBg}`}>
      <div
        className="mx-auto max-w-7xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="mb-10 flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <p
            className={`max-w-[18ch] text-sm italic leading-relaxed ${subtitleColor}`}
            style={{ opacity: visible ? 1 : 0, transition: "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) 200ms" }}
          >
            — choose a plan that fits<br />your lifestyle.
          </p>
          <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl ${titleColor}`}>
            {TITLE_WORDS.map((word, i) => (
              <span
                key={word}
                className="mr-[0.3em] inline-block"
                style={{
                  opacity: i < visibleWords ? 1 : 0,
                  transform: i < visibleWords ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        <div className="overflow-hidden">
          <div ref={trackRef} className="flex w-max gap-6" style={{ willChange: "transform", transition: "transform 600ms cubic-bezier(0.25, 1, 0.5, 1)" }}>
            {trackItems.map((plan, i) => (
              <div
                key={`${plan.name}-${i}`}
                className="group relative h-64 w-56 shrink-0 overflow-hidden rounded-2xl sm:h-72 sm:w-64 md:w-72"
                style={{
                  opacity: showCards ? 1 : 0,
                  transform: showCards ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <img src={plan.img} alt={plan.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <div className="flex justify-end">
                    <a href="#order" className="rounded-full bg-black/60 px-5 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/80">
                      Order Now
                    </a>
                  </div>
                  <div>
                    <p className={`mb-1 text-xs font-semibold ${priceColor}`}>{plan.price}</p>
                    <h3 className={`text-lg font-semibold ${planNameColor}`}>{plan.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-4 sm:w-auto sm:justify-start">
            {[ArrowLeft, ArrowRight].map((Icon, i) => {
              const dir = i === 0 ? -1 : 1;
              return (
                <button
                  key={dir}
                  type="button"
                  onClick={() => scrollTo(dir)}
                  className={`group relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 ${arrowBorder} ${arrowBg} ${arrowHoverBorder}`}
                >
                  <span className={`absolute inset-0 scale-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-150 ${arrowHoverBg}`} />
                  <Icon size={18} strokeWidth={1.5} className={`relative z-10 transition-colors duration-300 ${isDark ? "group-hover:text-white" : "group-hover:text-black"} ${arrowIconColor}`} />
                </button>
              );
            })}
            <div className={`h-[2px] w-full overflow-hidden rounded-full sm:w-48 ${isDark ? "bg-white/10" : "bg-black/10"}`}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, oklch(0.72 0.19 55), oklch(0.65 0.22 40), oklch(0.70 0.18 60))",
                  transition: "width 50ms linear",
                }}
              />
            </div>
          </div>
          <a href="#consultation" className="subscribe-btn w-full rounded-full px-6 py-2 text-center text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg sm:w-auto">
            Book consultation
          </a>
        </div>
      </div>
    </section>
  );
}

export default BrandSection;
