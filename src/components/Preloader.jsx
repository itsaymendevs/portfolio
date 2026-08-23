import { useEffect, useState } from "react";

export default function Preloader({ onDone }) {
  const [phase, setPhase] = useState("enter"); // enter | word | exit
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // staged word reveal
    const t1 = setTimeout(() => setPhase("word"), 200);
    // progress bar fills over ~1400ms
    const start = performance.now();
    const dur = 1400;
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      // easeOutCubic for premium feel
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t2 = setTimeout(() => setPhase("exit"), 1700);
    const t3 = setTimeout(() => onDone?.(), 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      cancelAnimationFrame(raf);
    };
  }, [onDone]);

  // lock scroll while visible
  useEffect(() => {
    if (phase !== "exit") {
      document.body.style.overflow = "hidden";
    } else {
      const t = setTimeout(() => (document.body.style.overflow = ""), 600);
      return () => clearTimeout(t);
    }
    return () => (document.body.style.overflow = "");
  }, [phase]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#090909] px-6"
      style={{
        opacity: phase === "exit" ? 0 : 1,
        transform: phase === "exit" ? "translateY(-22px) scale(0.99)" : "translateY(0) scale(1)",
        transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: phase === "exit" ? "none" : "auto",
      }}
      aria-hidden="true"
    >
      {/* subtle pattern — faint dots */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 78% 60% at 50% 35%, black 35%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 78% 60% at 50% 35%, black 35%, transparent 78%)",
        }}
      />

      {/* centered content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* logo — replaces plate */}
        <div className="relative mb-10 flex h-28 w-28 items-center justify-center">
          {/* outer thin ring */}
          <div className="absolute inset-0 rounded-full border border-white/[0.07]" />
          {/* spinning accent arc */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, rgba(255,255,255,0.55) 360deg)",
              mask: "radial-gradient(circle, transparent 54px, black 55px)",
              WebkitMask: "radial-gradient(circle, transparent 54px, black 55px)",
              animation: "spin 1.4s linear infinite",
            }}
          />
          {/* inner logo holder */}
          <div className="absolute inset-[10px] flex items-center justify-center overflow-hidden rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.06] p-3 shadow-[inset_0_1px_rgba(255,255,255,0.06),0_16px_40px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
            <img
              src="/realmeal/logo.avif"
              alt="Real Meal"
              className="relative h-full w-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] brightness-0 invert"
              style={{
                opacity: phase === "enter" ? 0 : 1,
                transform: phase === "enter" ? "scale(0.9)" : "scale(1)",
                transition: "opacity 600ms ease 200ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 200ms",
              }}
            />
          </div>
          {/* soft glow under */}
          <div className="absolute -bottom-3 left-1/2 h-3 w-20 -translate-x-1/2 rounded-full bg-white/[0.06] blur-[10px]" />
        </div>

        {/* wordmark — staggered reveal */}
        <h1 className="flex gap-[0.08em] text-[28px] font-bold tracking-tight text-white sm:text-[32px]">
          {["R", "e", "a", "l", "\u00A0", "M", "e", "a", "l"].map((ch, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                opacity: phase === "enter" ? 0 : 1,
                transform: phase === "enter" ? "translateY(14px)" : "translateY(0)",
                transition: `opacity 500ms cubic-bezier(0.16,1,0.3,1) ${120 + i * 55}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${120 + i * 55}ms`,
              }}
            >
              {ch}
            </span>
          ))}
        </h1>

        <p
          className="mt-2 text-[10px] font-medium uppercase tracking-[0.28em] text-white/35"
          style={{
            opacity: phase === "enter" ? 0 : 1,
            transform: phase === "enter" ? "translateY(8px)" : "translateY(0)",
            transition: "opacity 600ms ease 620ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 620ms",
          }}
        >
          Fresh · Crafted · Delivered
        </p>

        {/* progress line */}
        <div className="relative mt-10 h-px w-[220px] overflow-hidden rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, oklch(0.72 0.19 55), oklch(0.65 0.22 40), oklch(0.70 0.18 60))",
              boxShadow: "0 0 12px rgba(251,146,60,0.45)",
              transition: "width 80ms linear",
            }}
          />
        </div>
        <span className="mt-3 font-mono text-[10px] tracking-widest text-white/25">
          {String(Math.round(progress)).padStart(2, "0")}%
        </span>
      </div>

      {/* bottom tag — fades late */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        style={{
          opacity: phase === "word" || phase === "exit" ? 1 : 0,
          transition: "opacity 600ms ease 900ms",
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/20">UAE · Dubai & Abu Dhabi</p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
