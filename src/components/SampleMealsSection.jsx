import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const FAQS = [
  { q: "How does the meal plan work?", a: "Choose a plan that fits your goals, pick your meals each week, and we deliver them fresh to your door. You can pause, skip, or cancel anytime." },
  { q: "Are the meals customizable?", a: "Yes, you can swap meals, exclude allergens, and adjust portion sizes based on your preferences." },
  { q: "Where do you deliver?", a: "We deliver across the entire UAE. Same-day delivery is available in Dubai and Abu Dhabi." },
  { q: "How fresh are the meals?", a: "Every meal is prepared fresh on the day of delivery. We never freeze or pre-pack meals in advance." },
  { q: "Can I order catering for events?", a: "Absolutely. We offer custom catering packages for corporate events, weddings, and private gatherings." },
];

const MEALS = [
  { img: "/realmeal/meal-1.avif", alt: "Grilled chicken with vegetables", name: "Grilled Chicken", cuisine: "American" },
  { img: "/realmeal/meal-2.avif", alt: "Salmon with fresh salad", name: "Fresh Salmon", cuisine: "Japanese" },
  { img: "/realmeal/meal-4.avif", alt: "Pasta with gourmet sauce", name: "Gourmet Pasta", cuisine: "Italian" },
  { img: "/realmeal/meal-5.avif", alt: "Steak with roasted potatoes", name: "Premium Steak", cuisine: "Brazilian" },
  { img: "/realmeal/meal-6.avif", alt: "Fresh bowl with greens", name: "Green Bowl", cuisine: "Vegan" },
  { img: "/realmeal/meal-1.avif", alt: "Chicken teriyaki bowl", name: "Teriyaki Bowl", cuisine: "Japanese" },
  { img: "/realmeal/meal-2.avif", alt: "Mediterranean platter", name: "Med Platter", cuisine: "Greek" },
  { img: "/realmeal/meal-4.avif", alt: "Grilled vegetables", name: "Grilled Veggies", cuisine: "Lebanese" },
];

const CARD_CLIP = "polygon(50px 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%, 0 50px)";

function WordByWord({ text, visible }) {
  const words = text.split(" ");
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setCount(i);
      if (i >= words.length) clearInterval(interval);
    }, 300);
    return () => clearInterval(interval);
  }, [visible, text]);
  return (
    <span>
      {words.map((word, j) => (
        <span key={j} className="mr-2 inline-block transition-opacity duration-500" style={{ opacity: j < count ? 1 : 0 }}>
          {word}{" "}
        </span>
      ))}
    </span>
  );
}

