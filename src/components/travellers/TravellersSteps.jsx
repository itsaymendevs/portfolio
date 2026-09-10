import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    n: "01",
    title: "Submit Documents",
    cap: "Passport & Details",
    desc: "Send your passport copy and basic details via WhatsApp or form — fast and secure.",
  },
  {
    n: "02",
    title: "We Review Submit",
    cap: "Agency Handling",
    desc: "Our team checks, prepares and submits your file to the authorities the same day.",
  },
  {
    n: "03",
    title: "Follow Up Clearance",
    cap: "Daily Follow-up",
    desc: "We follow up daily, track progress and keep you updated until clearance is issued.",
  },
  {
    n: "04",
    title: "Receive Approval",
    cap: "Travel Ready",
    desc: "Get your security approval and travel to Egypt with confidence — we guide you to the end.",
  },
];

export default function TravellersSteps() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold: 0.22 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-white px-6 py-12 sm:px-10 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        {/* Left — big title + italic description */}
        <div className="flex w-full flex-col lg:w-[36%] lg:pt-2">
          <h2
            className="text-left text-[60px] font-bold leading-[0.92] tracking-[-0.03em] text-black sm:text-[72px] lg:text-[88px] xl:text-[104px]"
            style={{ fontFamily: "'Outfit Variable', sans-serif" }}
          >
            {["Apply", "In", "Few", "Steps."].map((w, i) => (
              <span
                key={w}
                className="mr-[0.22em] inline-block"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(14px)",
                  transition: `opacity 500ms ease ${0.12 + i * 0.07}s, transform 500ms cubic-bezier(0.16,1,0.3,1) ${0.12 + i * 0.07}s`,
                }}
              >
                {w}
              </span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-[420px] text-[15px] italic leading-[1.7] text-black/60 sm:mt-10 sm:text-[16px]"
            style={{ fontFamily: "'Outfit Variable', sans-serif" }}
          >
            Follow our simple, proven process to secure your Egypt approval — from first contact to clearance, we handle every step with care and speed.
          </motion.p>
        </div>

        {/* Right — 4 cards 2 up 2 down — smaller width, less height + dashed lines */}
        <div className="relative grid w-full justify-items-center gap-4 sm:grid-cols-2 lg:w-[58%]">
          <svg
            viewBox="0 0 900 280"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
            aria-hidden="true"
          >
            {/* Connect the 4 cards through the middle gaps */}
            <motion.path
              d="M 430 70 H 470"
              fill="none"
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="1.4"
              strokeDasharray="8 8"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 0, opacity: 0 }}
              animate={visible ? { strokeDashoffset: -40, opacity: 1 } : {}}
              transition={{ strokeDashoffset: { duration: 1.4, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4, delay: 0.6 } }}
            />
            <motion.path
              d="M 450 70 V 210"
              fill="none"
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="1.4"
              strokeDasharray="8 8"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 0, opacity: 0 }}
              animate={visible ? { strokeDashoffset: -40, opacity: 1 } : {}}
              transition={{ strokeDashoffset: { duration: 1.4, repeat: Infinity, ease: "linear", delay: 0.12 }, opacity: { duration: 0.4, delay: 0.7 } }}
            />
            <motion.path
              d="M 430 210 H 470"
              fill="none"
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="1.4"
              strokeDasharray="8 8"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 0, opacity: 0 }}
              animate={visible ? { strokeDashoffset: -40, opacity: 1 } : {}}
              transition={{ strokeDashoffset: { duration: 1.4, repeat: Infinity, ease: "linear", delay: 0.24 }, opacity: { duration: 0.4, delay: 0.8 } }}
            />
          </svg>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 14 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex min-h-[240px] w-full max-w-[340px] flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#0f0f0f] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.18)] sm:min-h-[260px] lg:min-h-[280px]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
                aria-hidden="true"
              />
              <p className="relative z-10 text-[13px] leading-[1.6] text-white/65" style={{ fontFamily: "'Outfit Variable', sans-serif" }}>
                {s.desc}
              </p>
              <div className="relative z-10 mt-auto pt-6">
                <h3 className="text-[15px] font-medium normal-case tracking-[-0.01em] text-white" style={{ fontFamily: "'Outfit Variable', sans-serif" }}>
                  {s.title}
                </h3>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.08em] text-white/40">{s.cap}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
