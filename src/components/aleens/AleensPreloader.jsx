import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["Fresh", "Tasty", "Healthy", "Delicious"];
const DOTS = ["•", "•", "•"];

export default function AleensPreloader({ onDone }) {
  const [exit, setExit] = useState(false);
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    let raf;
    let start = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setExit(true);
          setTimeout(() => onDone?.(), 400);
        }, 150);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  useEffect(() => {
    const id = setInterval(
      () => setFilled((f) => (f + 1) % (WORDS.length + 1)),
      420
    );
    return () => clearInterval(id);
  }, []);

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
            <div
              className="flex items-center gap-2 text-[15px] font-bold tracking-[-0.02em] sm:text-[22px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {WORDS.map((w, i) => (
                <span key={w} className="flex items-center gap-2">
                  {i > 0 && (
                    <span className="text-[0.6em] font-normal text-black/15">
                      {DOTS[i - 1]}
                    </span>
                  )}
                  <motion.span
                    className="block"
                    animate={
                      i < filled ? { opacity: 0.85, scale: 1.02 } : { opacity: 0.15, scale: 1 }
                    }
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ color: "rgba(0,0,0,1)" }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}