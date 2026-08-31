import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

function VideoWithLoader({ src, alt, className }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative h-full w-full">
      {loading && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-black/30 backdrop-blur-[2px]">
          <Loader2 className="h-6 w-6 animate-spin text-white/80" />
        </div>
      )}
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadStart={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        onLoadedData={() => setLoading(false)}
        className={className}
        aria-label={alt}
      />
    </div>
  );
}

export default function BeHealthyFooter() {
  const [visible, setVisible] = useState(false);
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
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className="relative w-full overflow-hidden bg-[#0a0a0a] px-6 pb-0 pt-12 sm:px-10 sm:pb-0 sm:pt-14 lg:px-16 lg:pb-0 lg:pt-16"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10">
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          {/* Left — BeHealthy logo + caption + addresses + email */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-6 text-left lg:max-w-[420px]"
          >
            <div
              className="flex items-center gap-1 text-white"
              style={{ fontFamily: "var(--font-logo)" }}
            >
              <span className="text-[26px] font-bold tracking-tight sm:text-[28px]">
                Be
              </span>
              <span className="text-[26px] font-medium tracking-tight sm:text-[28px]">
                Healthy
              </span>
            </div>
            <p
              className="max-w-[420px] text-left text-[20px] font-semibold leading-[1.4] tracking-[-0.01em] text-white sm:text-[22px] lg:text-[24px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Where passion meets purpose for every delicious plate.
            </p>
            <div className="space-y-1 text-left">
              <p
                className="text-[12px] leading-[1.6] text-white/60 sm:text-[13px]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                403 Ebadia Street, Abu-Hail, Dubai
              </p>
              <p
                className="text-[12px] leading-[1.6] text-white/60 sm:text-[13px]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Street 4, Khalifa City, Abu Dhabi
              </p>
              <a
                href="mailto:info@behealthydxb.com"
                className="inline-block pt-1 text-[12px] font-medium text-white/80 underline decoration-white/15 underline-offset-4 hover:text-white sm:text-[13px]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                info@behealthydxb.com
              </a>
            </div>
          </motion.div>

          {/* Right — video footer-pip — minimized width, height aligned with left content end */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[160px] w-full overflow-hidden rounded-[16px] bg-white/5 sm:h-[180px] lg:h-[180px] lg:w-[360px] lg:shrink-0 xl:h-[190px] xl:w-[400px]"
          >
            <VideoWithLoader
              src="/behealthy/videos/footer-pip.mp4"
              alt="BeHealthy kitchen"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Bottom line + copyrights */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pt-2"
        >
          <div className="h-px w-full bg-white/10" />
          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-left text-[11px] tracking-[0.04em] text-white/40">
              © 2026 BeHealthy. All rights reserved.
            </span>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="pointer-events-none text-center text-[11px] tracking-[0.04em] text-white/40 transition hover:text-white/70 sm:text-center"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="pointer-events-none text-right text-[11px] tracking-[0.04em] text-white/40 transition hover:text-white/70 sm:text-right"
            >
              Terms and Conditions
            </a>
          </div>
        </motion.div>

        {/* Big BE HEALTHY — full width at end of footer and screen */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none mt-8 w-full overflow-hidden sm:mt-10"
          aria-hidden="true"
        >
          <h1
            className="mb-[10px] w-full whitespace-nowrap px-2 text-center font-bold leading-none tracking-[0.04em] text-[#c7c7c7] sm:mb-0 sm:px-4 text-[37px] lg:text-[140px] xl:text-[180px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            BE HEALTHY
          </h1>
        </motion.div>
      </div>
    </footer>
  );
}
