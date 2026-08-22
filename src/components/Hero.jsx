import { useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";

const PHRASES = [
  "Eat Clean",
  "Live Well",
  "Stay Fresh",
  "Feel Great",
  "Nourish Daily",
];

const TYPING_SPEED = 100;
const DELETING_SPEED = 60;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

function Hero() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIdx];

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
            setPhraseIdx((prev) => (prev + 1) % PHRASES.length);
          }
        }
      },
      isDeleting ? DELETING_SPEED : TYPING_SPEED
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIdx]);

  const scrollToContent = useCallback(() => {
    const target = document.getElementById("meal-plans");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/realmeal/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Tag */}
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
          Real Meal
        </p>

        {/* Big bold heading */}
        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Your Daily
          <br />
          <span className="inline-block min-h-[1.15em] text-primary">
            {text}
            <span className="ml-0.5 inline-block h-[0.85em] w-[3px] animate-pulse bg-primary" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-md text-base font-light text-white/60 sm:text-lg">
          Chef-crafted meals delivered across the UAE.
          <br className="hidden sm:block" />
          Fresh, healthy, and ready when you are.
        </p>

        {/* CTA */}
        <a
          href="#meal-plans"
          className="mt-10 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
        >
          Explore Plans
        </a>
      </div>

      {/* Scroll down arrow */}
      <button
        type="button"
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50 transition-colors duration-300 hover:text-white"
        aria-label="Scroll down"
      >
        <ChevronDown
          size={28}
          strokeWidth={1.5}
          className="animate-bounce"
        />
      </button>
    </section>
  );
}

export default Hero;
