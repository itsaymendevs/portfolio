import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TITLE_WORDS = ["Stay", "Connected"];

export default function StayConnectedSection() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    setEmail("");
  };

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#f8f8f8] px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        {/* Left — big title + one line paragraph */}
        <div className="w-full lg:w-[48%]">
          <h2
            className="text-left text-[32px] font-bold leading-[0.9] tracking-[-0.03em] text-black sm:text-[36px] lg:text-[44px] xl:text-[52px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {TITLE_WORDS.map((w, i) => (
              <span
                key={w}
                className="mr-[0.22em] inline-block"
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
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 max-w-[520px] text-left text-[13px] leading-[1.6] text-black/60 sm:text-[14px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Subscribe to our offers and discounts — be the first to know about fresh menus, seasonal deals and exclusive healthy perks.
          </motion.p>
        </div>

        {/* Right — email input with button inside */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 12 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full max-w-[520px] items-center lg:w-[48%]"
        >
          <div className="relative flex w-full items-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-[48px] w-full rounded-full border border-black/10 bg-white px-5 pr-[128px] text-[13px] text-black placeholder:text-black/30 shadow-sm focus:border-black/20 focus:outline-none focus:ring-2 focus:ring-black/5 sm:h-[52px] sm:pr-[140px] sm:text-[14px]"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 rounded-full bg-black px-6 text-[13px] font-medium text-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition hover:bg-black/90 active:scale-[0.98] sm:px-7 sm:text-[14px]"
            >
              {sent ? "Subscribed ✓" : "Subscribe"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
