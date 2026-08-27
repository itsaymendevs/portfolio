import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const REVIEWS = [
  {
    id: 1,
    text: "BeHealthy made eating clean effortless. Fresh meals daily, perfectly balanced, and the results speak for themselves. I've never felt better.",
    name: "Sarah Al Mansouri",
    job: "Fitness Coach",
    avatar: "/behealthy/images/reviewer-1.jpg",
    rating: 5,
    highlights: ["BeHealthy", "Fresh meals", "perfectly balanced"],
  },
  {
    id: 2,
    text: "The variety is incredible and every dish feels chef-crafted. I’ve stayed consistent for months without getting bored — that’s the real win.",
    name: "Omar Khaled",
    job: "Creative Director",
    avatar: "/behealthy/images/reviewer-2.jpg",
    rating: 5,
    highlights: ["chef-crafted", "consistent for months"],
  },
  {
    id: 3,
    text: "Delivery is always on time, food stays fresh, and the app makes customization so easy. Highly recommend to anyone serious about health.",
    name: "Layla Hassan",
    job: "Yoga Instructor",
    avatar: "/behealthy/images/reviewer-3.jpg",
    rating: 5,
    highlights: ["always on time", "food stays fresh", "customization so easy"],
  },
];

export default function CustomerReviewsSection() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
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
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const review = REVIEWS[index];

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#fcfcfa] px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        {/* Left — big inverted quotes + review */}
        <div className="relative w-full flex-1 lg:max-w-[58%]">
          {/* Big double quotes — inverted / top-left */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute -top-8 left-0 hidden select-none font-serif text-[148px] leading-none tracking-[-0.08em] text-black/[0.07] sm:block sm:text-[180px] lg:-top-12 lg:text-[220px]"
            aria-hidden="true"
          >
            “
          </motion.div>
          {/* Mobile quotes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute -top-2 left-0 select-none font-serif text-[96px] leading-none text-black/[0.07] sm:hidden"
            aria-hidden="true"
          >
            “
          </motion.div>

          <div className="relative pt-16 sm:pt-20 lg:pt-28">
            <motion.p
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[760px] font-serif text-[20px] font-medium leading-[1.4] tracking-[-0.015em] text-black sm:text-[23px] lg:text-[28px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {review.text}
            </motion.p>

            <div className="mt-8 flex items-end justify-between gap-4">
              {/* Left — next reviewer preview (rectangle slide + text aligned to image end) */}
              <motion.div
                key={`next-${review.id}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2"
              >
                {(() => {
                  const next = REVIEWS[(index + 1) % REVIEWS.length];
                  return (
                    <>
                      <div className="h-[56px] w-[88px] shrink-0 overflow-hidden rounded-[10px] bg-black/5 sm:h-[64px] sm:w-[104px] lg:h-[72px] lg:w-[120px]">
                        <img src={next.avatar} alt={next.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="w-[88px] text-left sm:w-[104px] lg:w-[120px]" style={{ fontFamily: "var(--font-sans)" }}>
                        <div className="truncate text-[12px] font-semibold leading-none tracking-[-0.01em] text-black sm:text-[13px]">
                          {next.name}
                        </div>
                        <div className="mt-1 truncate text-[10px] font-medium leading-none tracking-[0.03em] text-black/45 sm:text-[11px]">
                          {next.job}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>

              <motion.button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % REVIEWS.length)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="group flex shrink-0 items-center gap-3"
                aria-label="Next review"
              >
                <span className="h-px w-28 bg-black/15 transition-[width] duration-300 group-hover:w-36 sm:w-36 sm:group-hover:w-44" />
                <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] text-black transition hover:text-[#0f6437]">
                  Next Review →
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right — user image + name/job below */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={visible ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex shrink-0 flex-col items-center"
        >
          <div className="relative h-[300px] w-[240px] sm:h-[380px] sm:w-[300px] lg:h-[440px] lg:w-[340px]">
            {/* Decorative dashed frame — continuously moving */}
            <svg
              viewBox="0 0 340 440"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              aria-hidden="true"
            >
              <motion.rect
                x="1"
                y="1"
                width="338"
                height="438"
                rx="28"
                ry="28"
                fill="none"
                stroke="rgba(0,0,0,0.09)"
                strokeWidth="1.1"
                strokeDasharray="8 8"
                strokeLinecap="round"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -32 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              />
            </svg>
            <div className="absolute inset-[10px] overflow-hidden rounded-[22px] bg-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <motion.img
                key={review.avatar}
                initial={{ opacity: 0.85, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                src={review.avatar}
                alt={review.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Transparent blurred Verified badge — pushed more from bottom */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 6 }}
              animate={visible ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-4 left-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-[12px] sm:bottom-5 sm:left-4"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-[11px] font-bold text-black">✓</span>
              <span className="pr-1 text-[11px] font-semibold tracking-[0.02em] text-white">Verified Customer</span>
            </motion.div>
          </div>
          {/* Name (left) + Job (right, smaller) below image */}
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 flex w-full max-w-[340px] items-center justify-between gap-4 px-1"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span className="text-[13px] font-semibold tracking-[-0.01em] text-black">{review.name}</span>
            <span className="shrink-0 text-right text-[11px] font-medium tracking-[0.04em] text-black/45">{review.job}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
