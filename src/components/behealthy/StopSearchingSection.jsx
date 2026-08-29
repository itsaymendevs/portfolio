import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TITLE_WORDS = ["Stop", "Searching.", "Start", "Consulting"];

export default function StopSearchingSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden border-y border-black/[0.06] bg-white"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-start gap-4 px-6 py-4 sm:px-10 sm:py-5 lg:px-16 lg:py-5">
        {/* Title — even smaller, far left, regular, only Consulting bold */}
        <h2
          className="w-full whitespace-nowrap text-left text-[12px] font-normal leading-[1] tracking-[-0.02em] text-black sm:text-[14px] lg:text-[16px] xl:text-[18px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {TITLE_WORDS.map((w, i) => {
            const isHighlight = w === "Consulting";
            return (
              <span
                key={w}
                className="mr-[0.22em] inline-block"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(14px)",
                  transition: `opacity 500ms ease ${0.25 + i * 0.08}s, transform 500ms cubic-bezier(0.16,1,0.3,1) ${0.25 + i * 0.08}s`,
                }}
              >
                {isHighlight ? (
                  <span className="relative inline-block px-0.5">
                    <span className="absolute bottom-[0.12em] left-0 right-0 h-[0.38em] rounded-[2px] bg-[#FFF59D]" aria-hidden="true" />
                    <span className="relative font-bold italic text-black">{w}</span>
                  </span>
                ) : (
                  w
                )}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
