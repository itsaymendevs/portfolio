import { motion } from "framer-motion";

const ITEMS = [
  "Healthiest Way of Living.",
  "Balanced Diet Plans",
  "Fresh Daily Meals",
  "Nourish & Thrive",
  "Mindful Nutrition",
];

export default function MarqueeSection() {
  const loop = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  const HIGHLIGHTED = new Set([
    "Healthiest Way of Living.",
    "Fresh Daily Meals",
  ]);

  return (
    <motion.section
      aria-label="Highlights marquee"
      className="relative overflow-hidden border-y border-black/5 bg-white py-3.5"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="flex w-max items-center gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 92, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        {/* duplicate set for seamless loop */}
        {[...loop, ...loop].map((text, idx) => {
          const isHighlighted = HIGHLIGHTED.has(text);
          return (
            <div key={idx} className="flex items-center gap-8">
              {isHighlighted ? (
                <span className="relative inline-block whitespace-nowrap px-0.5 text-[12px] font-semibold uppercase tracking-[0.16em] sm:text-[13px]">
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[0.12em] left-0 right-0 h-[0.38em] rounded-[2px] bg-[#FFF59D]"
                  />
                  <span className="relative text-[#111]">{text}</span>
                </span>
              ) : (
                <span className="whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.16em] text-[#111] sm:text-[13px]">
                  {text}
                </span>
              )}
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#111]/30"
              />
            </div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
