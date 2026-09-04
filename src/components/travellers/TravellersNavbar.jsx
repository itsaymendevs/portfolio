import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Programs", href: "#programs" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
  { label: "About", href: "#about" },
];

export default function TravellersNavbar({ variant = "dark" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const isLight = variant === "light";

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-transparent"
    >
      {/* full width same as hero — no max-width constraint */}
      <nav className="flex w-full items-center justify-between px-6 py-5 lg:px-8">
        {/* Left: Logo + Nav Links — considerable spacing */}
        <div className="flex items-center gap-10 lg:gap-12">
          {/* Logo — text only, Bricolage Grotesque — not bold */}
          <motion.a
            href="#/"
            aria-label="Travellers home"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="select-none"
            style={{ fontFamily: "var(--font-logo)" }}
          >
            <span
              className={`text-[22px] font-normal tracking-[-0.02em] antialiased ${isLight ? "text-white" : "text-black"}`}
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 500 }}
            >
              Travellers
            </span>
          </motion.a>

          {/* Desktop Nav Links — Outfit Variable — considerable spacing + animated active pill */}
          <ul className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((link, i) => {
              const isActive = active === link.label;
              return (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.18 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  {isActive && (
                    <motion.div
                      layoutId="travellers-nav-active"
                      className="absolute inset-0 rounded-full bg-white shadow-sm"
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    />
                  )}
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setActive(link.label);
                    }}
                    className={`relative z-10 block rounded-full px-5 py-2 text-[14px] font-normal tracking-[-0.01em] transition-colors ${isActive ? "text-black" : isLight ? "text-white/80 hover:text-white" : "text-neutral-500 hover:text-black"}`}
                    style={{ fontFamily: "'Outfit Variable', sans-serif", fontWeight: isActive ? 500 : 400 }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Right: Sign Up + Mobile toggle */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#check-application"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`hidden items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-[13.5px] font-normal tracking-[-0.01em] ring-1 backdrop-blur-xl transition-colors md:inline-flex ${isLight ? "bg-white/10 text-white ring-white/20 hover:bg-white/15" : "bg-white/40 text-black ring-black/10 hover:bg-white/60"}`}
            style={{
              fontFamily: "'Outfit Variable', sans-serif",
              fontWeight: 500,
              backdropFilter: "blur(12px) saturate(1.4)",
              WebkitBackdropFilter: "blur(12px) saturate(1.4)",
            }}
          >
            Check Application
            <motion.span
              className="travellers-signup-circle grid h-8 w-8 place-items-center rounded-full text-white"
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
            </motion.span>
          </motion.a>

          <motion.button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            whileTap={{ scale: 0.94 }}
            className={`grid h-10 w-10 place-items-center rounded-full ring-1 md:hidden ${isLight ? "bg-white/15 text-white ring-white/20 backdrop-blur" : "bg-white text-black ring-black/5"}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                className="grid place-items-center"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu — animated height */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden border-t backdrop-blur md:hidden ${isLight ? "border-white/10 bg-black/40" : "border-black/5 bg-white/80"}`}
          >
            <ul className="flex flex-col gap-1 px-6 pb-6 pt-3">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.28 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-normal hover:bg-white/90 ${isLight ? "text-white/85 hover:text-black" : "text-neutral-700 hover:text-black"}`}
                    style={{ fontFamily: "'Outfit Variable', sans-serif", fontWeight: 400 }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="pt-3"
              >
                <a
                  href="#check-application"
                  onClick={() => setMobileOpen(false)}
                  className={`inline-flex w-full items-center justify-between rounded-full px-2 py-1.5 pl-6 text-sm font-normal tracking-[-0.01em] ring-1 ${isLight ? "bg-transparent text-white ring-white/25" : "bg-transparent text-black ring-black/15"}`}
                  style={{ fontFamily: "'Outfit Variable', sans-serif", fontWeight: 500 }}
                >
                  Check Application
                  <span className="travellers-signup-circle grid h-8 w-8 place-items-center rounded-full text-white">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
