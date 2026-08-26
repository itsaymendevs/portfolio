import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TITLE_WORDS = ["Most", "Popular", "Dishes"];
const DESC_LINES = [
  "— Hearty balanced bowls and vibrant plant-powered plates",
  "our most-ordered dishes crafted with seasonal produce and chef-level flavor.",
];
const DESC_MOBILE =
  "— Hearty balanced bowls and vibrant plant-powered plates our most-ordered dishes crafted with seasonal produce and chef-level flavor.";

export default function MostPopularDishesSection() {
  const [titleWords, setTitleWords] = useState(0);
  const [descLines, setDescLines] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          TITLE_WORDS.forEach((_, i) =>
            setTimeout(() => setTitleWords(i + 1), 120 + i * 100),
          );
          const afterTitle = 120 + TITLE_WORDS.length * 100 + 180;
          DESC_LINES.forEach((_, i) =>
            setTimeout(() => setDescLines(i + 1), afterTitle + i * 220),
          );
          obs.disconnect();
        }
      },
      { threshold: 0.22 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[46vh] items-center justify-center overflow-hidden bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 lg:gap-8">
        {/* Row 1 */}
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="w-full max-w-[680px] lg:w-[48%]">
            <h2
              className="whitespace-normal text-[38px] font-bold leading-[0.95] tracking-[-0.03em] text-[#0A2E1F] sm:text-[46px] md:text-[52px] lg:whitespace-nowrap lg:text-[68px] xl:text-[78px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {TITLE_WORDS.map((w, i) => (
                <span
                  key={w}
                  className="mr-[0.22em] inline-block"
                  style={{
                    opacity: i < titleWords ? 1 : 0,
                    transform: i < titleWords ? "translateY(0)" : "translateY(14px)",
                    transition:
                      "opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  {w}
                </span>
              ))}
            </h2>
            <div className="mt-6 max-w-full pb-4 sm:mt-8 sm:max-w-[480px] sm:text-[17px] lg:mt-10 lg:max-w-[480px]" style={{ fontFamily: "var(--font-sans)" }}>
              {/* Mobile: together */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={descLines > 0 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[16px] leading-[1.7] tracking-[0.01em] text-[#0A2E1F]/60 italic sm:hidden"
              >
                {DESC_MOBILE}
              </motion.p>
              {/* Desktop: line by line */}
              <div className="hidden space-y-1 sm:block">
                {DESC_LINES.map((line, i) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, y: 8 }}
                    animate={i < descLines ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[16px] leading-[1.7] tracking-[0.01em] text-[#0A2E1F]/60 italic sm:text-[17px] lg:text-[17px]"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={descLines === DESC_LINES.length ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="mt-6 hidden items-center gap-4 lg:flex"
            >
              <div className="h-px flex-1 bg-[#0A2E1F]/10" />
              <a
                href="#"
                className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] text-[#0A2E1F] transition hover:text-[#0f6437]"
              >
                View Menu →
              </a>
            </motion.div>
          </div>

          {/* Right — two square images, vertically aligned with plates below */}
          <div className="flex w-full items-center justify-center lg:mt-[240px] lg:w-[56%] lg:justify-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-start gap-2 sm:gap-3 lg:gap-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-[170px] w-[170px] shrink-0 cursor-pointer overflow-hidden rounded-[18px] bg-transparent sm:h-[190px] sm:w-[190px] lg:h-[210px] lg:w-[210px]"
                style={{ transform: "translateY(-8px)" }}
              >
                <img
                  src="/behealthy/images/meal-1.png"
                  alt="Balanced Bowl"
                  className="h-full w-full object-cover transition duration-300 group-hover:brightness-[0.55]"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/0 p-3 transition duration-300 group-hover:bg-black/40">
                  <span className="translate-y-2 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Balanced Bowl
                  </span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-[170px] w-[170px] shrink-0 cursor-pointer overflow-hidden rounded-[18px] bg-transparent sm:h-[190px] sm:w-[190px] lg:h-[210px] lg:w-[210px]"
                style={{ transform: "translateY(8px)" }}
              >
                <img
                  src="/behealthy/images/meal-2.png"
                  alt="High Protein"
                  className="h-full w-full object-cover transition duration-300 group-hover:brightness-[0.55]"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/0 p-3 transition duration-300 group-hover:bg-black/40">
                  <span className="translate-y-2 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    High Protein
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Row 2 — more images, no title/desc, centered, closer to row above */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-3 lg:gap-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="group relative h-[170px] w-[170px] shrink-0 cursor-pointer overflow-hidden rounded-[18px] bg-transparent sm:h-[190px] sm:w-[190px] lg:h-[210px] lg:w-[210px]"
          >
                <img
                  src="/behealthy/images/meal-3.png"
                  alt="Plant Power"
              className="h-full w-full object-cover transition duration-300 group-hover:brightness-[0.55]"
            />
            <div className="absolute inset-0 grid place-items-center bg-black/0 p-3 transition duration-300 group-hover:bg-black/40">
              <span className="translate-y-2 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Plant Power
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="group relative h-[170px] w-[170px] shrink-0 cursor-pointer overflow-hidden rounded-[18px] bg-transparent sm:h-[190px] sm:w-[190px] lg:h-[210px] lg:w-[210px]"
          >
                <img
                  src="/behealthy/images/meal-4.png"
                  alt="Lean & Light"
              className="h-full w-full object-cover transition duration-300 group-hover:brightness-[0.55]"
            />
            <div className="absolute inset-0 grid place-items-center bg-black/0 p-3 transition duration-300 group-hover:bg-black/40">
              <span className="translate-y-2 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Lean & Light
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid h-[170px] w-[170px] shrink-0 place-items-center overflow-hidden rounded-full bg-white px-6 text-center sm:h-[190px] sm:w-[190px] lg:h-[210px] lg:w-[210px]"
          >
            <motion.svg
              viewBox="0 0 100 100"
              className="pointer-events-none absolute inset-0 h-full w-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="48.5"
                fill="none"
                stroke="#0f6437"
                strokeOpacity="0.32"
                strokeWidth="1.2"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
            </motion.svg>
            <span className="relative z-10 text-[13px] font-semibold uppercase leading-[1.4] tracking-[0.14em] text-[#0A2E1F]">
              Guaranteed
              <br />
              Freshness.
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
            className="group relative h-[170px] w-[170px] shrink-0 cursor-pointer overflow-hidden rounded-[18px] bg-transparent sm:h-[190px] sm:w-[190px] lg:h-[210px] lg:w-[210px]"
          >
                <img
                  src="/behealthy/images/meal-5.png"
                  alt="Protein Plus"
              className="h-full w-full object-cover transition duration-300 group-hover:brightness-[0.55]"
            />
            <div className="absolute inset-0 grid place-items-center bg-black/0 p-3 transition duration-300 group-hover:bg-black/40">
              <span className="translate-y-2 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Protein Plus
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden group relative h-[170px] w-[170px] shrink-0 cursor-pointer overflow-hidden rounded-[18px] bg-transparent sm:block sm:h-[190px] sm:w-[190px] lg:h-[210px] lg:w-[210px]"
          >
                <img
                  src="/behealthy/images/meal-6.png"
                  alt="Vegan Delight"
              className="h-full w-full object-cover transition duration-300 group-hover:brightness-[0.55]"
            />
            <div className="absolute inset-0 grid place-items-center bg-black/0 p-3 transition duration-300 group-hover:bg-black/40">
              <span className="translate-y-2 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Vegan Delight
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 1.75, ease: [0.16, 1, 0.3, 1] }}
            className="hidden group relative h-[170px] w-[170px] shrink-0 cursor-pointer overflow-hidden rounded-[18px] bg-transparent sm:block sm:h-[190px] sm:w-[190px] lg:h-[210px] lg:w-[210px]"
          >
                <img
                  src="/behealthy/images/meal-7.png"
                  alt="Fresh Bowl"
              className="h-full w-full object-cover transition duration-300 group-hover:brightness-[0.55]"
            />
            <div className="absolute inset-0 grid place-items-center bg-black/0 p-3 transition duration-300 group-hover:bg-black/40">
              <span className="translate-y-2 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Fresh Bowl
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Row 3 — another 4 meals + box at 5th position, boxes rounded — hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="hidden w-full flex-wrap items-center justify-center gap-2 sm:flex sm:gap-3 lg:gap-4"
        >
          <div
            className="hidden h-[170px] w-[170px] shrink-0 bg-transparent sm:h-[190px] sm:w-[190px] lg:block lg:h-[210px] lg:w-[210px]"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="group relative h-[170px] w-[170px] shrink-0 cursor-pointer overflow-hidden rounded-[18px] bg-transparent sm:h-[190px] sm:w-[190px] lg:h-[210px] lg:w-[210px]"
          >
                <img
                  src="/behealthy/images/meal-2.png"
                  alt="High Protein"
              className="h-full w-full object-cover transition duration-300 group-hover:brightness-[0.55]"
            />
            <div className="absolute inset-0 grid place-items-center bg-black/0 p-3 transition duration-300 group-hover:bg-black/40">
              <span className="translate-y-2 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                High Protein
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
            className="group relative h-[170px] w-[170px] shrink-0 cursor-pointer overflow-hidden rounded-[18px] bg-transparent sm:h-[190px] sm:w-[190px] lg:h-[210px] lg:w-[210px]"
          >
                <img
                  src="/behealthy/images/meal-3.png"
                  alt="Plant Power"
              className="h-full w-full object-cover transition duration-300 group-hover:brightness-[0.55]"
            />
            <div className="absolute inset-0 grid place-items-center bg-black/0 p-3 transition duration-300 group-hover:bg-black/40">
              <span className="translate-y-2 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Plant Power
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative h-[170px] w-[170px] shrink-0 cursor-pointer overflow-hidden rounded-[18px] bg-transparent sm:h-[190px] sm:w-[190px] lg:h-[210px] lg:w-[210px]"
          >
                <img
                  src="/behealthy/images/meal-4.png"
                  alt="Lean & Light"
              className="h-full w-full object-cover transition duration-300 group-hover:brightness-[0.55]"
            />
            <div className="absolute inset-0 grid place-items-center bg-black/0 p-3 transition duration-300 group-hover:bg-black/40">
              <span className="translate-y-2 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Lean & Light
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 1.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid h-[170px] w-[170px] shrink-0 place-items-center overflow-hidden rounded-full bg-white px-6 text-center sm:h-[190px] sm:w-[190px] lg:h-[210px] lg:w-[210px]"
          >
            <motion.svg
              viewBox="0 0 100 100"
              className="pointer-events-none absolute inset-0 h-full w-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="48.5"
                fill="none"
                stroke="#0f6437"
                strokeOpacity="0.32"
                strokeWidth="1.2"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
            </motion.svg>
            <span className="relative z-10 text-[13px] font-semibold uppercase leading-[1.4] tracking-[0.14em] text-[#0A2E1F]">
              Premium
              <br />
              Quality.
            </span>
          </motion.div>
          <div
            className="hidden h-[170px] w-[170px] shrink-0 bg-transparent sm:h-[190px] sm:w-[190px] lg:block lg:h-[210px] lg:w-[210px]"
            aria-hidden="true"
          />
        </motion.div>
        {/* Mobile: View Menu after images at the end */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex items-center gap-4 lg:hidden"
        >
          <div className="h-px flex-1 bg-[#0A2E1F]/10" />
          <a
            href="#"
            className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] text-[#0A2E1F] transition hover:text-[#0f6437]"
          >
            View Menu →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
