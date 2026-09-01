import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { attachVisitorIdentity, logVisit } from "@/lib/visitors";

const TITLE = ["Enjoy", "[ Fresh", "Meals", "]", "Every", "Single", "Day"];
// 6 words core: Enjoy Fresh Meals Every Single Day with brackets around Fresh Meals

export default function NewsletterFullBgSection() {
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
      { threshold: 0.22 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    attachVisitorIdentity({ email: email.trim() });
    // also log enriched visit so visitors table shows email immediately
    logVisit({ email: email.trim() });
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    setEmail("");
  };

  return (
    <section ref={ref} className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/behealthy/images/footer.png"
          alt="Newsletter background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/15" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center px-6 py-28 text-center sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <h2
          className="max-w-[720px] text-[22px] font-bold capitalize leading-[0.9] tracking-[-0.02em] text-white sm:text-[26px] lg:text-[34px] xl:text-[38px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {[
            "Get",
            "free",
            "consultation,",
            "offers",
            "and",
            "much",
            "more",
            "by",
            "subscribing.",
          ].map((w, i) => {
            const isHighlight = w.startsWith("subscribing");
            return (
              <span
                key={w + i}
                className="mr-[0.22em] inline-block"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(14px)",
                  transition: `opacity 500ms ease ${0.15 + i * 0.08}s, transform 500ms cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.08}s`,
                }}
              >
                {isHighlight ? (
                  <span className="italic text-white">{w}</span>
                ) : (
                  w
                )}
              </span>
            );
          })}
        </h2>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 12 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex w-full max-w-[520px] items-center"
        >
          <div className="relative flex w-full items-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-[44px] w-full rounded-full border border-white/15 bg-white/10 px-4 pr-[120px] text-[12px] text-white placeholder:text-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-[12px] focus:border-white/25 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/15 sm:h-[52px] sm:px-5 sm:pr-[132px] sm:text-[13px]"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 rounded-full bg-black px-5 text-[12px] font-medium text-white shadow hover:bg-black/90 active:scale-[0.98] sm:px-6 sm:text-[13px]"
            >
              {sent ? "Subscribed ✓" : "Subscribe"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
