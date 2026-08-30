import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function BeHealthyPreloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    let raf;
    let start = performance.now();
    const duration = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.floor(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setExit(true);
          setTimeout(() => onDone?.(), 650);
        }, 300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-white px-6"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.12) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.img
              src="/behealthy/images/logo-black.png"
              alt="BeHealthy"
              className="h-10 w-auto object-contain sm:h-12"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-3 text-[11px] font-medium tracking-[0.18em] text-black/40"
            >
              Fresh · Crafted · Delivered
            </motion.p>

            <div className="relative mt-8 h-px w-[220px] overflow-hidden rounded-full bg-black/10">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #0a4a28 0%, #0f6437 55%, #14914f 100%)",
                  boxShadow: "0 0 10px rgba(15,100,55,0.32)",
                  transition: "width 80ms linear",
                }}
              />
            </div>
            <span className="mt-3 font-mono text-[10px] tracking-widest text-black/25">
              {String(Math.round(progress)).padStart(2, "0")}%
            </span>
          </motion.div>

          <motion.p
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.18em] text-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            UAE · Dubai & Abu Dhabi
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
