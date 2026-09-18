import { motion } from "framer-motion";

const PARTNERS = [
  "/aleens/images/brand-1.svg",
  "/aleens/images/brand-2.svg",
  "/aleens/images/brand-3.svg",
  "/aleens/images/brand-4.svg",
  "/aleens/images/brand-5.svg",
  "/aleens/images/brand-6.svg",
  "/aleens/images/brand-7.svg",
  "/aleens/images/brand-8.svg",
];

export default function PartnersMarqueeSection() {
  const logos = [...PARTNERS, ...PARTNERS];

  return (
    <section
      className="relative w-full overflow-hidden border-y border-white/10 py-3.5 sm:py-4"
      style={{
        background: "linear-gradient(135deg, #00713a 0%, #00a651 35%, #2ec276 65%)",
        backgroundSize: "200% 200%",
      }}
    >
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex w-max items-center gap-10 sm:gap-12 lg:gap-20 xl:gap-24"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {logos.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt={`Partner ${i % PARTNERS.length}`}
              className="h-[22px] w-auto shrink-0 object-contain opacity-90 grayscale brightness-0 invert sm:h-[26px]"
              loading="lazy"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
