import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { attachVisitorIdentity, logVisit } from "@/lib/visitors";

export default function FreeConsultationSection() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
    if (!email.trim() || !phone.trim()) return;
    attachVisitorIdentity({ email: email.trim(), phone: phone.trim() });
    logVisit({ email: email.trim(), phone: phone.trim() });
    setSent(true);
    setTimeout(() => setSent(false), 2800);
    setEmail("");
    setPhone("");
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative w-full overflow-hidden bg-[#fcfcfa] px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20"
    >
      {/* Decorative animated arrows background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.svg
          viewBox="0 0 200 200"
          fill="none"
          className="absolute -left-6 top-6 h-[140px] w-[140px] opacity-[0.07] sm:h-[180px] sm:w-[180px] lg:left-8 lg:h-[220px] lg:w-[220px]"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 0.07 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.path
            d="M 40 20 C 70 40, 30 80, 80 110 C 110 130, 140 110, 120 160"
            stroke="#0f6437"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="6 7"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -30 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 120 160 L 110 145 M 120 160 L 105 152"
            stroke="#0f6437"
            strokeWidth="1.4"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          />
        </motion.svg>

        <motion.svg
          viewBox="0 0 200 200"
          fill="none"
          className="absolute -right-8 bottom-4 h-[160px] w-[160px] opacity-[0.06] sm:h-[200px] sm:w-[200px] lg:right-12 lg:h-[240px] lg:w-[240px]"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 0.06 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.path
            d="M 160 40 C 130 70, 170 110, 110 130 C 70 150, 60 180, 90 190"
            stroke="#0f6437"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="7 8"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -30 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 90 190 L 102 178 M 90 190 L 98 175"
            stroke="#0f6437"
            strokeWidth="1.4"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          />
        </motion.svg>

        <motion.svg
          viewBox="0 0 120 120"
          fill="none"
          className="absolute left-1/2 top-1/2 hidden h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 opacity-[0.03] lg:block"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 0.03 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.path
            d="M 20 60 C 40 20, 80 20, 100 60 C 80 100, 40 100, 20 60 Z"
            stroke="#0f6437"
            strokeWidth="1"
            strokeDasharray="5 8"
            fill="none"
            initial={{ strokeDashoffset: 0, rotate: 0 }}
            animate={{ strokeDashoffset: -28, rotate: 360 }}
            transition={{ strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }, rotate: { duration: 28, repeat: Infinity, ease: "linear" } }}
            style={{ transformOrigin: "60px 60px" }}
          />
        </motion.svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-[720px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-black/50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0f6437] animate-pulse" />
            Free Consultation
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-[28px] font-bold leading-[0.9] tracking-[-0.03em] text-black sm:text-[32px] lg:text-[40px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get Your Free Consultation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-3 max-w-[520px] text-[13px] leading-[1.6] text-black/60 sm:text-[14px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Tell us your goal — we’ll craft a plan, branches, and opening times tailored for you.
          </motion.p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 12 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 flex max-w-[720px] flex-col gap-3 sm:flex-row sm:items-end sm:gap-3"
        >
          <label className="flex flex-1 flex-col gap-1.5 text-left">
            <span className="text-[11px] font-medium tracking-[0.08em] text-black/50">Email</span>
            <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2.5 shadow-sm focus-within:border-[#0f6437]/20 focus-within:ring-2 focus-within:ring-[#0f6437]/10">
              <Mail size={14} className="shrink-0 text-black/30" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent text-[13px] text-black placeholder:text-black/30 focus:outline-none"
              />
            </div>
          </label>

          <label className="flex flex-1 flex-col gap-1.5 text-left">
            <span className="text-[11px] font-medium tracking-[0.08em] text-black/50">Phone</span>
            <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2.5 shadow-sm focus-within:border-[#0f6437]/20 focus-within:ring-2 focus-within:ring-[#0f6437]/10">
              <Phone size={14} className="shrink-0 text-black/30" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+971 5x xxx xxxx"
                className="w-full bg-transparent text-[13px] text-black placeholder:text-black/30 focus:outline-none"
              />
            </div>
          </label>

          <button
            type="submit"
            className="inline-flex h-[44px] shrink-0 items-center justify-center gap-2 rounded-full bg-black px-6 text-[13px] font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition hover:bg-black/90 active:scale-[0.98] sm:h-[46px]"
          >
            {sent ? "Sent ✓" : "Confirm"}
            {!sent && <ArrowRight size={14} />}
          </button>
        </motion.form>

        {sent && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-4 max-w-[720px] text-center text-[12px] font-medium text-[#0f6437]"
          >
            Thanks! We’ll contact you shortly for your free consultation.
          </motion.p>
        )}
      </div>
    </section>
  );
}
