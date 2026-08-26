import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Play, Square, ChevronDown } from "lucide-react";

export default function BeHealthyHero() {
  const videoRef = useRef(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) {
      v.pause();
      setIsPlaying(false);
    } else {
      v.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black">
      <img
        src="/behealthy/images/hero.jpeg"
        alt="Be Healthy hero"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

      {/* Title middle-left */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full px-8 sm:px-10 lg:px-14 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 inline-flex items-center rounded-full bg-black/20 backdrop-blur-[12px] border border-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white/90"
          >
            //Personalized Program | Intelligent Support
          </motion.div>

          <motion.h1
            className="font-display font-bold leading-[0.85] tracking-[-0.05em] text-white"
            style={{ fontFamily: "var(--font-display)" }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.45 } },
            }}
          >
            {["THRIVE", "NOURISH", "BALANCE"].map((word) => (
              <motion.span
                key={word}
                variants={{
                  hidden: { y: 28, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="block text-[48px] leading-[0.85] sm:text-[64px] lg:text-[84px] xl:text-[104px]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-6 px-8 pb-8 sm:px-10 sm:pb-10 lg:flex-row lg:items-end lg:justify-between lg:px-14 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-full bg-[#0f6437] px-6 py-3 text-sm font-medium text-white shadow-lg"
            style={{
              background: "linear-gradient(135deg, #0a4a28 0%, #0f6437 35%, #14914f 65%)",
              backgroundSize: "200% 200%",
            }}
          >
            <motion.span
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
              style={{ transform: "skewX(-12deg)" }}
            />
            <span className="relative z-10">
              <span className="hidden sm:inline">Book </span>Consultation
            </span>
          </motion.button>

          <div className="relative">
            {/* Twisted dotted looping arrow */}
            <motion.svg
              width="48"
              height="90"
              viewBox="0 0 48 90"
              fill="none"
              className="pointer-events-none absolute -top-[88px] left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              aria-hidden="true"
            >
              <motion.path
                d="M 38 4 C 44 16, 6 18, 16 34 C 26 48, 40 50, 22 66 C 10 80, 18 88, 26 86"
                stroke="white"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeDasharray="3 4.5"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -28 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
            </motion.svg>

            <button
              type="button"
              className="rounded-full border border-white/15 bg-black/20 px-6 py-3 text-sm font-medium text-white backdrop-blur-[12px] hover:bg-black/30"
            >
              Explore Plans
            </button>
          </div>
        </motion.div>

        {/* Video card + mobile scroll */}
        <div className="flex items-end gap-4 self-start lg:self-auto">
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[22px] border border-white/15 bg-black/20 p-2.5 backdrop-blur-[16px]"
          >
          <div className="relative h-[148px] w-[210px] overflow-hidden rounded-[14px] bg-black lg:h-[220px] lg:w-[360px]">
            {isVideoLoading && (
              <div className="absolute inset-0 grid place-items-center bg-black/40">
                <Loader2 className="h-6 w-6 animate-spin text-white/70" />
              </div>
            )}
            <video
              ref={videoRef}
              src="/behealthy/videos/hero-pip.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadStart={() => setIsVideoLoading(true)}
              onCanPlay={() => setIsVideoLoading(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between px-1 pt-2.5">
            <div className="text-xs leading-tight text-white/85">
              <div className="font-medium">Inside Be Healthy</div>
              <div className="text-white/60">Fresh kitchen • 01:20</div>
            </div>
            <button
              type="button"
              onClick={togglePlay}
              className="grid h-8 w-8 place-items-center rounded-full bg-black text-white hover:bg-black/80"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Square size={12} fill="white" /> : <Play size={12} fill="white" className="ml-0.5" />}
            </button>
          </div>
        </motion.div>
          <div className="flex flex-col items-center gap-2 pb-2 lg:hidden">
            <span className="text-[10px] font-medium tracking-[0.2em] text-white/60" style={{ writingMode: "vertical-rl" }}>
              scroll down
            </span>
            <div className="h-10 w-px bg-white/30" />
          </div>
        </div>
      </div>

      {/* Center bottom - dashed circle arrow + scroll text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 lg:flex"
        aria-hidden="true"
      >
        <div className="relative grid h-9 w-9 place-items-center">
          <motion.svg
            viewBox="0 0 40 40"
            fill="none"
            className="absolute inset-0 h-full w-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              stroke="white"
              strokeOpacity="0.38"
              strokeWidth="1"
              strokeDasharray="3 4"
              strokeLinecap="round"
            />
          </motion.svg>
          <motion.svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            animate={{ y: [0, 2.5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M2 3 L7 8 L12 3"
              stroke="white"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />
          </motion.svg>
        </div>
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
          Scroll to continue
        </span>
      </motion.div>
    </section>
  );
}
