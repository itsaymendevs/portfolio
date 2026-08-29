import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TITLE_WORDS = ["Visit", "Our", "Branches"];
const BRANCH_SETS = [
  ["/behealthy/images/branch-1.jpg", "/behealthy/images/branch-2.jpg", "/behealthy/images/branch-3.jpg", "/behealthy/images/branch-4.jpg"],
  ["/behealthy/images/branch-3.jpg", "/behealthy/images/branch-4.jpg", "/behealthy/images/branch-5.jpg", "/behealthy/images/branch-1.jpg"],
  ["/behealthy/images/branch-2.jpg", "/behealthy/images/branch-5.jpg", "/behealthy/images/branch-1.jpg", "/behealthy/images/branch-3.jpg"],
];
const BRANCH_INFOS = [
  { name: "Abu Hail Branch", location: "Dubai, Internet City" },
  { name: "Marina Branch", location: "Dubai, Marina" },
  { name: "Khalifa Branch", location: "Abu Dhabi, Khalifa City" },
];

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

  const currentSet = BRANCH_SETS[branchIndex % BRANCH_SETS.length];

  return (
    <section
      ref={ref}
      id="branches"
      className="relative w-full overflow-hidden bg-white px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20"
    >
      {/* Subtle dotted pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,100,55,0.32) 1.6px, transparent 0)",
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
            className="whitespace-nowrap text-left text-[30px] font-bold leading-[0.85] tracking-[-0.04em] text-black sm:text-[34px] lg:whitespace-normal lg:text-[64px] xl:text-[78px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {TITLE_WORDS.map((w, i) => (
              <span
                key={w}
                className={`mr-[0.22em] inline-block ${w === "Visit" ? "hidden lg:inline-block" : ""}`}
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
              <p className="text-[13px] italic leading-[1.7] text-black/60 sm:text-[14px]">
                — Fresh kitchens across the Emirates, dine in, pick up, or get it delivered. Open daily from early morning to late evening for your convenience.
              </p>
              <p className="text-[13px] italic leading-[1.7] text-black/60 sm:text-[14px]">
                Discover our welcoming spaces in Dubai, Abu Dhabi and Sharjah, crafted for fresh daily dining, warm hospitality and effortless healthy living, with seasonal menus and chef-led guidance every day.
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
                <span className="absolute bottom-[0.12em] left-0 right-0 h-[0.38em] rounded-[2px] bg-[#FFF59D]" aria-hidden="true" />
                <span className="relative italic">Learn more about the branch →</span>
              </span>
            </motion.a>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex w-full max-w-[440px] items-center gap-4"
          >
            <div className="h-px flex-1 bg-black/10" />
            <button
              type="button"
              onClick={() => setBranchIndex((i) => (i + 1) % BRANCH_SETS.length)}
              className="group flex items-center gap-2 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] text-black transition hover:text-[#0f6437]"
            >
              Next branch
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </motion.div>
        </div>

        {/* Middle — single image — aligned center/end with right */}
        <motion.div
              layout
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={cardsVisible > 0 ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="hidden h-[340px] w-full overflow-hidden rounded-[20px] bg-black/5 lg:flex lg:flex-1 lg:self-end xl:h-[380px]"
        >
          <img key={currentSet[0]} src={currentSet[0]} alt="Branch 1" className="h-full w-full object-cover" />
        </motion.div>
        <motion.div
              layout
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={cardsVisible > 0 ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="h-[200px] w-full overflow-hidden rounded-[20px] bg-black/5 sm:h-[220px] lg:hidden"
        >
          <img key={`${currentSet[0]}-m`} src={currentSet[0]} alt="Branch 1" className="h-full w-full object-cover" />
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
            <img key={`${currentSet[1]}-r1`} src={currentSet[1]} alt="Branch small 1" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div
                layout
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={cardsVisible > 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="h-[120px] overflow-hidden rounded-[16px] bg-black/5 sm:h-[140px] lg:h-[160px] xl:h-[180px]"
          >
            <img key={`${currentSet[2]}-r1`} src={currentSet[2]} alt="Branch small 2" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div
                layout
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={cardsVisible > 2 ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="h-[120px] overflow-hidden rounded-[16px] bg-black/5 sm:h-[140px] lg:h-[160px] xl:h-[180px]"
          >
            <img key={`${currentSet[3]}-r2`} src={currentSet[3]} alt="Branch small 3" className="h-full w-full object-cover" />
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
              <motion.rect x="1" y="1" width="98" height="98" rx="16" ry="16" fill="none" stroke="rgba(15,100,55,0.28)" strokeWidth="0.9" strokeDasharray="6 6" strokeLinecap="round" initial={{ strokeDashoffset: 0 }} animate={{ strokeDashoffset: -24 }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }} />
            </svg>
            <span className="relative px-1 text-[10px] font-semibold uppercase leading-[1.3] tracking-[0.08em] text-black/70 sm:text-[11px]">
              {BRANCH_INFOS[branchIndex % BRANCH_INFOS.length].name}
              <br />
              <span className="text-[9px] font-medium normal-case tracking-[0.02em] text-black/45 sm:text-[10px]">
                {BRANCH_INFOS[branchIndex % BRANCH_INFOS.length].location}
              </span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
