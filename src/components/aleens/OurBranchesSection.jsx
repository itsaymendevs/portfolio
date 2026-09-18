import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TITLE_WORDS = ["Don’t", "Miss", "Out", "Today"];
const BRANCH_SETS = [
  ["/aleens/images/branch-1.jpg", "/aleens/images/branch-2.jpg", "/aleens/images/branch-3.jpg", "/aleens/images/branch-4.jpg"],
  ["/aleens/images/branch-3.jpg", "/aleens/images/branch-4.jpg", "/aleens/images/branch-5.jpg", "/aleens/images/branch-1.jpg"],
  ["/aleens/images/branch-2.jpg", "/aleens/images/branch-5.jpg", "/aleens/images/branch-1.jpg", "/aleens/images/branch-3.jpg"],
];
const CAPTIONS = [
  { main: "Daily Fresh", sub: "Prepared every morning" },
  { main: "Chef Crafted", sub: "Made with love" },
  { main: "Fully Healthy", sub: "Good for your body" },
];

function FeedImage({ src, alt }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.img
          key={src}
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>
    </div>
  );
}

export default function OurBranchesSection() {
  const [visible, setVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(0);
  const [branchIndex, setBranchIndex] = useState(0);
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
      { threshold: 0.22 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const afterTitle = 900;
    [0, 1, 2].forEach((idx) =>
      setTimeout(() => setCardsVisible((v) => v + 1), afterTitle + idx * 140)
    );
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(
      () => setBranchIndex((i) => (i + 1) % BRANCH_SETS.length),
      4200
    );
    return () => clearInterval(id);
  }, [visible]);

  const currentSet = BRANCH_SETS[branchIndex % BRANCH_SETS.length];

  return (
    <section
      ref={ref}
      id="branches"
      className="relative w-full overflow-hidden bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      {/* Subtle dotted pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,166,81,0.32) 1.6px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.18) 1.4px, transparent 0)",
          backgroundSize: "24px 24px",
          backgroundPosition: "14px 14px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        {/* Left — title + description near title, Learn more, Next branch aligned with middle photo end */}
        <div className="flex w-full flex-col justify-between lg:w-[30%] lg:self-stretch lg:py-2">
          <div className="space-y-6 sm:space-y-8">
          <h2
            className="whitespace-nowrap text-left text-[32px] font-bold leading-[0.95] tracking-[-0.03em] text-black sm:text-[40px] lg:whitespace-normal lg:text-[56px] xl:text-[64px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {TITLE_WORDS.map((w, i) => (
              <span
                key={w}
                className={`mr-[0.22em] inline-block ${w === "Don’t" ? "hidden lg:inline-block" : ""}`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(14px)",
                  transition: `opacity 500ms ease ${0.15 + i * 0.08}s, transform 500ms cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.08}s`,
                }}
              >
                {w}
              </span>
            ))}
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[420px] space-y-3 text-left"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <p className="text-[15px] italic leading-[1.7] tracking-[0.01em] text-black/60 sm:text-[16px] [text-wrap:pretty]">
                — Follow us on Instagram @aleens.ae for fresh dishes, behind-the-scenes and daily updates from our kitchens.
              </p>
              <p className="text-[15px] italic leading-[1.7] tracking-[0.01em] text-black/60 sm:text-[16px] [text-wrap:pretty]">
                Don’t miss our exclusive offers — new deals, seasonal specials and more drop every week. Keep following to stay in the loop!
              </p>
            </motion.div>
            <motion.a
              href="#branches"
              initial={{ opacity: 0, y: 8 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block self-start text-[13px] font-medium normal-case tracking-[-0.01em] text-black"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <span className="relative inline-block px-0.5">
                <span className="absolute bottom-[0.12em] left-0 right-0 h-[0.38em] rounded-[2px] bg-[#f7941d]/45" aria-hidden="true" />
                <span className="relative italic">Learn more about our offers →</span>
              </span>
            </motion.a>
          </div>
        </div>

        {/* Middle — single image — aligned center/end with right */}
        <motion.div
              layout
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={cardsVisible > 0 ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="hidden h-[340px] w-full overflow-hidden rounded-[20px] bg-black/5 lg:flex lg:flex-1 lg:self-end xl:h-[380px]"
        >
          <FeedImage src={currentSet[0]} alt="Feed 1" />
        </motion.div>
        <motion.div
              layout
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={cardsVisible > 0 ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="h-[200px] w-full overflow-hidden rounded-[20px] bg-black/5 sm:h-[220px] lg:hidden"
        >
          <FeedImage src={currentSet[0]} alt="Feed 1" />
        </motion.div>

        {/* Right — 2x2 grid: 3 images + 1 empty dashed box — ends at same line as middle */}
        <div className="grid flex-1 grid-cols-2 gap-3 sm:gap-4 lg:w-[32%] lg:flex-none lg:self-end">
          <motion.div
                layout
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={cardsVisible > 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="h-[120px] overflow-hidden rounded-[16px] bg-black/5 sm:h-[140px] lg:h-[160px] xl:h-[180px]"
          >
            <FeedImage src={currentSet[1]} alt="Feed 2" />
          </motion.div>
          <motion.div
                layout
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={cardsVisible > 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="h-[120px] overflow-hidden rounded-[16px] bg-black/5 sm:h-[140px] lg:h-[160px] xl:h-[180px]"
          >
            <FeedImage src={currentSet[2]} alt="Feed 3" />
          </motion.div>
          <motion.div
                layout
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={cardsVisible > 2 ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="h-[120px] overflow-hidden rounded-[16px] bg-black/5 sm:h-[140px] lg:h-[160px] xl:h-[180px]"
          >
            <FeedImage src={currentSet[3]} alt="Feed 4" />
          </motion.div>
          <motion.div
            key={`branch-info-${branchIndex}`}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid h-[120px] place-items-center overflow-hidden rounded-[16px] bg-white p-2 text-center sm:h-[140px] lg:h-[160px] xl:h-[180px]"
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
              <motion.rect x="1" y="1" width="98" height="98" rx="16" ry="16" fill="none" stroke="rgba(0,166,81,0.28)" strokeWidth="0.9" strokeDasharray="6 6" strokeLinecap="round" initial={{ strokeDashoffset: 0 }} animate={{ strokeDashoffset: -24 }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }} />
            </svg>
            <span className="relative flex flex-col items-center gap-1 px-1">
              <span className="text-[15px] font-bold uppercase leading-none tracking-[0.05em] text-black/80 sm:text-[17px]">
                {CAPTIONS[branchIndex % CAPTIONS.length].main}
              </span>
              <span className="text-[10px] font-medium normal-case leading-snug tracking-[0.02em] text-black/45 sm:text-[11px]">
                {CAPTIONS[branchIndex % CAPTIONS.length].sub}
              </span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
