import { X, Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeProvider";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Meal Plans", href: "#meal-plans" },
  { label: "Catering", href: "#catering" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function MobileOverlay({ isOpen, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col backdrop-blur-xl transition-all duration-300 lg:hidden ${
        isDark ? "bg-black/95" : "bg-white/80"
      } ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div className="flex h-[72px] items-center justify-between px-6">
        <button
          type="button"
          onClick={toggleTheme}
          className={`flex size-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 ${
            isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-black hover:bg-black/20"
          }`}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
        </button>
        <button
          type="button"
          onClick={onClose}
          className={`flex size-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 ${
            isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-black hover:bg-black/20"
          }`}
          aria-label="Close menu"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      <ul className="flex flex-1 flex-col items-center justify-center gap-2 px-6">
        {NAV_LINKS.map((link, i) => (
          <li key={link.label}>
            <a
              href={link.href}
              onClick={onClose}
              className={`block py-3 text-center text-[32px] font-extralight tracking-tight transition-colors duration-200 ${
                isDark ? "text-white/70 hover:text-white" : "text-black/60 hover:text-black"
              }`}
              style={{
                transitionDelay: isOpen ? `${60 + i * 60}ms` : "0ms",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "scale(1)" : "scale(0.92)",
                transition: "opacity 300ms ease, transform 300ms ease, color 200ms ease",
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div
        className="px-8 pb-10 pt-6"
        style={{
          transitionDelay: isOpen ? `${60 + NAV_LINKS.length * 60}ms` : "0ms",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 300ms ease, transform 300ms ease",
        }}
      >
        <a
          href="#meal-plans"
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-full bg-primary py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Order Now
        </a>
      </div>
    </div>
  );
}

export { NAV_LINKS };
export default MobileOverlay;
