import { useState, useEffect, useRef } from "react";
import { ListOrdered, ChefHat, Truck } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const STEPS = [
  { num: "01", title: "Choose Your Plan", desc: "Browse our curated meal plans and pick the one that fits your lifestyle, goals, and taste preferences.", icon: ListOrdered },
  { num: "02", title: "We Prepare Fresh", desc: "Our expert chefs craft your meals daily using locally sourced, nutrient-rich ingredients.", icon: ChefHat },
  { num: "03", title: "Delivered to You", desc: "Freshly prepared meals arrive at your door, ready to enjoy in minutes with zero cleanup.", icon: Truck },
];

function StepsSection() {
  const [visibleWords, setVisibleWords] = useState(0);
  const [showCards, setShowCards] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ["How", "to", "Order"].forEach((_, i) => {
            setTimeout(() => setVisibleWords(i + 1), 300 + i * 300);
          });
          setTimeout(() => setShowCards(true), 1400);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!showCards) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % STEPS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [showCards]);

  // Section bg: dark or sage green in light
  const sectionBg = isDark ? "bg-[#0c0c0c]" : "bg-[#f0f2f4]";
  const bgTextColor = isDark ? "text-white/[0.03]" : "text-black/[0.04]";
  const cardActiveBg = isDark ? "bg-gradient-to-br from-[oklch(0.72_0.19_55/0.15)] to-[oklch(0.65_0.22_40/0.10)] border-[oklch(0.70_0.18_60/0.25)]" : "bg-gradient-to-br from-[oklch(0.508_0.118_165.612/0.12)] to-[oklch(0.508_0.118_165.612/0.06)] border-[oklch(0.508_0.118_165.612/0.2)]";
  const cardInactiveBg = isDark ? "bg-white/[0.03] border-white/[0.06]" : "bg-white/60 border-black/[0.06]";
  const numActiveColor = isDark ? "text-[oklch(0.72_0.19_55/0.5)]" : "text-[oklch(0.508_0.118_165.612/0.35)]";
  const numInactiveColor = isDark ? "text-white/15" : "text-black/8";
  const iconActiveColor = isDark ? "text-[oklch(0.72_0.19_55/0.8)]" : "text-[oklch(0.508_0.118_165.612/0.8)]";
  const iconInactiveColor = isDark ? "text-white/20" : "text-black/15";
  const titleActiveColor = isDark ? "text-white" : "text-black";
  const titleInactiveColor = isDark ? "text-white/80" : "text-black/65";
  const lineActiveColor = isDark ? "bg-[oklch(0.72_0.19_55/0.3)]" : "bg-[oklch(0.508_0.118_165.612/0.25)]";
  const lineInactiveColor = isDark ? "bg-white/10" : "bg-black/8";
  const descActiveColor = isDark ? "text-white/70" : "text-black/55";
  const descInactiveColor = isDark ? "text-white/40" : "text-black/35";

   return (
    <section ref={sectionRef} className={`relative overflow-hidden ${sectionBg}`}>
      {/* dots only */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "rgba(255,255,255,0.07)" : "rgba(120,65,15,0.11)"} 1.2px, transparent 0)`,
            backgroundSize: "36px 36px",
            backgroundPosition: "18px 18px",
            maskImage: "radial-gradient(ellipse 72% 60% at 50% 45%, black 34%, transparent 76%)",
            WebkitMaskImage: "radial-gradient(ellipse 72% 60% at 50% 45%, black 34%, transparent 76%)",
          }}
        />
      </div>
      <div className="relative px-6 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 lg:px-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className={`whitespace-nowrap text-[8vw] font-bold uppercase tracking-tight select-none sm:text-[6vw] md:text-[5vw] lg:text-[4vw] ${bgTextColor}`}>
            {["How", "to", "Order"].map((word, i) => (
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
          </span>
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => {
            const isActive = i === activeIdx;
            return (
              <div
                key={step.num}
                className={`rounded-2xl border p-8 backdrop-blur-sm transition-all duration-500 ${isActive ? cardActiveBg : cardInactiveBg}`}
                style={{
                  opacity: showCards ? 1 : 0,
                  transform: showCards ? "translateY(0)" : "translateY(24px)",
                  transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1), background-color 400ms ease, border-color 400ms ease",
                }}
              >
                <div className="mb-4 flex items-start justify-between">
                  <span className={`text-4xl font-bold tracking-tight transition-colors duration-400 ${isActive ? numActiveColor : numInactiveColor}`}>
                    {step.num}
                  </span>
                  <step.icon size={22} strokeWidth={1.5} className={`mt-1 transition-colors duration-400 ${isActive ? iconActiveColor : iconInactiveColor}`} />
                </div>
                <h3 className={`mb-4 text-lg font-semibold transition-colors duration-400 ${isActive ? titleActiveColor : titleInactiveColor}`}>
                  {step.title}
                </h3>
                <div className={`mb-4 h-[1px] w-full transition-colors duration-400 ${isActive ? lineActiveColor : lineInactiveColor}`} />
                <p className={`text-sm leading-relaxed transition-colors duration-400 ${isActive ? descActiveColor : descInactiveColor}`}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center lg:pointer-events-none lg:absolute lg:inset-y-0 lg:right-0 lg:z-20 lg:mt-0 lg:items-center">
          <a
            href="#subscribe"
            className="subscribe-btn rounded-full px-12 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg lg:pointer-events-auto lg:rounded-r-none lg:px-4 lg:py-8"
          >
            <span className="block lg:hidden">Subscribe</span>
            <span className="hidden lg:block" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>Subscribe</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default StepsSection;
