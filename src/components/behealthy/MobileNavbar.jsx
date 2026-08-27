import { useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "plans", label: "Plans" },
  { id: "menu", label: "Menu" },
  { id: "how", label: "How it Works" },
  { id: "contact", label: "Contact" },
  { id: "login", label: "Login" },
];

export default function MobileNavbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute inset-x-0 top-0 z-30 lg:hidden">
      <div className="flex w-full justify-between items-center px-4 pt-4">
        <a href="#">
          <span
            style={{ fontFamily: "var(--font-logo)" }}
            className="text-[22px] font-semibold tracking-[-0.03em] flex gap-[6px] text-white"
          >
            <span className="font-bold">Be</span>
            <span className="font-medium">Healthy</span>
          </span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] grid place-items-center"
        >
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-0.5 w-4 bg-white rounded-full transition-all duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[6px] h-0.5 w-4 bg-white rounded-full transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[12px] h-0.5 w-4 bg-white rounded-full transition-all duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { opacity: 1, y: 0, pointerEvents: "auto" },
          closed: { opacity: 0, y: -8, pointerEvents: "none" },
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-4 right-4 top-[72px]"
      >
        <div className="rounded-[24px] bg-black/20 backdrop-blur-[20px] border border-white/10 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.22)]">
          <div className="m-1 rounded-[18px] bg-white p-2">
            {LINKS.map((link) => {
              const isActive = active === link.id;
              const isLogin = link.id === "login";
              if (isLogin) {
                return (
                  <motion.button
                    key={link.id}
                    onClick={() => {
                      setActive(link.id);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-full px-5 py-3 text-[15px] font-semibold mt-1 border relative overflow-hidden ${
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
                    <span className="relative z-10">{link.label}</span>
                    <span className={`relative z-10 h-2 w-2 rounded-full ${isActive ? "bg-[#0f6437]" : "bg-white"}`} />
                  </motion.button>
                );
              }
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActive(link.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-full px-5 py-3 text-[15px] font-medium ${
                    isActive ? "bg-[#F5F2EB] text-black" : "text-black/60 hover:bg-black/[0.04] hover:text-black"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="h-2 w-2 rounded-full bg-[#0A2E1F]" />}
                </button>
              );
            })}
          </div>
          <p className="px-4 py-2.5 text-center text-[11px] tracking-[0.08em] uppercase text-white/60">
            Dubai • Abu Dhabi • Sharjah • All Emirates
          </p>
        </div>
      </motion.div>
    </nav>
  );
}
