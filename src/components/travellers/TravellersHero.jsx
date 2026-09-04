import { motion } from "framer-motion";
import TravellersNavbar from "./TravellersNavbar";

function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
function LinkedinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function FacebookIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function TravellersHero() {
  return (
    <section className="travellers-hero travellers-hero--full relative w-screen max-w-none overflow-hidden min-h-[100dvh] h-[100dvh]">
      {/* Video background — hero-3 */}
      <motion.video
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        poster="/travellers/videos/hero-3.mp4"
        aria-hidden="true"
        onError={(e) => {
          const v = e.currentTarget;
          if (v.src.includes("hero-3")) v.src = "/travellers/videos/hero.mp4";
        }}
      >
        <source src="/travellers/videos/hero-4.mp4" type="video/mp4" />
      </motion.video>

      {/* Color adjustments */}
      <div className="absolute inset-0 bg-[#0c1012]/28" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-[#0a0f12]/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Hero content — navbar + middle split */}
      <div className="relative z-10 flex h-[100dvh] min-h-[100dvh] flex-col">
        <TravellersNavbar variant="light" />

        {/* Middle area — title pinched to top — pushed bit more again */}
        <div className="flex flex-1 items-start pt-20 sm:pt-24 lg:pt-28 xl:pt-32">
          <div className="flex w-full items-start justify-between gap-8 px-6 lg:px-8">
            {/* Left middle — big title */}
            <div className="max-w-[780px] lg:max-w-[880px]">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="travellers-display text-[42px] max-sm:max-h-[710px]:text-[38px] [@media((max-width:768px)_and_(max-height:710px))]:text-[38px] font-normal leading-[1.25] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[80px] xl:text-[92px]"
                style={{
                  fontFamily: '"Instrument Sans", sans-serif',
                  fontWeight: 600,
                }}
              >
                <span className="block overflow-hidden py-1">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="block pb-1"
                  >
                    Egypt Security
                  </motion.span>
                </span>
                <span className="block overflow-hidden py-1">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="block pb-1"
                  >
                    Approval Made Simple.
                  </motion.span>
                </span>
              </motion.h1>
            </div>
          </div>
        </div>

        {/* Right middle — social icons vertical — middle right, not moving title — pushed a bit from top on mobile */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-6 top-[58%] flex -translate-y-1/2 flex-col items-center gap-4 sm:top-1/2 lg:right-8"
          aria-label="Social media"
        >
          {[
            { Icon: FacebookIcon, href: "#facebook", label: "Facebook" },
            { Icon: LinkedinIcon, href: "#linkedin", label: "LinkedIn" },
            { Icon: InstagramIcon, href: "#instagram", label: "Instagram" },
          ].map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black hover:border-white"
              style={{ backdropFilter: "blur(10px)" }}
            >
              <Icon className="h-5 w-5" />
            </motion.a>
          ))}
          <span className="mt-2 h-12 w-px bg-white/15" aria-hidden="true" />
        </motion.div>

        {/* Bottom left — description with animated dot — security approval agency */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-8 left-6 hidden max-w-[520px] sm:bottom-10 lg:bottom-12 lg:left-8 md:block"
        >
          <p
            className="text-sm italic leading-relaxed text-white/85 sm:text-[15px]"
            style={{
              fontFamily: "'Outfit Variable', sans-serif",
              fontWeight: 400,
            }}
          >
            — We are a trusted agency that helps you secure security approval
            for Egypt. From tourist and business to family and residency, we
            handle paperwork, follow-ups and clearance. Your smooth entry starts
            here.
          </p>
        </motion.div>

        {/* Bottom right — 6 clients + +100 — transparent blurred bubbly — desktop horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-8 right-6 hidden sm:bottom-10 lg:bottom-12 lg:right-8 md:flex"
        >
          <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur-md sm:px-4 sm:py-2">
            <div className="flex -space-x-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${14 + i}`}
                  alt=""
                  className="h-7 w-7 rounded-full border-2 border-white/20 object-cover shadow-sm sm:h-8 sm:w-8"
                  loading="lazy"
                />
              ))}
            </div>
            <span
              className="whitespace-nowrap text-xs font-medium tracking-[0.02em] text-white/70 sm:text-[13px]"
              style={{ fontFamily: "'Outfit Variable', sans-serif" }}
            >
              +100 Happy Clients
            </span>
          </div>
        </motion.div>

        {/* Mobile — Happy clients vertical above scroll down — more space */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-32 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 md:hidden"
        >
          <div className="flex -space-x-1.5 rounded-full border border-white/15 bg-white/10 px-2 py-1 shadow-[0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur-md">
            {Array.from({ length: 6 }).map((_, i) => (
              <img
                key={`m-${i}`}
                src={`https://i.pravatar.cc/100?img=${14 + i}`}
                alt=""
                className="h-6 w-6 rounded-full border-2 border-white/20 object-cover shadow-sm"
                loading="lazy"
              />
            ))}
          </div>
          <span
            className="whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[10px] font-medium tracking-[0.02em] text-white/80 backdrop-blur-md"
            style={{ fontFamily: "'Outfit Variable', sans-serif" }}
          >
            +100 Happy Clients
          </span>
        </motion.div>

        {/* Bottom center — Scroll Down with animated dashed circular background */}
        <motion.button
          type="button"
          onClick={() =>
            document
              .getElementById("programs")
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 sm:bottom-8 lg:bottom-10"
          aria-label="Scroll down"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
            Scroll Down
          </span>
          <span className="relative grid h-9 w-9 place-items-center">
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
                strokeOpacity="0.32"
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
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
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
          </span>
        </motion.button>
      </div>
    </section>
  );
}
