import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = ["Home", "About", "Plans", "Menu", "How it Works", "Contact", "Login"];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (id) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNav = (label) => {
    setActive(label);
    const map = {
      Home: "top",
      About: "about",
      Plans: "plans",
      Menu: "popular",
      "How it Works": "how-it-works",
      Contact: "contact",
      Login: null,
    };
    const id = map[label];
    if (id) scrollToId(id);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-0 z-50 flex w-full items-center justify-between px-8 sm:px-10 lg:px-14 xl:px-16 transition-all duration-500 ${
        isScrolled
          ? "top-3 py-2 bg-black/10 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
          : "top-0 pt-4 sm:pt-5 bg-transparent border-transparent"
      }`}
      aria-label="BeHealthy navigation"
    >
      <motion.div
        initial={{ x: -14, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center"
      >
        <a href="#top" className="flex items-center gap-1 text-white" style={{ fontFamily: "var(--font-logo)" }}>
          <span className="text-[22px] font-bold tracking-tight">Be</span>
          <span className="text-[22px] font-medium tracking-tight">Healthy</span>
        </a>
      </motion.div>

      <motion.div
        initial={{ x: 14, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex items-center rounded-full bg-black/20 backdrop-blur-[20px] border border-white/10 p-1.5"
      >
        {LINKS.map((label) => {
          const isLogin = label === "Login";
          const isActive = active === label;
          if (isLogin) {
            return (
              <motion.button
                key={label}
                onClick={() => handleNav(label)}
                className={`relative overflow-hidden rounded-full px-[22px] py-[10px] text-[13.5px] font-medium transition-colors ${
                  isActive ? "text-[#0f6437]" : "text-white hover:text-white/90"
                }`}
                style={
                  isActive
                    ? { backgroundColor: "#E8F5E9" }
                    : {
                        background: "linear-gradient(135deg, #0a4a28 0%, #0f6437 35%, #14914f 65%)",
                        backgroundSize: "200% 200%",
                      }
                }
                animate={
                  !isActive
                    ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
                    : {}
                }
                transition={
                  !isActive
                    ? { duration: 6, ease: "easeInOut", repeat: Infinity }
                    : { duration: 0.2 }
                }
              >
                {!isActive && (
                  <motion.span
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.8, ease: "easeInOut" }}
                    style={{ transform: "skewX(-12deg)" }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </motion.button>
            );
          }
          return (
            <button
              key={label}
              onClick={() => handleNav(label)}
              className={`relative rounded-full px-[22px] py-[10px] text-[13.5px] font-medium transition-colors ${
                isActive ? "text-black" : "text-white/85 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </motion.div>

      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        className="grid h-10 w-10 place-items-center rounded-full bg-black/20 backdrop-blur-[20px] border border-white/10 text-white lg:hidden"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-[64px] left-4 right-4 rounded-[24px] border border-white/10 bg-black/20 backdrop-blur-[20px] p-2 shadow-[0_16px_40px_rgba(0,0,0,0.22)] lg:hidden"
        >
          <div className="m-1 rounded-[18px] bg-white p-2 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col gap-1">
            {LINKS.map((label) => {
              const isLogin = label === "Login";
              const isActive = active === label;
              if (isLogin) {
                return (
                  <motion.button
                    key={label}
                    onClick={() => handleNav(label)}
                    className={`flex w-full items-center justify-between rounded-full px-4 py-3 text-[14px] font-semibold border relative overflow-hidden ${
                      isActive ? "text-[#0f6437] border-transparent" : "text-white border-transparent"
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: "#E8F5E9" }
                        : {
                            background: "linear-gradient(135deg, #0a4a28 0%, #0f6437 35%, #14914f 65%)",
                            backgroundSize: "200% 200%",
                          }
                    }
                    animate={
                      !isActive
                        ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
                        : {}
                    }
                    transition={
                      !isActive
                        ? { duration: 6, ease: "easeInOut", repeat: Infinity }
                        : { duration: 0.2 }
                    }
                  >
                    {!isActive && (
                      <motion.span
                        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.8, ease: "easeInOut" }}
                        style={{ transform: "skewX(-12deg)" }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                    <span className={`relative z-10 h-2 w-2 rounded-full ${isActive ? "bg-[#0f6437]" : "bg-white"}`} />
                  </motion.button>
                );
              }
              return (
                <button
                  key={label}
                  onClick={() => handleNav(label)}
                  className={`flex w-full items-center justify-between rounded-full px-4 py-3 text-left text-[14px] font-medium ${
                    isActive ? "bg-[#F5F2EB] text-black" : "text-black/60 hover:bg-black/[0.04] hover:text-black"
                  }`}
                >
                  <span>{label}</span>
                  {isActive && <span className="h-2 w-2 rounded-full bg-[#0A2E1F]" />}
                </button>
              );
            })}
          </div>
          </div>
          <div className="mt-2 border-t border-white/10 pt-3 text-center">
            <p className="whitespace-nowrap text-[11px] font-medium tracking-[0.14em] text-white/60">
              Dubai • Abu Dhabi • Sharjah • All Emirates
            </p>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