function Card({ meal, offset, index }) {
  return (
    <div
      className="card-appear group relative shrink-0 overflow-hidden rounded-3xl backdrop-blur-xl"
      style={{
        width: "calc(25% - 18px)",
        height: "360px",
        marginTop: offset ? "60px" : "0",
        backgroundColor: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex h-full w-full items-center justify-center transition-transform duration-400 group-hover:-rotate-x-3" style={{ clipPath: CARD_CLIP, perspective: "600px" }}>
        <img src={meal.img} alt={meal.alt} className="h-[260px] w-[260px] object-contain blur-[0.5px]" />
      </div>
      <div className="absolute bottom-4 left-4">
        <span className="text-xs font-medium text-white/70">{meal.name}</span>
      </div>
      <div
        className="cuisine-pill absolute top-4 right-4 flex items-center justify-center rounded-full px-5 py-3 backdrop-blur-sm"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed", backgroundColor: "rgba(255,255,255,0.08)" }}
      >
        <span className="text-[10px] font-medium uppercase tracking-wider text-white/70">{meal.cuisine}</span>
      </div>
    </div>
  );
}

export default function SampleMealsSection() {
  const [visible, setVisible] = useState(false);
  const [visibleWords, setVisibleWords] = useState(0);
  const [whatWeDoVisible, setWhatWeDoVisible] = useState(false);
  const [headlineWords, setHeadlineWords] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [videoVisible, setVideoVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [subscribeTitle, setSubscribeTitle] = useState(0);
  const [subscribeContent, setSubscribeContent] = useState(false);
  const [subscribeCardVisible, setSubscribeCardVisible] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const sectionRef = useRef(null);
  const bottomSectionRef = useRef(null);
  const subscribeRef = useRef(null);
  const videoRef = useRef(null);
  const desktopTrackRef = useRef(null);
  const mobileTrackRef = useRef(null);
  const progressRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const VISIBLE = 4;
  const TOTAL_SLIDES = Math.ceil(MEALS.length / VISIBLE);
  const DURATION = 4000;
  const HEADLINE_WORDS = ["At", "RealMeal,", "we", "don't", "do", "ordinary,"];
  const HEADLINE_LINE2 = "Every plate starts from scratch and hits with flavor";
  const CAPTION_TEXT = "— We craft every meal from scratch.\nFresh ingredients, bold flavors, delivered to you.";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          const cards = el.querySelectorAll(".card-appear");
          cards.forEach((card, i) => { setTimeout(() => card.classList.add("visible"), i * 120); });
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = bottomSectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          HEADLINE_WORDS.forEach((_, i) => { setTimeout(() => setHeadlineWords(i + 1), i * 120); });
          setTimeout(() => setHeadlineWords(HEADLINE_WORDS.length + 1), HEADLINE_WORDS.length * 120 + 200);
          setTimeout(() => setWhatWeDoVisible(true), 300);
          setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
              i++;
              setTypedText(CAPTION_TEXT.slice(0, i));
              if (i >= CAPTION_TEXT.length) clearInterval(interval);
            }, 30);
          }, 500);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVideoVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = subscribeRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSubscribeCardVisible(true);
          const words = ["Be", "Part", "of", "Real", "Meal", "That", "Feels", "Like", "Home"];
          setTimeout(() => {
            words.forEach((_, i) => { setTimeout(() => setSubscribeTitle(i + 1), i * 150); });
            setTimeout(() => setSubscribeContent(true), words.length * 150 + 300);
          }, 600);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const doSlide = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const track = isMobile ? mobileTrackRef.current : desktopTrackRef.current;
    if (!track) return;
    const next = (slideIndex + 1) % TOTAL_SLIDES;
    setSlideIndex(next);
    track.style.transform = `translateX(-${next * 100}%)`;
    setProgress(0);
  }, [slideIndex, TOTAL_SLIDES]);

  useEffect(() => {
    if (!visible) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / DURATION, 1);
      setProgress(pct);
      if (pct < 1) {
        progressRef.current = requestAnimationFrame(tick);
      } else {
        doSlide();
      }
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => { if (progressRef.current) cancelAnimationFrame(progressRef.current); };
  }, [visible, slideIndex, doSlide]);

  const fadeStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(32px)",
    transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1) 300ms, transform 900ms cubic-bezier(0.16,1,0.3,1) 300ms",
  };

  // Sample meals: theme-aware
  const sampleSectionBg = isDark ? "bg-[#0c0c0c]" : "bg-[#0c0c0c]";
  // Bottom headline + FAQ: theme-aware
  const bottomBg = isDark ? "bg-[#0e0e0e]" : "bg-[#f5f5f5]";

  const sampleTitleColor = isDark ? "text-white" : "text-white";
  const subtitleColor = isDark ? "text-white/50" : "text-white/50";
  const headlineColor = isDark ? "text-white" : "text-black";
  const whatWeDoColor = isDark ? "text-emerald-400" : "text-emerald-600";
  const captionColor = isDark ? "text-white/50" : "text-black/50";
  const dividerColor = isDark ? "border-white/10" : "border-black/10";
  const faqNumColor = (active) => isDark
    ? (active ? "#e87c3a" : "rgba(255,255,255,0.3)")
    : (active ? "#e87c3a" : "rgba(0,0,0,0.2)");
  const faqTitleColor = isDark ? "text-white" : "text-black";
  const faqChevronColor = (active) => isDark
    ? (active ? "#e87c3a" : "rgba(255,255,255,0.4)")
    : (active ? "#e87c3a" : "rgba(0,0,0,0.3)");
  const faqAnswerColor = isDark ? "text-white/50" : "text-black/55";
  const faqBorderColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)";
  const nextColor = isDark ? "text-white/60" : "text-black/50";
  const progressBar = isDark ? "bg-white/20" : "bg-black/10";
  const progressFill = isDark ? "bg-white/70" : "bg-black/60";
  const emailBg = isDark ? "bg-white/10" : "bg-black/5";
  const emailBorder = isDark ? "border-white/20" : "border-black/15";
  const emailTextColor = isDark ? "text-white" : "text-black";
  const emailPlaceholder = isDark ? "placeholder-white/40" : "placeholder-black/35";
  const descColor = isDark ? "text-white/70" : "text-black/65";

  return (
    <>
    {/* Sample Meals Grid — always dark */}
    <section
      ref={sectionRef}
      className={`relative overflow-hidden px-6 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 lg:px-20 lg:py-24 ${sampleSectionBg}`}
    >
      {/* distinct pattern — no edge colors */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* diagonal hatch — 45° */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 32px)",
            maskImage: "radial-gradient(ellipse 74% 62% at 50% 45%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 74% 62% at 50% 45%, black 30%, transparent 75%)",
          }}
        />
        {/* counter diagonal — subtle */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 32px)",
            maskImage: "radial-gradient(ellipse 74% 62% at 50% 45%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 74% 62% at 50% 45%, black 30%, transparent 75%)",
          }}
        />
        {/* fine dots — different scale */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse 70% 58% at 50% 42%, black 28%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 58% at 50% 42%, black 28%, transparent 72%)",
          }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="hidden md:block" style={fadeStyle}>
          <div className="mb-8 flex items-center justify-between">
            <h3 className={`text-5xl font-bold ${sampleTitleColor}`}>Sample Meals.</h3>
            <p className={`max-w-md text-right text-base italic leading-relaxed ${subtitleColor}`}>
              <WordByWord text={"— Crafted with care, delivered fresh to you."} visible={visible} />
            </p>
          </div>
          <div className="relative z-10 overflow-hidden">
            <div ref={desktopTrackRef} className="flex" style={{ transition: "transform 800ms cubic-bezier(0.25, 1, 0.5, 1)" }}>
              {Array.from({ length: TOTAL_SLIDES }).map((_, s) => (
                <div key={s} className="flex w-full shrink-0 gap-6">
                  {MEALS.slice(s * VISIBLE, s * VISIBLE + VISIBLE).map((meal, i) => (
                    <Card key={i} meal={meal} offset={i % 2 === 1} index={i} />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <button onClick={doSlide} className={`flex items-center gap-4 text-sm font-medium transition-colors ${nextColor} hover:text-white`}>
              <span>next</span>
              <div className={`relative h-px w-80 ${progressBar}`}>
                <div className={`absolute inset-y-0 left-0 ${progressFill}`} style={{ width: `${progress * 100}%`, transition: "width 50ms linear" }} />
              </div>
            </button>
          </div>
        </div>

        <div className="md:hidden" style={fadeStyle}>
          <div className="mb-6">
            <h3 className={`text-3xl font-bold ${sampleTitleColor}`}>Sample Meals.</h3>
            <p className={`mt-2 text-sm italic leading-relaxed ${subtitleColor}`}>
              <WordByWord text={"— Crafted with care, delivered fresh to you."} visible={visible} />
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {MEALS.slice(0, 4).map((meal, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl backdrop-blur-xl"
                style={{
                  width: "calc(50% - 8px)",
                  height: "280px",
                  marginTop: i % 2 === 1 ? "40px" : "0",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div className="flex h-full w-full items-center justify-center" style={{ clipPath: "polygon(35px 0, 100% 0, 100% calc(100% - 35px), calc(100% - 35px) 100%, 0 100%, 0 35px)" }}>
                  <img src={meal.img} alt={meal.alt} className="h-[200px] w-[200px] object-contain" />
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-medium text-white/70">{meal.name}</span>
                </div>
                <div
                  className="cuisine-pill absolute top-3 right-3 flex items-center justify-center rounded-full px-4 py-2 backdrop-blur-sm"
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed", backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <span className="text-[9px] font-medium uppercase tracking-wider text-white/70">{meal.cuisine}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a href="#meals" className={`flex items-center gap-4 text-sm font-medium transition-colors ${nextColor} ${isDark ? "hover:text-white" : "hover:text-black"}`}>
              <span>view all</span>
              <div className={`h-px w-60 ${progressBar}`} />
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Bottom Headline + FAQ + Video */}
    <section ref={bottomSectionRef} className={`relative overflow-hidden px-6 pb-20 pt-12 sm:pb-24 sm:pt-16 md:pb-28 md:pt-20 lg:pb-32 lg:pt-24 ${bottomBg}`}>
      {/* distinct pattern — large grid + sparse plus */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${isDark ? "rgba(255,255,255,0.022)" : "rgba(0,0,0,0.028)"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "rgba(255,255,255,0.022)" : "rgba(0,0,0,0.028)"} 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 74% 60% at 50% 46%, black 24%, transparent 76%)",
            WebkitMaskImage: "radial-gradient(ellipse 74% 60% at 50% 46%, black 24%, transparent 76%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "rgba(255,255,255,0.028)" : "rgba(0,0,0,0.03)"} 1.3px, transparent 0)`,
            backgroundSize: "48px 48px",
            backgroundPosition: "24px 24px",
            maskImage: "radial-gradient(ellipse 68% 56% at 50% 52%, black 18%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 68% 56% at 50% 52%, black 18%, transparent 70%)",
          }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className={`w-full text-xl font-bold leading-tight tracking-tight sm:text-2xl md:w-auto md:max-w-[50%] md:text-3xl lg:text-4xl ${headlineColor}`}>
            {HEADLINE_WORDS.map((word, i) => (
              <span
                key={i}
                className="mr-[0.3em] inline-block"
                style={{
                  opacity: i < headlineWords ? 1 : 0,
                  transform: i < headlineWords ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {word}
              </span>
            ))}
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(to right, #ffffff, #666666, #ffffff)"
                  : "linear-gradient(to right, #222222, #888888, #222222)",
                opacity: headlineWords > HEADLINE_WORDS.length ? 1 : 0,
                transform: headlineWords > HEADLINE_WORDS.length ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                display: "inline-block",
              }}
            >
              {HEADLINE_LINE2}
            </span>
          </h2>
          <div className="shrink-0">
            <p
              className={`hidden text-sm font-semibold uppercase tracking-[0.3em] md:block ${whatWeDoColor}`}
              style={{
                opacity: whatWeDoVisible ? 1 : 0,
                transform: whatWeDoVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              What We Do
            </p>
            <div className="mt-4 max-w-xs">
              <p className={`text-sm italic leading-relaxed ${captionColor}`} style={{ whiteSpace: "pre-line" }}>
                {typedText}
                <span className={`inline-block w-px animate-pulse ${isDark ? "bg-white/50" : "bg-black/40"}`} style={{ height: "1em", verticalAlign: "text-bottom" }} />
              </p>
            </div>
          </div>
        </div>
        <hr className={`my-12 ${dividerColor}`} />
        <div
          ref={videoRef}
          className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-24"
          style={{
            opacity: videoVisible ? 1 : 0,
            transform: videoVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="flex-1">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`flex w-full items-center gap-5 py-7 text-left transition-colors ${isDark ? "hover:text-white/80" : "hover:text-black/70"}`}
                  style={{ borderBottom: openFaq === i ? "1px solid transparent" : `1px solid ${faqBorderColor}` }}
                >
                  <span className="shrink-0 text-lg font-bold transition-colors duration-300" style={{ color: faqNumColor(openFaq === i) }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`flex-1 pl-6 text-base font-semibold capitalize ${faqTitleColor}`}>{faq.q}</span>
                </button>
                <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: openFaq === i ? "200px" : "0px", opacity: openFaq === i ? 1 : 0 }}>
                  <p className={`pb-6 pt-4 pl-[52px] pr-8 text-sm leading-relaxed ${faqAnswerColor}`}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-neutral-900 sm:h-[500px] md:h-[600px] md:w-[380px]">
            {!videoLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-900">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-white/70" />
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">Loading</span>
              </div>
            )}
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={() => setVideoLoaded(true)}
              onCanPlay={() => setVideoLoaded(true)}
              className={`h-full w-full object-cover transition-opacity duration-700 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
            >
              <source src="/realmeal/faqs.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>

    {/* Subscribe — theme-aware */}
    <section
      ref={subscribeRef}
      className="relative overflow-hidden px-6 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 lg:px-20 lg:py-24"
      style={{
        backgroundImage: "url('/realmeal/subscribe.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative z-10 mx-auto max-w-7xl text-center"
        style={{
          opacity: subscribeCardVisible ? 1 : 0,
          transform: subscribeCardVisible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {["Be", "Part", "of", "Real", "Meal"].map((word, i) => (
              <span key={i} className="mr-[0.3em] inline-block" style={{ opacity: i < subscribeTitle ? 1 : 0, transform: i < subscribeTitle ? "translateY(0)" : "translateY(20px)", transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)" }}>
                {word}
              </span>
            ))}
            <br />
            {["That", "Feels", "Like", "Home"].map((word, i) => (
              <span key={i} className="mr-[0.3em] inline-block" style={{ opacity: i + 5 < subscribeTitle ? 1 : 0, transform: i + 5 < subscribeTitle ? "translateY(0)" : "translateY(20px)", transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)" }}>
                {word}
              </span>
            ))}
          </h2>
          <div style={{ opacity: subscribeContent ? 1 : 0, transform: subscribeContent ? "translateY(0)" : "translateY(20px)", transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
              Subscribe to get the latest offers, new products, and exclusive discounts — delivered straight to your inbox.
            </p>
            <div className="mx-auto mt-8 flex max-w-md items-center overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-xs text-white outline-none placeholder-white/40 sm:px-6 sm:text-sm"
              />
              <button className="subscribe-btn shrink-0 px-4 py-3 text-xs font-semibold text-white transition-all duration-300 sm:px-6 sm:text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
    </section>
    </>
  );
}
