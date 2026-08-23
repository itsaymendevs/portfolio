import { useState, useEffect, useRef, useCallback } from "react";
import { Utensils, Truck, Heart, Clock } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const TITLE_WORDS = ["Transform", "How", "You", "Eat"];

const BODY_TEXT = `More than meals — a personalized journey to a healthier you. Fresh ingredients, expert craftsmanship, and delicious options that make eating well easy and sustainable.

Real convenience. Real joy. A healthier life with Real Meal.`;

const CARDS = [
  { icon: Utensils, title: "Fresh Ingredients", sub: "Nutrient-rich, locally sourced produce" },
  { icon: Truck, title: "Expert Chefs", sub: "Crafted by top industry culinary talent" },
  { icon: Heart, title: "Personalized", sub: "Customized to your health goals" },
  { icon: Clock, title: "Time Saving", sub: "Ready in minutes, no prep needed" },
];

function TiltCard({ card, isShown, isDark, index }) {
  const Icon = card.icon;
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -12, y: (x - 0.5) * 12 });
  }, []);

  const resetTilt = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const offsets = [
    { y: 0, x: 0, rotate: 0 },
    { y: 24, x: 40, rotate: 0 },
    { y: -12, x: 16, rotate: 0 },
    { y: 36, x: 56, rotate: 0 },
  ];
  const offset = offsets[index] || offsets[0];

  const cardBg = isDark ? "bg-white/[0.03]" : "bg-black/[0.04]";
  const cardBorder = isDark ? "border-white/[0.06]" : "border-black/[0.08]";
  const iconBg = isDark ? "bg-white/[0.06]" : "bg-black/[0.06]";
  const iconColor = isDark ? "text-white/70" : "text-black/60";

  return (
    <div className="w-full" style={{ perspective: "800px" }}>
      <div
        ref={cardRef}
        className={`group relative overflow-hidden rounded-2xl border p-3 sm:p-6 backdrop-blur-sm ${cardBg} ${cardBorder}`}
        style={{
          opacity: isShown ? 1 : 0,
          transform: isShown
            ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.05 : 1})`
            : "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(30px) scale(0.92)",
          transition: isHovered
            ? "transform 100ms ease-out, opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)"
            : "transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouse}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={resetTilt}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 48%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 52%, transparent 60%)"
              : "linear-gradient(105deg, transparent 40%, rgba(0,0,0,0.02) 48%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0.02) 52%, transparent 60%)",
            animation: "scanner-light 4s ease-in-out infinite",
          }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 48%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 52%, transparent 60%)"
                : "linear-gradient(105deg, transparent 40%, rgba(0,0,0,0.04) 48%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.04) 52%, transparent 60%)",
              animation: "scanner-light 2.5s ease-in-out infinite",
            }}
          />
        </div>
        <div className={`mb-4 flex size-10 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon size={20} strokeWidth={1.5} className={iconColor} />
        </div>
        <h3 className={`mb-1 text-sm font-semibold ${isDark ? "text-white" : "text-black"}`}>{card.title}</h3>
        <p className={`text-xs leading-relaxed ${isDark ? "text-white/40" : "text-black/45"}`}>{card.sub}</p>
      </div>
    </div>
  );
}

function MissionSection() {
  const [visibleWords, setVisibleWords] = useState(0);
  const [bodyVisible, setBodyVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState(0);
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          TITLE_WORDS.forEach((_, i) => {
            setTimeout(() => setVisibleWords(i + 1), 60 + i * 70);
          });
          const bodyDelay = 60 + TITLE_WORDS.length * 70 + 90;
          setTimeout(() => setBodyVisible(true), bodyDelay);
          CARDS.forEach((_, i) => {
            setTimeout(() => setVisibleCards((v) => v + 1), bodyDelay + 80 + i * 70);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const sectionBg = isDark ? "bg-neutral-950" : "bg-white";
  const titleColor = isDark ? "text-white" : "text-black";
  const lineColor = isDark ? "bg-white/10" : "bg-black/10";
  const bodyColor = isDark ? "text-white/50" : "text-black/50";

  return (
    <section ref={sectionRef} id="about" className={`relative overflow-hidden px-6 py-28 sm:px-12 md:px-16 md:py-36 lg:px-20 lg:py-44 ${sectionBg}`}>
      <span id="mission" className="absolute top-0" aria-hidden="true" />
      {/* fading line pattern — matches "Pick Your Meal Plan" */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "rgba(255,255,255,0.09)" : "rgba(120,65,15,0.14)"} 1px, transparent 0)`,
            backgroundSize: "28px 28px",
            maskImage: isDark
              ? "radial-gradient(ellipse 78% 65% at 50% 38%, black 28%, transparent 72%)"
              : "radial-gradient(ellipse 82% 68% at 50% 38%, black 42%, transparent 76%)",
            WebkitMaskImage: isDark
              ? "radial-gradient(ellipse 78% 65% at 50% 38%, black 28%, transparent 72%)"
              : "radial-gradient(ellipse 82% 68% at 50% 38%, black 42%, transparent 76%)",
          }}
        />
        {isDark && (
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
              backgroundSize: "96px 96px",
              maskImage: "radial-gradient(ellipse 85% 70% at 50% 40%, black 20%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 85% 70% at 50% 40%, black 20%, transparent 75%)",
            }}
          />
        )}

      </div>
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="max-w-xl">
          <h2 className={`text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight ${titleColor}`}>
            {TITLE_WORDS.map((word, i) => (
              <span
                key={word}
                className="mr-[0.3em] inline-block"
                style={{
                  opacity: i < visibleWords ? 1 : 0,
                  transform: i < visibleWords ? "translateY(0)" : "translateY(28px)",
                  transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {word}
              </span>
            ))}
          </h2>
          <div
            className={`my-8 h-[1.5px] ${lineColor}`}
            style={{
              width: bodyVisible ? "80px" : "0px",
              transition: "width 800ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <div
            className={`space-y-4 text-xs leading-relaxed sm:text-sm ${bodyColor}`}
            style={{
              opacity: bodyVisible ? 1 : 0,
              transform: bodyVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 100ms",
            }}
          >
            {BODY_TEXT.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {CARDS.map((card, i) => (
            <div key={card.title} className="w-full">
              <TiltCard card={card} isShown={i < visibleCards} isDark={isDark} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MissionSection;
